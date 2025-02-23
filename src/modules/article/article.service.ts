import prisma from "../../utils/prisma";
import { IArticle, IGetArticlesOptions } from "./article.validation";

// Service function to create a new article
export const createArticleService = async (articleData: IArticle) => {
  // Check if the article already exists
  const existingArticle = await prisma.article.findFirst({
    where: {
      headline: articleData.headline,
    },
  });

  if (existingArticle) {
    throw new Error("Article already exists");
  }

  // Create article
  const article = await prisma.article.create({
    data: articleData,
    select: {
      headline: true,
    },
  });
  return article;
};

// Service function to get all articles
export const getArticlesService = async (articleData: IGetArticlesOptions) => {
  const {
    page = 1,
    limit = 10,
    fields = [],
    sort = { field: "updatedAt", order: "desc" },
    query = "",
    search = "",
    filter = {},
    category = "",
    tag="",
    author = "",
    date = {},
  } = articleData;

  const skip = (page - 1) * limit;

  // Build where clause
  const where: any = {
    ...(query && {
      OR: [
        { headline: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ],
    }),
    ...(search && {
      headline: { contains: search, mode: "insensitive" },
    }),
    ...(category && { categoryId: { in: Array.isArray(category) ? category : [category] } }),
...(tag && { tagId: { in: Array.isArray(tag) ? tag : [tag] } }),

    ...(author && { userId: author }),
    ...(date.from || date.to) && {
      createdAt: {
        ...(date.from && { gte: new Date(date.from) }),
        ...(date.to && { lte: new Date(date.to) }),
      },
    },
    ...filter,
  };

  // Build select object based on requested fields
  const select =
    fields.length > 0
      ? fields.reduce((acc: Record<string, boolean>, field: string) => {
          acc[field] = true;
          return acc;
        }, {})
      : {
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

  const [totalCount, articles] = await Promise.all([
    prisma.article.count({ where }),
    prisma.article.findMany({
      where,
      skip,
      take: limit,
      select,
      orderBy: {
        [sort.field]: sort.order,
      },
    }),
  ]);

  const totalPages = Math.ceil(totalCount / limit);
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

  return {
    metadata: {
      totalCount,
      totalPages,
      currentPage: page,
      hasNextPage,
      hasPrevPage,
      nextPage: hasNextPage ? page + 1 : null,
      prevPage: hasPrevPage ? page - 1 : null,
      articles,
    },
  };
};

// Service function to get an article by ID
export const getArticleByIdService = async (id: string): Promise<IArticle | null> => {
  return prisma.article.findUnique({ where: { id } });
};

// Service function to update an article
export const updateArticleService = async (id: string, articleData: IArticle) => {
  const article = await prisma.article.update({
    where: { id },
    data: articleData,
  });
  if (!article) {
    throw new Error("Article not found");
  }
  return article;
};

// Service function to delete an article
export const deleteArticleService = async (id: string) => {
  const article = await prisma.article.delete({
    where: { id },
  });
  if (!article) {
    throw new Error("Article not found");
  }
  return article;
};
