<template>
	<NuxtLoadingIndicator/>
	<NuxtLayout>
		<NuxtPage/>
	</NuxtLayout>
</template>

<script setup lang="ts">
useHead({
	title: 'Navigating Web Development, Cybersecurity, Big Data and Cloud Trends | Be Crafty',
	meta: {
		description: 'Be Crafty delves into cutting-edge realms, exploring web development, cybersecurity, big data, and the transformative landscape of cloud computing. Stay informed with our insights on the forefront of business tech trends.'
	},
	link: [
		{rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png'},
		{rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png'},
		{rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png'},
		{rel: 'manifest', href: '/site.webmanifest'},
		{rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#5bbad5'},
	],
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
