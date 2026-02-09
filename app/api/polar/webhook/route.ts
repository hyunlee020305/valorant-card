import { Webhooks } from '@polar-sh/nextjs';
import { prisma } from '@/lib/db';

export const POST = Webhooks({
  webhookSecret: process.env.POLAR_WEBHOOK_SECRET!,
  onOrderPaid: async (payload) => {
    const order = payload.data;
    const metadata = (order.metadata as Record<string, string>) ?? {};
    const { userId, puuid } = metadata;

    if (!userId || !puuid) {
      console.error('Polar webhook: missing metadata', metadata);
      return;
    }

    // Prevent duplicate processing
    const existing = await prisma.cardGeneration.findFirst({
      where: { orderId: order.id },
    });
    if (existing) return;

    await prisma.cardGeneration.create({
      data: {
        userId,
        puuid,
        isFree: false,
        paymentKey: order.id,
        orderId: order.id,
        amount: order.totalAmount,
        status: 'completed',
      },
    });
  },
});
