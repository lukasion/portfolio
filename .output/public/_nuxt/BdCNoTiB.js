import{u as c}from"./B6D0HFOi.js";import{B as n,r as i}from"./DjdpzcTi.js";const v=n("articles",()=>{const u=i([]),e=i(null);async function l(t){const{data:a}=await c("/api/articles",{params:t},"$md08FJB6Fz");a.value&&(u.value=a.value)}async function r(t){const{data:a}=await c(`/api/articles/${t}`,"$vFb3E4SRhb");a.value&&(e.value=a.value)}async function s(t){const{data:a}=await c(`/api/articles/${t}`,"$Wu5fGNwafs");return a.value?(e.value=a.value,a.value):null}return{articles:u,article:e,fetchData:l,fetchArticle:r,fetchBySlug:s}});export{v as u};
