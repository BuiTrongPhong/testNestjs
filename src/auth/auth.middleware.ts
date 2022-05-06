import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";

@Injectable()
export class authMiddleaware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const token = req.headers['authorization']
        console.log('token')
        next();
    }

}