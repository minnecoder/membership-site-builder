<script lang="ts">
	import { enhance } from '$app/forms';

	let username = '';
	let password = '';
</script>

<!-- TODO: Figure out how to make sure that users are loging into their own organizations page -->

<svelte:head>
	<title>Join</title>
</svelte:head>

<div class="container">
	<div class="left">
		<h1 class="logo">Company Logo</h1>
	</div>
	<div class="right">
		<h1>Welcome Back</h1>
		<p class="small">Please login to your account</p>

		<form method="POST" use:enhance>
			<!-- Form errors will go here -->

			<div class="form-group">
				<input type="text" id="username" bind:value={username} required placeholder="Username" />
			</div>

			<div class="form-group">
				<input
					type="password"
					id="password"
					bind:value={password}
					required
					placeholder="Password"
				/>
			</div>

			<button type="submit"> Log In </button>
		</form>
		<p class="login-link">
			Don't have an account? <a href="/register">Register</a>
		</p>
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-direction: row;
		height: 100vh;
	}
	.left {
		width: 30%;
		background-color: #007bff;
		margin: 1rem;
		padding: 1.5rem;
		border-radius: 10px;
	}
	.right {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		padding: 2rem;
		background-color: #ffffff;
	}

	.logo {
		font-size: 2rem;
		font-weight: bold;
		text-align: center;
		margin-bottom: 2rem;
	}
	.right h1 {
		text-align: center;
		margin: 1rem 0 0 0;
	}

	.small {
		text-align: center;
		margin-bottom: 3rem;
		font-size: 0.9rem;
		color: #666;
	}

	.form-group {
		margin-bottom: 1rem;
	}

	input {
		width: 400px;
		padding: 1rem;
		background: #e9e9e9;
		border: none;
		border-radius: 5px;
		font-size: 1rem;
		margin-bottom: 1rem;
		font: inherit;
	}

	button {
		width: 25%;
		padding: 0.75rem;
		background-color: #007bff;
		color: white;
		border: none;
		border-radius: 4px;
		font-size: 1rem;
		cursor: pointer;
		margin-bottom: 2rem;
		font: inherit;
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
