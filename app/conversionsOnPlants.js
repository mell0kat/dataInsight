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
	// data, 'conversions'
	countTotalConversions: function(array, searchField) {
		//loop through data
		//visit actions
		//loop through obj[actions]
		//whereever action:conversion, count other total
	}
}
