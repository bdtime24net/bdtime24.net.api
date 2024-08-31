import { Router } from "express";
import newsRoutes from "../modules/news/news.routes";
import articleRoutes from "../modules/article/article.routes";

type IModulerRoutes = { path: string; route: Router }[];

export const modulerRoutes: IModulerRoutes = [
  {
    path: "/",
    route: newsRoutes,
  },
  {
    path: "/",
    route: articleRoutes,
  },
];
