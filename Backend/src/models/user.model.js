import { model, Schema } from "mongoose";

// structure of the user schema inside the Mongo DB, ID is automatically generated
export const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    // email must be unique to avoid multiple registrations
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);
// creating model using model function from the mongoose
export const UserModel = model('user', UserSchema);