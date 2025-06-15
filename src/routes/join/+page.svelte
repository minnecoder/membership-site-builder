<script lang="ts">
	import { enhance } from '$app/forms';
	import { Icon } from 'svelte-icons-pack';
	import { FaSolidChevronLeft } from 'svelte-icons-pack/fa';

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

	function getStepClass(n: number) {
		if (step > n) return 'completed';
		if (step === n) return 'active';
		return 'upcoming';
	}

	// Form Data
	let username: string = '';
	let email: string = '';
	let password: string = '';
	let confirmPassword: string = '';
	let name: string = '';
	let description: string = '';
	let ownerUserId: string = '';
	let subdomain: string = '';
	let logourl: string = '';
	let theme: Theme = { dark: false, primaryColor: '#17a2b8', secondaryColor: '#6c757d' };
</script>

<div class="container">
	<!-- TODO: Need to make the "welcome message better" -->
	<div class="left">
		<h1 class="logo">Company Logo</h1>
		<div class="toc">
			<div class="toc-item">
				<div class="toc-left">
					<p class="numberCircle {getStepClass(1)}">1</p>
				</div>
				<div class="toc-right">
					<p class="step">Welcome</p>
					<p class="summary">Welcome to "name of website"</p>
				</div>
			</div>
			<div class="toc-item">
				<div class="toc-left">
					<p class="numberCircle {getStepClass(2)}">2</p>
				</div>
				<div class="toc-right">
					<p class="step">Create User</p>
					<p class="summary">Create user that is the owner of the "tenant"</p>
				</div>
			</div>
			<div class="toc-item">
				<div class="toc-left">
					<p class="numberCircle {getStepClass(3)}">3</p>
				</div>
				<div class="toc-right">
					<p class="step">Create "Tenant"</p>
					<p class="summary">Create the "tenant"</p>
				</div>
			</div>
			<div class="toc-item">
				<div class="toc-left">
					<p class="numberCircle {getStepClass(4)}">4</p>
				</div>
				<div class="toc-right">
					<p class="step">Something</p>
					<p class="summary">Possibly another step</p>
				</div>
			</div>
			<div class="toc-item">
				<div class="toc-left">
					<p class="numberCircle {getStepClass(5)}">5</p>
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
				<button type="button" class="prev-btn" onclick={previousStep}
					><Icon src={FaSolidChevronLeft} /> Back
				</button>
				<p>Step {step} / ?</p>
				<p class="title">Welcome to user creation</p>
				<p class="step-summary">This will be the user that will be the owner of the "tenant"</p>
				<form method="POST" use:enhance>
					<!-- TODO: Add error message responses from server -->

					<div class="form-group">
						<input
							type="text"
							id="username"
							bind:value={username}
							required
							placeholder="Username"
						/>
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
							placeholder="Confirm password"
						/>
					</div>

					<div class="btn-row">
						<button type="submit"> Register </button>

						<button onclick={nextStep}>Next</button>
					</div>
				</form>
			</div>
		{:else if step === 3}
			<div class="form-step">
				<button type="button" class="prev-btn" onclick={previousStep}
					><Icon src={FaSolidChevronLeft} /> Back
				</button>
				<p>Step {step} / ?</p>
				<p class="title">Create New "Tenant"</p>
				<p class="step-summary">Please fill out all of the information below</p>

				<form method="POST" use:enhance>
					<!-- {#if form?.error}
        <div class="error">{form.error}</div>
      {/if} -->

					<div class="form-group">
						<input type="text" id="name" bind:value={name} required placeholder="Tenant Name" />
					</div>

					<div class="form-group">
						<input
							type="text"
							id="tenantSubdomain"
							bind:value={subdomain}
							required
							pattern="/^[a-z0-9-]+$/"
							title="Subdomain Name (can only contain lowercase letters, numbers, and hyphens.)"
							placeholder="Subdomain Name"
						/>
					</div>

					<div class="form-group">
						<textarea
							class="description"
							id="description"
							bind:value={description}
							required
							placeholder="Tenant Description"
							rows="10"
							cols="50"
							title="Description should be a brief overview of the tenant's purpose."
						>
						</textarea>
					</div>

					<div class="btn-row">
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
		background-color: #007bff;
		margin: 1rem;
		padding: 1.5rem;
		border-radius: 10px;
	}
	.right {
		width: 70%;
		float: right;
		padding: 2rem;
		background-color: #ffffff;
	}

	.logo {
		font-size: 2rem;
		font-weight: bold;
		text-align: center;
		margin-bottom: 2rem;
	}

	.title {
		font-size: 1.5rem;
		font-weight: bold;
		margin: 0;
	}

	.step-summary {
		margin: 0 0 2rem 0;
		padding-bottom: 1.5rem;
		border-bottom: 1px solid #dddddd;
	}

	.numberCircle {
		border-radius: 50%;
		width: 24px;
		height: 24px;
		background: none;
		border: 1px solid #000;
		color: #000;
		text-align: center;
		line-height: 24px;
		position: relative;
	}

	.numberCircle::after {
		content: '';
		position: absolute;
		top: 130%;
		left: 50%;
		transform: translateX(-50%);
		width: 1px;
		height: 50px;
		background-color: #fff;
	}

	.numberCircle.completed {
		background-color: green;
		color: transparent;
		border-color: green;
		position: relative;
	}

	.numberCircle.completed::before {
		content: '✓';
		color: white;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-size: 16px;
	}

	.numberCircle.active {
		background-color: #7996ff;
		color: #fff;
		border-color: #7996ff;
	}

	.numberCircle.upcoming {
		background-color: none;
		color: #fff;
		border-color: #fff;
	}

	.toc-item {
		display: flex;
		margin-left: 1rem;
		margin-bottom: 1rem;
		color: #fff;
	}

	.summary {
		margin: 0;
	}

	.step {
		font-weight: bold;
		font-size: 1.2rem;
		margin: 0;
	}
	.toc-right {
		margin: 1rem 0 3rem 0;
	}
	.toc-left {
		margin-right: 1rem;
	}
	.form-group {
		margin-bottom: 1rem;
	}

	input {
		width: 70%;
		padding: 1rem;
		background: #e9e9e9;
		border: none;
		border-radius: 5px;
		font-size: 1rem;
		margin-bottom: 1rem;
		font: inherit;
	}

	.description {
		width: 71%;
		padding: 0.5rem;
		border: none;
		background: #e9e9e9;
		border-radius: 4px;
		font-size: 1rem;
		resize: none;
		font: inherit;
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
		background-color: #007bff;
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
		background-color: #007bff;
		color: white;
		border: none;
		border-radius: 4px;
		font-size: 1rem;
		cursor: pointer;
	}

	.prev-btn {
		width: 10%;
		padding: 0.75rem;
		background-color: #fff;
		color: #000;
		border: solid 1px #000;
		border-radius: 4px;
		font-size: 1rem;
		cursor: pointer;
		margin-bottom: 1rem;
	}

	/* .error {
    color: red;
    margin-bottom: 1rem;
    text-align: center;
  } */
</style>
