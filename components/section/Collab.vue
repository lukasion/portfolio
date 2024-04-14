<template>
	<div class="section__dark section__wrapper">
		<div class="section__container">
			<h2 class="title--x-large title--condensed">{{ $t('offer') }}</h2>

			<div class="collab__container" :ref="onElementVisible">
				<div class="collab__box" :ref="assignTiltElement">
					<div class="collab__background">
						<div class="collab__content">
							<h2 class="title--large title--condensed">
								<span v-html="$t('websites')"/>
							</h2>
							<p>
								<span v-html="$t('websitesDescription')"/>
							</p>
							<nuxt-link
								class="mt-5 block hover:underline hover:cursor-pointer"
								to="/strony-internetowe-katowice">
								<span v-html="$t('readMore')"/>
							</nuxt-link>
						</div>
					</div>
				</div>
				<div class="collab__box collab__box--empty"></div>
				<div class="collab__box" :ref="assignTiltElement">
					<div class="collab__background collab__background--on-demand">
						<div class="collab__content">
							<h2 class="title--large title--condensed">
								<span v-html="$t('onDemand')"/>
							</h2>
							<p>
								<span v-html="$t('onDemandDescription')"/>
							</p>
							<a class="mt-5 block hover:underline hover:cursor-pointer"
							   @click.prevent="displayModal">
								<span v-html="$t('onDemandButton')"/>
							</a>
						</div>
					</div>
				</div>
			</div>

			<div class="collab__container md:!mt-16" :ref="onElementVisible">
				<div class="collab__box collab__box--empty"></div>
				<div class="collab__box" :ref="assignTiltElement">
					<div class="collab__background collab__background--seo">
						<div class="collab__content">
							<h2 class="title--large title--condensed">SEO</h2>
							<p>
								<span v-html="$t('seoDescription')"/>
							</p>
							<a class="mt-5 block hover:underline hover:cursor-pointer"
							   @click.prevent="displayModal">
								<span v-html="$t('seoButton')"/>
							</a>
						</div>
					</div>
				</div>
				<div class="collab__box collab__box--empty"></div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import VanillaTilt from 'vanilla-tilt';
import {useModalStore} from "~/store/modal";

const onElementVisible: any = inject('onElementVisible')

const displayModal = () => {
	useModalStore().visible = true
}

const tiltElements: Ref<any[]> = ref([])
const assignTiltElement = (el: any) => {
	tiltElements.value.push(el)
}

onMounted(() => {
	VanillaTilt.init(tiltElements.value, {
		speed: 200,
		glare: true,
		'max-glare': 0.2,
		'gyroscope': false,
		'perspective': 700,
		'scale': 1.05
	});
})
</script>