import { _ as _sfc_main$2 } from './Header-Dxs_331I.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-omEFdkit.mjs';
import { useSSRContext, defineComponent, withAsyncContext, unref, computed, mergeProps, withCtx, createVNode, toDisplayString, openBlock, createBlock, createCommentVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import { u as useArticlesStore } from './articles-QR1-FAJY.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import './Icon-B2Tgb3Kq.mjs';
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
import '@iconify/vue/dist/offline';
import '@iconify/vue';
import './index-yzm_4dp1.mjs';
import './fetch-trIPN45j.mjs';

const _sfc_main$1 = {
  __name: "Short",
  __ssrInlineRender: true,
  props: {
    hideDescription: {
      type: Boolean,
      default: false
    },
    column: {
      type: Boolean,
      default: false
    },
    article: {
      type: Object,
      default: null
    }
  },
  setup(__props) {
    const props = __props;
    const strippedContent = computed(() => props.article.content.replace(/<[^>]+>/g, ""));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["flex", { "flex-col": !__props.column, "gap-6": __props.column }]
      }, _attrs))}><div class="${ssrRenderClass([{ "w-48": __props.column, "h-32": __props.column }, "mb-6"])}"><img alt="Article image" class="w-full h-full object-cover" src="https://d3mm2s9r15iqcv.cloudfront.net/en/wp-content/uploads/2024/01/best-online-learning-platforms.jpg"></div>`);
      _push(ssrRenderComponent(_component_nuxt_link, {
        class: "flex-1",
        to: `/blog/${__props.article.friendly_url}`
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h4 class="uppercase text-sm tracking-wider"${_scopeId}>${ssrInterpolate(__props.article.category ? __props.article.category.name : "Not assigned")}</h4><h2 class="text-2xl font-bold"${_scopeId}>${ssrInterpolate(__props.article.title)}</h2><p class="mt-4"${_scopeId}>${ssrInterpolate(_ctx.$dayjs(__props.article.datetime).fromNow())} - ${ssrInterpolate(__props.article.minutes_read)} minutes read</p>`);
            if (!__props.hideDescription) {
              _push2(`<p class="mt-3"${_scopeId}>${ssrInterpolate(unref(strippedContent).slice(0, 250) + "...")}</p>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("h4", { class: "uppercase text-sm tracking-wider" }, toDisplayString(__props.article.category ? __props.article.category.name : "Not assigned"), 1),
              createVNode("h2", { class: "text-2xl font-bold" }, toDisplayString(__props.article.title), 1),
              createVNode("p", { class: "mt-4" }, toDisplayString(_ctx.$dayjs(__props.article.datetime).fromNow()) + " - " + toDisplayString(__props.article.minutes_read) + " minutes read", 1),
              !__props.hideDescription ? (openBlock(), createBlock("p", {
                key: 0,
                class: "mt-3"
              }, toDisplayString(unref(strippedContent).slice(0, 250) + "..."), 1)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/article/Short.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = _sfc_main$1;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const articlesStore = useArticlesStore();
    [__temp, __restore] = withAsyncContext(() => articlesStore.fetchData({
      limit: 4
    })), await __temp, __restore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Header = _sfc_main$2;
      const _component_article_short = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-8d5caae7>`);
      _push(ssrRenderComponent(_component_Header, { white: "" }, null, _parent));
      _push(`<div class="container mx-auto pt-32" data-v-8d5caae7><h1 class="text-2xl font-bold" data-v-8d5caae7>Be Crafty - About web</h1><p class="text-xl mt-4" data-v-8d5caae7> Start being crafty today. </p><div class="blog__container" data-v-8d5caae7><div class="blog__articles" data-v-8d5caae7><h3 class="text-2xl mb-4" data-v-8d5caae7>Featured article</h3>`);
      _push(ssrRenderComponent(_component_article_short, {
        article: unref(articlesStore).articles[0]
      }, null, _parent));
      _push(`</div><div class="blog__side" data-v-8d5caae7><h3 class="text-2xl mb-4" data-v-8d5caae7>Recent articles</h3><div class="flex flex-col gap-8" data-v-8d5caae7><!--[-->`);
      ssrRenderList(unref(articlesStore).articles, (article) => {
        _push(ssrRenderComponent(_component_article_short, {
          article,
          "hide-description": "",
          column: ""
        }, null, _parent));
      });
      _push(`<!--]--></div></div></div><div class="blog__container blog__container--column" data-v-8d5caae7><h4 class="text-2xl" data-v-8d5caae7>Not sure where to start?</h4><div class="flex gap-2 mb-12" data-v-8d5caae7><div class="blog__box" data-v-8d5caae7><h4 class="uppercase text-sm tracking-wider" data-v-8d5caae7>Category</h4><h2 class="text-2xl font-bold" data-v-8d5caae7>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, minima!</h2><p class="mt-4" data-v-8d5caae7>January 31, 2024 - 9 minutes read</p></div><div class="blog__box" data-v-8d5caae7><h4 class="uppercase text-sm tracking-wider" data-v-8d5caae7>Category</h4><h2 class="text-2xl font-bold" data-v-8d5caae7>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, minima!</h2><p class="mt-4" data-v-8d5caae7>January 31, 2024 - 9 minutes read</p></div><div class="blog__box" data-v-8d5caae7><h4 class="uppercase text-sm tracking-wider" data-v-8d5caae7>Category</h4><h2 class="text-2xl font-bold" data-v-8d5caae7>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, minima!</h2><p class="mt-4" data-v-8d5caae7>January 31, 2024 - 9 minutes read</p></div><div class="blog__box" data-v-8d5caae7><h4 class="uppercase text-sm tracking-wider" data-v-8d5caae7>Category</h4><h2 class="text-2xl font-bold" data-v-8d5caae7>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, minima!</h2><p class="mt-4" data-v-8d5caae7>January 31, 2024 - 9 minutes read</p></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/blog/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8d5caae7"]]);

export { index as default };
//# sourceMappingURL=index-DQxNtUla.mjs.map
