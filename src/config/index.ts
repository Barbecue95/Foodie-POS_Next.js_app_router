interface Config {
  backOfficeUrl: string;
  googleClientId: string;
  googleClientSecret: string;
  orderAppUrl: string;
}

export const config: Config = {
  backOfficeUrl: process.env.NEXT_PUBLIC_BACKOFFICE_API_URL || "",
  googleClientId: process.env.GOOGLE_CLIENT_ID || "",
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
  orderAppUrl: process.env.NEXT_PUBLIC_ORDER_APP_URL || "",
};
