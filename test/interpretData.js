'use strict';

const interpretData = require('../app/interpretData');
const fs = require('fs');
const expect = require('chai').expect;



describe('Data Interpretation', function() {
	describe('CSV Parsing', function() {
		it ('correctly turns csv data into array of objects', function() {
			const csvTest = fs.readFileSync("TestData1.csv", "utf8");
			const output = interpretData(csvTest);
			console.log(output)
			expect(output).to.be.an.instanceof(Array);
			expect(output[0]).to.have.property('Name').that.is.a('string');
			expect(output).to.have.lengthOf(5);
		})
	})
})
