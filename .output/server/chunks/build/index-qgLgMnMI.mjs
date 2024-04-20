import { _ as _sfc_main$1, a as _sfc_main$2 } from './Footer-9Auhc8Y7.mjs';
import { _ as __nuxt_component_1 } from './Short-CoJfDXx5.mjs';
import { a as useI18n } from './server.mjs';
import { useSSRContext, defineComponent, withAsyncContext, unref } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { u as useArticlesStore } from './articles-D5VY78IW.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import './nuxt-link-DKVwpM5a.mjs';
import './Icon-kqhLPqFV.mjs';
import '@iconify/vue/dist/offline';
import '@iconify/vue';
import './index-yzm_4dp1.mjs';
import 'vue-router';
import './fetch-CCjfMeZS.mjs';
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
import 'unhead';
import '@unhead/shared';
import 'dayjs';
import 'dayjs/plugin/updateLocale.js';
import 'dayjs/plugin/timezone.js';
import 'dayjs/plugin/relativeTime.js';
import 'dayjs/plugin/utc.js';
import 'tailwind-merge';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const i18n = useI18n();
    const articlesStore = useArticlesStore();
    [__temp, __restore] = withAsyncContext(() => articlesStore.fetchData({
      limit: 4,
      lang: i18n.locale.value
    })), await __temp, __restore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Header = _sfc_main$1;
      const _component_article_short = __nuxt_component_1;
      const _component_Footer = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-f9e05448>`);
      _push(ssrRenderComponent(_component_Header, { white: "" }, null, _parent));
      _push(`<div class="container mx-auto pt-32" data-v-f9e05448><h1 class="text-2xl font-bold px-4" data-v-f9e05448>${ssrInterpolate(unref(i18n).t("blog"))}</h1><p class="text-xl mt-4 px-4" data-v-f9e05448>${ssrInterpolate(unref(i18n).t("blog_subtitle"))}</p><div class="blog__container" data-v-f9e05448><div class="blog__articles" data-v-f9e05448><h3 class="text-2xl mb-4" data-v-f9e05448>${ssrInterpolate(unref(i18n).t("featured_article"))}</h3>`);
      if (unref(articlesStore).articles.length > 0) {
        _push(ssrRenderComponent(_component_article_short, {
          article: unref(articlesStore).articles[0]
        }, null, _parent));
      } else {
        _push(`<p data-v-f9e05448>${ssrInterpolate(unref(i18n).t("no_articles_found"))}</p>`);
      }
      _push(`</div><div class="blog__side" data-v-f9e05448><h3 class="text-2xl mb-4" data-v-f9e05448>${ssrInterpolate(unref(i18n).t("recent_articles"))}</h3><div class="flex flex-col gap-8" data-v-f9e05448>`);
      if (unref(articlesStore).articles.length === 0) {
        _push(`<p data-v-f9e05448>${ssrInterpolate(unref(i18n).t("no_articles_found"))}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(unref(articlesStore).articles, (article) => {
        _push(ssrRenderComponent(_component_article_short, {
          article,
          "hide-description": "",
          column: ""
        }, null, _parent));
      });
      _push(`<!--]--></div></div></div></div>`);
      _push(ssrRenderComponent(_component_Footer, { class: "mt-24" }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/blog/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f9e05448"]]);

export { index as default };
//# sourceMappingURL=index-qgLgMnMI.mjs.map
