'use strict';
// helper function to grab "initiative" from campaign
function extractKeyWord(string) {
	return string.split('_')[0]
}
module.exports = {
	//data, 'plant', 'campaign'
	findByKeyword: function(array, keyword, field) {
		return array.filter(item => {
			return extractKeyWord(item[field]) === keyword;
		});
	},

	//will loop through array to count actions
	countActions: function(array, actionToCount) {

		return array.reduce((prev, current) => {

			if (current.action === actionToCount) {
				for (var key in current) {
					if (typeof current[key] === 'number') {
						return prev + current[key];
					}
				}
			}
			return prev + 0;
		}, 0)
	},

	//counts total number of total converstions in an array of objects
	// data, 'conversions'
	countTotalConversions: function(array, searchField) {
		let total = 0;
		//loop through data
		for (let i = 0; i < array.length; i++) {

			// USE SOME REGEX TO DEAL WITH UNFORTNATE FORMATTING:

			array[i].actions = array[i].actions.replace(/""/g, "'")
			array[i].actions = JSON.parse(array[i].actions);

			let actionsForItem = module.exports.countActions(array[i].actions, searchField);
			total += actionsForItem;

		}
		return total;

	}
}
