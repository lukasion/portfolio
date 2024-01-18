<template>
	<div class="navbar bg-base-100 shadow-md">
		<div class="container mx-auto">
			<div class="flex-1">
				<a class="btn btn-ghost text-xl">Admin CP</a>
			</div>
			<div class="flex-none">
				<ul class="menu menu-horizontal px-1 gap-2">
					<li v-for="(route, name) in menu">
						<nuxt-link
							:to="route"
							:class="{'font-bold': route !== '/' && currentRoute.path.includes(route) }"
						>
							{{ name }}
						</nuxt-link>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script setup>
const menu = ref({
	"Mainpage": "/",
	"Dashboard": "/user/auth",
	"Posts": "/user/posts",
	"Topics": "/user/topics"
})

const {currentRoute} = useRouter();
</script>