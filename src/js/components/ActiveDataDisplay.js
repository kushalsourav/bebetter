export class ActiveDataDisplay extends HTMLDivElement {
     constructor(){
        super();
        
     }

     connectedCallback() {
        const template = document.getElementById('editor');
        const content = template.content.cloneNode(true)
        this.appendChild(content)
        this.render()
     }
     render() {

     }
}

customElements.define("active-data", ActiveDataDisplay, {extends: 'div'});

