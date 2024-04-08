<template>
	<div>
		<UserNavbar/>

		<div class="container mx-auto mt-10">
			<div class="card shadow-md">
				<div class="card-body">
					<h1 class="text-2xl font-bold">Dashboard</h1>
					<p class="text-base-content">Manage your account here.</p>
				</div>
			</div>
		</div>

		<UserFooter/>
	</div>
</template>

<script setup>
const {status, data} = useAuth()
</script>