import UserModel from "@/models/user.model"
import lodash from "lodash";
import { handleError } from "@/errors/handler.error";
import type { UpdateUserInput, DeleteUserInput, UserListingInput } from "@/app/modules/user/user.schema"
import { ListingModel } from "@/models/listing.model";

export const UserRepository = {
    async updateUser({userId, paramsId, data}: UpdateUserInput) {
        if (userId !== paramsId)
            handleError("You can only update your own account!", 'UNAUTHORIZED');
          
        const updatedUser = await UserModel.findByIdAndUpdate(
        paramsId, 
        { $set: { ...data }, },
        { new: true });

        return lodash.omit(updatedUser?.toObject(), "password");
    },
    async deleteUser ({userId, paramsId}: DeleteUserInput) {
        if (userId !== paramsId)
            handleError("You can only delete your own account!", 'UNAUTHORIZED');
        await UserModel.findByIdAndDelete(paramsId);
    },
    async getUserListings({userId, paramsId}:UserListingInput ) {
        console.log("User id:", userId, paramsId)
        if (userId === paramsId) {
            return await ListingModel.find({ userRef: paramsId }).lean();
        } else {
            handleError("You can only update your own account!", 'UNAUTHORIZED');
        }
    },
    async getUser(paramsId: string) {
        const user = await UserModel.findById(paramsId);
        if (!user) handleError("You can only update your own account!", 'NOT_FOUND');
        return lodash.omit(user?.toObject(), "password");
    }

}