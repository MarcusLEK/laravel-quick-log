import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	let addInfoLog = vscode.commands.registerCommand('laravel-quick-log.addInfoLog', () => {

		const editor: vscode.TextEditor | undefined = vscode.window.activeTextEditor;
		if (!editor) {
			return;
		}

		const document: vscode.TextDocument = editor.document;
		const selection: vscode.Selection = editor.selection;

		let word = document.getText(selection);
		// removes `;` from selection
		if (word.includes(";")) {
			word = word.replace(";", "");
		}

		const insert = `info(${word}); \n`;
		let insertPosition = new vscode.Position(selection.active.line + 1, 0);

		editor.edit(editBuilder => {
			editBuilder.insert(insertPosition, insert);
		});
	});

	context.subscriptions.push(addInfoLog);
}
