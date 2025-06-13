import type { Actions,PageServerLoad } from "./$types";
import { fail, redirect } from "@sveltejs/kit";

// export const load:PageServerLoad = async ({ locals }) => {
//   // TODO: Check if user is already logged in 
//   // Check if user is already logged in
  

//   // TODO: If there is no user, redirect to login page
//   if (!locals.user) {
//     throw redirect(302, '/login');
  
// };
// return {}


 export const actions:Actions = {
  default: async ({ request, locals }) => {
    const formData = await request.formData();
    const name = formData.get("name")?.toString();
    const description = formData.get("description")?.toString();
    const subdomain = formData.get("subdomain")?.toString();

    // Make sure all fields are provided
    if (!name || !description || !subdomain) {
      return fail (400,{ error: "All fields are required." });
    }

// Check if subdomain is valid
const subdomainRegex = /^[a-z0-9]+$/;
if (!subdomainRegex.test(subdomain)) {
  return fail(400, { error: "Subdomain can only contain lowercase letters and numbers." });
}

    // Check if subdomain is already taken
const subdomainExists = await checkTenantSubdomainExists(subdomain)
if( subdomainExists ) {
  return fail(400, { error: "Subdomain is already taken." });
}




    try {




      // Create tenant for the user
      const tenant = await locals.db.insert(locals.db.tenants).values({
        name: `${username}'s Tenant`,
        ownerUserId: user[0].id,
        subdomain: username.toLowerCase(),
        settings: {},
        theme: {}
      }).returning();

      // Add user to tenant
      await locals.db.insert(locals.db.tenantUsers).values({
        tenantId: tenant[0].id,
        userId: user[0].id,
        plan: 'free'
      });

      return { success: true, message: "User and tenant created successfully." };
    } catch (error) {
      console.error("Error creating user or tenant:", error);
      return { error: "Failed to create user or tenant." };
    }
  }
 };