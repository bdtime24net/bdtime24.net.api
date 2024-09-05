import prisma from "../../utils/prisma";
import { articleValidationSchema } from "./article.validation";
import { IArticle } from "./article.validation";

// Service function to create a new article
export const createArticleService = async (data: IArticle) => {
  // Validate the data
  const parsedBody = articleValidationSchema.safeParse(data);

  if (!parsedBody.success) {
    throw new Error(parsedBody.error.errors[0].message);
  }

  const {
    title,
    content,
    authorId,
    sourceName,
    author,
    url,
    urlToImage,
    publishedAt,
    categoryId,
    tagId,
  } = parsedBody.data;

  // Check if the article with the same title and content already exists
  const existingArticle = await prisma.article.findFirst({
    where: {
      title,
      content,
    },
  });

  if (existingArticle) {
    throw new Error("Article already exists");
  }

  // Create the new article
  const newArticle = await prisma.article.create({
    data: {
      title,
      content,
      sourceName,
      url: url ?? "",
      urlToImage: urlToImage ?? "",
      publishedAt,
      categoryId,
      tagId: tagId ?? "",
    },
  });

  return newArticle;
};
