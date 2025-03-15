var e=Object.defineProperty,s=Object.defineProperties,a=Object.getOwnPropertyDescriptors,t=Object.getOwnPropertySymbols,r=Object.prototype.hasOwnProperty,i=Object.prototype.propertyIsEnumerable,l=(s,a,t)=>a in s?e(s,a,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[a]=t,n=(e,s)=>{for(var a in s||(s={}))r.call(s,a)&&l(e,a,s[a]);if(t)for(var a of t(s))i.call(s,a)&&l(e,a,s[a]);return e},d=(e,t)=>s(e,a(t));import{r as o,j as c,m,n as x,o as p,p as u,q as j,s as b}from"./vendor-react-D5MVGLae.js";import{C as g,H as h}from"./app-components-Bw9MqqoF.js";import{m as y,u as v}from"./vendor-framer-motion-Dhw391MV.js";const f=()=>{const[e,s]=o.useState(!1);return o.useEffect((()=>{const e=()=>{s(window.innerWidth<768)};return e(),window.addEventListener("resize",e),()=>window.removeEventListener("resize",e)}),[]),e},N=()=>c.jsxs("div",{className:"flex items-center justify-between border-b border-js/20 pb-4",children:[c.jsxs("div",{className:"flex items-center gap-3",children:[c.jsx("div",{className:"p-2 rounded-lg bg-js/10",children:c.jsx(y.div,{animate:{scale:[1,1.2,1]},transition:{duration:2,repeat:1/0},className:"text-js",children:c.jsx(m,{className:"w-6 h-6"})})}),c.jsx("h2",{className:"text-2xl font-bold text-js",children:"Statystyki Społeczności"})]}),c.jsx("span",{className:"text-sm text-gray-400",children:"Aktywność w tym tygodniu"})]}),w=o.memo((({icon:e,label:s,mainValue:a,subValue:t,trend:r,details:i,index:l})=>{const n=f(),d=c.jsxs(c.Fragment,{children:[c.jsxs("div",{className:"flex justify-between items-start mb-4",children:[c.jsx("div",{className:"p-3 rounded-lg bg-js/10 text-js \r\n                      group-hover:bg-js/20 group-hover:scale-110 transition-all duration-300",children:c.jsx(e,{className:"w-6 h-6"})}),c.jsx("span",{className:"text-sm font-medium text-green-400 bg-green-400/10 px-2 py-1 rounded",children:r})]}),c.jsxs("div",{className:"mb-3",children:[c.jsx("h3",{className:"text-sm font-medium text-gray-400 mb-1",children:s}),c.jsxs("div",{className:"flex flex-col",children:[c.jsx("span",{className:"text-3xl font-bold text-js",children:a}),c.jsx("span",{className:"text-sm text-gray-500 mt-1",children:t})]})]}),c.jsx("div",{className:"grid grid-cols-2 gap-4 pt-4 border-t border-js/10",children:i.map((e=>c.jsxs("div",{children:[c.jsx("p",{className:"text-xs text-gray-500 mb-1",children:e.label}),c.jsx("p",{className:"text-sm font-medium text-gray-300",children:e.value})]},e.label)))})]});return n?c.jsx("div",{className:"group relative p-6 rounded-xl border border-js/10 bg-dark/30 \r\n                     hover:border-js/20 hover:bg-dark/50 transition-all duration-300",children:d}):c.jsx(y.div,{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.5,delay:.1*l},className:"group relative p-6 rounded-xl border border-js/10 bg-dark/30 \r\n                 hover:border-js/20 hover:bg-dark/50 transition-all duration-300",children:d})}));w.displayName="StatCard";const k=o.memo((({users:e})=>{const s=f(),a=(e,a)=>{const t=c.jsxs("div",{className:"flex items-center justify-between group hover:bg-dark/50 p-3 rounded-lg \r\n                     transition-all duration-300",children:[c.jsxs("div",{className:"flex items-center gap-4",children:[c.jsxs("div",{className:"relative",children:[c.jsx("div",{className:"w-12 h-12 rounded-full bg-js/10 flex items-center justify-center text-2xl",children:e.avatar}),c.jsx(e.badge,{className:"absolute -top-1 -right-1 w-5 h-5 text-js"})]}),c.jsxs("div",{children:[c.jsx("p",{className:"font-medium text-gray-300",children:e.name}),c.jsxs("p",{className:"text-sm text-gray-500",children:[e.points," pkt"]})]})]}),s?c.jsxs("div",{className:"px-3 py-1 rounded-full bg-js/10 text-js text-sm font-medium",children:["#",a+1]}):c.jsxs(y.div,{whileHover:{scale:1.1},className:"px-3 py-1 rounded-full bg-js/10 text-js text-sm font-medium",children:["#",a+1]})]});return s?c.jsx("div",{children:t},e.name):c.jsx(y.div,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{delay:.1*a},children:t},e.name)};return s?c.jsxs("div",{className:"p-6 rounded-xl border border-js/10 bg-dark/30",children:[c.jsx("h3",{className:"text-xl font-bold text-js mb-4",children:"Top Programiści"}),c.jsx("div",{className:"space-y-4",children:e.map(((e,s)=>a(e,s)))})]}):c.jsxs(y.div,{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0},className:"p-6 rounded-xl border border-js/10 bg-dark/30",children:[c.jsx("h3",{className:"text-xl font-bold text-js mb-4",children:"Top Programiści"}),c.jsx("div",{className:"space-y-4",children:e.map(((e,s)=>a(e,s)))})]})}));k.displayName="LeaderboardCard";const T=[{icon:m,label:"Społeczność",mainValue:"5,234",subValue:"+156 w tym tygodniu",trend:"+12%",details:[{label:"Aktywni",value:"3,421"},{label:"Online",value:"642"}]},{icon:x,label:"Rozwiązania",mainValue:"12,456",subValue:"Średnio 45/dzień",trend:"+8%",details:[{label:"Zaakceptowane",value:"89%"},{label:"Code Review",value:"2,341"}]},{icon:p,label:"Projekty",mainValue:"1,289",subValue:"Aktywne repozytoria",trend:"+15%",details:[{label:"Współpraca",value:"456"},{label:"Pull Requests",value:"892"}]}],z=[{name:"Michał K.",points:"2,345",avatar:"👨‍💻",badge:u},{name:"Anna W.",points:"2,156",avatar:"👩‍💻",badge:j},{name:"Tomek L.",points:"1,987",avatar:"🧑‍💻",badge:j}],V=o.memo((()=>c.jsxs("div",{className:"w-full xl:w-1/2 space-y-8",children:[c.jsx(N,{}),c.jsx("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-6",children:T.map(((e,s)=>c.jsx(w,d(n({},e),{index:s}),e.label)))}),c.jsx(k,{users:z})]})));V.displayName="CommunityStats";const M=()=>c.jsxs("div",{className:"flex items-center justify-between border-b border-js/20 pb-4",children:[c.jsxs("div",{className:"flex items-center gap-3",children:[c.jsx("div",{className:"p-2 rounded-lg bg-js/10",children:c.jsx(y.div,{animate:{rotate:[0,10,0]},transition:{duration:2,repeat:1/0},className:"text-js",children:c.jsx(b,{className:"w-6 h-6"})})}),c.jsx("h2",{className:"text-2xl font-bold text-js",children:"Czat Społeczności"})]}),c.jsx("span",{className:"text-sm text-gray-400",children:"Online: 42"})]}),S=o.memo((({user:e,avatar:s,time:a,displayedMessage:t,isCurrentMessage:r,cursorVisible:i})=>c.jsxs(y.div,{initial:{opacity:0},animate:{opacity:t.length>0?1:0},transition:{duration:.3},className:"flex items-start gap-3",children:[c.jsx(y.div,{whileHover:{scale:1.2},className:"w-10 h-10 rounded-full bg-js/10 flex items-center justify-center text-xl",children:s}),c.jsxs("div",{className:"flex-1",children:[c.jsxs("div",{className:"flex items-center gap-2 mb-1",children:[c.jsx("span",{className:"font-bold text-js",children:e}),c.jsx("span",{className:"text-xs text-gray-500",children:a})]}),c.jsxs("div",{className:"p-3 rounded-lg bg-dark/50 border border-js/10 text-gray-300",children:[t,r&&c.jsx("span",{className:"ml-0.5 -mt-1 text-gray-300 "+(i?"opacity-100":"opacity-0"),children:"|"})]})]})]})));S.displayName="ChatMessage";const C=o.memo((({displayedText:e,cursorVisible:s,isTypingResponse:a})=>c.jsxs("div",{className:"flex gap-3",children:[c.jsxs("div",{className:"flex-1 bg-dark/50 border border-js/20 rounded-lg px-4 py-2 \r\n                    text-js/60 cursor-not-allowed select-none relative",children:[e,c.jsx("span",{className:"absolute ml-0.5 -mt-1 text-js/60 transition-opacity duration-100\n                     "+(s&&a?"opacity-100":"opacity-0"),children:"|"})]}),c.jsx(y.button,{animate:{opacity:a?.3:.6,scale:a?.95:1},disabled:!0,className:"px-6 py-2 rounded-lg bg-js/10 text-js/60 font-medium\r\n                 cursor-not-allowed select-none",children:a?"Pisanie...":"Wyślij"})]})));C.displayName="ChatInput";const O=[{user:"Anna",avatar:"👩‍💻",message:"Hej! Ktoś może pomóc z Promise w JS?",time:"12:01"},{user:"Michał",avatar:"👨‍💻",message:"Jasne! Z czym dokładnie masz problem?",time:"12:02"},{user:"Anna",avatar:"👩‍💻",message:"Nie do końca rozumiem async/await...",time:"12:03"},{user:"Tomek",avatar:"🧑‍💻",message:"Mogę pokazać ci kilka przykładów!",time:"12:04"}],P="Dziękuję za pomoc! 🙏",I=()=>{const e=o.useRef(null),s=v(e,{once:!0}),{displayedMessages:a,currentMessageIndex:t,displayedText:r,isTypingResponse:i,cursorVisible:l,setIsTypingMessage:m}=(()=>{const[e,s]=o.useState(O.map((()=>""))),[a,t]=o.useState(0),[r,i]=o.useState(!1),[l,n]=o.useState(""),[d,c]=o.useState(!1),[m,x]=o.useState(!0);return o.useEffect((()=>{const e=setInterval((()=>{x((e=>!e))}),500);return()=>clearInterval(e)}),[]),o.useEffect((()=>{if(r&&a<O.length){const r=O[a].message,i=e[a];if(i.length<r.length){const t=setTimeout((()=>{const t=[...e];t[a]=r.slice(0,i.length+1),s(t)}),50);return()=>clearTimeout(t)}setTimeout((()=>{t((e=>e+1))}),500)}else a!==O.length||d||setTimeout((()=>{c(!0)}),1e3)}),[r,a,e,d]),o.useEffect((()=>{if(d&&l.length<21){const e=setTimeout((()=>{n(P.slice(0,l.length+1))}),50);return()=>clearTimeout(e)}}),[d,l]),{displayedMessages:e,currentMessageIndex:a,isTypingMessage:r,displayedText:l,isTypingResponse:d,cursorVisible:m,setIsTypingMessage:i}})();return o.useEffect((()=>{s&&m(!0)}),[s,m]),c.jsxs("div",{ref:e,className:"p-6 space-y-4",children:[c.jsx(M,{}),c.jsx("div",{className:"space-y-4",children:O.map(((e,s)=>c.jsx(S,d(n({},e),{displayedMessage:a[s],isCurrentMessage:t===s,cursorVisible:l}),e.time)))}),c.jsx(C,{displayedText:r,cursorVisible:l,isTypingResponse:i})]})},E=()=>c.jsxs("div",{className:"flex flex-col xl:flex-row items-center justify-between gap-12 md:gap-16 w-full",children:[c.jsx(V,{}),c.jsx("div",{className:"w-full xl:w-1/2",children:c.jsx("div",{className:"rounded-xl border border-js/20 bg-dark/50 backdrop-blur-sm overflow-hidden shadow-xl",children:c.jsx(I,{})})})]}),R=()=>c.jsx("section",{id:"spolecznosc",className:"min-h-screen w-full bg-gradient-to-b from-dark via-dark-medium to-dark py-16 md:py-24 relative overflow-hidden",children:c.jsx(g,{className:"relative z-10",children:c.jsxs("div",{className:"flex flex-col items-center gap-12 md:gap-20",children:[c.jsx(h,{}),c.jsx(E,{})]})})});export{R as C,f as u};
