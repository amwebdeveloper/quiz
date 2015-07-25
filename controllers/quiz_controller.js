var models = require("../models/models.js");

/**
 * 
 */
exports.load = function (req, res, next, quizId) {
	models.Quiz.find(quizId).then(function (quiz) {
		if (quiz) {
			req.quiz = quiz;
			next();
		} else {
			next(new Error("No existe quizId "+quizId));
		}
	}).catch(function (error) {
		next(error);
		}
	);
};

/**
 * 
 */
exports.index = function (req, res) {
	models.Quiz.findAll().then(
		function (quizes) {
			res.render('quizes/index',{quizes: quizes});
		}
	)
};

/**
 * Recibe la pregunta
 */
exports.show = function (req, res) {
	res.render("quizes/show", {quiz: req.quiz});
};

/**
 * Envía resultado de la respuesta
 */
exports.answer = function (req, res) {
	var resultado = "Incorrecta", intentar = true;
	if (req.query.respuesta === req.quiz.respuesta) {
		resultado = "Correcta";
		intentar = false;
	}
	res.render(
			'quizes/answer', 
			{title: "Quiz | Respuesta", quiz: req.quiz, respuesta: resultado, intentar: intentar}
	);
};

exports.author = function (req, res) {
	res.render(
		'author',
		{title: "Quiz | Autor"}
	);
};
