import { Router, Request, Response } from "express";
import db from "../db";
import { nanoid } from "nanoid";
import { join } from "path";
import * as fs from "fs";
import { paginateItems } from "../utils";
import multer from "multer";

// Тип для Request з файлами Multer
interface MulterRequest extends Request {
  files?: Express.Multer.File[];
}

const router = Router();
const uploadDir = join(__dirname, "..", "..", "uploads");

// Переконуємось, що папка для завантажень існує
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// Налаштування Multer
const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, uploadDir),
  filename: (_, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// ---------------- CRUD ----------------

// Get all heroes with pagination
router.get("/", async (req: Request, res: Response) => {
  await db.read();
  if (!db.data) db.data = { heroes: [] };

  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 5);

  const heroes = db.data.heroes;
  const total = heroes.length;
  const items = paginateItems(heroes, page, limit);

  res.json({ items, total, page, limit });
});

// Get single hero by id
router.get("/:id", async (req: Request, res: Response) => {
  await db.read();
  if (!db.data) db.data = { heroes: [] };

  const hero = db.data.heroes.find((h) => h.id === req.params.id);
  if (!hero) return res.status(404).json({ message: "Not found" });
  res.json(hero);
});

// Create hero
router.post("/", async (req: Request, res: Response) => {
  await db.read();
  if (!db.data) db.data = { heroes: [] };

  const payload = req.body;
  const newHero = {
    id: nanoid(),
    nickname: payload.nickname || "Unknown",
    real_name: payload.real_name || "",
    origin_description: payload.origin_description || "",
    superpowers: payload.superpowers || "",
    catch_phrase: payload.catch_phrase || "",
    images: [],
    createdAt: new Date().toISOString(),
  };

  db.data.heroes.unshift(newHero);
  await db.write();

  res.status(201).json(newHero);
});

// Update hero
router.put("/:id", async (req: Request, res: Response) => {
  await db.read();
  if (!db.data) db.data = { heroes: [] };

  const idx = db.data.heroes.findIndex((h) => h.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: "Not found" });

  const updated = {
    ...db.data.heroes[idx],
    ...req.body,
    updatedAt: new Date().toISOString(),
  };

  db.data.heroes[idx] = updated;
  await db.write();
  res.json(updated);
});

// Delete hero
router.delete("/:id", async (req: Request, res: Response) => {
  await db.read();
  if (!db.data) db.data = { heroes: [] };

  const idx = db.data.heroes.findIndex((h) => h.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: "Not found" });

  const hero = db.data.heroes[idx];
  // видаляємо картинки
  for (const img of hero.images) {
    const p = join(uploadDir, img.filename);
    if (fs.existsSync(p)) fs.unlinkSync(p);
  }

  db.data.heroes.splice(idx, 1);
  await db.write();

  res.json({ message: "Deleted" });
});

// Upload images
// Upload images
router.post(
  "/:id/images",
  upload.array("images", 10),
  async (req: Request, res: Response) => {
    await db.read();
    if (!db.data) db.data = { heroes: [] };

    const hero = db.data.heroes.find((h) => h.id === req.params.id);
    if (!hero) return res.status(404).json({ message: "Not found" });

    // TS правильно визначає req.files як Array<Express.Multer.File> | undefined
    const files = req.files as Express.Multer.File[] | undefined;
    if (!files || files.length === 0)
      return res.status(400).json({ message: "No files uploaded" });

    const added = files.map((f) => ({
      id: nanoid(),
      url: `/uploads/${f.filename}`,
      filename: f.filename,
    }));

    hero.images.push(...added);
    hero.updatedAt = new Date().toISOString();
    await db.write();

    res.json(added);
  }
);

// Delete image
router.delete("/:id/images/:imgId", async (req: Request, res: Response) => {
  await db.read();
  if (!db.data) db.data = { heroes: [] };

  const hero = db.data.heroes.find((h) => h.id === req.params.id);
  if (!hero) return res.status(404).json({ message: "Not found" });

  const idx = hero.images.findIndex((i) => i.id === req.params.imgId);
  if (idx === -1) return res.status(404).json({ message: "Image not found" });

  const [img] = hero.images.splice(idx, 1);
  const p = join(uploadDir, img.filename);
  if (fs.existsSync(p)) fs.unlinkSync(p);

  hero.updatedAt = new Date().toISOString();
  await db.write();
  res.json({ message: "Image deleted" });
});

export default router;
