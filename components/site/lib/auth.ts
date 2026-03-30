import { createHmac, timingSafeEqual } from "node:crypto";

import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE_NAME = "gurgaon-residences-admin";
const SESSION_AGE = 60 * 60 * 24 * 7;

type AdminSession = {
  email: string;
  exp: number;
};

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET ?? "dev-secret-change-this";
}

function encode(value: string) {
  return Buffer.from(value).toString("base64url");
}

function decode(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function sign(value: string) {
  return createHmac("sha256", getSecret()).update(value).digest("base64url");
}

function createToken(payload: AdminSession) {
  const encodedPayload = encode(JSON.stringify(payload));
  const signature = sign(encodedPayload);
  return `${encodedPayload}.${signature}`;
}

function verifyToken(token: string): AdminSession | null {
  const [payloadPart, signaturePart] = token.split(".");

  if (!payloadPart || !signaturePart) {
    return null;
  }

  const expected = Buffer.from(sign(payloadPart));
  const provided = Buffer.from(signaturePart);

  if (expected.length !== provided.length) {
    return null;
  }

  if (!timingSafeEqual(expected, provided)) {
    return null;
  }

  const payload = JSON.parse(decode(payloadPart)) as AdminSession;

  if (payload.exp < Date.now()) {
    return null;
  }

  return payload;
}

export async function authenticateAdmin(email: string, password: string) {
  const adminEmail =
    process.env.ADMIN_EMAIL ?? "admin@gurgaonresidences.com";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "ChangeMe123!";
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

  if (email.trim().toLowerCase() !== adminEmail.trim().toLowerCase()) {
    return false;
  }

  if (adminPasswordHash) {
    return bcrypt.compare(password, adminPasswordHash);
  }

  return password === adminPassword;
}

export async function createAdminSession(email: string) {
  const payload: AdminSession = {
    email,
    exp: Date.now() + SESSION_AGE * 1000,
  };

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, createToken(payload), {
    httpOnly: true,
    maxAge: SESSION_AGE,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
}

export async function destroyAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) return null;

  return verifyToken(token);
}

export async function isAdminAuthenticated() {
  const session = await getAdminSession();
  return Boolean(session);
}

export async function requireAdmin() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return session;
}
