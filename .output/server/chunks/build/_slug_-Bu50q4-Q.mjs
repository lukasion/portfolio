import { useSSRContext, defineComponent, unref } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { u as useArticlesStore } from './articles-C1LnSmrD.mjs';
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

function shorten(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + "...";
}
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "list",
  __ssrInlineRender: true,
  setup(__props) {
    const articlesStore = useArticlesStore();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      if (unref(articlesStore).articles.length > 0) {
        _push(`<table class="table table-zebra border border-gray-200 rounded-md shadow mt-4"><thead><tr><th>ID</th><th>Prompt</th><th>Content</th><th>Actions</th></tr></thead><tbody><!--[-->`);
        ssrRenderList(unref(articlesStore).articles, (article) => {
          _push(`<tr><td>${ssrInterpolate(article.id)}</td><td>${ssrInterpolate(article.prompt)}</td><td>${ssrInterpolate(("shorten" in _ctx ? _ctx.shorten : unref(shorten))(article.content, 150))}</td><td><a class="btn btn-sm btn-neutral"${ssrRenderAttr("href", `/user/posts/form/${article.id}`)}>Edit</a></td></tr>`);
        });
        _push(`<!--]--></tbody></table>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="text-center mt-4"><a class="btn btn-neutral" href="/user/posts/form">Create new post</a></div><!--]-->`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/post/list.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "[[slug]]",
  __ssrInlineRender: true,
  setup(__props) {
    const articlesStore = useArticlesStore();
    articlesStore.fetchData();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_post_list = _sfc_main$1;
      _push(ssrRenderComponent(_component_post_list, _attrs, null, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/user/posts/[[slug]].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_slug_-Bu50q4-Q.mjs.map
