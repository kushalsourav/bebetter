
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const path = require('path');
const fs = require('fs');
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed






/**
 * @param {vscode.ExtensionContext} context
 */

function activate(context) {
  let webView 
  let fileName = ''


	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "bebetter" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('bebetter.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from bebetter!');
		vscode.window.showInformationMessage('Hello World from be-better!');

		 webView = vscode.window.createWebviewPanel('helloWorld', 'panel', vscode.ViewColumn.One, {
			enableScripts: true,
			retainContextWhenHidden: true,
		})
		const scriptUri = vscode.Uri.file(
			path.join(context.extensionPath, 'src', 'js', 'script.js')
		)
		const scriptPath = webView.webview.asWebviewUri(scriptUri)

		const onDiskHtmlPath = path.join(context.extensionPath, 'src', 'html', 'index.html')
        const htmlFile = fs.readFileSync(onDiskHtmlPath, 'utf-8').replace(`<script type="module" src="../js/script.js" ></script>`, `<script type="module" src="${scriptPath}" ></script>`)
		webView.webview.html = htmlFile;
		webView.onDidChangeViewState((e) => {
			console.log("eee", e)
		})
   
		// console.log(webView.webview.postMessage({command: 'init', data: vscode.window.activeTextEditor.document.getText()}))


		// const readFileFirst = vscode.window.activeTextEditor;
		// const currentTextEditor = vscode.window.activeTextEditor;
		// const filePath = vscode.Uri.file(path.join(context.extensionPath, 'src', 'text', 'script.js'))
		// vscode.workspace.fs.readFile().then((e) => {

        //         const data = new TextDecoder().decode(e);
		// 		console.log("data priting from text files",data)
		// 		webView.webview.postMessage({
		// 			command : 'init',
		// 			data: data
		// 		})
		// })
		// if(currentTextEditor) {
		// 	const decodedData = currentTextEditor.document.getText();
		// 	webView.webview.postMessage({
		// 		command : 'init',
		// 		data: decodedData
		// 	})
		// }
        
	

		 //creating new Directory
      
		 const onDiskPathForTextFiles = vscode.Uri.file( 
			path.join(context.extensionPath, 'src', 'text')
		 );
         vscode.workspace.fs.createDirectory(onDiskPathForTextFiles).then(() => {
			console.log(onDiskPathForTextFiles.toString())
		 })
		
		vscode.window.onDidChangeActiveTextEditor((e) => {
			if (e && e.document.uri.scheme === 'vscode-webview') {
				webView.reveal(vscode.ViewColumn.One, true);
			}
			if(e) {
				fileName = e.document.fileName.split("\\").pop();
	
				const filePath = vscode.Uri.joinPath(onDiskPathForTextFiles, fileName)
				console.log('File path:', filePath.toString());
			}
		})

		// vscode.workspace.onDidChangeTextDocument((e) => {
		// 	const currentTextEditor =  vscode.window.activeTextEditor
	       
	
			
		// 	const decodedData =	currentTextEditor?.document.getText()
		// 	console.log(typeof(decodedData))
			
		// 	const encodedDataToUInt8Array = new TextEncoder().encode(decodedData)
		// 	vscode.workspace.fs.writeFile(vscode.Uri.file(path.join(context.extensionPath, 'src', 'text', vscode.window.activeTextEditor?.document.fileName.split("\\").at(-1))), encodedDataToUInt8Array)
	    //     console.log(webView, webView.webview)
			
		// 	// webView.webview.postMessage({command: 'init', data: encodedDataToUInt8Array})
		// 	// console.log(webView.webview.postMessage({command: 'init', data: "hello lufy"}))
		// 	// console.log("from here",webView.webview.postMessage({command: 'init', data: encodedDataToUInt8Array}))
	
		// })
		// vscode.workspace.onDidChangeTextDocument((e) => {
        //     if (e.document.uri.scheme === 'file' && e.document.uri.fsPath === vscode.window.activeTextEditor?.document.uri.fsPath) {
        //         const decodedData = e.document.getText();
        //         console.log('Data type:', typeof(decodedData));
                
        //         const encodedDataToUInt8Array = new TextEncoder().encode(decodedData);
        //         const filePath = path.join(context.extensionPath, 'src', 'text', fileName);
        //         vscode.workspace.fs.writeFile(vscode.Uri.file(filePath), encodedDataToUInt8Array).then(() => {
        //             if (webView) {
        //                 webView.webview.postMessage({ command: 'init', data: "hello" });
	
        //             }
        //         }).catch(err => console.error('Error writing file:', err));
        //     }
        // });

		vscode.workspace.onDidChangeTextDocument((e) => {
			if (e.document.uri.scheme === 'file' && e.document.uri.fsPath === vscode.window.activeTextEditor?.document.uri.fsPath) {
				const decodedData = e.document.getText();
				console.log('Data type:', typeof(decodedData));
				
				const encodedDataToUInt8Array = new TextEncoder().encode(decodedData);
				const filePath = path.join(context.extensionPath, 'src', 'text', fileName);
				vscode.workspace.fs.writeFile(vscode.Uri.file(filePath), encodedDataToUInt8Array)
					.then(() => {
						if (webView) {
							console.log("omming")
							console.log(webView.viewType,webView.webview, webView.webview.postMessage({true: "true"}))
							if (webView.viewType) {
								console.log("omkkming")
								webView.webview.postMessage({ command: 'init', data: decodedData });
							} else {
								console.error('WebView is not active');
							}
						} else {
							console.error('WebView is undefined');
						}
					})
					.catch(err => console.error('Error writing file:', err));
			}
		});


    // let testFilePath = vscode.Uri.file(path.join(context.extensionPath, 'src', 'text', vscode.window.activeTextEditor?.document.fileName.split("\\").at(-1)))
	// 	const textfile = vscode.workspace.fs.readFile(testFilePath).then((e) => {
	// 		const decodedFile = new TextDecoder().decode(e)
		
	// 		return decodedFile
	// 	})
	// 	console.log(textfile)



		// for displaying the all files and streaming them is also mandatory, for that use textdocuments and ...spreadparams and map over it 








	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}


module.exports = {
	activate,
	deactivate
}
