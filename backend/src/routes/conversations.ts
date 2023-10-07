import express from "express";
import ConversationsController from "../controllers/conversations.js";

const router = express.Router();

router.post("/create", ConversationsController.createConversation);


export default router;