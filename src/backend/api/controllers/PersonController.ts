import {NextFunction, Request, Response} from "express";
import PersonService from "../services/PersonService";

export default class PersonController {
    static personsService = new PersonService();

    static async getPersons(req: Request, res: Response) {
        const result = await PersonController.personsService.getPersons();
        res.send(result);
    }
}
