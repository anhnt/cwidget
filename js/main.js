// Initialize widget
window.onload = function(){
	new CWidget({
		fileInput: getById('file-input'),
		fileTable: getById('file-table'),
		errorDiv: getById('error-msg')
	});
}