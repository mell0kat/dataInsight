'use strict';

function grabMonth(dateString) {
		return dateString.split('-')[1];
};

module.exports = {
	findInMonth: function(array, month){
		let elementsInMonth = [];

		for (var i = 0; i< array.length; i++){

				if (grabMonth(array[i].date) === month){
				elementsInMonth.push(array[i]);
				}
		}
		return elementsInMonth;
	}
};


