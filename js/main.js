// Initialize widget
window.onload = function(){
	var firstWidget = new CWidget({
		fileInput: getById('file-input'),
		fileTable: getById('file-table'),
		errorDiv: getById('error-msg')
	});

	var button = getById('btn-create');

	button.addEventListener('click', function(e){
		e.preventDefault();
		removeClass(getById('second-widget'),'hide');
		var secondWidget = new CWidget({
			fileInput: getById('file-input-1'),
			fileTable: getById('file-table-1'),
			errorDiv: getById('error-msg-1'),
			filesList: firstWidget.serialize().slice(0)
		});
		addClass(this,'hide');
	}, false);
}