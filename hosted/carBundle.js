(()=>{var e={603:e=>{const t=e=>{document.querySelector(".notification").innerHTML+=e,document.querySelector(".notification").classList.remove("hidden")};e.exports={handleError:t,hideError:()=>{document.querySelector(".notification").classList.add("hidden")},sendPost:async(e,n,a)=>{const r=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)}),c=await r.json();document.querySelector(".notification").classList.add("hidden"),c.error&&t(c.error),c.redirect&&(window.location=c.redirect),a&&a(c)},sendCarPost:async(e,t,n)=>{const a=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}),r=await a.json();r.redirect&&(window.location=r.redirect),n&&n(r)}}}},t={};function n(a){var r=t[a];if(void 0!==r)return r.exports;var c=t[a]={exports:{}};return e[a](c,c.exports,n),c.exports}(()=>{const e=n(603);let t;const a=async n=>{if(n.preventDefault(),t){const t=n.target.querySelector('[name="skins"]:checked').value,a=n.target.querySelector("#_csrf").value;e.sendCarPost(n.target.action,{skin:t,_csrf:a},(e=>{ReactDOM.render(React.createElement(c,{skin:e.skin}),document.getElementById("carSection"))}))}return!1},r=e=>React.createElement("form",{id:"carForm",onSubmit:a,name:"carForm",action:"/car",method:"POST",className:"carForm"},React.createElement("input",{id:"yellowSkin",type:"radio",name:"skins",value:"/assets/img/cardefault.png",defaultChecked:!0}),React.createElement("label",{htmlFor:"yellowSkin"},"Yellow "),React.createElement("input",{id:"greenSkin",type:"radio",name:"skins",value:"/assets/img/cargreen.png"}),React.createElement("label",{htmlFor:"greenSkin"},"Green "),React.createElement("input",{id:"_csrf",type:"hidden",name:"_csrf",value:e.csrf}),React.createElement("input",{className:"raceSubmit",type:"submit",value:"Change Skin"})),c=e=>{const t=React.createElement("img",{src:e.skin||"/assets/img/cardefault.png",alt:"player car",className:"playerCar"});return React.createElement("div",{className:"carImage"},t)};window.onload=async()=>{const e=await fetch("/getToken"),n=await e.json();t=await fetch("/premium").then((e=>e.json())).then((e=>e.premium));const a=document.querySelector("nav-bar").shadowRoot.lastElementChild.lastElementChild.firstElementChild.lastElementChild;t?a.textContent="Premium Member!":a.addEventListener("click",(async e=>(e.preventDefault(),t=await fetch("/premium",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({_csrf:n.csrfToken})}).then((e=>e.json())).then((e=>e.premium)),e.target.textContent="Premium Member!",!1))),ReactDOM.render(React.createElement(r,{csrf:n.csrfToken}),document.getElementById("makeCar")),ReactDOM.render(React.createElement(c,{skin:"/assets/img/cardefault.png"}),document.getElementById("carSection")),(async()=>{const e=await fetch("/getCar"),t=await e.json();ReactDOM.render(React.createElement(c,{skin:t.skin}),document.getElementById("carSection"))})()}})()})();