import{_ as u,a as f}from"./4WQfQqru.js";import{_ as x}from"./DTwm4p8q.js";import{f as g,k as b,l as v,o,c as n,b as r,a as e,t as a,h as t,q as m,m as k,F as y,n as B}from"./EeqhaEl4.js";import{u as w}from"./BpmqpAf8.js";import{_ as C}from"./DlAUqK2U.js";import"./q413MUpE.js";import"./DH3sX0r8.js";import"./Bcw-ZHf8.js";import"./BCUAm9Av.js";const F={class:"container mx-auto pt-32"},N={class:"text-2xl font-bold px-4"},S={class:"text-xl mt-4 px-4"},V={class:"blog__container"},A={class:"blog__articles"},D={class:"text-2xl mb-4"},I={key:1},$={class:"blog__side"},q={class:"text-2xl mb-4"},E={class:"flex flex-col gap-8"},H={key:0},L=g({__name:"index",async setup(j){let _,i;const s=b(),c=w();return[_,i]=v(()=>c.fetchData({limit:4,lang:s.locale.value})),await _,i(),(z,G)=>{const d=u,l=x,p=f;return o(),n("div",null,[r(d,{white:""}),e("div",F,[e("h1",N,a(t(s).t("blog")),1),e("p",S,a(t(s).t("blog_subtitle")),1),e("div",V,[e("div",A,[e("h3",D,a(t(s).t("featured_article")),1),t(c).articles.length>0?(o(),m(l,{key:0,article:t(c).articles[0]},null,8,["article"])):(o(),n("p",I,a(t(s).t("no_articles_found")),1))]),e("div",$,[e("h3",q,a(t(s).t("recent_articles")),1),e("div",E,[t(c).articles.length===0?(o(),n("p",H,a(t(s).t("no_articles_found")),1)):k("",!0),(o(!0),n(y,null,B(t(c).articles,h=>(o(),m(l,{article:h,"hide-description":"",column:""},null,8,["article"]))),256))])])])]),r(p,{class:"mt-24"})])}}}),W=C(L,[["__scopeId","data-v-f9e05448"]]);export{W as default};
