<template>
	<div class="header" :class="{'header--scrolled': scrolled === true}" ref="header">
		<div class="header__container">
			<nuxt-link to="/" class="header__logo">
				&lt;lukasz-fujarski&nbsp;/&gt;
			</nuxt-link>

			<ul :class="{ 'active': mobileVisible }">
				<li class="header__item--active">Web developer</li>
				<li class="header__item">About web</li>
			</ul>

			<div class="header__hamburger md:hidden" @click="mobileVisible = !mobileVisible">
				<Icon name="material-symbols:menu" size="32px"/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const scrolled = ref(false)
const header = ref(null)
const mobileVisible = ref(false)

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