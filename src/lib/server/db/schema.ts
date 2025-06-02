import { pgTable, serial, text, integer, timestamp, boolean, json } from 'drizzle-orm/pg-core';
import { TestContext } from 'node:test';

export const users = pgTable('user', {
	id: text('id').primaryKey(),
	tenantId: text('tenant_id').notNull(),
	email: text('email').unique(),
	username: text('username').notNull().unique(),
	password: text('password_hash').notNull()
});

export const tenants = pgTable('tenant', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	description: text('description'),
	ownerUserId: text('owner_user_id'),
	plan: text('plan').notNull().default('free'),
	isActive: boolean('is_active').notNull().default(true),
	logoUrl: text('logo_url'),
	domain: text('domain'),
	settings: json('settings'),
	createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow(),
	updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow()
});

export const session = pgTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});

export type Session = typeof session.$inferSelect;

export type User = typeof users.$inferSelect;
