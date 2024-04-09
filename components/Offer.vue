<template>
	<div class="app__container">
		<div
			class="app__main"
		>
			<Header white/>

			<div class="section__wrapper">
				<div class="section__container md:!pt-48">
					<div class="flex gap-24">
						<div class="w-1/2">
							<p class="text-xs tracking-widest mb-2">ŁUKASZ-FUJARSKI / MID FULL-STACK DEV /
								FREELANCER</p>
							<h1 class="text-xl md:text-5xl leading-tight md:leading-tight font-bold">
								Strony internetowe Katowice, Śląsk
							</h1>

							<p class="mt-6">
								Zajmuję się<strong> tworzeniem stron internetowych dla klientów z Katowic jak i całej
								Polski</strong> opartych o system zarządzania
								treścią <strong>Wordpress</strong> (i nie tylko). Tworzę rozwiązania dla potrzeb małych
								i
								średnich firm, które chcą <strong>zaistnieć w sieci</strong>.
								Wszystkie strony są responsywne, co oznacza, że są dostosowane do urządzeń mobilnych.
								<br/> <br/>
								Strony WWW tworzone przeze mnie są <strong>zgodne z najnowszymi trendami i
								standardami</strong>, co pozwala
								na ich długotrwałe użytkowanie. Wszystkie opracowywane aplikacje są zoptymalizowane pod
								kątem SEO, sprawiając że są one lepiej widoczne w wynikach wyszukiwania, co przekłada
								się
								na zwiększenie ruchu na stronie i zwiększenie sprzedaży.
							</p>
						</div>
						<div class="w-1/2">
							<img src="~/assets/images/render.png" alt="Strony internetowe Katowice, Śląsk"
							     class="rounded-lg"/>
						</div>
					</div>

					<div class="mt-24">
						<h2 class="text-4xl font-bold text-center">Najtańsze i najlepsze strony WWW na
							rynku</h2>

						<h3 class="text-center mt-4 uppercase">
							Oferta, cennik programowania stron
						</h3>

						<div class="flex gap-4 mt-8 text-center">
							<div class="rounded shadow-2xl p-8 py-12 flex flex-col items-center border">
								<h4 class="text-2xl font-bold">Strona One Page</h4>
								<p class="mt-4">
									<strong>Strona One Page</strong> to idealne rozwiązanie dla osób, które chcą
									pozycjonować się w internecie, ale nie mają zbyt dużego budżetu. Strona OnePage to
									jednostronicowa strona internetowa, która zawiera wszystkie niezbędne informacje o
									firmie.
								</p>
								<p class="mt-4 text-xl">
									<strong>Cena:</strong> od 1000 zł
								</p>
								<button class="form__button form__button--dark form__button--arrow-right mt-4">
									Nawiąż współpracę
								</button>
							</div>
							<div class="rounded shadow-2xl p-8 py-12 flex flex-col items-center border">
								<h4 class="text-2xl font-bold">Sklep internetowy</h4>
								<p class="mt-4">
									<strong>Sklep internetowy</strong> to idealne rozwiązanie dla osób, które chcą
									sprzedawać swoje produkty w internecie. Sklep internetowy pozwala na sprzedaż
									produktów
									24/7, co pozwala na zwiększenie sprzedaży.
								</p>
								<p class="mt-4 text-xl">
									<strong>Cena:</strong> od 2000 zł
								</p>
								<button class="form__button form__button--dark form__button--arrow-right mt-4">
									Nawiąż współpracę
								</button>
							</div>
							<div class="rounded shadow-2xl p-8 py-12 flex flex-col items-center border">
								<h4 class="text-2xl font-bold">Strona firmowa</h4>
								<p class="mt-4">
									<strong>Strona firmowa</strong> to idealne rozwiązanie dla firm, które chcą
									zaistnieć
									w internecie. Strona firmowa pozwala na przedstawienie oferty firmy, kontaktu z
									klientem
									oraz na zwiększenie sprzedaży.
								</p>
								<p class="mt-4 text-xl">
									<strong>Cena:</strong> 800 zł
								</p>
								<button class="form__button form__button--dark form__button--arrow-right mt-4">
									Nawiąż współpracę
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<FooterComponent/>

		</div>

		<ModalContact :class="{ 'active': modalStore.visible }"/>
	</div>
</template>

<script setup lang="ts">
import FooterComponent from "~/components/Footer.vue";
import {useModalStore} from "~/store/modal";

const modalStore = useModalStore()
</script>