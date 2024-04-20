import { _ as __nuxt_component_0 } from './nuxt-link-DKVwpM5a.mjs';
import __nuxt_component_1 from './Icon-kqhLPqFV.mjs';
import { d as defineStore, a as useI18n, g as useNuxtApp } from './server.mjs';
import { useSSRContext, defineComponent, inject, mergeProps, ref, withCtx, createTextVNode, toDisplayString } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderList } from 'vue/server-renderer';
import { useRoute } from 'vue-router';
import { u as useFetch } from './fetch-CCjfMeZS.mjs';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
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
      },
      {
        name: i18n.t("websites"),
        link: "/strony-internetowe"
      },
      {
        name: i18n.t("articles"),
        link: "/blog"
      }
    ]);
    const isActive = (item) => {
      return route.path === item.link || item.link !== "/" && route.path.includes(item.link);
    };
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
          class: ["text-sm lg:text-base", { "header__item--active": isActive(item), "!text-black": __props.white, "!border-black": __props.white }],
          to: item.link
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Header.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const useMail = () => useNuxtApp().$mail;
const useModalStore = defineStore("modal", () => {
  const visible = ref(false);
  async function submit(form) {
    const { data } = await useFetch(`/api/contact`, {
      query: {
        name: form.name,
        email: form.email,
        message: form.message,
        phone: form.phone
      }
    }, "$Xvf6TbcRwK");
    if (data.value.html) {
      const mail = useMail();
      mail.send({
        from: "kontakt@be-crafty.com",
        subject: "Kontakt z formularza na stronie internetowej Be Crafty",
        html: data.value.html
      }).then(() => {
        visible.value = false;
      });
    }
  }
  return {
    visible,
    submit
  };
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Footer",
  __ssrInlineRender: true,
  setup(__props) {
    inject("onElementVisible");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1;
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "bg-[#222222] text-white" }, _attrs))}><div class="py-12 px-4 md:px-0 mx-auto container"><h4 class="text-xl font-bold"><span>${_ctx.$t("findMe")}</span></h4><div class="flex flex-col items-start gap-3 mt-6"><a href="https://linkedin.com/in/lukasz-fujarski" target="_blank" class="flex items-center gap-3">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "uil:linkedin",
        size: "32px",
        class: "grayscale brightness-200 contrast-200"
      }, null, _parent));
      _push(`<p class="text-md">in/lukasz-fujarski</p></a><a href="https://github.com/lukasion" target="_blank" class="flex items-center gap-3">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "uil:github",
        size: "32px",
        color: "white"
      }, null, _parent));
      _push(`<p class="text-md">lukasion</p></a><a href="mailto:lukasz.fujarski@gmail.com" target="_blank" class="flex items-center gap-3">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "material-symbols:mail",
        size: "32px",
        color: "white"
      }, null, _parent));
      _push(`<p class="text-md">lukasz.fujarski@gmail.com</p></a><a href="tel:+48786826806" target="_blank" class="flex items-center gap-3">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "material-symbols:phone-enabled",
        size: "32px",
        color: "white"
      }, null, _parent));
      _push(`<p class="text-md">+48 786 826 806</p></a></div><div class="title--slide-from-bottom"><button type="button" class="form__button">${ssrInterpolate(_ctx.$t("touchFull"))}</button></div></div></footer>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Footer.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main$1 as _, _sfc_main as a, useModalStore as u };
//# sourceMappingURL=Footer-9Auhc8Y7.mjs.map
