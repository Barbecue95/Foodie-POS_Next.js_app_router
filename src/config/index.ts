interface Config {
  backOfficeUrl: string;
  googleClientId: string;
  googleClientSecret: string;
}

export const config: Config = {
  backOfficeUrl: process.env.NEXT_PUBLIC_BACKOFFICE_API_URL || "",
  googleClientId: process.env.GOOGLE_CLIENT_ID || "",
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
};
