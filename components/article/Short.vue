<template>
	<div class="flex" :class="{'flex-col': !column, 'gap-6': column}">
		<div class="mb-6" :class="{'w-48': column, 'h-32': column}">
			<img alt="Article image" class="w-full h-full object-cover"
			     src="https://d3mm2s9r15iqcv.cloudfront.net/en/wp-content/uploads/2024/01/best-online-learning-platforms.jpg">
		</div>

		<nuxt-link class="flex-1" :to="`/blog/${article.friendly_url}`">
			<h4 class="uppercase text-sm tracking-wider">Category</h4>
			<h2 class="text-2xl font-bold">{{ article.title }}</h2>
			<p class="mt-4">{{ $dayjs(article.datetime).fromNow() }} - {{ article.minutes_read }} minutes read</p>

			<p class="mt-3" v-if="!hideDescription">
				{{ strippedContent.slice(0, 250) + '...' }}
			</p>
		</nuxt-link>
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
	},
	article: {
		type: Object,
		default: null
	}
})

const strippedContent = computed(() => props.article.content.replace(/<[^>]+>/g, ''))
</script>