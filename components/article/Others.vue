<template>
	<h3 class="px-4 text-2xl mt-24">Inne artykuły z tej kategorii</h3>

	<div class="blog__container blog__container--grid">
		<template v-if="articleStore.articles.length === 0">
			<p>Brak innych artykułów w tej kategorii.</p>
		</template>

		<nuxt-link :to="`/blog/${article.friendly_url}`" class="blog__box" v-for="article in articleStore.articles">
			<h4 class="uppercase text-xs tracking-wider">
				{{ article.category ? article.category.name : $t('not_assigned') }}
			</h4>

			<h3 class="text-md font-bold">
				{{ article.title }}
			</h3>

			<p class="text-xs mt-4">
				{{ article.content.replace(/<[^>]+>/g, '').slice(0, 150) + '...' }}
			</p>

			<p class="mt-4 text-xs">
				{{ $dayjs(article.datetime).fromNow() }} - {{ article.minutes_read }} {{ $t('minutes_read') }}
			</p>
		</nuxt-link>
	</div>
</template>

<script setup>
import {useArticlesStore} from "~/store/articles";

const props = defineProps({
	withoutArticleId: {
		type: Number,
		default: null
	},
	categoryId: {
		type: Number,
		default: null
	}
})

const i18n = useI18n()
const articleStore = useArticlesStore()
await articleStore.fetchData({
	limit: 3,
	lang: i18n.locale.value,
	withoutArticleId: props.withoutArticleId,
	categoryId: props.categoryId
})

</script>

<style lang="scss" scoped>
@import '../../assets/scss/structures/_blog.scss';
</style>