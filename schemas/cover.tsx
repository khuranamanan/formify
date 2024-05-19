import { z } from "zod";

export const CoverSchema = z.object({
  url: z.string().url("Please provide a valid URL"),
});
