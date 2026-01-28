import { NextRequest, NextResponse } from 'next/server';

/**
 * API de Checkout - 100% Hubla
 *
 * Este endpoint existe para centralizar o redirecionamento do checkout.
 * Atualmente, ele retorna diretamente a URL da Hubla para o plano solicitado.
 */

export type PlanType = 'annual' | 'monthly';

// Valores dos planos (em centavos)
const PLAN_VALUES = {
  annual: 10990, // R$ 109,90
  monthly: 3090, // R$ 30,90
};

// URLs de checkout diretas (Hubla)
const CHECKOUT_URLS = {
  hubla: {
    annual: 'https://pay.hub.la/9uz9SIpLP3pZ0f12ydsD',
    monthly: 'https://pay.hub.la/QnE0thkRCtKbXLmS5yPy',
  },
};

interface CheckoutSuccessResponse {
  success: true;
  checkout_url: string;
  plan: PlanType;
  amount_cents: number;
}

interface CheckoutErrorResponse {
  success: false;
  error: string;
  details?: string;
}

type CheckoutResponse = CheckoutSuccessResponse | CheckoutErrorResponse;

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

    // Checkout 100% Hubla (URL direta)
    const checkoutUrl = CHECKOUT_URLS.hubla[typedPlan];

    console.log(`✅ Checkout Hubla - Plano: ${plan}`);

    return NextResponse.json({
      success: true,
      checkout_url: checkoutUrl,
      plan: plan,
      amount_cents: totalAmount,
    } as CheckoutSuccessResponse);

  } catch (error: any) {
    console.error('❌ Erro no checkout Hubla:', error);

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
