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
    let helloWorld = async () => {
        // Check components of the current file
        let editor = vscode.window.activeTextEditor;
        if (editor) {
            // Get the document text
            let doc_cur = editor.document;
            let name_cur = doc_cur.fileName;
            let text_cur = doc_cur.getText();
            let base_cur = name_cur.substring(name_cur.lastIndexOf("/") + 1, name_cur.length);
            if (text_cur.includes('### Res_TBD\n- ')) {
                let str_write = '![[' + base_cur + '#Res_TBD]]';
                let fs = require('fs');
                let text_res = fs.readFileSync('/Users/edge/Documents/EdgeExplore/98_Notes/notes/daily.res.md', 'utf8');
                if (!text_res.includes(str_write)) {
                    fs.appendFileSync('/Users/edge/Documents/EdgeExplore/98_Notes/notes/daily.res.md', str_write + '\n\n');
                }
            }
            if (text_cur.includes('### Triv_TBD\n- ')) {
                let str_write = '![[' + base_cur + '#Triv_TBD]]';
                let fs = require('fs');
                let text_res = fs.readFileSync('/Users/edge/Documents/EdgeExplore/98_Notes/notes/daily.triv.md', 'utf8');
                if (!text_res.includes(str_write)) {
                    fs.appendFileSync('/Users/edge/Documents/EdgeExplore/98_Notes/notes/daily.triv.md', str_write + '\n\n');
                }
            }
            if (text_cur.includes('### Meet_TBD\n- ')) {
                let str_write = '![[' + base_cur + '#Meet_TBD]]';
                let fs = require('fs');
                let text_res = fs.readFileSync('/Users/edge/Documents/EdgeExplore/98_Notes/notes/daily.meet.md', 'utf8');
                if (!text_res.includes(str_write)) {
                    fs.appendFileSync('/Users/edge/Documents/EdgeExplore/98_Notes/notes/daily.meet.md', str_write + '\n\n');
                }
            }
            vscode.window.showInformationMessage('Sync Succeeded!');
        }
    };
    let command = vscode.commands.registerCommand("edgeDH.syncDaily", helloWorld);
    context.subscriptions.push(command);
}
exports.activate = activate;
// export class File implements vscode.FileStat {
// 	type: vscode.FileType;
// 	ctime: number;
// 	mtime: number;
// 	size: number;
// 	name: string;
// 	data?: Uint8Array;
// 	constructor(name: string) {
// 		this.type = vscode.FileType.File;
// 		this.ctime = Date.now();
// 		this.mtime = Date.now();
// 		this.size = 0;
// 		this.name = name;
// 	}
// }
// export class Directory implements vscode.FileStat {
// 	type: vscode.FileType;
// 	ctime: number;
// 	mtime: number;
// 	size: number;
// 	name: string;
// 	entries: Map<string, File | Directory>;
// 	constructor(name: string) {
// 		this.type = vscode.FileType.Directory;
// 		this.ctime = Date.now();
// 		this.mtime = Date.now();
// 		this.size = 0;
// 		this.name = name;
// 		this.entries = new Map();
// 	}
// }
// export type Entry = File | Directory;
// export class MemFS implements vscode.FileSystemProvider {
// 	root = new Directory('');
// 	// --- manage file metadata
// 	stat(uri: vscode.Uri): vscode.FileStat {
// 		return this._lookup(uri, false);
// 	}
// 	readDirectory(uri: vscode.Uri): [string, vscode.FileType][] {
// 		const entry = this._lookupAsDirectory(uri, false);
// 		const result: [string, vscode.FileType][] = [];
// 		for (const [name, child] of entry.entries) {
// 			result.push([name, child.type]);
// 		}
// 		return result;
// 	}
// 	// --- manage file contents
// 	readFile(uri: vscode.Uri): Uint8Array {
// 		const data = this._lookupAsFile(uri, false).data;
// 		if (data) {
// 			return data;
// 		}
// 		throw vscode.FileSystemError.FileNotFound();
// 	}
// 	writeFile(uri: vscode.Uri, content: Uint8Array, options: { create: boolean, overwrite: boolean }): void {
// 		const basename = path.posix.basename(uri.path);
// 		const parent = this._lookupParentDirectory(uri);
// 		let entry = parent.entries.get(basename);
// 		if (entry instanceof Directory) {
// 			throw vscode.FileSystemError.FileIsADirectory(uri);
// 		}
// 		if (!entry && !options.create) {
// 			throw vscode.FileSystemError.FileNotFound(uri);
// 		}
// 		if (entry && options.create && !options.overwrite) {
// 			throw vscode.FileSystemError.FileExists(uri);
// 		}
// 		if (!entry) {
// 			entry = new File(basename);
// 			parent.entries.set(basename, entry);
// 			this._fireSoon({ type: vscode.FileChangeType.Created, uri });
// 		}
// 		entry.mtime = Date.now();
// 		entry.size = content.byteLength;
// 		entry.data = content;
// 		this._fireSoon({ type: vscode.FileChangeType.Changed, uri });
// 	}
// 	// --- manage files/folders
// 	rename(oldUri: vscode.Uri, newUri: vscode.Uri, options: { overwrite: boolean }): void {
// 		if (!options.overwrite && this._lookup(newUri, true)) {
// 			throw vscode.FileSystemError.FileExists(newUri);
// 		}
// 		const entry = this._lookup(oldUri, false);
// 		const oldParent = this._lookupParentDirectory(oldUri);
// 		const newParent = this._lookupParentDirectory(newUri);
// 		const newName = path.posix.basename(newUri.path);
// 		oldParent.entries.delete(entry.name);
// 		entry.name = newName;
// 		newParent.entries.set(newName, entry);
// 		this._fireSoon(
// 			{ type: vscode.FileChangeType.Deleted, uri: oldUri },
// 			{ type: vscode.FileChangeType.Created, uri: newUri }
// 		);
// 	}
// 	delete(uri: vscode.Uri): void {
// 		const dirname = uri.with({ path: path.posix.dirname(uri.path) });
// 		const basename = path.posix.basename(uri.path);
// 		const parent = this._lookupAsDirectory(dirname, false);
// 		if (!parent.entries.has(basename)) {
// 			throw vscode.FileSystemError.FileNotFound(uri);
// 		}
// 		parent.entries.delete(basename);
// 		parent.mtime = Date.now();
// 		parent.size -= 1;
// 		this._fireSoon({ type: vscode.FileChangeType.Changed, uri: dirname }, { uri, type: vscode.FileChangeType.Deleted });
// 	}
// 	createDirectory(uri: vscode.Uri): void {
// 		const basename = path.posix.basename(uri.path);
// 		const dirname = uri.with({ path: path.posix.dirname(uri.path) });
// 		const parent = this._lookupAsDirectory(dirname, false);
// 		const entry = new Directory(basename);
// 		parent.entries.set(entry.name, entry);
// 		parent.mtime = Date.now();
// 		parent.size += 1;
// 		this._fireSoon({ type: vscode.FileChangeType.Changed, uri: dirname }, { type: vscode.FileChangeType.Created, uri });
// 	}
// 	// --- lookup
// 	private _lookup(uri: vscode.Uri, silent: false): Entry;
// 	private _lookup(uri: vscode.Uri, silent: boolean): Entry | undefined;
// 	private _lookup(uri: vscode.Uri, silent: boolean): Entry | undefined {
// 		const parts = uri.path.split('/');
// 		let entry: Entry = this.root;
// 		for (const part of parts) {
// 			if (!part) {
// 				continue;
// 			}
// 			let child: Entry | undefined;
// 			if (entry instanceof Directory) {
// 				child = entry.entries.get(part);
// 			}
// 			if (!child) {
// 				if (!silent) {
// 					throw vscode.FileSystemError.FileNotFound(uri);
// 				} else {
// 					return undefined;
// 				}
// 			}
// 			entry = child;
// 		}
// 		return entry;
// 	}
// 	private _lookupAsDirectory(uri: vscode.Uri, silent: boolean): Directory {
// 		const entry = this._lookup(uri, silent);
// 		if (entry instanceof Directory) {
// 			return entry;
// 		}
// 		throw vscode.FileSystemError.FileNotADirectory(uri);
// 	}
// 	private _lookupAsFile(uri: vscode.Uri, silent: boolean): File {
// 		const entry = this._lookup(uri, silent);
// 		if (entry instanceof File) {
// 			return entry;
// 		}
// 		throw vscode.FileSystemError.FileIsADirectory(uri);
// 	}
// 	private _lookupParentDirectory(uri: vscode.Uri): Directory {
// 		const dirname = uri.with({ path: path.posix.dirname(uri.path) });
// 		return this._lookupAsDirectory(dirname, false);
// 	}
// 	// --- manage file events
// 	private _emitter = new vscode.EventEmitter<vscode.FileChangeEvent[]>();
// 	private _bufferedEvents: vscode.FileChangeEvent[] = [];
// 	private _fireSoonHandle?: NodeJS.Timer;
// 	readonly onDidChangeFile: vscode.Event<vscode.FileChangeEvent[]> = this._emitter.event;
// 	watch(_resource: vscode.Uri): vscode.Disposable {
// 		// ignore, fires for all changes...
// 		return new vscode.Disposable(() => { });
// 	}
// 	private _fireSoon(...events: vscode.FileChangeEvent[]): void {
// 		this._bufferedEvents.push(...events);
// 		if (this._fireSoonHandle) {
// 			clearTimeout(this._fireSoonHandle);
// 		}
// 		this._fireSoonHandle = setTimeout(() => {
// 			this._emitter.fire(this._bufferedEvents);
// 			this._bufferedEvents.length = 0;
// 		}, 5);
// 	}
// }
