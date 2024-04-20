import __nuxt_component_1 from './Icon-kqhLPqFV.mjs';
import { defineComponent, ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderAttr } from 'vue/server-renderer';
import { u as useModalStore } from './Footer-9Auhc8Y7.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Contact",
  __ssrInlineRender: true,
  setup(__props) {
    useModalStore();
    const form = ref({
      name: "",
      email: "",
      message: "",
      phone: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_icon = __nuxt_component_1;
      const _component_Icon = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "modal" }, _attrs))}><div class="modal__container"><button class="modal__close">`);
      _push(ssrRenderComponent(_component_icon, {
        name: "material-symbols:close-small",
        class: "w-15 h-15 text-5xl"
      }, null, _parent));
      _push(`</button><div class="modal__content"><div class="modal__header"><h2 class="title--x-large title--condensed"><span>${ssrInterpolate(_ctx.$t("touchFull"))}</span></h2><p class="leading-7 mt-5"><span style="${ssrRenderStyle({ "transition-delay": ".6s" })}">${ssrInterpolate(_ctx.$t("touchDescription"))}</span></p><a href="tel:+48786826806" target="_blank" class="flex-inline items-center mt-4">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "material-symbols:phone-enabled",
        size: "32px",
        color: "black"
      }, null, _parent));
      _push(`<span class="text-md ml-4 top-[2px] relative">+48 786 826 806</span></a><br><a href="mailto:lukasz.fujarski@gmail.com" target="_blank" class="flex-inline items-center">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "material-symbols:mail",
        size: "32px",
        color: "black"
      }, null, _parent));
      _push(`<span class="text-md ml-4 top-[2px] relative">lukasz.fujarski@gmail.com</span></a></div><div class="modal__form"><div class="form__input-container"><input class="form__input" type="text" id="name"${ssrRenderAttr("placeholder", _ctx.$t("yourName"))}${ssrRenderAttr("value", unref(form).name)}></div><div class="form__input-container"><input class="form__input" type="email" id="email"${ssrRenderAttr("placeholder", _ctx.$t("yourEmail"))}${ssrRenderAttr("value", unref(form).email)}></div><div class="form__input-container"><input class="form__input" type="text" id="phone"${ssrRenderAttr("placeholder", _ctx.$t("yourPhone"))}${ssrRenderAttr("value", unref(form).phone)}></div><div class="form__input-container"><textarea class="form__input" id="message"${ssrRenderAttr("placeholder", _ctx.$t("yourMessage"))}>${ssrInterpolate(unref(form).message)}</textarea></div><div class="modal__form-input"><button class="form__button form__button--dark">${ssrInterpolate(_ctx.$t("contactRequest"))}</button></div></div></div></div></div>`);
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
//# sourceMappingURL=Contact-B5OIhScP.mjs.map
