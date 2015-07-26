var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quiz_controller')

/**
 * Rutas o routes
 */
router.get('/', function(req, res, next) {
	res.render('index', {title: 'Bienvenido a Quiz'});
});

/**
 * Autoload
 */
router.param('quizId', quizController.load);

/**
 * Definición de las rutas.
 */
router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new', quizController.new);
router.post('/quizes/create', quizController.create);
router.get('/author', quizController.author);

module.exports = router;
