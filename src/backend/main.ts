import createApp from "./app";
import * as config from './config'
import {AppDataSource} from "./common/data-source";
import InitTestData from "./common/InitTestData";

(async () => {
    await AppDataSource.initialize();
    console.log('Success connection to db');
    await InitTestData();
})()

createApp().then(app => {
    app.listen(config.PORT, () => {
        console.log(`server started`);
    });
})
