import { _ as __nuxt_component_0 } from './nuxt-link-vMilcf8Z.mjs';
import __nuxt_component_1 from './Icon-DvULJxuf.mjs';
import { e as useI18n } from './server.mjs';
import { defineComponent, ref, mergeProps, withCtx, createTextVNode, unref, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { useRoute } from 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Header",
  __ssrInlineRender: true,
  props: {
    white: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    useI18n();
    const i18n = useI18n();
    const route = useRoute();
    const scrolled = ref(false);
    const header = ref(null);
    const mobileVisible = ref(false);
    const menu = ref([
      {
        name: i18n.t("home"),
        link: "/"
      }
      // {
      // 	name: i18n.t('about'),
      // 	link: '/blog'
      // },
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link = __nuxt_component_0;
      const _component_Icon = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["header", { "header--scrolled": scrolled.value === true, "header--white": __props.white }],
        ref_key: "header",
        ref: header
      }, _attrs))}><div class="header__container">`);
      _push(ssrRenderComponent(_component_nuxt_link, {
        to: "/",
        class: "header__logo"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` &lt;lukasz-fujarski\xA0/&gt; `);
          } else {
            return [
              createTextVNode(" <lukasz-fujarski\xA0/> ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex gap-4"><ul class="${ssrRenderClass({ "active": mobileVisible.value })}"><!--[-->`);
      ssrRenderList(menu.value, (item) => {
        _push(`<li class="header__item">`);
        _push(ssrRenderComponent(_component_nuxt_link, {
          to: item.link,
          class: { "header__item--active": unref(route).path === item.link }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(item.name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(item.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</li>`);
      });
      _push(`<!--]--></ul><ul class="!gap-4"><li class="header__item"><button>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "circle-flags:en",
        size: "24px"
      }, null, _parent));
      _push(`</button></li><li class="header__item"><button>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "circle-flags:pl",
        size: "24px"
      }, null, _parent));
      _push(`</button></li></ul></div><div class="header__hamburger md:hidden">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "material-symbols:menu",
        size: "32px"
      }, null, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Header.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=Header-Bny6cn43.mjs.map
