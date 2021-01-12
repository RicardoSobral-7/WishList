import { Router } from "express";
import wishList from "./app/controllers/whishlistController";

const routes = Router();

routes.get("/list", wishList.index);
routes.post("/wishlist/create", wishList.create);
routes.get("/wishilist/show/:id", wishList.show);
routes.put("/wishlist", wishList.edit);
routes.delete("/wishlist", wishList.delete);

export default routes;