import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import testRoute from "./routes/test.route";
import chatRoute from "./routes/chat.route";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Spur AI Chat Backend Running 🚀",
  });
});

app.use("/test", testRoute);
app.use("/chat", chatRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});