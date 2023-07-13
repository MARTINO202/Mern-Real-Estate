const mongoose = require('mongoose');
const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "can't be blank"]
  },
  description: {
    type: String,
    required: [true, "can't be blank"]
  },
  address: {
    type: String,
    required: [true, "can't be blank"]
  },
  price: {
    type: String,
    required: [true, "can't be blank"]
  },
  sqmeters: {
    type: Number,
    required: true,
    min: 15
},
continent: {
    type: String,
    required: true
},
beds: {
    type: Number,
    required: true,
    min: 1
},
  category: {
    type: String,
    required: [true, "can't be blank"]
  },
  pictures: {
    type: Array,
    required: true
  }
}, {minimize: false});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
