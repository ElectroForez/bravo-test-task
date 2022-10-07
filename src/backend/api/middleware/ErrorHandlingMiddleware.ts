import {Errback, Request, Response, NextFunction} from "express";
import ApiError from "../errors/ApiError";

export default function ErrorHandlingMiddleware (err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof ApiError) {
        return res.status(err.status).json({ message: err.message });
    }
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
}
