import prisma from "../../utils/prisma";
import { IArticle } from "./article.validation";

// Service function to create a new article
export const createArticleService = async (aeticleData: IArticle) => {
//  // check if the article already exists
 const existingArticle = await prisma.article.findUnique({
  where: {
   title: aeticleData.title,
   description: aeticleData.description
  }
 }) 
 
 if (existingArticle) {
  throw new Error("Article already exists");
 }

 // create article
 const article = await prisma.article.create({
  data: {
   ...aeticleData,
   } as any,
  select: {
   title: true
  }
 });
 return article;
};


// Service function to get all articles
export const getArticlesService = async () => {
  const articles = await prisma.article.findMany();
  return articles;
};
