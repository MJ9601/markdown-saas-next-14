"use server";

import { signIn } from "@/auth/auth";
import { signUpFromEntry } from "../schemas/user.schema";
import { AuthProvider, Role, createNewUser } from "../services/users";
import config from "@/config";

export const handleSignUpFrom = async (prevState: any, formdData: FormData) => {
  const { email, name, password, confirmPassword } =
    Object.fromEntries(formdData);
  const validateFields = signUpFromEntry.safeParse({
    email,
    name,
    password,
    confirmPassword,
  });
  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
    };
  }

  const newUser = await createNewUser({
    email: email as string,
    name: name as string,
    password: password as string,
    access: Role.normal,
    authProvider: AuthProvider.credentials,
  });

  if (newUser.error) {
    return { message: newUser.error };
  }

  await signIn("credentials", {
    email,
    password,
    redirect: true,
    redirectTo: config.url + "/dashboard",
  });

  return { message: "succeeded!!" };
};

export const handleLoginWithCredentials = async (
  prevState: any,
  formData: FormData
) => {
  const { email, password } = Object.fromEntries(formData);
  await signIn("credentials", {
    email,
    password,
    redirect: true,
    redirectTo: config.url + "/dashboard",
  });
  return { message: "secceeded!!" };
};

export const handleDeleteUser = async () => {};

export const handleUserLogout = async () => {};

export const handleUpdateUser = async () => {};
