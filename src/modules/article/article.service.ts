import prisma from "../../utils/prisma";
import { articleValidationSchema } from "./article.validation";

export const createArticleService = async (data: any) => {
  const parsedBody = articleValidationSchema.safeParse(data);

  if (!parsedBody.success) {
    throw new Error(parsedBody.error.errors[0].message);
  }
};
