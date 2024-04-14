import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate } from 'vue/server-renderer';

const _sfc_main = {
  __name: "Contact",
  __ssrInlineRender: true,
  props: {
    name: String,
    email: String,
    phone: String,
    message: String
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "max-w-2xl px-6 py-8 mx-auto bg-white dark:bg-gray-900" }, _attrs))}><header> Be-Crafty </header><main class="mt-8"><h2 class="text-lg text-gray-700 dark:text-gray-200">Kontakt ze strony be-crafty.com</h2><p class="mt-2 leading-loose text-gray-600 dark:text-gray-300"> Ze strony internetowej be-crafty.com wys\u0142ano zapytanie o kontakt. Poni\u017Cej znajdziesz szczeg\xF3\u0142y zapytania. </p><div class="mt-8"><h3 class="text-gray-700 dark:text-gray-200">Dane kontaktowe</h3><p class="mt-2 leading-loose text-gray-600 dark:text-gray-300"><strong>Imi\u0119:</strong> ${ssrInterpolate(__props.name)}<br><strong>Adres e-mail:</strong> ${ssrInterpolate(__props.email)}<br><strong>Telefon:</strong> ${ssrInterpolate(__props.phone)}<br><strong>Wiadomo\u015B\u0107:</strong> ${ssrInterpolate(__props.message)}</p></div></main></section>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("emails/Contact.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=Contact-B_b1lq5U.mjs.map
