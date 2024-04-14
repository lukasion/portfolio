<template>
	<section class="max-w-2xl px-6 py-8 mx-auto bg-white dark:bg-gray-900">
		<header>
			Be-Crafty
		</header>

		<main class="mt-8">
			<h2 class="text-lg text-gray-700 dark:text-gray-200">Kontakt ze strony be-crafty.com</h2>

			<p class="mt-2 leading-loose text-gray-600 dark:text-gray-300">
				Ze strony internetowej be-crafty.com wysłano zapytanie o kontakt. Poniżej znajdziesz szczegóły
				zapytania.
			</p>

			<div class="mt-8">
				<h3 class="text-gray-700 dark:text-gray-200">Dane kontaktowe</h3>
				<p class="mt-2 leading-loose text-gray-600 dark:text-gray-300">
					<strong>Imię:</strong> {{ name }}<br>
					<strong>Adres e-mail:</strong> {{ email }}<br>
					<strong>Telefon:</strong> {{ phone }}<br>
					<strong>Wiadomość:</strong> {{ message }}
				</p>
			</div>
		</main>
	</section>
</template>

<script setup>
const props = defineProps({
	name: String,
	email: String,
	phone: String,
	message: String
})
</script>