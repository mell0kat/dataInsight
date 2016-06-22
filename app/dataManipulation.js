'use strict';


module.exports = {
	findObjectWithKey: function (array, key, value){
		return array.filter(item => (item[key] === value)
			)[0]
	},

//merging obj2 into obj1
mergeObjects: function (obj1, obj2) {
		let merged = obj1;
		for (let key in obj2){
			if (!merged[key]){
				merged[key] = obj2[key];
			}
		};
		return merged;
	},
	mergeDataSets: function (set1, set2, joinWith){
		let merged = [];
		for(let i = 0; i< set1.length; i++) {
			let commonObj = module.exports.findObjectWithKey(set2, joinWith, set1[i][joinWith]);
			if (commonObj) {
				merged.push(module.exports.mergeObjects(set1[i], commonObj))}
		}
		return merged;
	},
//function for finding unique items in an array based on a a particular field
findUnique: function (arrayOfObjs, uniqueKey){

		let uniqueObjs = [];
		for (let i = 0; i < arrayOfObjs.length; i++){
			let obj = arrayOfObjs[i];
			let matchingObj = module.exports.findObjectWithKey(uniqueObjs, uniqueKey, obj[uniqueKey]);

			if (!matchingObj) { uniqueObjs.push(obj)}
		}

		return uniqueObjs;
	}
}



