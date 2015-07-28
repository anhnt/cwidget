// Core functions
var SORT_DESC = -1;
var SORT_ASC = 1;
var DROPPED_TO_TABLE = 'dropped-to-table';

var dragIcon = document.createElement('img');
dragIcon.src = '../img/drag.png';
dragIcon.width = 300;

function CWidget(options) {
    this.init(options);
}

CWidget.prototype.init = function(options) {
    var that = this;
    this.widgetId = new Date().getTime();

    if (!options.fileInput) {
        throw Error('File input not found.');
    }
    if (!options.fileTable) {
        throw Error('File table list not found.');
    }

    if (options.errorDiv) {
        this.errorDiv = options.errorDiv;
    }
    this.fileInput = options.fileInput;
    this.fileTable = options.fileTable;

    if (!options.filesList) {
        this.filesList = [];
    } else {
        this.filesList = options.filesList;
    }

    this.currentSortBy = 'name';
    this.fileInput.addEventListener('change', function(event) {
        return that.onFileUploaded.apply(that, [event]);
    }, false);
    var thead = findChildrenByTagName(this.fileTable, 'thead')[0];
    thead.addEventListener('click', function(event) {
        return that.sortHandle.apply(that, [event]);
    }, false);

    document.addEventListener("drop", function(event) {
        return that.handleDrop.apply(that, [event]);
    }, false);

    document.addEventListener("dragover", function(event) {
        event.preventDefault();

    });

    document.addEventListener("dragenter", function(event) {
        event.preventDefault();

    });

    var dropFileArea = getSiblings(that.fileInput)[0];
    dropFileArea.addEventListener('dragover', function(event) {
        if (event.dataTransfer.types && event.dataTransfer.types.indexOf('Files') != -1) {
            addClass(dropFileArea, 'drag-enter');
        }
    }, false);

    dropFileArea.addEventListener('dragleave', function(event) {
        removeClass(dropFileArea, 'drag-enter');
    }, false);

    dropFileArea.addEventListener('drop', function(event) {
        event.preventDefault();
        event.stopPropagation();
        if (event.dataTransfer.types && event.dataTransfer.types.indexOf('Files') != -1) {
            return that.onFileDroped.apply(that, [event]);
        }
    }, false);

    this.fileTable.addEventListener('drop', function(event) {
        event.preventDefault();
        // event.stopPropagation();

        var widgetId = event.dataTransfer.getData('widgetId');
        var filename = event.dataTransfer.getData('filename');
        var size = event.dataTransfer.getData('size');
        var lastModifiedDate = event.dataTransfer.getData('lastModifiedDate');
        var err = '';
        if (filename && size && lastModifiedDate && that.widgetId !== widgetId) {
            var file = {
                name: filename,
                size: size,
                lastModifiedDate: lastModifiedDate
            };
            if (that.isFileExisted(file)) {
                that.showError('Error: File with name ' + filename + ' is existed. <br />');
            }else{
                that.addFile(file);
            }
    
            that.buildFileTable();
        }
    }, false);

    this.buildFileTable();
};


CWidget.prototype.sortHandle = function(event) {
    event.preventDefault();
    var target = event.target;
    var sortBy = target.parentElement.getAttribute('data-sort');
    if (target.nodeName.toLowerCase() === 'a' && sortBy) {
        var parentSiblings = getSiblings(target.parentElement);
        parentSiblings.forEach(function(item) {
            var i = item.children[0].children[0];
            removeClass(i, 'arrow-up');
            removeClass(i, 'arrow-down');
        });
        var i = target.children[0];
        this.currentSortBy = sortBy;
        if (hasClass(i, 'arrow-up')) {
            removeClass(i, 'arrow-up');
            addClass(i, 'arrow-down');
            this.currentSortOrder = SORT_DESC;
        } else if (hasClass(i, 'arrow-down')) {
            removeClass(i, 'arrow-down');
            addClass(i, 'arrow-up');
            this.currentSortOrder = SORT_ASC;
        } else {
            addClass(i, 'arrow-up');
            this.currentSortOrder = SORT_ASC;
        }

        this.buildFileTable(true);
    }
    if (target.nodeName.toLowerCase() === 'i') {
        target.parentElement.click();
    }
};

CWidget.prototype.onFileUploaded = function(event) {
    var files = event.target.files;
    var err = '';
    for (var i = 0; i < files.length; i++) {
        if (this.isFileExisted(files[i])) {
            err += 'Error: File with name ' + files[i].name + ' is existed. <br />';
        } else {
            this.addFile(files[i]);
        }
    }
    if (err) {
        this.showError(err);
    }
    this.buildFileTable();
    event.target.value = '';
};

CWidget.prototype.onFileDroped = function(event) {
    var files = event.dataTransfer.files;
    var err = '';
    for (var i = 0; i < files.length; i++) {
        if (this.isFileExisted(files[i])) {
            err += 'Error: File with name ' + files[i].name + ' is existed. <br />';
        } else {
            this.addFile(files[i]);
        }
    }
    if (err) {
        this.showError(err);
    }
    this.buildFileTable();
    removeClass(event.target, 'drag-enter');
};

CWidget.prototype.isFileExisted = function(newFile) {
    var isExisted = false;
    for (var i = 0; i < this.filesList.length; i++) {
        if (this.filesList[i].name === newFile.name) {
            isExisted = true;
            break;
        }
    }
    return isExisted;
};

CWidget.prototype.addFile = function(newFile) {
    this.filesList.push(newFile);
};

CWidget.prototype.sortFilesList = function(sortBy, sortOrder) {
    // sortOrder = 1 || undefined ~ asc
    // sortOrder = -1 ~ desc
    if (!sortOrder) {
        sortOrder = 1;
    }

    var sortFields = ['name', 'size', 'lastModifiedDate'];
    if (sortFields.indexOf(sortBy) === -1) {
        return;
    }

    this.filesList.sort(function(a, b) {
        if (sortBy === 'name') {
            if (a.name.toLowerCase() < b.name.toLowerCase()) return -1 * sortOrder;
            if (a.name.toLowerCase() > b.name.toLowerCase()) return 1 * sortOrder;
        } else if (sortBy === 'size') {
            if (a.size < b.size) return -1 * sortOrder;
            if (a.size > b.size) return 1 * sortOrder;
        } else {
            if (a.lastModifiedDate < b.lastModifiedDate) return -1 * sortOrder;
            if (a.lastModifiedDate > b.lastModifiedDate) return 1 * sortOrder;
        }

        return 0;
    });
};

CWidget.prototype.buildFileTable = function(doSort) {
    var tbody = findChildrenByClassName(this.fileTable, 'file-list-wrap')[0];
    var tbodyNoData = findChildrenByClassName(this.fileTable, 'no-data')[0];
    setHtml(tbody, '');
    if (this.filesList.length) {
        if (doSort) {
            this.sortFilesList(this.currentSortBy, this.currentSortOrder);
        }
        var html = '';
        this.filesList.forEach(function(item, index) {
            html += '<tr><td>' + item.name + '</td><td class="text-center" data-value="' + item.size + '">' + formatBytes(item.size) + '</td><td class="text-center">' + item.lastModifiedDate + '</td></tr>';
        });
        setHtml(tbody, html);
        removeClass(tbody, 'hide');
        addClass(tbodyNoData, 'hide');
    } else {
        removeClass(tbodyNoData, 'hide');
        addClass(tbody, 'hide');
    }
    var that = this;
    [].forEach.call(tbody.children, function(tr) {
        tr.setAttribute('draggable', 'true'); // Enable columns to be draggable.
        tr.addEventListener('dragstart', function(event) {
            return that.handleDragStart.apply(that, [event])
        }, false);
        tr.addEventListener('dragend', that.handleDragEnd, false);
    });
};

CWidget.prototype.handleDragStart = function(event) {
    event.target.style.backgroundColor = 'red';
    event.target.style.opacity = 0.6;
    event.dataTransfer.setDragImage(dragIcon, -10, -10);
    event.dataTransfer.setData('widgetId', this.widgetId);
    event.dataTransfer.setData('filename', event.target.children[0].innerText);
    event.dataTransfer.setData('size', event.target.children[1].getAttribute('data-value'));
    event.dataTransfer.setData('lastModifiedDate', event.target.children[2].innerText);
};

CWidget.prototype.handleDragEnd = function(event) {
    event.target.style.backgroundColor = 'white';
    event.target.style.opacity = 1;
};

CWidget.prototype.handleDrop = function(event) {
    var widgetId = event.dataTransfer.getData('widgetId');
    var filename = event.dataTransfer.getData('filename');
    var allows = ['table','td','tr','body','html'];
    if(allows.indexOf(event.target.nodeName.toLowerCase())!==-1 && widgetId == this.widgetId){
        var dropFileArea = getSiblings(this.fileInput)[0];
        if (event.target === dropFileArea) {
            // DO NOTHING
        } else {
            this.removeFile(filename);
        }
    }
    

}

CWidget.prototype.removeFile = function(filename) {
    var index = -1;
    for (var i = 0; i < this.filesList.length; i++) {
        if (this.filesList[i].name === filename) {
            index = i;
            break;
        }
    };
    if (index > -1) {
        this.filesList.splice(index, 1);
    }

    var tbody = findChildrenByClassName(this.fileTable, 'file-list-wrap')[0];
    var tbodyNoData = findChildrenByClassName(this.fileTable, 'no-data')[0];
    var rows = tbody.children;
    if (rows.length <= 1) {
        removeClass(tbodyNoData, 'hide');
    } else {
        addClass(tbodyNoData, 'hide');
    }
    for (var i = 0; i < rows.length; i++) {
        if (rows[i].children[0].innerText === filename) {
            rows[i].remove();
            break;
        }
    }
};

CWidget.prototype.showError = function(err) {
    if (this.errorDiv) {
        setHtml(this.errorDiv, err);
        removeClass(this.errorDiv, 'hide');
        var that = this;
        setTimeout(function() {
            addClass(that.errorDiv, 'hide')
        }, 4000);
    }
};

CWidget.prototype.serialize = function() {
    return this.filesList;
};
