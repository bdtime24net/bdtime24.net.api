import { Request, Response, NextFunction } from "express";
import { createArticleService, deleteArticleService, getArticleBySlugService, getArticlesService, getLatestArticlesService, updateArticleService } from "./article.service";
import { ArticleSchema, GetArticlesOptionsSchema } from "./article.validation";

// Controller function to create a new article
export const createArticleController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    // Parse and validate the request body
    const parsedBody = ArticleSchema.safeParse(req.body);

    if (!parsedBody.success) {
      return res.status(400).json({ error: parsedBody.error.message });
    }

    const article = await createArticleService(parsedBody.data);
    return res.status(201).json({
      success: true,
      data: article,
      message: "Article created successfully",
      error: null,
    });
  } catch (error) {
    next(error);
  }
};


// Controller function to get all articles
export const getArticlesController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
     // Extract and parse query parameters
     const queryParams = {
      page: parseInt(req.query.page as string, 10) || undefined,
      limit: parseInt(req.query.limit as string, 10) || undefined,
      fields: req.query.fields ? (Array.isArray(req.query.fields) ? req.query.fields : [req.query.fields]) : undefined,
      sort: req.query.sort ? JSON.parse(req.query.sort as string) : undefined, // Ensure it's an object
      query: req.query.query as string,
      search: req.query.search as string,
      filter: req.query.filter ? JSON.parse(req.query.filter as string) : undefined, // Ensure it's an object
      category: req.query.category as string,
      author: req.query.author as string,
      date: req.query.date ? JSON.parse(req.query.date as string) : undefined // Ensure it's an object
    };

    // Validate and parse query parameters using Zod schema
    const parsedQuery = GetArticlesOptionsSchema.safeParse(queryParams);

    if (!parsedQuery.success) {
      return res.status(400).json({ error: parsedQuery.error.errors });
    }

    // Apply default values if parameters are not provided
    const options = {
      page: parsedQuery.data.page ?? 1,
      limit: parsedQuery.data.limit ?? 10,
      fields: parsedQuery.data.fields,
      sort: parsedQuery.data.sort,
      query: parsedQuery.data.query,
      search: parsedQuery.data.search,
      filter: parsedQuery.data.filter,
      category: parsedQuery.data.category,
      author: parsedQuery.data.author,
      date: parsedQuery.data.date
    };

    // Pass validated parameters to the service
    const result = await getArticlesService(options);

    return res.status(200).json({
      success: true,
      totalCount: result.totalCount,
      totalPages: result.totalPages,
      nextLink: result.nextLink,
      prevLink: result.prevLink,
      message: "Articles retrieved successfully",
      error: null,
      data: result.articles,
     
    });
  } catch (error) {
    next(error);
  }
};


// Controller function to get slugs articles
export const getArticleBySlugController = async (req: Request, res: Response) => {
  const { slug } = req.params;

  if (!slug) {
    return res.status(400).json({ message: "Slug parameter is required" });
  }

  try {
    const article = await getArticleBySlugService(slug);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    return res.status(200).json(article);
  } catch (error) {
    console.error("Error in getArticleBySlugController:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


// // Controller function to get a single article
// export const getArticleByIdController = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<Response | void> => {
//   try {
//     const { id } = req.params;
//     const article = await getArticleByIdService(id);
//     return res.status(200).json({
//       success: true,
//       data: article,
//       message: "Article retrieved successfully",
//       error: null,
//     });
//   } catch (error) {
//     next(error);
//   }
// };


export const getLatestArticlesController = async (req: Request, res: Response) => {
  try {
    const articles = await getLatestArticlesService();

    if (!articles || articles.length === 0) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.status(200).json({ data: articles });
  } catch (error) {
    console.error("Error in getLatestArticlesController:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function to update a article
export const updateArticleController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { id } = req.params;
    const parsedBody = ArticleSchema.safeParse(req.body);
    if (!parsedBody.success) {
      return res.status(400).json({ error: parsedBody.error.message });
    }
    const article = await updateArticleService(id, parsedBody.data);
    return res.status(200).json({
      success: true,
      data: article,
      message: "Article updated successfully",
      error: null,
    });
  } catch (error) {
    next(error);
  } 
};


// Controller function to delete a article
export const deleteArticleController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { id } = req.params;
    

    if (!id) {
      return res.status(400).json({ error: "Article ID is required" });
    }

    const article = await deleteArticleService(id);
    return res.status(200).json({
      success: true,
      data: article,
      message: "Article deleted successfully",
      error: null,
    });
  } catch (error) {
    next(error);
  }
};