'use strict';

const fs = require('fs');

const csv1 = fs.readFileSync("source1.csv", "utf8");


const csv2 = fs.readFileSync("source2.csv", "utf8");


function parseData(csv) {
	let rows = csv.split('\r\n');
	let headers = rows.slice(0,1); //type array
	let body = rows.slice(1); // type array

};

parseData(csv2);

