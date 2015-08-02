var models = require("../models/models.js");

/**
 * Autoload
 */
exports.load = function (req, res, next, commentId) {
	models.Comment.find({
		where: {
			id: Number(commentId)
		}		
	}).then(function (comment) {
		if (comment) {
			req.comment = comment;
			next();
		} else {
			next(new Error("No existe comentario ")+commentId);
		}
	}).catch(function (error) {
		next(error);
	});
};

/**
 * Formulario para crear comentario
 */
exports.new = function (req, res) {
	res.render('comments/new', {quizid: req.params.quizId, errors: []});
};

/**
 * Controlador para crear comentario
 */
exports.create = function (req, res) {
	var comment = models.Comment.build({
		texto: req.body.comment.texto,
		QuizId: req.params.quizId		
	});
	
	comment.validate().then(function (err) {
		if (err) {
			res.render("comment/new", {comment: comment, quizid: req.params.quizId, errors: err.errors});
		} else {
			comment.save().then(function () {
				res.redirect("/quizes/"+req.params.quizId);
			});
		}
	}).catch(function (error) {
		next(error);
	});
};

/**
 * Controlador para publicar comentarios
 */
exports.publish = function (req, res) {
	req.comment.publicado = true;
	req.comment.save(
		{fields: ["publicado"]}
	).then(function () {
		res.redirect("/quizes/"+req.params.quizId);
	}).catch(function (error) {
		next(error);
	});
};


