import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {DocumentApplication} from "./DocumentApplication";

@Entity()
export class Document {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({unique: true})
    name!: string;

    @Column()
    isPurchased!: boolean;

    @OneToMany(() => DocumentApplication, application => application.document,
        {
            cascade: true
        })
    documentApplications!: DocumentApplication[];
}
