// import { ExtensionContext, commands, window } from "vscode";
import * as vscode from 'vscode';


export function activate(context: vscode.ExtensionContext) {
    let syncDaily = async () => {
        // Check components of the current file
        let editor = vscode.window.activeTextEditor;
        if (editor) {
            // Get the document text
            let doc_cur = editor.document;
            let name_cur = doc_cur.fileName;
            let text_cur = doc_cur.getText();
            let base_cur = name_cur.substring(name_cur.lastIndexOf("/")+1, name_cur.length);
            let dir_cur = name_cur.substring(0,name_cur.lastIndexOf("/")+1);

            // Write Research
            if (/### Res_TBD\n./.test(text_cur)){
                let str_write = '![['+base_cur+'#Res_TBD]]'

                let fs = require('fs');
                let file_res = fs.readFileSync(dir_cur+'daily.res.md', 'utf8')
                let text_res = file_res.split("---\n")[2].split("\n\n").slice(0,-1)

                if (!text_res.includes(str_write) && str_write>text_res[text_res.length-1]){
                    fs.appendFileSync(dir_cur+'daily.res.md', str_write+'\n\n');
                } else if (!text_res.includes(str_write)){
                    let head_res = "---\n"+file_res.split("---\n")[1]+"---\n"
                    text_res.push(str_write)
                    text_res.sort()
                    let final = head_res + text_res.join("\n\n") + "\n\n"
                    fs.writeFileSync(dir_cur+'daily.res.md', final);   
                }
            }


            // Write Triviality
            if (/### Triv_TBD\n./.test(text_cur)){
                let str_write = '![['+base_cur+'#Triv_TBD]]'

                let fs = require('fs');
                let file_triv = fs.readFileSync(dir_cur+'daily.triv.md', 'utf8')
                let text_triv = file_triv.split("---\n")[2].split("\n\n").slice(0,-1)

                if (!text_triv.includes(str_write) && str_write>text_triv[text_triv.length-1]){
                    fs.appendFileSync(dir_cur+'daily.triv.md', str_write+'\n\n');
                } else if (!text_triv.includes(str_write)){
                    let head_triv = "---\n"+file_triv.split("---\n")[1]+"---\n"
                    text_triv.push(str_write)
                    text_triv.sort()
                    let final = head_triv + text_triv.join("\n\n") + "\n\n"
                    fs.writeFileSync(dir_cur+'daily.triv.md', final);   
                }
            }

            // Write Meeting
            if (/### Meet_TBD\n./.test(text_cur)){
                let str_write = '![['+base_cur+'#Meet_TBD]]'

                let fs = require('fs');
                let file_meet = fs.readFileSync(dir_cur+'daily.meet.md', 'utf8')
                let text_meet = file_meet.split("---\n")[2].split("\n\n").slice(0,-1)

                if (!text_meet.includes(str_write) && str_write>text_meet[text_meet.length-1]){
                    fs.appendFileSync(dir_cur+'daily.meet.md', str_write+'\n\n');
                } else if (!text_meet.includes(str_write)){
                    let head_meet = "---\n"+file_meet.split("---\n")[1]+"---\n"
                    text_meet.push(str_write)
                    text_meet.sort()
                    let final = head_meet + text_meet.join("\n\n") + "\n\n"
                    fs.writeFileSync(dir_cur+'daily.meet.md', final);   
                }
            }

            vscode.window.showInformationMessage('Successfully Synced Daily!');      
    }}
    // Register Command
    let command = vscode.commands.registerCommand(
        "edgeDH.syncDaily",
        syncDaily
    )
    context.subscriptions.push(command)


    let removeDaily = async () => {
        // Check components of the current file
        let editor = vscode.window.activeTextEditor;
        if (editor) {
            // Get the document text
            let doc_cur = editor.document;
            let name_cur = doc_cur.fileName;
            let base_cur = name_cur.substring(name_cur.lastIndexOf("/")+1, name_cur.length);
            let dir_cur = name_cur.substring(0,name_cur.lastIndexOf("/")+1);
            
            
            // Remove from Research
            let str_rmv = '![['+base_cur+'#Res_TBD]]\n\n'
            let fs = require('fs');
            let file_res = fs.readFileSync(dir_cur+'daily.res.md', 'utf8')
            file_res = file_res.replace(str_rmv, '')
            fs.writeFileSync(dir_cur+'daily.res.md', file_res);   

            // Remove from Triviality
            str_rmv = '![['+base_cur+'#Triv_TBD]]\n\n'
            let file_triv = fs.readFileSync(dir_cur+'daily.triv.md', 'utf8')
            file_triv = file_triv.replace(str_rmv, '')
            fs.writeFileSync(dir_cur+'daily.triv.md', file_triv);   

            // Remove from Meeting
            str_rmv = '![['+base_cur+'#Meet_TBD]]\n\n'
            let file_meet = fs.readFileSync(dir_cur+'daily.meet.md', 'utf8')
            file_meet = file_meet.replace(str_rmv, '')
            fs.writeFileSync(dir_cur+'daily.meet.md', file_meet);   

            vscode.window.showInformationMessage('Successfully Removed Daily!');      
    }}
    // Register Command
    command = vscode.commands.registerCommand(
        "edgeDH.removeDaily",
        removeDaily
    )
    context.subscriptions.push(command)
}
