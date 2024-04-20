import { b as buildAssetsURL } from '../routes/renderer.mjs';
import { u as useModalStore, a as _sfc_main$1, _ as _sfc_main$1$1 } from './Footer-9Auhc8Y7.mjs';
import __nuxt_component_1 from './Icon-kqhLPqFV.mjs';
import { _ as __nuxt_component_1$1 } from './CitiesList-BJIq5-ZE.mjs';
import { _ as _sfc_main$2 } from './Contact-B5OIhScP.mjs';
import { defineComponent, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { f as useCitiesStore } from './server.mjs';

const _imports_0 = "" + buildAssetsURL("render.CMSQvD-3.png");
const _imports_1 = "" + buildAssetsURL("web1.is4B6yJx.jpg");
const _imports_2 = "" + buildAssetsURL("web2.BEJrxnQ6.jpg");
const _imports_3 = "" + buildAssetsURL("web3.BhDaOr3Q.jpg");
const _imports_4 = "" + buildAssetsURL("web4.CavjSrKO.jpg");
const _imports_5 = "" + buildAssetsURL("web5.QJI0NCjy.jpg");
const _imports_6 = "" + buildAssetsURL("web6.CzfZhqk_.jpg");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Offer",
  __ssrInlineRender: true,
  props: {
    city: String
  },
  setup(__props) {
    const modalStore = useModalStore();
    const citiesStore = useCitiesStore();
    const props = __props;
    const currentCity = computed(() => citiesStore.cities[props.city]);
    computed(() => Object.values(citiesStore.cities).map((city) => city.singular));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Header = _sfc_main$1$1;
      const _component_Icon = __nuxt_component_1;
      const _component_cities_list = __nuxt_component_1$1;
      const _component_ModalContact = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "app__container" }, _attrs))}><div class="app__main">`);
      _push(ssrRenderComponent(_component_Header, { white: "" }, null, _parent));
      _push(`<div class="section__wrapper"><div class="section__container md:!pt-48"><div class="flex flex-col md:flex-row gap-10 sm:gap-24"><div class="w-full md:w-1/2 order-2 md:order-1"><p class="text-xs tracking-widest mb-2">\u0141UKASZ-FUJARSKI / MID FULL-STACK DEV / FREELANCER</p><h1 class="text-xl md:text-5xl leading-tight md:leading-tight font-bold"> Strony internetowe ${ssrInterpolate(unref(currentCity).singular)}, ${ssrInterpolate(unref(currentCity).voivodeship)}</h1><p class="mt-6">${unref(currentCity).description}</p></div><div class="w-1/2 mx-auto order-1"><img${ssrRenderAttr("src", _imports_0)}${ssrRenderAttr("alt", `Strony internetowe ${unref(currentCity).singular}, ${unref(currentCity).voivodeship}. Wycena stron WWW - tanio i rzetelnie.`)}${ssrRenderAttr("title", `Strony internetowe ${unref(currentCity).singular}, ${unref(currentCity).voivodeship}. Wycena stron WWW - tanio i rzetelnie.`)} class="rounded-lg"></div></div><div class="mt-24"><h2 class="text-2xl md:text-4xl font-bold text-center"> Profesjonalne strony WWW ${ssrInterpolate(unref(currentCity).singular)}</h2><h3 class="text-sm sm:text-base text-center mt-4 uppercase"> Oferta, cennik programowania stron dla klient\xF3w z ${ssrInterpolate(unref(currentCity).genitive)}</h3><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-4 mt-8 md:mt-16 text-center"><div class="rounded shadow-2xl p-4 xl:p-8 py-12 flex flex-col items-center border w-full text-sm xl:text-base"><h4 class="text-xl xl:text-2xl font-bold">Strona One Page</h4><p class="mt-4"><strong>Strona One Page</strong> to idealne rozwi\u0105zanie dla os\xF3b, kt\xF3re chc\u0105 pozycjonowa\u0107 si\u0119 w internecie, ale nie maj\u0105 zbyt du\u017Cego bud\u017Cetu. </p><p class="mt-2">1 podstrona</p><p class="mt-2">Czas pracy wykonawcy do 10 godz.</p><p class="mt-2">Realizacja do 7 dni</p><p class="mt-4 text-xl"><strong>Cena:</strong> od 1000 z\u0142 </p><button class="form__button form__button--dark form__button--arrow-right mt-4 text-sm xl:text-base"> Masz pytanie? Skontaktuj\xA0si\u0119 </button></div><div class="rounded shadow-2xl p-4 xl:p-8 py-12 flex flex-col items-center border w-full lg:scale-110 bg-white text-sm xl:text-base"><h4 class="text-xl xl:text-2xl font-bold">Strona starter</h4><p class="mt-4"><strong>Strona starter</strong> to \u015Bwietne rozwi\u0105zanie dla os\xF3b, kt\xF3re chc\u0105 mie\u0107 swoj\u0105 stron\u0119 firmow\u0105 w internecie. Pozwala na zaprezentowanie swojej oferty oraz u\u0142atwia kontakt z klientem. </p><p class="mt-4">5 podstron</p><p class="mt-2">Czas pracy wykonawcy do 25 godz.</p><p class="mt-2">Realizacja do 14 dni</p><p class="mt-4 text-xl"><strong>Cena:</strong> 1500 z\u0142 </p><button class="form__button form__button--dark form__button--arrow-right mt-4 text-sm xl:text-base"> Masz pytanie? Skontaktuj\xA0si\u0119 </button></div><div class="rounded shadow-2xl p-4 xl:p-8 py-12 flex flex-col items-center border w-full md:col-span-2 lg:col-span-1 text-sm xl:text-base"><h4 class="text-xl xl:text-2xl font-bold">Sklep internetowy</h4><p class="mt-4"><strong>Sklep internetowy</strong> to idealne rozwi\u0105zanie dla os\xF3b, kt\xF3re chc\u0105 sprzedawa\u0107 swoje produkty w internecie. Sklep internetowy pozwala na sprzeda\u017C produkt\xF3w 24/7, co pozwala na zwi\u0119kszenie sprzeda\u017Cy. </p><p class="mt-2">Realizacja do 20 dni</p><p class="mt-4 text-xl"><strong>Cena:</strong> od 2000 z\u0142 </p><button class="form__button form__button--dark form__button--arrow-right mt-4 text-sm xl:text-base"> Masz pytanie? Skontaktuj\xA0si\u0119 </button></div></div><p class="mt-12 md:mt-24 text-center"> Powy\u017Csze kwoty stanowi\u0105 cen\u0119 netto. Wszystkie ceny s\u0105 cenami orientacyjnymi i mog\u0105 ulec zmianie w zale\u017Cno\u015Bci od indywidualnych potrzeb klienta. <br>W celu uzyskania dok\u0142adnej wyceny <a href="tel:+48786826806" class="font-semibold">zapraszam do kontaktu</a> klient\xF3w z miasta ${ssrInterpolate(unref(currentCity).singular)} i okolic. </p></div><div class="mt-12 md:mt-24"><h2 class="text-2xl md:text-4xl font-bold text-center"> Jak\u0105 stron\u0119 internetow\u0105 potrzebujesz? </h2><p class="mt-6 md:mt-12 text-center"> Z wykorzystaniem platformy WordPress tworz\u0119 strony internetowe lokalnych firm z ${ssrInterpolate(unref(currentCity).genitive)} i nie tylko. Jest to najpopularniejsza na \u015Bwiecie platforma do zarz\u0105dzania tre\u015Bci\u0105 stron internetowych. Korzystaj\u0105c z platformy WordPress, jestem w stanie zbudowa\u0107 r\xF3\u017Cnorodne typy stron internetowych, kt\xF3re s\u0105 responsywne. Mo\u017Ce to by\u0107 strona firmowa biznesu z ${ssrInterpolate(unref(currentCity).genitive)}, sklep online, katalog produkt\xF3w, strona e-learningnuxtowa, strona dla restauracji, system rezerwacji, prosta strona typu landing page, strona typu one page, czy strona dedykowana. <br><br>WordPress to\xA0rozwi\u0105zanie najwy\u017Cszej jako\u015Bci, kt\xF3re na pewno spe\u0142ni Twoje oczekiwania. </p><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12 text-center mt-12"><div class="border bg-white shadow-md p-6 rounded-lg">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "gg:website",
        class: "mb-4 text-gray-600",
        size: "48px"
      }, null, _parent));
      _push(`<h2 class="font-bold">Strona internetowa</h2><p class="mt-4">WordPress to platforma, kt\xF3ra cieszy si\u0119 najwi\u0119ksz\u0105 popularno\u015Bci\u0105 w\u015Br\xF3d tw\xF3rc\xF3w stron internetowych. Strona zbudowana na WordPressie oferuje prostot\u0119 edycji, a co najwa\u017Cniejsze, umo\u017Cliwia rozwijanie strony www w takt z rozwojem Twojego projektu.</p></div><div class="border bg-white shadow-md p-6 rounded-lg">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "material-symbols:business-center",
        class: "mb-4 text-gray-600",
        size: "48px"
      }, null, _parent));
      _push(`<h2 class="font-bold">Strona dla Firmy</h2><p class="mt-4">Strona dla firmy to nieod\u0142\u0105czny element ka\u017Cdego biznesu, pe\u0142ni\u0105cy rol\u0119 wirtualnej wizyt\xF3wki. Profesjonalnie zaprojektowana strona firmowa jest kluczowa dla osi\u0105gni\u0119cia sukcesu. Tworzymy nowoczesne, responsywne strony internetowe, zwracaj\u0105c szczeg\xF3ln\u0105 uwag\u0119 na detale i optymalizacj\u0119 SEO. Strona oparta na WordPressie zaspokoi wszystkie wymagania Twojej firmy.</p></div><div class="border bg-white shadow-md p-6 rounded-lg">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "ic:baseline-laptop",
        class: "mb-4 text-gray-600",
        size: "48px"
      }, null, _parent));
      _push(`<h2 class="font-bold">Strona e-learning</h2><p class="mt-4">Strona e-learningowa oparta na WordPressie umo\u017Cliwia utworzenie platformy edukacyjnej online, gdzie Twoi klienci mog\u0105 nabywa\u0107 dost\u0119p do kurs\xF3w poprzez subskrypcj\u0119 miesi\u0119czn\u0105 lub jednorazow\u0105 op\u0142at\u0119 za kurs.</p></div><div class="border bg-white shadow-md p-6 rounded-lg">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "material-symbols:restaurant",
        class: "mb-4 text-gray-600",
        size: "48px"
      }, null, _parent));
      _push(`<h2 class="font-bold">Strona dla restauracji ${ssrInterpolate(unref(currentCity).singular)}</h2><p class="mt-4">Za pomoc\u0105 WordPressa, Twoja strona restauracji mo\u017Ce sta\u0107 si\u0119 prawdziwym biznesem online. WordPress umo\u017Cliwia utworzenie systemu do zamawiania jedzenia online, idealnego dla restauracji, fast food\xF3w, pizzerii czy kawiarni. Mo\u017Cesz skonfigurowa\u0107 system zam\xF3wie\u0144 online dla restauracji, oferuj\u0105c r\xF3\u017Cne opcje dostawy.</p></div><div class="border bg-white shadow-md p-6 rounded-lg">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "material-symbols:edit-calendar",
        class: "mb-4 text-gray-600",
        size: "48px"
      }, null, _parent));
      _push(`<h2 class="font-bold">System rezerwacji</h2><p class="mt-4">Strona internetowa z funkcj\u0105 wypo\u017Cyczania produkt\xF3w, zbudowana na platformie WordPress, oferuje prostot\u0119 w zarz\u0105dzaniu i edycji, a co najwa\u017Cniejsze, umo\u017Cliwia rozw\xF3j Twojego sklepu internetowego wraz z ekspansj\u0105 Twojego biznesu. Funkcje takie jak rezerwacja miejsc, system bookingowy czy wypo\u017Cyczalnia produkt\xF3w s\u0105 \u0142atwe do implementacji..</p></div><div class="border bg-white shadow-md p-6 rounded-lg">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "material-symbols:screenshot-monitor-outline",
        class: "mb-4 text-gray-600",
        size: "48px"
      }, null, _parent));
      _push(`<h2 class="font-bold">Strona Landing page</h2><p class="mt-4">Landing page, cz\u0119sto nazywana prost\u0105 stron\u0105 docelow\u0105, to strona, na kt\xF3r\u0105 u\u017Cytkownik trafia po klikni\u0119ciu na Twoj\u0105 reklam\u0119 na Facebooku, wiadomo\u015B\u0107 e-mail, newsletter, baner reklamowy umieszczony na innej stronie lub reklam\u0119 w Google.</p></div></div>`);
      _push(ssrRenderComponent(_component_cities_list, null, null, _parent));
      _push(`<h4 class="text-2xl md:text-4xl font-bold text-center mt-12"> Przyk\u0142adowe realizacje stron internetowych </h4><p class="text-center mt-6"> Poni\u017Cej prezentuj\u0119 przyk\u0142adowe realizacje stron internetowych. Wszystkie strony internetowe firm zosta\u0142y wykonane zgodnie z wytycznymi klienta. Ka\u017Cda strona internetowa jest responsywna, co oznacza, \u017Ce dostosowuje si\u0119 do rozmiaru ekranu urz\u0105dzenia, na kt\xF3rym jest wy\u015Bwietlana. Dzi\u0119ki temu strona internetowa wy\u015Bwietla si\u0119 poprawnie na komputerach, tabletach i\xA0smartfonach. </p><div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 sm:gap-6 md:gap-12 mt-12"><a href="https://doger.pl/" target="_blank" class="shadow-xl rounded-xl overflow-hidden relative hover:bg-black transition [&amp;&gt;p]:hover:translate-y-0"><div class="h-full w-full rounded-xl overflow-hidden bg-fixed opacity-100 transition duration-300 ease-in-out hover:opacity-50"><img${ssrRenderAttr("src", _imports_1)} class="w-full h-full object-cover transition duration-300 ease-in-out hover:scale-110 relative"></div><p class="font-bold absolute drop-shadow-lg z-100 text-white bottom-4 left-0 right-0 text-center transition-transform translate-y-64"> Portal internetowy Doger </p></a><a href="https://glimren.no/" target="_blank" class="shadow-xl rounded-xl overflow-hidden relative hover:bg-black transition [&amp;&gt;p]:hover:translate-y-0"><div class="h-full w-full rounded-xl overflow-hidden bg-fixed opacity-100 transition duration-300 ease-in-out hover:opacity-50"><img${ssrRenderAttr("src", _imports_2)} class="w-full h-full object-cover transition duration-300 ease-in-out hover:scale-110 relative"></div><p class="font-bold absolute drop-shadow-lg z-100 text-white bottom-4 left-0 right-0 text-center transition-transform translate-y-64"> Firma sprz\u0105taj\u0105ca Glimren </p></a><a href="https://kancelariafinansjer.pl/" target="_blank" class="shadow-xl rounded-xl overflow-hidden relative hover:bg-black transition [&amp;&gt;p]:hover:translate-y-0"><div class="h-full w-full rounded-xl overflow-hidden bg-fixed opacity-100 transition duration-300 ease-in-out hover:opacity-50"><img${ssrRenderAttr("src", _imports_3)} class="w-full h-full object-cover transition duration-300 ease-in-out hover:scale-110 relative"></div><p class="font-bold absolute drop-shadow-lg z-100 text-white bottom-4 left-0 right-0 text-center transition-transform translate-y-64"> Kancelaria podatkowa Finansjer </p></a></div><h4 class="text-2xl md:text-4xl font-bold text-center mt-20">Projekty aplikacji webowych</h4><p class="text-center mt-12"> Projekty aplikacji webowych i portali internetowych, w kt\xF3rych bior\u0119 aktywny udzia\u0142 jako Full-stack Developer pracuj\u0105c dla firmy Tech-Studio S.C. </p><div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 sm:gap-6 md:gap-12 mt-12"><a href="https://www.ecmentarze.pl/" target="_blank" class="shadow-xl rounded-xl overflow-hidden relative hover:bg-black transition [&amp;&gt;p]:hover:translate-y-0"><div class="h-full w-full rounded-xl overflow-hidden bg-fixed opacity-100 transition duration-300 ease-in-out hover:opacity-50"><img${ssrRenderAttr("src", _imports_4)} class="w-full h-full object-cover transition duration-300 ease-in-out hover:scale-110 relative"></div><p class="font-bold absolute drop-shadow-lg z-100 text-white bottom-4 left-0 right-0 text-center transition-transform translate-y-64"> Portal eCmentarze.pl </p></a><a href="https://www.parochialis.pl/" target="_blank" class="shadow-xl rounded-lg overflow-hidden relative hover:bg-black transition [&amp;&gt;p]:hover:translate-y-0"><div class="h-full w-full rounded-xl overflow-hidden bg-fixed opacity-100 transition duration-300 ease-in-out hover:opacity-50"><img${ssrRenderAttr("src", _imports_5)} class="w-full h-full object-cover transition duration-300 ease-in-out hover:scale-110 relative"></div><p class="font-bold absolute drop-shadow-lg z-100 text-white bottom-4 left-0 right-0 text-center transition-transform translate-y-64"> Wirtualna kancelaria parafialna </p></a><a href="https://tech-studio.pl/" target="_blank" class="shadow-xl rounded-lg overflow-hidden relative hover:bg-black transition [&amp;&gt;p]:hover:translate-y-0"><div class="h-full w-full rounded-xl overflow-hidden bg-fixed opacity-100 transition duration-300 ease-in-out hover:opacity-50"><img${ssrRenderAttr("src", _imports_6)} class="w-full h-full object-cover transition duration-300 ease-in-out hover:scale-110 relative"></div><p class="font-bold absolute drop-shadow-lg z-100 text-white bottom-4 left-0 right-0 text-center transition-transform translate-y-64"> Wizyt\xF3wka firmy Tech-Studio S.C. </p></a></div></div></div></div>`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_ModalContact, {
        class: { "active": unref(modalStore).visible }
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Offer.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=Offer-BmuuxVsC.mjs.map
