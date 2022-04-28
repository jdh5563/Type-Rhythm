const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
<nav class="navbar is-fixed-top is-light" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
        <a class="navbar-item" href="/login" target="blank">
            <img src="/assets/img/favicon.png" alt="Race Page">
        </a>

        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarLinks">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
        </a>
    </div>

    <div id="navbarLinks" class="navbar-menu">
        <div class="navbar-start">
            <a class="navbar-item" href="/login">
                Race
            </a>

            <a class="navbar-item" href="/car">
                Make a Car
            </a>

            <a class="navbar-item" href="/premium">
                Become Premium
            </a>
        </div>
        <div class="navbar-end">
            <a class="navbar-item" href="/logout">
                Logout
            </a>
        </div>
    </div>
</nav>
`;

// Functionality for the navbar element
class NavBar extends HTMLElement {
    constructor(){
        super();

        this.attachShadow({mode: "open"});

        this.shadowRoot.appendChild(template.content.cloneNode(true));

        // Give the hamburger icon functionality only if it is appearing on the screen
        if(this.shadowRoot.querySelector(".navbar-burger")){
            this.shadowRoot.querySelector(".navbar-burger").onclick = e => {
                e.target.classList.toggle("is-active");
                this.shadowRoot.querySelector(".navbar-menu").classList.toggle("is-active");
            }
        }
    }
}

customElements.define('nav-bar', NavBar);