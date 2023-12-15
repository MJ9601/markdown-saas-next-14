import { omit } from "lodash";
import * as argon from "argon2";
import connectTodb from "../../connectTodb";
import { AuthProvider, ICreateNewUser, IUserLoginWithCredentials } from ".";
import { User } from "@/server/models/user.model";

export const createNewUser = async (input: ICreateNewUser) => {
  try {
    await connectTodb();
    const user = await User.findOne({ email: input.email });
    if (user) return { error: "Email is Existed!!" };

    const { password, authProvider, ...rest } = input;

    if (input.authProvider === AuthProvider.credentials && !password)
      return { error: "Password is Needed!!" };

    const passHash = input.password ? await argon.hash(input.password) : "";

    const newUser = await User.create({ password: passHash, ...rest });

    const savedUser = await newUser.save();

    return savedUser;
  } catch (error: any) {
    console.error(error.message);
    return { error: error.message };
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await User.findById(id);
    if (!user) return false;

    return omit(user, "password");
  } catch (error: any) {
    console.error(error.message);
    return error.message;
  }
};

export const getAllUser = async () => {
  try {
    const users = await User.find();
    const _users = users.map((user) => omit(user, "password"));
    return _users;
  } catch (error: any) {
    console.error(error.message);
    return error.message;
  }
};

export const verifyUserInfo = async (input: IUserLoginWithCredentials) => {
  try {
    await connectTodb();
    console.log(input);
    const user = await User.findOne({ email: input.email });
    if (!user) return false;

    const verifiedPass = await argon.verify(user?.password, input.password);

    if (!verifiedPass) return false;

    return user;
  } catch (error: any) {
    console.error(error.message);
    return error.message;
  }
};

export const loginUserWithCredentials = async (
  input: IUserLoginWithCredentials
) => {
  try {
    const user = await verifyUserInfo(input);
    if (!user) throw new Error("Invalid Email or Password!!");

    return omit(user, "password");
  } catch (error: any) {
    console.error(error.message);
    return error.message;
  }
};

export const updateUserInfo = async (input: any) => {
  try {
    const user = await verifyUserInfo(input);
    if (!user) return "Invalid Email or Password!!";

    const updateUser = await User.findByIdAndUpdate(user._id, input);

    return updateUser;
  } catch (error: any) {
    console.error(error.message);
    return error.message;
  }
};

export const deleteUser = async (input: any) => {
  try {
    const user = await verifyUserInfo(input);
    if (!user) return "Invalid Email or Password!!";

    const updateUser = await User.findByIdAndDelete(user._id);

    return "succeeded!!";
  } catch (error: any) {
    console.error(error.message);
    return error.message;
  }
};
