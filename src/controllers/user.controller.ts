import { Request, Response } from 'express';
import prisma from '../utils/prisma';

export const getAvailableItems = async (_req: Request, res: Response) => {
  try {
    const items = await prisma.groceryItem.findMany({
      where: { stock: { gt: 0 } }
    });
    res.json(items);
  } catch {
    res.status(500).json({ error: 'Failed to fetch items' });
  }
};

export const placeOrder = async (req: Request, res: Response) => {
  const { items } = req.body;
  const userId = (req as any).user.userId;

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'No items provided for order' });
  }

  try {
    const order = await prisma.$transaction(async (tx) => {
      // Validate and update stock
      for (const item of items) {
        const dbItem = await tx.groceryItem.findUnique({ where: { id: item.itemId } });
        if (!dbItem || dbItem.stock < item.quantity) {
          throw new Error(`Item ${item.itemId} is out of stock or doesn't exist`);
        }

        await tx.groceryItem.update({
          where: { id: item.itemId },
          data: { stock: { decrement: item.quantity } }
        });
      }

      // Create the order
      const newOrder = await tx.order.create({
        data: {
          userId,
          items: {
            create: items.map((item: any) => ({
              itemId: item.itemId,
              quantity: item.quantity
            }))
          }
        },
        include: { items: true }
      });

      return newOrder;
    });

    res.status(201).json(order);
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Could not place order' });
  }
};
