var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');

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
router.param('commentId', commentController.load);

/** sessiones **/
router.get('/login',						sessionController.new);
router.post('/login',						sessionController.create);
router.get('/logout',						sessionController.destroy);

/**
 * Definición de las rutas.
 */
router.get('/quizes', 						quizController.index);
router.get('/quizes/:quizId(\\d+)', 		quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', 	quizController.answer);
/** crear preguntas **/
router.get('/quizes/new', 					sessionController.loginRequired, quizController.new);
router.post('/quizes/create', 				sessionController.loginRequired, quizController.create);
/** editar preguntas **/
router.get('/quizes/:quizId(\\d+)/edit', 	sessionController.loginRequired, quizController.edit);
router.put('/quizes/:quizId(\\d+)', 		sessionController.loginRequired, quizController.update);
/** eliminar pregunta **/
router.delete('/quizes/:quizId(\\d+)', 		sessionController.loginRequired, quizController.destroy);
/** comentarios **/
router.get('/quizes/:quizId(\\d+)/comments/new',	commentController.new);
router.post('/quizes/:quizId(\\d+)/comments',		commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d)/publish', sessionController.loginRequired, commentController.publish);


/** autor **/
router.get('/author', 						quizController.author);

module.exports = router;
