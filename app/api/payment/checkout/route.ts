import { NextRequest, NextResponse } from 'next/server';
import { Polar } from '@polar-sh/sdk';
import { auth } from '@/lib/auth';

const polar = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN!,
  server: (process.env.POLAR_ENV as 'sandbox' | 'production') ?? 'sandbox',
});

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
  }

  const { puuid } = await request.json();
  if (!puuid) {
    return NextResponse.json({ error: 'puuid is required' }, { status: 400 });
  }

  const origin = request.headers.get('origin') ?? process.env.NEXT_PUBLIC_BASE_URL;

  try {
    const checkout = await polar.checkouts.create({
      products: [process.env.POLAR_PRODUCT_ID!],
      metadata: {
        userId: session.user.id,
        puuid,
      },
      successUrl: `${origin}/card/${puuid}?paid=true`,
    });

    return NextResponse.json({ url: checkout.url });
  } catch (err: unknown) {
    console.error('Polar checkout error:', err);
    const message = err instanceof Error ? err.message : 'Payment error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
