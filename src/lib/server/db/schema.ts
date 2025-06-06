import { pgTable, serial, text, integer, timestamp, boolean, json } from 'drizzle-orm/pg-core';

export const users = pgTable('user', {
	id: serial('id').primaryKey(),
	email: text('email').unique(),
	username: text('username').notNull().unique(),
	password: text('password_hash').notNull()
});

export const tenants = pgTable('tenant', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	description: text('description'),
	ownerUserId: text('owner_user_id'),
	logoUrl: text('logo_url'),
	subdomain: text('domain'),
	settings: json('settings'),
	theme: json('theme'),
	createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow(),
	updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow()
});

export const tenantUsers = pgTable('tenant_user', {
	id: serial('id').primaryKey(),
	tenantId: serial('tenant_id')
		.notNull()
		.references(() => tenants.id),
	userId: serial('user_id')
		.notNull()
		.references(() => users.id),
	plan: text('plan').notNull().default('free'),
	isActive: boolean('is_active').notNull().default(true),
})

export const session = pgTable('session', {
	id: serial('id').primaryKey(),
	userId: serial('user_id')
		.notNull()
		.references(() => users.id),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});

export type Session = typeof session.$inferSelect;

export type User = typeof users.$inferSelect;
