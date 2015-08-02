
/**
 * Formulario de login
 */
exports.new = function (req, res) {
	var errors = req.session.errors || {};
	req.session.errors = {};
	res.render('sessions/new', {errors: errors});
};

/**
 * Formulario para crear la sesión
 */
exports.create = function (req, res) {
	var login = req.body.login;
	var passw = req.body.password;
	
	var userController = require('./user_controller');
	userController.autenticar(login, passw, function (error, user) {
		if (error) {
			req.session.errors = [{"message": "Se ha producido un error "+error}];
			res.redirect('/login');
			return;
		}		
		req.session.user = {id:user.id, username:user.username};
		// res.redirect(req.session.redir.toString());
		res.redirect('/');
	});
};

/**
 * Logout
 */
exports.destroy = function (req, res) {
	delete req.session.user;
	res.redirect('/');
};