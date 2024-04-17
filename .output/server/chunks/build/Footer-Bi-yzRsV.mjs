import __nuxt_component_1 from './Icon-DvULJxuf.mjs';
import { defineComponent, inject, mergeProps, useSSRContext, ref } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { u as useFetch } from './fetch-CCjfMeZS.mjs';
import { d as defineStore, g as useNuxtApp } from './server.mjs';

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

export { _sfc_main as _, useModalStore as u };
//# sourceMappingURL=Footer-Bi-yzRsV.mjs.map
