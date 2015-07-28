// helper functions
function getById(id) {
    return document.getElementById(id);
}

function getByClassName(className) {
    return document.getElementsByClassName(className);
}

function findChildrenByClassName(parent, className) {
	var tempArr = [];
	for(var i = 0; i < parent.children.length; i++){
		if(parent.children[i].className && parent.children[i].className.indexOf(className)!==-1){
			tempArr.push(parent.children[i]);
		}
	}
    return tempArr;
}

function findChildrenByTagName(parent, tag){
	var tempArr = [];
	for(var i = 0; i < parent.children.length; i++){
		if(parent.children[i].nodeName.toLowerCase() === tag.toLowerCase()){
			tempArr.push(parent.children[i]);
		}
	}
    return tempArr;
}

function getSiblings(node){
	var nodes = node.parentElement.children;
	var arr = [];
	for(var i = 0; i < nodes.length; i++){
		if(nodes[i]!=node){
			arr.push(nodes[i]);
		}
	}
	return arr;
}

function addClass(el, className) {
    if (el.className.indexOf(className) === -1) {
        el.className = el.className + ' ' + className;
    }
}

function removeClass(el, className) {
    if (el.className.indexOf(className) !== -1) {
    	var arr = el.className.split(' ');
    	var index = arr.indexOf(className);
    	arr.splice(index, 1);
        el.className = arr.join(' ');
    }
}

function hasClass(el, className){
	return el.className.indexOf(className)!==-1;
}

function formatBytes(bytes,decimals) {
   if(bytes == 0) return '0 Byte';
   var k = 1000;
   var dm = decimals + 1 || 3;
   var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
   var i = Math.floor(Math.log(bytes) / Math.log(k));
   return (bytes / Math.pow(k, i)).toPrecision(dm) + ' ' + sizes[i];
}

function setHtml(el, html){
	el.innerHTML = html;
}