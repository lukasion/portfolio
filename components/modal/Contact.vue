<template>
	<div class="modal">
		<div class="modal__container">
			<button class="modal__close" @click.prevent="modalStore.visible = false">
				<icon name="material-symbols:close-small" class="w-15 h-15 text-5xl"/>
			</button>

			<div class="modal__content">
				<div class="modal__header">
					<h2 class="title--x-large title--condensed">
						<span>{{ $t('touchFull') }}</span>
					</h2>

					<p class="leading-7 mt-5">
						<span style="transition-delay: .6s">
							{{ $t('touchDescription') }}
						</span>
					</p>

					<a href="tel:+48786826806" target="_blank" class="flex-inline items-center mt-4">
						<Icon name="material-symbols:phone-enabled" size="32px" color="black"/>
						<span class="text-md ml-4 top-[2px] relative">+48 786 826 806</span>
					</a>
					<br/>
					<a href="mailto:lukasz.fujarski@gmail.com" target="_blank" class="flex-inline items-center">
						<Icon name="material-symbols:mail" size="32px" color="black"/>
						<span class="text-md ml-4 top-[2px] relative">lukasz.fujarski@gmail.com</span>
					</a>
				</div>

				<div class="modal__form">
					<div class="form__input-container">
						<input
							class="form__input"
							type="text"
							id="name"
							:placeholder="$t('yourName')"
							v-model="form.name"
						/>
					</div>

					<div class="form__input-container">
						<input
							class="form__input"
							type="email"
							id="email"
							:placeholder="$t('yourEmail')"
							v-model="form.email"
						/>
					</div>

					<div class="form__input-container">
						<input
							class="form__input"
							type="text"
							id="phone"
							:placeholder="$t('yourPhone')"
							v-model="form.phone"
						/>
					</div>

					<div class="form__input-container">
							<textarea
								class="form__input"
								id="message"
								:placeholder="$t('yourMessage')"
								v-model="form.message"
							></textarea>
					</div>

					<div class="modal__form-input">
						<button @click.prevent="modalStore.submit(form)" class="form__button form__button--dark">
							{{ $t('contactRequest') }}
						</button>
					</div>
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
	phone: '',
})
</script>