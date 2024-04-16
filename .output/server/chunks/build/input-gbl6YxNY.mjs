import { defineComponent, mergeModels, useModel, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderDynamicModel } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "input",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    type: {
      type: String,
      default: "text"
    },
    class: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      default: ""
    },
    required: {
      type: Boolean,
      default: false
    }
  }, {
    "modelValue": {},
    "modelModifiers": {}
  }),
  emits: ["update:modelValue"],
  setup(__props) {
    const model = useModel(__props, "modelValue");
    const props = __props;
    const labelComputed = computed(() => {
      let label = props.label;
      if (props.required) {
        label += " *";
      }
      return label;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "form-control" }, _attrs))}><label class="label"><span class="label-text">${ssrInterpolate(unref(labelComputed))}:</span></label><label class="input-group"><input${ssrRenderAttr("type", __props.type)}${ssrRenderAttr("placeholder", __props.placeholder)} class="${ssrRenderClass(["input input-bordered", props.class])}"${ssrIncludeBooleanAttr(__props.required) ? " required" : ""}${ssrRenderDynamicModel(__props.type, model.value, null)}></label></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/form/input.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=input-gbl6YxNY.mjs.map
