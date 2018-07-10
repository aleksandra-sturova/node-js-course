import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  reviews: [{
    id: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  }],
});

export default mongoose.model('Product', productSchema);