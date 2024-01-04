<template>
	<div class="modal">
		<div class="modal__container">
			<button class="modal__close" @click.prevent="modalStore.visible = false">
				<icon name="material-symbols:close-small" class="w-6 h-6"/>
			</button>

			<div class="modal__header">
				<h2 class="title--x-large title--condensed title--slide-from-bottom" :ref="onElementVisible">
					<span>Get in touch with me</span>
				</h2>

				<p class="leading-7 mt-5 title--slide-from-left" :ref="onElementVisible">
					<span style="transition-delay: .6s">
						You can contact me via email, or by filling out the form below. I will try to respond as soon as
						possible.
					</span>
				</p>
			</div>

			<div class="modal__form">
				<form action="">
					<div class="modal__form-input">
						<label for="name">Name</label>
						<input type="text" id="name" placeholder="Your name"/>
					</div>

					<div class="modal__form-input">
						<label for="email">Email</label>
						<input type="email" id="email" placeholder="Your email"/>
					</div>

					<div class="modal__form-input">
						<label for="message">Message</label>
						<textarea id="message" placeholder="Your message"></textarea>
					</div>

					<div class="modal__form-input">
						<button class="button button--primary">Send</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import {useModalStore} from "~/store/modal";

const modalStore = useModalStore()
</script>