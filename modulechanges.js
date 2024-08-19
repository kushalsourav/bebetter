// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const path = require('path');
const fs = require('fs');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    let webView; // Define webView outside of command handler
    let fileName = '';
    let dataToDisplay = '';

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    console.log('Congratulations, your extension "bebetter" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    const disposable = vscode.commands.registerCommand('bebetter.helloWorld', function () {
        // The code you place here will be executed every time your command is executed

        // Display a message box to the user
        vscode.window.showInformationMessage('Hello World from bebetter!');
        vscode.window.showInformationMessage('Hello World from be-better!');

        webView = vscode.window.createWebviewPanel('helloWorld', 'panel', vscode.ViewColumn.One, {
            enableScripts: true
        });

        const scriptUri = vscode.Uri.file(
            path.join(context.extensionPath, 'src', 'js', 'script.js')
        );
        const scriptPath = webView.webview.asWebviewUri(scriptUri);

        const onDiskHtmlPath = path.join(context.extensionPath, 'src', 'html', 'index.html');
        const htmlFile = fs.readFileSync(onDiskHtmlPath, 'utf-8')
            .replace(`<script type="module" src="../js/script.js" ></script>`, `<script type="module" src="${scriptPath}" ></script>`);
        webView.webview.html = htmlFile;

        // Initialize the webview with content from the active text editor
        const currentTextEditor = vscode.window.activeTextEditor;
        if (currentTextEditor) {
            const decodedData = currentTextEditor.document.getText();
            webView.webview.postMessage({ command: 'init', data: decodedData });
        }

        // Creating new Directory
        const onDiskPathForTextFiles = vscode.Uri.file(
            path.join(context.extensionPath, 'src', 'text')
        );
        vscode.workspace.fs.createDirectory(onDiskPathForTextFiles).then(() => {
            console.log('Directory created:', onDiskPathForTextFiles.toString());
        });

        // Handle changes in the active text editor
        vscode.window.onDidChangeActiveTextEditor((e) => {
            if (e) {
                fileName = e.document.fileName.split("\\").pop();
                const filePath = vscode.Uri.joinPath(onDiskPathForTextFiles, fileName);
                console.log('File path:', filePath.toString());
            }
        });

        // Handle text document changes
        vscode.workspace.onDidChangeTextDocument((e) => {
            if (e.document.uri.scheme === 'file' && e.document.uri.fsPath === vscode.window.activeTextEditor?.document.uri.fsPath) {
                const decodedData = e.document.getText();
                console.log('Data type:', typeof(decodedData));
                
                const encodedDataToUInt8Array = new TextEncoder().encode(decodedData);
                const filePath = path.join(context.extensionPath, 'src', 'text', fileName);
                vscode.workspace.fs.writeFile(vscode.Uri.file(filePath), encodedDataToUInt8Array).then(() => {
                    if (webView) {
                        webView.webview.postMessage({ command: 'init', data: decodedData });
                    }
                }).catch(err => console.error('Error writing file:', err));
            }
        });
    });

    context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
    activate,
    deactivate
}
