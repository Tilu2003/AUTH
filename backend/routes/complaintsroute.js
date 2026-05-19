import express from "express";
import { getComplaints, postComplaints } from "../controllers/complaintController.js";

const complaintsRouter = express.Router();

complaintsRouter.get("/", getComplaints);
complaintsRouter.post("/", postComplaints);

export default complaintsRouter;