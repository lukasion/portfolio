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
								Strony internetowe {{ currentCity.singular }}, {{ currentCity.voivodeship }}
							</h1>

							<p class="mt-6">
								Zajmuję się<strong> tworzeniem stron internetowych dla klientów z Katowic jak i całej
								Polski</strong> opartych o system zarządzania
								treścią <strong>Wordpress</strong> (i nie tylko). Tworzę rozwiązania dla potrzeb małych
								i średnich firm działających na terenie miasta Katowice, które chcą <strong>zaistnieć w
								sieci</strong>.
								Wszystkie moje strony są responsywne, co oznacza, że są dostosowane do urządzeń
								mobilnych.
								<br/> <br/>
								Tworzone przeze mnie strony WWW Katowice są <strong>zgodne z najnowszymi
								trendami i standardami</strong>, co pozwala na ich długotrwałe użytkowanie. Wszystkie
								opracowywane aplikacje są zoptymalizowane pod kątem SEO, sprawiając że są one lepiej
								widoczne w wynikach wyszukiwania, co przekłada się na zwiększenie ruchu na stronie i
								zwiększenie sprzedaży.
							</p>
						</div>
						<div class="w-1/2">
							<img src="~/assets/images/render.png" alt="Strony internetowe Katowice, Śląsk"
							     class="rounded-lg"/>
						</div>
					</div>

					<div class="mt-24">
						<h2 class="text-4xl font-bold text-center">
							Profesjonalne strony WWW Katowice
						</h2>

						<h3 class="text-center mt-4 uppercase">
							Oferta, cennik programowania stron dla klientów z Katowic
						</h3>

						<div class="flex flex-col md:flex-row gap-4 mt-8 text-center">
							<div class="rounded shadow-2xl p-8 py-12 flex flex-col items-center border w-full md:w-1/3">
								<h4 class="text-2xl font-bold">Strona One Page</h4>
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
									class="form__button form__button--dark form__button--arrow-right mt-4"
									@click.prevent="modalStore.visible = true"
								>
									Nawiąż współpracę
								</button>
							</div>
							<div class="rounded shadow-2xl p-8 py-12 flex flex-col items-center border w-full md:w-1/3">
								<h4 class="text-2xl font-bold">Strona starter</h4>
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
									class="form__button form__button--dark form__button--arrow-right mt-4"
									@click.prevent="modalStore.visible = true"
								>
									Nawiąż współpracę
								</button>
							</div>
							<div class="rounded shadow-2xl p-8 py-12 flex flex-col items-center border w-full md:w-1/3">
								<h4 class="text-2xl font-bold">Sklep internetowy</h4>
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
									class="form__button form__button--dark form__button--arrow-right mt-4"
									@click.prevent="modalStore.visible = true"
								>
									Nawiąż współpracę
								</button>
							</div>
						</div>

						<p class="mt-12 text-center">
							Powyższe kwoty stanowią cenę netto. Wszystkie ceny są cenami orientacyjnymi i mogą ulec
							zmianie w zależności od indywidualnych potrzeb klienta. <br/>W celu uzyskania dokładnej
							wyceny <a href="tel:+48786826806" class="font-semibold">zapraszam do kontaktu</a> klientów z
							miasta Katowice i okolic.
						</p>
					</div>

					<div class="mt-24">
						<h2 class="text-4xl font-bold text-center">
							Jaką stronę internetową potrzebujesz?
						</h2>

						<p class="mt-12 text-center">
							Z wykorzystaniem platformy WordPress tworzę strony internetowe lokalnych firm z Katowic i
							nie tylko.
							Jest to najpopularniejsza na świecie platforma do zarządzania treścią stron internetowych.
							Korzystając z platformy WordPress, jestem w stanie zbudować różnorodne typy stron
							internetowych, które są responsywne. Może to być strona firmowa biznesu z Katowic, sklep
							online, katalog produktów, strona e-learningowa, strona dla restauracji, system rezerwacji,
							prosta strona typu landing page, strona typu one page, czy strona dedykowana. <br/><br/>WordPress
							to&nbsp;rozwiązanie najwyższej jakości, które na pewno spełni Twoje oczekiwania.
						</p>


						<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 text-center mt-12">
							<div class="border bg-white shadow-md p-6 rounded-lg mb-6">
								<Icon name="gg:website" class="mb-4 text-gray-600" size="48px"/>
								<h2 class="font-bold">Strona internetowa</h2>
								<p class="mt-4">WordPress to platforma, która cieszy się największą popularnością wśród
									twórców stron internetowych. Strona zbudowana na WordPressie oferuje prostotę
									edycji, a co najważniejsze, umożliwia rozwijanie strony www w takt z rozwojem
									Twojego projektu.</p>
							</div>
							<div class="border bg-white shadow-md p-6 rounded-lg mb-6">
								<Icon name="material-symbols:business-center" class="mb-4 text-gray-600" size="48px"/>
								<h2 class="font-bold">Strona dla Firmy</h2>
								<p class="mt-4">Strona dla firmy to nieodłączny element każdego biznesu, pełniący rolę
									wirtualnej wizytówki. Profesjonalnie zaprojektowana strona firmowa jest kluczowa dla
									osiągnięcia sukcesu. Tworzymy nowoczesne, responsywne strony internetowe, zwracając
									szczególną uwagę na detale i optymalizację SEO. Strona oparta na WordPressie
									zaspokoi wszystkie wymagania Twojej firmy.</p>
							</div>
							<div class="border bg-white shadow-md p-6 rounded-lg mb-6">
								<Icon name="ic:baseline-laptop" class="mb-4 text-gray-600" size="48px"/>
								<h2 class="font-bold">Strona e-learning</h2>
								<p class="mt-4">Strona e-learningowa oparta na WordPressie umożliwia utworzenie
									platformy edukacyjnej online, gdzie Twoi klienci mogą nabywać dostęp do kursów
									poprzez subskrypcję miesięczną lub jednorazową opłatę za kurs.</p>
							</div>
							<div class="border bg-white shadow-md p-6 rounded-lg mb-6">
								<Icon name="material-symbols:restaurant" class="mb-4 text-gray-600" size="48px"/>
								<h2 class="font-bold">Strona dla restauracji Katowice</h2>
								<p class="mt-4">Za pomocą WordPressa, Twoja strona restauracji może stać się prawdziwym
									biznesem online. WordPress umożliwia utworzenie systemu do zamawiania jedzenia
									online, idealnego dla restauracji, fast foodów, pizzerii czy kawiarni. Możesz
									skonfigurować system zamówień online dla restauracji, oferując różne opcje
									dostawy.</p>
							</div>
							<div class="border bg-white shadow-md p-6 rounded-lg mb-6">
								<Icon name="material-symbols:edit-calendar" class="mb-4 text-gray-600" size="48px"/>
								<h2 class="font-bold">System rezerwacji</h2>
								<p class="mt-4">Strona internetowa z funkcją wypożyczania produktów, zbudowana na
									platformie WordPress, oferuje prostotę w zarządzaniu i edycji, a co najważniejsze,
									umożliwia rozwój Twojego sklepu internetowego wraz z ekspansją Twojego biznesu.
									Funkcje takie jak rezerwacja miejsc, system bookingowy czy wypożyczalnia produktów
									są łatwe do implementacji..</p>
							</div>
							<div class="border bg-white shadow-md p-6 rounded-lg mb-6">
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