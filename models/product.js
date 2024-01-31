const mongoose = require("mongoose");

const product = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true,
    },
    price: [
        {
            size: {
                type: Number,
                default: 0  // 0 is for small , 1 is for large , 2 is for extra large
            },
            discount: {
                type: Number,
                default: 0   // percentage number
            },
            mrp: {
                type: Number,
                default: 0
            },
        }
    ],
    sku: {
        type: String,
        default: "",
        index: true
    },
    is_deleted: {
        type: Boolean,
        default: false,
    },
    is_active: {
        type: Boolean,
        default: false,
    },
    is_popular: {
        type: Boolean,
        default: false,
    },
    category: {
        type: String,
        default: "All"
    },
    description: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: () => new Date(),
    },
    availabelOn: {
        type: Array,
        default: [1, 2, 3]    // 1 for android ,  2 for Desktop , 3 for apple
    },
    stock: {
        type: Number,
        default: 0
    },
    ratings: {
        type: mongoose.Schema.Types.Decimal128,
        default: 5,
    },

    updated_at: {
        type: Date,
        default: () => new Date(),
    },
});
module.exports = mongoose.model("product", product);
