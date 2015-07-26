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
				res.render('quizes/index',{quizes: quizes, errors: []});
			}
		).catch(function (error) {
				next(error);
			}
		);
	} else {
		models.Quiz.findAll().then(
				function (quizes) {			
					res.render('quizes/index',{quizes: quizes, errors: []});
				}
			).catch(function (error) {
				next(error);
				}
			);
	}
};

/**
 * Recibe la pregunta
 */
exports.show = function (req, res) {
	res.render("quizes/show", {quiz: req.quiz, errors: []});
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
			{title: "Quiz | Respuesta", quiz: req.quiz, respuesta: resultado, intentar: intentar, errors: []}
	);
};

/**
 * Formulario para crear preguntas
 */
exports.new = function (req, res) {
	var quiz = models.Quiz.build(
		{
			pregunta: "",
			respuesta: "",
			tematica: ""
		}		
	);
	res.render('quizes/new', {quiz: quiz, errors: []});
};
/**
 * Controlador para crear preguntas
 */
exports.create = function (req, res) {
	var quiz = models.Quiz.build(req.body.quiz);
	quiz.validate().then(function (err) {
		if (err) {
			res.render("quizes/new", {quiz: quiz, errors: err.errors});
		} else {
			quiz.save({fields: ["pregunta", "respuesta", "tematica"]}).then(function () {
				res.redirect("/quizes");
			});
		}
	});
};
/**
 * Formulario para editar preguntas
 */
exports.edit = function (req, res) {
	var quiz = req.quiz;
	res.render("quizes/edit", {quiz: quiz, errors: []});
};

/**
 * Controlador para actualizar pregunta
 */
exports.update = function (req, res) {
	req.quiz.pregunta = req.body.quiz.pregunta;
	req.quiz.respuesta = req.body.quiz.respuesta;
	req.quiz.tematica = req.body.quiz.tematica;
	
	req.quiz.validate().then(function (err) {
		if (err) {
			res.render("quizes/edit", {quiz: req.quiz, errors: err.errors});
		} else {
			req.quiz.save( {fields: ["pregunta", "respuesta", "tematica"]}).then(function () {
				res.redirect("/quizes");
			});
		}
	});
};

/**
 * controlador para eliminar pregunta
 */
exports.destroy = function (req, res) {
	req.quiz.destroy().then(function () {
		res.redirect("/quizes");
	}).catch(function (error) {
		next(error);
	});
};

/**
 * Página de autor
 */
exports.author = function (req, res) {
	res.render(
		'author',
		{title: "Quiz | Autor", errors: []}
	);
};
