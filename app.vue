<template>
	<NuxtPage/>
</template>

<script setup lang="ts">
useHead({
	title: 'Navigating Web Development, Cybersecurity, Big Data and Cloud Trends | Be Crafty',
	meta: {
		description: 'Be Crafty delves into cutting-edge realms, exploring web development, cybersecurity, big data, and the transformative landscape of cloud computing. Stay informed with our insights on the forefront of business tech trends.'
	}
})

const onElementVisible = (el: any) => {
	const {stop} = useIntersectionObserver(
		el,
		([{isIntersecting}], observerElement) => {
			if (isIntersecting) {
				observerElement.unobserve(el)
				el.classList.toggle('element--visible')
			}
		},
	)
}

provide('onElementVisible', onElementVisible)
</script>

<style>
.page-enter-active,
.page-leave-active {
	transition: all 0.2s;
}

.page-enter-from,
.page-leave-to {
	opacity: 0;
	filter: blur(.05rem);
}
</style>
