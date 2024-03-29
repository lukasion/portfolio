<template>
	<section class="section__start section__wrapper">
		<div class="section__background">
			<canvas id="canvas" width="32px" height="32px"></canvas>
		</div>

		<div class="mt-52 mx-auto container relative">
			<h2 class="title--ultra-large title--condensed title--slide-from-bottom element--visible"
			    style="mix-blend-mode: color-burn; opacity: 0.6">
				<span>Websites done <br/>the right way!</span>
			</h2>
			<h2 class="title--ultra-large title--condensed title--slide-from-bottom element--visible"
			    style="position: absolute; top: 0; left: 0; opacity: 0.4;">
				<span>Websites done <br/>the right way!</span>
			</h2>
		</div>

		<div class="section__container section__container--small-padding-top flex gap-12">
			<div class="w-full lg:w-1/2">
				<p class="leading-7 title--slide-from-left" :ref="onElementVisible">
				<span style="transition-delay: .6s">
					I am a web developer based in Katowice, Poland. I specialise in building websites and web applications
					using modern technologies. <br/>If you are a business seeking a web presence or an employer looking to
					hire, you can get in touch with me here.
				</span>
				</p>

				<div class="title--slide-from-bottom flex gap-3" :ref="onElementVisible">
					<button
						type="button"
						class="form__button"
						@click.prevent="displayModal"
					>
						Let's colaborate on a project
					</button>

					<button
						class="form__button form__button--darker"
						@click.prevent="skillsChartStore.toggle(true)"
					>
						Checkout my skills chart
					</button>
				</div>
			</div>
			<div class="hidden lg:block lg:w-1/2 relative">
				<div class="box__rounded">
					<h4 class="font-bold mb-4">Fully responsive design</h4>
					<img src="~/assets/images/mobile.jpg" alt="Fully responsive web design"
					     width="260px"
					     title="Fully responsive, mobile web design"/>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import {useModalStore} from "~/store/modal";
import {useSkillsChartStore} from "~/store/skillsChart";
import Gradient from "~/utils/src/Gradient";

const skillsChartStore = useSkillsChartStore()
const onElementVisible = inject('onElementVisible')

const displayModal = () => {
	useModalStore().visible = true
}

onMounted(() => {
	new Gradient({
		canvas: '#canvas',
		colors: ['#ff333d', '#a960ee', '#90e0ff', '#ffcb57']
	});
})
</script>

<style lang="scss" scoped>
.box {
	&__rounded {
		@apply bg-white rounded-2xl p-6 shadow-2xl absolute right-32 -top-48;
	}
}
</style>