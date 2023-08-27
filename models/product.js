import { Schema, model } from 'mongoose';

const ProductSchema = Schema({
  name: {
    type: String,
    required: [true, 'Name is mandatory'],
    unique: true,
  },
  status: {
    type: Boolean,
    default: true,
    required: true,
  },
  unitPrice: {
    type: Number,
    default: 0,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  description: {
    type: String,
  },
  available: {
    type: Boolean,
    default: true,
  },
  img: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

ProductSchema.methods.toJSON = function () {
  const { __v, status, ...data } = this.toObject();
  return data;
};

export default model('Product', ProductSchema);
