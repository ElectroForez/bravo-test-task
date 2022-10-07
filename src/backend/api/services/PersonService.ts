import {AppDataSource} from "../../common/data-source";
import {Person} from "../../entity/Person";
import ApiError from "../errors/ApiError";


export default class PersonService {
    PersonRepository = AppDataSource.getRepository(Person);

    async getPersons() {
        const result = await this.PersonRepository.find();
        return result;
    }
}
