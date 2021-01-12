import WishlistSchema from "./WishlistSchema";
import utils from "../../libs/utils";

interface DataList {
    name: string,
    imageURL: string,
    economy: number,
    productPrice: number,
    timeForAdd: number
}

interface DataListUpdate {
    id: string,
    name: string,
    imageURL: string,
    economy: number,
    productPrice: number,
    timeForAdd: number
}

export default {
    index() {
        return WishlistSchema.find({});
    },
    async create(data: DataList) {
        const { name, imageURL, economy, productPrice } = data;
        try {
            const timeForAdd: number = await utils.timeForAdd(productPrice, economy);
            const wishilist = new WishlistSchema({ name, imageURL, economy, productPrice, timeForAdd });
            wishilist.save().then((result) => {
                return result;
            }).catch((error) => {
                return `Error to register on database ${error}`
            });
        } catch (error) {
            return `Error to register wishlist ${error}`;
        }
    },
    async show(id: String) {
        try {
            const show = await WishlistSchema.findById(id);
            return show;
        } catch (error) {
            return `Error to consult a whishlist: ${error}`
        }
    },
    async edit(data: DataListUpdate) {
        try {
            const { id, name, imageURL, economy, productPrice } = data;
            const timeForAdd: number = await utils.timeForAdd(productPrice, economy);
            const query = { _id: id }
            const update = {
                "$set": {
                    name,
                    imageURL,
                    economy,
                    productPrice,
                    timeForAdd
                }
            }
            await WishlistSchema.findByIdAndUpdate(query, update);
        } catch (error) {
            return `Error to updated a whishlist: ${error}`;
        }

    },
    async delete(id: String) {
        try {
            await WishlistSchema.findOneAndDelete(id);
        } catch (error) {
            return `Error to delete a whishlist: ${error}`;
        }
    }
}