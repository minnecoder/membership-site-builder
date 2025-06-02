<script lang="ts">
	import { enhance } from '$app/forms';

	 export let data; // This contains the data returned from your +page.server.ts load function
console.log('Register page data:', data);
    const tenants = data.tenants;

	// TODO: Have access to register page only accessible from invitation??

	let tenantId = '';
	let username = '';
	let email = '';
	let password = '';
	let confirmPassword = '';
</script>

<svelte:head>
	<title>Register</title>
</svelte:head>

<div class="container">
	<h1>Register</h1>

	<form method="POST" use:enhance>
		<!-- TODO: Add error message responses from server -->

		<div class="form-group">
			<label for="tenant">Select Tenant</label>
			<select id="tenant" bind:value={tenantId} required>
				<option value="" disabled>Select a tenant</option>
				{#each tenants as tenant}
					<option value={tenant.id}>{tenant.name}</option>
				{/each}
			</select>
		</div>

		<div class="form-group">
			<label for="username">Username</label>
			<input
				type="text"
				id="username"
				bind:value={username}
				required
				placeholder="Enter your username"
			/>
		</div>

		<div class="form-group">
			<label for="email">Email</label>
			<input type="email" id="email" bind:value={email} required placeholder="Enter your email" />
		</div>

		<div class="form-group">
			<label for="password">Password</label>
			<input
				type="password"
				id="password"
				bind:value={password}
				required
				placeholder="Enter your password"
			/>
		</div>

		<div class="form-group">
			<label for="confirm-password">Confirm Password</label>
			<input
				type="password"
				id="confirm-password"
				bind:value={confirmPassword}
				required
				placeholder="Confirm your password"
			/>
		</div>

		<button
			type="submit"
			disabled={!tenantId || !username || !email || !password || !confirmPassword}
		>
			Register
		</button>
	</form>

	<p class="login-link">
		Already have an account? <a href="/login">Log in</a>
	</p>
</div>

<style>
	.container {
		max-width: 400px;
		margin: 2rem auto;
		padding: 2rem;
		border: 1px solid #ccc;
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	h1 {
		text-align: center;
		margin-bottom: 1.5rem;
	}

	.form-group {
		margin-bottom: 1rem;
	}

	label {
		display: block;
		margin-bottom: 0.5rem;
		font-weight: bold;
	}

	select,
	input {
		width: 100%;
		padding: 0.5rem;
		border: 1px solid #ccc;
		border-radius: 4px;
		font-size: 1rem;
	}

	button {
		width: 100%;
		padding: 0.75rem;
		background-color: #28a745;
		color: white;
		border: none;
		border-radius: 4px;
		font-size: 1rem;
		cursor: pointer;
	}

	button:disabled {
		background-color: #6c757d;
		cursor: not-allowed;
	}

	/* .error {
		color: red;
		margin-bottom: 1rem;
		text-align: center;
	} */

	.login-link {
		text-align: center;
		margin-top: 1rem;
	}
</style>
