var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');

/**
 * Rutas o routes
 */
router.get('/', function(req, res, next) {
	res.render('index', {title: 'Bienvenido a Quiz', errors: []});
});

/**
 * Autoload
 */
router.param('quizId', quizController.load);

/**
 * Definición de las rutas.
 */
router.get('/quizes', 						quizController.index);
router.get('/quizes/:quizId(\\d+)', 		quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', 	quizController.answer);
/** crear preguntas **/
router.get('/quizes/new', 					quizController.new);
router.post('/quizes/create', 				quizController.create);
/** editar preguntas **/
router.get('/quizes/:quizId(\\d+)/edit', 	quizController.edit);
router.put('/quizes/:quizId(\\d+)', 		quizController.update);
/** eliminar pregunta **/
router.delete('/quizes/:quizId(\\d+)', 		quizController.destroy);
/** comentarios **/
router.get('/quizes/:quizId(\\d+)/comments/new',commentController.new);
router.post('/quizes/:quizId(\\d+)/comments',commentController.create);

/** autor **/
router.get('/author', 						quizController.author);

module.exports = router;
