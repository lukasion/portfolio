import{u as _}from"./Dq9W61ck.js";import{f as i,o as e,c as o,a as t,F as a,x as d,t as r,h as u,y as m}from"./BawFqWv5.js";import{_ as p}from"./DlAUqK2U.js";import"./C8epUi9W.js";const f=t("h4",{class:"text-xl font-bold mb-4"},"List of articles to be generated",-1),h={class:"table table-zebra border border-gray-200 rounded-md shadow"},b=t("thead",null,[t("tr",null,[t("th",null,"ID"),t("th",null,"Title"),t("th",null,"When will be generated")])],-1),x=t("div",{class:"text-center mt-4"},[t("a",{class:"btn btn-neutral",href:"/user/topics/form"},"Create new topic")],-1),g=i({__name:"list",setup(c){const s=_();return s.fetchTopics(),(l,k)=>(e(),o(a,null,[f,t("table",h,[b,t("tbody",null,[(e(!0),o(a,null,d(u(s).topics,n=>(e(),o("tr",null,[t("td",null,r(n.id),1),t("td",null,r(n.name),1),t("td",null,r(n.datetime),1)]))),256))])]),x],64))}}),y={};function B(c,s){const l=g;return e(),m(l)}const D=p(y,[["render",B]]);export{D as default};
