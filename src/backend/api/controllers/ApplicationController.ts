import {NextFunction, Request, Response} from "express";
import ApplicationService from "../services/ApplicationService";
import {PostApplication} from "../../common/dto/DocumentApplication";
import ApiError from "../errors/ApiError";
import expressAsyncHandler from "express-async-handler";

export default class ApplicationController {
    static applicationService = new ApplicationService();

    static async getApplications(req: Request, res: Response) {
        const result = await ApplicationController.applicationService.getApplications();
        res.send(result);
    }

    static async postApplication(req: Request, res: Response, next: NextFunction) {
        expressAsyncHandler(async (req, res, next) => {
            const body: PostApplication = req.body;

            const {documentName, personId} = body;

            if (!(documentName && personId)) {
                throw ApiError.BadRequest('Не все параметры заполнены');
            }

            const result = await ApplicationController.applicationService.postApplications(body);

            res.send(result);
        })(req, res, next);
    }

    static async getApplicationsStat(req: Request, res: Response) {
        const result = await ApplicationController.applicationService.getApplicationStat();
        res.send(result);
    }
}
