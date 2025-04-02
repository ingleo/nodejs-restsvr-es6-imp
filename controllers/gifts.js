import { request, response } from 'express';
import { Gift } from '../models/index.js';

export const getGifts = async (req = request, res = response) => {
  const { from = 0, limit = 5 } = req.query;
  const query = { status: true };

  const [total, gifts] = await Promise.all([
    Gift.countDocuments(query),
    Gift.find(query).skip(Number(from)).limit(Number(limit)),
  ]);

  res.json({
    total,
    gifts,
  });
};

export const getGiftById = async (req = request, res = response) => {
  const { id } = req.params;
  const gift = await Gift.findById(id);

  res.json(gift);
};

export const createGift = async (req = request, res = response) => {
  const { name, description, units } = req.body;
  const nameUpper = name.toUpperCase();
  const giftDb = await Gift.findOne({ name: nameUpper });

  if (giftDb) {
    return res.status(400).json({
      msg: `Gift ${giftDb.name} already exist`,
    });
  }

  const data = {
    name: nameUpper,
    description,
    units,
    user: req.authenticatedUser.id,
  };

  const gift = new Gift(data);
  await gift.save();
  res.status(201).json(gift);
};
