import type { RequestEvent } from '@sveltejs/kit';
import { eq, and, or } from 'drizzle-orm';
import { sha256 } from '@oslojs/crypto/sha2';
import { encodeBase64url, encodeHexLowerCase } from '@oslojs/encoding';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';

const DAY_IN_MS = 1000 * 60 * 60 * 24;

export const sessionCookieName = 'auth-session';

export function generateSessionToken() {
	const bytes = crypto.getRandomValues(new Uint8Array(18));
	const token = encodeBase64url(bytes);
	return token;
}

export async function createSession(token: string, userId: string) {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const session: table.Session = {
		id: sessionId,
		userId,
		expiresAt: new Date(Date.now() + DAY_IN_MS * 30)
	};
	await db.insert(table.session).values(session);
	return session;
}

export async function validateSessionToken(token: string) {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const [result] = await db
		.select({
			// Adjust user table here to tweak returned data
			user: { id: table.users.id, username: table.users.username },
			session: table.session
		})
		.from(table.session)
		.innerJoin(table.users, eq(table.session.userId, table.users.id))
		.where(eq(table.session.id, sessionId));

	if (!result) {
		return { session: null, user: null };
	}
	const { session, user } = result;

	const sessionExpired = Date.now() >= session.expiresAt.getTime();
	if (sessionExpired) {
		await db.delete(table.session).where(eq(table.session.id, session.id));
		return { session: null, user: null };
	}

	const renewSession = Date.now() >= session.expiresAt.getTime() - DAY_IN_MS * 15;
	if (renewSession) {
		session.expiresAt = new Date(Date.now() + DAY_IN_MS * 30);
		await db
			.update(table.session)
			.set({ expiresAt: session.expiresAt })
			.where(eq(table.session.id, session.id));
	}

	return { session, user };
}

export type SessionValidationResult = Awaited<ReturnType<typeof validateSessionToken>>;

export async function invalidateSession(sessionId: string) {
	await db.delete(table.session).where(eq(table.session.id, sessionId));
}

export function setSessionTokenCookie(event: RequestEvent, token: string, expiresAt: Date) {
	event.cookies.set(sessionCookieName, token, {
		expires: expiresAt,
		path: '/'
	});
}

export function deleteSessionTokenCookie(event: RequestEvent) {
	event.cookies.delete(sessionCookieName, {
		path: '/'
	});
}

// TODO: Figure out what tenants schema should look like
import { tenants } from '$lib/server/db/schema';

export async function checkTenantExists(tenantId: string): Promise<boolean> {
	const result = await db.select().from(tenants).where(eq(tenants.id, tenantId)).limit(1);
	return result.length > 0;
}

import { users } from '$lib/server/db/schema';

export async function checkUserExists(
  tenantId: string,
  username: string,
  email: string
): Promise<boolean> {
  const result = await db
    .select()
    .from(users)
	.where(
	  and(
		eq(users.tenantId, tenantId),
		or(eq(users.username, username), eq(users.email, email))
	  )
	)
    .limit(1);

  return result.length > 0;
}

interface CreateUserInput {
  tenantId: string;
  username: string;
  email: string;
  password: string; // already hashed
}

export async function createUser(input: CreateUserInput) {
  const [user] = await db
	.insert(users)
	.values({
	  id: crypto.randomUUID(),
	  tenantId: input.tenantId,
	  username: input.username,
	  email: input.email,
	  password: input.password
	})
	.returning();

  return user;
}

export async function hashPassword(password: string): Promise<string> {
	const encoder = new TextEncoder();
	const hashBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(password));
	return encodeHexLowerCase(new Uint8Array(hashBuffer));
}

export async function verifyPassword(
	hashedPassword: string,
	password: string
): Promise<boolean> {
	const hash = await hashPassword(password);
	return hashedPassword === hash;
}