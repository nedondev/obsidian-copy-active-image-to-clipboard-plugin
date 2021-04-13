'use strict';

var obsidian = require('obsidian');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var sample = /** @class */ (function (_super) {
    __extends(sample, _super);
    function sample() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    sample.prototype.onInit = function () { };
    sample.prototype.onload = function () {
        var _this = this;
        console.log("Loading copy-active-image plugin");
        this.addCommand({
            id: "copy-active-image",
            name: "Copy Active Image",
            callback: function () { return _this.sampleFunction(); },
        });
    };
	sample.prototype.sampleFunction = async function () {
        var activeLeaf = this.app.workspace.activeLeaf;
		console.dir(activeLeaf);
		const basepath = this.app.vault.adapter.basePath;
		var blob;
		await app.vault.adapter.readBinary(activeLeaf.view.file.path)
			.then((result)=>{
				var type = this.checkFileImage(result);
				switch(type){
					case 'image/png':
					case 'image/gif':
					case 'image/jpeg':
						blob = new Blob([result],{type : type});
						break;
					blob = new Blob([result],{type : 'unknow'});
				}
				
				
			});
		const data = [ new ClipboardItem({ [blob.type]: blob })];
		console.log(data);
		await navigator.clipboard.write(data);
    };
	sample.prototype.checkFileImage = function (arr){
		arr = (new Uint8Array(arr)).subarray(0, 4);
		var header = '';
		for (var i = 0; i < arr.length; i++) {
			header += arr[i].toString(16);
		}
		console.log('File header: ' + header);
		var type = 'unknown';
		switch (header) {
			case '89504e47':
				type = 'image/png';
				break;
			case '47494638':
				type = 'image/gif';
				break;
			case 'ffd8ffe0':
			case 'ffd8ffe1':
			case 'ffd8ffe2':
				type = 'image/jpeg';
				break;
			case '25504446':
				type = 'application/pdf';
				break;
		}
		return type;
	};
	
    
    sample.prototype.onunload = function () {
        console.log("Unloading copy-active-image plugin");
    };
    return sample;
}(obsidian.Plugin));

module.exports = sample;
