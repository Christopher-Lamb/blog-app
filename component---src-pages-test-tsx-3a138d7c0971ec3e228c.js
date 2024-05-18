"use strict";(self.webpackChunkmy_gatsby_site=self.webpackChunkmy_gatsby_site||[]).push([[633],{9691:function(e,a,t){t.r(a),t.d(a,{Head:function(){return b},default:function(){return g}});var l=t(7294);t(7207);function n(e){return(a=e.toLowerCase().replaceAll("name","").replaceAll(/\(.*?\)/g,"").replace(/\s+$/,"").replace(/\s+/g,"-")).includes(",")?a.substring(0,a.indexOf(",")):a;var a}const s="p-2 text-black border font-normal",r="jost text-lg",c=e=>{let{children:a,className:t,id:n,preSubmit:s}=e;return l.createElement("form",{id:n,className:t,action:"https://krispywebsites.com/form",method:"POST",onSubmit:e=>{e.preventDefault(),s&&s(),e.currentTarget.submit()}},l.createElement("input",{type:"hidden",name:"recipient",value:"christopher.j.lamb13@gmail.com"}),"undefined"!=typeof window&&l.createElement(l.Fragment,null,l.createElement("input",{type:"hidden",name:"redirect_url",defaultValue:window.location.href}),l.createElement("input",{type:"hidden",name:"warning",value:"Please do not reply directly to this email. If you need to respond, please create a new email and use the customer's email address provided in the form. Any reply sent directly to this email will go to our email service, not the customer"})),a)},m=e=>{let{label:a,...t}=e;const{className:c,inputClassName:m,...o}=t,i=n(a);return l.createElement("div",{className:"w-full "+c},l.createElement("label",{htmlFor:i,className:r},a," ",o.required&&l.createElement("span",{className:"text-red-600"},"*")),l.createElement("input",Object.assign({id:i,name:i,className:"w-full shadow "+m+" "+s},o)))},o=e=>{let{label:a,...t}=e;const{className:c,...m}=t,o=n(a);return l.createElement("div",{className:"w-full h-auto "+c},a&&l.createElement("label",{htmlFor:o,className:r},a,m.required&&l.createElement("span",{className:"text-red-600"}," *")),l.createElement("textarea",Object.assign({id:o,name:o},m,{className:"w-full shadow min-h-[8rem] "+s})))},i=e=>{let{label:a,options:t,selected:c,className:m,requiredText:o,onChange:i}=e;const u=n(a),d=t.reduce(((e,a)=>(e[n(a)]=a,e)),{});return l.createElement("div",{className:"grid "+m},l.createElement("label",{htmlFor:u,className:r},a," ",o&&l.createElement("span",{className:"text-red-600"},"*")),l.createElement("select",{required:!!o,onChange:e=>i&&i(d[e.target.value]),id:u,name:u,className:"w-full shadow "+s},o&&l.createElement("option",{value:""},o),t.map(((e,a)=>e===c?l.createElement("option",{key:a,value:n(e),selected:!0},e):l.createElement("option",{key:a,value:n(e)},e)))))},u=e=>{let{label:a,options:t,className:s,onChange:c,required:m,defaulted:o}=e;return l.createElement("fieldset",{className:s},l.createElement("legend",{className:"block col-span-full "+r},a," ",m&&l.createElement("span",{className:"text-red-600"},"*")),t.map(((e,t)=>l.createElement("label",{key:t,className:"w-full flex gap-3xsmall"},l.createElement("input",{name:n(a),defaultChecked:0===t&&o,required:m,onChange:()=>c&&c(e),className:"cursor-pointer",value:e,type:"radio"}),l.createElement("span",{className:"block text-nowrap"},e)))))},d=e=>{let{label:a,options:t,className:s,selected:c=[]}=e;return l.createElement("fieldset",{className:s},l.createElement("legend",{className:"col-span-full "+r},a),t.map(((e,t)=>l.createElement(p,{key:t,checked:null==c?void 0:c.includes(t),label:e,name:n(a)}))))},p=e=>{let{label:a,name:t,checked:s}=e;return l.createElement("label",{className:"w-full flex gap-3xsmall"},l.createElement("input",{readOnly:!0,name:n(t),className:"cursor-pointer",value:a,defaultChecked:s,type:"checkbox"}),l.createElement("span",{className:"block text-nowrap"},a))};var g=()=>{const[e,a]=l.useState(0),[t,n]=l.useState("");return l.useEffect((()=>{let e=localStorage.getItem("email-enum-num")||"0";const t=parseInt(e)+1;a(t);const l=(new Date).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"});n("Test: "+t+" | "+l)}),[]),l.createElement("main",null,l.createElement("div",{className:"h-large bg-indigo-700 flex justify-center items-center"},l.createElement("h1",{className:"text-one font-bold text-white"},"TEST PAGE")),l.createElement("div",{className:"max-w-four px-4 lg:px-0 mx-auto text-med"},"Current Test: ",e),l.createElement(c,{preSubmit:()=>{localStorage.setItem("email-enum-num",""+e)},className:"grid grid-cols-6 lg:grid-cols-12 gap-2xsmall max-w-four mx-auto py-med px-small bg-gray-50 border shadow-md font-semibold text-stone-800"},l.createElement("input",{type:"hidden",name:"page",defaultValue:t}),l.createElement(m,{label:"First Name",className:"col-span-12 lg:col-span-6",defaultValue:"Johnny"}),l.createElement(m,{label:"Last Name",className:"col-span-12 lg:col-span-6",defaultValue:"Monk"}),l.createElement(m,{label:"Email",className:"col-span-12",defaultValue:"JohnnyMonk@gmail.com"}),l.createElement(u,{defaulted:!0,className:"w-full grid grid-cols-1 lg:grid-cols-2 col-span-12 lg:col-span-6",label:"Radio Group",options:["Option 1","Option 2","Option 3","Option 4"]}),l.createElement(d,{selected:[0,3],className:"w-full grid grid-cols-1 lg:grid-cols-2 col-span-12 lg:col-span-6",label:"Checkboxes",options:["Checkbox 1","Checkbox 2","Checkbox 3","Checkbox 4"]}),l.createElement(i,{label:"Rating",className:"col-span-12",options:["Amazing","Very Good","Good","Ok","Not Bad","Bad","Terrible"]}),l.createElement(o,{label:"Message?",className:"col-span-12",defaultValue:"This was a good test. :)"}),l.createElement("button",{type:"submit",className:"col-span-6 bg-indigo-600 text-white py-2xsmall rounded "},"Submit")))};const b=()=>l.createElement("title",null,"TEST!")}}]);
//# sourceMappingURL=component---src-pages-test-tsx-3a138d7c0971ec3e228c.js.map