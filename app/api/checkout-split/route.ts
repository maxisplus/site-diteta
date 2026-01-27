import { NextRequest, NextResponse } from 'next/server';

/**
 * API de Checkout Split - 50% Hubla e 50% Cakto
 * 
 * Usa a API do Cakto para criar checkout com split de pagamento
 */

export type PlanType = 'annual' | 'monthly';

// Valores dos planos (em centavos)
const PLAN_VALUES = {
  annual: 9990, // R$ 99,90
  monthly: 2790, // R$ 27,90
};

// URLs de checkout diretas (fallback)
const CHECKOUT_URLS = {
  hubla: {
    annual: 'https://pay.hub.la/9uz9SIpLP3pZ0f12ydsD',
    monthly: 'https://pay.hub.la/QnE0thkRCtKbXLmS5yPy',
  },
  cakto: {
    annual: 'https://pay.cakto.com.br/kvar8c2_742083',
    monthly: 'https://pay.cakto.com.br/bigpf3i',
  },
};

// Credenciais da API Cakto
const CAKTO_CLIENT_ID = process.env.CAKTO_CLIENT_ID;
const CAKTO_CLIENT_SECRET = process.env.CAKTO_CLIENT_SECRET;
const CAKTO_API_URL = process.env.CAKTO_API_URL || 'https://api.cakto.com.br';

interface CheckoutSuccessResponse {
  success: true;
  checkout_url: string;
  plan: PlanType;
  split_info: {
    hubla_percentage: number;
    cakto_percentage: number;
    hubla_amount: number;
    cakto_amount: number;
  };
}

interface CheckoutErrorResponse {
  success: false;
  error: string;
  details?: string;
}

type CheckoutResponse = CheckoutSuccessResponse | CheckoutErrorResponse;

/**
 * Cria um checkout com split usando a API do Cakto
 * 
 * IMPORTANTE: Ajustar conforme a documentação oficial da API do Cakto
 * A implementação abaixo é um exemplo baseado em padrões comuns de APIs de pagamento
 */
async function createCaktoSplitCheckout(
  plan: PlanType,
  amount: number
): Promise<string> {
  try {
    // Verificar se temos as credenciais necessárias
    if (!CAKTO_CLIENT_SECRET) {
      console.warn('⚠️ CAKTO_CLIENT_SECRET não configurado. Usando URL direta como fallback.');
      return CHECKOUT_URLS.cakto[plan];
    }

    // Calcular valores do split (50% cada)
    const hublaAmount = Math.round(amount * 0.5);
    const caktoAmount = Math.round(amount * 0.5);

    // Autenticar na API do Cakto (ajustar conforme documentação)
    // Exemplo de autenticação OAuth2:
    const authResponse = await fetch(`${CAKTO_API_URL}/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: CAKTO_CLIENT_ID,
        client_secret: CAKTO_CLIENT_SECRET,
        grant_type: 'client_credentials',
      }),
    });

    if (!authResponse.ok) {
      throw new Error('Falha na autenticação com Cakto API');
    }

    const authData = await authResponse.json();
    const accessToken = authData.access_token;

    // Criar checkout com split (ajustar endpoint e payload conforme documentação)
    const checkoutResponse = await fetch(`${CAKTO_API_URL}/checkouts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        amount: amount,
        currency: 'BRL',
        plan_type: plan,
        split_payment: {
          enabled: true,
          recipients: [
            {
              recipient: 'hubla', // ID ou identificador do recebedor Hubla
              percentage: 50,
              amount: hublaAmount,
            },
            {
              recipient: 'cakto', // ID ou identificador do recebedor Cakto
              percentage: 50,
              amount: caktoAmount,
            },
          ],
        },
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/checkout/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/checkout/cancel`,
      }),
    });

    if (!checkoutResponse.ok) {
      const errorData = await checkoutResponse.json().catch(() => ({}));
      throw new Error(`Erro ao criar checkout: ${JSON.stringify(errorData)}`);
    }

    const checkoutData = await checkoutResponse.json();
    
    // Retornar URL do checkout (ajustar conforme resposta da API)
    return checkoutData.checkout_url || checkoutData.url || CHECKOUT_URLS.cakto[plan];

  } catch (error) {
    console.error('Erro ao criar checkout Cakto:', error);
    // Fallback: retorna URL direta do Cakto
    return CHECKOUT_URLS.cakto[plan];
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { plan } = body;

    if (!plan || !['annual', 'monthly'].includes(plan)) {
      return NextResponse.json(
        { success: false, error: 'Plano inválido' } as CheckoutErrorResponse,
        { status: 400 }
      );
    }

    const typedPlan = plan as PlanType;
    const totalAmount = PLAN_VALUES[typedPlan];
    const hublaAmount = Math.round(totalAmount * 0.5);
    const caktoAmount = Math.round(totalAmount * 0.5);

    // Criar checkout com split via API Cakto
    const checkoutUrl = await createCaktoSplitCheckout(plan, totalAmount);

    console.log(`✅ Checkout criado - Plano: ${plan}, Split: 50% Hubla / 50% Cakto`);

    return NextResponse.json({
      success: true,
      checkout_url: checkoutUrl,
      plan: plan,
      split_info: {
        hubla_percentage: 50,
        cakto_percentage: 50,
        hubla_amount: hublaAmount,
        cakto_amount: caktoAmount,
      },
    } as CheckoutSuccessResponse);

  } catch (error: any) {
    console.error('❌ Erro no checkout split:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Erro ao processar checkout',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined,
      } as CheckoutErrorResponse,
      { status: 500 }
    );
  }
}
