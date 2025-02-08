import  {  Schema, model } from "mongoose";

import type { TDocument } from "@/ts/document.type";
import {Document, Model} from "mongoose";

export interface IListing extends TDocument {
    name: string;
    description: string;
    address: string;
    regularPrice: number;
    discountPrice: number;
    bathrooms: number;
    bedrooms: number;
    furnished: boolean; 
    parking: boolean;
    type: string;
    offer: boolean;
    imageUrls: string[];
    userRef: string;
  }
export interface IListingDocument extends IListing, Document<string> {}


const listingSchema: Schema<IListingDocument> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    regularPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    discountPrice: {
      type: Number,
      required: true,  
      min: 0,
    },
    bathrooms: {
      type: Number,
      required: true,
      min: 0,
    },
    bedrooms: {
      type: Number,
      required: true,
      min: 0, 
    },
    furnished: {
      type: Boolean,
      required: true,
    },
    parking: {
      type: Boolean,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    offer: {
      type: Boolean,
      required: true,
    },
    imageUrls: {
      type: [String],
      required: true,
    },
    userRef: {
      type: String,
    },
  },
  { timestamps: true }
);



listingSchema.index({name: 'text', description: 'text'})

export const ListingModel = model<IListingDocument>("Listing", listingSchema);


