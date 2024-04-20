import { defineComponent, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "input",
  __ssrInlineRender: true,
  props: {
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
    },
    value: {
      type: String,
      default: null
    }
  },
  setup(__props) {
    const props = __props;
    const labelComputed = computed(() => {
      let label = props.label;
      if (props.required) {
        label += " *";
      }
      return label;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "form-control" }, _attrs))}><label class="label"><span class="label-text">${ssrInterpolate(unref(labelComputed))}:</span></label><label class="input-group"><input${ssrRenderAttr("type", __props.type)}${ssrRenderAttr("placeholder", __props.placeholder)} class="${ssrRenderClass(["input input-bordered", props.class])}"${ssrIncludeBooleanAttr(__props.required) ? " required" : ""}${ssrRenderAttr("value", __props.value)}></label></div>`);
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
//# sourceMappingURL=input-DhMd53SA.mjs.map
