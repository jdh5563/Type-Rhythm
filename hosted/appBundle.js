(()=>{var e={982:e=>{let t;const a=e=>{t=e},n=io();let r,c;const o=[],i=(e,t,a,n,r,c)=>{if((c=c||0)<=0)e.fillText(t,a,n);else{for(let o=1;o<=t.length;o++){const s=t.substr(0,o);if(e.measureText(s).width>c)return e.fillText(t.substr(0,o-1),a,n),void i(e,t.substr(o-1),a,n+r,r,c)}e.fillText(t,a,n)}};e.exports={init:async()=>{r=document.getElementById("canvas"),c=r.getContext("2d"),r.width=.6*window.innerWidth,r.height=.69*r.clientWidth,c.save(),c.fillStyle="white",c.fillRect(0,0,r.clientWidth,r.height),c.restore();const e=await fetch("/generateParagraph"),a=(await e.json()).paragraph;c.save(),c.font="16px Arial",i(c,a,10,.75*r.height,20,r.width-20),c.restore();const n=Object.keys(t.players);for(let e=0;e<n.length;e++)o.push(new Image),o[e].onload=()=>{c.drawImage(o[e],0,e*r.height/n.length,50,50)},o[e].src=t.players[n[e]].skin;window.addEventListener("resize",(()=>{r.width=.6*window.innerWidth,r.height=.69*r.clientWidth,c.save(),c.font="16px Arial",i(c,a,10,.75*r.height,20,r.width-20),c.restore();for(let e=0;e<n.length;e++)o.push(new Image),o[e].onload=()=>{c.drawImage(o[e],0,e*r.height/n.length,50,50)},o[e].src=t.players[n[e]].skin}))},createLobby:async e=>{const a=await fetch("/getUsername"),r=await a.json().then((e=>e)),c=await fetch("/getCar"),o=await c.json().then((e=>e)),i="ABCDEFGHIJKLMNOPQRSTUVWXYZ";let s="";for(let e=0;e<4;e++)s+=i[Math.floor(Math.random()*i.length)];const l={username:r.username,skin:o.skin,raceCode:s,_csrf:e},m=await fetch("/createLobby",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(l)});return t=await m.json(),n.emit("createdLobby",t.raceCode),t},joinLobby:async(e,r)=>{const c=await fetch("/getUsername"),o=await c.json().then((e=>e)),i=await fetch("/getCar"),s=await i.json().then((e=>e)),l={username:o.username,skin:s.skin,raceCode:e,_csrf:r},m=await fetch("/joinLobby",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(l)});t=await m.json(),a(t),n.emit("changedLobby",t,!0)},leaveLobby:async e=>{const a=await fetch("/getUsername"),r={username:(await a.json().then((e=>e))).username,raceCode:t.raceCode,_csrf:e},c=await fetch("/leaveLobby",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)});t=await c.json(),n.emit("changedLobby",t,!1),t={}},setLobby:a,socket:n}}},t={};function a(n){var r=t[n];if(void 0!==r)return r.exports;var c=t[n]={exports:{}};return e[n](c,c.exports,a),c.exports}(()=>{const e=a(982);e.socket.on("changedLobby",(async t=>{if(t.error){const e=e=>React.createElement("h1",null,e.error);ReactDOM.render(React.createElement(e,{error:t.error}))}else e.setLobby(t),o(t.players,t.raceCode)})),e.socket.on("startedRace",(async()=>{await ReactDOM.render(React.createElement(l,null),document.getElementById("game-content")),await e.init()}));const t=async t=>{t.preventDefault();const a=await e.createLobby(t.target.querySelector("#_csrf").value);o(a.players,a.raceCode)},n=async t=>{t.preventDefault(),await e.joinLobby(t.target.querySelector("#raceCode").value,t.target.querySelector("#_csrf").value),lobbyJSON.error?ReactDOM.render(React.createElement(Error,{error:lobbyJSON.error})):o(lobbyJSON.players,lobbyJSON.raceCode)},r=async t=>{t.preventDefault(),await e.leaveLobby(t.target.querySelector("#_csrf").value),ReactDOM.render(React.createElement(i,{csrf:t.target.querySelector("#_csrf").value}),document.getElementById("game-content"))},c=t=>{t.preventDefault(),e.socket.emit("startedRace")},o=async(e,t)=>{const a=await fetch("/getToken"),n=await a.json();ReactDOM.render(React.createElement(s,{players:e,raceCode:t,csrf:n.csrfToken}),document.getElementById("game-content"));const r=await fetch("/getUsername");e[(await r.json().then((e=>e))).username].owner||(document.getElementById("startButton").type="hidden")},i=e=>React.createElement("div",null,React.createElement("h1",null,"Join a Race!"),React.createElement("form",{id:"createForm",name:"createForm",onSubmit:t,action:"/createRace",method:"POST"},React.createElement("div",null,React.createElement("input",{type:"submit",value:"Create Race"})),React.createElement("input",{id:"_csrf",type:"hidden",name:"_csrf",value:e.csrf})),React.createElement("form",{id:"joinForm",name:"joinForm",onSubmit:n,action:"/joinRace",method:"POST"},React.createElement("div",null,React.createElement("input",{id:"raceCode",type:"text",placeholder:"Race Code"}),React.createElement("input",{type:"submit",value:"Join Race"})),React.createElement("input",{id:"_csrf",type:"hidden",name:"_csrf",value:e.csrf}))),s=e=>{const t=[];for(let a of Object.keys(e.players))t.push(React.createElement("div",{key:a},React.createElement("h3",null,e.players[a].username)));return React.createElement("div",null,t,React.createElement("div",null,"Race Code: ",e.raceCode),React.createElement("form",{id:"raceForm",name:"raceForm",onSubmit:c,action:"/startRace",method:"POST"},React.createElement("input",{id:"startButton",type:"submit",value:"Start Race"})),React.createElement("form",{id:"leaveForm",name:"leaveForm",onSubmit:r,action:"/leaveRace",method:"POST"},React.createElement("input",{id:"leaveButton",type:"submit",value:"Leave Lobby"}),React.createElement("input",{id:"_csrf",type:"hidden",name:"_csrf",value:e.csrf})))},l=e=>React.createElement("div",null,React.createElement("canvas",{id:"canvas"}));window.onload=async()=>{const e=await fetch("/getToken"),t=await e.json(),a=await fetch("/premium").then((e=>e.json())).then((e=>e.premium)),n=document.getElementById("premiumButton");a?n.textContent="Premium Member!":n.addEventListener("click",(async e=>(e.preventDefault(),await fetch("/premium",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({_csrf:t.csrfToken})}),e.target.textContent="Premium Member!",!1))),ReactDOM.render(React.createElement(i,{csrf:t.csrfToken}),document.getElementById("game-content"))}})()})();