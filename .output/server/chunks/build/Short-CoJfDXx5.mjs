import { _ as __nuxt_component_0 } from './nuxt-link-DKVwpM5a.mjs';
import { a as useI18n } from './server.mjs';
import { useSSRContext, computed, mergeProps, withCtx, createVNode, unref, createTextVNode, toDisplayString, openBlock, createBlock, createCommentVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';

const _sfc_main = {
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
    const i18n = useI18n();
    const strippedContent = computed(() => props.article.content.replace(/<[^>]+>/g, ""));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["flex flex-col md:flex-row", { "!flex-col": !__props.column, "md:gap-6": __props.column }]
      }, _attrs))}>`);
      _push(ssrRenderComponent(_component_nuxt_link, {
        to: `/blog/${__props.article.friendly_url}`,
        class: ["mb-6", { "md:w-48": __props.column, "h-32": __props.column }]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img alt="Article image" class="w-full h-full object-cover" src="https://d3mm2s9r15iqcv.cloudfront.net/en/wp-content/uploads/2024/01/best-online-learning-platforms.jpg"${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                alt: "Article image",
                class: "w-full h-full object-cover",
                src: "https://d3mm2s9r15iqcv.cloudfront.net/en/wp-content/uploads/2024/01/best-online-learning-platforms.jpg"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex-1">`);
      _push(ssrRenderComponent(_component_nuxt_link, {
        to: `/category/${__props.article.category_id}`,
        class: "uppercase text-sm tracking-wider"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(__props.article.category ? __props.article.category.name : unref(i18n).t("not_assigned"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(__props.article.category ? __props.article.category.name : unref(i18n).t("not_assigned")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_nuxt_link, {
        to: `/blog/${__props.article.friendly_url}`
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="text-2xl font-bold"${_scopeId}>${ssrInterpolate(__props.article.title)}</h2><p class="mt-4"${_scopeId}>${ssrInterpolate(_ctx.$dayjs(__props.article.datetime).fromNow())} - ${ssrInterpolate(__props.article.minutes_read)} ${ssrInterpolate(unref(i18n).t("minutes_read"))}</p>`);
            if (!__props.hideDescription) {
              _push2(`<p class="mt-3"${_scopeId}>${ssrInterpolate(unref(strippedContent).slice(0, 250) + "...")}</p>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("h2", { class: "text-2xl font-bold" }, toDisplayString(__props.article.title), 1),
              createVNode("p", { class: "mt-4" }, toDisplayString(_ctx.$dayjs(__props.article.datetime).fromNow()) + " - " + toDisplayString(__props.article.minutes_read) + " " + toDisplayString(unref(i18n).t("minutes_read")), 1),
              !__props.hideDescription ? (openBlock(), createBlock("p", {
                key: 0,
                class: "mt-3"
              }, toDisplayString(unref(strippedContent).slice(0, 250) + "..."), 1)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/article/Short.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = _sfc_main;

export { __nuxt_component_1 as _ };
//# sourceMappingURL=Short-CoJfDXx5.mjs.map
