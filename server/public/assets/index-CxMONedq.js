const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Home-D3k5NvFH.js","assets/vendor-react-vjBZjf4A.js","assets/vendor-other-Dz7oXl8k.js","assets/app-components-xMl63V6x.js","assets/vendor-framer-motion-I1SoX3Sb.js","assets/vendor-charts-DAWAqp4E.js","assets/app-community-DHLCDWie.js","assets/Auth-DzJFqzcg.js"])))=>i.map(i=>d[i]);
import{r as n,aA as d,j as e,aB as p,aC as u,aD as m,aE as f,aF as h}from"./vendor-react-vjBZjf4A.js";import{av as E}from"./vendor-other-Dz7oXl8k.js";import{_ as l,E as i,P as x}from"./app-components-xMl63V6x.js";import{D as y,a as j,S as g,L as _,b as P,c as L,G as b,d as O,C as S}from"./app-dashboard-KYkI9-lg.js";import"./vendor-framer-motion-I1SoX3Sb.js";import"./vendor-charts-DAWAqp4E.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function c(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(t){if(t.ep)return;t.ep=!0;const r=c(t);fetch(t.href,r)}})();const D=n.lazy(()=>l(()=>import("./Home-D3k5NvFH.js"),__vite__mapDeps([0,1,2,3,4,5,6]))),C=n.lazy(()=>l(()=>import("./Auth-DzJFqzcg.js"),__vite__mapDeps([7,1,2,3,4,5]))),R=d([{path:"/",element:e.jsx(D,{}),errorElement:e.jsx(i,{})},{path:"/logowanie",element:e.jsx(C,{})},{path:"/dashboard",element:e.jsx(x,{children:e.jsx(y,{})}),children:[{index:!0,element:e.jsx(j,{})},{path:"stats",element:e.jsx(g,{})},{path:"learn",element:e.jsx(_,{})},{path:"learn/lesson/:lessonSlug",element:e.jsx(P,{})},{path:"settings",element:e.jsx(L,{})},{path:"play",element:e.jsx(b,{})},{path:"play/:slug",element:e.jsx(O,{})},{path:"code",element:e.jsx(S,{})}]},{path:"*",element:e.jsx(i,{})}]),v="1232432432",A=new E;function G(){return e.jsxs(p,{client:A,children:[e.jsx(u,{position:"top-right",toastOptions:{duration:3e3,style:{background:"#1E1E1E",color:"#fff",border:"1px solid rgba(247, 223, 30, 0.1)"},success:{iconTheme:{primary:"#F7DF1E",secondary:"#1E1E1E"}},error:{iconTheme:{primary:"#ff4b4b",secondary:"#1E1E1E"}}}}),e.jsx(m,{clientId:v,onScriptLoadError:()=>console.error("Google Script failed to load"),children:e.jsx(f,{router:R})})]})}h.createRoot(document.getElementById("root")).render(e.jsx(n.StrictMode,{children:e.jsx(G,{})}));
