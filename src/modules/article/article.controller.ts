import { Request, Response, NextFunction } from "express";
import { createArticleService, getArticlesService } from "./article.service";
import { ArticleSchema } from "./article.validation";

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
    const articles = await getArticlesService();
    return res.status(200).json({
      success: true,
      data: articles,
      message: "Articles retrieved successfully",
      error: null,
    });
  } catch (error) {
    next(error);
  }
};
