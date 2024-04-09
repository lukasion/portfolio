import { b as buildAssetsURL } from '../routes/renderer.mjs';
import { _ as _sfc_main$7 } from './Header-BC6E40jq.mjs';
import { useSSRContext, defineComponent, inject, ref, mergeProps, unref } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderStyle, ssrRenderAttr, ssrInterpolate, ssrRenderComponent, ssrRenderList } from 'vue/server-renderer';
import { u as useModalStore, _ as _sfc_main$6 } from './Footer-BJ9TbOJ5.mjs';
import { d as defineStore, _ as __nuxt_component_3, c as useIntersectionObserver } from './server.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import __nuxt_component_0 from './Icon-BuLxKxLA.mjs';
import { _ as _sfc_main$8 } from './Contact-DOkmYp1n.mjs';
import 'vue-bundle-renderer/runtime';
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
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import './nuxt-link-omEFdkit.mjs';
import 'vue-router';
import 'dayjs';
import 'dayjs/plugin/updateLocale.js';
import 'dayjs/plugin/timezone.js';
import 'dayjs/plugin/relativeTime.js';
import 'dayjs/plugin/utc.js';
import 'tailwind-merge';
import '@iconify/vue/dist/offline';
import '@iconify/vue';
import './index-yzm_4dp1.mjs';

const _imports_0 = "" + buildAssetsURL("mobile.9S7sboHz.jpg");
const _imports_1 = "" + buildAssetsURL("doger-desktop.n8T5WlF3.jpg");
const useSkillsChartStore = defineStore("skillsChart", () => {
  const visible = ref(false);
  const toggle = (value) => {
    visible.value = value;
  };
  return {
    visible,
    toggle
  };
});
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "Start",
  __ssrInlineRender: true,
  setup(__props) {
    useSkillsChartStore();
    inject("onElementVisible");
    const desktop = ref(false);
    const mounted = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "section__start section__wrapper" }, _attrs))} data-v-369c5ab9><div class="${ssrRenderClass([{ "section__background--gradient": !unref(desktop) }, "section__background"])}" data-v-369c5ab9>`);
      if (unref(desktop)) {
        _push(`<canvas id="canvas" width="32px" height="32px" data-v-369c5ab9></canvas>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="mt-32 md:mt-72 mx-auto container relative" data-v-369c5ab9><h2 class="px-4 md:px-0 title--ultra-large title--condensed title--slide-from-bottom element--visible" style="${ssrRenderStyle({ "mix-blend-mode": "color-burn", "opacity": "0.6" })}" data-v-369c5ab9><span data-v-369c5ab9>${_ctx.$t("headingTitle")}</span></h2><h2 class="px-4 md:px-0 title--ultra-large title--condensed title--slide-from-bottom element--visible" style="${ssrRenderStyle({ "position": "absolute", "top": "0", "left": "0", "opacity": "0.4" })}" data-v-369c5ab9><span data-v-369c5ab9>${_ctx.$t("headingTitle")}</span></h2></div><div class="${ssrRenderClass([{ "element--visible": unref(mounted) }, "section__container mt-8 section__container--small-padding-top flex gap-12 z-100"])}" data-v-369c5ab9><div class="w-full lg:w-1/2" data-v-369c5ab9><p class="leading-7 md:mt-12 title--slide-from-left" data-v-369c5ab9><span style="${ssrRenderStyle({ "transition-delay": ".6s" })}" data-v-369c5ab9>${_ctx.$t("headingDescription")}</span></p><div class="${ssrRenderClass([{ "element--visible": unref(mounted) }, "title--slide-from-bottom mt-6 flex md:gap-3 flex-col md:flex-row relative left-0 md:-left-6"])}" data-v-369c5ab9><button type="button" class="form__button form__button--arrow-right !mt-4 md:mt-10" data-v-369c5ab9><span data-v-369c5ab9>${_ctx.$t("collaborate")}</span></button><button class="form__button form__button--darker !mt-4 md:mt-10" data-v-369c5ab9><span data-v-369c5ab9>${_ctx.$t("checkoutSummary")}</span></button></div></div><div class="hidden lg:block lg:w-1/2 relative" data-v-369c5ab9><div class="box__rounded box--animated" data-v-369c5ab9><h4 class="font-bold mb-4" data-v-369c5ab9><span data-v-369c5ab9>${_ctx.$t("responsiveDesign")}</span></h4><img${ssrRenderAttr("src", _imports_0)} alt="Fully responsive web design" width="260px" title="Fully responsive, mobile web design" data-v-369c5ab9></div><div class="box__rounded box--bigger box--animated" data-v-369c5ab9><img${ssrRenderAttr("src", _imports_1)} alt="Web application developed in laravel framework" width="450px" title="Web application developed in laravel framework" data-v-369c5ab9></div></div></div></section>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/section/Start.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-369c5ab9"]]);
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "Technologies",
  __ssrInlineRender: true,
  setup(__props) {
    inject("onElementVisible");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "section__wrapper" }, _attrs))}><div class="section__container !pt-0 lg:!pt-32"><h2 class="title--x-large title--condensed title--slide-from-bottom"><span>${ssrInterpolate(_ctx.$t("technologies"))}</span></h2><p class="leading-7 mt-5 title--slide-from-left"><span style="${ssrRenderStyle({ "transition-delay": ".6s" })}">${_ctx.$t("technologiesDescription")}</span></p><div class="technology__container mt-12"><div class="technology__item-wrapper title--slide-from-bottom"><a href="https://github.com/lukasion/portfolio/tree/main" target="_blank" class="technology__item"><div>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "logos:vue",
        size: "48px"
      }, null, _parent));
      _push(` Vue.js </div><p class="technology__title"> Checkout my work </p></a></div><div class="technology__item-wrapper title--slide-from-bottom"><a href="https://github.com/lukasion/portfolio/tree/main/laravel-api" target="_blank" class="technology__item" style="${ssrRenderStyle({ "transition-delay": ".6s" })}"><div>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "logos:laravel",
        size: "48px"
      }, null, _parent));
      _push(` Laravel </div><p class="technology__title"> Checkout my work </p></a></div><div class="technology__item-wrapper title--slide-from-bottom"><span class="technology__item" style="${ssrRenderStyle({ "transition-delay": ".9s" })}"><div>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "devicon:livewire",
        size: "48px"
      }, null, _parent));
      _push(` Livewire </div></span></div><div class="technology__item-wrapper title--slide-from-bottom"><span class="technology__item" style="${ssrRenderStyle({ "transition-delay": "1.2s" })}"><div>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "logos:alpinejs-icon",
        size: "48px"
      }, null, _parent));
      _push(` Alpine.js </div></span></div><div class="technology__item-wrapper title--slide-from-bottom"><span class="technology__item" style="${ssrRenderStyle({ "transition-delay": "1.5s" })}"><div>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "logos:react",
        size: "48px"
      }, null, _parent));
      _push(` React </div></span></div><div class="technology__item-wrapper title--slide-from-bottom"><a href="https://github.com/lukasion/portfolio/tree/main" target="_blank" class="technology__item" style="${ssrRenderStyle({ "transition-delay": "1.8s" })}"><div>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "logos:nuxt-icon",
        size: "48px"
      }, null, _parent));
      _push(` Nuxt </div><p class="technology__title"> Checkout my work </p></a></div><div class="technology__item-wrapper title--slide-from-bottom"><a href="https://github.com/lukasion/portfolio/tree/main" target="_blank" class="technology__item" style="${ssrRenderStyle({ "transition-delay": "2.1s" })}"><div>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "logos:nodejs",
        size: "48px"
      }, null, _parent));
      _push(` Node.js </div><p class="technology__title"> Checkout my work </p></a></div><div class="technology__item-wrapper title--slide-from-bottom"><a href="https://github.com/lukasion/portfolio/tree/main/laravel-api" target="_blank" class="technology__item" style="${ssrRenderStyle({ "transition-delay": "2.4s" })}"><div>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "logos:php-alt",
        size: "48px"
      }, null, _parent));
      _push(` PHP </div><p class="technology__title"> Checkout my work </p></a></div><div class="technology__item-wrapper title--slide-from-bottom"><a href="https://github.com/lukasion/portfolio/tree/main/assets/scss" target="_blank" class="technology__item" style="${ssrRenderStyle({ "transition-delay": "2.7s" })}"><div>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "vscode-icons:file-type-scss2",
        size: "48px"
      }, null, _parent));
      _push(` SCSS </div><p class="technology__title"> Checkout my work </p></a></div><div class="technology__item-wrapper title--slide-from-bottom"><a href="https://github.com/lukasion/portfolio/tree/main/assets/scss" target="_blank" class="technology__item" style="${ssrRenderStyle({ "transition-delay": "3.0s" })}"><div>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "logos:tailwindcss-icon",
        size: "48px"
      }, null, _parent));
      _push(` Tailwind </div><p class="technology__title"> Checkout my work </p></a></div><div class="technology__item-wrapper title--slide-from-bottom"><span class="technology__item" style="${ssrRenderStyle({ "transition-delay": "3.3s" })}"><div>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "logos:docker-icon",
        size: "48px"
      }, null, _parent));
      _push(` Docker </div></span></div><div class="technology__item-wrapper title--slide-from-bottom"><span class="technology__item" style="${ssrRenderStyle({ "transition-delay": "3.6s" })}"><div>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "logos:git",
        size: "48px"
      }, null, _parent));
      _push(` Git </div></span></div><div class="technology__item-wrapper title--slide-from-bottom"><span class="technology__item" style="${ssrRenderStyle({ "transition-delay": "3.9s" })}"><div>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "logos:github-copilot",
        size: "48px"
      }, null, _parent));
      _push(` GitHub Copilot </div></span></div></div></div></section>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/section/Technologies.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "Socials",
  __ssrInlineRender: true,
  setup(__props) {
    inject("onElementVisible");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "section__wrapper" }, _attrs))}><div class="section__container"><h2 class="title--x-large title--condensed title--slide-from-bottom"><span>${_ctx.$t("socialsTitle")}</span></h2><p class="leading-7 mt-5 title--slide-from-left"><span style="${ssrRenderStyle({ "transition-delay": ".6s" })}">${_ctx.$t("socialsDescription")}</span></p><div class="technology__container mt-12"><div class="technology__item-wrapper title--slide-from-bottom"><span class="technology__item"><div>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "logos:github-icon",
        size: "48px"
      }, null, _parent));
      _push(` GitHub </div></span></div><div class="technology__item-wrapper title--slide-from-bottom"><span class="technology__item" style="${ssrRenderStyle({ "transition-delay": "0.6s" })}"><div>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "logos:linkedin-icon",
        size: "48px"
      }, null, _parent));
      _push(` LinkedIn </div></span></div><div class="technology__item-wrapper title--slide-from-bottom"><span class="technology__item" style="${ssrRenderStyle({ "transition-delay": "0.9s" })}"><div>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "logos:facebook",
        size: "48px"
      }, null, _parent));
      _push(` Facebook </div></span></div><div class="technology__item-wrapper title--slide-from-bottom"><span class="technology__item" style="${ssrRenderStyle({ "transition-delay": "1.2s" })}"><div>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "logos:google-gmail",
        size: "48px"
      }, null, _parent));
      _push(` Google Mail </div></span></div></div></div></section>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/section/Socials.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const intervalError = "[nuxt] `setInterval` should not be used on the server. Consider wrapping it with an `onNuxtReady`, `onBeforeMount` or `onMounted` lifecycle hook, or ensure you only call it in the browser by checking `false`.";
const setInterval = () => {
  console.error(intervalError);
};
const _sfc_main$2 = {
  __name: "Code",
  __ssrInlineRender: true,
  setup(__props) {
    const loading = ref(true);
    const dots = ref("...");
    const editor = ref(null);
    inject("onElementVisible");
    useSkillsChartStore();
    const handleVisibility = ([{ isIntersecting }], observerElement) => {
      if (isIntersecting) {
        if (editor.value) {
          observerElement.unobserve(editor.value);
        }
        setTimeout(() => {
          loading.value = false;
        }, 4e3);
        setInterval();
      }
    };
    useIntersectionObserver(editor, handleVisibility);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="section__container"><h2 class="title--x-large title--condensed"><span>${_ctx.$t("aboutMeTitle")}</span></h2><button class="form__button form__button--dark"><span>${_ctx.$t("checkoutSummary")}</span></button></div><div class="code">`);
      if (unref(loading)) {
        _push(`<div class="code__preloader">${ssrInterpolate(_ctx.$t("loading"))} <span>${ssrInterpolate(unref(dots))}</span></div>`);
      } else {
        _push(`<div class="code__container"><div data-line-nr="01" class="code__line"><div class="methods">class</div><span class="propname">\u0141ukasz Fujarski</span><div class="methods">extends</div><div class="propname">Developer</div> { </div><div data-line-nr="02" class="code__line"><div class="dot">\xB7\xB7</div><div class="comment"> // &quot;Don&#39;t comment bad code \u2013 rewrite it.&quot; - Brian Kernighan. </div></div><div data-line-nr="03" class="code__line"><div class="dot">\xB7\xB7</div><div class="comment"> // &quot;Give someone a program; you frustrate them for a day; teach them how to program, and you frustrate them for a lifetime&quot; \u2013 David Leinweber. </div></div><div data-line-nr="04" class="code__line"></div><div data-line-nr="05" class="code__line"><div class="dot">\xB7\xB7</div><div class="propname"><div class="methods">public string\xA0</div><span class="variable">$name</span><span class="methods">;</span></div></div><div data-line-nr="06" class="code__line"><div class="dot">\xB7\xB7</div><div class="propname"><div class="methods">public string\xA0</div><span class="variable">$email</span><span class="methods">;</span></div></div><div data-line-nr="07" class="code__line"><div class="dot">\xB7\xB7</div><div class="propname"><div class="methods">private string\xA0</div><span class="variable">$dayOfBirthTimestamp</span><span class="methods">;</span></div></div><div data-line-nr="08" class="code__line"></div><div data-line-nr="09" class="code__line"><div class="dot">\xB7\xB7</div><div class="propname"><div class="methods">public function\xA0</div><span class="methodname">__construct</span>() </div></div><div data-line-nr="10" class="code__line"><div class="dot">\xB7\xB7</div><div class="propname"> { </div></div><div data-line-nr="11" class="code__line"><div class="dot">\xB7....\xB7</div><span class="variable">$this<span class="arrow">-&gt;</span>name</span>\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0= <span class="string">&#39;\u0141ukasz Fujarski&#39;;</span></div><div data-line-nr="12" class="code__line"><div class="dot">\xB7....\xB7</div><span class="variable">$this<span class="arrow">-&gt;</span>email</span>\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0= <span class="string">&#39;lukasz.fujarski@gmail.com&#39;;</span></div><div data-line-nr="13" class="code__line"><div class="dot">\xB7....\xB7</div><span class="variable">$this<span class="arrow">-&gt;</span>dayOfBirthTimestamp</span>\xA0= <span class="string">856059633;</span></div><div data-line-nr="14" class="code__line"><div class="dot">\xB7\xB7</div><div class="propname"> } </div></div><div data-line-nr="15" class="code__line"></div><div data-line-nr="16" class="code__line"><div class="dot">\xB7\xB7</div><div class="propname"><div class="methods">public function\xA0</div><span class="methodname">workExperience</span>(): <span class="methods">array</span></div></div><div data-line-nr="17" class="code__line"><div class="dot">\xB7\xB7</div><div class="propname"> { </div></div><div data-line-nr="18" class="code__line"><div class="dot">\xB7\xB7\xB7\xB7\xB7\xB7</div><div class="methods">return</div> [ </div><div data-line-nr="19" class="code__line"><div class="dot">\xB7\xB7\xB7\xB7\xB7\xB7</div><div> \xA0\xA0\xA0\xA0&#39;2022 - now&#39; =&gt; &#39;Full Stack Developer at <a href="https://tech-studio.pl/" target="_blank">Tech-Studio S.C.</a>&#39;, </div></div><div data-line-nr="20" class="code__line"><div class="dot">\xB7\xB7\xB7\xB7\xB7\xB7</div><div> \xA0\xA0\xA0\xA0&#39;2018 - 2022&#39; =&gt; &#39;PHP Developer at <a href="https://tech-studio.pl/" target="_blank">Tech-Studio S.C.</a>&#39; </div></div><div data-line-nr="21" class="code__line"><div class="dot">\xB7\xB7\xB7\xB7\xB7\xB7</div><div> ]; </div></div><div data-line-nr="22" class="code__line"><div class="dot">\xB7\xB7</div><div class="propname"> } </div></div><div data-line-nr="23" class="code__line"></div><div data-line-nr="24" class="code__line"><div class="dot">\xB7\xB7</div><div class="propname"><div class="methods">public function\xA0</div><span class="methodname lg:tooltip" data-tip="Method defines only few of the technologies I&#39;ve worked with. Through the time working as web developer I&#39;ve gained experience in many more programming languages, frameworks and tools.">skills</span>(): <span class="methods">array</span></div></div><div data-line-nr="25" class="code__line"><div class="dot">\xB7\xB7</div><div class="propname"> { </div></div><div data-line-nr="26" class="code__line"><div class="dot">\xB7\xB7\xB7\xB7\xB7\xB7</div><div class="methods">return</div> [&#39;JavaScript&#39;, &#39;PHP&#39;, &#39;CSS&#39;, &#39;Laravel Framework&#39;, &#39;SCSS&#39;, &#39;Vue.js 2 &amp; 3&#39;, &#39;Nuxt.js&#39;, &#39;Tailwind CSS&#39;, &#39;Git&#39;, &#39;MySQL&#39;, &#39;Docker&#39;, &#39;Linux&#39;, &#39;Apache&#39;, &#39;Webpack&#39;, &#39;Composer&#39;, &#39;NPM&#39;, &#39;Node.js&#39;, &#39;Adobe Photoshop&#39;, &#39;Microsoft Office&#39;, &#39;Microsoft Excel&#39;, &#39;Microsoft SQL Server&#39;, &#39;Microsoft Power BI&#39;, &#39;Pinia&#39;, &#39;Vuex&#39;, &#39;Vuetify&#39;, &#39;Bootstrap&#39;, &#39;jQuery&#39;, &#39;HTML&#39;, &#39;REST API&#39;, &#39;Python&#39;, &#39;C#&#39;]; </div><div data-line-nr="27" class="code__line"><div class="dot">\xB7\xB7</div><div class="propname"> } </div></div><div data-line-nr="28" class="code__line"><div class="propname"> } </div></div></div>`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/section/Code.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_5 = _sfc_main$2;
const _sfc_main$1 = {
  __name: "SkillsChart",
  __ssrInlineRender: true,
  setup(__props) {
    const skillsChartStore = useSkillsChartStore();
    const items = ref([
      {
        name: "Frontend",
        technologies: [
          {
            name: "Vue.js",
            features: ["Vue 2", "Vue 3", "Composition API", "Options API", "Vuex Store", "Vue Router", "Pinia", "Vite", "Webpack", "Quasar", "Vuetify", "VCalendar", "VueUse"]
          },
          {
            name: "Nuxt.js",
            features: ["Nuxt 3", "Nuxt Mapbox", "Nuxt Mail", "Nuxt Icon", "Sidebase/Nuxt Auth"]
          },
          {
            name: "Others",
            features: ["JavaScript", "TypeScript", "EcmaScript 6", "Mapbox", "Leaflet", "OpenLayers", "Tailwind CSS", "Alpine.js", "Bootstrap", "jQuery"]
          }
        ]
      },
      {
        name: "Backend",
        technologies: [
          {
            name: "Laravel",
            features: ["Laravel 7-10", "Livewire", "Sanctum", "Sail", "Spatie", "Passport", "Tinker", "Mix", "Homestead", "Sail", "Queues", "Jobs", "MVC", "Migrations & Seeders", "Requests", "Cache", "Mails", "Broadcasts", "Notifications", "Task Scheduling", "Hashing"]
          },
          {
            name: "Livewire",
            features: ["Livewire 3"]
          },
          {
            name: "Symfony",
            features: ["Twig", "Doctrine", "Console", "Forms", "Routing", "Validator", "Yaml"]
          },
          {
            name: "Node.js",
            features: ["Express.js", "Sequelize", "REST API", "NPM", "PM2", "Nodemon", "Puppeteer", "OpenAI", "GCloud"]
          }
        ]
      },
      {
        name: "Other",
        technologies: [
          {
            name: "Git",
            features: ["GitHub", "Git CLI", "Github Copilot"]
          },
          {
            name: "Docker",
            features: ["Docker Compose", "Docker Hub", "Docker Desktop", "Docker CLI", "Dockerfile"]
          },
          {
            name: "Linux",
            features: ["Ubuntu", "Debian", "Fedora"]
          },
          {
            name: "Apache",
            features: ["Virtual Hosts", "Modules", "Configuration"]
          },
          {
            name: "Others",
            features: ["Jira", "Trello", "Slack", "Jenkins", "PhpStorm", "VS Code", "Postman", "Python (PySpark, Pandas, NumPy, Matplotlib)", "Java", "C#"]
          }
        ]
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_icon = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["skills-chart", { "active": unref(skillsChartStore).visible }]
      }, _attrs))} data-v-4e0fb917><div class="skills-chart__container" data-v-4e0fb917><button class="skills-chart__close" data-v-4e0fb917>`);
      _push(ssrRenderComponent(_component_icon, {
        name: "material-symbols:close-small",
        class: "w-15 h-15 text-5xl"
      }, null, _parent));
      _push(`</button><div class="skills-chart__content" data-v-4e0fb917><h2 class="title--x-large title--condensed" data-v-4e0fb917><span data-v-4e0fb917>${_ctx.$t("mySkillsTitle")}</span></h2><p class="leading-7 mt-5" data-v-4e0fb917><span style="${ssrRenderStyle({ "transition-delay": ".6s" })}" data-v-4e0fb917>${_ctx.$t("mySkillsDescription")}</span></p><!--[-->`);
      ssrRenderList(unref(items), (item) => {
        _push(`<div data-v-4e0fb917><h3 class="title--large mt-10 mb-4" data-v-4e0fb917>${ssrInterpolate(item.name)}</h3><table class="w-full shadow-md text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-lg overflow-hidden" data-v-4e0fb917><thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400" data-v-4e0fb917><tr data-v-4e0fb917><th class="px-6 py-3" data-v-4e0fb917>${ssrInterpolate(_ctx.$t("technologiesShort"))}</th><th class="px-6 py-3" data-v-4e0fb917>${ssrInterpolate(_ctx.$t("features"))}</th></tr></thead><!--[-->`);
        ssrRenderList(item.technologies, (technology) => {
          _push(`<tbody data-v-4e0fb917><tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" data-v-4e0fb917><td class="px-6 py-4" data-v-4e0fb917>${ssrInterpolate(technology.name)}</td><td class="px-6 py-4" data-v-4e0fb917><div class="flex flex-wrap gap-1 gap-y-3" data-v-4e0fb917><!--[-->`);
          ssrRenderList(technology.features, (feature) => {
            _push(`<div class="badge" data-v-4e0fb917>${ssrInterpolate(feature)}</div>`);
          });
          _push(`<!--]--></div></td></tr></tbody>`);
        });
        _push(`<!--]--></table></div>`);
      });
      _push(`<!--]--></div></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SkillsChart.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const SkillsChart = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-4e0fb917"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const modalStore = useModalStore();
    const skillsChartStore = useSkillsChartStore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Header = _sfc_main$7;
      const _component_SectionStart = __nuxt_component_1;
      const _component_SectionTechnologies = _sfc_main$4;
      const _component_ClientOnly = __nuxt_component_3;
      const _component_SectionSocials = _sfc_main$3;
      const _component_SectionCode = __nuxt_component_5;
      const _component_ModalContact = _sfc_main$8;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "app__container" }, _attrs))} data-v-a64f2a4e><div class="${ssrRenderClass([{ "app__main--offseted": unref(skillsChartStore).visible }, "app__main"])}" data-v-a64f2a4e>`);
      _push(ssrRenderComponent(_component_Header, null, null, _parent));
      _push(ssrRenderComponent(_component_SectionStart, null, null, _parent));
      _push(ssrRenderComponent(_component_SectionTechnologies, null, null, _parent));
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(ssrRenderComponent(_component_SectionSocials, null, null, _parent));
      _push(ssrRenderComponent(_component_SectionCode, null, null, _parent));
      _push(ssrRenderComponent(_sfc_main$6, null, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_ModalContact, {
        class: { "active": unref(modalStore).visible }
      }, null, _parent));
      _push(ssrRenderComponent(SkillsChart, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a64f2a4e"]]);

export { index as default };
//# sourceMappingURL=index-DbBo7yM8.mjs.map
