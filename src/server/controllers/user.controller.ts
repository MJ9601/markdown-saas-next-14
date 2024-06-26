"use server";

import { signIn, signOut } from "@/auth/auth";
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
    redirectTo: config.url,
  });
};

export const handleLoginWithCredentials = async (
  prevState: any,
  formData: FormData
) => {
  const { email, password } = Object.fromEntries(formData);
  // try {
  await signIn("credentials", {
    email,
    password,
    redirect: true,
    redirectTo: config.url,
  });
  // } catch (error: any) {
  //   switch (error.type) {
  //     case "CredentialsSignin":
  //       return { message: "Invalid credentials." };
  //     default:
  //   }
  // }
  return { message: "Succeeded." };
};

export const handleSignInWithThirdParty = async (
  prevState: any,
  formData: any
) => {
  const { provider } = Object.fromEntries(formData);
  await signIn(provider, {
    redirect: true,
    redirectTo: config.url,
  });
};

export const handleDeleteUser = async () => {};

export const handleUserLogout = async (fromData: FormData) => {
  await signOut({ redirect: true, redirectTo: config.url + "/login" });
};

export const handleUpdateUser = async () => {};
