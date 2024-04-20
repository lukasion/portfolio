<template>
	<div>
		<Header white/>

		<div class="container mx-auto pt-20">
			<div class="article mt-12">
				<div class="article__image">
					<img
						src="https://d3mm2s9r15iqcv.cloudfront.net/en/wp-content/uploads/2024/01/best-online-learning-platforms.jpg"
						alt="Article image"/>
				</div>

				<div class="article__content" v-if="articlesStore.article">
					<p class="text-center">
						<nuxt-link :to="`/category/${articlesStore.article.category_id}`"
						           class="uppercase text-sm tracking-wider">
							{{ articlesStore.article.category ? articlesStore.article.category.name : $t('not_assigned')
							}}
						</nuxt-link>
					</p>


					<h1 class="article__title">{{ articlesStore.article.title }}</h1>

					<div v-html="articlesStore.article.content"></div>
				</div>
				<p v-else>
					Article not found. Redirecting.
				</p>
			</div>

			<article-others
				:without-article-id="articlesStore.article.id"
				:category-id="articlesStore.article.category_id"
			/>
		</div>

		<Footer class="mt-24"/>
	</div>
</template>

<script setup lang="ts">
import {useArticlesStore} from "~/store/articles";

const articlesStore = useArticlesStore()
const route = useRoute()
const router = useRouter()

if (typeof route.params.slug === 'string') {
	await articlesStore.fetchBySlug(route.params.slug)
}

if (!articlesStore.article) {
	router.push('/blog')
}

useHead({
	title: `${articlesStore.article ? articlesStore.article.title : 'Page not found'} | Be Crafty`,
	meta: {
		description: articlesStore.article ? articlesStore.article.description : 'Article not found. Redirecting.'
	}
})
</script>

<style lang="scss" scoped>
@import '../../assets/scss/structures/_article.scss';
</style>