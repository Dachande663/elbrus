var should = require('should');


var VarcharField = require('../src/fields/VarcharField');


describe('VarcharField', function(){


	it('Can get key from field', function(){
		var field = new VarcharField('name');
		should.equal(field.key, 'name');
	});


	it('Will get default value', function(){
		var field = new VarcharField('name', { default: 'hello' });
		var result = field.getValueFromInput({}, null);
		should.equal('hello', result.value);
	});


	it('Will get input value', function(){
		var field = new VarcharField('name', { default: 'hello' });
		var result = field.getValueFromInput({ name: 'world' }, null);
		should.equal('world', result.value);
	});


	it('Will ignore input if protected', function(){
		var field = new VarcharField('name', { protected: true, default: 'world' });
		var result = field.getValueFromInput({ name: 'world' }, null);
		should.equal('world', result.value);
	});


	it('Will ignore update if protected', function(){
		var field = new VarcharField('name', { protected: true });
		var result = field.getValueFromInput({ name: 'alpha' }, { name: 'bravo' });
		should(true, result.skip);
	});


	it('Will use input if not editable', function(){
		var field = new VarcharField('name', { editable: false });
		var result = field.getValueFromInput({ name: 'world' }, null);
		should.equal('world', result.value);
	});


	it('Will ignore update if not editable', function(){
		var field = new VarcharField('name', { editable: false });
		var result = field.getValueFromInput({ name: 'alpha' }, { name: 'bravo' });
		should(true, result.skip);
	});


	it('Will error if required', function(){
		var field = new VarcharField('name', { required: true });
		var result = field.getValueFromInput({ }, null);
		should.equal('required', result.error);
	});


	it('Will not error if required', function(){
		var field = new VarcharField('name', { required: true });
		var result = field.getValueFromInput({}, {});
		should(true, result.skip);
	});


});
