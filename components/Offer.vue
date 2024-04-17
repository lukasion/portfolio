<template>
	<div class="app__container">
		<div
			class="app__main"
		>
			<Header white/>

			<div class="section__wrapper">
				<div class="section__container md:!pt-48">
					<div class="flex flex-col md:flex-row gap-10 sm:gap-24">
						<div class="w-full md:w-1/2 order-2 md:order-1">
							<p class="text-xs tracking-widest mb-2">ŁUKASZ-FUJARSKI / MID FULL-STACK DEV /
								FREELANCER</p>
							<h1 class="text-xl md:text-5xl leading-tight md:leading-tight font-bold">
								Strony internetowe {{ currentCity.singular }}, {{ currentCity.voivodeship }}
							</h1>

							<p class="mt-6" v-html="currentCity.description"/>
						</div>
						<div class="w-1/2 mx-auto order-1">
							<img src="~/assets/images/render.png"
							     :alt="`Strony internetowe ${currentCity.singular}, ${currentCity.voivodeship}. Wycena stron WWW - tanio i rzetelnie.`"
							     :title="`Strony internetowe ${currentCity.singular}, ${currentCity.voivodeship}. Wycena stron WWW - tanio i rzetelnie.`"
							     class="rounded-lg"/>
						</div>
					</div>

					<div class="mt-24">
						<h2 class="text-2xl md:text-4xl font-bold text-center">
							Profesjonalne strony WWW {{ currentCity.singular }}
						</h2>

						<h3 class="text-sm sm:text-base text-center mt-4 uppercase">
							Oferta, cennik programowania stron dla klientów z {{ currentCity.genitive }}
						</h3>

						<div
							class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-4 mt-8 md:mt-16 text-center">
							<div
								class="rounded shadow-2xl p-4 xl:p-8 py-12 flex flex-col items-center border w-full text-sm xl:text-base"
							>
								<h4 class="text-xl xl:text-2xl font-bold">Strona One Page</h4>
								<p class="mt-4">
									<strong>Strona One Page</strong> to idealne rozwiązanie dla osób, które chcą
									pozycjonować się w internecie, ale nie mają zbyt dużego budżetu.
								</p>
								<p class="mt-2">1 podstrona</p>
								<p class="mt-2">Czas pracy wykonawcy do 10 godz.</p>
								<p class="mt-2">Realizacja do 7 dni</p>
								<p class="mt-4 text-xl">
									<strong>Cena:</strong> od 1000 zł
								</p>

								<button
									class="form__button form__button--dark form__button--arrow-right mt-4 text-sm xl:text-base"
									@click.prevent="modalStore.visible = true"
								>
									Masz pytanie? Skontaktuj&nbsp;się
								</button>
							</div>
							<div
								class="rounded shadow-2xl p-4 xl:p-8 py-12 flex flex-col items-center border w-full lg:scale-110 bg-white text-sm xl:text-base"
							>
								<h4 class="text-xl xl:text-2xl font-bold">Strona starter</h4>
								<p class="mt-4">
									<strong>Strona starter</strong> to świetne rozwiązanie dla osób, które chcą mieć
									swoją stronę firmową w internecie. Pozwala na zaprezentowanie swojej oferty oraz
									ułatwia kontakt z klientem.
								</p>
								<p class="mt-4">5 podstron</p>
								<p class="mt-2">Czas pracy wykonawcy do 25 godz.</p>
								<p class="mt-2">Realizacja do 14 dni</p>
								<p class="mt-4 text-xl">
									<strong>Cena:</strong> 1500 zł
								</p>
								<button
									class="form__button form__button--dark form__button--arrow-right mt-4 text-sm xl:text-base"
									@click.prevent="modalStore.visible = true"
								>
									Masz pytanie? Skontaktuj&nbsp;się
								</button>
							</div>
							<div
								class="rounded shadow-2xl p-4 xl:p-8 py-12 flex flex-col items-center border w-full md:col-span-2 lg:col-span-1 text-sm xl:text-base"
							>
								<h4 class="text-xl xl:text-2xl font-bold">Sklep internetowy</h4>
								<p class="mt-4">
									<strong>Sklep internetowy</strong> to idealne rozwiązanie dla osób, które chcą
									sprzedawać swoje produkty w internecie. Sklep internetowy pozwala na sprzedaż
									produktów 24/7, co pozwala na zwiększenie sprzedaży.
								</p>
								<p class="mt-2">Realizacja do 20 dni</p>
								<p class="mt-4 text-xl">
									<strong>Cena:</strong> od 2000 zł
								</p>
								<button
									class="form__button form__button--dark form__button--arrow-right mt-4 text-sm xl:text-base"
									@click.prevent="modalStore.visible = true"
								>
									Masz pytanie? Skontaktuj&nbsp;się
								</button>
							</div>
						</div>

						<p class="mt-12 md:mt-24 text-center">
							Powyższe kwoty stanowią cenę netto. Wszystkie ceny są cenami orientacyjnymi i mogą ulec
							zmianie w zależności od indywidualnych potrzeb klienta. <br/>W celu uzyskania dokładnej
							wyceny <a href="tel:+48786826806" class="font-semibold">zapraszam do kontaktu</a> klientów z
							miasta {{ currentCity.singular }} i okolic.
						</p>
					</div>

					<div class="mt-12 md:mt-24">
						<h2 class="text-2xl md:text-4xl font-bold text-center">
							Jaką stronę internetową potrzebujesz?
						</h2>

						<p class="mt-6 md:mt-12 text-center">
							Z wykorzystaniem platformy WordPress tworzę strony internetowe lokalnych firm z
							{{ currentCity.genitive }} i nie tylko.
							Jest to najpopularniejsza na świecie platforma do zarządzania treścią stron internetowych.
							Korzystając z platformy WordPress, jestem w stanie zbudować różnorodne typy stron
							internetowych, które są responsywne. Może to być strona firmowa biznesu z
							{{ currentCity.genitive }}, sklep
							online, katalog produktów, strona e-learningnuxtowa, strona dla restauracji, system
							rezerwacji,
							prosta strona typu landing page, strona typu one page, czy strona dedykowana. <br/><br/>WordPress
							to&nbsp;rozwiązanie najwyższej jakości, które na pewno spełni Twoje oczekiwania.
						</p>

						<div
							class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12 text-center mt-12">
							<div class="border bg-white shadow-md p-6 rounded-lg">
								<Icon name="gg:website" class="mb-4 text-gray-600" size="48px"/>
								<h2 class="font-bold">Strona internetowa</h2>
								<p class="mt-4">WordPress to platforma, która cieszy się największą popularnością wśród
									twórców stron internetowych. Strona zbudowana na WordPressie oferuje prostotę
									edycji, a co najważniejsze, umożliwia rozwijanie strony www w takt z rozwojem
									Twojego projektu.</p>
							</div>
							<div class="border bg-white shadow-md p-6 rounded-lg">
								<Icon name="material-symbols:business-center" class="mb-4 text-gray-600" size="48px"/>
								<h2 class="font-bold">Strona dla Firmy</h2>
								<p class="mt-4">Strona dla firmy to nieodłączny element każdego biznesu, pełniący rolę
									wirtualnej wizytówki. Profesjonalnie zaprojektowana strona firmowa jest kluczowa dla
									osiągnięcia sukcesu. Tworzymy nowoczesne, responsywne strony internetowe, zwracając
									szczególną uwagę na detale i optymalizację SEO. Strona oparta na WordPressie
									zaspokoi wszystkie wymagania Twojej firmy.</p>
							</div>
							<div class="border bg-white shadow-md p-6 rounded-lg">
								<Icon name="ic:baseline-laptop" class="mb-4 text-gray-600" size="48px"/>
								<h2 class="font-bold">Strona e-learning</h2>
								<p class="mt-4">Strona e-learningowa oparta na WordPressie umożliwia utworzenie
									platformy edukacyjnej online, gdzie Twoi klienci mogą nabywać dostęp do kursów
									poprzez subskrypcję miesięczną lub jednorazową opłatę za kurs.</p>
							</div>
							<div class="border bg-white shadow-md p-6 rounded-lg">
								<Icon name="material-symbols:restaurant" class="mb-4 text-gray-600" size="48px"/>
								<h2 class="font-bold">Strona dla restauracji {{ currentCity.singular }}</h2>
								<p class="mt-4">Za pomocą WordPressa, Twoja strona restauracji może stać się prawdziwym
									biznesem online. WordPress umożliwia utworzenie systemu do zamawiania jedzenia
									online, idealnego dla restauracji, fast foodów, pizzerii czy kawiarni. Możesz
									skonfigurować system zamówień online dla restauracji, oferując różne opcje
									dostawy.</p>
							</div>
							<div class="border bg-white shadow-md p-6 rounded-lg">
								<Icon name="material-symbols:edit-calendar" class="mb-4 text-gray-600" size="48px"/>
								<h2 class="font-bold">System rezerwacji</h2>
								<p class="mt-4">Strona internetowa z funkcją wypożyczania produktów, zbudowana na
									platformie WordPress, oferuje prostotę w zarządzaniu i edycji, a co najważniejsze,
									umożliwia rozwój Twojego sklepu internetowego wraz z ekspansją Twojego biznesu.
									Funkcje takie jak rezerwacja miejsc, system bookingowy czy wypożyczalnia produktów
									są łatwe do implementacji..</p>
							</div>
							<div class="border bg-white shadow-md p-6 rounded-lg">
								<Icon name="material-symbols:screenshot-monitor-outline" class="mb-4 text-gray-600"
								      size="48px"/>
								<h2 class="font-bold">Strona Landing page</h2>
								<p class="mt-4">Landing page, często nazywana prostą stroną docelową, to strona, na
									którą użytkownik trafia po kliknięciu na Twoją reklamę na Facebooku, wiadomość
									e-mail, newsletter, baner reklamowy umieszczony na innej stronie lub reklamę w
									Google.</p>
							</div>
						</div>

						<cities-list/>

						<h4 class="text-2xl md:text-4xl font-bold text-center mt-12">
							Przykładowe realizacje stron internetowych
						</h4>

						<p class="text-center mt-6">
							Poniżej prezentuję przykładowe realizacje stron internetowych. Wszystkie strony internetowe
							firm zostały wykonane zgodnie z wytycznymi klienta. Każda strona internetowa jest
							responsywna, co oznacza, że dostosowuje się do rozmiaru ekranu urządzenia, na którym jest
							wyświetlana. Dzięki temu strona internetowa wyświetla się poprawnie na komputerach,
							tabletach i&nbsp;smartfonach.
						</p>

						<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 sm:gap-6 md:gap-12 mt-12">
							<a href="https://doger.pl/" target="_blank"
							   class="shadow-xl rounded-xl overflow-hidden relative hover:bg-black transition [&>p]:hover:translate-y-0">
								<div
									class="h-full w-full rounded-xl overflow-hidden bg-fixed opacity-100 transition duration-300 ease-in-out hover:opacity-50">
									<img src="~/assets/images/web1.jpg"
									     class="w-full h-full object-cover transition duration-300 ease-in-out hover:scale-110 relative"/>
								</div>

								<p class="font-bold absolute drop-shadow-lg z-100 text-white bottom-4 left-0 right-0 text-center transition-transform translate-y-64">
									Portal internetowy Doger
								</p>
							</a>

							<a href="https://glimren.no/" target="_blank"
							   class="shadow-xl rounded-xl overflow-hidden relative hover:bg-black transition [&>p]:hover:translate-y-0">
								<div
									class="h-full w-full rounded-xl overflow-hidden bg-fixed opacity-100 transition duration-300 ease-in-out hover:opacity-50">
									<img src="~/assets/images/web2.jpg"
									     class="w-full h-full object-cover transition duration-300 ease-in-out hover:scale-110 relative"/>
								</div>

								<p class="font-bold absolute drop-shadow-lg z-100 text-white bottom-4 left-0 right-0 text-center transition-transform translate-y-64">
									Firma sprzątająca Glimren
								</p>
							</a>

							<a href="https://kancelariafinansjer.pl/" target="_blank"
							   class="shadow-xl rounded-xl overflow-hidden relative hover:bg-black transition [&>p]:hover:translate-y-0">
								<div
									class="h-full w-full rounded-xl overflow-hidden bg-fixed opacity-100 transition duration-300 ease-in-out hover:opacity-50">
									<img src="~/assets/images/web3.jpg"
									     class="w-full h-full object-cover transition duration-300 ease-in-out hover:scale-110 relative"/>
								</div>

								<p class="font-bold absolute drop-shadow-lg z-100 text-white bottom-4 left-0 right-0 text-center transition-transform translate-y-64">
									Kancelaria podatkowa Finansjer
								</p>
							</a>
						</div>

						<h4 class="text-2xl md:text-4xl font-bold text-center mt-20">Projekty aplikacji webowych</h4>

						<p class="text-center mt-12">
							Projekty aplikacji webowych i portali internetowych, w których biorę aktywny udział jako
							Full-stack Developer pracując dla firmy Tech-Studio S.C.
						</p>

						<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 sm:gap-6 md:gap-12 mt-12">
							<a href="https://www.ecmentarze.pl/" target="_blank"
							   class="shadow-xl rounded-xl overflow-hidden relative hover:bg-black transition [&>p]:hover:translate-y-0">
								<div
									class="h-full w-full rounded-xl overflow-hidden bg-fixed opacity-100 transition duration-300 ease-in-out hover:opacity-50">
									<img src="~/assets/images/web4.jpg"
									     class="w-full h-full object-cover transition duration-300 ease-in-out hover:scale-110 relative"/>
								</div>

								<p class="font-bold absolute drop-shadow-lg z-100 text-white bottom-4 left-0 right-0 text-center transition-transform translate-y-64">
									Portal eCmentarze.pl
								</p>
							</a>

							<a href="https://www.parochialis.pl/" target="_blank"
							   class="shadow-xl rounded-lg overflow-hidden relative hover:bg-black transition [&>p]:hover:translate-y-0">
								<div
									class="h-full w-full rounded-xl overflow-hidden bg-fixed opacity-100 transition duration-300 ease-in-out hover:opacity-50">
									<img src="~/assets/images/web5.jpg"
									     class="w-full h-full object-cover transition duration-300 ease-in-out hover:scale-110 relative"/>
								</div>

								<p class="font-bold absolute drop-shadow-lg z-100 text-white bottom-4 left-0 right-0 text-center transition-transform translate-y-64">
									Wirtualna kancelaria parafialna
								</p>
							</a>

							<a href="https://tech-studio.pl/" target="_blank"
							   class="shadow-xl rounded-lg overflow-hidden relative hover:bg-black transition [&>p]:hover:translate-y-0">
								<div
									class="h-full w-full rounded-xl overflow-hidden bg-fixed opacity-100 transition duration-300 ease-in-out hover:opacity-50">
									<img src="~/assets/images/web6.jpg"
									     class="w-full h-full object-cover transition duration-300 ease-in-out hover:scale-110 relative"/>
								</div>

								<p class="font-bold absolute drop-shadow-lg z-100 text-white bottom-4 left-0 right-0 text-center transition-transform translate-y-64">
									Wizytówka firmy Tech-Studio S.C.
								</p>
							</a>
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
import {useCitiesStore} from "~/store/citites";
import FooterComponent from "~/components/Footer.vue";
import {useModalStore} from "~/store/modal";

const modalStore = useModalStore()
const citiesStore = useCitiesStore()

const props = defineProps({
	city: String
})

const currentCity = computed(() => citiesStore.cities[props.city])
const allCities = computed(() => Object.values(citiesStore.cities).map((city: any) => city.singular))
</script>