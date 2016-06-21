'use strict';

const fs = require('fs');

const csv1 = fs.readFileSync("source1.csv", "utf8");


const csv2 = fs.readFileSync("source2.csv", "utf8");


function parseData(csv) {
	let rows = csv.split('\r\n');
	let headers = rows[0].split(','); //type array
	console.log(headers[0])
	let body = rows.slice(1).map(row => row.split(',')); // type array of arrays

	//for some reason, the last line is an empty string
	body = body.slice(0, body.length-1);

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

console.log(parseData(csv2));
parseData(csv2);

