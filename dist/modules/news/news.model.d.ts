import { INews } from "./news.interface";
export declare const Article: import("mongoose").Model<INews, {}, {}, {}, import("mongoose").Document<unknown, {}, INews> & INews & {
    _id: import("mongoose").Types.ObjectId;
}, any>;
