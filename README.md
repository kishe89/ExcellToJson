

# ExcellToJson

엑셀문서 파싱해서 .json 파일로 출력해주는 소스

## Usage

엑셀문서는 다음 양식이어야 함
##key  ##key  ##key  ##key  ...
value  value  value  value  ...
..........................

Ex)

var Pull = require('excel-push-pull').Pull;
var pull = new Pull();
var fs = require('fs');
var jsonfile = require('jsonfile');
pull.setFilePath('./excel/spotdata.xlsx');
pull.records(function(err, records) {
  // records is an array contains json data 
	if(err){
		console.log(err);
	}
	console.log("records length = " + records.length);
	var file = './json/kr.json';
	jsonfile.writeFile(file, records, function (err) {
	  console.error(err);
	});
});


## Developing



### Tools

Created with [Nodeclipse](https://github.com/Nodeclipse/nodeclipse-1)
 ([Eclipse Marketplace](http://marketplace.eclipse.org/content/nodeclipse), [site](http://www.nodeclipse.org))   

Nodeclipse is free open-source project that grows with your contributions.
