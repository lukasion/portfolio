<template>
	<section class="section__start section__wrapper">
		<div class="section__container md:border-l px-5 md:px-20">
			<h2 class="title--x-large title--condensed title--slide-from-bottom" :ref="onElementVisible">
				<span>Websites done the proper way</span>
			</h2>

			<p class="leading-7 title--slide-from-left" :ref="onElementVisible">
				<span style="transition-delay: .6s">
					I am a web developer based in Katowice, Poland. I specialise in building websites and web applications
					using modern technologies. <br/>If you are a business seeking a web presence or an employer looking to
					hire, you can get in touch with me here.
				</span>
			</p>

			<div class="title--slide-from-bottom" :ref="onElementVisible">
				<button
					type="button"
					class="form__button"
					@click.prevent="displayModal"
				>
					Let's colaborate on a project
				</button>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import {useModalStore} from "~/store/modal";

const onElementVisible = inject('onElementVisible')

const displayModal = () => {
	useModalStore().visible = true
}
</script>