'use strict';

const conversionsOnPlants = require('../app/conversionsOnPlants');
const findByKeyword = conversionsOnPlants.findByKeyword;
const countActions = conversionsOnPlants.countActions;

const expect = require('chai').expect;

describe('conversionsOnPlants', function() {
	describe('findByKeyword', function() {
		it ('searches through an array of objects to find where a keyword is contained', function () {
				const data = [{ campaign: 'vegetables_snake_valley',
					  date: '2015-01-01',
					  spend: '28.48',
					  impressions: '4268',
					  actions: '"[{""action"": ""clicks""',
					  object_type: 'photo' },
					{ campaign: 'fruit_snake_valley',
					  date: '2015-02-01',
					  spend: '28.48',
					  impressions: '4268',
					  actions: '"[{""action"": ""clicks""',
					  object_type: 'photo' },
					{ campaign: 'dirt_snake_vegetables',
					  date: '2015-02-01',
					  spend: '28.48',
					  impressions: '4268',
					  actions: '"[{""action"": ""clicks""',
					  object_type: 'photo' },
					{ campaign: 'vegetables_snake_valley',
					  date: '2015-04-01',
					  spend: '28.48',
					  impressions: '4268',
					  actions: '"[{""action"": ""clicks""',
					  object_type: 'photo'
				}];
				let itemsWithVegetables = findByKeyword(data, 'vegetables', 'campaign');
				expect(itemsWithVegetables).to.have.lengthOf(2)
		})
	});
	describe('countActions', function() {
		it ('searches through an array of objects to count actions of a given type', function () {
				const data2 =  	[
					 {"a": 66, "action": "conversions"},
					 {"y": 11, "action": "conversions"},
					 {"action": "views", "x": 9},
					 {"action": "views", "b": 64},
					 {"action": "views", "c": 49},
					 {"action": "views", "z": 98}];

				let totalConversions = countActions(data2, 'conversions')
				let totalViews = countActions(data2, 'views')
				let totalClicks = countActions(data2, 'clicks')

				expect(totalConversions).to.equal(77)
				expect(totalViews).to.equal(9+64+49+98)
				expect(totalClicks).to.equal(0)
		})
	})

})
