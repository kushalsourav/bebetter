
export class WelcomePage extends HTMLDivElement {

    constructor(){
        super();

        this.style.width = '100vw'
        this.style.height = '100vh'
        this.style.backgroundImage = `url(https://media.istockphoto.com/id/1835449495/photo/3d-black-abstract-dark-color-background-backdrop-wall-made-of-black-hexagon-polygons-empty.jpg?s=612x612&w=0&k=20&c=YdR3jmaFcxOiT3EhiO6BNV2FP1PRPqXfP4A0Z8nL49g=)`
        this.style.backgroundRepeat = 'no-repeat'
        this.style.backgroundSize = 'cover'
        this.style.backgroundPosition = 'center'
      
    }

    connectedCallback() {
        const template = document.getElementById('welcome-page');
        const content = template.content.cloneNode(true)
        this.appendChild(content)
        this.render()
    }

    render() {
        console.log("rendering")
    }

}

customElements.define('welcome-page', WelcomePage, {extends: 'div'})
