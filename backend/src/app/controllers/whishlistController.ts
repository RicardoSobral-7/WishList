import { Request, Response } from "express";
import WishlistModel from "../models/WhishlistModel";
export default {
    async index(req: Request, res: Response) {
        try {
            const data = await WishlistModel.index();
            return res.status(200).json({ data });
        } catch (error) {
            return res.status(404).json({ messege: `Error to list all wishlist` })
        }
    },
    async create(req: Request, res: Response) {
        if (req.body.name == "" || req.body.imageURL == "" || req.body.economy == null || req.body.productPrice == null) {
            return res.status(404).json(`Some field not filled`);
        } else {
            try {
                const data = req.body;
                await WishlistModel.create(data);
                return res.status(201).json({ messege: "Successfull saved informations!" });
            } catch (error) {
                return res.status(404).json({ messege: `Something wrong happens, try latter error: ${error}` });
            }
        }
    },
    async show(req: Request, res: Response) {
        const id = req.params.id;
        if (id !== "") {
            try {
                const data = await WishlistModel.show(id);
                return res.status(202).json({ data: data });
            } catch (error) {
                return res.status(404).json({ messege: `Something wrong happens to check informations, try latter error: ${error}` });
            }
        } else {
            return res.status(404).json({ messege: `Please send a id.` })
        }
    },
    async edit(req: Request, res: Response) {
        if (req.body.name == "" || req.body.imageURL == "" || req.body.economy == null || req.body.productPrice == null) {
            return res.status(404).json(`Some field not filled`);
        } else {
            try {
                const data = req.body;
                await WishlistModel.edit(data);
                return res.status(202).json({ messege: "Successfull updated informations!" });
            } catch (error) {
                return res.status(404).json({ messege: `Something wrong happens to edit informations, try latter error: ${error}` });
            }
        }
    },
    async delete(req: Request, res: Response) {
        const id = req.body.id;
        if (id !== "") {
            try {
                await WishlistModel.delete(id);
                return res.status(200).json({ messege: "Successfull deleted informations!" });
            } catch (error) {
                return res.status(404).json({ messege: `Something wrong happens to delete informations, try latter error: ${error}` });
            }
        } else {
            return res.status(404).json({ messege: `Id not found, please send a id for delete one item.` })
        }
    }
}