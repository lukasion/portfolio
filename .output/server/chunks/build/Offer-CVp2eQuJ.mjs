import { b as buildAssetsURL } from '../routes/renderer.mjs';
import { _ as _sfc_main$2 } from './Header-QtcQOg7z.mjs';
import __nuxt_component_1 from './Icon-CIx_58DH.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-omEFdkit.mjs';
import { _ as _sfc_main$3 } from './Contact-BJAuTtrO.mjs';
import { u as useHead } from './server.mjs';
import { defineComponent, ref, computed, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList } from 'vue/server-renderer';
import { u as useModalStore, _ as _sfc_main$1 } from './Footer-CjAI8AQK.mjs';

const _imports_0 = "" + buildAssetsURL("render.CMSQvD-3.png");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Offer",
  __ssrInlineRender: true,
  props: {
    city: String
  },
  setup(__props) {
    useHead({
      title: "Tworzenie stron internetowych Katowice | Be Crafty",
      meta: {
        description: "test"
      }
    });
    const modalStore = useModalStore();
    const props = __props;
    const cities = ref({
      "katowice": {
        singular: "Katowice",
        plural: "Katowicach",
        voivodeship: "\u015Al\u0105sk"
      },
      "warszawa": {
        singular: "Warszawa",
        plural: "Warszawie",
        voivodeship: "Mazowieckie"
      },
      "krakow": {
        singular: "Krak\xF3w",
        plural: "Krakowie",
        voivodeship: "Ma\u0142opolskie"
      },
      "poznan": {
        singular: "Pozna\u0144",
        plural: "Poznaniu",
        voivodeship: "Wielkopolskie"
      },
      "gdansk": {
        singular: "Gda\u0144sk",
        plural: "Gda\u0144sku",
        voivodeship: "Pomorskie"
      },
      "wroclaw": {
        singular: "Wroc\u0142aw",
        plural: "Wroc\u0142awiu",
        voivodeship: "Dolno\u015Bl\u0105skie"
      },
      "bydgoszcz": {
        singular: "Bydgoszcz",
        plural: "Bydgoszczy",
        voivodeship: "Kujawsko-Pomorskie"
      },
      "gdynia": {
        singular: "Gdynia",
        plural: "Gdyni",
        voivodeship: "Pomorskie"
      },
      "kielce": {
        singular: "Kielce",
        plural: "Kielcach",
        voivodeship: "\u015Awi\u0119tokrzyskie"
      },
      "opole": {
        singular: "Opole",
        plural: "Opolu",
        voivodeship: "Opolskie"
      },
      "radom": {
        singular: "Radom",
        plural: "Radomiu",
        voivodeship: "Mazowieckie"
      },
      "rzeszow": {
        singular: "Rzesz\xF3w",
        plural: "Rzeszowie",
        voivodeship: "Podkarpackie"
      },
      "szczecin": {
        singular: "Szczecin",
        plural: "Szczecinie",
        voivodeship: "Zachodniopomorskie"
      },
      "torun": {
        singular: "Toru\u0144",
        plural: "Toruniu",
        voivodeship: "Kujawsko-Pomorskie"
      },
      "lublin": {
        singular: "Lublin",
        plural: "Lublinie",
        voivodeship: "Lubelskie"
      },
      "olsztyn": {
        singular: "Olsztyn",
        plural: "Olsztynie",
        voivodeship: "Warmi\u0144sko-Mazurskie"
      },
      "zielona-gora": {
        singular: "Zielona G\xF3ra",
        plural: "Zielonej G\xF3rze",
        voivodeship: "Lubuskie"
      },
      "bialystok": {
        singular: "Bia\u0142ystok",
        plural: "Bia\u0142ymstoku",
        voivodeship: "Podlaskie"
      },
      "czestochowa": {
        singular: "Cz\u0119stochowa",
        plural: "Cz\u0119stochowie",
        voivodeship: "\u015Al\u0105skie"
      },
      "gorzow-wielkopolski": {
        singular: "Gorz\xF3w Wielkopolski",
        plural: "Gorzowie Wielkopolskim",
        voivodeship: "Lubuskie"
      },
      "kalisz": {
        singular: "Kalisz",
        plural: "Kaliszu",
        voivodeship: "Wielkopolskie"
      }
    });
    const currentCity = computed(() => cities.value[props.city]);
    computed(() => Object.values(cities.value).map((city) => city.singular));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Header = _sfc_main$2;
      const _component_Icon = __nuxt_component_1;
      const _component_nuxt_link = __nuxt_component_0;
      const _component_ModalContact = _sfc_main$3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "app__container" }, _attrs))}><div class="app__main">`);
      _push(ssrRenderComponent(_component_Header, { white: "" }, null, _parent));
      _push(`<div class="section__wrapper"><div class="section__container md:!pt-48"><div class="flex gap-24"><div class="w-1/2"><p class="text-xs tracking-widest mb-2">\u0141UKASZ-FUJARSKI / MID FULL-STACK DEV / FREELANCER</p><h1 class="text-xl md:text-5xl leading-tight md:leading-tight font-bold"> Strony internetowe ${ssrInterpolate(unref(currentCity).singular)}, ${ssrInterpolate(unref(currentCity).voivodeship)}</h1><p class="mt-6"> Zajmuj\u0119 si\u0119<strong> tworzeniem stron internetowych dla klient\xF3w z Katowic jak i ca\u0142ej Polski</strong> opartych o system zarz\u0105dzania tre\u015Bci\u0105 <strong>Wordpress</strong> (i nie tylko). Tworz\u0119 rozwi\u0105zania dla potrzeb ma\u0142ych i \u015Brednich firm, kt\xF3re chc\u0105 <strong>zaistnie\u0107 w sieci</strong>. Wszystkie strony s\u0105 responsywne, co oznacza, \u017Ce s\u0105 dostosowane do urz\u0105dze\u0144 mobilnych. <br> <br> Strony WWW tworzone przeze mnie s\u0105 <strong>zgodne z najnowszymi trendami i standardami</strong>, co pozwala na ich d\u0142ugotrwa\u0142e u\u017Cytkowanie. Wszystkie opracowywane aplikacje s\u0105 zoptymalizowane pod k\u0105tem SEO, sprawiaj\u0105c \u017Ce s\u0105 one lepiej widoczne w wynikach wyszukiwania, co przek\u0142ada si\u0119 na zwi\u0119kszenie ruchu na stronie i zwi\u0119kszenie sprzeda\u017Cy. </p></div><div class="w-1/2"><img${ssrRenderAttr("src", _imports_0)} alt="Strony internetowe Katowice, \u015Al\u0105sk" class="rounded-lg"></div></div><div class="mt-24"><h2 class="text-4xl font-bold text-center">Najta\u0144sze i najlepsze strony WWW na rynku</h2><h3 class="text-center mt-4 uppercase"> Oferta, cennik programowania stron </h3><div class="flex flex-col md:flex-row gap-4 mt-8 text-center"><div class="rounded shadow-2xl p-8 py-12 flex flex-col items-center border w-full md:w-1/3"><h4 class="text-2xl font-bold">Strona One Page</h4><p class="mt-4"><strong>Strona One Page</strong> to idealne rozwi\u0105zanie dla os\xF3b, kt\xF3re chc\u0105 pozycjonowa\u0107 si\u0119 w internecie, ale nie maj\u0105 zbyt du\u017Cego bud\u017Cetu. </p><p class="mt-2">1 podstrona</p><p class="mt-2">Czas pracy wykonawcy do 10 godz.</p><p class="mt-2">Realizacja do 7 dni</p><p class="mt-4 text-xl"><strong>Cena:</strong> od 1000 z\u0142 </p><button class="form__button form__button--dark form__button--arrow-right mt-4"> Nawi\u0105\u017C wsp\xF3\u0142prac\u0119 </button></div><div class="rounded shadow-2xl p-8 py-12 flex flex-col items-center border w-full md:w-1/3"><h4 class="text-2xl font-bold">Strona starter</h4><p class="mt-4"><strong>Strona starter</strong> to \u015Bwietne rozwi\u0105zanie dla os\xF3b, kt\xF3re chc\u0105 mie\u0107 swoj\u0105 stron\u0119 firmow\u0105 w internecie. Pozwala na zaprezentowanie swojej oferty oraz u\u0142atwia kontakt z klientem. </p><p class="mt-4">5 podstron</p><p class="mt-2">Czas pracy wykonawcy do 25 godz.</p><p class="mt-2">Realizacja do 14 dni</p><p class="mt-4 text-xl"><strong>Cena:</strong> 1500 z\u0142 </p><button class="form__button form__button--dark form__button--arrow-right mt-4"> Nawi\u0105\u017C wsp\xF3\u0142prac\u0119 </button></div><div class="rounded shadow-2xl p-8 py-12 flex flex-col items-center border w-full md:w-1/3"><h4 class="text-2xl font-bold">Sklep internetowy</h4><p class="mt-4"><strong>Sklep internetowy</strong> to idealne rozwi\u0105zanie dla os\xF3b, kt\xF3re chc\u0105 sprzedawa\u0107 swoje produkty w internecie. Sklep internetowy pozwala na sprzeda\u017C produkt\xF3w 24/7, co pozwala na zwi\u0119kszenie sprzeda\u017Cy. </p><p class="mt-2">Realizacja do 20 dni</p><p class="mt-4 text-xl"><strong>Cena:</strong> od 2000 z\u0142 </p><button class="form__button form__button--dark form__button--arrow-right mt-4"> Nawi\u0105\u017C wsp\xF3\u0142prac\u0119 </button></div></div><p class="mt-12 text-center"> Powy\u017Csze kwoty stanowi\u0105 cen\u0119 netto. Wszystkie ceny s\u0105 cenami orientacyjnymi i mog\u0105 ulec zmianie w zale\u017Cno\u015Bci od indywidualnych potrzeb klienta. <br>W celu uzyskania dok\u0142adnej wyceny <a href="tel:+48786826806" class="font-semibold">zapraszam do kontaktu</a>. </p></div><div class="mt-24"><h2 class="text-4xl font-bold text-center"> Jak\u0105 stron\u0119 internetow\u0105 potrzebujesz? </h2><p class="mt-12 text-center"> Tworz\u0119 strony internetowe firm z wykorzystaniem platformyWordPress. Jest to najpopularniejsz\u0105 na \u015Bwiecie platform\u0119 do zarz\u0105dzania tre\u015Bci\u0105 stron. Korzystaj\u0105c z platformy WordPress, jestem w stanie zbudowa\u0107 r\xF3\u017Cnorodne typy stron internetowych, kt\xF3re s\u0105 responsywne. Mo\u017Ce to by\u0107 strona firmowa, sklep online, katalog produkt\xF3w, strona e-learningowa, strona dla restauracji, system rezerwacji, prosta strona typu landing page, strona typu one page, czy strona dedykowana. <br><br>WordPress to\xA0rozwi\u0105zanie najwy\u017Cszej jako\u015Bci, kt\xF3re na pewno spe\u0142ni Twoje oczekiwania. </p><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 text-center mt-12"><div class="border bg-white shadow-md p-6 rounded-lg mb-6">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "gg:website",
        class: "mb-4 text-gray-600",
        size: "48px"
      }, null, _parent));
      _push(`<h2 class="font-bold">Strona internetowa</h2><p class="mt-4">WordPress to platforma, kt\xF3ra cieszy si\u0119 najwi\u0119ksz\u0105 popularno\u015Bci\u0105 w\u015Br\xF3d tw\xF3rc\xF3w stron internetowych. Strona zbudowana na WordPressie oferuje prostot\u0119 edycji, a co najwa\u017Cniejsze, umo\u017Cliwia rozwijanie strony www w takt z rozwojem Twojego projektu.</p></div><div class="border bg-white shadow-md p-6 rounded-lg mb-6">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "material-symbols:business-center",
        class: "mb-4 text-gray-600",
        size: "48px"
      }, null, _parent));
      _push(`<h2 class="font-bold">Strona dla Firmy</h2><p class="mt-4">Strona dla firmy to nieod\u0142\u0105czny element ka\u017Cdego biznesu, pe\u0142ni\u0105cy rol\u0119 wirtualnej wizyt\xF3wki. Profesjonalnie zaprojektowana strona firmowa jest kluczowa dla osi\u0105gni\u0119cia sukcesu. Tworzymy nowoczesne, responsywne strony internetowe, zwracaj\u0105c szczeg\xF3ln\u0105 uwag\u0119 na detale i optymalizacj\u0119 SEO. Strona oparta na WordPressie zaspokoi wszystkie wymagania Twojej firmy.</p></div><div class="border bg-white shadow-md p-6 rounded-lg mb-6">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "ic:baseline-laptop",
        class: "mb-4 text-gray-600",
        size: "48px"
      }, null, _parent));
      _push(`<h2 class="font-bold">Strona e-learning</h2><p class="mt-4">Strona e-learningowa oparta na WordPressie umo\u017Cliwia utworzenie platformy edukacyjnej online, gdzie Twoi klienci mog\u0105 nabywa\u0107 dost\u0119p do kurs\xF3w poprzez subskrypcj\u0119 miesi\u0119czn\u0105 lub jednorazow\u0105 op\u0142at\u0119 za kurs.</p></div><div class="border bg-white shadow-md p-6 rounded-lg mb-6">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "material-symbols:restaurant",
        class: "mb-4 text-gray-600",
        size: "48px"
      }, null, _parent));
      _push(`<h2 class="font-bold">Strona dla restauracji</h2><p class="mt-4">Za pomoc\u0105 WordPressa, Twoja strona restauracji mo\u017Ce sta\u0107 si\u0119 prawdziwym biznesem online. WordPress umo\u017Cliwia utworzenie systemu do zamawiania jedzenia online, idealnego dla restauracji, fast food\xF3w, pizzerii czy kawiarni. Mo\u017Cesz skonfigurowa\u0107 system zam\xF3wie\u0144 online dla restauracji, oferuj\u0105c r\xF3\u017Cne opcje dostawy.</p></div><div class="border bg-white shadow-md p-6 rounded-lg mb-6">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "material-symbols:edit-calendar",
        class: "mb-4 text-gray-600",
        size: "48px"
      }, null, _parent));
      _push(`<h2 class="font-bold">System rezerwacji</h2><p class="mt-4">Strona internetowa z funkcj\u0105 wypo\u017Cyczania produkt\xF3w, zbudowana na platformie WordPress, oferuje prostot\u0119 w zarz\u0105dzaniu i edycji, a co najwa\u017Cniejsze, umo\u017Cliwia rozw\xF3j Twojego sklepu internetowego wraz z ekspansj\u0105 Twojego biznesu. Funkcje takie jak rezerwacja miejsc, system bookingowy czy wypo\u017Cyczalnia produkt\xF3w s\u0105 \u0142atwe do implementacji..</p></div><div class="border bg-white shadow-md p-6 rounded-lg mb-6">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "material-symbols:screenshot-monitor-outline",
        class: "mb-4 text-gray-600",
        size: "48px"
      }, null, _parent));
      _push(`<h2 class="font-bold">Strona Landing page</h2><p class="mt-4">Landing page, cz\u0119sto nazywana prost\u0105 stron\u0105 docelow\u0105, to strona, na kt\xF3r\u0105 u\u017Cytkownik trafia po klikni\u0119ciu na Twoj\u0105 reklam\u0119 na Facebooku, wiadomo\u015B\u0107 e-mail, newsletter, baner reklamowy umieszczony na innej stronie lub reklam\u0119 w Google.</p></div></div><h3 class="text-4xl mt-12 font-bold text-center">Strony internetowe dla klient\xF3w z ca\u0142ej Polski</h3><p class="mt-8 text-center"> \u015Awiadcz\u0119 us\u0142ugi tworzenia stron internetowych dla firm oraz os\xF3b prywatnych z ca\u0142ej Polski. <br> Sprawd\u017A ofert\u0119 tworzenia stron WWW dla klient\xF3w z innych miast: </p><div class="flex flex-wrap gap-2 mt-8 justify-center"><!--[-->`);
      ssrRenderList(unref(cities), (city, key) => {
        _push(`<span class="hover:bg-slate-100 border px-4 py-1 rounded-lg">`);
        _push(ssrRenderComponent(_component_nuxt_link, {
          to: "/strony-internetowe/" + key
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Strony internetowe ${ssrInterpolate(city.singular)}`);
            } else {
              return [
                createTextVNode(" Strony internetowe " + toDisplayString(city.singular), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</span>`);
      });
      _push(`<!--]--></div></div></div></div>`);
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
//# sourceMappingURL=Offer-CVp2eQuJ.mjs.map
