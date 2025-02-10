import { z } from 'zod';

export const listingSchemaGeneric = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  regularPrice: z.number({ invalid_type_error: "Regular price must be a number" }).min(0, { message: "Regular price must be a positive number" }),
  discountPrice: z.number({ invalid_type_error: "Discount price must be a number" }).min(0, { message: "Discount price must be a positive number" }),
  bathrooms: z.number({ invalid_type_error: "Number of bathrooms must be a number" }).min(0, { message: "Number of bathrooms must be a positive number" }),
  bedrooms: z.number({ invalid_type_error: "Number of bedrooms must be a number" }).min(0, { message: "Number of bedrooms must be a positive number" }),
  furnished: z.boolean(),
  parking: z.boolean(),
  type: z.string().min(1, { message: "Type is required" }),
  offer: z.boolean(),
  imageUrls: z.array(z.string()).min(1, { message: "At least one image URL is required" }),
  userRef: z.string().min(1, { message: "User reference is required" }),
});


const params = {
  params: z.object({
    listingId: z.string({
      required_error: "Listing Id is required",
    })
  })
}

export const createListingSchema = z.object({
  body: listingSchemaGeneric
})

export const updateListingSchema = z.object({
  ...params,
  body: listingSchemaGeneric.partial(),
})

export const deleteListingSchema = z.object({
  ...params
})


export const getListingSchema = z.object({
  ...params,
});


  export type CreateListingInput = z.infer<typeof createListingSchema>["body"];
  export type UpdateListingInput = z.infer<typeof updateListingSchema>["body"];
  export type GetListingInput = z.infer<typeof getListingSchema>["params"];
  export type DeleteListingInput = z.infer<typeof deleteListingSchema>["params"];
  