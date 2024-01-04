<template>
	<section class="section__wrapper">
		<div class="section__container">
			<h2 class="title--x-large title--condensed title--slide-from-bottom" :ref="onElementVisible">
				<span>You can find me also here</span>
			</h2>

			<p class="leading-7 mt-5 title--slide-from-left" :ref="onElementVisible">
				<span style="transition-delay: .6s">
					I am active on many social media platforms. You can find me primarily on GitHub, and LinkedIn. I am also
					available via email. If you want to get in touch with me, feel free to contact me on any of the
					platforms listed below.
				</span>
			</p>

			<div class="technology__container mt-12">
				<div class="technology__item">
					<Icon name="logos:github-icon" size="48px"/>
					GitHub
				</div>
				<div class="technology__item">
					<Icon name="logos:linkedin-icon" size="48px"/>
					LinkedIn
				</div>
				<div class="technology__item">
					<Icon name="logos:facebook" size="48px"/>
					Facebook
				</div>
				<div class="technology__item">
					<Icon name="logos:google-gmail" size="48px"/>
					Google Mail
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
const onElementVisible = inject('onElementVisible')
</script>