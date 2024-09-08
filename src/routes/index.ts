import { Router } from "express";
import newsRoutes from "../modules/news/news.routes";
import articleRoutes from "../modules/article/article.routes";
import authRoutes from "../modules/auth/auth.routes";
import categoryRoutes from "../modules/category/category.routes";
import tagsRoutes from "../modules/tag/tag.routes";
import userRoutes from "../modules/user/user.routes";

type IModulerRoutes = { path: string; route: Router }[];

export const modulerRoutes: IModulerRoutes = [
  {
    path: "/auth",
    route: authRoutes,
  },

  {
    path: "/",
    route: userRoutes,
  },

  {
    path: "/",
    route: newsRoutes,
  },
  {
    path: "/",
    route: articleRoutes,
  },
  {
    path: "/",
    route: categoryRoutes,
  },
  {
    path: "/",
    route: tagsRoutes,
  }
];
