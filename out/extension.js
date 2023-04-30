"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
// import { ExtensionContext, commands, window } from "vscode";
const vscode = __importStar(require("vscode"));
function activate(context) {
    let syncDaily = async () => {
        let editor = vscode.window.activeTextEditor;
        if (editor) {
            // Get Section Settings (sections)
            let doc_cur = editor.document;
            let resource = doc_cur.uri;
            let config = vscode.workspace.getConfiguration('edgeFH', resource);
            let secconf = config.get('dailySections');
            if (typeof secconf === 'string') {
                let sections = secconf.split(", ");
                // Get Current Document Text
                let name_cur = doc_cur.fileName;
                let text_cur = doc_cur.getText();
                let base_cur = name_cur.substring(name_cur.lastIndexOf("/") + 1, name_cur.length);
                base_cur = base_cur.substring(0, base_cur.lastIndexOf('.'));
                let dir_cur = name_cur.substring(0, name_cur.lastIndexOf("/") + 1);
                for (var sec of sections) {
                    // Write One Section            
                    if (RegExp(sec + " \\(" + base_cur + "\\)\n.").test(text_cur)) {
                        let str_write = '![[' + base_cur + '#' + sec + ' (' + base_cur + ')' + ']]';
                        let str_test = new RegExp('\\!\\[\\[' + base_cur + '\\#' + sec + ' \\(' + base_cur + '\\)' + '\\]\\]');
                        let file_write = dir_cur + "../journal." + sec.toLowerCase().replace(' ', '-') + '.md';
                        let fs = require('fs');
                        let file_res = fs.readFileSync(file_write, 'utf8');
                        let text_res = file_res.split("\n\n").slice(0, -1);
                        var flag = !text_res.some((e) => str_test.test(e));
                        if (flag && str_write > text_res[text_res.length - 1]) {
                            fs.appendFileSync(file_write, str_write + '\n\n');
                        }
                        else if (flag) {
                            text_res.push(str_write);
                            text_res.sort();
                            let final = text_res.join("\n\n") + "\n\n";
                            fs.writeFileSync(file_write, final);
                        }
                    }
                }
                vscode.window.showInformationMessage('Successfully Synced Daily!');
            }
            else {
                console.log('Unexpected error');
            }
        }
    };
    // Register Command
    let command = vscode.commands.registerCommand("edgeFH.syncDaily", syncDaily);
    context.subscriptions.push(command);
    let removeDaily = async () => {
        let editor = vscode.window.activeTextEditor;
        if (editor) {
            // Get Section Settings
            let doc_cur = editor.document;
            let resource = doc_cur.uri;
            let config = vscode.workspace.getConfiguration('edgeFH', resource);
            let secconf = config.get('dailySections');
            if (typeof secconf === 'string') {
                let sections = secconf.split(", ");
                // Get the document text
                let name_cur = doc_cur.fileName;
                let base_cur = name_cur.substring(name_cur.lastIndexOf("/") + 1, name_cur.length);
                base_cur = base_cur.substring(0, base_cur.lastIndexOf('.'));
                let dir_cur = name_cur.substring(0, name_cur.lastIndexOf("/") + 1);
                for (var sec of sections) {
                    // Remove from One Section
                    let str_rmv = '![[' + base_cur + '#' + sec + ' (' + base_cur + ')' + ']]\n\n';
                    let file_rmv = dir_cur + "../journal." + sec.toLowerCase().replace(' ', '-') + '.md';
                    let fs = require('fs');
                    let file_res = fs.readFileSync(file_rmv, 'utf8');
                    file_res = file_res.replace(str_rmv, '');
                    fs.writeFileSync(file_rmv, file_res);
                }
                vscode.window.showInformationMessage('Successfully Removed Daily!');
            }
        }
    };
    // Register Command
    command = vscode.commands.registerCommand("edgeFH.removeDaily", removeDaily);
    context.subscriptions.push(command);
}
exports.activate = activate;
