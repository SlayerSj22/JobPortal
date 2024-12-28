import express from 'express'
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from '../controllers/application.controller.js';
import { isAuthenticated } from '../middlewares/isAuthenticated.js';

const applicationRouter= express.Router();

applicationRouter.route("/apply/:id").get(isAuthenticated,applyJob);

applicationRouter.route("/getApplied").get(isAuthenticated,getAppliedJobs);

applicationRouter.route("/:id/getApplicants").get(isAuthenticated,getApplicants);

applicationRouter.route("/status/:id/update").post(isAuthenticated,updateStatus);

export {
    applicationRouter
}