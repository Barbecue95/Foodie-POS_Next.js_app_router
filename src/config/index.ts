interface Config {
  backOfficeUrl: string;
}

export const config: Config = {
  backOfficeUrl: process.env.NEXT_PUBLIC_BACKOFFICE_API_URL || "",
};
