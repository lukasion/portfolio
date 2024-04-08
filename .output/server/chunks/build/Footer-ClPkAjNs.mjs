import __nuxt_component_0 from './Icon-B2Tgb3Kq.mjs';
import { ref, defineComponent, inject, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { d as defineStore, e as useNuxtApp } from './server.mjs';

const useMail = () => useNuxtApp().$mail;
const useModalStore = defineStore("modal", () => {
  const visible = ref(false);
  async function submit(form) {
    const mail = useMail();
    mail.send({
      from: "John Doe",
      subject: "Incredible",
      text: "This is an incredible test message"
    });
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
      const _component_Icon = __nuxt_component_0;
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
      _push(`<p class="text-md">lukasz.fujarski@gmail.com</p></a></div><div class="title--slide-from-bottom"><button type="button" class="form__button"> Get in touch </button></div></div></footer>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Footer.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _, useModalStore as u };
//# sourceMappingURL=Footer-ClPkAjNs.mjs.map
