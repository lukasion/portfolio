import { b as buildAssetsURL } from '../routes/renderer.mjs';
import { _ as _sfc_main$2 } from './Header-BC6E40jq.mjs';
import { _ as _sfc_main$3 } from './Contact-DOkmYp1n.mjs';
import { defineComponent, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
import { u as useModalStore, _ as _sfc_main$1 } from './Footer-BJ9TbOJ5.mjs';

const _imports_0 = "" + buildAssetsURL("render.CMSQvD-3.png");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Offer",
  __ssrInlineRender: true,
  setup(__props) {
    const modalStore = useModalStore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Header = _sfc_main$2;
      const _component_ModalContact = _sfc_main$3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "app__container" }, _attrs))}><div class="app__main">`);
      _push(ssrRenderComponent(_component_Header, { white: "" }, null, _parent));
      _push(`<div class="section__wrapper"><div class="section__container md:!pt-48"><div class="flex gap-24"><div class="w-1/2"><p class="text-xs tracking-widest mb-2">\u0141UKASZ-FUJARSKI / MID FULL-STACK DEV / FREELANCER</p><h1 class="text-xl md:text-5xl leading-tight md:leading-tight font-bold"> Strony internetowe Katowice, \u015Al\u0105sk </h1><p class="mt-6"> Zajmuj\u0119 si\u0119<strong> tworzeniem stron internetowych dla klient\xF3w z Katowic jak i ca\u0142ej Polski</strong> opartych o system zarz\u0105dzania tre\u015Bci\u0105 <strong>Wordpress</strong> (i nie tylko). Tworz\u0119 rozwi\u0105zania dla potrzeb ma\u0142ych i \u015Brednich firm, kt\xF3re chc\u0105 <strong>zaistnie\u0107 w sieci</strong>. Wszystkie strony s\u0105 responsywne, co oznacza, \u017Ce s\u0105 dostosowane do urz\u0105dze\u0144 mobilnych. <br> <br> Strony WWW tworzone przeze mnie s\u0105 <strong>zgodne z najnowszymi trendami i standardami</strong>, co pozwala na ich d\u0142ugotrwa\u0142e u\u017Cytkowanie. Wszystkie opracowywane aplikacje s\u0105 zoptymalizowane pod k\u0105tem SEO, sprawiaj\u0105c \u017Ce s\u0105 one lepiej widoczne w wynikach wyszukiwania, co przek\u0142ada si\u0119 na zwi\u0119kszenie ruchu na stronie i zwi\u0119kszenie sprzeda\u017Cy. </p></div><div class="w-1/2"><img${ssrRenderAttr("src", _imports_0)} alt="Strony internetowe Katowice, \u015Al\u0105sk" class="rounded-lg"></div></div><div class="mt-24"><h2 class="text-4xl font-bold text-center">Najta\u0144sze i najlepsze strony WWW na rynku</h2><h3 class="text-center mt-4 uppercase"> Oferta, cennik programowania stron </h3><div class="flex gap-4 mt-8 text-center"><div class="rounded shadow-2xl p-8 py-12 flex flex-col items-center border"><h4 class="text-2xl font-bold">Strona One Page</h4><p class="mt-4"><strong>Strona One Page</strong> to idealne rozwi\u0105zanie dla os\xF3b, kt\xF3re chc\u0105 pozycjonowa\u0107 si\u0119 w internecie, ale nie maj\u0105 zbyt du\u017Cego bud\u017Cetu. Strona OnePage to jednostronicowa strona internetowa, kt\xF3ra zawiera wszystkie niezb\u0119dne informacje o firmie. </p><p class="mt-4 text-xl"><strong>Cena:</strong> od 1000 z\u0142 </p><button class="form__button form__button--dark form__button--arrow-right mt-4"> Nawi\u0105\u017C wsp\xF3\u0142prac\u0119 </button></div><div class="rounded shadow-2xl p-8 py-12 flex flex-col items-center border"><h4 class="text-2xl font-bold">Sklep internetowy</h4><p class="mt-4"><strong>Sklep internetowy</strong> to idealne rozwi\u0105zanie dla os\xF3b, kt\xF3re chc\u0105 sprzedawa\u0107 swoje produkty w internecie. Sklep internetowy pozwala na sprzeda\u017C produkt\xF3w 24/7, co pozwala na zwi\u0119kszenie sprzeda\u017Cy. </p><p class="mt-4 text-xl"><strong>Cena:</strong> od 2000 z\u0142 </p><button class="form__button form__button--dark form__button--arrow-right mt-4"> Nawi\u0105\u017C wsp\xF3\u0142prac\u0119 </button></div><div class="rounded shadow-2xl p-8 py-12 flex flex-col items-center border"><h4 class="text-2xl font-bold">Strona firmowa</h4><p class="mt-4"><strong>Strona firmowa</strong> to idealne rozwi\u0105zanie dla firm, kt\xF3re chc\u0105 zaistnie\u0107 w internecie. Strona firmowa pozwala na przedstawienie oferty firmy, kontaktu z klientem oraz na zwi\u0119kszenie sprzeda\u017Cy. </p><p class="mt-4 text-xl"><strong>Cena:</strong> 800 z\u0142 </p><button class="form__button form__button--dark form__button--arrow-right mt-4"> Nawi\u0105\u017C wsp\xF3\u0142prac\u0119 </button></div></div></div></div></div>`);
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
//# sourceMappingURL=Offer-CxmuHTWU.mjs.map
