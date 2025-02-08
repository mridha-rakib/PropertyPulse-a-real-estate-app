import type { IListingDocument } from "@/models/listing.model";
import type {  UpdateListingInput, CreateListingInput, GetListingInput, DeleteListingInput } from "@/app/modules/listing/listing.schema";
import { handleError } from "@/errors/handler.error";
import mongoose from 'mongoose';
import { ListingModel } from "@/models/listing.model";

export const ListingRepository = {
    async createListing(listingData: CreateListingInput) {
        const listing = await ListingModel.create(listingData);
        return listing.toObject<IListingDocument>();
    },
    async deleteListing ( listingInput: DeleteListingInput, userId: string ) {
      
      const { listingId } = listingInput;
      console.log(listingId)
      if (!mongoose.Types.ObjectId.isValid(listingId) || !mongoose.Types.ObjectId.isValid(userId)) {
        throw handleError('Invalid ID format', 'BAD_REQUEST');
      }

      if (!listingId || !userId) {
        throw handleError('Listing ID or User ID is missing', 'BAD_REQUEST');
      }

      const listing = await ListingModel.findById(listingId);

      if (!listing) {
       throw handleError("Listing not found!", 'NOT_FOUND');
      }
    
      if (userId !== listing.userRef.toString()) {
        throw handleError("You can only delete your own listings!", 'UNAUTHORIZED');
      }
      
      await ListingModel.findByIdAndDelete(listingId);  
    },
    async updateListing({ listingId, userId, data }: { listingId: string; userId: string, data: UpdateListingInput }) {
      if (!mongoose.Types.ObjectId.isValid(listingId) || !mongoose.Types.ObjectId.isValid(userId)) {
        throw handleError('Invalid ID format', 'BAD_REQUEST');
      }

      const listing = await ListingModel.findById(listingId);

      if (!listing) {
        throw handleError('Listing not found', 'NOT_FOUND');
      }

      if (userId !== listing.userRef.toString()) {
        throw handleError("You can only delete your own listings!", 'UNAUTHORIZED');
      }
      const updatedListing = await ListingModel.findByIdAndUpdate(
       listingId,
       data,
        { new: true }
      );
     
      return updatedListing?.toObject();
    },
    async getListing(listingId : GetListingInput["listingId"]) {
      console.log(listingId)
      const listing = await ListingModel.findById(listingId);
      if (!listing) {
        throw handleError("Listing not found!", 'NOT_FOUND');
      }
      
      return listing.toObject();
    }, 
    async getListings({ limit, startIndex, offer, furnished, parking, type, searchTerm, sort, order }: any) {
      const query = {
        name: { $regex: searchTerm, $options: "i" },
        offer,
        furnished,
        parking,
        type,
      };

      
    return await ListingModel.find(query)
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);
  }
};