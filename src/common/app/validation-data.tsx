export const isEmailAddress = (val: string) => {
	const emailPattern: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	return emailPattern.test(val);
};

export const isPassword = (val: string) => {
	const passwordPattern: RegExp = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{3,})$/;
	return passwordPattern.test(val);
};