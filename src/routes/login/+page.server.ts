import type { Actions, PageServerLoad } from './$types'
import { fail, redirect } from '@sveltejs/kit'

export const load: PageServerLoad = async () => {
    // Fetch tenant data here
}

export const actions: Actions = {
    default: async ({ request }) => {
        const formData = await request.formData()
        const tenantId = formData.get('tenantId')?.toString()
        const username = formData.get('username')?.toString()
        const password = formData.get('password')?.toString()


        // TODO: Add connection to DB

        // TODO: Check if username exists

        // TODO: Verify that password is correct

        // TODO: Create cookie and session storage

        // TODO: Redirect to another page on correct login
    }
}