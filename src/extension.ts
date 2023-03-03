// import { ExtensionContext, commands, window } from "vscode";
import * as vscode from 'vscode';


export function activate(context: vscode.ExtensionContext) {
    let helloWorld = async () => {
        // Check components of the current file
        let editor = vscode.window.activeTextEditor;
        if (editor) {
            // Get the document text
            let doc_cur = editor.document;
            let name_cur = doc_cur.fileName;
            let text_cur = doc_cur.getText();
            let base_cur = name_cur.substring(name_cur.lastIndexOf("/")+1, name_cur.length);

            // Write Research
            if (/### Res_TBD\n./.test(text_cur)){
                let str_write = '![['+base_cur+'#Res_TBD]]'

                let fs = require('fs');
                let file_res = fs.readFileSync('/Users/edge/Documents/EdgeExplore/98_Notes/notes/daily.res.md', 'utf8')
                let text_res = file_res.split("---\n")[2].split("\n\n").slice(0,-1)

                if (!text_res.includes(str_write) && str_write>text_res[text_res.length-1]){
                    fs.appendFileSync('/Users/edge/Documents/EdgeExplore/98_Notes/notes/daily.res.md', str_write+'\n\n');
                } else if (!text_res.includes(str_write)){
                    let head_res = "---\n"+file_res.split("---\n")[1]+"---\n"
                    text_res.push(str_write)
                    text_res.sort()
                    let final = head_res + text_res.join("\n\n") + "\n\n"
                    fs.writeFileSync('/Users/edge/Documents/EdgeExplore/98_Notes/notes/daily.res.md', final);   
                }
            }


            // Write Triviality
            if (/### Triv_TBD\n./.test(text_cur)){
                let str_write = '![['+base_cur+'#Triv_TBD]]'

                let fs = require('fs');
                let file_res = fs.readFileSync('/Users/edge/Documents/EdgeExplore/98_Notes/notes/daily.triv.md', 'utf8')
                let text_res = file_res.split("---\n")[2].split("\n\n").slice(0,-1)

                if (!text_res.includes(str_write) && str_write>text_res[text_res.length-1]){
                    fs.appendFileSync('/Users/edge/Documents/EdgeExplore/98_Notes/notes/daily.triv.md', str_write+'\n\n');
                } else if (!text_res.includes(str_write)){
                    let head_res = "---\n"+file_res.split("---\n")[1]+"---\n"
                    text_res.push(str_write)
                    text_res.sort()
                    let final = head_res + text_res.join("\n\n") + "\n\n"
                    fs.writeFileSync('/Users/edge/Documents/EdgeExplore/98_Notes/notes/daily.triv.md', final);   
                }
            }

            // Write Meeting
            if (/### Meet_TBD\n./.test(text_cur)){
                let str_write = '![['+base_cur+'#Meet_TBD]]'

                let fs = require('fs');
                let file_res = fs.readFileSync('/Users/edge/Documents/EdgeExplore/98_Notes/notes/daily.meet.md', 'utf8')
                let text_res = file_res.split("---\n")[2].split("\n\n").slice(0,-1)

                if (!text_res.includes(str_write) && str_write>text_res[text_res.length-1]){
                    fs.appendFileSync('/Users/edge/Documents/EdgeExplore/98_Notes/notes/daily.meet.md', str_write+'\n\n');
                } else if (!text_res.includes(str_write)){
                    let head_res = "---\n"+file_res.split("---\n")[1]+"---\n"
                    text_res.push(str_write)
                    text_res.sort()
                    let final = head_res + text_res.join("\n\n") + "\n\n"
                    fs.writeFileSync('/Users/edge/Documents/EdgeExplore/98_Notes/notes/daily.meet.md', final);   
                }
            }

            vscode.window.showInformationMessage('Sync Succeeded!');      
    }}
    let command = vscode.commands.registerCommand(
        "edgeDH.syncDaily",
        helloWorld
    )

    context.subscriptions.push(command)
}
