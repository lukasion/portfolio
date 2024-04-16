<template>
	<NuxtLoadingIndicator/>
	<NuxtLayout>
		<NuxtPage/>
	</NuxtLayout>
</template>

<script setup lang="ts">
import {useCitiesStore} from './store/citites';

const i18n = useI18n();
const route = useRoute()
const citiesStore = useCitiesStore()

const title = computed(() => {
	if (route.name === 'strony-internetowe-slug') {
		return `Tworzenie stron internetowych ${citiesStore.cities[route.params.slug].singular}, tanie strony WWW | Be Crafty`
	}

	return i18n.t('seo_title') + ' | Be Crafty'
})

const description = computed(() => {
	if (route.name === 'strony-internetowe-slug') {
		return `Projektuję strony internetowe dla klientów z ${citiesStore.cities[route.params.slug].genitive} i okolic. ${citiesStore.cities[route.params.slug].voivodeship} to jedno z miejsce mojego działania. Strony WWW dla firm z ${citiesStore.cities[route.params.slug].genitive}, które chcą zaistnieć w sieci. Sprawdź ofertę!`
	}

	return i18n.t('seo_description')
})

useHead({
	title: title,
	meta: {
		description: description
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
