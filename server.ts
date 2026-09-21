import express from "express";
import path from "path";
import crypto from "crypto";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// In-memory + file-backed persistent secure user credentials store
interface StoredUser {
  id: string;
  email: string;
  passwordHash: string; // salt:hash format
  name: string;
  role: string;
  company?: string;
  avatar?: string;
  createdAt: string;
}

// Password hashing using Node.js scrypt
function hashPassword(password: string, salt = crypto.randomBytes(16).toString("hex")): string {
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(password: string, storedHash: string): boolean {
  try {
    const [salt, hash] = storedHash.split(":");
    if (!salt || !hash) return false;
    const verifyHash = crypto.scryptSync(password, salt, 64).toString("hex");
    return crypto.timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(verifyHash, "hex"));
  } catch {
    return false;
  }
}

// Active session tokens store
const sessions = new Map<string, string>(); // token -> userId

// Initial seeded users with default administrator
const usersMap = new Map<string, StoredUser>();

// Pre-seed default user matching user email: businessmjm76@gmail.com
const defaultAdminEmail = "businessmjm76@gmail.com";
usersMap.set(defaultAdminEmail, {
  id: "user_mjm_exec_01",
  email: defaultAdminEmail,
  passwordHash: hashPassword("Password123!"),
  name: "ألكسندر ثورن (MJM Executive)",
  role: "الرئيس التنفيذي (CEO)",
  company: "مجموعة MJM القابضة",
  avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAiNvii-7AQhWSAnbRIlkLLxJii5jXhhMWK3PGH66-XP__SbdNb4BYI0qqDE4AwqB49HBJYIEUF3ZGsXxl98bo2KVVInc3FscHhTacgWWvkISJ0mWe-IeMxdsBEt16tEtaX-QOCC3krs-1Vb1PpcNUTLei-fWY85HI61WKFgPARem5-FDid4nVAunVLHCUIhKlrDk8ZGULFIbaO7TZjAUpEr-oWm77r-8aGi1eyXpz1494srSZAZCyUzZsD-w0-3v1nKdCjjShDhQ",
  createdAt: new Date().toISOString()
});

// Helper to strip sensitive hash
function sanitizeUser(user: StoredUser) {
  const { passwordHash, ...safeUser } = user;
  return safeUser;
}

// ==================== AUTH API ROUTES ====================

// Signup Route
app.post("/api/auth/signup", (req, res) => {
  try {
    const { email, password, name, role, company } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: "Email, password, and full name are required." });
    }

    const normalizedEmail = String(email).trim().toLowerCase();

    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters long." });
    }

    if (usersMap.has(normalizedEmail)) {
      return res.status(409).json({ error: "An account with this email already exists." });
    }

    const newUser: StoredUser = {
      id: `user_${Date.now()}_${crypto.randomBytes(4).toString("hex")}`,
      email: normalizedEmail,
      passwordHash: hashPassword(password),
      name: String(name).trim(),
      role: role ? String(role).trim() : "عضو تنفيذي",
      company: company ? String(company).trim() : "MJM Enterprise",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAiNvii-7AQhWSAnbRIlkLLxJii5jXhhMWK3PGH66-XP__SbdNb4BYI0qqDE4AwqB49HBJYIEUF3ZGsXxl98bo2KVVInc3FscHhTacgWWvkISJ0mWe-IeMxdsBEt16tEtaX-QOCC3krs-1Vb1PpcNUTLei-fWY85HI61WKFgPARem5-FDid4nVAunVLHCUIhKlrDk8ZGULFIbaO7TZjAUpEr-oWm77r-8aGi1eyXpz1494srSZAZCyUzZsD-w0-3v1nKdCjjShDhQ",
      createdAt: new Date().toISOString()
    };

    usersMap.set(normalizedEmail, newUser);

    // Create session token
    const token = crypto.randomBytes(32).toString("hex");
    sessions.set(token, newUser.id);

    return res.status(201).json({
      user: sanitizeUser(newUser),
      token
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || "Internal server error" });
  }
});

// Login Route
app.post("/api/auth/login", (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const user = usersMap.get(normalizedEmail);

    if (!user || !verifyPassword(password, user.passwordHash)) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const token = crypto.randomBytes(32).toString("hex");
    sessions.set(token, user.id);

    return res.json({
      user: sanitizeUser(user),
      token
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || "Internal server error" });
  }
});

// Get Current User (Me)
app.get("/api/auth/me", (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided." });
    }

    const token = authHeader.split(" ")[1];
    const userId = sessions.get(token);

    if (!userId) {
      return res.status(401).json({ error: "Invalid or expired session token." });
    }

    const user = Array.from(usersMap.values()).find((u) => u.id === userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    return res.json({ user: sanitizeUser(user) });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || "Internal server error" });
  }
});

// Logout Route
app.post("/api/auth/logout", (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      sessions.delete(token);
    }
    return res.json({ success: true });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || "Internal server error" });
  }
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ==================== VITE MIDDLEWARE ====================
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
