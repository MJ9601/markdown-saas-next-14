"use server";
import { omit } from "lodash";
import connectTodb from "../../connectTodb";
import { User } from "../../schemas/user.schema";
import { ICreateNewUser } from "./user";

export const createNewUser = async (input: ICreateNewUser) => {
  try {
    await connectTodb();
    const user = await User.findOne({ email: input.email });
    if (user) return "Email is Existed!!";

    const newUser = await User.create(input);

    const savedUser = await newUser.save();

    return savedUser;
  } catch (error: any) {
    console.error(error.message);
    return error.message;
  }
};

export const createUser = async (input: ICreateNewUser) => {
  try {
    await connectTodb();
    const user = await User.findOne({ email: input.email });
    if (user) throw new Error("Email is Existed!!");

    const newUser = await User.create(input);

    const savedUser = await newUser.save();

    return savedUser;
  } catch (error: any) {
    console.error(error.message);
    throw new Error(error.message);
  }
};

export const getAllUser = async () => {
  try {
    const users = await User.find();
    const _users = users.map((user) => omit(user, "password"));
    return _users;
  } catch (error: any) {
    console.error(error.message);
    throw new Error(error.message);
  }
};

export const loginUser = async (input: any) => {
  try {
    await connectTodb();
    console.log(input);
    // const users = await User.find();
    // const _users = users.map((user) => omit(user, "password"));
    // return _users;
  } catch (error: any) {
    console.error(error.message);
    throw new Error(error.message);
  }
};
