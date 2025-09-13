import express from "express";
import cors from "cors";
import path from "path";
import heroesRouter from "./routes/heroes";
import { initDB } from "./db";

const app = express();

// ✅ CORS для всіх джерел (у продакшн краще вказати конкретний домен)
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// ✅ Middleware для JSON і urlencoded форм
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Обслуговування статичних файлів з папки uploads
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// Маршрути для героїв
app.use("/heroes", heroesRouter);

// Ініціалізація БД і запуск сервера
initDB()
  .then(() => {
    app.listen(5000, () =>
      console.log("✅ Server running on http://localhost:5000")
    );
  })
  .catch((err) => {
    console.error("❌ Failed to init DB:", err);
    process.exit(1);
  });
