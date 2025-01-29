import { Request, Response, NextFunction } from "express";
import { createArticleService, deleteArticleService, getArticleByIdService, getArticlesService, updateArticleService } from "./article.service";
import { ArticleSchema, GetArticlesOptionsSchema, updateArticleSchema } from "./article.validation";
import { ZodError } from "zod";

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
      return res.status(400).json({
        success: false,
        error: parsedBody.error.format(),
        message: "Invalid input data",
      });
    }


    const article = await createArticleService(parsedBody.data);
    return res.status(201).json({
      success: true,
      message: "Article created successfully",
      data: article,
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
    // Convert query params into the correct data types
    const queryParams = {
      ...req.query,
      page: req.query.page ? parseInt(req.query.page as string, 10) : undefined,
      limit: req.query.limit ? parseInt(req.query.limit as string, 10) : undefined,
      fields: req.query.fields ? (req.query.fields as string).split(",") : undefined,
    };

    // Validate and parse query params
    const validatedOptions = GetArticlesOptionsSchema.parse(queryParams);
    const result = await getArticlesService(validatedOptions);

    return res.status(200).json({
      success: true,
      message: "Articles retrieved successfully",
      ...result.metadata,
      articles: result.articles,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ success: false, error: error.format(), message: "Validation error" });
    }
    next(error);
  }
};


// Controller function to get an article by ID
export const getArticleByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { id } = req.params; // Get article ID from URL

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Article ID is required",
      });
    }

    const article = await getArticleByIdService(id);

    return res.status(200).json({
      success: true,
      message: "Article retrieved successfully",
      data: article,
    });
  } catch (error) {
    next(error);
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

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Article ID is required",
      });
    }

    // Validate request body
    const parsedBody = updateArticleSchema.safeParse(req.body);

    if (!parsedBody.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid request data",
        error: parsedBody.error.format(),
      });
    }

    // Update the article
    const updatedArticle = await updateArticleService(id, parsedBody.data);

    return res.status(200).json({
      success: true,
      message: "Article updated successfully",
      data: updatedArticle,
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
      return res.status(400).json({
        success: false,
        message: "Article ID is required",
      });
    }

    // Delete the article
    const deletedArticle = await deleteArticleService(id);

    return res.status(200).json({
      success: true,
      message: "Article deleted successfully",
      data: deletedArticle,
    });
  } catch (error) {
    next(error);
  }
};