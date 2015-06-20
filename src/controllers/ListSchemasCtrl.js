function ListSchemasCtrl(req, res){

	res.json({
		collections: [
			'pets',
			'weights'
		]
	});

}


module.exports = ListSchemasCtrl;
