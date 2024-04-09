import __nuxt_component_0 from './Icon-BuLxKxLA.mjs';
import { defineComponent, ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderAttr } from 'vue/server-renderer';
import { u as useModalStore } from './Footer-BJ9TbOJ5.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Contact",
  __ssrInlineRender: true,
  setup(__props) {
    useModalStore();
    const form = ref({
      name: "",
      email: "",
      message: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_icon = __nuxt_component_0;
      const _component_Icon = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "modal" }, _attrs))}><div class="modal__container"><button class="modal__close">`);
      _push(ssrRenderComponent(_component_icon, {
        name: "material-symbols:close-small",
        class: "w-15 h-15 text-5xl"
      }, null, _parent));
      _push(`</button><div class="modal__content"><div class="modal__header"><h2 class="title--x-large title--condensed"><span>${ssrInterpolate(_ctx.$t("touchFull"))}</span></h2><p class="leading-7 mt-5"><span style="${ssrRenderStyle({ "transition-delay": ".6s" })}">${ssrInterpolate(_ctx.$t("touchDescription"))}</span></p><a href="tel:+48786826806" target="_blank" class="flex items-center gap-3 mt-4">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "material-symbols:phone-enabled",
        size: "32px",
        color: "black"
      }, null, _parent));
      _push(`<p class="text-md">+48 786 826 806</p></a><a href="mailto:lukasz.fujarski@gmail.com" target="_blank" class="flex items-center gap-3">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "material-symbols:mail",
        size: "32px",
        color: "black"
      }, null, _parent));
      _push(`<p class="text-md">lukasz.fujarski@gmail.com</p></a></div><div class="modal__form"><form action=""><div class="form__input-container"><input class="form__input" t type="text" id="name"${ssrRenderAttr("placeholder", _ctx.$t("yourName"))}${ssrRenderAttr("value", unref(form).name)}></div><div class="form__input-container"><input class="form__input" type="email" id="email"${ssrRenderAttr("placeholder", _ctx.$t("yourEmail"))}${ssrRenderAttr("value", unref(form).email)}></div><div class="form__input-container"><textarea class="form__input" id="message"${ssrRenderAttr("placeholder", _ctx.$t("yourMessage"))}>${ssrInterpolate(unref(form).message)}</textarea></div><div class="modal__form-input"><button class="form__button form__button--dark">${ssrInterpolate(_ctx.$t("contactRequest"))}</button></div></form></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/modal/Contact.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=Contact-DOkmYp1n.mjs.map
