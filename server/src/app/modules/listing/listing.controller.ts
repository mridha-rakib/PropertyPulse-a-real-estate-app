import { zParse } from "@/utils/validators.util";
import statuses from 'http-status';
import { createListingSchema, updateListingSchema, deleteListingSchema, getListingSchema } from "./listing.schema";
import asyncHandler from "@/app/middlewares/asyncHandler.middlewares";
import { ListingRepository } from "@/app/repository/listing.repository";

const createListing  = asyncHandler( async (req, res) => {
  const { body: data}  = await zParse(createListingSchema, req);
  const listing = await ListingRepository.createListing(data);
  res.status(statuses.CREATED).json(listing);
});

const deleteListing = asyncHandler( async (req, res) => {
  const { params: listingId}  = await zParse(deleteListingSchema, req);
  const userId  = req.user?.userId as string;
  await ListingRepository.deleteListing(listingId, userId);

  res.status(statuses.OK).json("Listing has been deleted!");

});

const updateListing = asyncHandler(async (req, res) => {
  const { body: data, params: {listingId}}  = await zParse(updateListingSchema, req);
  const userId  = req.user?.userId as string;
  const response = await ListingRepository.updateListing({listingId, userId, data})

  res.status(statuses.OK).json(response);
});

const getListing = asyncHandler(async (req, res) => {
   const { params: { listingId }}  = await zParse(getListingSchema, req);
   const response = await ListingRepository.getListing(listingId);
   res.status(200).send(response);
});

const getListings = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit as string) || 9;
  const startIndex = parseInt(req.query.startIndex as string) || 0;

  const offer = req.query.offer === undefined || req.query.offer === "false" ? { $in: [false, true] } : req.query.offer;
  const furnished = req.query.furnished === undefined || req.query.furnished === "false" ? { $in: [false, true] } : req.query.furnished;
  const parking = req.query.parking === undefined || req.query.parking === "false" ? { $in: [false, true] } : req.query.parking;
  const type = req.query.type === undefined || req.query.type === "all" ? { $in: ["sale", "rent"] } : req.query.type;

  const searchTerm = req.query.searchTerm || "";
  const sort = req.query.sort || "createdAt";
  const order = req.query.order || "desc";

  const queryOptions = {
    limit,
    startIndex,
    offer,
    furnished,
    parking,
    type,
    searchTerm,
    sort,
    order,
  };

  const listings = await ListingRepository.getListings(queryOptions);

  res.status(200).json(listings);
});


export const ListingController = {
  createListing, 
  deleteListing, 
  updateListing, 
  getListing, 
  getListings
}