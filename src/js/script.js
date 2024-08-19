
import { func, GroupButton , FileWindow} from "./component.js";
import {instance} from "./callback.js";


let data = ''
const vscode = acquireVsCodeApi();



const createButton = document.getElementById('create_group');

const content = new FileWindow();
content.setAttribute('is', 'file-window')
content.style.color = '#ffffff'
document.body.append(content)

try{
	window.addEventListener('message', (e) => {
		console.log(e, e.data)
		content.textContent = `${e.data.data}`
	})
}catch (err) {
	console.log(err, "is this causing error")
}



console.log(createButton)
const button = new GroupButton()
console.log(button)

//  const data = instance.retiveData()
// console.log(data)


button.setAttribute('is', 'group-button');

button.textContent = "click me 3";

document.body.appendChild(button)


//displaying content


// content.innerText = `${data}`

createButton.textContent = "gg"
createButton.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("working")
    createGroup()
	func()
})


const createGroup = async () => {
	 console.log("called")
    await axios.post('http://localhost:3000/api/group', {title:"from axios", code: 200})
	 await fetch('http://localhost:3000/api/group', {
		method: 'post',
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		  },
		body: JSON.stringify({
			title: 'CIA',
			code: 234
		})

	 }).then((res) => console.log(res.json()))
   
}

console.log("gg");
