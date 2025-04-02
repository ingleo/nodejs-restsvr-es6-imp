import { Schema, model } from 'mongoose';

const GiftSchema = Schema({
  name: {
    type: String,
    required: [true, 'Name is mandatory'],
    unique: true,
  },
  description: {
    type: String,
    required: false,
  },
  units: {
    type: Number,
    default: 0,
  },
  status: {
    type: Boolean,
    default: true,
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

GiftSchema.methods.toJSON = function () {
  const { __v, status, ...data } = this.toObject();
  return data;
};

export default model('Gift', GiftSchema);
