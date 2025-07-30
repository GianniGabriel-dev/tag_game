import express from "express";
import cors from "cors";
import { gameRouter } from "./routes/gameRoute.js";
const app = express();
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:5173", // solo este origen puede hacer peticiones
};

app.use(cors(corsOptions));
const PORT = process.env.PORT || 3000;

app.use("/", gameRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
