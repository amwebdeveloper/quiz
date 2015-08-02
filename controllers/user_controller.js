/**
 * Objeto predefinido para probar la sesion
 * y autenticación.
 */
var users = {
		admin: {
			id: 1,
			username: "admin",
			password: "admin"
		},
		pepe: {
			id: 2,
			username: "pepe",
			password: "pepe"
		}
};

exports.autenticar = function (login, password, callback) {
	if (users[login]) {
		if (password === users[login].password) {
			callback(null, users[login]);
		} else {
			callback(new Error("Password erróneo"));
		}
	} else {
		callback(new Error("No existe el usuario"));
	}
};
