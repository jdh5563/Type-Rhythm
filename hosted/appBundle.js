(()=>{var e={982:e=>{let t;const a=e=>{t=e,console.log(t)},n=io();let r,c;e.exports={init:()=>{r=document.getElementById("canvas"),c=r.getContext("2d"),r.width=.6*window.innerWidth,r.height=.69*r.clientWidth,c.save(),c.fillStyle="white",c.fillRect(0,0,r.clientWidth,r.height),c.restore();const e=Object.keys(t.players);for(let a=0;a<e.length;a++){const n=new Image;n.onload=()=>{console.log("loading image"),document.createElement("img").src=t.players[e[a]].skin,c.drawImage(n,0,a*r.height/e.length,50,50)},n.src=t.players[e[a]].skin,console.log(t.players[e[a]])}window.addEventListener("resize",(()=>{r.width=.6*window.innerWidth,r.height=.69*r.clientWidth}))},createLobby:async e=>{const a=await fetch("/getUsername"),n=await a.json().then((e=>e)),r=await fetch("/getCar"),c=await r.json().then((e=>e)),o="ABCDEFGHIJKLMNOPQRSTUVWXYZ";let i="";for(let e=0;e<4;e++)i+=o[Math.floor(Math.random()*o.length)];const l={username:n.username,skin:c.skin,raceCode:i,_csrf:e},s=await fetch("/createLobby",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(l)});return t=await s.json(),console.log(t),t},joinLobby:async(e,r)=>{const c=await fetch("/getUsername"),o=await c.json().then((e=>e)),i=await fetch("/getCar"),l=await i.json().then((e=>e)),s={username:o.username,skin:l.skin,raceCode:e,_csrf:r},m=await fetch("/joinLobby",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)});t=await m.json(),n.emit("joinedLobby",t,a)},socket:n}}},t={};function a(n){var r=t[n];if(void 0!==r)return r.exports;var c=t[n]={exports:{}};return e[n](c,c.exports,a),c.exports}(()=>{const e=a(982);e.socket.on("joinedLobby",(async e=>{if(e.error){const t=e=>React.createElement("h1",null,e.error);ReactDOM.render(React.createElement(t,{error:e.error}))}else c(e.players,e.raceCode)}));const t=async t=>{t.preventDefault();const a=await e.createLobby(t.target.querySelector("#_csrf").value);c(a.players,a.raceCode)},n=async t=>{t.preventDefault(),await e.joinLobby(t.target.querySelector("#raceCode").value,t.target.querySelector("#_csrf").value)},r=async t=>{t.preventDefault(),await ReactDOM.render(React.createElement(l,null),document.getElementById("game-content")),e.init()},c=async(e,t)=>{ReactDOM.render(React.createElement(i,{players:e,raceCode:t}),document.getElementById("game-content"));const a=await fetch("/getUsername");e[(await a.json().then((e=>e))).username].owner||(document.getElementById("startButton").type="hidden")},o=e=>React.createElement("div",null,React.createElement("h1",null,"Join a Race!"),React.createElement("form",{id:"createForm",name:"createForm",onSubmit:t,action:"/createRace",method:"POST"},React.createElement("div",null,React.createElement("input",{type:"submit",value:"Create Race"})),React.createElement("input",{id:"_csrf",type:"hidden",name:"_csrf",value:e.csrf})),React.createElement("form",{id:"joinForm",name:"joinForm",onSubmit:n,action:"/joinRace",method:"POST"},React.createElement("div",null,React.createElement("input",{id:"raceCode",type:"text",placeholder:"Race Code"}),React.createElement("input",{type:"submit",value:"Join Race"})),React.createElement("input",{id:"_csrf",type:"hidden",name:"_csrf",value:e.csrf}))),i=e=>{const t=[];for(let a of Object.keys(e.players))t.push(React.createElement("div",{key:a},React.createElement("h3",null,e.players[a].username)));return React.createElement("div",null,t,React.createElement("div",null,"Race Code: ",e.raceCode),React.createElement("form",{id:"raceForm",name:"raceForm",onSubmit:r,action:"/startRace",method:"POST"},React.createElement("input",{id:"startButton",type:"submit",value:"Start Race"})))},l=e=>React.createElement("canvas",{id:"canvas"});window.onload=async()=>{const e=await fetch("/getToken"),t=await e.json();ReactDOM.render(React.createElement(o,{csrf:t.csrfToken}),document.getElementById("game-content"))}})()})();