import{_ as g}from"./CaaMk3FD.js";import{f as m,z as v,o as r,c as i,a as s,t as n,h as o,A as y,d as p,m as S,b as c,w as $,q,P as C}from"./EeqhaEl4.js";import{_ as w}from"./q413MUpE.js";import{u as N}from"./BpmqpAf8.js";import{_ as k}from"./DlAUqK2U.js";import"./BCUAm9Av.js";const B={class:"form-control"},I={class:"label"},V={class:"label-text"},A={class:"input-group"},z=["placeholder","required"],D=m({__name:"textarea",props:{value:{type:String,default:null},class:{type:String,default:""},placeholder:{type:String,default:""},label:{type:String,default:""},required:{type:Boolean,default:!1}},setup(e){const t=e,a=v(()=>{let l=t.label;return t.required&&(l+=" *"),l});return(l,f)=>(r(),i("div",B,[s("label",I,[s("span",V,n(o(a))+":",1)]),s("label",A,[s("textarea",{rows:"10",placeholder:e.placeholder,class:y(["textarea textarea-bordered",t.class]),required:e.required},n(e.value),11,z)])]))}}),E={class:"flex justify-center"},P={class:"max-w-[768px] w-full"},j={class:"font-bold text-2xl"},R={key:0,class:"text-sm text-gray-500"},T={class:"flex gap-4 mt-4"},F=s("button",{class:"btn btn-neutral"},"Submit form",-1),G=m({__name:"form",props:{postId:{type:String,default:null}},setup(e){const t=N(),a=e;return a.postId&&t.fetchArticle(a.postId),(l,f)=>{var _,d,u;const h=g,x=D,b=w;return r(),i("div",E,[s("div",P,[s("h3",j,[p(n(e.postId?"Edit":"Create")+" post ",1),(_=o(t).article)!=null&&_.id?(r(),i("span",R,"(ID: "+n(o(t).article.id)+")",1)):S("",!0)]),c(h,{class:"w-full",label:"Name of article",placeholder:"Name",required:"",value:(d=o(t).article)==null?void 0:d.title},null,8,["value"]),c(x,{class:"w-full",label:"Content",required:"",value:(u=o(t).article)==null?void 0:u.content},null,8,["value"]),s("div",T,[c(b,{to:"/user/posts",class:"btn"},{default:$(()=>[p("Cancel")]),_:1}),F])])])}}}),H={};function J(e,t){const a=G;return r(),q(a,{"post-id":(e._.provides[C]||e.$route).params.slug},null,8,["post-id"])}const W=k(H,[["render",J]]);export{W as default};
