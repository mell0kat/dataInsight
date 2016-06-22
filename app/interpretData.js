'use strict';

const fs = require('fs');

const csv1 = fs.readFileSync("source1.csv", "utf8");


const csv2 = fs.readFileSync("source2.csv", "utf8");

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

// parseData(csv1, 'n', true).length);
// console.log(parseData(csv1, 'n').length);
// console.log(parseData(csv2, 'n', false).length);
let CSV1 = parseData(csv1, 'n');
let CSV2WithoutDuplicates = parseData(csv2, 'n', true);

let mergedTwoIntoOne = mergeDataSets(CSV1, CSV2WithoutDuplicates);
console.log(mergedTwoIntoOne);
console.log(CSV1.length);
console.log(CSV2WithoutDuplicates.length);
console.log(mergedTwoIntoOne.length);



function grabMonth(dateString) {
	return dateString.split('-')[1];
};

function findInMonth(array, month){
	let elementsInMonth = [];

	for (var i = 0; i< array.length; i++){

			if (grabMonth(array[i].date) === month){
			elementsInMonth.push(array[i]);
			}
	}
	return elementsInMonth;
}

function findObjectWithKey(array, key, value){
	return array.filter(item => (item[key] === value)
		)[0]
}

//merging obj2 into obj1
function mergeObjects(obj1, obj2) {
	let merged = obj1;
	for (let key in obj2){
		if (!merged[key]){
			merged[key] = obj2[key];
		}
	};
	return merged;
};

function mergeDataSets (set1, set2, joinWith){
	let merged = [];
	for(var i = 0; i< set1.length; i++) {
		let commonObj = findObjectWithKey(set2, joinWith, set1[i][joinWith]);
		if (commonObj) {
			merged.push(mergeObjects(set1[i], commonObj))}
	}
	return merged;
};


module.exports = {
	parseData: parseData,
	findObjectWithKey: findObjectWithKey,
	mergeObjects: mergeObjects,
	mergeDataSets: mergeDataSets,
	removeDups: removeDups
	}



