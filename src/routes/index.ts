import { Router } from "express";
import newsRoutes from "../modules/news/news.routes";
import articleRoutes from "../modules/article/article.routes";
import authRoutes from "../modules/auth/auth.routes";

type IModulerRoutes = { path: string; route: Router }[];

export const modulerRoutes: IModulerRoutes = [
  {
    path: "/auth",
    route: authRoutes,
  },

  {
    path: "/",
    route: newsRoutes,
  },
  {
    path: "/",
    route: articleRoutes,
  },
];
