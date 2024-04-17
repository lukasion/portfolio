import { _ as _sfc_main$1 } from './Offer-B1lzkfmK.mjs';
import { a as useRoute } from './server.mjs';
import { defineComponent, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'requrl';
import 'node:fs';
import 'node:url';
import 'redirect-ssl';
import 'nodemailer';
import '@dword-design/functions/dist/find-index.js';
import '@dword-design/functions/dist/omit.js';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import './Header-BllNrz6O.mjs';
import './nuxt-link-vMilcf8Z.mjs';
import './Icon-DvULJxuf.mjs';
import '@iconify/vue/dist/offline';
import '@iconify/vue';
import './index-yzm_4dp1.mjs';
import './_plugin-vue_export-helper-1tPrXgE0.mjs';
import 'vue-router';
import './CitiesList-B662rUAc.mjs';
import './Contact-2dH0JRd2.mjs';
import './Footer-Bi-yzRsV.mjs';
import './fetch-CCjfMeZS.mjs';
import 'dayjs';
import 'dayjs/plugin/updateLocale.js';
import 'dayjs/plugin/timezone.js';
import 'dayjs/plugin/relativeTime.js';
import 'dayjs/plugin/utc.js';
import 'tailwind-merge';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[slug]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Offer = _sfc_main$1;
      _push(ssrRenderComponent(_component_Offer, mergeProps({
        city: unref(route).params.slug
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/strony-internetowe/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_slug_-Cig4jXgo.mjs.map
