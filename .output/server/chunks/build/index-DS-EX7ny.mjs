import { _ as _sfc_main$1 } from './Header-Bny6cn43.mjs';
import { _ as __nuxt_component_1 } from './CitiesList-EjPXi3KE.mjs';
import { useSSRContext, mergeProps } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
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

const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_Header = _sfc_main$1;
  const _component_cities_list = __nuxt_component_1;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "app__container" }, _attrs))}><div class="app__main">`);
  _push(ssrRenderComponent(_component_Header, { white: "" }, null, _parent));
  _push(`<div class="section__wrapper"><div class="section__container md:!pt-48">`);
  _push(ssrRenderComponent(_component_cities_list, null, null, _parent));
  _push(`</div></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/strony-internetowe/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { index as default };
//# sourceMappingURL=index-DS-EX7ny.mjs.map
