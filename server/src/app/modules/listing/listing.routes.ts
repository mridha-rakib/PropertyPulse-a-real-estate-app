import express from "express";
import { verifyToken } from "../../../utils/verifyUser.js";
import { ListingController } from "./listing.controller.js";


const listingRouter = express.Router();

listingRouter.route("/create").post(verifyToken, ListingController.createListing);
listingRouter.route("/delete/:listingId").delete(verifyToken, ListingController.deleteListing);
listingRouter.route("/update/:listingId").post(verifyToken, ListingController.updateListing);
listingRouter.route("/get/:listingId").get(ListingController.getListing);
listingRouter.route("/get").get(ListingController.getListings);

export {listingRouter};
