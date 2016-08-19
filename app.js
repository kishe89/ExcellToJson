/**
 * http://usejsdoc.org/
 */

var jsonfile1 = require('jsonfile');
var xlsx = require('node-xlsx');
var filepath = ['./json/kr.json','./json/eng.json','./json/jp.json','./json/ch.json'];
const workSheetsFromFile = xlsx.parse(`./excel/kr.xlsx`);

function parser_header(workSheetno){
	var first = workSheetsFromFile[workSheetno].data[0].join();
	var headers = first.split(',');
	var key = new Array();
	for(var i = 0;i<headers.length;i++){
		  if(headers[i] !== ""){
			  key.push(headers[i].split("##")[1]);
		  }
	}
	return key;
}
function parser_body(workSheetno,key){
	var jsonData = [];
	for(var j = 1 ; j<workSheetsFromFile[workSheetno].data.length ;j++){
		var firstrows = workSheetsFromFile[workSheetno].data[j].join();
		var rows = firstrows;
		var test = new Array();
		var start=0;
		var end;
		var temp;
		var data={};
		for(var i = 0;i<key.length;i++){
			if(i===0){
				end=rows.indexOf(',');
				temp = rows.substring(start, end);
			}
			else if(i<5){
				start= end+1;
				end= rows.indexOf(',',start);
				temp = rows.substring(start, end);
			}else{
				start= end+1;
				end= rows.length;
				temp = rows.substring(start, end);
			}
			test.push(temp);
		}
		var nullcheck = true;
		for(var i = 0 ; i<test.length;i++){
			if(test[0]===""){
				nullcheck=false;
			}
			data[key[i]] = test[i];
		}
		if(nullcheck){
			jsonData.push(data);
		}		
	}
	return jsonData;
}
function write_json(){
	console.log(workSheetsFromFile.length);
	for(var k = 0 ; k<workSheetsFromFile.length;k++){
		var key = parser_header(k);
		var res_json = parser_body(k,key);
		console.log(key);
		console.log(res_json);

		var file = filepath[k];
		jsonfile1.writeFile(file, res_json, function (err) {
		  console.error(err);
		});
	}
}
write_json();



