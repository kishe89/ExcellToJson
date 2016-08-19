/**
 * http://usejsdoc.org/
 */
var Pull = require('excel-push-pull').Pull;
var pull = new Pull();
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