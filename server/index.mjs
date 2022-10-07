import express from "express";
import cors from "cors";
import router from "./routes/routes.mjs";
import { config } from "dotenv";

config()

const app = express();
const PORT = 8300;

app.use(cors());
app.use(express.json());

//entry route for all routes in API routes
app.use("/users", router)


app.listen(PORT, () => console.log(`Hola! Server is running on port ${PORT}`));
