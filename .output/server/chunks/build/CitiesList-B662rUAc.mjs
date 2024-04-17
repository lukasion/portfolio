import { _ as __nuxt_component_0 } from './nuxt-link-vMilcf8Z.mjs';
import { useSSRContext, unref, withCtx, createTextVNode, toDisplayString } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { f as useCitiesStore } from './server.mjs';

const _sfc_main = {
  __name: "CitiesList",
  __ssrInlineRender: true,
  setup(__props) {
    const citiesStore = useCitiesStore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)}><h3 class="text-2xl md:text-4xl mt-12 font-bold text-center"> Strony internetowe dla klient\xF3w z ca\u0142ej Polski </h3><p class="mt-8 text-center"> \u015Awiadcz\u0119 us\u0142ugi tworzenia stron internetowych dla firm oraz os\xF3b prywatnych z ca\u0142ej Polski. <br> Sprawd\u017A ofert\u0119 tworzenia stron WWW dla klient\xF3w z innych miast: </p><div class="flex flex-wrap gap-2 mt-8 justify-center"><!--[-->`);
      ssrRenderList(unref(citiesStore).cities, (city, key) => {
        _push(ssrRenderComponent(_component_nuxt_link, {
          class: "hover:bg-slate-100 border px-2 md:px-4 py-1 rounded-lg text-xs sm:text-base",
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
      });
      _push(`<!--]--></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CitiesList.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = _sfc_main;

export { __nuxt_component_1 as _ };
//# sourceMappingURL=CitiesList-B662rUAc.mjs.map
