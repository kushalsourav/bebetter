export class CreateButton extends HTMLButtonElement {
    constructor() {
        super();
        
    }
}

customElements.define('create-button', CreateButton, {extends: 'button'})