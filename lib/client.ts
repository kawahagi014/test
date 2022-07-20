import { createClient } from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: "kawahagi014",
  apiKey: process.env.MICRO_CMS_KEY || "",
});
