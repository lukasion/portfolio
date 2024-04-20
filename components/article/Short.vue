<template>
	<div class="flex flex-col md:flex-row" :class="{'!flex-col': !column, 'md:gap-6': column}">
		<nuxt-link :to="`/blog/${article.friendly_url}`" class="mb-6" :class="{'md:w-48': column, 'h-32': column}">
			<img alt="Article image" class="w-full h-full object-cover"
			     src="https://d3mm2s9r15iqcv.cloudfront.net/en/wp-content/uploads/2024/01/best-online-learning-platforms.jpg">
		</nuxt-link>

		<div class="flex-1">
			<nuxt-link :to="`/category/${article.category_id}`" class="uppercase text-sm tracking-wider">
				{{ article.category ? article.category.name : i18n.t('not_assigned') }}
			</nuxt-link>

			<nuxt-link :to="`/blog/${article.friendly_url}`">
				<h2 class="text-2xl font-bold">{{ article.title }}</h2>

				<p class="mt-4">{{ $dayjs(article.datetime).fromNow() }} - {{ article.minutes_read }}
					{{ i18n.t('minutes_read') }}</p>

				<p class="mt-3" v-if="!hideDescription">
					{{ strippedContent.slice(0, 250) + '...' }}
				</p>
			</nuxt-link>
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
	},
	article: {
		type: Object,
		default: null
	}
})

const i18n = useI18n()

const strippedContent = computed(() => props.article.content.replace(/<[^>]+>/g, ''))
</script>