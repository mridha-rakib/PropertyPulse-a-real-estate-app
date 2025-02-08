import mongoose,  {Document} from "mongoose";
import bcrypt from "bcrypt";

export interface UserInput{
  username: string;
  email: string;
  password: string;
  avatar: string;
}

export interface UserDocument extends UserInput, Document {
  _id: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<Boolean>;
}


const userSchema = new mongoose.Schema<UserDocument>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  let user = this as UserDocument;

  if (!user.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hashSync(user.password, salt);

  user.password = hash;

  return next();
})


userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  const user = this as UserDocument;
  return bcrypt.compare(candidatePassword, user.password).catch((e: any) => false);
}

const UserModel = mongoose.model<UserDocument>("User", userSchema);

export default UserModel;