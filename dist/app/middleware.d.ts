import express from "express";
import cors from "cors";
declare const middleware: (((req: express.Request, res: express.Response, next: express.NextFunction) => void) | ((req: cors.CorsRequest, res: {
    statusCode?: number | undefined;
    setHeader(key: string, value: string): any;
    end(): any;
}, next: (err?: any) => any) => void))[];
export default middleware;
