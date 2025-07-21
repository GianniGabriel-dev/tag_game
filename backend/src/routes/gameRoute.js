import express from "express"
import { getGame } from "../controller/gameController.js"

export const gameRouter = express.Router()

gameRouter.get("/:gameId", getGame)