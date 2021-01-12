import mongoose from "../../config/database";

const wishListSchema = new mongoose.Schema<any>({
    name: { type: String, required: true },
    imageURL: { type: String },
    economy: { type: Number, required: true },
    productPrice: { type: Number, required: true },
    timeForAdd: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("wishlist", wishListSchema);