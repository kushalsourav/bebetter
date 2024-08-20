
import { func, GroupButton , FileWindow} from "./component.js";
import {instance} from "./callback.js";
import { WelcomePage } from "./components/WelcomePage.js";
import { JoinButton } from "./components/JoinButton.js";
import { CreateButton } from "./components/CreateButton.js";
import { ActiveDataDisplay } from "./components/ActiveDataDisplay.js";


let data = ''
const vscode = acquireVsCodeApi();


let mainPage = document.getElementById('main')
const welcomepage = new WelcomePage()
mainPage.appendChild(welcomepage)
welcomepage.setAttribute('is', 'welcome-page')

const createButton = new CreateButton()
createButton.setAttribute('is', 'create-button')
createButton.setAttribute('class', 'btn btn-primary')
createButton.textContent = "create"
welcomepage.appendChild(createButton)

const joinButton = new JoinButton()
joinButton.setAttribute('is', 'join-button')
joinButton.setAttribute('class', 'btn btn-secondary')
joinButton.textContent = "join"
welcomepage.appendChild(joinButton)

//const createButton = document.getElementById('create_group');

const activeDataDisplay = new ActiveDataDisplay();
activeDataDisplay.style.background = "#333"
activeDataDisplay.style.color = "#fff"
activeDataDisplay.style.padding = "40px"

joinButton.addEventListener("click" , (e) => {
e.preventDefault();
mainPage.removeChild(welcomepage)
mainPage.appendChild(activeDataDisplay)


})
 


try{
	window.addEventListener('message', (e) => {
		console.log(e, e.data)
		activeDataDisplay.textContent =  e.data.data
	})
}catch (err) {
	console.log(err, "is this causing error")
}


// const content = new FileWindow();
// content.setAttribute('is', 'file-window')
// content.style.color = '#ffffff'
// document.body.append(content)




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

// createButton.textContent = "gg"
// createButton.addEventListener("click", (e) => {
//     e.preventDefault();
//     console.log("working")
//     createGroup()
// 	func()
// })


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
