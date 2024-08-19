export const func = () => console.log("hello world");


export class  GroupButton extends HTMLButtonElement {
    constructor() {
        super();
        this.addEventListener('click', () => {
            console.log("clicked")
        })
    }

   
}

customElements.define('group-button', GroupButton, {extends: 'button'})


 export class FileWindow extends HTMLParagraphElement  {
constructor() {
    super();
 
}
}

customElements.define('file-window', FileWindow, {extends: "p"})






