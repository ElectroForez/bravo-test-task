import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {DocumentApplication} from "./DocumentApplication";

@Entity()
export class Person {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    fullName!: string;

    @OneToMany(() => DocumentApplication, application => application.person,
        {
            cascade: true
        })
    documentApplications!: DocumentApplication[];
}
