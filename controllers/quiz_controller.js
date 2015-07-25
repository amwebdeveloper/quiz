var models = require("../models/models.js");

/**
 * Recibe la pregunta
 */
exports.question = function (req, res) {
	models.Quiz.findAll().success(function (quiz) {
		res.render("quizes/question", {pregunta: quiz[0].pregunta});
	});
};

/**
 * Envía resultado de la respuesta
 */
exports.answer = function (req, res) {
	models.Quiz.findAll().success(function (quiz) {
		var resultado = "Incorrecta",
		intentar = true;
		if (req.query.respuesta === quiz[0].respuesta) {
			resultado = "Correcta";
			intentar = false;
		}
		res.render(
				'quizes/answer', 
				{title: "Quiz | Respuesta", respuesta: resultado, intentar: intentar}
		);
	});
};

exports.author = function (req, res) {
	res.render(
		'author',
		{title: "Quiz | Autor"}
	);
};
