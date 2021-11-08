import{Parser as Z}from"acorn";var D=class{constructor(){this.UPDATE_LISTENER_FUNC_NAME="_bjsx_hmr_update";this.PARAM_ALTER_NAME="_blue_insert_params"}transform(e,t){}getImports(...e){return[]}getExports(...e){return[]}getDependentJSXComponents(e,t){return[]}getFunctions(e){return[]}getVars(e,t){return[]}fromDirectReturnToVarReturn(e){return""}getReturnValue(e){return""}getInsertRecord(){return[]}replaceCode(e,t,r,a,n=!1){let s=0;return a.filter(i=>i[0]<t[0]||n&&i[0]===t[0]).forEach(i=>s+=i[1]),a.push([t[0],e.length-t[1]+t[0]]),r.substring(0,t[0]+s)+e+r.substring(t[1]+s)}insertCode(e,t,r,a,n=!1){return this.replaceCode(e,[t,t],r,a,n)}getCodeFragment(e,t,r){let a=e[0],n=e[1];for(let s=r.length;s--;){let[i,p]=r[s];i<e[1]&&(n+=p,i<e[0]&&(a+=p))}return t.substring(a,n)}};import S from"path";import P from"fs";var C=class extends D{constructor(){super();this.Parser=Z}transform(e,t){e=e.replace(/=>/g,"=> ").replace(/Blue\.r\(([A-Z]\w*)[ \n]*\)/g,"Blue.r($1, null)");let r=this.Parser.parse(e,{ecmaVersion:"latest",sourceType:"module"}),a=e,{imports:n,exportedFuncs:s}=this.analyzeTree(r.body,t),i=this.getInsertRecord();for(let p of s){let{start:u,end:R}=p,h=this.getCodeFragment([u,R],e,i),y=this.getDependentJSXComponents(h,n);e=this.replaceCode(this.processFunctionCode(y,p,h,n,a),[u,R],e,i)}return e}addHotListenerInfo(e,t,r,a){var s,i;(i=e[s=t.info.src])!=null||(e[s]={varMapCode:"",listenCode:"",usedCompNames:[]});let n=e[t.info.src];n.usedCompNames.includes(t.name)||(n.varMapCode+=`${t.info.imports[t.name]}:${t.name},`,n.usedCompNames.push(t.name)),n.listenCode+=`
if(${r}.${t.refName}.${this.UPDATE_LISTENER_FUNC_NAME}){
  ${r}.${t.refName}=${r}.${t.refName}.${this.UPDATE_LISTENER_FUNC_NAME}(${t.name}, ${t.attrObjCode?t.attrObjCode:"null"});
  ${a}
}else{
  import.meta.hot.decline()
}
`}processFunctionCode(e,t,r,a,n){var w,H,L,V,B,J;let s=this.getInsertRecord(),i=r,p=t.body,u=p.start-t.start,R=p.end-t.start,h=p.body,y=t.params[0],I="";if(y){let o=y.start-t.start,l=y.end-t.start,d=r.substring(o,l);r=this.replaceCode(this.PARAM_ALTER_NAME,[o,l],r,s),I=`
let ${d}=${this.PARAM_ALTER_NAME};`}let f="self",b=[],$={},m,M=0,c=h==null?void 0:h.find(o=>o.type==="ReturnStatement"),A=p.type==="CallExpression"&&((H=(w=p.callee)==null?void 0:w.object)==null?void 0:H.name)==="Blue";if(c)c.argument.type==="Identifier"&&(f=c.argument.name);else if(!A)return i;let X=c&&c.argument.type==="CallExpression"&&((V=(L=c.argument.callee)==null?void 0:L.object)==null?void 0:V.name)==="Blue",U=A?R:c.start-t.start;for(let o of r.matchAll(/Blue\.r\(/g)){let l=this.Parser.parseExpressionAt(r,o.index,{ecmaVersion:"latest",sourceType:"module"});if(l.type==="SequenceExpression"&&(l=l.expressions.find(d=>d.start===l.start)),(l==null?void 0:l.type)==="CallExpression"&&((B=l==null?void 0:l.arguments[1])==null?void 0:B.type)==="ObjectExpression"){let d=(J=l.arguments[1].properties.find(E=>{var _;return((_=E.key)==null?void 0:_.name)==="ref"}))==null?void 0:J.value.elements[0].name;if(d){m=d;break}}}for(let o of e){let l=o.node.arguments[1];if(l.type==="ObjectExpression"){o.attrObjCode=i.substring(l.start,l.end);let d=l.properties.find(E=>E.key.name==="ref");if(d){let E="",_=d.value.elements;if(o.refName=_[1].value,o.hasRef=!0,!A){for(let{type:v,start:x,end:j}of h){let F=x-t.start,z=j-t.start,q=i.substring(F,z);v==="ExpressionStatement"&&i.indexOf(o.refName,F)===F&&(E+=`${m}.${q};`)}for(let v of i.matchAll(new RegExp(o.refName,"g")))try{let x=this.Parser.parseExpressionAt(i,v.index,{ecmaVersion:"latest",sourceType:"module"});(x.type==="AssignmentExpression"||x.type==="CallExpression")&&(r=this.insertCode(`${m}.`,v.index,r,s))}catch{}}this.addHotListenerInfo($,o,m,E)}else o.refName=`bjsxc_${M++}`,o.hasRef=!1,b.push(()=>{r=this.insertCode(`ref:[${m},'${o.refName}'],`,l.start+1,r,s),this.addHotListenerInfo($,o,m,"")})}else o.refName=`bjsxc_${M++}`,b.push(()=>{r=this.replaceCode(`{ref:[${m},'${o.refName}']}`,[l.start,l.start+4],r,s),this.addHotListenerInfo($,o,m,"")})}m||(m="refs",I+=`const ${m}={};`);for(let o=b.length;o--;)b[o]();let T="";if(A)I=`{${I}const ${f}=`,r=this.insertCode(`
return ${f};}`,p.end,r,s,!0);else if(X){let o=this.getCodeFragment([c.start-t.start+6,c.end-t.start],r,s);T=`const ${f}=${o}`,r=this.replaceCode(`
return ${f};`,[c.start-t.start,c.start-t.start+o.length+7],r,s)}r=this.insertCode(I,A?u:u+1,r,s);let g="";y?g=`const newElem=Blue.r(Comp, attr, ${this.PARAM_ALTER_NAME}.children?.map(elem=>elem.__newElem||elem))`:g="const newElem=Blue.r(Comp, attr)",g=`
${f}.${this.UPDATE_LISTENER_FUNC_NAME} = (Comp, attr) =>{
    ${g}
    ${f}.__newElem=newElem
    ${f}.before(newElem);
    ${f}.remove();
    return newElem
  }
`;for(let o in $){let l=$[o];g+=`import.meta.hot.accept('${o}',({${l.varMapCode}})=>{${l.listenCode}});`}return g=`
${T}
if(import.meta.hot){
  ${g}
}else{
  console.warn('import.meta.hot does not exist')
}
`,r=this.insertCode(g,U,r,s),r}resolveFilePath(e,t){let r=S.resolve(t,"../",e);try{let a=P.statSync(r);if(a.isDirectory()){let n=P.readdirSync(r);for(let s=n.length;s--;){let i=n[s];if(/index\.(?:[jt]sx|mdx?)$/.test(i))return e+"/"+i}}else return a.isFile()?e:!1}catch{let n=P.readdirSync(S.resolve(r,"../")),s=S.basename(e),i=S.dirname(e);for(let p=n.length;p--;){let u=n[p];if(n.indexOf(s)===0&&/\.(?:[jt]sx|mdx?)$/.test(u))return i+"/"+u}}return!1}analyzeTree(e,t){let r={varNames:[],info:{}},a=[],n=[];for(let s=e.length;s--;){let i=e[s];this.filterImports(i,r,t),this.filterExportedFuncs(i,a,n)}return{imports:r,exportedFuncs:a}}filterImports(e,t,r){if(e.type!=="ImportDeclaration"||e.source.value.indexOf(".")!==0)return null;let a=this.resolveFilePath(e.source.value,r);if(!a)return null;let n={src:a,imports:{}};t.info[e.source.value]=n;for(let s of e.specifiers){let i=s.local.name;s.type==="ImportDefaultSpecifier"?n.imports[i]="default":s.type==="ImportSpecifier"&&(n.imports[i]=s.imported.name),t.varNames.push({name:i,info:n})}}filterFuncs(e,t,r,a=!1){let{type:n}=e;if(!a&&n==="FunctionDeclaration"||n==="ArrowFunctionExpression")t.push(e);else if(n==="VariableDeclaration")if(a)for(let s of e.declarations)r.includes(s.id.name)&&this.filterFuncs(s.init,t,r);else for(let s of e.declarations)this.filterFuncs(s.init,t,r);else n==="Identifier"&&r.push(e.name)}filterExportedFuncs(e,t,r){if(e.type==="ExportDefaultDeclaration"||e.type==="ExportNamedDeclaration"){let{declaration:a,specifiers:n}=e;a?this.filterFuncs(a,t,r):n.forEach(s=>{this.filterFuncs(s.local,t,r)})}else r.length&&this.filterFuncs(e,t,r,!0)}getDependentJSXComponents(e,t){let r=[];for(let a of e.matchAll(/Blue\.r\(([A-Z][A-z_]*)/g)){let n=a[1],s=this.Parser.parseExpressionAt(e,a.index,{ecmaVersion:"latest",sourceType:"module"});s.type==="SequenceExpression"&&(s=s.expressions.find(i=>i.start===s.start));for(let i of t.varNames)if(i.name===n){let p={name:n,info:i.info,node:s,index:a.index};r.push(p)}}return r}getVars(e,t){return[]}fromDirectReturnToVarReturn(e){return""}getReturnValue(e){return""}};var O=new C,ne=(N,e)=>O.transform(N,e);function k({enabled:N}={enabled:!0}){return{name:"vite-plugin-blue-hmr",apply(e,{command:t}){return N&&t==="serve"},transform(e,t){if(!t.includes("node_modules")&&/\.[jt]sx$/.test(t))return O.transform(e,t)}}}export{k as default,ne as transform};
