<template>
	<div class="header" :class="{'header--scrolled': scrolled === true}">
		<div class="header__container">
			<div class="header__logo">
				&lt;lukasz-fujarski&nbsp;/&gt;
			</div>

			<ul>
				<li class="header__item--active">Home</li>
				<li class="header__item">About</li>
				<li class="header__item">Projects</li>
				<li class="header__item">Contact</li>
			</ul>
		</div>
	</div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const scrolled = ref(false)

onMounted(() => {
	window.addEventListener('scroll', () => {
		scrolled.value = window.scrollY > 0
	})
})
</script>