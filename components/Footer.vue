<template>
	<footer class="bg-[#222222] text-white">
		<div class="py-12 px-4 md:px-0 mx-auto container">
			<h4 class="text-xl font-bold">
				<span v-html="$t('findMe')"/>
			</h4>

			<div class="flex flex-col items-start gap-3 mt-6" :ref="onElementVisible">
				<a href="https://linkedin.com/in/lukasz-fujarski" target="_blank" class="flex items-center gap-3">
					<Icon name="uil:linkedin" size="32px" class="grayscale brightness-200 contrast-200"/>
					<p class="text-md">in/lukasz-fujarski</p>
				</a>
				<a href="https://github.com/lukasion" target="_blank" class="flex items-center gap-3">
					<Icon name="uil:github" size="32px" color="white"/>
					<p class="text-md">lukasion</p>
				</a>
				<a href="mailto:lukasz.fujarski@gmail.com" target="_blank" class="flex items-center gap-3">
					<Icon name="material-symbols:mail" size="32px" color="white"/>
					<p class="text-md">lukasz.fujarski@gmail.com</p>
				</a>
				<a href="tel:+48786826806" target="_blank" class="flex items-center gap-3">
					<Icon name="material-symbols:phone-enabled" size="32px" color="white"/>
					<p class="text-md">+48 786 826 806</p>
				</a>
			</div>

			<div class="title--slide-from-bottom" :ref="onElementVisible">
				<button
					type="button"
					class="form__button"
					@click.prevent="displayModal"
				>
					{{ $t('touchFull') }}
				</button>
			</div>
		</div>
	</footer>
</template>

<script setup lang="ts">
import {useModalStore} from "~/store/modal";

const onElementVisible = inject('onElementVisible')

const displayModal = () => {
	useModalStore().visible = true
}
</script>