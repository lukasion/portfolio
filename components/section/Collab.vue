<template>
	<div class="section__dark section__wrapper">
		<div class="section__container">
			<h2 class="title--x-large title--condensed">What can I offer?</h2>

			<div class="collab__container" :ref="onElementVisible">
				<div class="collab__box" :ref="assignTiltElement">
					<div class="collab__background">
						<div class="collab__content">
							<h2 class="title--large title--condensed">Websites</h2>
							<p>
								The websites I build are fast, secure and easy to manage. I&nbsp;use the latest
								technologies to ensure your website is future-proof and scalable.
							</p>
							<a class="mt-5 block hover:underline hover:cursor-pointer"
							   @click.prevent="displayModal">
								Create a website
							</a>
						</div>
					</div>
				</div>
				<div class="collab__box collab__box--empty"></div>
				<div class="collab__box" :ref="assignTiltElement">
					<div class="collab__background collab__background--on-demand">
						<div class="collab__content">
							<h2 class="title--large title--condensed">On-demand programming</h2>
							<p>
								Do you need a custom solution for your business? I&nbsp;can build a web application
								tailored to your needs. I&nbsp;can also help you with your existing project.
							</p>
							<a class="mt-5 block hover:underline hover:cursor-pointer"
							   @click.prevent="displayModal">
								Maintain an existing project
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
								Search Engine Optimisation is a&nbsp;crucial part of any website. I&nbsp;can help
								you
								improve your website's ranking in search engines.
							</p>
							<a class="mt-5 block hover:underline hover:cursor-pointer"
							   @click.prevent="displayModal">
								Rank up my webpage
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