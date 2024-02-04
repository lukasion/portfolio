<template>
	<div class="header" :class="{'header--scrolled': scrolled === true, 'header--white': white}" ref="header">
		<div class="header__container">
			<nuxt-link to="/" class="header__logo">
				&lt;lukasz-fujarski&nbsp;/&gt;
			</nuxt-link>

			<ul :class="{ 'active': mobileVisible }">
				<li class="header__item" v-for="item in menu">
					<nuxt-link :to="item.link" :class="{'header__item--active': route.path === item.link }">
						{{ item.name }}
					</nuxt-link>
				</li>
			</ul>

			<div class="header__hamburger md:hidden" @click="mobileVisible = !mobileVisible">
				<Icon name="material-symbols:menu" size="32px"/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {useRoute} from "vue-router";

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
		name: 'About author',
		link: '/'
	},
	{
		name: 'About web',
		link: '/blog'
	},
])

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