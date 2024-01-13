<template>
	<div class="header" :class="{'header--scrolled': scrolled === true}" ref="header">
		<div class="header__container">
			<div class="header__logo">
				&lt;lukasz-fujarski&nbsp;/&gt;
			</div>

			<ul>
				<li class="header__item--active">Web developer</li>
				<li class="header__item">About web</li>
			</ul>
		</div>
	</div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const scrolled = ref(false)
const header = ref(null)

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