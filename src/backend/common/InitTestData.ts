import {AppDataSource} from "./data-source";
import {Document} from "../entity/Document";
import {Person} from "../entity/Person";
import {DocumentApplication} from "../entity/DocumentApplication";

export default async function InitTestData() {

    const DocumentRepository = AppDataSource.getRepository(Document);
    const PersonRepository = AppDataSource.getRepository(Person);
    const ApplicationRepository = AppDataSource.getRepository(DocumentApplication);

    const documents = Array.from({length: 3}, (v, k) => {
        const doc = new Document();
        doc.name = 'ГОСТ 00' + k;
        doc.isPurchased = false;
        doc.documentApplications = [];
        return doc;
    })

    for (const document of documents) {
        const i = documents.indexOf(document);

        const candidate = await DocumentRepository.findOneBy({name: document.name});
        if (candidate) {
            documents[i] = candidate;
        } else {
            documents[i] = await DocumentRepository.save(document);
        }
    }

    const persons = ['Иванов И. И.', "Петров П. П.", "Сидоров С. С."].map(fullName => {
        const person = new Person();
        person.fullName = fullName;
        person.documentApplications = [];
        return person;
    })

    for (const person of persons) {
        const i = persons.indexOf(person);
        const candidate = await PersonRepository.findOneBy({fullName: person.fullName});

        if (candidate){
            persons[i] = candidate;
        } else {
            persons[i] = await PersonRepository.save(person);
        }
    }

    // save applications
    for (const person of persons) {
        const personIndex = persons.indexOf(person);


        const applicationDocuments = documents.filter((_, i) => i <= personIndex);

        for (const document of applicationDocuments) {
            const candidate = await ApplicationRepository.findOneBy({person, document});
            if (!candidate) {
                const application = new DocumentApplication();
                application.person = person;
                application.document = document;
                await ApplicationRepository.save(application);
            }
        }
    }
}
