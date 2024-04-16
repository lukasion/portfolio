import { _ as _sfc_main$1 } from './Header-Bny6cn43.mjs';
import { _ as _sfc_main$2 } from './Footer-Bi-yzRsV.mjs';
import { a as useRoute, b as useRouter, u as useHead } from './server.mjs';
import { useSSRContext, defineComponent, withAsyncContext, unref } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { u as useArticlesStore } from './articles-DcAXzpYz.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import './nuxt-link-vMilcf8Z.mjs';
import './Icon-DvULJxuf.mjs';
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
  __name: "[slug]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const articlesStore = useArticlesStore();
    const route = useRoute();
    const router = useRouter();
    if (typeof route.params.slug === "string") {
      [__temp, __restore] = withAsyncContext(() => articlesStore.fetchBySlug(route.params.slug)), await __temp, __restore();
    }
    if (!articlesStore.article) {
      router.push("/blog");
    }
    useHead({
      title: `${articlesStore.article ? articlesStore.article.title : "Page not found"} | Be Crafty`,
      meta: {
        description: articlesStore.article ? articlesStore.article.description : "Article not found. Redirecting."
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Header = _sfc_main$1;
      const _component_Footer = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-6d91c836>`);
      _push(ssrRenderComponent(_component_Header, { white: "" }, null, _parent));
      _push(`<div class="container mx-auto pt-20" data-v-6d91c836><div class="article" data-v-6d91c836><div class="article__image" data-v-6d91c836><img src="https://d3mm2s9r15iqcv.cloudfront.net/en/wp-content/uploads/2024/01/best-online-learning-platforms.jpg" alt="Article image" data-v-6d91c836></div><div class="article__content" data-v-6d91c836><h4 class="uppercase text-sm tracking-wider text-center" data-v-6d91c836>${ssrInterpolate(unref(articlesStore).article.category ? unref(articlesStore).article.category.name : "Not assigned")}</h4><h1 class="article__title" data-v-6d91c836>${ssrInterpolate(unref(articlesStore).article.title)}</h1>`);
      if (unref(articlesStore).article) {
        _push(`<div data-v-6d91c836>${unref(articlesStore).article.content}</div>`);
      } else {
        _push(`<p data-v-6d91c836> Article not found. Redirecting. </p>`);
      }
      _push(`</div></div></div>`);
      _push(ssrRenderComponent(_component_Footer, { class: "mt-24" }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/blog/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _slug_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6d91c836"]]);

export { _slug_ as default };
//# sourceMappingURL=_slug_-psJRwe8E.mjs.map
