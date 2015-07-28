// Core functions
var SORT_DESC = -1;
var SORT_ASC = 1;
var DROPPED_TO_TABLE = 'dropped-to-table';

var dragIcon = document.createElement('img');
dragIcon.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPkAAABdCAIAAADooFc/AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAeHSURBVHhe7Z09bxRJEIbr7k/YIALrdA6coJOwEKkdgEAIciOfROIfgNgQAhMaXcQlTizZwjkIcYLATq3TIiESBz6hDSzA/+K6untnenY+uuejd8bU+2gEM709M9XV7/ZUtz3lX2j/BwEggF/t/wD87EDrQArQOpACtA6kAK0DKUDrQArQOpACtA6kAK0DKUDrQArQOpACtA6kAK0DKUDrQArQOpACtA6kAK0DKUDrQArQOpACtA6kAK0DKUDrQArQOpACtA6kAK0DKcxd6xe79OcifZjYw7lh7ms2dfcP9zNmfBnx4Rd7VI+ZS/2UeNvYV7fWQci4fkSj57S8zQn91HZnyRb3wxHLYu/IHvXGQMyYHzK0fvEf/3vztj7Q3HnXmeg7vNRg+SnaiHgdSGEOWtfPSrPln5gcCI7SOi92bblib3oWb6qOgz1rGkfydp8u9EezTOjFIgcwite30kv5A3TH7OqaM5dik7Qxqf2O8Vy4wTvHG/ZTN8ataHIhHhdlfeLaWWFGodkF7qrsVibYgfMittZVgzfSQJk2rOwynNKLDXp0whWebekS7abz6Vn7J7R8kFOzOmuRvj2xddbGNCqU+xI9+0E727xrbrG/o8sr4ZnWBq0d2os/WqWXtXpLGbNIV83tjPFT3TxWJYe8k1zcBgYhTXapWz9LmRlK6MebtmRnOTP0ZPB1a1sHRiGy1vfU4LFKW0bB2sVrdtdhTNcOM7HgzFmsV9UxY3rvjh9jom16vG6PHucrtOC9nsgmF7/zipaJ3pR1fBHqe2VbtEQPN4kOPD0d1GSHuvWDOKJjpf679mhhazr05PB2a3sHRiCq1id0TrT8gBbsMXNPD7EZVune1ClM0Vm0zt48/sceGR66PfEbe3OmQkN0l1/73R4xS3SN6OzMHoVwxfnqLijLiL5XrMcFN9lSt34gxod/+R4O3m7twoERiKr1r6Ral2lzCBVnnZZ3g/ZmJ5hFmySQNZvqvIjUbXIzF3lZoi0lWR2AVYVDvm7twYFBxJ+bnuuWXzqSWDPdAgL9y46KW1RLVXhtFF+x+u7t1uE5MKrW9TOxGcWuXMk+tV3Mg7Xx/RwW6j6IOqJuk2u7KBizms4RUWE84+vWvhzoI6rWTZT2NuMvNWvxoOPOmbNmpk2GT86oc/GxUbxUSIehfyDBTbYE1L+ywmNzWmFCbw7sbiBX1eheiLdb5+/AICLHMDxlcRYH9hbpvMyDDuas3WTaPuFFSdpM5/UGFRHah+yEdpWvZ+a4jTFh60Fmxe3D/e5+nF4khcAmJ3jrX9eiT5Y+9m7xWJAhZwYvFI7svvrmvB7npr9TPN0a24ENiax1Ff/tbKfTlKsn9OyJ/agCjhpPiJ5PZza3eFEyH+091Su7psLZJu2/6+DxbWADDuksMUAv5JfJrjZmffDAXtmsRQY2OcFff509nzRBed78kCElZ4a65qNTe2iWz8vWHFXN6m6N68CGXM6/b6oGCTXqKK1ftwUAeIm/DgPAMIDWgRSgdSCFyxmvA1AfjOtACtA6kAK0DqQArQMpQOtACtA6kAK0DqTQh9b5Ffde37T1GtAmDRjIYxzed1aw2FrXr7vH/WXOOdyiFkOzZ4D04yLEMCA+w0gbBq0DKcT8fRhOrGN3LSZrSvLb59/1DrOZey9BZ9tJKPtV9bJbKFTM/TJ562yVdpw3OQoMyFYw52Zu2toeRebTfJMd2MIV2r9rb5q+NlFuBtt8yq34nPOqaa9b4lJmFZdn3aLIFIb5ROH6s9pFMYk5rpfmuNK8XCR6pcuzmbEU4VmjKvJXfbprS7jCmEbO9Q3qmv60YZr29pgItV6arlw6NL8Z+uV/61XzztGIXWGbmfNztVU3NvmCn90JpX6l1byY1zizV7UqYtJfDJN+m3OZsdpnjVIOTd/4WqenRZm33FtUpw1rb0+TNF25dGghZigB2VPWdeoL9WQ7nJ6S83O1Vdf1G6v/fuR/DW664/Y+mTv9ab00M1a0rFEzmbdC04a1t6dZmq6ZV8XDzLjhnMKpBLIlBusHr1X62+LmC/j8loMc/i5F66OYDG9u2k/WKN1VhXRgTxdpurp3S4BVfzxwwpgJ/Tu2OTmGmtmrmqGuwyTBXLqVz+QKMT+/MFs6SW1Ke3s6Yc5mLNzmx923r7xvMvC4T4mB+CSY4Wm9g6xROuf6a6KdaR9wvF5NedqwrrJYtUzTFSmZlseqJbq5akMaE8CYlZahZvaqZoDjevusUfrpvPbEI6PQtGHt7amb1quQ9mbMEGYVhzFqOusEMEznxsyD2Fpv4JS6WaPyt8iWXOwWxTCrdB6YNqy9PfXTehUQIZlWiFUmjPn0dzaAaWlMP1+V2FovynHlpV7WqPwtsiWjM7ugm2GF/95GYNqwtvaYK9RJ61VI58m0gqwyYYwaLKYBjKGVMY1U0RrkEQBSGOo6DABdA60DKUDrQArQOpACtA6kAK0DKUDrQArQOpACtA6kAK0DKUDrQArQOpACtA6kAK0DKUDrQArQOpACtA6kAK0DKUDrQArQOpACtA6kAK0DKUDrQArQOpACtA6kAK0DGRD9D5G6VaDji06rAAAAAElFTkSuQmCC';
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
