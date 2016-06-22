'use strict';

const expect = require('chai').expect;
const findInMonth = require('../app/findByMonth').findInMonth;

describe('FindByMonth', function() {
	it ('searches through an array to find all objects with given month', function() {
				const data = [{ campaign: 'vegtables_snake_valley',
					  date: '2015-01-01',
					  spend: '28.48',
					  impressions: '4268',
					  actions: '"[{""action"": ""clicks""',
					  object_type: 'photo' },
					{ campaign: 'vegtables_snake_valley',
					  date: '2015-02-01',
					  spend: '28.48',
					  impressions: '4268',
					  actions: '"[{""action"": ""clicks""',
					  object_type: 'photo' },
					{ campaign: 'vegtables_snake_valley',
					  date: '2015-02-01',
					  spend: '28.48',
					  impressions: '4268',
					  actions: '"[{""action"": ""clicks""',
					  object_type: 'photo' },
					{ campaign: 'vegtables_snake_valley',
					  date: '2015-04-01',
					  spend: '28.48',
					  impressions: '4268',
					  actions: '"[{""action"": ""clicks""',
					  object_type: 'photo'
				}];
				let dataInFeb = findInMonth(data, '02');
				expect(dataInFeb).to.have.lengthOf(2);
	})
});
