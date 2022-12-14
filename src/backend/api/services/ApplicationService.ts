import {DocumentApplication} from "../../entity/DocumentApplication";
import {AppDataSource} from "../../common/data-source";
import {PostApplication} from "../../common/dto/DocumentApplication";
import {Document} from "../../entity/Document";
import {Person} from "../../entity/Person";
import ApiError from "../errors/ApiError";

export default class ApplicationService {
    ApplicationRepository = AppDataSource.getRepository(DocumentApplication);
    DocumentRepository = AppDataSource.getRepository(Document);
    PersonRepository = AppDataSource.getRepository(Person);

    async getApplications() {
        const result = await this.ApplicationRepository.find();
        result.forEach(() => console.log(result))
        return result;
    }

    async postApplications(applicationData: PostApplication) {
        const person = await this.PersonRepository.findOneBy({id: applicationData.personId});

        if (!person) throw ApiError.NotFound(`Работник с id ${applicationData.personId} не найден`);

        let document = await this.DocumentRepository.findOne({
            where: {name: applicationData.documentName},
            relations: {
                documentApplications: {
                    person: true
                }
            }
        });

        if (document) {
            const result = document.documentApplications
                .filter(application => application.person.id === applicationData.personId);
            if (result.length) throw ApiError.Forbidden('Заявка на данный документ была уже отправлена');

        } else if (!document) {
            document = new Document();
            document.name = applicationData.documentName;
            document.isPurchased = false;

            document = await this.DocumentRepository.save(document);
        }

        const application = new DocumentApplication();
        application.person = person;
        application.document = document;

        const result = await this.ApplicationRepository.save(application);
        return result;
    }

    async getApplicationStat() {
        const result = await this.ApplicationRepository.createQueryBuilder("doc_app")
            .select('document.name as documentName, COUNT(doc_app.person)')
            .innerJoin('doc_app.document', 'document')
            .groupBy('document.name')
            .orderBy('COUNT(doc_app.person)', 'DESC')
            .getRawMany();
        return result;
    }
}
