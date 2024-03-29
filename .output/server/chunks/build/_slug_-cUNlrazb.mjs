import { useSSRContext, defineComponent, unref } from 'vue';
import { ssrRenderList, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { u as useTopicsStore } from './topics-Baz25l9q.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import './fetch-DXWw0h3v.mjs';
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
import './server.mjs';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'dayjs';
import 'dayjs/plugin/updateLocale.js';
import 'dayjs/plugin/timezone.js';
import 'dayjs/plugin/relativeTime.js';
import 'dayjs/plugin/utc.js';
import 'tailwind-merge';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "list",
  __ssrInlineRender: true,
  setup(__props) {
    const topicsStore = useTopicsStore();
    topicsStore.fetchTopics();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><h4 class="text-xl font-bold mb-4">List of articles to be generated</h4><table class="table table-zebra border border-gray-200 rounded-md shadow"><thead><tr><th>ID</th><th>Title</th><th>When will be generated</th></tr></thead><tbody><!--[-->`);
      ssrRenderList(unref(topicsStore).topics, (topic) => {
        _push(`<tr><td>${ssrInterpolate(topic.id)}</td><td>${ssrInterpolate(topic.name)}</td><td>${ssrInterpolate(topic.datetime)}</td></tr>`);
      });
      _push(`<!--]--></tbody></table><div class="text-center mt-4"><a class="btn btn-neutral" href="/user/topics/form">Create new topic</a></div><!--]-->`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/topic/list.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_topic_list = _sfc_main$1;
  _push(ssrRenderComponent(_component_topic_list, _attrs, null, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/user/topics/[[slug]].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __slug__ = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { __slug__ as default };
//# sourceMappingURL=_slug_-cUNlrazb.mjs.map
