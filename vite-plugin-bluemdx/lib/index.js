var p=Object.defineProperty,g=Object.defineProperties;var d=Object.getOwnPropertyDescriptors;var l=Object.getOwnPropertySymbols;var h=Object.prototype.hasOwnProperty,x=Object.prototype.propertyIsEnumerable;var i=(n,r,t)=>r in n?p(n,r,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[r]=t,s=(n,r)=>{for(var t in r||(r={}))h.call(r,t)&&i(n,t,r[t]);if(l)for(var t of l(r))x.call(r,t)&&i(n,t,r[t]);return n},u=(n,r)=>g(n,d(r));import f from"jsx-transform";import v from"markdown-it";import $ from"highlight.js";import{transform as c}from"@bluejsx/vite-plugin-blue-hmr";var w=/import +(?:[A-z0-9]*,? *)?(?:{ *(?:[A-z0-9]* *,?)* *})? *from *['"`][@A-z0-9\-\/\.?&]*['"`];?/g;function y(n={}){let r,t=new v(u(s({},n),{highlight(e,o){return $.highlight(e,{language:o}).value.replace(/([{}])/g,'{"$&"}').replace(/\n/g,"<br />")},html:!0,xhtmlOut:!0}));return{name:"vite-plugin-bluemdx",configResolved(e){r=e},transform(e,o){if(!o.includes("node_modules")){if(/\.mdx$/.test(o)){e=t.render(e);let m="";return e=e.replace(w,a=>(m+=a+";","")),e=`${m}import Blue from 'bluejsx';export default ()=>${f.fromString(`<div>${e}</div>`,{factory:"Blue.r",passUnknownTagsToFactory:!0,arrayChildren:!1})}`,r.mode==="development"?c(e,o):e}else if(/\.md$/.test(o))return`import Blue from 'bluejsx';export default ()=>${f.fromString(`<div>${t.render(e)}</div>`,{factory:"Blue.r",passUnknownTagsToFactory:!0})}`}}}}export{y as default};
