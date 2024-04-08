<template>
	<section class="section__start section__wrapper">
		<div class="section__background" :class="{'section__background--gradient': !desktop}">
			<canvas id="canvas" width="32px" height="32px" v-if="desktop"></canvas>
		</div>

		<div class="mt-32 md:mt-72 mx-auto container relative">
			<h2 class="px-4 md:px-0 title--ultra-large title--condensed title--slide-from-bottom element--visible"
			    style="mix-blend-mode: color-burn; opacity: 0.6">
				<span v-html="$t('headingTitle')"></span>
			</h2>
			<h2 class="px-4 md:px-0 title--ultra-large title--condensed title--slide-from-bottom element--visible"
			    style="position: absolute; top: 0; left: 0; opacity: 0.4;">
				<span v-html="$t('headingTitle')"/>
			</h2>
		</div>

		<div
			class="section__container mt-8 section__container--small-padding-top flex gap-12 z-100"
			:class="{'element--visible': mounted}"
		>
			<div class="w-full lg:w-1/2">
				<p class="leading-7 md:mt-12 title--slide-from-left">
					<span style="transition-delay: .6s" v-html="$t('headingDescription')"/>
				</p>

				<div class="title--slide-from-bottom mt-6 flex md:gap-3 flex-col md:flex-row relative left-0 md:-left-6"
				     :class="{'element--visible': mounted}">
					<button
						type="button"
						class="form__button form__button--arrow-right !mt-4 md:mt-10"
						@click.prevent="displayModal"
					>
						<span v-html="$t('collaborate')"/>
					</button>

					<button
						class="form__button form__button--darker !mt-4 md:mt-10"
						@click.prevent="skillsChartStore.toggle(true)"
					>
						<span v-html="$t('checkoutSummary')"/>
					</button>
				</div>
			</div>
			<div class="hidden lg:block lg:w-1/2 relative">
				<div class="box__rounded box--animated">
					<h4 class="font-bold mb-4">
						<span v-html="$t('responsiveDesign')"/>
					</h4>
					<img src="~/assets/images/mobile.jpg" alt="Fully responsive web design"
					     width="260px"
					     title="Fully responsive, mobile web design"/>
				</div>
				<div class="box__rounded box--bigger box--animated">
					<img src="~/assets/images/doger-desktop.jpg" alt="Web application developed in laravel framework"
					     width="450px"
					     title="Web application developed in laravel framework"/>
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

const desktop = ref(false)
const mounted = ref(false)

onMounted(() => {
	desktop.value = window.innerWidth > 1024
	mounted.value = true

	if (desktop.value) {
		setTimeout(() => {
			new Gradient({
				canvas: '#canvas',
				colors: ['#ff333d', '#a960ee', '#90e0ff', '#ffcb57']
			});
		}, 0)
	}
})
</script>

<style lang="scss" scoped>
.box {
	&__rounded {
		@apply bg-white rounded-2xl p-6 shadow-2xl absolute right-32 -top-48 z-20;
	}

	&--animated {
		@apply transition-transform duration-300 ease-in-out;

		&:hover {
			@apply transform -translate-y-6;
		}
	}

	&--bigger {
		@apply -right-32 top-32 z-10;
	}
}
</style>