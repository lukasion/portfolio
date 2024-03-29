import{_ as B}from"./Cr9zDhfK.js";import{f,r as v,z,A as Y,c as h,B as N,C as b,o as m,a as e,h as n,D as g,j as I,d as c,b as l,E as D,t as w,g as S,v as $,F as M,x as E,q as L,p as G,e as O,w as H}from"./BVm-AVlz.js";import{u as x,_ as W}from"./COpLjL13.js";import k from"./gK8BnHoo.js";import{_ as P}from"./DlAUqK2U.js";import"./Z0hSKbSJ.js";import"./Bcw-ZHf8.js";const X=Symbol.for("nuxt:client-only"),R=f({name:"ClientOnly",inheritAttrs:!1,props:["fallback","placeholder","placeholderTag","fallbackTag"],setup(d,{slots:t,attrs:i}){const o=v(!1);return z(()=>{o.value=!0}),Y(X,!0),s=>{var _;if(o.value)return(_=t.default)==null?void 0:_.call(t);const a=t.fallback||t.placeholder;if(a)return a();const r=s.fallback||s.placeholder||"",p=s.fallbackTag||s.placeholderTag||"span";return h(p,i,r)}}}),C=N("skillsChart",()=>{const d=v(!1);return{visible:d,toggle:i=>{d.value=i}}});class F{constructor(){this.cnv=document.querySelector("canvas"),this.ctx=this.cnv.getContext("2d"),this.circlesNum=15,this.minRadius=400,this.maxRadius=400,this.speed=.005,(window.onresize=()=>{this.setCanvasSize(),this.createCircles()})(),this.drawAnimation()}setCanvasSize(){this.w=this.cnv.width=innerWidth*devicePixelRatio,this.h=this.cnv.height=innerHeight*devicePixelRatio,this.ctx.scale(devicePixelRatio,devicePixelRatio)}createCircles(){this.circles=[];for(let t=0;t<this.circlesNum;++t)this.circles.push(new q(this.w,this.h,this.minRadius,this.maxRadius))}drawCircles(){this.circles.forEach(t=>t.draw(this.ctx,this.speed))}clearCanvas(){this.ctx.clearRect(0,0,this.w,this.h)}drawAnimation(){this.clearCanvas(),this.drawCircles(),window.requestAnimationFrame(()=>this.drawAnimation())}}class q{constructor(t,i,o,s){this.x=Math.random()*t,this.y=Math.random()*i,this.angle=Math.random()*Math.PI*2,this.radius=Math.random()*(s-o)+o;const a=Math.random()*70+Math.random()*60+Math.random()*60+260,r=Math.random()*70+Math.random()*60+Math.random()*60+260;this.firstColor=`hsla(${a}, 100%, 70%, 1)`,this.secondColor=`hsla(${r}, 100%, 50%, 0)`,console.log(this.firstColor,this.secondColor)}draw(t,i){this.angle+=i;const o=this.x+Math.cos(this.angle)*200,s=this.y+Math.sin(this.angle)*200,a=t.createRadialGradient(o,s,0,o,s,this.radius);a.addColorStop(0,this.firstColor),a.addColorStop(1,this.secondColor),t.globalCompositeOperation="overlay",t.fillStyle=a,t.beginPath(),t.arc(o,s,this.radius,0,Math.PI*2),t.fill()}}const Q={class:"section__start section__wrapper"},U=I('<div class="section__background"><canvas id="canvas" width="32px" height="32px"></canvas></div><div class="mt-48 mx-auto container relative"><h2 class="title--ultra-large title--condensed title--slide-from-bottom element--visible" style="mix-blend-mode:overlay;"><span>Websites done <br>the right way!</span></h2><h2 class="title--ultra-large title--condensed title--slide-from-bottom element--visible" style="position:absolute;top:0;left:0;opacity:0.4;"><span>Websites done <br>the right way!</span></h2></div>',2),J={class:"section__container section__container--small-padding-top"},K=e("span",{style:{"transition-delay":".6s"}},[c(" I am a web developer based in Katowice, Poland. I specialise in building websites and web applications using modern technologies. "),e("br"),c("If you are a business seeking a web presence or an employer looking to hire, you can get in touch with me here. ")],-1),Z=[K],ee=f({__name:"Start",setup(d){const t=C(),i=b("onElementVisible"),o=()=>{x().visible=!0};return z(()=>{new F}),(s,a)=>(m(),h("section",Q,[U,e("div",J,[e("p",{class:"leading-7 title--slide-from-left",ref:n(i)},Z,512),e("div",{class:"title--slide-from-bottom flex gap-3",ref:n(i)},[e("button",{type:"button",class:"form__button",onClick:g(o,["prevent"])}," Let's colaborate on a project "),e("button",{class:"form__button form__button--darker",onClick:a[0]||(a[0]=g(r=>n(t).toggle(!0),["prevent"]))}," Checkout my skills chart ")],512)])]))}}),te={class:"section__wrapper"},se={class:"section__container"},ie=e("span",null,"Technologies I use in my projects",-1),ne=[ie],oe=e("span",{style:{"transition-delay":".6s"}},[c(" As a web developer, I have experience with a wide range of technologies. I have worked with Laravel, Vue.js, Nuxt 3, Tailwind CSS, and many other technologies. "),e("br"),c("I am always trying to gain new skills and improve my knowledge of the technologies I already know. Below you can find a list of the technologies I use in my projects everyday. If you are interested in working with me, feel free to contact me. I am always open to new opportunities. ")],-1),ae=[oe],le={class:"technology__container mt-12"},re={href:"https://github.com/lukasion/portfolio/tree/main",target:"_blank",class:"technology__item"},ce=e("p",{class:"technology__title"}," Checkout my work ",-1),de={href:"https://github.com/lukasion/portfolio/tree/main/laravel-api",target:"_blank",class:"technology__item",style:{"transition-delay":".6s"}},he=e("p",{class:"technology__title"}," Checkout my work ",-1),me={class:"technology__item",style:{"transition-delay":".9s"}},_e={class:"technology__item",style:{"transition-delay":"1.2s"}},pe={class:"technology__item",style:{"transition-delay":"1.5s"}},ue={href:"https://github.com/lukasion/portfolio/tree/main",target:"_blank",class:"technology__item",style:{"transition-delay":"1.8s"}},ge=e("p",{class:"technology__title"}," Checkout my work ",-1),ve={href:"https://github.com/lukasion/portfolio/tree/main",target:"_blank",class:"technology__item",style:{"transition-delay":"2.1s"}},fe=e("p",{class:"technology__title"}," Checkout my work ",-1),be={href:"https://github.com/lukasion/portfolio/tree/main/laravel-api",target:"_blank",class:"technology__item",style:{"transition-delay":"2.4s"}},ye=e("p",{class:"technology__title"}," Checkout my work ",-1),we={href:"https://github.com/lukasion/portfolio/tree/main/assets/scss",target:"_blank",class:"technology__item",style:{"transition-delay":"2.7s"}},xe=e("p",{class:"technology__title"}," Checkout my work ",-1),ke={href:"https://github.com/lukasion/portfolio/tree/main/assets/scss",target:"_blank",class:"technology__item",style:{"transition-delay":"3.0s"}},Ce=e("p",{class:"technology__title"}," Checkout my work ",-1),Se={class:"technology__item",style:{"transition-delay":"3.3s"}},$e={class:"technology__item",style:{"transition-delay":"3.6s"}},Me={class:"technology__item",style:{"transition-delay":"3.9s"}},Ee=f({__name:"Technologies",setup(d){const t=b("onElementVisible");return(i,o)=>{const s=k;return m(),h("section",te,[e("div",se,[e("h2",{class:"title--x-large title--condensed title--slide-from-bottom",ref:n(t)},ne,512),e("p",{class:"leading-7 mt-5 title--slide-from-left",ref:n(t)},ae,512),e("div",le,[e("div",{class:"technology__item-wrapper title--slide-from-bottom",ref:n(t)},[e("a",re,[e("div",null,[l(s,{name:"logos:vue",size:"48px"}),c(" Vue.js ")]),ce])],512),e("div",{class:"technology__item-wrapper title--slide-from-bottom",ref:n(t)},[e("a",de,[e("div",null,[l(s,{name:"logos:laravel",size:"48px"}),c(" Laravel ")]),he])],512),e("div",{class:"technology__item-wrapper title--slide-from-bottom",ref:n(t)},[e("span",me,[e("div",null,[l(s,{name:"devicon:livewire",size:"48px"}),c(" Livewire ")])])],512),e("div",{class:"technology__item-wrapper title--slide-from-bottom",ref:n(t)},[e("span",_e,[e("div",null,[l(s,{name:"logos:alpinejs-icon",size:"48px"}),c(" Alpine.js ")])])],512),e("div",{class:"technology__item-wrapper title--slide-from-bottom",ref:n(t)},[e("span",pe,[e("div",null,[l(s,{name:"logos:react",size:"48px"}),c(" React ")])])],512),e("div",{class:"technology__item-wrapper title--slide-from-bottom",ref:n(t)},[e("a",ue,[e("div",null,[l(s,{name:"logos:nuxt-icon",size:"48px"}),c(" Nuxt ")]),ge])],512),e("div",{class:"technology__item-wrapper title--slide-from-bottom",ref:n(t)},[e("a",ve,[e("div",null,[l(s,{name:"logos:nodejs",size:"48px"}),c(" Node.js ")]),fe])],512),e("div",{class:"technology__item-wrapper title--slide-from-bottom",ref:n(t)},[e("a",be,[e("div",null,[l(s,{name:"logos:php-alt",size:"48px"}),c(" PHP ")]),ye])],512),e("div",{class:"technology__item-wrapper title--slide-from-bottom",ref:n(t)},[e("a",we,[e("div",null,[l(s,{name:"vscode-icons:file-type-scss2",size:"48px"}),c(" SCSS ")]),xe])],512),e("div",{class:"technology__item-wrapper title--slide-from-bottom",ref:n(t)},[e("a",ke,[e("div",null,[l(s,{name:"logos:tailwindcss-icon",size:"48px"}),c(" Tailwind ")]),Ce])],512),e("div",{class:"technology__item-wrapper title--slide-from-bottom",ref:n(t)},[e("span",Se,[e("div",null,[l(s,{name:"logos:docker-icon",size:"48px"}),c(" Docker ")])])],512),e("div",{class:"technology__item-wrapper title--slide-from-bottom",ref:n(t)},[e("span",$e,[e("div",null,[l(s,{name:"logos:git",size:"48px"}),c(" Git ")])])],512),e("div",{class:"technology__item-wrapper title--slide-from-bottom",ref:n(t)},[e("span",Me,[e("div",null,[l(s,{name:"logos:github-copilot",size:"48px"}),c(" GitHub Copilot ")])])],512)])])])}}});class u{constructor(t,i={}){if(!(t instanceof Node))throw"Can't initialize VanillaTilt because "+t+" is not a Node.";this.width=null,this.height=null,this.clientWidth=null,this.clientHeight=null,this.left=null,this.top=null,this.gammazero=null,this.betazero=null,this.lastgammazero=null,this.lastbetazero=null,this.transitionTimeout=null,this.updateCall=null,this.event=null,this.updateBind=this.update.bind(this),this.resetBind=this.reset.bind(this),this.element=t,this.settings=this.extendSettings(i),this.reverse=this.settings.reverse?-1:1,this.resetToStart=u.isSettingTrue(this.settings["reset-to-start"]),this.glare=u.isSettingTrue(this.settings.glare),this.glarePrerender=u.isSettingTrue(this.settings["glare-prerender"]),this.fullPageListening=u.isSettingTrue(this.settings["full-page-listening"]),this.gyroscope=u.isSettingTrue(this.settings.gyroscope),this.gyroscopeSamples=this.settings.gyroscopeSamples,this.elementListener=this.getElementListener(),this.glare&&this.prepareGlare(),this.fullPageListening&&this.updateClientSize(),this.addEventListeners(),this.reset(),this.resetToStart===!1&&(this.settings.startX=0,this.settings.startY=0)}static isSettingTrue(t){return t===""||t===!0||t===1}getElementListener(){if(this.fullPageListening)return window.document;if(typeof this.settings["mouse-event-element"]=="string"){const t=document.querySelector(this.settings["mouse-event-element"]);if(t)return t}return this.settings["mouse-event-element"]instanceof Node?this.settings["mouse-event-element"]:this.element}addEventListeners(){this.onMouseEnterBind=this.onMouseEnter.bind(this),this.onMouseMoveBind=this.onMouseMove.bind(this),this.onMouseLeaveBind=this.onMouseLeave.bind(this),this.onWindowResizeBind=this.onWindowResize.bind(this),this.onDeviceOrientationBind=this.onDeviceOrientation.bind(this),this.elementListener.addEventListener("mouseenter",this.onMouseEnterBind),this.elementListener.addEventListener("mouseleave",this.onMouseLeaveBind),this.elementListener.addEventListener("mousemove",this.onMouseMoveBind),(this.glare||this.fullPageListening)&&window.addEventListener("resize",this.onWindowResizeBind),this.gyroscope&&window.addEventListener("deviceorientation",this.onDeviceOrientationBind)}removeEventListeners(){this.elementListener.removeEventListener("mouseenter",this.onMouseEnterBind),this.elementListener.removeEventListener("mouseleave",this.onMouseLeaveBind),this.elementListener.removeEventListener("mousemove",this.onMouseMoveBind),this.gyroscope&&window.removeEventListener("deviceorientation",this.onDeviceOrientationBind),(this.glare||this.fullPageListening)&&window.removeEventListener("resize",this.onWindowResizeBind)}destroy(){clearTimeout(this.transitionTimeout),this.updateCall!==null&&cancelAnimationFrame(this.updateCall),this.element.style.willChange="",this.element.style.transition="",this.element.style.transform="",this.resetGlare(),this.removeEventListeners(),this.element.vanillaTilt=null,delete this.element.vanillaTilt,this.element=null}onDeviceOrientation(t){if(t.gamma===null||t.beta===null)return;this.updateElementPosition(),this.gyroscopeSamples>0&&(this.lastgammazero=this.gammazero,this.lastbetazero=this.betazero,this.gammazero===null?(this.gammazero=t.gamma,this.betazero=t.beta):(this.gammazero=(t.gamma+this.lastgammazero)/2,this.betazero=(t.beta+this.lastbetazero)/2),this.gyroscopeSamples-=1);const i=this.settings.gyroscopeMaxAngleX-this.settings.gyroscopeMinAngleX,o=this.settings.gyroscopeMaxAngleY-this.settings.gyroscopeMinAngleY,s=i/this.width,a=o/this.height,r=t.gamma-(this.settings.gyroscopeMinAngleX+this.gammazero),p=t.beta-(this.settings.gyroscopeMinAngleY+this.betazero),_=r/s,y=p/a;this.updateCall!==null&&cancelAnimationFrame(this.updateCall),this.event={clientX:_+this.left,clientY:y+this.top},this.updateCall=requestAnimationFrame(this.updateBind)}onMouseEnter(){this.updateElementPosition(),this.element.style.willChange="transform",this.setTransition()}onMouseMove(t){this.updateCall!==null&&cancelAnimationFrame(this.updateCall),this.event=t,this.updateCall=requestAnimationFrame(this.updateBind)}onMouseLeave(){this.setTransition(),this.settings.reset&&requestAnimationFrame(this.resetBind)}reset(){this.onMouseEnter(),this.fullPageListening?this.event={clientX:(this.settings.startX+this.settings.max)/(2*this.settings.max)*this.clientWidth,clientY:(this.settings.startY+this.settings.max)/(2*this.settings.max)*this.clientHeight}:this.event={clientX:this.left+(this.settings.startX+this.settings.max)/(2*this.settings.max)*this.width,clientY:this.top+(this.settings.startY+this.settings.max)/(2*this.settings.max)*this.height};let t=this.settings.scale;this.settings.scale=1,this.update(),this.settings.scale=t,this.resetGlare()}resetGlare(){this.glare&&(this.glareElement.style.transform="rotate(180deg) translate(-50%, -50%)",this.glareElement.style.opacity="0")}getValues(){let t,i;this.fullPageListening?(t=this.event.clientX/this.clientWidth,i=this.event.clientY/this.clientHeight):(t=(this.event.clientX-this.left)/this.width,i=(this.event.clientY-this.top)/this.height),t=Math.min(Math.max(t,0),1),i=Math.min(Math.max(i,0),1);let o=(this.reverse*(this.settings.max-t*this.settings.max*2)).toFixed(2),s=(this.reverse*(i*this.settings.max*2-this.settings.max)).toFixed(2),a=Math.atan2(this.event.clientX-(this.left+this.width/2),-(this.event.clientY-(this.top+this.height/2)))*(180/Math.PI);return{tiltX:o,tiltY:s,percentageX:t*100,percentageY:i*100,angle:a}}updateElementPosition(){let t=this.element.getBoundingClientRect();this.width=this.element.offsetWidth,this.height=this.element.offsetHeight,this.left=t.left,this.top=t.top}update(){let t=this.getValues();this.element.style.transform="perspective("+this.settings.perspective+"px) rotateX("+(this.settings.axis==="x"?0:t.tiltY)+"deg) rotateY("+(this.settings.axis==="y"?0:t.tiltX)+"deg) scale3d("+this.settings.scale+", "+this.settings.scale+", "+this.settings.scale+")",this.glare&&(this.glareElement.style.transform=`rotate(${t.angle}deg) translate(-50%, -50%)`,this.glareElement.style.opacity=`${t.percentageY*this.settings["max-glare"]/100}`),this.element.dispatchEvent(new CustomEvent("tiltChange",{detail:t})),this.updateCall=null}prepareGlare(){if(!this.glarePrerender){const t=document.createElement("div");t.classList.add("js-tilt-glare");const i=document.createElement("div");i.classList.add("js-tilt-glare-inner"),t.appendChild(i),this.element.appendChild(t)}this.glareElementWrapper=this.element.querySelector(".js-tilt-glare"),this.glareElement=this.element.querySelector(".js-tilt-glare-inner"),!this.glarePrerender&&(Object.assign(this.glareElementWrapper.style,{position:"absolute",top:"0",left:"0",width:"100%",height:"100%",overflow:"hidden","pointer-events":"none","border-radius":"inherit"}),Object.assign(this.glareElement.style,{position:"absolute",top:"50%",left:"50%","pointer-events":"none","background-image":"linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)",transform:"rotate(180deg) translate(-50%, -50%)","transform-origin":"0% 0%",opacity:"0"}),this.updateGlareSize())}updateGlareSize(){if(this.glare){const t=(this.element.offsetWidth>this.element.offsetHeight?this.element.offsetWidth:this.element.offsetHeight)*2;Object.assign(this.glareElement.style,{width:`${t}px`,height:`${t}px`})}}updateClientSize(){this.clientWidth=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,this.clientHeight=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight}onWindowResize(){this.updateGlareSize(),this.updateClientSize()}setTransition(){clearTimeout(this.transitionTimeout),this.element.style.transition=this.settings.speed+"ms "+this.settings.easing,this.glare&&(this.glareElement.style.transition=`opacity ${this.settings.speed}ms ${this.settings.easing}`),this.transitionTimeout=setTimeout(()=>{this.element.style.transition="",this.glare&&(this.glareElement.style.transition="")},this.settings.speed)}extendSettings(t){let i={reverse:!1,max:15,startX:0,startY:0,perspective:1e3,easing:"cubic-bezier(.03,.98,.52,.99)",scale:1,speed:300,transition:!0,axis:null,glare:!1,"max-glare":1,"glare-prerender":!1,"full-page-listening":!1,"mouse-event-element":null,reset:!0,"reset-to-start":!0,gyroscope:!0,gyroscopeMinAngleX:-45,gyroscopeMaxAngleX:45,gyroscopeMinAngleY:-45,gyroscopeMaxAngleY:45,gyroscopeSamples:10},o={};for(var s in i)if(s in t)o[s]=t[s];else if(this.element.hasAttribute("data-tilt-"+s)){let a=this.element.getAttribute("data-tilt-"+s);try{o[s]=JSON.parse(a)}catch{o[s]=a}}else o[s]=i[s];return o}static init(t,i){t instanceof Node&&(t=[t]),t instanceof NodeList&&(t=[].slice.call(t)),t instanceof Array&&t.forEach(o=>{"vanillaTilt"in o||(o.vanillaTilt=new u(o,i))})}}typeof document<"u"&&(window.VanillaTilt=u,u.init(document.querySelectorAll("[data-tilt]")));const Le=u,ze={class:"section__dark section__wrapper"},Te={class:"section__container"},Ie=e("h2",{class:"title--x-large title--condensed"},"What can I offer?",-1),Pe={class:"collab__background"},Ae={class:"collab__content"},Ve=e("h2",{class:"title--large title--condensed"},"Websites",-1),je=e("p",null," The websites I build are fast, secure and easy to manage. I use the latest technologies to ensure your website is future-proof and scalable. ",-1),Be=e("div",{class:"collab__box collab__box--empty"},null,-1),Ye={class:"collab__background collab__background--on-demand"},Ne={class:"collab__content"},De=e("h2",{class:"title--large title--condensed"},"On-demand programming",-1),Ge=e("p",null," Do you need a custom solution for your business? I can build a web application tailored to your needs. I can also help you with your existing project. ",-1),Oe=e("div",{class:"collab__box collab__box--empty"},null,-1),He={class:"collab__background collab__background--seo"},We={class:"collab__content"},Xe=e("h2",{class:"title--large title--condensed"},"SEO",-1),Re=e("p",null," Search Engine Optimisation is a crucial part of any website. I can help you improve your website's ranking in search engines. ",-1),Fe=e("div",{class:"collab__box collab__box--empty"},null,-1),qe=f({__name:"Collab",setup(d){const t=b("onElementVisible"),i=()=>{x().visible=!0},o=v([]),s=a=>{o.value.push(a)};return z(()=>{Le.init(o.value,{speed:200,glare:!0,"max-glare":.2,gyroscope:!1,perspective:700,scale:1.05})}),(a,r)=>(m(),h("div",ze,[e("div",Te,[Ie,e("div",{class:"collab__container",ref:n(t)},[e("div",{class:"collab__box",ref:s},[e("div",Pe,[e("div",Ae,[Ve,je,e("a",{class:"mt-5 block hover:underline hover:cursor-pointer",onClick:g(i,["prevent"])}," Create a website ")])])]),Be,e("div",{class:"collab__box",ref:s},[e("div",Ye,[e("div",Ne,[De,Ge,e("a",{class:"mt-5 block hover:underline hover:cursor-pointer",onClick:g(i,["prevent"])}," Maintain an existing project ")])])])],512),e("div",{class:"collab__container md:!mt-16",ref:n(t)},[Oe,e("div",{class:"collab__box",ref:s},[e("div",He,[e("div",We,[Xe,Re,e("a",{class:"mt-5 block hover:underline hover:cursor-pointer",onClick:g(i,["prevent"])}," Rank up my webpage ")])])]),Fe],512)])]))}}),Qe={class:"section__wrapper"},Ue={class:"section__container"},Je=e("span",null,"You can find me also here",-1),Ke=[Je],Ze=e("span",{style:{"transition-delay":".6s"}}," I am active on many social media platforms. You can find me primarily on GitHub, and LinkedIn. I am also available via email. If you want to get in touch with me, feel free to contact me on any of the platforms listed below. ",-1),et=[Ze],tt={class:"technology__container mt-12"},st={class:"technology__item"},it={class:"technology__item",style:{"transition-delay":"0.6s"}},nt={class:"technology__item",style:{"transition-delay":"0.9s"}},ot={class:"technology__item",style:{"transition-delay":"1.2s"}},at=f({__name:"Socials",setup(d){const t=b("onElementVisible");return(i,o)=>{const s=k;return m(),h("section",Qe,[e("div",Ue,[e("h2",{class:"title--x-large title--condensed title--slide-from-bottom",ref:n(t)},Ke,512),e("p",{class:"leading-7 mt-5 title--slide-from-left",ref:n(t)},et,512),e("div",tt,[e("div",{class:"technology__item-wrapper title--slide-from-bottom",ref:n(t)},[e("span",st,[e("div",null,[l(s,{name:"logos:github-icon",size:"48px"}),c(" GitHub ")])])],512),e("div",{class:"technology__item-wrapper title--slide-from-bottom",ref:n(t)},[e("span",it,[e("div",null,[l(s,{name:"logos:linkedin-icon",size:"48px"}),c(" LinkedIn ")])])],512),e("div",{class:"technology__item-wrapper title--slide-from-bottom",ref:n(t)},[e("span",nt,[e("div",null,[l(s,{name:"logos:facebook",size:"48px"}),c(" Facebook ")])])],512),e("div",{class:"technology__item-wrapper title--slide-from-bottom",ref:n(t)},[e("span",ot,[e("div",null,[l(s,{name:"logos:google-gmail",size:"48px"}),c(" Google Mail ")])])],512)])])])}}}),lt=window.setInterval,rt={class:"section__container"},ct=e("span",null,"About me",-1),dt=[ct],ht={key:0,class:"code__preloader"},mt={key:1,class:"code__container"},_t=I('<div data-line-nr="01" class="code__line"><div class="methods">class</div><span class="propname">Łukasz Fujarski</span><div class="methods">extends</div><div class="propname">Developer</div> { </div><div data-line-nr="02" class="code__line"><div class="dot">··</div><div class="comment"> // &quot;Don&#39;t comment bad code – rewrite it.&quot; - Brian Kernighan. </div></div><div data-line-nr="03" class="code__line"><div class="dot">··</div><div class="comment"> // &quot;Give someone a program; you frustrate them for a day; teach them how to program, and you frustrate them for a lifetime&quot; – David Leinweber. </div></div><div data-line-nr="04" class="code__line"></div><div data-line-nr="05" class="code__line"><div class="dot">··</div><div class="propname"><div class="methods">public string </div><span class="variable">$name</span><span class="methods">;</span></div></div><div data-line-nr="06" class="code__line"><div class="dot">··</div><div class="propname"><div class="methods">public string </div><span class="variable">$email</span><span class="methods">;</span></div></div><div data-line-nr="07" class="code__line"><div class="dot">··</div><div class="propname"><div class="methods">private string </div><span class="variable">$dayOfBirthTimestamp</span><span class="methods">;</span></div></div><div data-line-nr="08" class="code__line"></div><div data-line-nr="09" class="code__line"><div class="dot">··</div><div class="propname"><div class="methods">public function </div><span class="methodname">__construct</span>() </div></div><div data-line-nr="10" class="code__line"><div class="dot">··</div><div class="propname"> { </div></div><div data-line-nr="11" class="code__line"><div class="dot">·....·</div><span class="variable">$this<span class="arrow">-&gt;</span>name</span>                = <span class="string">&#39;Łukasz Fujarski&#39;;</span></div><div data-line-nr="12" class="code__line"><div class="dot">·....·</div><span class="variable">$this<span class="arrow">-&gt;</span>email</span>               = <span class="string">&#39;lukasz.fujarski@gmail.com&#39;;</span></div><div data-line-nr="13" class="code__line"><div class="dot">·....·</div><span class="variable">$this<span class="arrow">-&gt;</span>dayOfBirthTimestamp</span> = <span class="string">856059633;</span></div><div data-line-nr="14" class="code__line"><div class="dot">··</div><div class="propname"> } </div></div><div data-line-nr="15" class="code__line"></div><div data-line-nr="16" class="code__line"><div class="dot">··</div><div class="propname"><div class="methods">public function </div><span class="methodname">workExperience</span>(): <span class="methods">array</span></div></div><div data-line-nr="17" class="code__line"><div class="dot">··</div><div class="propname"> { </div></div><div data-line-nr="18" class="code__line"><div class="dot">······</div><div class="methods">return</div> [ </div><div data-line-nr="19" class="code__line"><div class="dot">······</div><div>     &#39;2022 - now&#39; =&gt; &#39;Full Stack Developer at <a href="https://tech-studio.pl/" target="_blank">Tech-Studio S.C.</a>&#39;, </div></div><div data-line-nr="20" class="code__line"><div class="dot">······</div><div>     &#39;2018 - 2022&#39; =&gt; &#39;PHP Developer at <a href="https://tech-studio.pl/" target="_blank">Tech-Studio S.C.</a>&#39; </div></div><div data-line-nr="21" class="code__line"><div class="dot">······</div><div> ]; </div></div><div data-line-nr="22" class="code__line"><div class="dot">··</div><div class="propname"> } </div></div><div data-line-nr="23" class="code__line"></div><div data-line-nr="24" class="code__line"><div class="dot">··</div><div class="propname"><div class="methods">public function </div><span class="methodname lg:tooltip" data-tip="Method defines only few of the technologies I&#39;ve worked with. Through the time working as web developer I&#39;ve gained experience in many more programming languages, frameworks and tools.">skills</span>(): <span class="methods">array</span></div></div><div data-line-nr="25" class="code__line"><div class="dot">··</div><div class="propname"> { </div></div><div data-line-nr="26" class="code__line"><div class="dot">······</div><div class="methods">return</div> [&#39;JavaScript&#39;, &#39;PHP&#39;, &#39;CSS&#39;, &#39;Laravel Framework&#39;, &#39;SCSS&#39;, &#39;Vue.js 2 &amp; 3&#39;, &#39;Nuxt.js&#39;, &#39;Tailwind CSS&#39;, &#39;Git&#39;, &#39;MySQL&#39;, &#39;Docker&#39;, &#39;Linux&#39;, &#39;Apache&#39;, &#39;Webpack&#39;, &#39;Composer&#39;, &#39;NPM&#39;, &#39;Node.js&#39;, &#39;Adobe Photoshop&#39;, &#39;Microsoft Office&#39;, &#39;Microsoft Excel&#39;, &#39;Microsoft SQL Server&#39;, &#39;Microsoft Power BI&#39;, &#39;Pinia&#39;, &#39;Vuex&#39;, &#39;Vuetify&#39;, &#39;Bootstrap&#39;, &#39;jQuery&#39;, &#39;HTML&#39;, &#39;REST API&#39;, &#39;Python&#39;, &#39;C#&#39;]; </div><div data-line-nr="27" class="code__line"><div class="dot">··</div><div class="propname"> } </div></div><div data-line-nr="28" class="code__line"><div class="propname"> } </div></div>',28),pt=[_t],ut={__name:"Code",setup(d){const t=v(!0),i=v("..."),o=v(null),s=b("onElementVisible"),a=C();return D(o,([{isIntersecting:p}],_)=>{p&&(o.value&&_.unobserve(o.value),setTimeout(()=>{t.value=!1},4e3),lt(()=>{i.value==="..."?i.value="":i.value+="."},300))}),(p,_)=>(m(),h("div",null,[e("div",rt,[e("h2",{class:"title--x-large title--condensed",ref:n(s)},dt,512),e("button",{class:"form__button form__button--dark",onClick:_[0]||(_[0]=g(y=>n(a).toggle(!0),["prevent"]))}," Checkout my skills chart ")]),e("div",{class:"code",ref_key:"editor",ref:o},[n(t)?(m(),h("div",ht,[c(" LOADING ENVIRONMENT "),e("span",null,w(n(i)),1)])):(m(),h("div",mt,pt))],512)]))}},gt=ut,vt={class:"modal"},ft={class:"modal__container"},bt={class:"modal__content"},yt=e("div",{class:"modal__header"},[e("h2",{class:"title--x-large title--condensed"},[e("span",null,"Get in touch with me")]),e("p",{class:"leading-7 mt-5"},[e("span",{style:{"transition-delay":".6s"}}," You can contact me via email, or by filling out the form below. I will try to respond as soon as possible. ")])],-1),wt={class:"modal__form"},xt={action:""},kt={class:"form__input-container"},Ct={class:"form__input-container"},St={class:"form__input-container"},$t={class:"modal__form-input"},Mt=f({__name:"Contact",setup(d){const t=x(),i=v({name:"",email:"",message:""});return(o,s)=>{const a=k;return m(),h("div",vt,[e("div",ft,[e("button",{class:"modal__close",onClick:s[0]||(s[0]=g(r=>n(t).visible=!1,["prevent"]))},[l(a,{name:"material-symbols:close-small",class:"w-15 h-15 text-5xl"})]),e("div",bt,[yt,e("div",wt,[e("form",xt,[e("div",kt,[S(e("input",{class:"form__input",t:"",type:"text",id:"name",placeholder:"Your name","onUpdate:modelValue":s[1]||(s[1]=r=>n(i).name=r)},null,512),[[$,n(i).name]])]),e("div",Ct,[S(e("input",{class:"form__input",type:"email",id:"email",placeholder:"Your e-mail address","onUpdate:modelValue":s[2]||(s[2]=r=>n(i).email=r)},null,512),[[$,n(i).email]])]),e("div",St,[S(e("textarea",{class:"form__input",id:"message",placeholder:"Your message","onUpdate:modelValue":s[3]||(s[3]=r=>n(i).message=r)},null,512),[[$,n(i).message]])]),e("div",$t,[e("button",{onClick:s[4]||(s[4]=g(r=>n(t).submit(n(i)),["prevent"])),class:"form__button form__button--dark"}," Contact request ")])])])])])])}}}),T=d=>(G("data-v-8e51be11"),d=d(),O(),d),Et={class:"skills-chart__container"},Lt={class:"skills-chart__content"},zt=T(()=>e("h2",{class:"title--x-large title--condensed"},[e("span",null,"My skills chart")],-1)),Tt=T(()=>e("p",{class:"leading-7 mt-5"},[e("span",{style:{"transition-delay":".6s"}}," Here you can see my skills chart. I have divided my skills into three categories: frontend, backend, and other. You can see the percentage of my skills in each category. ")],-1)),It={class:"title--large mt-10 mb-4"},Pt={class:"w-full shadow-md text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-lg overflow-hidden"},At=T(()=>e("thead",{class:"text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"},[e("tr",null,[e("th",{class:"px-6 py-3"},"Technologies"),e("th",{class:"px-6 py-3"},"Features")])],-1)),Vt={class:"bg-white border-b dark:bg-gray-800 dark:border-gray-700"},jt={class:"px-6 py-4"},Bt={class:"px-6 py-4"},Yt={class:"flex flex-wrap gap-1 gap-y-3"},Nt={class:"badge"},Dt={__name:"SkillsChart",setup(d){const t=C(),i=v([{name:"Frontend",technologies:[{name:"Vue.js",features:["Vue 2","Vue 3","Composition API","Options API","Vuex Store","Vue Router","Pinia","Vite","Webpack","Quasar","Vuetfy","VCalendar","VueUse"]},{name:"Nuxt.js",features:["Nuxt 3","Nuxt Mapbox","Nuxt Mail","Nuxt Icon","Sidebase/Nuxt Auth"]},{name:"Others",features:["Tailwind CSS","Alpine.js","Bootstrap","jQuery"]}]},{name:"Backend",technologies:[{name:"Laravel",features:["Laravel 7-10","Livewire","Sanctum","Sail","Spatie","Passport","Tinker","Mix","Homestead","Sail","Queues","Jobs","MVC","Migrations & Seeders","Requests","Cache","Mails","Broadcasts","Notifications","Task Scheduling","Hashing"]},{name:"Livewire",features:["Livewire 3"]},{name:"Symfony",features:["Twig","Doctrine","Console","Forms","Routing","Validator","Yaml"]},{name:"Node.js",features:["Express.js","Sequelize","REST API","NPM","PM2","Nodemon","Puppeteer","OpenAI","GCloud"]}]},{name:"Other",technologies:[{name:"Git",features:["GitHub","Git CLI","Github Copilot"]},{name:"Docker",features:["Docker Compose","Docker Hub","Docker Desktop","Docker CLI","Dockerfile"]},{name:"Linux",features:["Ubuntu","Debian","Fedora"]},{name:"Apache",features:["Virtual Hosts","Modules","Configuration"]}]}]);return(o,s)=>{const a=k;return m(),h("div",{class:L(["skills-chart",{active:n(t).visible}])},[e("div",Et,[e("button",{class:"skills-chart__close",onClick:s[0]||(s[0]=g(r=>n(t).toggle(!1),["prevent"]))},[l(a,{name:"material-symbols:close-small",class:"w-15 h-15 text-5xl"})]),e("div",Lt,[zt,Tt,(m(!0),h(M,null,E(n(i),r=>(m(),h("div",null,[e("h3",It,w(r.name),1),e("table",Pt,[At,(m(!0),h(M,null,E(r.technologies,p=>(m(),h("tbody",null,[e("tr",Vt,[e("td",jt,w(p.name),1),e("td",Bt,[e("div",Yt,[(m(!0),h(M,null,E(p.features,_=>(m(),h("div",Nt,w(_),1))),256))])])])]))),256))])]))),256))])])],2)}}},Gt=P(Dt,[["__scopeId","data-v-8e51be11"]]),Ot={class:"app__container"},Ht=f({__name:"index",setup(d){const t=x(),i=C();return(o,s)=>{const a=B,r=ee,p=Ee,_=qe,y=R,A=at,V=gt,j=Mt;return m(),h("div",Ot,[e("div",{class:L(["app__main",{"app__main--offseted":n(i).visible}])},[l(a),l(r),l(p),l(y,null,{default:H(()=>[l(_)]),_:1}),l(A),l(V),l(W)],2),l(j,{class:L({active:n(t).visible})},null,8,["class"]),l(Gt)])}}}),Jt=P(Ht,[["__scopeId","data-v-a64f2a4e"]]);export{Jt as default};
