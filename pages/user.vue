<template>
	<NuxtPage/>
</template>

<script setup lang="ts">
definePageMeta({
	middleware: 'auth'
})

const router = useRouter()
const route = useRoute()

onMounted(async () => {
	const session = await useAuth().getSession()

	if (!session) {
		await router.push('/auth/login')
	} else if (route.fullPath === '/user') {
		await router.push('/user/posts')
	}
})
</script>