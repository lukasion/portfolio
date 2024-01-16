<template>
	<div>asd: {{ data }}</div>
</template>

<script setup>
const {status, data} = useAuth()

definePageMeta({
	middleware: 'auth'
})
</script>