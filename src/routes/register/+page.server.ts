import type { Actions, PageServerLoad } from './$types'
import { fail, redirect } from '@sveltejs/kit'
import { users, tenants } from '$lib/server/db/schema';
import { db } from '$lib/server/db';
import { checkUserExists, hashPassword, createUser, createSession, checkTenantExists } from '$lib/server/auth'; // Adjust the import path as needed



export const load: PageServerLoad = async (event) => {
    const tenantList = await db
        .select({ id: tenants.id, name: tenants.name })
        .from(tenants);

    return {
        tenants: tenantList
    };
};

export const actions: Actions = {
    default: async ({ request, cookies }) => {
        const formData = await request.formData()
        const tenantId = formData.get('tenantId')?.toString()
        const username = formData.get('username')?.toString()
        const email = formData.get('email')?.toString()
        const password = formData.get('password')?.toString()
        const confirmPassword = formData.get('confirmPassword')?.toString()

        // Basic validation
        if (!tenantId || !username || !email || !password || !confirmPassword) {
            return fail(400, { error: 'All fields are required' });
        }

        if (password !== confirmPassword) {
            return fail(400, { error: 'Passwords do not match' });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return fail(400, { error: 'Invalid email format' });
        }
        try {
            // Check if tenant exists
            const tenantExists = await checkTenantExists(tenantId);
            if (!tenantExists) {
                return fail(400, { error: 'Invalid tenant' });
            }

            // Check if username or email already exists for this tenant
            const existingUser = await checkUserExists(tenantId, username, email);
            if (existingUser) {
                return fail(400, { error: 'Username or email already taken' });
            }

            // Hash password and create user
            const hashedPassword = await hashPassword(password);
            const user = await createUser({
                tenantId,
                username,
                email,
                password: hashedPassword
            });

            // Create session
            const { id: sessionId, expiresAt } = await createSession(tenantId, user.id);

            // Set session cookie
            cookies.set('sessionid', sessionId, {
                path: '/',
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                expires: new Date(expiresAt)
            });

            // Redirect to tenant-specific dashboard
            throw redirect(302, `/${tenantId}/dashboard`);
        } catch (error) {
            return fail(500, { error: 'Registration failed' });
        }
    }


}