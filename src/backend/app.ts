import express, {Express} from "express";
import bodyParser from "body-parser";
import {glob} from "glob";
import ErrorHandlingMiddleware from "./api/middleware/ErrorHandlingMiddleware";

export default async function createApp(): Promise<Express> {
    const app = express();

    const documents = ['doc1', 'doc2'];
    app.use(bodyParser.json());

    app.get('/document', (req, res) => {
        res.send(documents);
    });

    const routersPath = glob.sync("./api/routes/*.ts", {cwd: __dirname});
    for (const routerPath of routersPath) {
        const routerName = routerPath.split('.').slice(0, -1).join('.'); //delete .ts
        const {router} = await import(routerName);
        app.use(router);
        console.log(`Server: added router from ${routerName}`);
    }

    app.use(ErrorHandlingMiddleware);

    return app;
}
