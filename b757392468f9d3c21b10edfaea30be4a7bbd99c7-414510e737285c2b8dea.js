(self.webpackChunkmy_gatsby_site=self.webpackChunkmy_gatsby_site||[]).push([[413],{4852:function(t){"use strict";t.exports=Object.assign},1902:function(t,e,r){"use strict";r.d(e,{B8:function(){return u},BV:function(){return b},Op:function(){return h},V8:function(){return g},VN:function(){return l},Vh:function(){return i},Wb:function(){return y},X4:function(){return p},Y7:function(){return f},aq:function(){return c},k5:function(){return s},ny:function(){return a},yr:function(){return d}});var n=r(1257);const o="https://krispywebsites/api",i=async()=>{try{return(await n.Z.post(o+"/blog/",{},{withCredentials:!0})).data}catch(t){throw console.error(t),new Error("Error during Blog Creation")}},a=async()=>{try{return(await n.Z.post(o+"/blog/byAuthor",{},{withCredentials:!0})).data}catch(t){throw new Error("Couldnt Get Authors Blogs")}},u=async t=>{try{return(await n.Z.post(o+"/blog/draftBySlug",{slug:t},{withCredentials:!0})).data}catch(e){throw new Error("Couldnt Get Authors Blogs")}},c=async(t,e)=>{try{return(await n.Z.patch(o+"/blog/draftBySlug",{slug:t,draft:e},{withCredentials:!0})).data}catch(r){throw new Error("Oopsie Blog Didnt update something went wrong >:(")}},s=async(t,e)=>{try{return(await n.Z.patch(o+"/blog/slugBySlug",{oldSlug:t,newSlug:e},{withCredentials:!0})).data}catch(r){throw new Error("Oopsie Slug Didnt update something went wrong >:(")}},l=async t=>{try{return(await n.Z.post(o+"/blog/publish-blog",{slug:t},{withCredentials:!0})).data}catch(e){throw new Error("Couldnt get blog post...XD")}},f=async()=>{try{return(await n.Z.post(o+"/blog/published-by-author",{},{withCredentials:!0})).data}catch(t){throw new Error("Couldnt get blog post...XD")}},p=async t=>{try{return(await n.Z.post(o+"/blog/deleteBySlug",{slug:t},{withCredentials:!0})).data}catch(e){throw new Error("Couldnt delete blog..XD")}},d=async t=>{try{return(await n.Z.post(o+"/blog/unpublish-blog",{slug:t},{withCredentials:!0})).data}catch(e){throw new Error("Couldnt get blog post...XD")}},h=async(t,e)=>{try{return(await n.Z.post(o+"/blog/get-published-blogs",{pageNumber:t,limit:e},{withCredentials:!0})).data}catch(r){throw new Error("Couldnt get published blogs...XD")}},y=async t=>{try{return(await n.Z.post(o+"/blog/get-page-amount",{limit:t},{withCredentials:!0})).data}catch(e){throw new Error("Couldnt get published blogs...XD")}},b=async(t,e,r)=>{try{return(await n.Z.post(o+"/blog/search-published-blogs",{page:t,limit:r,searchQuery:e},{withCredentials:!0})).data}catch(i){throw new Error("Couldnt Search published Blogs...XD")}},g=async t=>{try{return(await n.Z.post(o+"/blog/get-published-by-slug",{slug:t},{withCredentials:!0})).data}catch(e){throw new Error("Couldnt Search published Blogs...XD")}}},4303:function(t,e,r){"use strict";r.d(e,{q_:function(){return n}});const n=t=>{if(!t)return"";const e=document.createElement("div");e.innerHTML=t;const r=e.querySelector("h1");return r?r.textContent+" | ":null}},9590:function(t){var e="undefined"!=typeof Element,r="function"==typeof Map,n="function"==typeof Set,o="function"==typeof ArrayBuffer&&!!ArrayBuffer.isView;function i(t,a){if(t===a)return!0;if(t&&a&&"object"==typeof t&&"object"==typeof a){if(t.constructor!==a.constructor)return!1;var u,c,s,l;if(Array.isArray(t)){if((u=t.length)!=a.length)return!1;for(c=u;0!=c--;)if(!i(t[c],a[c]))return!1;return!0}if(r&&t instanceof Map&&a instanceof Map){if(t.size!==a.size)return!1;for(l=t.entries();!(c=l.next()).done;)if(!a.has(c.value[0]))return!1;for(l=t.entries();!(c=l.next()).done;)if(!i(c.value[1],a.get(c.value[0])))return!1;return!0}if(n&&t instanceof Set&&a instanceof Set){if(t.size!==a.size)return!1;for(l=t.entries();!(c=l.next()).done;)if(!a.has(c.value[0]))return!1;return!0}if(o&&ArrayBuffer.isView(t)&&ArrayBuffer.isView(a)){if((u=t.length)!=a.length)return!1;for(c=u;0!=c--;)if(t[c]!==a[c])return!1;return!0}if(t.constructor===RegExp)return t.source===a.source&&t.flags===a.flags;if(t.valueOf!==Object.prototype.valueOf&&"function"==typeof t.valueOf&&"function"==typeof a.valueOf)return t.valueOf()===a.valueOf();if(t.toString!==Object.prototype.toString&&"function"==typeof t.toString&&"function"==typeof a.toString)return t.toString()===a.toString();if((u=(s=Object.keys(t)).length)!==Object.keys(a).length)return!1;for(c=u;0!=c--;)if(!Object.prototype.hasOwnProperty.call(a,s[c]))return!1;if(e&&t instanceof Element)return!1;for(c=u;0!=c--;)if(("_owner"!==s[c]&&"__v"!==s[c]&&"__o"!==s[c]||!t.$$typeof)&&!i(t[s[c]],a[s[c]]))return!1;return!0}return t!=t&&a!=a}t.exports=function(t,e){try{return i(t,e)}catch(r){if((r.message||"").match(/stack|recursion/i))return console.warn("react-fast-compare cannot handle circular refs"),!1;throw r}}},4593:function(t,e,r){"use strict";r.d(e,{q:function(){return dt}});var n,o,i,a,u=r(5697),c=r.n(u),s=r(3524),l=r.n(s),f=r(9590),p=r.n(f),d=r(7294),h=r(4852),y=r.n(h),b="bodyAttributes",g="htmlAttributes",w="titleAttributes",m={BASE:"base",BODY:"body",HEAD:"head",HTML:"html",LINK:"link",META:"meta",NOSCRIPT:"noscript",SCRIPT:"script",STYLE:"style",TITLE:"title"},T=(Object.keys(m).map((function(t){return m[t]})),"charset"),v="cssText",C="href",A="http-equiv",O="innerHTML",E="itemprop",S="name",j="property",k="rel",P="src",L="target",x={accesskey:"accessKey",charset:"charSet",class:"className",contenteditable:"contentEditable",contextmenu:"contextMenu","http-equiv":"httpEquiv",itemprop:"itemProp",tabindex:"tabIndex"},I="defaultTitle",M="defer",B="encodeSpecialCharacters",N="onChangeClientState",D="titleTemplate",_=Object.keys(x).reduce((function(t,e){return t[x[e]]=e,t}),{}),R=[m.NOSCRIPT,m.SCRIPT,m.STYLE],q="data-react-helmet",H="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Z=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),Y=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t},F=function(t,e){var r={};for(var n in t)e.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(t,n)&&(r[n]=t[n]);return r},U=function(t){return!1===(!(arguments.length>1&&void 0!==arguments[1])||arguments[1])?String(t):String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")},X=function(t){var e=G(t,m.TITLE),r=G(t,D);if(r&&e)return r.replace(/%s/g,(function(){return Array.isArray(e)?e.join(""):e}));var n=G(t,I);return e||n||void 0},V=function(t){return G(t,N)||function(){}},z=function(t,e){return e.filter((function(e){return void 0!==e[t]})).map((function(e){return e[t]})).reduce((function(t,e){return Y({},t,e)}),{})},K=function(t,e){return e.filter((function(t){return void 0!==t[m.BASE]})).map((function(t){return t[m.BASE]})).reverse().reduce((function(e,r){if(!e.length)for(var n=Object.keys(r),o=0;o<n.length;o++){var i=n[o].toLowerCase();if(-1!==t.indexOf(i)&&r[i])return e.concat(r)}return e}),[])},W=function(t,e,r){var n={};return r.filter((function(e){return!!Array.isArray(e[t])||(void 0!==e[t]&&et("Helmet: "+t+' should be of type "Array". Instead found type "'+H(e[t])+'"'),!1)})).map((function(e){return e[t]})).reverse().reduce((function(t,r){var o={};r.filter((function(t){for(var r=void 0,i=Object.keys(t),a=0;a<i.length;a++){var u=i[a],c=u.toLowerCase();-1===e.indexOf(c)||r===k&&"canonical"===t[r].toLowerCase()||c===k&&"stylesheet"===t[c].toLowerCase()||(r=c),-1===e.indexOf(u)||u!==O&&u!==v&&u!==E||(r=u)}if(!r||!t[r])return!1;var s=t[r].toLowerCase();return n[r]||(n[r]={}),o[r]||(o[r]={}),!n[r][s]&&(o[r][s]=!0,!0)})).reverse().forEach((function(e){return t.push(e)}));for(var i=Object.keys(o),a=0;a<i.length;a++){var u=i[a],c=y()({},n[u],o[u]);n[u]=c}return t}),[]).reverse()},G=function(t,e){for(var r=t.length-1;r>=0;r--){var n=t[r];if(n.hasOwnProperty(e))return n[e]}return null},$=(n=Date.now(),function(t){var e=Date.now();e-n>16?(n=e,t(e)):setTimeout((function(){$(t)}),0)}),Q=function(t){return clearTimeout(t)},J="undefined"!=typeof window?window.requestAnimationFrame&&window.requestAnimationFrame.bind(window)||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||$:r.g.requestAnimationFrame||$,tt="undefined"!=typeof window?window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||Q:r.g.cancelAnimationFrame||Q,et=function(t){return console&&"function"==typeof console.warn&&console.warn(t)},rt=null,nt=function(t,e){var r=t.baseTag,n=t.bodyAttributes,o=t.htmlAttributes,i=t.linkTags,a=t.metaTags,u=t.noscriptTags,c=t.onChangeClientState,s=t.scriptTags,l=t.styleTags,f=t.title,p=t.titleAttributes;at(m.BODY,n),at(m.HTML,o),it(f,p);var d={baseTag:ut(m.BASE,r),linkTags:ut(m.LINK,i),metaTags:ut(m.META,a),noscriptTags:ut(m.NOSCRIPT,u),scriptTags:ut(m.SCRIPT,s),styleTags:ut(m.STYLE,l)},h={},y={};Object.keys(d).forEach((function(t){var e=d[t],r=e.newTags,n=e.oldTags;r.length&&(h[t]=r),n.length&&(y[t]=d[t].oldTags)})),e&&e(),c(t,h,y)},ot=function(t){return Array.isArray(t)?t.join(""):t},it=function(t,e){void 0!==t&&document.title!==t&&(document.title=ot(t)),at(m.TITLE,e)},at=function(t,e){var r=document.getElementsByTagName(t)[0];if(r){for(var n=r.getAttribute(q),o=n?n.split(","):[],i=[].concat(o),a=Object.keys(e),u=0;u<a.length;u++){var c=a[u],s=e[c]||"";r.getAttribute(c)!==s&&r.setAttribute(c,s),-1===o.indexOf(c)&&o.push(c);var l=i.indexOf(c);-1!==l&&i.splice(l,1)}for(var f=i.length-1;f>=0;f--)r.removeAttribute(i[f]);o.length===i.length?r.removeAttribute(q):r.getAttribute(q)!==a.join(",")&&r.setAttribute(q,a.join(","))}},ut=function(t,e){var r=document.head||document.querySelector(m.HEAD),n=r.querySelectorAll(t+"["+q+"]"),o=Array.prototype.slice.call(n),i=[],a=void 0;return e&&e.length&&e.forEach((function(e){var r=document.createElement(t);for(var n in e)if(e.hasOwnProperty(n))if(n===O)r.innerHTML=e.innerHTML;else if(n===v)r.styleSheet?r.styleSheet.cssText=e.cssText:r.appendChild(document.createTextNode(e.cssText));else{var u=void 0===e[n]?"":e[n];r.setAttribute(n,u)}r.setAttribute(q,"true"),o.some((function(t,e){return a=e,r.isEqualNode(t)}))?o.splice(a,1):i.push(r)})),o.forEach((function(t){return t.parentNode.removeChild(t)})),i.forEach((function(t){return r.appendChild(t)})),{oldTags:o,newTags:i}},ct=function(t){return Object.keys(t).reduce((function(e,r){var n=void 0!==t[r]?r+'="'+t[r]+'"':""+r;return e?e+" "+n:n}),"")},st=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.keys(t).reduce((function(e,r){return e[x[r]||r]=t[r],e}),e)},lt=function(t,e,r){switch(t){case m.TITLE:return{toComponent:function(){return t=e.title,r=e.titleAttributes,(n={key:t})[q]=!0,o=st(r,n),[d.createElement(m.TITLE,o,t)];var t,r,n,o},toString:function(){return function(t,e,r,n){var o=ct(r),i=ot(e);return o?"<"+t+" "+q+'="true" '+o+">"+U(i,n)+"</"+t+">":"<"+t+" "+q+'="true">'+U(i,n)+"</"+t+">"}(t,e.title,e.titleAttributes,r)}};case b:case g:return{toComponent:function(){return st(e)},toString:function(){return ct(e)}};default:return{toComponent:function(){return function(t,e){return e.map((function(e,r){var n,o=((n={key:r})[q]=!0,n);return Object.keys(e).forEach((function(t){var r=x[t]||t;if(r===O||r===v){var n=e.innerHTML||e.cssText;o.dangerouslySetInnerHTML={__html:n}}else o[r]=e[t]})),d.createElement(t,o)}))}(t,e)},toString:function(){return function(t,e,r){return e.reduce((function(e,n){var o=Object.keys(n).filter((function(t){return!(t===O||t===v)})).reduce((function(t,e){var o=void 0===n[e]?e:e+'="'+U(n[e],r)+'"';return t?t+" "+o:o}),""),i=n.innerHTML||n.cssText||"",a=-1===R.indexOf(t);return e+"<"+t+" "+q+'="true" '+o+(a?"/>":">"+i+"</"+t+">")}),"")}(t,e,r)}}}},ft=function(t){var e=t.baseTag,r=t.bodyAttributes,n=t.encode,o=t.htmlAttributes,i=t.linkTags,a=t.metaTags,u=t.noscriptTags,c=t.scriptTags,s=t.styleTags,l=t.title,f=void 0===l?"":l,p=t.titleAttributes;return{base:lt(m.BASE,e,n),bodyAttributes:lt(b,r,n),htmlAttributes:lt(g,o,n),link:lt(m.LINK,i,n),meta:lt(m.META,a,n),noscript:lt(m.NOSCRIPT,u,n),script:lt(m.SCRIPT,c,n),style:lt(m.STYLE,s,n),title:lt(m.TITLE,{title:f,titleAttributes:p},n)}},pt=l()((function(t){return{baseTag:K([C,L],t),bodyAttributes:z(b,t),defer:G(t,M),encode:G(t,B),htmlAttributes:z(g,t),linkTags:W(m.LINK,[k,C],t),metaTags:W(m.META,[S,T,A,j,E],t),noscriptTags:W(m.NOSCRIPT,[O],t),onChangeClientState:V(t),scriptTags:W(m.SCRIPT,[P,O],t),styleTags:W(m.STYLE,[v],t),title:X(t),titleAttributes:z(w,t)}}),(function(t){rt&&tt(rt),t.defer?rt=J((function(){nt(t,(function(){rt=null}))})):(nt(t),rt=null)}),ft)((function(){return null})),dt=(o=pt,a=i=function(t){function e(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,t.apply(this,arguments))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,t),e.prototype.shouldComponentUpdate=function(t){return!p()(this.props,t)},e.prototype.mapNestedChildrenToProps=function(t,e){if(!e)return null;switch(t.type){case m.SCRIPT:case m.NOSCRIPT:return{innerHTML:e};case m.STYLE:return{cssText:e}}throw new Error("<"+t.type+" /> elements are self-closing and can not contain children. Refer to our API for more information.")},e.prototype.flattenArrayTypeChildren=function(t){var e,r=t.child,n=t.arrayTypeChildren,o=t.newChildProps,i=t.nestedChildren;return Y({},n,((e={})[r.type]=[].concat(n[r.type]||[],[Y({},o,this.mapNestedChildrenToProps(r,i))]),e))},e.prototype.mapObjectTypeChildren=function(t){var e,r,n=t.child,o=t.newProps,i=t.newChildProps,a=t.nestedChildren;switch(n.type){case m.TITLE:return Y({},o,((e={})[n.type]=a,e.titleAttributes=Y({},i),e));case m.BODY:return Y({},o,{bodyAttributes:Y({},i)});case m.HTML:return Y({},o,{htmlAttributes:Y({},i)})}return Y({},o,((r={})[n.type]=Y({},i),r))},e.prototype.mapArrayTypeChildrenToProps=function(t,e){var r=Y({},e);return Object.keys(t).forEach((function(e){var n;r=Y({},r,((n={})[e]=t[e],n))})),r},e.prototype.warnOnInvalidChildren=function(t,e){return!0},e.prototype.mapChildrenToProps=function(t,e){var r=this,n={};return d.Children.forEach(t,(function(t){if(t&&t.props){var o=t.props,i=o.children,a=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.keys(t).reduce((function(e,r){return e[_[r]||r]=t[r],e}),e)}(F(o,["children"]));switch(r.warnOnInvalidChildren(t,i),t.type){case m.LINK:case m.META:case m.NOSCRIPT:case m.SCRIPT:case m.STYLE:n=r.flattenArrayTypeChildren({child:t,arrayTypeChildren:n,newChildProps:a,nestedChildren:i});break;default:e=r.mapObjectTypeChildren({child:t,newProps:e,newChildProps:a,nestedChildren:i})}}})),e=this.mapArrayTypeChildrenToProps(n,e)},e.prototype.render=function(){var t=this.props,e=t.children,r=F(t,["children"]),n=Y({},r);return e&&(n=this.mapChildrenToProps(e,n)),d.createElement(o,n)},Z(e,null,[{key:"canUseDOM",set:function(t){o.canUseDOM=t}}]),e}(d.Component),i.propTypes={base:c().object,bodyAttributes:c().object,children:c().oneOfType([c().arrayOf(c().node),c().node]),defaultTitle:c().string,defer:c().bool,encodeSpecialCharacters:c().bool,htmlAttributes:c().object,link:c().arrayOf(c().object),meta:c().arrayOf(c().object),noscript:c().arrayOf(c().object),onChangeClientState:c().func,script:c().arrayOf(c().object),style:c().arrayOf(c().object),title:c().string,titleAttributes:c().object,titleTemplate:c().string},i.defaultProps={defer:!0,encodeSpecialCharacters:!0},i.peek=o.peek,i.rewind=function(){var t=o.rewind();return t||(t=ft({baseTag:[],bodyAttributes:{},encodeSpecialCharacters:!0,htmlAttributes:{},linkTags:[],metaTags:[],noscriptTags:[],scriptTags:[],styleTags:[],title:"",titleAttributes:{}})),t},a);dt.renderStatic=dt.rewind},3524:function(t,e,r){"use strict";var n,o=r(7294),i=(n=o)&&"object"==typeof n&&"default"in n?n.default:n;function a(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var u=!("undefined"==typeof window||!window.document||!window.document.createElement);t.exports=function(t,e,r){if("function"!=typeof t)throw new Error("Expected reducePropsToState to be a function.");if("function"!=typeof e)throw new Error("Expected handleStateChangeOnClient to be a function.");if(void 0!==r&&"function"!=typeof r)throw new Error("Expected mapStateOnServer to either be undefined or a function.");return function(n){if("function"!=typeof n)throw new Error("Expected WrappedComponent to be a React component.");var c,s=[];function l(){c=t(s.map((function(t){return t.props}))),f.canUseDOM?e(c):r&&(c=r(c))}var f=function(t){var e,r;function o(){return t.apply(this,arguments)||this}r=t,(e=o).prototype=Object.create(r.prototype),e.prototype.constructor=e,e.__proto__=r,o.peek=function(){return c},o.rewind=function(){if(o.canUseDOM)throw new Error("You may only call rewind() on the server. Call peek() to read the current state.");var t=c;return c=void 0,s=[],t};var a=o.prototype;return a.UNSAFE_componentWillMount=function(){s.push(this),l()},a.componentDidUpdate=function(){l()},a.componentWillUnmount=function(){var t=s.indexOf(this);s.splice(t,1),l()},a.render=function(){return i.createElement(n,this.props)},o}(o.PureComponent);return a(f,"displayName","SideEffect("+function(t){return t.displayName||t.name||"Component"}(n)+")"),a(f,"canUseDOM",u),f}}}}]);
//# sourceMappingURL=b757392468f9d3c21b10edfaea30be4a7bbd99c7-414510e737285c2b8dea.js.map