import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const itemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    itemType: {
        type: String,
        enum: ["Shirt", "Pants", "Shoes", "Accessories", "Sports", "Others"],
        default: "Others"

    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    coverImage: {
        type: String,
        required: true
    },
    stockAvailable: {
        type: Number,
        required: true,
        default: 0
    },
    additionalImages: [
        {
            type: String,
        }
    ]

}, { timestamps: true });


itemSchema.plugin(mongooseAggregatePaginate);


export const Item = mongoose.model("Item", itemSchema);