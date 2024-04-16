import { _ as __nuxt_component_0$1 } from './nuxt-link-vMilcf8Z.mjs';
import { useSSRContext, ref, mergeProps, unref, withCtx, createTextVNode, toDisplayString } from 'vue';
import { b as useRouter } from './server.mjs';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';

const _sfc_main$1 = {
  __name: "Navbar",
  __ssrInlineRender: true,
  setup(__props) {
    const menu = ref({
      "Mainpage": "/",
      "Dashboard": "/user/auth",
      "Posts": "/user/posts",
      "Topics": "/user/topics"
    });
    const { currentRoute } = useRouter();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "navbar bg-base-100 shadow-md" }, _attrs))}><div class="container mx-auto"><div class="flex-1"><a class="btn btn-ghost text-xl">Admin CP</a></div><div class="flex-none"><ul class="menu menu-horizontal px-1 gap-2"><!--[-->`);
      ssrRenderList(unref(menu), (route, name) => {
        _push(`<li>`);
        _push(ssrRenderComponent(_component_nuxt_link, {
          to: route,
          class: { "font-bold": route !== "/" && unref(currentRoute).path.includes(route) }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</li>`);
      });
      _push(`<!--]--></ul></div></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/user/Navbar.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = _sfc_main$1;
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex justify-center mt-5" }, _attrs))}><a class="btn" href="/user/auth/signout">Sign out</a></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/user/Footer.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { __nuxt_component_0 as _, __nuxt_component_2 as a };
//# sourceMappingURL=Footer-8LcL_o9q.mjs.map
