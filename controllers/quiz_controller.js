/**
 * Recibe la pregunta
 */
exports.question = function (req, res) {
	res.render(
			'quizes/question',
			{title: "Quiz | Pregunta", pregunta: 'Capital de Italia'}
	);
};

/**
 * Envía resultado de la respuesta
 */
exports.answer = function (req, res) {
	var resultado = "Incorrecta",
		intentar = true;
	if (req.query.respuesta === "Roma") {
		resultado = "Correcta";
		intentar = false;
	}
	res.render(
			'quizes/answer', 
			{title: "Quiz | Respuesta", respuesta: resultado, intentar: intentar}
	);
};

exports.author = function (req, res) {
	res.render(
		'author',
		{title: "Quiz | Autor"}
	);
};
