var W=Object.create;var S=Object.defineProperty;var Y=Object.getOwnPropertyDescriptor;var ee=Object.getOwnPropertyNames;var te=Object.getPrototypeOf,re=Object.prototype.hasOwnProperty;var X=m=>S(m,"__esModule",{value:!0});var se=(m,t)=>{X(m);for(var e in t)S(m,e,{get:t[e],enumerable:!0})},ne=(m,t,e)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of ee(t))!re.call(m,r)&&r!=="default"&&S(m,r,{get:()=>t[r],enumerable:!(e=Y(t,r))||e.enumerable});return m},T=m=>ne(X(S(m!=null?W(te(m)):{},"default",m&&m.__esModule&&"default"in m?{get:()=>m.default,enumerable:!0}:{value:m,enumerable:!0})),m);se(exports,{default:()=>q,hmrAdder:()=>k});var L=typeof document=="undefined"?new(require("url")).URL("file:"+__filename).href:document.currentScript&&document.currentScript.src||new URL("main.js",document.baseURI).href;var j=T(require("acorn"));var v=class{constructor(){this.UPDATE_LISTENER_FUNC_NAME="_bjsx_hmr_update";this.PARAM_ALTER_NAME="_blue_insert_params"}transform(t){}getImports(...t){return[]}getExports(...t){return[]}getDependentJSXComponents(t,e){return[]}getFunctions(t){return[]}getVars(t,e){return[]}fromDirectReturnToVarReturn(t){return""}getReturnValue(t){return""}getInsertRecord(){return[]}replaceCode(t,e,r,i,s=!1){let o=0;return i.filter(n=>n[0]<e[0]||s&&n[0]===e[0]).forEach(n=>o+=n[1]),i.push([e[0],t.length-e[1]+e[0]]),r.substring(0,e[0]+o)+t+r.substring(e[1]+o)}insertCode(t,e,r,i,s=!1){return this.replaceCode(t,[e,e],r,i,s)}getCodeFragment(t,e,r){let i=t[0],s=t[1];for(let o=r.length;o--;){let[n,c]=r[o];n<t[1]&&(s+=c,n<t[0]&&(i+=c))}return e.substring(i,s)}};var R=T(require("path")),F=T(require("fs")),P=class extends v{constructor(){super();this.Parser=j.Parser}transform(t,e){t=t.replace(/=>/g,"=> ");let r=this.Parser.parse(t,{ecmaVersion:"latest",sourceType:"module"}),i=t,s=this.getImports(r.body,e),o=this.getExportedFunctions(r.body),n=this.getInsertRecord();for(let c of o){let{start:f,end:N}=c,E=this.getCodeFragment([f,N],t,n),u=this.getDependentJSXComponents(E,s);t=this.replaceCode(this.processFunctionCode(u,c,E,i),[f,N],t,n)}return t}addHotListenerInfo(t,e,r,i){var o,n;(n=t[o=e.info.src])!=null||(t[o]={varMapCode:"",listenCode:""});let s=t[e.info.src];s.varMapCode+=`${e.info.imports[e.name]}:${e.name},`,s.listenCode+=`
if(${r}.${e.refName}.${this.UPDATE_LISTENER_FUNC_NAME}){
  ${r}.${e.refName}=${r}.${e.refName}.${this.UPDATE_LISTENER_FUNC_NAME}(${e.name}, ${e.attrObjCode?e.attrObjCode:"null"});
  ${i}
}else{
  import.meta.hot.decline()
}
`}processFunctionCode(t,e,r,i){var w,U,B,H,J,O;let s=this.getInsertRecord(),o=r,n=e.body,c=n.start-e.start,f=n.end-e.start,N=n.body,E=e.params[0],u="";if(E){let a=E.start-e.start,l=E.end-e.start,g=r.substring(a,l);r=this.replaceCode(this.PARAM_ALTER_NAME,[a,l],r,s),u=`
let ${g}=${this.PARAM_ALTER_NAME};`}let h="self",b=[],A={},p,V=0,d=N==null?void 0:N.find(a=>a.type==="ReturnStatement"),I=n.type==="CallExpression"&&((U=(w=n.callee)==null?void 0:w.object)==null?void 0:U.name)==="Blue";if(d)d.argument.type==="Identifier"&&(h=d.argument.name);else if(!I)return o;let z=d&&d.argument.type==="CallExpression"&&((H=(B=d.argument.callee)==null?void 0:B.object)==null?void 0:H.name)==="Blue",Z=I?f:d.start-e.start;for(let a of r.matchAll(/Blue\.r\(/g)){let l=this.Parser.parseExpressionAt(r,a.index,{ecmaVersion:"latest",sourceType:"module"});if(l.type==="SequenceExpression"&&(l=l.expressions.find(g=>g.start===l.start)),(l==null?void 0:l.type)==="CallExpression"&&((J=l==null?void 0:l.arguments[1])==null?void 0:J.type)==="ObjectExpression"){let g=(O=l.arguments[1].properties.find(x=>{var D;return((D=x.key)==null?void 0:D.name)==="ref"}))==null?void 0:O.value.elements[0].name;if(g){p=g;break}}}for(let a of t){let l=a.node.arguments[1];if(l.type==="ObjectExpression"){a.attrObjCode=o.substring(l.start,l.end);let g=l.properties.find(x=>x.key.name==="ref");if(g){let x="",D=g.value.elements;if(a.refName=D[1].value,a.hasRef=!0,!I){for(let{type:_,start:$,end:G}of N){let M=$-e.start,K=G-e.start,Q=o.substring(M,K);_==="ExpressionStatement"&&o.indexOf(a.refName,M)===M&&(x+=`${p}.${Q};`)}for(let _ of o.matchAll(new RegExp(a.refName,"g")))try{let $=this.Parser.parseExpressionAt(o,_.index,{ecmaVersion:"latest",sourceType:"module"});($.type==="AssignmentExpression"||$.type==="CallExpression")&&(r=this.insertCode(`${p}.`,_.index,r,s))}catch{}}this.addHotListenerInfo(A,a,p,x)}else a.refName=`bjsxc_${V++}`,a.hasRef=!1,b.push(()=>{r=this.insertCode(`ref:[${p},'${a.refName}'],`,l.start+1,r,s),this.addHotListenerInfo(A,a,p,"")})}else a.refName=`bjsxc_${V++}`,b.push(()=>{r=this.replaceCode(`{ref:[${p},'${a.refName}']}`,[l.start,l.start+4],r,s),this.addHotListenerInfo(A,a,p,"")})}p||(p="refs",u+=`const ${p}={};`);for(let a=b.length;a--;)b[a]();if(I)u=`{${u}const ${h}=`,r=this.insertCode(`
return ${h};}`,n.end,r,s,!0);else if(z){let a=this.getCodeFragment([d.start-e.start+6,d.end-e.start],r,s);u=`${u}
      const ${h}=${a};`,r=this.replaceCode(`
return ${h};`,[d.start-e.start,d.start-e.start+a.length+7],r,s)}r=this.insertCode(u,I?c:c+1,r,s);let y="";E?y=`const newElem=Blue.r(Comp, attr, ${this.PARAM_ALTER_NAME}.children)`:y="const newElem=Blue.r(Comp, attr)",y=`
${h}.${this.UPDATE_LISTENER_FUNC_NAME} = (Comp, attr) =>{
    ${y}
    ${h}.before(newElem);
    ${h}.remove();
    return newElem
  }
`;let C=!1;for(let a in A){C||(C=!0);let l=A[a];y+=`import.meta.hot.accept('${a}',({${l.varMapCode}})=>{${l.listenCode}});`}return C&&(y=`
if(import.meta.hot){
  ${y}
}else{
  console.warn('import.meta.hot does not exist')
}
`),r=this.insertCode(y,Z,r,s),r}resolveFilePath(t,e){let r=R.default.resolve(e,"../",t);try{let i=F.default.statSync(r);if(i.isDirectory()){let s=F.default.readdirSync(r);for(let o=s.length;o--;){let n=s[o];if(/index\.(?:[jt]sx|mdx?)$/.test(n))return t+"/"+n}}else return i.isFile()?t:!1}catch{let s=F.default.readdirSync(R.default.resolve(r,"../")),o=R.default.basename(t),n=R.default.dirname(t);for(let c=s.length;c--;){let f=s[c];if(s.indexOf(o)===0&&/\.(?:[jt]sx|mdx?)$/.test(f))return n+"/"+f}}return!1}getImports(t,e){let r={varNames:[],info:{}};for(let i of t){if(i.type!=="ImportDeclaration"||i.source.value.indexOf(".")!==0)continue;let s=this.resolveFilePath(i.source.value,e);if(!s)continue;let o={src:s,imports:{}};r.info[i.source.value]=o;for(let n of i.specifiers){let c=n.local.name;n.type==="ImportDefaultSpecifier"?o.imports[c]="default":n.type==="ImportSpecifier"&&(o.imports[c]=n.imported.name),r.varNames.push({name:c,info:o})}}return r}getExports(t){return t.filter(e=>e.type==="ExportDefaultDeclaration"||e.type==="ExportNamedDeclaration")}getExportedFunctions(t){let e=[],r=[],i=(s,o=!1)=>{let{type:n}=s;if(!o&&n==="FunctionDeclaration"||n==="ArrowFunctionExpression")e.push(s);else if(n==="VariableDeclaration")if(o)for(let c of s.declarations)r.includes(c.id.name)&&i(c.init);else for(let c of s.declarations)i(c.init);else n==="Identifier"&&r.push(s.name)};for(let s=t.length;s--;){let o=t[s];if(o.type==="ExportDefaultDeclaration"||o.type==="ExportNamedDeclaration"){let{declaration:n,specifiers:c}=o;n?i(n):c.forEach(f=>{i(f.local)})}else r.length&&i(o,!0)}return e}getDependentJSXComponents(t,e){let r=[];for(let i of t.matchAll(/Blue\.r\(([A-Z][A-z_]*)/g)){let s=i[1],o=this.Parser.parseExpressionAt(t,i.index,{ecmaVersion:"latest",sourceType:"module"});o.type==="SequenceExpression"&&(o=o.expressions.find(n=>n.start===o.start));for(let n of e.varNames)if(n.name===s){let c={name:s,info:n.info,node:o,index:i.index};r.push(c)}}return r}getVars(t,e){return[]}fromDirectReturnToVarReturn(t){return""}getReturnValue(t){return""}};var k=new P;function q({enabled:m}={enabled:!0}){return{name:"vite-plugin-blue-hmr",apply(t,{command:e}){return m&&e==="serve"},transform(t,e){if(!e.includes("node_modules")&&/\.[jt]sx$/.test(e))return k.transform(t,e)}}}0&&(module.exports={hmrAdder});
