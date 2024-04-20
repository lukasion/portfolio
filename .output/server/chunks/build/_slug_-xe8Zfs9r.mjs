import { _ as _sfc_main$2 } from './input-DhMd53SA.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-DKVwpM5a.mjs';
import { useSSRContext, defineComponent, mergeProps, unref, withCtx, createTextVNode } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { u as useTopicsStore } from './topics-qg1MUy66.mjs';
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
import 'redirect-ssl';
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
import './fetch-CCjfMeZS.mjs';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "form",
  __ssrInlineRender: true,
  props: {
    topicId: {
      type: String,
      default: null
    }
  },
  setup(__props) {
    const topicsStore = useTopicsStore();
    const props = __props;
    if (props.topicId) {
      topicsStore.fetchTopic(props.topicId);
    }
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_form_input = _sfc_main$2;
      const _component_nuxt_link = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex justify-center" }, _attrs))}><div class="max-w-[768px] w-full"><h3 class="font-bold text-2xl">${ssrInterpolate(__props.topicId ? "Edit" : "Create")} topic `);
      if ((_a = unref(topicsStore).topic) == null ? void 0 : _a.id) {
        _push(`<span class="text-sm text-gray-500">(ID: ${ssrInterpolate(unref(topicsStore).topic.id)})</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</h3>`);
      _push(ssrRenderComponent(_component_form_input, {
        class: "w-full",
        label: "Enter topic",
        placeholder: "Name",
        required: "",
        modelValue: unref(topicsStore).topic.name,
        "onUpdate:modelValue": ($event) => unref(topicsStore).topic.name = $event
      }, null, _parent));
      _push(ssrRenderComponent(_component_form_input, {
        type: "date",
        class: "w-full",
        label: "Enter datetime to be generated",
        placeholder: "Date",
        required: "",
        modelValue: unref(topicsStore).topic.datetime,
        "onUpdate:modelValue": ($event) => unref(topicsStore).topic.datetime = $event
      }, null, _parent));
      _push(`<div class="flex gap-2 mt-4">`);
      _push(ssrRenderComponent(_component_nuxt_link, {
        to: "/user/topics",
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/topic/form.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_topic_form = _sfc_main$1;
  _push(ssrRenderComponent(_component_topic_form, _attrs, null, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/user/topics/form/[[slug]].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __slug__ = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { __slug__ as default };
//# sourceMappingURL=_slug_-xe8Zfs9r.mjs.map
