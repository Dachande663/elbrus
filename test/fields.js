var should = require('should');


var StringField = require('../src/classes/Field/StringField');


describe('StringField', function(){


	it('Can get slug from field', function(){
		var slug = 'test';
		var field = new StringField({ slug: slug });
		should.equal(field.slug, slug);
	});


});
