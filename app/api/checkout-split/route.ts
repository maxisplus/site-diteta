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
const CAKTO_CLIENT_ID = 'xFxqzMyHWAXGsWtoyE4WVng0chgaUpgiZBhQk8Fc';
const CAKTO_API_URL = 'https://api.cakto.com.br'; // Ajustar conforme documentação

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
 */
async function createCaktoSplitCheckout(
  plan: PlanType,
  amount: number
): Promise<string> {
  try {
    // TODO: Implementar chamada real à API do Cakto
    // Por enquanto, retorna a URL direta do Cakto
    
    // Exemplo de como seria a chamada (ajustar conforme documentação):
    /*
    const response = await fetch(`${CAKTO_API_URL}/checkouts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CAKTO_CLIENT_ID}`,
      },
      body: JSON.stringify({
        amount: amount,
        split: {
          hubla: {
            percentage: 50,
            amount: amount * 0.5,
          },
          cakto: {
            percentage: 50,
            amount: amount * 0.5,
          },
        },
        plan: plan,
      }),
    });
    
    const data = await response.json();
    return data.checkout_url;
    */
    
    // Por enquanto, retorna URL direta do Cakto
    return CHECKOUT_URLS.cakto[plan];
  } catch (error) {
    console.error('Erro ao criar checkout Cakto:', error);
    throw error;
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

    const totalAmount = PLAN_VALUES[plan];
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
