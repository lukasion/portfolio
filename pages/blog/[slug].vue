<template>
	<div>
		<Header white/>

		<div class="container mx-auto pt-20">
			<div class="article">
				<div class="article__image">
					<img
						src="https://d3mm2s9r15iqcv.cloudfront.net/en/wp-content/uploads/2024/01/best-online-learning-platforms.jpg"
						alt="Article image"/>
				</div>

				<div class="article__content">
					<h1 class="article__title">{{ articlesStore.article.title }}</h1>

					<template v-if="articlesStore.article">
						<div v-html="articlesStore.article.content"></div>
					</template>
					<p v-else>
						Article not found. Redirecting.
					</p>
				</div>
			</div>
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