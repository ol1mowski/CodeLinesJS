const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Home-B9tj4kWR.js","assets/vendor-react-BveRBsS6.js","assets/vendor-other-zwwC5y-E.js","assets/app-components-Brw2HwQn.js","assets/vendor-framer-motion-CFDVWiQO.js","assets/vendor-charts-BAVkL9Pe.js","assets/app-community-SaG6gjES.js","assets/Auth-D3oscO8s.js"])))=>i.map(i=>d[i]);
import{r as n,aA as d,j as e,aB as p,aC as u,aD as m,aE as f,aF as h}from"./vendor-react-BveRBsS6.js";import{au as x}from"./vendor-other-zwwC5y-E.js";import{_ as l,E as i,R as E,P as g}from"./app-components-Brw2HwQn.js";import{D as j,a as y,S as P,L as _,b,c as L,G as O,d as S,C as R}from"./app-dashboard-q_HRqK--.js";import"./vendor-framer-motion-CFDVWiQO.js";import"./vendor-charts-BAVkL9Pe.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function c(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(t){if(t.ep)return;t.ep=!0;const r=c(t);fetch(t.href,r)}})();const D=n.lazy(()=>l(()=>import("./Home-B9tj4kWR.js"),__vite__mapDeps([0,1,2,3,4,5,6]))),C=n.lazy(()=>l(()=>import("./Auth-D3oscO8s.js"),__vite__mapDeps([7,1,2,3,4,5]))),A=d([{path:"/",element:e.jsx(D,{}),errorElement:e.jsx(i,{})},{path:"/logowanie",element:e.jsx(C,{})},{path:"/reset-password/:token",element:e.jsx(E,{})},{path:"/dashboard",element:e.jsx(g,{children:e.jsx(j,{})}),children:[{index:!0,element:e.jsx(y,{})},{path:"stats",element:e.jsx(P,{})},{path:"learn",element:e.jsx(_,{})},{path:"learn/lesson/:lessonSlug",element:e.jsx(b,{})},{path:"settings",element:e.jsx(L,{})},{path:"play",element:e.jsx(O,{})},{path:"play/:slug",element:e.jsx(S,{})},{path:"code",element:e.jsx(R,{})}]},{path:"*",element:e.jsx(i,{})}]),G="466348895611-kdgecrm842jsilesaj0s0c5bnqn7maiq.apps.googleusercontent.com",I=new x;function v(){return e.jsxs(p,{client:I,children:[e.jsx(u,{position:"top-right",toastOptions:{duration:3e3,style:{background:"#1E1E1E",color:"#fff",border:"1px solid rgba(247, 223, 30, 0.1)"},success:{iconTheme:{primary:"#F7DF1E",secondary:"#1E1E1E"}},error:{iconTheme:{primary:"#ff4b4b",secondary:"#1E1E1E"}}}}),e.jsx(m,{clientId:G,onScriptLoadError:()=>console.error("Google Script failed to load"),children:e.jsx(f,{router:A})})]})}h.createRoot(document.getElementById("root")).render(e.jsx(n.StrictMode,{children:e.jsx(v,{})}));
