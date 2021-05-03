import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import React, { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { hideAlert, showAlert, userOauth } from '../../../redux/actions';
import { userEmail, userPassword, validateUserData } from '../../../redux/selectors';
import { LOGIN_PAGE_VALIDATION_DATA } from '../constants';
import { isEmailAddress, isPassword } from '../validation-data';
import './login-page.scss';

interface LoginPage {
	login: boolean;
	onLogin: () => void;
}

const ALERT_DELAY: number = 4000;

export const Login: React.FunctionComponent<LoginPage> = memo(({ onLogin, login }: LoginPage) => {

	const email: string = useSelector(userEmail);
	const password: string = useSelector(userPassword);
	const validationForm: string = useSelector(validateUserData);

	const dispatch = useDispatch();

	const handleLoginForm = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(userOauth(e.target.name, e.target.value));
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === " ") return e.preventDefault();
	};

	const handleSubmit = useCallback(() => {
		const userData: Object = {};
		userData.userEmail = email;
		userData.userPassword = password;

		if (userData.userEmail.length === 0 || userData.userPassword.length === 0) {
			setTimeout(() => { dispatch(hideAlert()); }, ALERT_DELAY);
			return dispatch(showAlert('These fields should not be clear'));
		}

		if (!isEmailAddress(userData.userEmail)) {
			setTimeout(() => { dispatch(hideAlert()); }, ALERT_DELAY);
			return dispatch(showAlert('Please, enter correct email address'));
		}

		if (!isPassword(userData.userPassword)) {
			setTimeout(() => { dispatch(hideAlert()); }, ALERT_DELAY);
			return dispatch(showAlert('Please, enter correct password'));
		}

		if (isEmailAddress(userData.userEmail) || isPassword(userData.userPassword)) {
			if (userData.userEmail.length > 0 && userData.userPassword.length > 0) {
				const token = jwt.sign({ userEmail: `${email}`, userPassword: `${password}` }, 'secret');
				Cookies.set('userData', token,
					{ expires: 30, secure: true });

				return onLogin();
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [email, onLogin, password]);

	if (login) {
		return <Redirect to={ `/` } />;
	}

	return (
		<div className="wrapper-login-page">
			<div className="wrapper-login-page__wrapper-caption">
				<h3 className="wrapper-login-page__caption">{ LOGIN_PAGE_VALIDATION_DATA.loginPageCaption }</h3>
			</div>

			<div className="wrapper-login-page__login-form">
				<form className="wrapper-form">
					<div className='wrapper-login-page_wrapper-check-validation'>
						{ validationForm && <h4 className="wrapper-login-page_check-validation">{ validationForm }</h4> }
					</div>
					<i className="fa fa-envelope" aria-hidden="true"></i>
					<input
						name='userEmail'
						type="email"
						placeholder="default@example.com"
						autoComplete="off"
						onKeyDown={ handleKeyDown }
						onChange={ handleLoginForm }
						required
					/>
					<i className="fa fa-lock" aria-hidden="true"></i>
					<input
						name='userPassword'
						type="password"
						placeholder="User123"
						autoComplete="off"
						onKeyDown={ handleKeyDown }
						onChange={ handleLoginForm }
						required
					/>
					<button
						className="wrapper-login-page__login-button"
						type='button'
						onClick={ handleSubmit }>
						{ LOGIN_PAGE_VALIDATION_DATA.signIn }
					</button>
				</form>
			</div>
		</div>
	);
});
