(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{28:function(e,t,r){"use strict";r.r(t);var s=r(3),n=r(4),a=r(6),i=r(5),o=r(0),c=r(2),u=r.n(c),l=r(15),h=r.n(l),p=r(10),v=r(14),d=(r(7),function(e){Object(a.a)(r,e);var t=Object(i.a)(r);function r(){return Object(s.a)(this,r),t.apply(this,arguments)}return Object(n.a)(r,[{key:"render",value:function(){var e=this;return Object(o.jsx)("button",{style:{animation:this.props.animate,color:this.props.color},className:this.props.value?"square":"square empty",onClick:function(){e.props.onClickFun()},children:this.props.value})}}]),r}(u.a.Component)),m=function(e){Object(a.a)(r,e);var t=Object(i.a)(r);function r(){return Object(s.a)(this,r),t.apply(this,arguments)}return Object(n.a)(r,[{key:"renderSquare",value:function(e){var t=this,r=[];this.props.winners&&(r=this.props.winners[1]);var s=null;return s="X"===this.props.squares[e]?"#202020":"whitesmoke",Object(o.jsx)(d,{animate:r.includes(e)?"anim 1s linear infinite":"none",value:this.props.squares[e],color:s,onClickFun:function(){return t.props.onClick(e)}})}},{key:"render",value:function(){return Object(o.jsxs)("div",{className:"game-board",children:[this.renderSquare(0),this.renderSquare(1),this.renderSquare(2),this.renderSquare(3),this.renderSquare(4),this.renderSquare(5),this.renderSquare(6),this.renderSquare(7),this.renderSquare(8)]})}}]),r}(u.a.Component),j=r(16),f=r(17),b=function(e){Object(a.a)(r,e);var t=Object(i.a)(r);function r(){var e;Object(s.a)(this,r);for(var n=arguments.length,a=new Array(n),i=0;i<n;i++)a[i]=arguments[i];return(e=t.call.apply(t,[this].concat(a))).state={stepNumber:0,history:[{squares:Array(9).fill(null),move:[],onTree:null}],xIsNext:!0,orderAsc:!0,pcFirst:!0},e.toggleOrder=function(){e.setState({orderAsc:!e.state.orderAsc})},e}return Object(n.a)(r,[{key:"componentDidMount",value:function(){if(!y){console.log("MAKING TREE...");var e,t,r=this.state.history;this.state.pcFirst?(e="X",t="O"):(e="O",t="X"),g(y=new x(r[r.length-1].squares,null,null,!!this.state.pcFirst),e,t),k(y,e,0,8),this.setState({history:[{squares:Array(9).fill(null),move:[],onTree:y}]})}}},{key:"componentDidUpdate",value:function(){var e=this,t=this.state.xIsNext&&this.state.pcFirst||!this.state.xIsNext&&!this.state.pcFirst;if(1==this.props.mode&&t){var r=this.state.history.slice(0,this.state.stepNumber+1),s=r[r.length-1];console.log(s),setTimeout((function(){e.computerMove(s)}),700)}}},{key:"handleClick",value:function(e){var t=this.state.xIsNext&&this.state.pcFirst||!this.state.xIsNext&&!this.state.pcFirst;1==this.props.mode&&t||this.makeMove(e)}},{key:"makeMove",value:function(e){var t=this.state.history.slice(0,this.state.stepNumber+1),r=t[t.length-1],s=r.squares.slice();if(!O(s)&&!s[e]){s[e]=this.state.xIsNext?"X":"O";var n=[Math.floor(e/3)+1,e%3+1],a=r.onTree.children.find((function(t){return t.myMove==e}));this.setState({history:t.concat([{squares:s,move:n,onTree:a}]),xIsNext:!this.state.xIsNext,stepNumber:t.length}),console.log("ontree",a)}}},{key:"computerMove",value:function(e){e.squares;var t=e.onTree,r=[];console.log(t),t.children.forEach((function(e){t.value==e.value&&r.push(e.myMove)}));var s=r[Math.floor(Math.random()*r.length)];this.makeMove(s)}},{key:"jumpTo",value:function(e){this.setState({stepNumber:e,xIsNext:e%2===0})}},{key:"render",value:function(){var e,t=this,r=this.state.history,s=r[this.state.stepNumber],n=O(s.squares),a=r.map((function(e,r,s){var n=r?"".concat(r%2?"X":"O"," to ").concat(t.state.history[r].move):"Go to game start";return Object(o.jsx)("li",{children:Object(o.jsx)("button",{onClick:function(){return t.jumpTo(r)},style:{fontWeight:r===t.state.stepNumber?"600":"400"},children:n})},r)}));return this.state.orderAsc||(a=a.reverse()),e=9==this.state.stepNumber?"DRAW":n?"Winner: "+n[0]:"Next player: "+(this.state.xIsNext?"X":"O"),Object(o.jsxs)("div",{className:this.props.isActive?"game on-screen":"game",children:[Object(o.jsx)("div",{className:"game-board-wrapper",children:Object(o.jsx)(m,{squares:s.squares,onClick:function(e){return t.handleClick(e)},winners:n})}),Object(o.jsxs)("div",{className:"game-info",children:[Object(o.jsx)("div",{children:e}),Object(o.jsxs)("p",{onClick:this.toggleOrder,children:["Moves ",Object(o.jsx)("span",{style:{transform:this.state.orderAsc?"":"rotate(180deg)"},children:Object(o.jsx)(j.a,{icon:f.a})})]}),Object(o.jsx)("ol",{children:a})]})]})}}]),r}(u.a.Component);function O(e){for(var t=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]],r=0;r<t.length;r++){var s=Object(v.a)(t[r],3),n=s[0],a=s[1],i=s[2];if(e[n]&&e[n]===e[a]&&e[n]===e[i])return[e[n],[n,a,i]]}return null}var x=function e(t,r,n,a){Object(s.a)(this,e),this.squares=t,this.myMove=n,this.parent=r,this.children=[],this.value=null,this.maxer=a},y=null;function g(e,t,r){if(!O(e.squares)){var s,n=!e.maxer;s=e.maxer?t:r;for(var a=0;a<9;a++)if(null==e.squares[a]){var i=Object(p.a)(e.squares);i[a]=s;var o=new x(i,e,a,n);e.children.push(o)}0!=e.children.length&&e.children.forEach((function(e){g(e,t,r)}))}}function k(e,t,r,s){return 0==e.children.length?e.value=function(e,t){for(var r=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]],s=0,n=0;n<8;n++){var a=Object(v.a)(r[n],3),i=a[0],o=a[1],c=a[2],u=0,l=0;"O"==e[i]&&u++,"O"==e[o]&&u++,"O"==e[c]&&u++,"X"==e[i]&&l++,"X"==e[o]&&l++,"X"==e[c]&&l++,3==u?s+=100:3==l?s=-100:0==l?1==u?s+=1:2==u&&(s+=3):0==u&&(1==l?s-=1:2==l&&(s-=3))}return"O"==t?s:-s}(e.squares,t):e.maxer?e.value=Math.max.apply(Math,Object(p.a)(e.children.map((function(e){return k(e,t)})))):e.maxer||(e.value=Math.min.apply(Math,Object(p.a)(e.children.map((function(e){return k(e,t)}))))),e.value}var q=function(e){Object(a.a)(r,e);var t=Object(i.a)(r);function r(){return Object(s.a)(this,r),t.apply(this,arguments)}return Object(n.a)(r,[{key:"render",value:function(){var e=this;return Object(o.jsxs)("div",{className:this.props.isActive?"button-container on-screen":"button-container",children:[Object(o.jsx)("button",{onClick:function(){return e.props.handleClick(1)},children:"VS COM"}),Object(o.jsx)("button",{onClick:function(){return e.props.handleClick(2)},children:"2 PLAYERS"})]})}}]),r}(u.a.Component),N=function(e){Object(a.a)(r,e);var t=Object(i.a)(r);function r(){var e;Object(s.a)(this,r);for(var n=arguments.length,a=new Array(n),i=0;i<n;i++)a[i]=arguments[i];return(e=t.call.apply(t,[this].concat(a))).state={stage:"setup",mode:null},e.handleClick=function(t){1==t?e.setState({mode:1,stage:"game"}):2==t?e.setState({mode:2,stage:"game"}):alert("something went wrong - mode has unexpected value")},e}return Object(n.a)(r,[{key:"render",value:function(){return Object(o.jsxs)("div",{className:"game-container",children:[Object(o.jsx)(q,{isActive:"setup"===this.state.stage,handleClick:this.handleClick}),Object(o.jsx)(b,{isActive:"game"===this.state.stage,mode:this.state.mode})]})}}]),r}(u.a.Component);h.a.render(Object(o.jsx)(N,{}),document.getElementById("root"))},7:function(e,t,r){}},[[28,1,2]]]);
//# sourceMappingURL=main.b484854b.chunk.js.map