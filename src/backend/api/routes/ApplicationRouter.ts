import express from "express";
import ApplicationController from "../controllers/ApplicationController";

export const router = express.Router();

const applicationPath = '/applications';

router.get(applicationPath, ApplicationController.getApplications);

router.post(applicationPath, ApplicationController.postApplication);

router.get(applicationPath + '/stat', ApplicationController.getApplicationsStat);
