// import { ExtensionContext, commands, window } from "vscode";
import * as vscode from 'vscode';


export function activate(context: vscode.ExtensionContext) {

    let syncDaily = async () => {
        let editor = vscode.window.activeTextEditor;
        if (editor) {
            // Get Section Settings (sections)
            let doc_cur = editor.document;
            let resource = doc_cur.uri;
            let config = vscode.workspace.getConfiguration('edgeFH', resource);
            let secconf = config.get('dailySections');
            if (typeof secconf === 'string') {
                let sections = secconf.split(", ")
                
                // Get Current Document Text
                let name_cur = doc_cur.fileName;
                let text_cur = doc_cur.getText();
                let base_cur = name_cur.substring(name_cur.lastIndexOf("/")+1, name_cur.length);
                base_cur = base_cur.substring(0,base_cur.lastIndexOf('.'));
                let dir_cur = name_cur.substring(0,name_cur.lastIndexOf("/")+1);
                
                for (var sec of sections){
                    // Write One Section            
                    if (RegExp(sec+" \\("+base_cur+"\\)\n.").test(text_cur)){
                        let str_write = '![['+base_cur+'#'+sec+' ('+base_cur+')'+']]'
                        let file_write = dir_cur+"../journal."+sec.toLowerCase().replace(' ','-')+'.md'

                        let fs = require('fs');
                        let file_res = fs.readFileSync(file_write, 'utf8')
                        let text_res = file_res.split("\n\n").slice(0,-1)

                        if (!text_res.includes(str_write) && str_write>text_res[text_res.length-1]){
                            fs.appendFileSync(file_write, str_write+'\n\n');
                        } else if (!text_res.includes(str_write)){
                            text_res.push(str_write)
                            text_res.sort()
                            let final = text_res.join("\n\n") + "\n\n"
                            fs.writeFileSync(file_write, final);   
                        }
                    }
                }

                vscode.window.showInformationMessage('Successfully Synced Daily!');      
            } else {
                console.log('Unexpected error');
              }
        }
    }
    // Register Command
    let command = vscode.commands.registerCommand(
        "edgeFH.syncDaily",
        syncDaily
    )
    context.subscriptions.push(command)


    let removeDaily = async () => {
        let editor = vscode.window.activeTextEditor;
        if (editor) {
            // Get Section Settings
            let doc_cur = editor.document;
            let resource = doc_cur.uri;
            let config = vscode.workspace.getConfiguration('edgeFH', resource);
            let secconf = config.get('dailySections');
            
            if (typeof secconf === 'string') {
                let sections = secconf.split(", ")

                // Get the document text
                let name_cur = doc_cur.fileName;
                let base_cur = name_cur.substring(name_cur.lastIndexOf("/")+1, name_cur.length);
                base_cur = base_cur.substring(0,base_cur.lastIndexOf('.'));
                let dir_cur = name_cur.substring(0,name_cur.lastIndexOf("/")+1);
                
                for (var sec of sections){
                    // Remove from One Section
                    let str_rmv = '![['+base_cur+'#'+sec+' ('+base_cur+')'+']]\n\n'
                    let file_rmv = dir_cur+"../journal."+sec.toLowerCase().replace(' ','-')+'.md'

                    let fs = require('fs');
                    let file_res = fs.readFileSync(file_rmv, 'utf8')
                    file_res = file_res.replace(str_rmv, '')
                    fs.writeFileSync(file_rmv, file_res);   
                }
                
                vscode.window.showInformationMessage('Successfully Removed Daily!');   
            }   
    }}
    // Register Command
    command = vscode.commands.registerCommand(
        "edgeFH.removeDaily",
        removeDaily
    )
    context.subscriptions.push(command)



}
