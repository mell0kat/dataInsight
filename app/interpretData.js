'use strict';

const fs = require('fs');

const csv1 = fs.readFileSync("source1.csv", "utf8");


const csv2 = fs.readFileSync("source2.csv", "utf8");


function parseData(csv, lineSeparator, removeDups) {
	let rows;
	if (lineSeparator === 'n') {
		rows = csv.split('\r\n');
	}else{
		rows = csv.split('\r');
	}


	let headers = rows[0].split(','); //type array

	let body = rows.slice(1);
	console.log('body before remove dups:', body.length);
	if (removeDups) body = removeDups(body);
	console.log('body after remove dups', body.length);

	body = body.map(row => row.split(',')); // type array of arrays

	//for some reason, the last line is an empty string

	if (body[0] == '') {

		body = body.slice(1);
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
// let test = csv2.split('\r\n').slice(1);
// test = test.sort();
// console.log(test.length)
// console.log(removeDups(test).length)


function removeDups(array, idx){
	array.sort()
	let noDups = [];
	for (var i = 0; i< array.length; i++){
		if (noDups[noDups.length-1] !== array[i]) {
			noDups.push(array[i]);
		}
	}
	return noDups;
}

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
	console.log(key, value)
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
		let commonObj = findObjectWithKey(set2, joinWith, set1[joinWith]);
		if (commonObj) {
			console.log('common obj found:', common obj)
			merged.push(mergeObjects(set1[i], commonObj))}
	}
};

// (parseData(csv1, 'n').length);
let data = parseData(csv2, 'n', removeDups);
console.log(data)

module.exports = {
	parseData: parseData,
	findObjectWithKey: findObjectWithKey,
	mergeObjects: mergeObjects
	}



