import prisma from "../../utils/prisma";
import { IArticle, IGetArticlesOptions } from "./article.validation";

// Service function to create a new article
export const createArticleService = async (articleData: IArticle) => {
try {
  // Check if the article already exists (assuming `headline` should be unique)
  const existingArticle = await prisma.article.findFirst({
    where: { headline: articleData.headline },
  });

  if (existingArticle) {
    throw new Error("Article with this headline already exists");
  }

  // Create the article
  const article = await prisma.article.create({
    data: {
      headline: articleData.headline,
      description: articleData.description,
      reporter: articleData.reporter,
      keywords: articleData.keywords,
      sourceName: articleData.sourceName,
      url: articleData.url,
      urlToImage: articleData.urlToImage,
      categoryId: articleData.categoryId,
      userId: articleData.userId,
      tagId: articleData.tagId,
    },
    select: { headline: true }, // Selecting only necessary fields
  });

  return article;
} catch (error) {
  console.error("Error creating article:", error);
  throw new Error("Failed to create article");
}
};


// Service function to get all articles
export const getArticlesService = async (articleData: IGetArticlesOptions) => {
  const {
    page = 1,
    limit = 10,
    fields = [],
    sort = { field: 'updatedAt', order: 'desc' },
    query = '',
    search = '',
    filter = {},
    category = '',
    author = '',
    date = {},
  } = articleData;

  const skip = (page - 1) * limit;

   
  // Build where clause dynamically
  const where: Record<string, any> = {
    ...(query && {
      OR: [
        { headline: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ],
    }),
    ...(search && {
      headline: { contains: search, mode: "insensitive" },
    }),
    ...(category && { categoryId: category }),
    ...(author && { userId: author }),
    ...(date.from || date.to
      ? {
          createdAt: {
            ...(date.from && { gte: new Date(date.from) }),
            ...(date.to && { lte: new Date(date.to) }),
          },
        }
      : {}),
    ...filter,
  };

  // Build select object based on requested fields
  const defaultSelect = {
    id: true,
    headline: true,
    description: true,
    sourceName: true,
    url: true,
    urlToImage: true,
    categoryId: true,
    userId: true,
    tagId: true,
    keywords: true,
    publishedAt: true,
    updatedAt: true,
  };

  const select = fields.length
    ? fields.reduce<Record<string, boolean>>((acc, field) => {
        acc[field] = true;
        return acc;
      }, {})
    : defaultSelect;

  // Fetch total count and articles concurrently
  const [totalCount, articles] = await Promise.all([
    prisma.article.count({ where }),
    prisma.article.findMany({
      where,
      skip,
      take: limit,
      select,
      orderBy: { [sort.field]: sort.order },
    }),
  ]);

  const totalPages = Math.ceil(totalCount / limit);

  return {
    metadata: {
      totalCount,
      totalPages,
      currentPage: page,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
      nextPage: page < totalPages ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null,
    },
    articles,
  };
};




// Service function to get an article by ID
export const getArticleByIdService = async (articleId: string) => {
  if (!articleId) {
    throw new Error("Article ID is required");
  }

  const article = await prisma.article.findUnique({
    where: { id: articleId },
    select: {
      id: true,
      headline: true,
      description: true,
      sourceName: true,
      url: true,
      urlToImage: true,
      categoryId: true,
      userId: true,
      tagId: true,
      keywords: true,
      publishedAt: true,
      updatedAt: true,
      category: { select: { id: true, name: true } }, // Include category details
      User: { select: { id: true, username: true } }, // Include user details
      Tag: { select: { id: true, name: true } }, // Include tag details
    },
  });

  if (!article) {
    throw new Error("Article not found");
  }

  return article;
};


// Service function to update an article
export const updateArticleService = async (id: string, articleData: Partial<IArticle>) => {
  if (!id) {
    throw new Error("Article ID is required");
  }

  // Check if the article exists before updating
  const existingArticle = await prisma.article.findUnique({
    where: { id },
  });

  if (!existingArticle) {
    throw new Error("Article not found");
  }

  // Update the article
  const updatedArticle = await prisma.article.update({
    where: { id },
    data: articleData,
    select: {
      id: true,
      headline: true,
      description: true,
      sourceName: true,
      url: true,
      urlToImage: true,
      categoryId: true,
      userId: true,
      tagId: true,
      keywords: true,
      publishedAt: true,
      updatedAt: true,
    },
  });

  return updatedArticle;
};


// Service function to delete an article
export const deleteArticleService = async (id: string) => {
  if (!id) {
    throw new Error("Article ID is required");
  }

  // Check if the article exists before deleting
  const existingArticle = await prisma.article.findUnique({
    where: { id },
  });

  if (!existingArticle) {
    throw new Error("Article not found");
  }

  // Delete the article
  const deletedArticle = await prisma.article.delete({
    where: { id },
    select: {
      id: true,
      headline: true,
    },
  });

  return deletedArticle;
};