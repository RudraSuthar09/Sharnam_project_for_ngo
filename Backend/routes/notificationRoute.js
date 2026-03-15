import express from "express";
import { sendFormSubmissionEmail } from "../controllers/notificationController.js";

const notificationRouter = express.Router();

notificationRouter.post("/form-submission", sendFormSubmissionEmail);

export default notificationRouter;
