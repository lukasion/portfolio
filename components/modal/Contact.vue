<template>
	<div class="modal">
		<div class="modal__container">
			<button class="modal__close" @click.prevent="modalStore.visible = false">
				<icon name="material-symbols:close-small" class="w-15 h-15 text-5xl"/>
			</button>

			<div class="modal__content">
				<div class="modal__header">
					<h2 class="title--x-large title--condensed">
						<span>Get in touch with me</span>
					</h2>

					<p class="leading-7 mt-5">
						<span style="transition-delay: .6s">
							You can contact me via email, or by filling out the form below. I will try to respond as soon as
							possible.
						</span>
					</p>
				</div>

				<div class="modal__form">
					<form action="">
						<div class="form__input-container">
							<input
								class="form__input" t
								type="text"
								id="name"
								placeholder="Your name"
								v-model="form.name"
							/>
						</div>

						<div class="form__input-container">
							<input
								class="form__input"
								type="email"
								id="email"
								placeholder="Your e-mail address"
								v-model="form.email"
							/>
						</div>

						<div class="form__input-container">
							<textarea
								class="form__input"
								id="message"
								placeholder="Your message"
								v-model="form.message"
							></textarea>
						</div>

						<div class="modal__form-input">
							<button @click.prevent="modalStore.submit(form)" class="form__button form__button--dark">
								Contact request
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import {useModalStore} from "~/store/modal";

const modalStore = useModalStore()

const form = ref({
	name: '',
	email: '',
	message: '',
})
</script>