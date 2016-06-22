'use strict';

const fs = require('fs');

// MODULES
const findInMonth = require('./findByMonth').findInMonth;
const dataManipulation = require('./dataManipulation');
const mergeDataSets = dataManipulation.mergeDataSets;
const findUnique = dataManipulation.findUnique;

// CSV DATA SETS
const csv1 = fs.readFileSync("source1.csv", "utf8");

const csv2 = fs.readFileSync("source2.csv", "utf8");

//Helper function to remove duplicate values from data set
function removeDups (array){
	array.sort()
	let noDups = [];
	for (var i = 0; i< array.length; i++){
		if (noDups[noDups.length-1] !== array[i]) {
			noDups.push(array[i]);
		}
	}
	return noDups;
}

// Parses csv file into array of objects with (key, value) as (column header, value at column, row)
function parseData(csv, lineSeparator, removeDuplicates) {

	let rows;
	if (lineSeparator === 'n') {
		rows = csv.split('\r\n');
	}else{
		rows = csv.split('\r');
	}

	let headers = rows[0].split(',');

	let body = rows.slice(1);

	if (removeDuplicates) { body = removeDups(body);}

	body = body.map(row => row.split(','));

	//for some reason, the last line is an empty string

	if (body[0] == '') {
		body = body.slice(1);
	}else if (body[body.length-1] == ''){
		body = body.slice(0, body.length-1)
	}

	let numColumns = headers.length;

	// create objects that look like header:value
	body = body.map((column) => {
			let dataObj = {};
			for (var i = 0; i < numColumns; i++) {
				dataObj[headers[i]] = column[i];
			}
			return dataObj;
	})
	return body;
};



 // QUESTION 1: How many unique campaigns ran in February?
let CSV1 = parseData(csv1, 'n');
let CSV2WithoutDuplicates = parseData(csv2, 'n', true);

let mergedTwoIntoOne = mergeDataSets(CSV1,CSV2WithoutDuplicates);

let campaignsInFeb = findInMonth(mergedTwoIntoOne, '02');

let uniqueCampaignsInFeb = findUnique(campaignsInFeb, 'campaign');


console.log('ANSWER:',uniqueCampaignsInFeb.length);

// QUESTION 2:	What is the total number of conversions on plants?





// Need to find
module.exports = {
	parseData: parseData,
	removeDups: removeDups
}



