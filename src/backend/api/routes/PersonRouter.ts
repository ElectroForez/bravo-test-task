import express from "express";
import PersonController from "../controllers/PersonController";

export const router = express.Router();

const personsPath = '/persons';

router.get(personsPath, PersonController.getPersons);
