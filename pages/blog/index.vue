<template>
	<div>
		<Header white/>

		<div class="container mx-auto pt-32">
			<h1 class="text-2xl font-bold">Be Crafty - About web</h1>
			<p class="text-xl mt-4">
				Start being crafty today.
			</p>

			<div class="blog__container">
				<div class="blog__articles">
					<h3 class="text-2xl mb-4">Featured article</h3>

					<article-short/>
				</div>

				<div class="blog__side">
					<h3 class="text-2xl mb-4">Recent articles</h3>

					<div class="flex flex-col gap-8">
						<article-short column hide-description/>
						<article-short column hide-description/>
						<article-short column hide-description/>
					</div>
				</div>
			</div>

			<div class="blog__container blog__container--column">
				<h4 class="text-2xl">Not sure where to start?</h4>

				<div class="flex gap-2 mb-12">
					<div class="blog__box">
						<h4 class="uppercase text-sm tracking-wider">Category</h4>
						<h2 class="text-2xl font-bold">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
							Facilis,
							minima!</h2>
						<p class="mt-4">January 31, 2024 - 9 minutes read</p>
					</div>
					<div class="blog__box">
						<h4 class="uppercase text-sm tracking-wider">Category</h4>
						<h2 class="text-2xl font-bold">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
							Facilis,
							minima!</h2>
						<p class="mt-4">January 31, 2024 - 9 minutes read</p>
					</div>
					<div class="blog__box">
						<h4 class="uppercase text-sm tracking-wider">Category</h4>
						<h2 class="text-2xl font-bold">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
							Facilis,
							minima!</h2>
						<p class="mt-4">January 31, 2024 - 9 minutes read</p>
					</div>
					<div class="blog__box">
						<h4 class="uppercase text-sm tracking-wider">Category</h4>
						<h2 class="text-2xl font-bold">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
							Facilis,
							minima!</h2>
						<p class="mt-4">January 31, 2024 - 9 minutes read</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">

</script>

<style scoped>
@import 'assets/scss/structures/_blog.scss';
</style>