import { Request, Response } from 'express';
import prisma from '../utils/prisma';

export const addItem = async (req: Request, res: Response) => {
  const { name, price, stock } = req.body;
  try {
    const item = await prisma.groceryItem.create({ data: { name, price, stock } });
    res.status(201).json(item);
  } catch {
    res.status(500).json({ error: 'Could not add item' });
  }
};

export const getItems = async (_req: Request, res: Response) => {
  try {
    const items = await prisma.groceryItem.findMany();
    res.json(items);
  } catch {
    res.status(500).json({ error: 'Could not fetch items' });
  }
};

export const updateItem = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, price } = req.body;
  try {
    const updated = await prisma.groceryItem.update({
      where: { id },
      data: { name, price }
    });
    res.json(updated);
  } catch {
    res.status(404).json({ error: 'Item not found' });
  }
};

export const deleteItem = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.groceryItem.delete({ where: { id } });
    res.json({ message: 'Item deleted' });
  } catch {
    res.status(404).json({ error: 'Item not found' });
  }
};

export const updateStock = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { stock } = req.body;
  try {
    const updated = await prisma.groceryItem.update({
      where: { id },
      data: { stock }
    });
    res.json(updated);
  } catch {
    res.status(404).json({ error: 'Item not found' });
  }
};
