<template>
	<section class="section__start section__wrapper">
		<div class="section__container border-l px-20">
			<h2 class="title--x-large title--condensed title--slide-from-bottom" :ref="onElementVisible">
				<span>Websites done the right way</span>
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
					class="mt-10 inline-block rounded bg-neutral-50 px-6 pb-2 pt-2.5 font-bold uppercase leading-normal text-neutral-800 shadow-[0_4px_9px_-4px_#cbcbcb] transition duration-150 ease-in-out hover:bg-neutral-100 hover:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(251,251,251,0.3)] dark:hover:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:focus:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:active:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)]">
					Let's colaborate
				</button>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
const onElementVisible = inject('onElementVisible')
</script>