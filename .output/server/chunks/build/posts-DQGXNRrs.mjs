import { _ as __nuxt_component_0, a as __nuxt_component_2 } from './Footer-BUsoSuo2.mjs';
import { g as __nuxt_component_1 } from './server.mjs';
import { useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import './nuxt-link-omEFdkit.mjs';
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

const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_UserNavbar = __nuxt_component_0;
  const _component_NuxtPage = __nuxt_component_1;
  const _component_UserFooter = __nuxt_component_2;
  _push(`<div${ssrRenderAttrs(_attrs)}>`);
  _push(ssrRenderComponent(_component_UserNavbar, null, null, _parent));
  _push(`<div class="container mx-auto mt-10"><div class="card shadow-md"><div class="card-body gap-0"><h1 class="text-2xl font-bold">Posts</h1>`);
  _push(ssrRenderComponent(_component_NuxtPage, null, null, _parent));
  _push(`</div></div></div>`);
  _push(ssrRenderComponent(_component_UserFooter, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/user/posts.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const posts = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { posts as default };
//# sourceMappingURL=posts-DQGXNRrs.mjs.map
