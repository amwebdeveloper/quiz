var models = require("../models/models.js");

/**
 * Función para unir cadena de búsqueda
 */
var querySearch = function (query) {
	return '%'+query+'%'.replace(" ", "%");	
};

/**
 * Autoload.
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
 * Muestra todas las preguntas de la base de datos.
 * Si se hace una búsqueda sobre las preguntas, muestra 
 * las preguntas que contengan la cadena buscada ordenadas alfabéticamente.
 * En caso contrario muestra las preguntas en el orden que aparecen en la
 * tabla de la base de datos.
 */
exports.index = function (req, res) {
	if (req.query.search) {
		models.Quiz.findAll({where: ["pregunta like ?", querySearch(req.query.search)], order: [["pregunta", "ASC" ]]}).then(
			function (quizes) {			
				res.render('quizes/index',{quizes: quizes});
			}
		)
	} else {
		models.Quiz.findAll().then(
				function (quizes) {			
					res.render('quizes/index',{quizes: quizes});
				}
			)
	}
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

/**
 * Formulario para crear preguntas
 */
exports.new = function (req, res) {
	var quiz = models.Quiz.build(
		{
			pregunta: "Pregunta",
			respuesta: "Respuesta"
		}		
	);
	res.render('quizes/new', {quiz: quiz});
};
/**
 * Controlador para crear preguntas
 */
exports.create = function (req, res) {
	var quiz = models.Quiz.build(req.body.quiz);	
	quiz.save({fields: ["pregunta", "respuesta"]}).then(function () {
		res.redirect("/quizes");
	});
};
/**
 * Página de autor
 */
exports.author = function (req, res) {
	res.render(
		'author',
		{title: "Quiz | Autor"}
	);
};
