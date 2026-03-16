class HeaderElement extends HTMLElement {
    //from html element
    constructor() {
        super();

    }
    //called when the element is added to the DOM
    connectedCallback() {
        this.innerHTML = `
        <header>
            <h1>Garden gacha game</h1>
        </header>
        `
    }
}
//define the custom element
customElements.define('app-header', HeaderElement);