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

export interface IUserLogin {
  email: string;
  password: string;
  authProvider: AuthProvider;
}
