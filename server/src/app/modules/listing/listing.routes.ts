import express from "express";

import { ListingController } from "./listing.controller.js";
import { protect } from "@/app/middlewares/auth.middleware.js";


const listingRouter = express.Router();

listingRouter.route("/create").post(protect, ListingController.createListing);
listingRouter.route("/delete/:listingId").delete(protect, ListingController.deleteListing);
listingRouter.route("/update/:listingId").post(protect, ListingController.updateListing);
listingRouter.route("/get/:listingId").get(ListingController.getListing);
listingRouter.route("/get").get(ListingController.getListings);

export {listingRouter};
