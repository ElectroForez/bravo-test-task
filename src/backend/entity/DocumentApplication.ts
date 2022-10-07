import {Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Person} from "./Person";
import {Document} from "./Document";


@Entity()
export class DocumentApplication {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Document, document => document.documentApplications)
    document!: Document;

    @ManyToOne(() => Person, person => person.documentApplications)
    person!: Person;
}
