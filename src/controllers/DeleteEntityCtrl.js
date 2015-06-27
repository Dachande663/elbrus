function deleteEntityCtrl(req, res) {

	var schema = req.elbrus.schema;

	schema.repository.deleteEntity(req.elbrus.entity._id).then(function(result){
		res.json({
			deleted: result
		});
	});

}


module.exports = deleteEntityCtrl;
