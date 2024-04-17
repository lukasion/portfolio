import { _ as _sfc_main$2 } from './Header-BllNrz6O.mjs';
import { _ as __nuxt_component_1 } from './CitiesList-B662rUAc.mjs';
import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _sfc_main$1 } from './Footer-Bi-yzRsV.mjs';
import './nuxt-link-vMilcf8Z.mjs';
import './server.mjs';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'requrl';
import 'node:fs';
import 'node:url';
import 'nodemailer';
import '@dword-design/functions/dist/find-index.js';
import '@dword-design/functions/dist/omit.js';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'dayjs';
import 'dayjs/plugin/updateLocale.js';
import 'dayjs/plugin/timezone.js';
import 'dayjs/plugin/relativeTime.js';
import 'dayjs/plugin/utc.js';
import 'tailwind-merge';
import './Icon-DvULJxuf.mjs';
import '@iconify/vue/dist/offline';
import '@iconify/vue';
import './index-yzm_4dp1.mjs';
import './_plugin-vue_export-helper-1tPrXgE0.mjs';
import './fetch-CCjfMeZS.mjs';

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Header = _sfc_main$2;
      const _component_cities_list = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "app__container" }, _attrs))}><div class="app__main">`);
      _push(ssrRenderComponent(_component_Header, { white: "" }, null, _parent));
      _push(`<div class="section__wrapper"><div class="section__container md:!pt-48">`);
      _push(ssrRenderComponent(_component_cities_list, null, null, _parent));
      _push(`</div></div>`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/strony-internetowe/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CWYMY6Lv.mjs.map
