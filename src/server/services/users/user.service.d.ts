export enum Role {
  normal = "normal",
  admin = "admin",
  premium = "premium",
}

export enum AuthProvider {
  google = "google",
  github = "github",
  credentials = "credentials",
}

export interface ICreateNewUser {
  name: string;
  email: string;
  password?: string;
  googleAuthId?: string;
  githubAuthId?: string;
  access: Role;
  authProvider: AuthProvider;
}

export interface IUserLoginWithCredentials {
  email: string;
  password: string;
  callbackUrl?: string;
}

export interface IUserLoginWithThirdParty {
  email: string;
  authProvider: AuthProvider;
  access: Role;
  authId: string;
  name: string;
  image?: string;
}
