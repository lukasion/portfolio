<template>
	<div>
		<router-view></router-view>
	</div>
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