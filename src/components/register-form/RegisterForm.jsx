import React from 'react';
import useStyles from './styles';
import {
	Button,
	Grid,
	Link,
	Paper,
	TextField,
	Typography,
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { Formik, Form, Field, ErrorMessage } from 'formik';

export default function RegisterForm() {
	const classes = useStyles();
	const name_pattern =
		/^([a-zA-Z]{2,}\s[a-zA-z]{1,}'?-?[a-zA-Z]{1,}\s?([a-zA-Z]{1,})?)/i;
	const phone_pattern =
		/^[(]{0,1}[0-9]{3}[)]{0,1}[-\s.]{0,1}[0-9]{3}[-\s.]{0,1}[0-9]{4}$/i;
	const email_pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
	const password_pattern =
		/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[-+_!@#$%^&*?]).{8,}$/i;
	const lowercase_pattern = /^(?=.*[a-z])/g;
	const uppercase_pattern = /^(?=.*[A-Z])/g;
	const digit_pattern = /^(?=.*\d{1,})/g;
	const special_pattern = /(?=.*[-+_!@#$%^&*?])/g;

	return (
		<Grid className={classes.registerForm}>
			<Paper elevation={20} className={classes.registerForm__paperStyle}>
				<Grid className={classes.registerForm__heading}>
					<h1 className={classes.registerForm__headingTitle}>
						Register Form
					</h1>
					<Typography
						className={classes.registerForm__caption}
						variant='caption'
					>
						To create an account, complete this form!
					</Typography>
				</Grid>
				<Formik
					initialValues={{
						name: '',
						phone: '',
						email: '',
						password: '',
						confirmPassword: '',
					}}
					validate={values => {
						const errors = {};
						if (!values.name) {
							errors.name = 'First and last name are required!';
						} else if (!name_pattern.test(values.name)) {
							errors.name = 'Enter first and last name!';
						}

						if (!values.phone) {
							errors.phone = 'Phone number is required!';
						} else if (!phone_pattern.test(values.phone)) {
							errors.phone =
								'Preferred phone pattern is:  123-456-7890!';
						}

						if (!values.email) {
							errors.email = 'Email address is required!';
						} else if (!email_pattern.test(values.email)) {
							errors.email = 'Enter valid email address!';
						}

						if (!values.password) {
							errors.password = 'Password is required!';
						} else if (!lowercase_pattern.test(values.password)) {
							errors.password =
								'Password must have a lowercase character!';
						} else if (!uppercase_pattern.test(values.password)) {
							errors.password =
								'Password must have an uppercase character!';
						} else if (!digit_pattern.test(values.password)) {
							errors.password = 'Password must have a digit character!';
						} else if (!special_pattern.test(values.password)) {
							errors.password = `Password must include at least one: '-+_!@#$%^&*?'`;
						} else if (!password_pattern.test(values.password)) {
							errors.password =
								'Password must have at least 8 characters!';
						}

						if (!values.confirmPassword) {
							errors.confirmPassword = 'Confirmed password is required!';
						} else if (!values.confirmPassword.match(values.password)) {
							errors.confirmPassword =
								'Confirmed password must match password!';
						} else if (
							values.confirmPassword.length !== values.password.length
						) {
							errors.confirmPassword =
								'Confirmed password must match password!';
						}

						return errors;
					}}
					onSubmit={(values, { setSubmitting, resetForm }) => {
						setTimeout(() => {
							alert(JSON.stringify(values, null, 2));
							resetForm({});
							setSubmitting(false);
						}, 500);
					}}
				>
					{({ isSubmitting }) => (
						<Form noValidate>
							<Grid className={classes.registerForm__textFieldContainer}>
								<AccountCircleIcon
									className={classes.registerForm__textFieldIcon}
								/>
								<Field
									as={TextField}
									className={classes.registerForm__textFieldStyle}
									type='text'
									name='name'
									label='Name'
								/>
							</Grid>
							<ErrorMessage
								className={classes.registerForm__errorMessage}
								name='name'
								component='span'
							/>
							<Grid className={classes.registerForm__textFieldContainer}>
								<PhoneIcon
									className={classes.registerForm__textFieldIcon}
								/>
								<Field
									as={TextField}
									className={classes.registerForm__textFieldStyle}
									type='text'
									name='phone'
									label='Phone'
								/>
							</Grid>
							<ErrorMessage
								className={classes.registerForm__errorMessage}
								name='phone'
								component='span'
							/>
							<Grid className={classes.registerForm__textFieldContainer}>
								<EmailIcon
									className={classes.registerForm__textFieldIcon}
								/>
								<Field
									as={TextField}
									className={classes.registerForm__textFieldStyle}
									type='email'
									name='email'
									label='Email'
								/>
							</Grid>
							<ErrorMessage
								className={classes.registerForm__errorMessage}
								name='email'
								component='span'
							/>
							<Grid className={classes.registerForm__textFieldContainer}>
								<LockIcon
									className={classes.registerForm__textFieldIcon}
								/>
								<Field
									as={TextField}
									className={classes.registerForm__textFieldStyle}
									type='password'
									name='password'
									label='Password'
								/>
							</Grid>
							<ErrorMessage
								className={classes.registerForm__errorMessage}
								name='password'
								component='span'
							/>
							<Grid className={classes.registerForm__textFieldContainer}>
								<LockOpenIcon
									className={classes.registerForm__textFieldIcon}
								/>
								<Field
									as={TextField}
									className={classes.registerForm__textFieldStyle}
									type='password'
									name='confirmPassword'
									label='Confirm Password'
								/>
							</Grid>
							<ErrorMessage
								className={classes.registerForm__errorMessage}
								name='confirmPassword'
								component='span'
							/>
							<Grid className={classes.registerForm__textFieldContainer}>
								<Button
									id='buttonStyle'
									className={classes.registerForm__buttonStyle}
									type='submit'
									variant='contained'
									fullWidth
									disabled={isSubmitting}
								>
								{isSubmitting ? 'Please wait...': 'Submit'}
								</Button>
							</Grid>
						</Form>
					)}
				</Formik>
				<Typography className={classes.registerForm__linkStyle}>
					<Link className={classes.registerForm__link} href='#'>
						Terms and Conditions
					</Link>
				</Typography>
			</Paper>
		</Grid>
	);
}
