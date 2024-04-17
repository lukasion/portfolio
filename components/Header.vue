<template>
	<div class="header" :class="{'header--scrolled': scrolled === true, 'header--white': white}" ref="header">
		<div class="header__container">
			<nuxt-link to="/" class="header__logo">
				&lt;lukasz-fujarski&nbsp;/&gt;
			</nuxt-link>

			<div class="flex gap-4">
				<ul :class="{ 'active': mobileVisible }">
					<li class="header__item" v-for="item in menu">
						<nuxt-link
							class="text-sm lg:text-base"
							:to="item.link"
							:class="{'header__item--active': isActive(item), '!text-black': white, '!border-black': white}"
						>
							{{ item.name }}
						</nuxt-link>
					</li>
				</ul>
				<ul class="!gap-4">
					<li class="header__item">
						<button @click="changeLanguage('en')">
							<Icon name="circle-flags:en" size="24px"/>
						</button>
					</li>
					<li class="header__item">
						<button @click="changeLanguage('pl')">
							<Icon name="circle-flags:pl" size="24px"/>
						</button>
					</li>
				</ul>
			</div>

			<div class="header__hamburger md:hidden" @click="mobileVisible = !mobileVisible">
				<Icon name="material-symbols:menu" size="32px"/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {useRoute} from "vue-router";

const {setLocale} = useI18n()
const i18n = useI18n();
const route = useRoute()
const scrolled = ref(false)
const header = ref(null)
const mobileVisible = ref(false)

const props = defineProps({
	white: {
		type: Boolean,
		default: false
	}
})

const menu = ref([
	{
		name: i18n.t('home'),
		link: '/'
	},
	{
		name: i18n.t('websites'),
		link: '/strony-internetowe'
	},
])

const isActive = (item) => {
	return route.path === item.link
		|| (item.link !== '/' && route.path.includes(item.link))
}

const changeLanguage = (locale: string) => {
	setLocale(locale)
	window.location.reload()
}

onMounted(() => {
	const sectionStartHeight = document.querySelector('.section__start')?.clientHeight
	const headerHeight = header.value?.clientHeight

	if (sectionStartHeight !== undefined && sectionStartHeight > 0) {
		window.addEventListener('scroll', () => {
			scrolled.value = window.scrollY > sectionStartHeight - headerHeight
		})
	}
})
</script>