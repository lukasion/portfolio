<template>
	<div class="navbar bg-base-100 shadow-md">
		<div class="container mx-auto">
			<div class="flex-1">
				<a class="btn btn-ghost text-xl">Admin CP</a>
			</div>
			<div class="flex-none">
				<ul class="menu menu-horizontal px-1">
					<li>
						<nuxt-link to="/user/auth">Dashboard</nuxt-link>
					</li>
					<li>
						<nuxt-link to="/user/posts">Posts</nuxt-link>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script setup>

</script>