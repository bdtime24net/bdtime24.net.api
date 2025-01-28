import prisma from "../../utils/prisma";
import { IArticle, IGetArticlesOptions } from "./article.validation";

// Service function to create a new article
export const createArticleService = async (aeticleData: IArticle) => {
//  // check if the article already exists
 const existingArticle = await prisma.article.findFirst({
  where: {
   headline: aeticleData.headline
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
    headline: true
  }
 });
 return article;
};


// Service function to get all articles
export const getArticlesService = async (articleData: IGetArticlesOptions & { syncMode?: boolean }) => {
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
    syncMode = false, // ডিফল্ট অ্যাসিনক্রোনাস
  } = articleData;

  const skip = (page - 1) * limit;

  // Build filters
  const where: any = {};
  if (query) {
    where.OR = [
      { title: { contains: query, mode: 'insensitive' } },
      { description: { contains: query, mode: 'insensitive' } }
    ];
  }
  if (search) {
    where.AND = [
      { title: { contains: search, mode: 'insensitive' } }
    ];
  }
  if (filter) {
    Object.assign(where, filter);
  }
  if (category) {
    where.category = category;
  }
  if (author) {
    where.author = author;
  }
  if (date.from || date.to) {
    where.date = {
      ...(date.from && { gte: date.from }),
      ...(date.to && { lte: date.to }),
    };
  }

  // Get the total count of articles
  let totalCount = 0;
  if (!syncMode) {
    // অ্যাসিনক্রোনাস (ডিফল্ট)
    totalCount = await prisma.article.count({ where });
  } else {
    // সিনক্রোনাস (অপশনাল)
    prisma.article.count({ where }).then((count) => {
      totalCount = count;
    });
  }

  // Determine valid sort field
  const validSortFields = ['id', 'title', 'description', 'category', 'author', 'publishedAt', 'updatedAt'];
  const sortField = validSortFields.includes(sort.field) ? sort.field : 'updatedAt';

  // Fetch the paginated articles
  const articles = syncMode
    ? prisma.article.findMany({
        where,
        skip,
        take: limit,
        select: fields.length > 0 ? fields.reduce((acc, field) => {
          return acc;
        }, {
          id: true,
          title: true,
          description: true,
          category: true,
          author: true,
          publishedAt: true,
          updatedAt: true
        }) : undefined,
        orderBy: {
          [sortField]: sort.order,
        },
      })
    : await prisma.article.findMany({
        where,
        skip,
        take: limit,
        select: fields.length > 0 ? fields.reduce((acc, field) => {
          return acc;
        }, {
          id: true,
          title: true,
          description: true,
          category: true,
          author: true,
          publishedAt: true,
          updatedAt: true
        }) : undefined,
        orderBy: {
          [sortField]: sort.order,
        },
      });

  // Generate pagination metadata
  const totalPages = Math.ceil(totalCount / limit);
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;
  const nextLink = hasNextPage ? `/articles?page=${page + 1}&limit=${limit}` : null;
  const prevLink = hasPrevPage ? `/articles?page=${page - 1}&limit=${limit}` : null;

  return {
    articles,
    totalCount,
    totalPages,
    nextLink,
    prevLink
  };
};


// Service function to get slugs articles
export const getArticleBySlugService = async (slug: string): Promise<IArticle | null> => {
  try {
    const article = await prisma.article.findUnique({
      where: { slug },
    });

    return article;
    
  } catch (error) {
    console.error("Error fetching article by slug:", error);
    throw new Error("Unable to fetch article by slug");
  }
};





// Service function to update a article
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


// Service function to delete a article
export const deleteArticleService = async (id: string) => {
  const article = await prisma.article.delete({
    where: { id },
  });
  if (!article) {
    throw new Error("Article not found");
  }
  return article;
};