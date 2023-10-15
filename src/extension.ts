import * as vscode from "vscode";
import { exec } from "child_process";

export function activate(context: vscode.ExtensionContext) {
  const outputChannel = vscode.window.createOutputChannel("JavaScript Output");

  const disposable = vscode.commands.registerCommand(
    "extension.runJavaScript",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const selectedCode = editor.document.getText(editor.selection);

        if (selectedCode) {
          exec(`node -e "${selectedCode}"`, (error, stdout) => {
            if (error) {
              outputChannel.appendLine(`Error: ${error.message}`);
            } else {
              outputChannel.appendLine(stdout);
            }
            outputChannel.show();
          });
        } else {
          vscode.window.showWarningMessage("No text selected.");
        }
      } else {
        vscode.window.showWarningMessage("No active editor found.");
      }
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
