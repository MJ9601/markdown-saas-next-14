const config = {
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  githubClientId: process.env.GITHUB_CLIENT_ID,
  githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
  authSecret: process.env.AUTH_SECRET,
  dbName: process.env.DB_NAME ?? "blog",
  dbUser: process.env.MONGO_INITDB_ROOT_USERNAME ?? "root",
  dbPass: process.env.MONGO_INITDB_ROOT_PASSWORD ?? "password",
  dbHost: process.env.DB_HOST ?? "localhost",
  url: "http://localhost:3000",
  cloudName: process.env.CLOUD_NAME,
  cloudApiKey: process.env.API_KEY,
  cloudApiSecret: process.env.API_SECRET,
};

export default config;
