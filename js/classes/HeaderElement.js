class HeaderElement extends HTMLElement {
    constructor() {
        super();

    }
    connectedCallback() {
        this.innerHTML = `
        <header>
            <h1>Garden gacha game</h1>
        </header>
        `
    }
}
customElements.define('app-header', HeaderElement);