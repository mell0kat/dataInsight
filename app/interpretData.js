'use strict';

const fs = require('fs');

const csv1 = fs.readFileSync("source1.csv", "utf8");


const csv2 = fs.readFileSync("source2.csv", "utf8");


function parseData(csv, lineSeparator) {
	let rows;
	if (lineSeparator === 'n') {
		rows = csv.split('\r\n');
	}else{
		rows = csv.split('\r');
	}


	let headers = rows[0].split(','); //type array

	let body = rows.slice(1).map(row => row.split(',')); // type array of arrays

	//for some reason, the last line is an empty string
	console.log((body[body.length-1] == ''))
	if (body[body.length-1] == '') {
		body = body.slice(0, body.length-1);
	}


	let numColumns = headers.length;
	body = body.map((column) => {
			let dataObj = {};

			for (var i = 0; i < numColumns; i++) {
				dataObj[headers[i]] = column[i];
			}
			return dataObj;
	})

	return body;
};

//gets rid of headers
let test = csv2.split('\r\n').slice(1);
test = test.sort();
console.log(test.length)
console.log(removeDups(test).length)
function removeDups(array, idx){

	let noDups = [];
	for (var i = 0; i< array.length; i++){
		if (noDups[noDups.length-1] !== array[i]) {
			noDups.push(array[i]);
		}
	}
	return noDups;
}
// (parseData(csv1, 'n').length);
module.exports = parseData;



