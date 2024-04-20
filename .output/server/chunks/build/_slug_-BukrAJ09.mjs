import { _ as _sfc_main$1$1, a as _sfc_main$2 } from './Footer-9Auhc8Y7.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-DKVwpM5a.mjs';
import { b as useRoute, c as useRouter, u as useHead, a as useI18n } from './server.mjs';
import { useSSRContext, defineComponent, withAsyncContext, unref, withCtx, createTextVNode, toDisplayString, createVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { u as useArticlesStore } from './articles-D5VY78IW.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
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

const _sfc_main$1 = {
  __name: "Others",
  __ssrInlineRender: true,
  props: {
    withoutArticleId: {
      type: Number,
      default: null
    },
    categoryId: {
      type: Number,
      default: null
    }
  },
  async setup(__props) {
    let __temp, __restore;
    const props = __props;
    const i18n = useI18n();
    const articleStore = useArticlesStore();
    [__temp, __restore] = withAsyncContext(() => articleStore.fetchData({
      limit: 3,
      lang: i18n.locale.value,
      withoutArticleId: props.withoutArticleId,
      categoryId: props.categoryId
    })), await __temp, __restore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link = __nuxt_component_0;
      _push(`<!--[--><h3 class="px-4 text-2xl mt-24" data-v-7bda4fc2>Inne artyku\u0142y z tej kategorii</h3><div class="blog__container blog__container--grid" data-v-7bda4fc2>`);
      if (unref(articleStore).articles.length === 0) {
        _push(`<p data-v-7bda4fc2>Brak innych artyku\u0142\xF3w w tej kategorii.</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(unref(articleStore).articles, (article) => {
        _push(ssrRenderComponent(_component_nuxt_link, {
          to: `/blog/${article.friendly_url}`,
          class: "blog__box"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<h4 class="uppercase text-xs tracking-wider" data-v-7bda4fc2${_scopeId}>${ssrInterpolate(article.category ? article.category.name : _ctx.$t("not_assigned"))}</h4><h3 class="text-md font-bold" data-v-7bda4fc2${_scopeId}>${ssrInterpolate(article.title)}</h3><p class="text-xs mt-4" data-v-7bda4fc2${_scopeId}>${ssrInterpolate(article.content.replace(/<[^>]+>/g, "").slice(0, 150) + "...")}</p><p class="mt-4 text-xs" data-v-7bda4fc2${_scopeId}>${ssrInterpolate(_ctx.$dayjs(article.datetime).fromNow())} - ${ssrInterpolate(article.minutes_read)} ${ssrInterpolate(_ctx.$t("minutes_read"))}</p>`);
            } else {
              return [
                createVNode("h4", { class: "uppercase text-xs tracking-wider" }, toDisplayString(article.category ? article.category.name : _ctx.$t("not_assigned")), 1),
                createVNode("h3", { class: "text-md font-bold" }, toDisplayString(article.title), 1),
                createVNode("p", { class: "text-xs mt-4" }, toDisplayString(article.content.replace(/<[^>]+>/g, "").slice(0, 150) + "..."), 1),
                createVNode("p", { class: "mt-4 text-xs" }, toDisplayString(_ctx.$dayjs(article.datetime).fromNow()) + " - " + toDisplayString(article.minutes_read) + " " + toDisplayString(_ctx.$t("minutes_read")), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div><!--]-->`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/article/Others.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-7bda4fc2"]]);
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
      const _component_Header = _sfc_main$1$1;
      const _component_nuxt_link = __nuxt_component_0;
      const _component_article_others = __nuxt_component_2;
      const _component_Footer = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-11598f1a>`);
      _push(ssrRenderComponent(_component_Header, { white: "" }, null, _parent));
      _push(`<div class="container mx-auto pt-20" data-v-11598f1a><div class="article mt-12" data-v-11598f1a><div class="article__image" data-v-11598f1a><img src="https://d3mm2s9r15iqcv.cloudfront.net/en/wp-content/uploads/2024/01/best-online-learning-platforms.jpg" alt="Article image" data-v-11598f1a></div>`);
      if (unref(articlesStore).article) {
        _push(`<div class="article__content" data-v-11598f1a><p class="text-center" data-v-11598f1a>`);
        _push(ssrRenderComponent(_component_nuxt_link, {
          to: `/category/${unref(articlesStore).article.category_id}`,
          class: "uppercase text-sm tracking-wider"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(articlesStore).article.category ? unref(articlesStore).article.category.name : _ctx.$t("not_assigned"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(articlesStore).article.category ? unref(articlesStore).article.category.name : _ctx.$t("not_assigned")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</p><h1 class="article__title" data-v-11598f1a>${ssrInterpolate(unref(articlesStore).article.title)}</h1><div data-v-11598f1a>${unref(articlesStore).article.content}</div></div>`);
      } else {
        _push(`<p data-v-11598f1a> Article not found. Redirecting. </p>`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(_component_article_others, {
        "without-article-id": unref(articlesStore).article.id,
        "category-id": unref(articlesStore).article.category_id
      }, null, _parent));
      _push(`</div>`);
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
const _slug_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-11598f1a"]]);

export { _slug_ as default };
//# sourceMappingURL=_slug_-BukrAJ09.mjs.map
