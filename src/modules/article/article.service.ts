import prisma from "../../utils/prisma";
import { ArticleSchema } from "./article.validation";
import { IArticle } from "./article.validation";

// Service function to create a new article
export const createArticleService = async (data: IArticle) => {
  // Validate the data
  const parsedBody = ArticleSchema.safeParse(data);

  if (!parsedBody.success) {
    throw new Error(parsedBody.error.errors[0].message);
  }

  // Check if the article with the same title and content already exists
  const existingArticle = await prisma.article.findFirst({
    where: {
      title: parsedBody.data.title,
      content: parsedBody.data.content,
    },
  });

  if (existingArticle) {
    throw new Error("Article already exists");
  }

  // // Verify category existence
  // const categoryExists = await prisma.newsCategory.findUnique({
  //   where: {
  //     id: parsedBody.data.categoryId,
  //   },
  // });

  // if (!categoryExists) {
  //   throw new Error("Category does not exist");
  // }

  // // Verify tag existence (if tagId is provided)
  // if (parsedBody.data.tagId) {
  //   const tagExists = await prisma.tag.findUnique({
  //     where: {
  //       id: parsedBody.data.tagId,
  //     },
  //   });

  //   if (!tagExists) {
  //     throw new Error("Tag does not exist");
  //   }
  // }

  // Create the new article
  const newArticle = await prisma.article.create({
    data: {
      ...parsedBody.data,
    },
  });

  return newArticle;
};
