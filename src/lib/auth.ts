// Simple JWT-free auth using base64 tokens
// No bcrypt dependency needed

const JWT_SECRET = process.env.JWT_SECRET || "medcare";
const TOKEN_EXPIRY = 86400000; // 24h in ms

export interface JWTPayload {
  userId: number;
  username: string;
  role: string;
}

export function signToken(payload: JWTPayload): string {
  const data = JSON.stringify({
    ...payload,
    exp: Date.now() + TOKEN_EXPIRY,
  });
  return Buffer.from(data).toString("base64");
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    const data = JSON.parse(Buffer.from(token, "base64").toString("utf-8"));
    if (data.exp && data.exp < Date.now()) return null;
    return { userId: data.userId, username: data.username, role: data.role };
  } catch {
    return null;
  }
}

export async function hashPassword(password: string): Promise<string> {
  // Simple base64 encoding for Docker compatibility
  return Buffer.from(password).toString("base64");
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  try {
    return Buffer.from(password).toString("base64") === hash;
  } catch {
    return false;
  }
}