<template>
	<div class="flex" :class="{'flex-col': !column, 'gap-6': column}">
		<div class="mb-6" :class="{'w-96': column, 'h-48': column}">
			<img alt="Article image" class="w-full h-full object-cover"
			     src="https://d3mm2s9r15iqcv.cloudfront.net/en/wp-content/uploads/2024/01/best-online-learning-platforms.jpg">
		</div>

		<div>
			<h4 class="uppercase text-sm tracking-wider">Category</h4>
			<h2 class="text-2xl font-bold">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis,
				minima!</h2>
			<p class="mt-4">January 31, 2024 - 9 minutes read</p>

			<p class="mt-3" v-if="!hideDescription">Short description lorem ipsum dolor sit amet, consectetur
				adipisicing elit.
				Aut deleniti laudantium
				mollitia
				natus quaerat quam qui ratione recusandae sed voluptas!</p>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	hideDescription: {
		type: Boolean,
		default: false
	},
	column: {
		type: Boolean,
		default: false
	}
})
</script>