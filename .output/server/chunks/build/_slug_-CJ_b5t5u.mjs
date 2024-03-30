import { _ as _sfc_main$3 } from './input-gbl6YxNY.mjs';
import { useSSRContext, defineComponent, computed, mergeProps, unref, withCtx, createTextVNode } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderComponent } from 'vue/server-renderer';
import { _ as __nuxt_component_0 } from './nuxt-link-omEFdkit.mjs';
import { u as useArticlesStore } from './articles-QR1-FAJY.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
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
import './fetch-trIPN45j.mjs';

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "textarea",
  __ssrInlineRender: true,
  props: {
    value: {
      type: String,
      default: null
    },
    class: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      default: ""
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const props = __props;
    const labelComputed = computed(() => {
      let label = props.label;
      if (props.required) {
        label += " *";
      }
      return label;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "form-control" }, _attrs))}><label class="label"><span class="label-text">${ssrInterpolate(unref(labelComputed))}:</span></label><label class="input-group"><textarea${ssrRenderAttr("placeholder", __props.placeholder)} class="${ssrRenderClass(["textarea textarea-bordered", props.class])}"${ssrIncludeBooleanAttr(__props.required) ? " required" : ""}>${ssrInterpolate(__props.value)}</textarea></label></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/form/textarea.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "form",
  __ssrInlineRender: true,
  props: {
    postId: {
      type: String,
      default: null
    }
  },
  setup(__props) {
    const articlesStore = useArticlesStore();
    const props = __props;
    if (props.postId) {
      articlesStore.fetchArticle(props.postId);
    }
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c;
      const _component_form_input = _sfc_main$3;
      const _component_form_textarea = _sfc_main$2;
      const _component_nuxt_link = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex justify-center" }, _attrs))}><div class="max-w-[768px] w-full"><h3 class="font-bold text-2xl">${ssrInterpolate(__props.postId ? "Edit" : "Create")} post `);
      if ((_a = unref(articlesStore).article) == null ? void 0 : _a.id) {
        _push(`<span class="text-sm text-gray-500">(ID: ${ssrInterpolate(unref(articlesStore).article.id)})</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</h3>`);
      _push(ssrRenderComponent(_component_form_input, {
        class: "w-full",
        label: "Name of article",
        placeholder: "Name",
        required: "",
        value: (_b = unref(articlesStore).article) == null ? void 0 : _b.prompt
      }, null, _parent));
      _push(ssrRenderComponent(_component_form_textarea, {
        class: "w-full",
        label: "Content",
        required: "",
        value: (_c = unref(articlesStore).article) == null ? void 0 : _c.content
      }, null, _parent));
      _push(`<div class="flex gap-2">`);
      _push(ssrRenderComponent(_component_nuxt_link, {
        to: "/user/posts",
        class: "btn"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Cancel`);
          } else {
            return [
              createTextVNode("Cancel")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="btn btn-neutral">Submit form</button></div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/post/form.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_post_form = _sfc_main$1;
  _push(ssrRenderComponent(_component_post_form, mergeProps({
    "post-id": _ctx.$route.params.slug
  }, _attrs), null, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/user/posts/form/[[slug]].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __slug__ = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { __slug__ as default };
//# sourceMappingURL=_slug_-CJ_b5t5u.mjs.map
