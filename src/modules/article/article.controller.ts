import { Request, Response, NextFunction } from "express";
import { createArticleService, deleteArticleService, getArticleByIdService, getArticlesService, updateArticleService } from "./article.service";
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
    const queryParams = {
      ...req.query,
      page: req.query.page ? parseInt(req.query.page as string) : undefined,
      limit: req.query.limit ? parseInt(req.query.limit as string) : undefined,
      fields: req.query.fields ? (req.query.fields as string).split(",") : undefined,
      sort: req.query.sort
        ? {
            field: (req.query.sort as any).field || "updatedAt",
            order: (req.query.sort as any).order || "desc",
          }
        : undefined,
      category: Array.isArray(req.query.category) ? req.query.category : typeof req.query.category === 'string' ? req.query.category.split(",") : undefined,
      tag: Array.isArray(req.query.tag) ? req.query.tag : typeof req.query.tag === 'string' ? req.query.tag.split(",") : undefined,
      syncMode: req.query.syncMode === "true",
    };
    

    const validatedOptions = GetArticlesOptionsSchema.parse(queryParams);
    const result = await getArticlesService(validatedOptions);
    
    return res.status(200).json({
      success: true,
      ...result,
      message: "Articles retrieved successfully"
    });
  } catch (error) {
    next(error);
  }
};


// Controller function to get id articles
export const getArticleByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "ID parameter is required" });
  }

  try {
    const article = await getArticleByIdService(id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    return res.status(200).json(article);
  } catch (error) {
    console.error("Error in getArticleByIdController:", error);
    return res.status(500).json({ message: "Internal server error" });
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