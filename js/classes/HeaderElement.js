class HeaderElement extends HTMLElement {
    constructor() {
        super();
        // init shadow DOM
        this.attachShadow({ mode: 'open' });
    }

    // define which attributes trigger attributeChangedCallback
    static get observedAttributes() {
        return ['app-title'];
    }

    // called when element is added to DOM
    connectedCallback() {
        this.render();
        this.setupListeners();
    }

    // called when an observed attribute changes
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'app-title' && oldValue !== newValue) {
            const titleEl = this.shadowRoot.querySelector('h1');
            if (titleEl) {
                titleEl.textContent = newValue;
            }
        }
    }

    // called when element is removed from DOM (good practice for cleanup)
    disconnectedCallback() {
        const btn = this.shadowRoot.querySelector('.info-btn');
        if (btn) btn.replaceWith(btn.cloneNode(true)); 
    }

    render() {
        // get title from attribute or use default
        const title = this.getAttribute('app-title') || 'Garden Gacha Game';

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 100%;
                }
                
                header {
                    background-color: #4a7c3f;
                    color: #ede8e0;
                    padding: 1rem 2rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 4px solid #3a6b30;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                    font-family: 'Lato', sans-serif;
                }

                h1 {
                    margin: 0;
                    font-size: 1.8rem;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    text-shadow: 2px 2px 0px #2a4b20;
                }

                .header-actions {
                    display: flex;
                    gap: 1rem;
                    align-items: center;
                }

                .info-btn {
                    background: none;
                    border: 2px solid #ede8e0;
                    color: #ede8e0;
                    border-radius: 50%;
                    width: 32px;
                    height: 32px;
                    cursor: pointer;
                    font-weight: bold;
                    transition: all 0.2s ease;
                }

                .info-btn:hover {
                    background: #ede8e0;
                    color: #4a7c3f;
                }
            </style>

            <header>
                <h1>${title}</h1>
                <div class="header-actions">
                    <!-- Slot for external content -->
                    <slot name="custom-content"></slot>
                    <button class="info-btn" aria-label="Game Info">?</button>
                </div>
            </header>
        `;
    }

    setupListeners() {
        const btn = this.shadowRoot.querySelector('.info-btn');
        if (btn) {
            btn.addEventListener('click', () => {
                // dispatch custom event with payload
                this.dispatchEvent(new CustomEvent('header-info', {
                    bubbles: true,
                    composed: true,
                    detail: { 
                        timestamp: new Date().toISOString(),
                        source: 'app-header'
                    }
                }));
            });
        }
    }
}

customElements.define('app-header', HeaderElement);