<template>
	<section class="section__wrapper">
		<div class="section__container">
			<h2 class="title--x-large title--condensed title--slide-from-bottom"
			    :ref="onElementVisible">
				<span>Technologies I use in my projects</span>
			</h2>

			<p class="leading-7 mt-5 title--slide-from-left" :ref="onElementVisible">
				<span style="transition-delay: .6s">
					As a web developer, I have experience with a wide range of technologies. I have worked with
					Laravel, Vue.js, Nuxt 3, Tailwind CSS, and many other technologies. <br/>I am always trying to gain new
					skills and improve my knowledge of the technologies I already know. Below you can find a list of
					the technologies I use in my projects everyday. If you are interested in working with me, feel free to
					contact me. I am always open to new opportunities.
				</span>
			</p>

			<div class="technology__container mt-12">
				<div class="technology__item-wrapper title--slide-from-bottom" :ref="onElementVisible">
					<span class="technology__item">
						<Icon name="logos:vue" size="48px"/>
						Vue.js
					</span>
				</div>
				<div class="technology__item-wrapper title--slide-from-bottom" :ref="onElementVisible">
					<span class="technology__item" style="transition-delay: .6s">
						<Icon name="logos:laravel" size="48px"/>
						Laravel
					</span>
				</div>
				<div class="technology__item-wrapper title--slide-from-bottom" :ref="onElementVisible">
					<span class="technology__item" style="transition-delay: .9s">
						<Icon name="logos:nuxt-icon" size="48px"/>
						Nuxt
					</span>
				</div>
				<div class="technology__item-wrapper title--slide-from-bottom" :ref="onElementVisible">
					<span class="technology__item" style="transition-delay: 1.2s">
						<Icon name="logos:nodejs" size="48px"/>
						Node.js
					</span>
				</div>
				<div class="technology__item-wrapper title--slide-from-bottom" :ref="onElementVisible">
					<span class="technology__item" style="transition-delay: 1.5s">
						<Icon name="logos:php-alt" size="48px"/>
						PHP
					</span>
				</div>
				<div class="technology__item-wrapper title--slide-from-bottom" :ref="onElementVisible">
					<span class="technology__item" style="transition-delay: 1.7s">
						<Icon name="vscode-icons:file-type-scss2" size="48px"/>
						SCSS
					</span>
				</div>
				<div class="technology__item-wrapper title--slide-from-bottom" :ref="onElementVisible">
					<span class="technology__item" style="transition-delay: 1.9s">
						<Icon name="logos:tailwindcss-icon" size="48px"/>
						Tailwind
					</span>
				</div>
				<div class="technology__item-wrapper title--slide-from-bottom" :ref="onElementVisible">
					<span class="technology__item" style="transition-delay: 2.1s">
						<Icon name="logos:docker-icon" size="48px"/>
						Docker
					</span>
				</div>
				<div class="technology__item-wrapper title--slide-from-bottom" :ref="onElementVisible">
					<span class="technology__item" style="transition-delay: 2.3s">
						<Icon name="logos:git" size="48px"/>
						Git
					</span>
				</div>
				<div class="technology__item-wrapper title--slide-from-bottom" :ref="onElementVisible">
					<span class="technology__item" style="transition-delay: 2.5s">
						<Icon name="logos:github-copilot" size="48px"/>
						GitHub Copilot
					</span>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
const onElementVisible = inject('onElementVisible')
</script>