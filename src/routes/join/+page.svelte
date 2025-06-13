<script lang="ts">
	import { enhance } from '$app/forms';

	type Theme = {
		dark: boolean;
		primaryColor: string;
		secondaryColor: string;
	};

	let step = 1;

	function nextStep() {
		step += 1;
	}
	function previousStep() {
		if (step > 1) {
			step -= 1;
		}
	}

	// Form Data
	let username: string = '';
	let email: string = '';
	let password: string = '';
	let confirmPassword: string = '';
	let name: string = '';
	let description: string = '';
	let ownerUserId: string = ''; // Assuming you will set this from the session or context
	let subdomain: string = '';
	let logourl: string = '';
	let theme: Theme = { dark: false, primaryColor: '#17a2b8', secondaryColor: '#6c757d' };
</script>

<div class="container">
	<!-- TODO: Need to make the "welcome message better" -->
	<div class="left">
		<div class="toc">
			<div class="toc-item">
				<div class="toc-left">
					<p class="numberCircle">1</p>

				</div>
				<div class="toc-right">
					<p class="step">Welcome</p>
					<p class="summary">Welcome to "name of website"</p>


				</div>
			</div>
			<div class="toc-item">
				<div class="toc-left">
					<p class="numberCircle">2</p>

				</div>
			<div class="toc-right">
				<p class="step">Create User</p>
				<p class="summary">Create user that is the owner of the "tenant"</p>
				</div>	
			</div>
			<div class="toc-item">
				<div class="toc-left">
				<p class="numberCircle">3</p>
				</div>
			<div class="toc-right">
				<p class="step">Create "Tenant"</p>
				<p class="summary">Create the "tenant"</p>
				</div>	
			</div>
			<div class="toc-item">
				<div class="toc-left">
				<p class="numberCircle">4</p>
				</div>
			<div class="toc-right">
				<p class="step">Something</p>
				<p class="summary">Possibly another step</p>
			</div>
			</div>
			<div class="toc-item">
			<div class="toc-left">
				<p class="numberCircle">5</p>
			</div>
			<div class="toc-right">
				<p class="step">Something Else</p>
				<p class="summary">Possibly another step again</p>
			</div>
			</div>
		</div>
	</div>
	<div class="right">
		{#if step === 1}
			<div class="form-step">
				<p>Step {step} /?</p>
				<p class="title">Welcome to "Name of Service"</p>

				<p>
					Thank you for your interest in "Name of Service". There are a couple of steps we need to
					complete. First we need to create a user that will be the owner of the "tenant". Then we
					will create the "tenant".
				</p>

				<p>Please click the next button to get started.</p>
				<button class="steponebtn" onclick={nextStep}>Next</button>
			</div>
		{:else if step === 2}
			<div class="form-step">
				<p>Step {step} / ?</p>
				<p class="title">Welcome to user creation</p>
				<p class="summary">This will be the user that will be the owner of the "tenant"</p>
				<form method="POST" use:enhance>
					<!-- TODO: Add error message responses from server -->

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
						<input
							type="email"
							id="email"
							bind:value={email}
							required
							placeholder="Enter your email"
						/>
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

					<div class="btn-row">
						<button type="button" onclick={previousStep}> Previous </button>
						<button type="submit" disabled={!username || !email || !password || !confirmPassword}>
							Register
						</button>

						<button onclick={nextStep}>Next</button>
					</div>
				</form>
			</div>
		{:else if step === 3}
		<div class="form-step">
				<p>Step {step} / ?</p>
			<p class="title">Create New "Tenant"</p>
			<p class="summary">Now let's create the "tenant". Please fill out all of the information below</p>

			<form method="POST" use:enhance>
				<!-- {#if form?.error}
        <div class="error">{form.error}</div>
      {/if} -->

				<div class="form-group">
					<label for="tenantName">Tenant Name</label>
					<input
						type="text"
						id="name"
						bind:value={name}
						required
						placeholder="Enter tenant name (e.g., Acme Corp)"
					/>
				</div>

				<div class="form-group">
					<label for="tenantSubdomain">Subdomain</label>
					<input
						type="text"
						id="tenantSubdomain"
						bind:value={subdomain}
						required
						pattern="/^[a-z0-9-]+$/"
						title="Subdomain can only contain lowercase letters, numbers, and hyphens."
						placeholder="Enter subdomain (e.g., acme)"
					/>
				</div>

				<div class="form-group">
					<label for="tenantDescription">Description</label>
					<textarea
						id="description"
						bind:value={description}
						required
						placeholder="Enter a brief description"
						rows="4"
						cols="50"
						title="Description should be a brief overview of the tenant's purpose."
					>
					</textarea>
				</div>

				<div class="btn-row">
					<button type="button" onclick={previousStep}> Previous </button>

					<button type="submit">Create Tenant</button>

					<button type="button" onclick={nextStep} disabled={!name || !subdomain || !description}>
						Next
					</button>
				</div>
			</form>
			</div>
		{:else if step === 4}
			<!-- Add content for step 3 here if needed -->
		{/if}
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
		background-color: #e7f1fc;
		margin: 1rem;
		border-radius: 10px;
	}
	.right {
		width: 50%;
		float: right;
		padding: 2rem;
		background-color: #ffffff;
	}

	.title {
		font-size: 1.5rem;
		font-weight: bold;
		margin-bottom: 1rem;
	}

	.numberCircle {
    border-radius: 50%;
    width: 24px;
    height: 24px;
		


    background: none;
    border: 1px solid #000;
    color: #000;
    text-align: center;

    /* font: 32px Arial, sans-serif; */
}
.toc-item {
		display: flex;
		/* align-items: center; */
		margin-bottom: 1rem;
	}
.toc-left {
		flex: 0 0 auto;
		margin-right: 1rem;
	}
	.form-group {
		margin-bottom: 1rem;
	}

	label {
		display: block;
		margin-bottom: 0.5rem;
		/* font-weight: bold; */
	}

	input {
		width: 100%;
		padding: 0.5rem;
		border: 1px solid #ccc;
		border-radius: 4px;
		font-size: 1rem;
	}

	.btn-row {
		display: flex;
		justify-content: space-between;

		margin-top: 1rem;
	}
	.steponebtn {
		display: block;
		margin: 0 auto;
		width: 20%;
		padding: 0.75rem;
		text-align: center;
		background-color: #17a2b8;
		color: white;
		border: none;
		border-radius: 4px;
		font-size: 1rem;
		cursor: pointer;
		margin-bottom: 1rem;
	}
	button {
		width: 20%;
		padding: 0.75rem;
		background-color: #17a2b8;
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
</style>
