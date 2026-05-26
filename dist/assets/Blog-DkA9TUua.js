import{r as m,j as e,B as w}from"./index-DFLtYYau.js";import{a as C,A as T}from"./config-rJrRRq0n.js";import{c as A,N as k,h as E,m as u,X as $,F as S}from"./hero-D2DxAED6.js";import{P as I}from"./PageHero-whSZ65g3.js";import{R}from"./refresh-ccw-exRq4djj.js";import{A as z}from"./index-1OuE-Cje.js";/**
 * @license lucide-react v0.514.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=[["path",{d:"M7 7h10v10",key:"1tivn9"}],["path",{d:"M7 17 17 7",key:"1vkiza"}]],x=A("arrow-up-right",L),U=78,M=150,P=280,_=new Set(["a","an","and","are","as","at","be","but","by","for","from","how","if","in","into","is","it","its","of","on","or","our","says","so","that","the","their","this","to","what","when","why","with"]),N=[{start:"#111d64",end:"#3e62b8",accent:"#f2c58d",detail:"#eff4ff",glow:"#8caef7"},{start:"#0f3846",end:"#1f6a7a",accent:"#9de8dc",detail:"#effffd",glow:"#79d4e4"},{start:"#3b2140",end:"#8f4b63",accent:"#ffd0a8",detail:"#fff2e8",glow:"#f4a7c5"},{start:"#2b2d18",end:"#7f6f32",accent:"#f5e59c",detail:"#fffbe6",glow:"#dccb70"}],b=(s="",a)=>{const t=s.trim();return!t||t.length<=a?t:`${t.slice(0,a).trimEnd()}...`},y=s=>{if(!s)return"Fresh from TechCrunch";const a=new Date(s);return Number.isNaN(a.getTime())?s:a.toLocaleDateString("en-NG",{day:"numeric",month:"short",year:"numeric"})},F=(s="")=>{const a=s.replace(/[^a-z0-9+#/&\s-]/gi," ").replace(/\s+/g," ").trim();return a?a.split(" ").map(t=>t===t.toUpperCase()||t.length<=3||/[+#/&]/.test(t)?t.toUpperCase():`${t.charAt(0).toUpperCase()}${t.slice(1).toLowerCase()}`).join(" "):""},B=(s={})=>{const a=[],t=new Set,l=n=>{const i=F(n);if(!i)return;const r=i.toLowerCase();t.has(r)||(t.add(r),a.push(i))};return(s.categories||[]).forEach(l),(s.title||"").replace(/[^a-z0-9+#/&\s-]/gi," ").split(/\s+/).filter(Boolean).filter(n=>n.length>=3&&!_.has(n.toLowerCase())).forEach(l),a.slice(0,3)},D=(s="")=>[...s].reduce((a,t)=>a*31+t.charCodeAt(0)>>>0,7),O=(s={})=>N[D(`${s.title||""}|${(s.categories||[]).join("|")}`)%N.length],G=(s="",a=24,t=4)=>{const l=s.trim().split(/\s+/).filter(Boolean);if(!l.length)return["Tech story"];const n=[];let i="",r=0;for(;r<l.length;r+=1){const c=l[r],d=i?`${i} ${c}`:c;if(d.length<=a||!i){i=d;continue}if(n.push(i),i=c,n.length===t-1){r+=1;break}}const h=[...i?[i]:[],...l.slice(r)];if(h.length){let c=h.join(" ");c.length>a&&(c=`${c.slice(0,a-3).trimEnd()}...`),n.push(c)}return n.slice(0,t)},f=(s="")=>s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"),H=(s={})=>{var g;const a=((g=s.title)==null?void 0:g.trim())||"TechCrunch story",t=B(s),l=O(s),n=G(a,23,4),i=(t.length?t:["Startups","Software","Product"]).join(" • ").toUpperCase(),r=(t[0]||"Tech").toUpperCase().slice(0,12),h=s.author?`By ${s.author}`:"Live from TechCrunch",c=n.map((o,p)=>`
        <text
          x="96"
          y="${286+p*86}"
          fill="${l.detail}"
          font-family="Manrope, Segoe UI, Arial, sans-serif"
          font-size="62"
          font-weight="800"
        >
          ${f(o)}
        </text>
      `).join(""),d=`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" role="img" aria-label="${f(a)}">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${l.start}" />
          <stop offset="100%" stop-color="${l.end}" />
        </linearGradient>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="${l.glow}" stop-opacity="0.9" />
          <stop offset="100%" stop-color="${l.glow}" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect width="1600" height="900" fill="url(#bg)" />
      <circle cx="1270" cy="180" r="240" fill="url(#glow)" opacity="0.7" />
      <circle cx="1460" cy="730" r="220" fill="url(#glow)" opacity="0.24" />
      <path
        d="M1040 90c120 14 218 112 234 232-70 66-145 130-237 179-84-81-139-195-139-298 42-78 79-122 142-145z"
        fill="rgba(255,255,255,0.08)"
      />
      <rect x="96" y="86" width="262" height="64" rx="24" fill="rgba(255,255,255,0.1)" />
      <text
        x="126"
        y="129"
        fill="${l.detail}"
        font-family="Manrope, Segoe UI, Arial, sans-serif"
        font-size="30"
        font-weight="700"
        letter-spacing="2"
      >
        TECHCRUNCH
      </text>
      <text
        x="96"
        y="192"
        fill="${l.accent}"
        font-family="Manrope, Segoe UI, Arial, sans-serif"
        font-size="28"
        font-weight="800"
        letter-spacing="6"
      >
        ${f(i)}
      </text>
      ${c}
      <text
        x="1492"
        y="758"
        fill="${l.detail}"
        font-family="Manrope, Segoe UI, Arial, sans-serif"
        font-size="128"
        font-weight="800"
        opacity="0.13"
        text-anchor="end"
      >
        ${f(r)}
      </text>
      <text
        x="96"
        y="812"
        fill="${l.detail}"
        font-family="Manrope, Segoe UI, Arial, sans-serif"
        font-size="30"
        font-weight="600"
        opacity="0.88"
      >
        ${f(h)}
      </text>
    </svg>
  `;return`data:image/svg+xml;charset=UTF-8,${encodeURIComponent(d)}`},j=({article:s,imageClassName:a})=>{const[t,l]=m.useState(!1),n=m.useMemo(()=>H(s),[s]),i=(s==null?void 0:s.imageUrl)||"",r=(s==null?void 0:s.title)||"TechCrunch article";return m.useEffect(()=>{l(!1)},[i]),e.jsx("img",{src:t||!i?n:i,alt:r,className:a,loading:"lazy",decoding:"async",referrerPolicy:"no-referrer",onError:()=>l(!0)})},Q=()=>{const[s,a]=m.useState([]),[t,l]=m.useState(!0),[n,i]=m.useState(""),[r,h]=m.useState(null),c=async()=>{var o;l(!0),i("");try{const p=await C.get(`${T}/api/blogs/techcrunch`);a(((o=p.data)==null?void 0:o.items)??[])}catch{i("The TechCrunch feed could not be loaded right now.")}finally{l(!1)}};m.useEffect(()=>{c()},[]),m.useEffect(()=>{if(!r)return;const o=document.body.style.overflow,p=v=>{v.key==="Escape"&&h(null)};return document.body.style.overflow="hidden",window.addEventListener("keydown",p),()=>{document.body.style.overflow=o,window.removeEventListener("keydown",p)}},[r]);const[d,g]=m.useMemo(()=>s.length?[s[0],s.slice(1)]:[null,[]],[s]);return e.jsxs("div",{className:"theme-page overflow-x-hidden",children:[e.jsx(k,{}),e.jsxs(I,{eyebrow:"Blog",title:"Tech & Dev Radar",description:"A live stream of TechCrunch stories for staying close to product launches, engineering shifts, startup momentum, and the wider tech conversation.",image:E,children:[e.jsx("button",{type:"button",className:"theme-button-secondary px-6 py-3",onClick:c,disabled:t,children:t?e.jsxs(e.Fragment,{children:[e.jsx(w,{inline:!0}),"Refreshing..."]}):e.jsxs(e.Fragment,{children:[e.jsx(R,{size:16}),"Refresh Feed"]})}),e.jsx("a",{href:"https://techcrunch.com",target:"_blank",rel:"noopener noreferrer",className:"theme-button-primary px-6 py-3",children:"Visit TechCrunch"})]}),e.jsxs("section",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20",children:[n?e.jsx("div",{className:"glass-card blog-status-card",children:e.jsx("p",{className:"admin-status-error",children:n})}):null,t?e.jsx(w,{label:"Loading stories",compact:!0}):d?e.jsxs("div",{className:"space-y-10",children:[e.jsxs(u.article,{className:"glass-card blog-feature-card",initial:{opacity:0,y:24},animate:{opacity:1,y:0},transition:{duration:.5},children:[e.jsx("div",{className:"blog-feature-media-shell",children:e.jsx(j,{article:d,imageClassName:"blog-feature-image"})}),e.jsxs("div",{className:"blog-feature-copy",children:[e.jsxs("div",{className:"blog-chip-row",children:[e.jsx("span",{className:"theme-chip",children:"Featured Story"}),e.jsx("span",{className:"theme-chip",children:y(d.publishedAt)})]}),e.jsx("h2",{className:"blog-feature-title",children:d.title}),e.jsx("p",{className:"blog-feature-excerpt",children:b(d.excerpt||"No preview is available for this story yet.",P)}),e.jsx("div",{className:"blog-chip-row",children:(d.categories||[]).slice(0,3).map(o=>e.jsx("span",{className:"blog-category-chip",children:o},o))}),e.jsxs("div",{className:"blog-feature-actions",children:[e.jsx("button",{type:"button",className:"theme-button-secondary px-6 py-3",onClick:()=>h(d),children:"Read More"}),e.jsxs("a",{href:d.link,target:"_blank",rel:"noopener noreferrer",className:"theme-button-primary px-6 py-3 inline-flex",children:["Read on TechCrunch",e.jsx(x,{size:16})]})]})]})]}),e.jsx("div",{className:"blog-grid",children:g.map(o=>e.jsxs("article",{className:"glass-card blog-card",children:[e.jsx("div",{className:"blog-card-media-shell",children:e.jsx(j,{article:o,imageClassName:"blog-card-image"})}),e.jsxs("div",{className:"blog-card-copy",children:[e.jsxs("div",{className:"blog-card-meta",children:[e.jsx("span",{children:y(o.publishedAt)}),e.jsx("span",{children:o.author||"TechCrunch Staff"})]}),e.jsx("h3",{className:"blog-card-title",children:b(o.title,U)}),e.jsx("p",{className:"blog-card-excerpt",children:b(o.excerpt||"No preview is available for this story yet.",M)}),e.jsx("div",{className:"blog-chip-row",children:(o.categories||[]).slice(0,2).map(p=>e.jsx("span",{className:"blog-category-chip",children:p},p))}),e.jsxs("div",{className:"blog-card-actions",children:[e.jsx("button",{type:"button",className:"theme-button-secondary blog-card-button",onClick:()=>h(o),children:"Read More"}),e.jsxs("a",{href:o.link,target:"_blank",rel:"noopener noreferrer",className:"theme-link inline-flex items-center gap-2 font-semibold",children:["Open article",e.jsx(x,{size:15})]})]})]})]},o.id))})]}):e.jsx("div",{className:"glass-card blog-status-card",children:e.jsx("p",{className:"theme-muted",children:"No TechCrunch articles are available right now."})})]}),e.jsx(z,{children:r?e.jsx(u.div,{className:"blog-modal-backdrop",initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:()=>h(null),children:e.jsxs(u.div,{className:"glass-card blog-modal-shell",initial:{opacity:0,y:24,scale:.96},animate:{opacity:1,y:0,scale:1},exit:{opacity:0,y:24,scale:.96},transition:{duration:.22,ease:"easeOut"},onClick:o=>o.stopPropagation(),role:"dialog","aria-modal":"true","aria-labelledby":"blog-preview-title",children:[e.jsx("button",{type:"button",className:"blog-modal-close",onClick:()=>h(null),"aria-label":"Close article preview",children:e.jsx($,{size:18})}),e.jsxs("div",{className:"blog-modal-grid",children:[e.jsx("div",{className:"blog-modal-media-shell",children:e.jsx(j,{article:r,imageClassName:"blog-modal-image"})}),e.jsxs("div",{className:"blog-modal-copy",children:[e.jsxs("div",{className:"blog-chip-row",children:[e.jsx("span",{className:"theme-chip",children:"TechCrunch"}),e.jsx("span",{className:"theme-chip",children:y(r.publishedAt)})]}),e.jsx("h2",{id:"blog-preview-title",className:"blog-modal-title",children:r.title}),e.jsxs("div",{className:"blog-modal-meta",children:[e.jsx("span",{children:r.author||"TechCrunch Staff"}),e.jsx("span",{children:r.source||"TechCrunch"})]}),e.jsx("p",{className:"blog-modal-excerpt",children:r.excerpt||"No preview is available for this story yet."}),e.jsx("div",{className:"blog-chip-row",children:(r.categories||[]).slice(0,4).map(o=>e.jsx("span",{className:"blog-category-chip",children:o},o))}),e.jsxs("div",{className:"blog-modal-actions",children:[e.jsxs("a",{href:r.link,target:"_blank",rel:"noopener noreferrer",className:"theme-button-primary px-6 py-3 inline-flex",children:["Read on TechCrunch",e.jsx(x,{size:16})]}),e.jsx("button",{type:"button",className:"theme-button-secondary px-6 py-3",onClick:()=>h(null),children:"Close Preview"})]})]})]})]})}):null}),e.jsx(S,{})]})};export{Q as default};
