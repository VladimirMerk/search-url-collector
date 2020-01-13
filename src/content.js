/*var title = document.getElementsByTagName("title")[0].innerHTML;
if(title != "copier-child"){*/

var FileDownload = {

  //Existing file URL.
  exportFileObjectUrl: null,

  // add click listener to the "prepare" button
  initialize: function(){

  },

  // prepare the file and "add" it the download button.
_getFileContents: function(array){
			//generate some content as a string.
			var mock = {
			  'a': 'test data'
			};
			return JSON.stringify(mock);
},

  //Result with URL to the file.
  _createDownloadData: function(data, contentType){
    if(FileDownload.exportFileObjectUrl !== null){
      FileDownload._revokeDownloadData();
    }
    var blob = new window.Blob([data], {type: contentType});
    return window.URL.createObjectURL(blob);
  },

 // Cleanup.
  _revokeDownloadData: function(){
    window.URL.revokeObjectURL(FileDownload.exportFileObjectUrl);
  },

  // a reference to the "prepare" button
  get prepareButton(){
    // prepare button.
    return document.querySelector('[prepare]');
  },

  // a reference to the "download" button.
  get downloadButton(){
    // Download button.
    return document.querySelector('[download]');
  }

};

FileDownload.initialize();
	  
	var storage = chrome.storage.local;
	$(document).ready(function(){
			$('body').append( "<textarea style='z-index: 10000; font-size: 10px; border: 1px solid rgb(54, 204, 50);position:fixed;width: 95%; height: 150px;margin: 10px;box-sizing: border-box;bottom: 0px;left: 0px;' id='s93k12-data'></textarea><a style='z-index: 10000;font-size: 14px; position:fixed;box-sizing: border-box;bottom: 10px;right: 10px;' href='javascript:void(0);' id='asdf452save'>Save</a>" );
			storage.get('block', function (item) {
				item = item.block || [];
				
				var gitem = "";
				item.forEach(function(it, i, arr) {
					gitem = gitem + it + "\r\n\r\n";
					$('#s93k12-data').val(gitem);
				});
				genLink();
				
				if (document.referrer.indexOf("google") >= 0 || document.referrer.indexOf("yandex.ru") >= 0) {
					var isTrue = true;
					/*console.log(item);*/
					item.forEach(function(it, i, arr) {
						if(it == document.location.href){
							isTrue = false;
						}
					});
				
					if(isTrue){
						item.push(document.location.href);
						storage.set({block: item});
					}
					
				}				
			});
			//storage = storage + document.referrer + "\n";
		/*$('a').on("click", function(){ 
			  openChildWindow($(this).attr('href'), "copier-child", "width=1,height=1,toolbar=no, location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,copyhistory=no");
			  return false; 
		  }); */
	
		$('#asdf452save').on("click", function(){
			chrome.storage.local.clear(function() {
				var error = chrome.runtime.lastError;
				if (error) {
					console.error(error);
				}
			});
		});
		$('#s93k12-data').on("focus", function(){
			genLink();
		});
		$('#s93k12-data').on("blur", function(){
			genLink();
		});
		$('#s93k12-data').on("change", function(){
			genLink();
		});
	});
	
	function genLink(){
		var content = $('#s93k12-data').val();
		var contentType = 'plain/text';
		var fileName = "links.txt";
		FileDownload.exportFileObjectUrl = FileDownload._createDownloadData(content, contentType);
		$('#asdf452save').attr("href", FileDownload.exportFileObjectUrl);
		$('#asdf452save').attr("download", fileName);
		$('#asdf452save').attr("data-downloadurl", contentType + ":" + fileName + ":" + FileDownload.exportFileObjectUrl);
	}
	
	chrome.storage.onChanged.addListener(function(changes, namespace) {
        for (key in changes) {
			console.log(changes[key])
			if(key == 'block'){
				var storageChange = changes[key];
				var gitem = "";
				if (typeof storageChange.newValue !== 'undefined' && storageChange.newValue.length > 0) {
					storageChange.newValue.forEach(function(it, i, arr) {
						gitem = gitem + it + "\r\n\r\n";
						$('#s93k12-data').val(gitem);
						genLink();
					});
				}else{
					$('#s93k12-data').val("");
					genLink();
				}
			}
        }
      });

/*
	var childWindow;
	var windowsOpened = [];
}
function openChildWindow(url,name,params){
   windowsOpened.push(window.open(url,name,params));
   triggerTimeout(windowsOpened[0]);
   return windowsOpened[0];
}

function triggerTimeout(win){
   setTimeout(function(){ childWindow = win; getUrlOfChild();},1000);
}

function getUrlOfChild(){
   if(childWindow){
	   try {
			$('#s93k12-data').val($('#s93k12-data').val() + childWindow.location+"\n\n");
	   }finally{
			childWindow.close();
			windowsOpened = [];
	   }
	 
   }
}

function rwt(a,g,h,n,o,i,c,p,j,d){
	return false;
}*/