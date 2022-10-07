import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.PG_HOST || 'localhost',
    port: Number(process.env.PG_PORT) || 5432,
    username: process.env.PG_USER || 'postgres',
    password: process.env.PG_PASS,
    database: process.env.PG_DB || 'postgres',
    synchronize: true,
    entities: ['src/backend/entity/*.ts']
});
