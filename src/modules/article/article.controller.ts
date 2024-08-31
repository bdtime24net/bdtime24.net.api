// import { Request, Response, NextFunction } from "express";
// import prisma from "../../utils/prisma";
// import { articleValidationSchema } from "./article.validation";

// export const createArticleController = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     // Parse and validate the request body
//     const parsedBody = articleValidationSchema.safeParse(req.body);

//     if (!parsedBody.success) {
//       return res
//         .status(400)
//         .json({ error: parsedBody.error.errors[0].message });
//     }

//     const { title, content, authorId } = parsedBody.data;

//     // Check if the article with the same title and content already exists
//     const existingArticle = await prisma.article.findFirst({
//       where: {
//         title,
//         content,
//       },
//     });

//     if (existingArticle) {
//       return res.status(409).json({ error: "Article already exists" });
//     }

//     // Create the new article
//     const newArticle = await prisma.article.create({
//       data: {
//         ...(parsedBody.data as any),
//       },
//     });

//     return res.status(201).json({
//       message: "Article created successfully",
//       data: newArticle,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

import { Request, Response, NextFunction } from "express";
import prisma from "../../utils/prisma";
import { articleValidationSchema } from "./article.validation";

export const createArticleController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const parsedBody = articleValidationSchema.safeParse(req.body);

    if (!parsedBody.success) {
      throw new Error(parsedBody.error.errors[0].message);
    }

    const { authorId, title, content, published, tags } = parsedBody.data;

    // // Convert the tags into a format Prisma expects
    // const tagConnections = tags.map((tagName) => ({
    //   where: { name: tagName },
    //   create: { name: tagName },
    // }));

    // Create the new article
    const newArticle = await prisma.article.create({
      data: {
        authorId,
        title,
        content,
        published,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    res.status(201).json({
      message: "Article created successfully",
      data: newArticle,
    });
  } catch (error) {
    next(error);
  }
};
