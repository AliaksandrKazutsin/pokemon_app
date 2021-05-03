export const serviceAuth = (name, password) => {
	try {
		return new Promise((resolve, reject) => {
			if (name.length > 0 && password.length > 0) {
				const userData = {
					name: name,
					password: password
				};

				resolve(userData);
			} else {
				reject(new Error('Incorrect user data!'));
			}
		});
	} catch (error) {
		console.error("ERROR", error);
	}

}