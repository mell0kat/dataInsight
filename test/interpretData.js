'use strict';

const parseData = require('../app/interpretData').parseData;
const findObjWithKey = require('../app/interpretData').findObjectWithKey;
const mergeObjects = require('../app/interpretData').mergeObjects;
const fs = require('fs');
const expect = require('chai').expect;



describe('Data Interpretation', function() {
	describe('CSV Parsing', function() {
		it ('correctly turns csv data into array of objects', function() {
			const csvTest = fs.readFileSync("TestData1.csv", "utf8");
			const output = parseData(csvTest);
			console.log(output)
			expect(output).to.be.an.instanceof(Array);
			expect(output[0]).to.have.property('Name').that.is.a('string');
			expect(output).to.have.lengthOf(5);
		})
	});
	describe('FindObjByKey', function() {
		it ('loops through an array to return any objects that contain that key and value', function() {

			const array = [{
				pig: 'oink',
				cow: 'moo',
				duck: 'quack'
			}, {
				pig: 1,
				cow: 2,
				duck: 3
			},
			{
				pig: 'Peter',
				cow: 'Cassie',
				duck: 'Daryl'
			}]
			const key = 'pig';
			const value = 1;
			let found = findObjWithKey(array, key, value);

			console.log(found);
		})
	})
	describe('Merge objects', function() {
		it ('merges obj2 into obj1 and returns new merged object', function() {
			const duckAnimals = {
				duck: 'quack',
				fish: 'blurb',
				plankton: 'cr',
				goose: 'honk'
			};

			const farmAnimals = {
				pig: 'oink',
				cow: 'moo',
				duck: 'quack'
			};

			let merged = mergeObjects(duckAnimals, farmAnimals);

			expect(merged).to.have.property('cow', 'moo');
		})
	})
})
