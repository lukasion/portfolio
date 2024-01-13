<template>
	<div>
		<router-view></router-view>
	</div>
</template>


<script setup lang="ts">

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