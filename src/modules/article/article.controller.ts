import { Request, Response, NextFunction } from "express";
import { createArticleService } from "./article.service";
import { ArticleSchema } from "./article.validation";

// Controller function to create a new article
export const createArticleController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Parse and validate the request body
    const parsedBody = ArticleSchema.safeParse(req.body);

    if (!parsedBody.success) {
      return res.status(400).json({ error: parsedBody.error });
    }

    const articleData = parsedBody.data;

    console.log(articleData);

    // // Use service to create the new article
    // const newArticle = await createArticleService(articleData);

    return res.status(201).json({
      message: "Article created successfully",
      // data: newArticle,
    });
  } catch (error) {
    next(error);
  }
};
