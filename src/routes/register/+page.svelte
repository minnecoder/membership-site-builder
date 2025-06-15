<script lang="ts">
	import { enhance } from '$app/forms';

	// TODO: Have access to register page only accessible from invitation??

	let username = '';
	let email = '';
	let password = '';
	let confirmPassword = '';
</script>

<svelte:head>
	<title>Register</title>
</svelte:head>

<div class="container">
	<div class="left">
		<h1 class="logo">Company Logo</h1>
	</div>
	<div class="right">
		<h1>Register</h1>

		<form method="POST" use:enhance>
			<!-- TODO: Add error message responses from server -->

			<div class="form-group">
				<input type="text" id="username" bind:value={username} required placeholder="Username" />
			</div>

			<div class="form-group">
				<input type="email" id="email" bind:value={email} required placeholder="Email" />
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

			<div class="form-group">
				<input
					type="password"
					id="confirm-password"
					bind:value={confirmPassword}
					required
					placeholder="Confirm Password"
				/>
			</div>

			<button type="submit" disabled={!username || !email || !password || !confirmPassword}>
				Register
			</button>
		</form>

		<p class="login-link">
			Already have an account? <a href="/login">Log in</a>
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

	h1 {
		text-align: center;
		margin-bottom: 1.5rem;
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
