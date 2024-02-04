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
					<h1 class="article__title">How to Become a Known YouTuber</h1>

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

useHead({
	title: 'How to become a known YouTuber | Be Crafty',
	meta: {
		description: 'Unlock YouTube success: Learn to thrive in the digital realm with essential steps to become a recognized content creator.'
	}
})

const route = useRoute()
const router = useRouter()
const articlesStore = useArticlesStore()

if (typeof route.params.slug === 'string') {
	const res = await articlesStore.fetchBySlug(route.params.slug)
	if (res === null) {
		router.push('/blog')
	}
}

</script>

<style lang="scss" scoped>
@import '../../assets/scss/structures/_article.scss';
</style>