"use strict";(self.webpackChunkmy_gatsby_site=self.webpackChunkmy_gatsby_site||[]).push([[962],{7095:function(e,t,n){n.r(t),n.d(t,{Head:function(){return g}});var a=n(5785),l=n(7294),i=n(5953),r=n(5948),c=n(80),m=n(2091),s=n(2649),o=n(7164);const d={h2:"Subheading",p:"Paragraph"},p=e=>{const{0:t,1:n}=(0,l.useState)({}),{0:c,1:m}=(0,l.useState)([]);(0,l.useEffect)((()=>{n({title:{id:"title",type:"h1",content:"<h1>The Title of the Blog</h1>"},subtitle:{id:"subtitle",type:"span",content:"<span>this article will highliht the world view of dem dems</span>"},"item-2":{id:"item-2",type:"h2",content:"<h2></h2>"},"item-3":{id:"item-3",type:"p",content:"<p></p>"},"item-4":{id:"item-4",type:"img",content:"This is an image of some shit coffee",src:"https://res.cloudinary.com/dur3duyjo/image/upload/v1711109877/Blog_Site/DALL_E_2024-03-16_19.05.47_-_Create_a_cartoon_image_of_a_confident_young_woman_sitting_on_a_beach._She_has_medium-dark_skin_is_wearing_a_bright_green_bikini_top_and_brown_bikini_ifiudk.webp"}}),m(["item-2","item-3","item-4"])}),[]);const p=e=>{const a=JSON.parse(JSON.stringify(t));delete a[e],n(a),m((t=>t.filter((t=>t!==e))))},g=()=>{},u=(new Date).toLocaleDateString("en-US",{weekday:"short",year:"numeric",month:"short",day:"numeric"});return l.createElement("main",null,l.createElement(r.Z5,{onDragEnd:e=>{const t=(0,s.Z)(c,e);t&&m(t)}},l.createElement(i.wp,null),l.createElement("div",{className:"flex justify-end mx-auto max-w-five"},l.createElement("div",{className:"flex flex-col md:flex-row items-center gap-small"},l.createElement(i.k$,{onSave:g}),l.createElement("div",{className:"flex items-cente gap-3xsmall"},l.createElement("label",{htmlFor:"Publish Toggle",className:"text-med"},"Published"),l.createElement(i.WU,{onChange:e=>{}})))),l.createElement("div",{className:"flex flex-col items-start blog mt-med container mx-auto px-4 md:px-0 xl:max-w-five min-h-[80vh]"},t.title&&l.createElement(l.Fragment,null,l.createElement(i.g0,{className:"w-full",placeholder:"Headline",primaryElement:"h1",secondaryElement:"none",onChange:()=>{},content:t.title.content}),l.createElement(i.g0,{className:"w-full",placeholder:"Subheadline",primaryElement:"span",id:"subtitle",secondaryElement:"none",onChange:()=>{},content:t.subtitle.content}),l.createElement("span",{id:"author"},"Inserted Author"),l.createElement("span",{id:"date"},u)),l.createElement(r.bK,{droppableId:"main"},((e,a)=>l.createElement("div",Object.assign({className:"borderl w-full",ref:e.innerRef},e.droppableProps),c.map(((e,a)=>l.createElement(h,{id:e,index:a,key:e,type:t[e].type,onDelete:p},"img"===t[e].type?l.createElement(i.n7,{index:a,handleChange:(t,a)=>((e,t,a)=>{n((n=>({...n,[e]:{...n[e],content:a,src:t}})))})(e,t,a),content:t[e].content,src:t[e].src}):l.createElement(i.g0,{className:"w-full",primaryElement:t[e].type,secondaryElement:"p"===t[e].type?"p":"none",onChange:e=>{},placeholder:d[t[e].type],content:t[e].content})))),e.placeholder))),l.createElement(i.Y$,{className:"mt-3xsmall",onClick:e=>{const t="blogitem-"+(0,o.Z)();m((e=>[].concat((0,a.Z)(e),[t]))),n("img"===e?n=>({...n,[t]:{id:t,type:e,file:"",content:"<label></label>"}}):n=>({...n,[t]:{id:t,type:e,content:"<"+e+"></"+e+">"}}))}}))),l.createElement(i.$_,{className:"mt-large"}))},h=e=>{let{id:t,index:n,children:a,type:i,onDelete:s}=e,o="0";switch(i){case"img":o="mt-4";break;case"h2":o="mt-2.5";break;case"p":o="mt-1"}return l.createElement(r._l,{draggableId:t,index:n},(e=>l.createElement("div",Object.assign({ref:e.innerRef},e.draggableProps,{className:"flex gap-2 "+o}),a,l.createElement("div",Object.assign({className:"relative primary h-8 w-8 flex rounded"},e.dragHandleProps),l.createElement(c.fE1,{size:"2rem"})),l.createElement("button",{onClick:()=>s(t),className:"relative accent h-8 w-8 flex items-center justify-center rounded"},l.createElement(m.Xm5,{size:"1rem"})))))};t.default=e=>l.createElement(i._j,Object.assign({WrappedComponent:p},e));const g=()=>l.createElement("title",null,"Create Blog")}}]);
//# sourceMappingURL=component---src-pages-create-blog-tsx-3610d488217462705c72.js.map