(this["webpackJsonpline-chart-width-xaxis-padding"]=this["webpackJsonpline-chart-width-xaxis-padding"]||[]).push([[0],{250:function(e,t,a){},468:function(e,t,a){"use strict";a.r(t);var o=a(231),s=(a(250),a(470)),n=a(472),r=a(471),c=a(243),i=a(244),d=a(43),p=a(59),j=a(242),b=a(57),u=a(12);var l=a(129);const m=[{name:"Page A",uv:4e3,pv:2400,amt:2400},{name:"Page B",uv:3e3,pv:1398,amt:2210},{name:"Page C",uv:2e3,pv:9800,amt:2290},{name:"Page D",uv:2780,pv:3908,amt:2e3},{name:"Page E",uv:1890,pv:4800,amt:2181},{name:"Page F",uv:2390,pv:3800,amt:2500},{name:"Page G",uv:3490,pv:4300,amt:2100}],v=e=>{const t=(e=>{const t=Object(l.b)(e),a=Object(l.a)(e),o=t+a,s=a-t;return{zScoreOf:(n=a,r=t,e=>(e-n)/r),bounds:{upper:Math.max(o,s),lower:Math.min(o,s)}};var n,r})(e),a=e.sort(((e,t)=>e-t));return{zScore:t,isInRedZone:e=>Math.abs(t.zScoreOf(e))>1,bounds:{min:a[0]||0,max:a[a.length-1]||0}}};function x(){const e=v(m.map((e=>e.pv))),t=v(m.map((e=>e.uv))),a=O("red","#8884d8",e.bounds.min,e.bounds.max,e.zScore.bounds.lower,e.zScore.bounds.upper,"zScoreLinePv",(e=>e.pv)),o=O("red","#82ca9d",t.bounds.min,t.bounds.max,t.zScore.bounds.lower,t.zScore.bounds.upper,"zScoreLineUv",(e=>e.uv));return Object(u.jsx)(u.Fragment,{children:Object(u.jsx)(s.a,{width:"100%",height:300,children:Object(u.jsxs)(n.a,{data:m,margin:{top:20},accessibilityLayer:!0,children:[Object(u.jsxs)("defs",{children:[a.gradient,o.gradient]}),Object(u.jsx)(r.a,{strokeDasharray:"3 3"}),Object(u.jsx)(c.a,{dataKey:"name",padding:{left:30,right:30}}),Object(u.jsx)(i.a,{}),Object(u.jsx)(d.a,{}),Object(u.jsx)(p.a,{}),Object(u.jsx)(j.a,{type:"monotone",dataKey:"pv",stroke:a.lineStroke,dot:a.dot,activeDot:e=>a.activeDot(e)}),Object(u.jsx)(j.a,{type:"monotone",dataKey:"uv",stroke:o.lineStroke,dot:o.dot,activeDot:e=>o.activeDot(e)})]})})})}const O=(e,t,a,o,s,n,r,c)=>{console.log(a,o,s,n);const i=(d=e,p=t,j=Math.abs(o-a),(e,t)=>Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)("stop",{offset:e/j,stopColor:d,stopOpacity:1}),Object(u.jsx)("stop",{offset:e/j,stopColor:p,stopOpacity:1}),Object(u.jsx)("stop",{offset:t/j,stopColor:p,stopOpacity:1}),Object(u.jsx)("stop",{offset:t/j,stopColor:d,stopOpacity:1})]}));var d,p,j;const l=e=>Math.abs(e-a);return{gradient:Object(u.jsx)("linearGradient",{id:r,x1:0,y1:1,x2:0,y2:0,children:i(l(s),l(n))}),lineStroke:`url(#${r})`,dot:e=>{const a=c(e.payload),o=a>n||a<s;return Object(u.jsx)(b.a,{...e,fill:o?"red":"white",stroke:o?"red":t})},activeDot:e=>{const a=c(e.payload),o=a>n||a<s;return Object(u.jsx)(b.a,{...e,fill:o?"red":t})}}},h=document.getElementById("root");Object(o.render)(Object(u.jsx)(x,{}),h)}},[[468,1,2]]]);
//# sourceMappingURL=main.013d0eeb.chunk.js.map