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
					<a href="https://github.com/lukasion/portfolio/tree/main" target="_blank"
					   class="technology__item">
						<div>
							<Icon name="logos:vue" size="48px"/>
							Vue.js
						</div>
						<p class="technology__title">
							Checkout my work
						</p>
					</a>
				</div>
				<div class="technology__item-wrapper title--slide-from-bottom" :ref="onElementVisible">
					<a href="https://github.com/lukasion/portfolio/tree/main/laravel-api" target="_blank"
					   class="technology__item" style="transition-delay: .6s">
						<div>
							<Icon name="logos:laravel" size="48px"/>
							Laravel
						</div>
						<p class="technology__title">
							Checkout my work
						</p>
					</a>
				</div>
				<div class="technology__item-wrapper title--slide-from-bottom" :ref="onElementVisible">
					<span class="technology__item" style="transition-delay: .9s">
						<div>
							<Icon name="devicon:livewire" size="48px"/>
							Livewire
						</div>
					</span>
				</div>
				<div class="technology__item-wrapper title--slide-from-bottom" :ref="onElementVisible">
					<span class="technology__item" style="transition-delay: 1.2s">
						<div>
							<Icon name="logos:alpinejs-icon" size="48px"/>
							Alpine.js
						</div>
					</span>
				</div>
				<div class="technology__item-wrapper title--slide-from-bottom" :ref="onElementVisible">
					<span class="technology__item" style="transition-delay: 1.5s">
						<div>
							<Icon name="logos:react" size="48px"/>
							React
						</div>
					</span>
				</div>
				<div class="technology__item-wrapper title--slide-from-bottom" :ref="onElementVisible">
					<a href="https://github.com/lukasion/portfolio/tree/main" target="_blank"
					   class="technology__item" style="transition-delay: 1.8s">
						<div>
							<Icon name="logos:nuxt-icon" size="48px"/>
							Nuxt
						</div>
						<p class="technology__title">
							Checkout my work
						</p>
					</a>
				</div>
				<div class="technology__item-wrapper title--slide-from-bottom" :ref="onElementVisible">
					<a href="https://github.com/lukasion/portfolio/tree/main" target="_blank"
					   class="technology__item"
					   style="transition-delay: 2.1s">
						<div>
							<Icon name="logos:nodejs" size="48px"/>
							Node.js
						</div>
						<p class="technology__title">
							Checkout my work
						</p>
					</a>
				</div>
				<div class="technology__item-wrapper title--slide-from-bottom" :ref="onElementVisible">
					<a href="https://github.com/lukasion/portfolio/tree/main/laravel-api" target="_blank"
					   class="technology__item" style="transition-delay: 2.4s">
						<div>
							<Icon name="logos:php-alt" size="48px"/>
							PHP
						</div>
						<p class="technology__title">
							Checkout my work
						</p>
					</a>
				</div>
				<div class="technology__item-wrapper title--slide-from-bottom" :ref="onElementVisible">
					<a href="https://github.com/lukasion/portfolio/tree/main/assets/scss" target="_blank"
					   class="technology__item" style="transition-delay: 2.7s">
						<div>
							<Icon name="vscode-icons:file-type-scss2" size="48px"/>
							SCSS
						</div>
						<p class="technology__title">
							Checkout my work
						</p>
					</a>
				</div>
				<div class="technology__item-wrapper title--slide-from-bottom" :ref="onElementVisible">
					<a href="https://github.com/lukasion/portfolio/tree/main/assets/scss" target="_blank"
					   class="technology__item" style="transition-delay: 3.0s">
						<div>
							<Icon name="logos:tailwindcss-icon" size="48px"/>
							Tailwind
						</div>
						<p class="technology__title">
							Checkout my work
						</p>
					</a>
				</div>
				<div class="technology__item-wrapper title--slide-from-bottom" :ref="onElementVisible">
					<span class="technology__item" style="transition-delay: 3.3s">
						<div>
							<Icon name="logos:docker-icon" size="48px"/>
							Docker
						</div>
					</span>
				</div>
				<div class="technology__item-wrapper title--slide-from-bottom" :ref="onElementVisible">
					<span class="technology__item" style="transition-delay: 3.6s">
						<div>
							<Icon name="logos:git" size="48px"/>
							Git
						</div>
					</span>
				</div>
				<div class="technology__item-wrapper title--slide-from-bottom" :ref="onElementVisible">
					<span class="technology__item" style="transition-delay: 3.9s">
						<div>
							<Icon name="logos:github-copilot" size="48px"/>
							GitHub Copilot
						</div>
					</span>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
const onElementVisible = inject('onElementVisible')
</script>