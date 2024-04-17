<template>
	<div class="app__container">
		<div
			class="app__main"
		>
			<Header white/>

			<div class="section__wrapper">
				<div class="section__container md:!pt-48">
					<cities-list/>
				</div>
			</div>

			<FooterComponent/>
		</div>
	</div>
</template>

<script setup>

import FooterComponent from "~/components/Footer.vue";
</script>