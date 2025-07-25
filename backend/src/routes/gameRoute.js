import express from "express"
import { endGameTime, getGame, postScore, startGameTime } from "../controller/gameController.js"

export const gameRouter = express.Router()

gameRouter.get("/:gameId", getGame),
gameRouter.post("/:gameId/score", postScore)
gameRouter.get("/:gameId/start", startGameTime)
gameRouter.get("/:gameId/end", endGameTime)