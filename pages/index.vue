<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import { isEmail, isMobileNumber, inputErrors } from "../util/utils";
import eye from '~/assets/svgs/eye.svg';
import eyeClosed from '~/assets/svgs/eye-closed.svg'

export default {
	components: {
		Form,
		Field,
		ErrorMessage,
	},
	data() {
		return {
			visible: false,
			showPassword: false,
		};
	},
};
</script>

<template>
	<Layout>
		<template #children>
			<section class="form-section">
				<div class="form-container">
					<div class="form-caption">
						<h1 class="caption-title">Sign In to WisdomCircle</h1>
						<p>
							Don't have an account?
							<NuxtLink to="/signup" class="text-accent font-bold">Sign Up</NuxtLink>
						</p>
					</div>
					<Form @submit="onSubmit" class="form">
						<div class="form-body">
							<label>
								<Field name="email" type="text" placeholder="Email Id or Mobile Number" v-model.trim="emailOrPhone"
									:class="errorEmail ? 'border-danger' : ''" />
								<ErrorMessage name="email" />
							</label>
							<label class="relative">
								<Field name="password" :type="showPassword?text:password" placeholder="Password" v-model.trim="password"
									:class="errorPassword ? 'border-danger' : ''" />
								<img :src="showPassword?eyeClosed:eye" v-on:click="() => showPassword = !showPassword" class="absolute right-4 top-4">
								<ErrorMessage name="password" />
							</label>
							<NuxtLink to="/forgotPassword" class="text-sm text-[royalblue] font-bold text-right">Forgot Password
							</NuxtLink>
						</div>
						<div class="form-footer">
							<button class="btn-primary">
								Sign In
							</button>
						</div>
					</Form>
				</div>
			</section>
			<Modal v-show="visible" v-on:closeModal="() => (visible = false)">
				<template #children>
					<div class="modalContainer">
						<p>Reset Password</p>
						<p>
							Thank you! We have sent you a link to reset your password. Please
							check your email
						</p>
					</div>
				</template>
			</Modal>
		</template>
	</Layout>
</template>

<script setup>
const emailOrPhone = useState("emailOrPhone", () => "");
const password = useState("password", () => "");
const errorEmail = useState("errorEmail", () => "");
const errorPassword = useState("errorPassword", () => "");
const loginMode = useState("loginMode", () => "");


defineExpose({
	emailOrPhone,
	password,
	errorEmail,
	errorPassword
});

function onSubmit(values, actions) {
	errorEmail.value = validateEmail(emailOrPhone.value);
	errorPassword.value = validatePassword(password.value);
	if (errorEmail.value || errorPassword.value) {
		errorEmail.value && actions.setFieldError('email', errorEmail.value);
		errorPassword.value && actions.setFieldError('password', errorPassword.value);
		return;
	}

	const payload = {password: password.value};
	if(loginMode.value === "email") {
		payload.email = emailOrPhone.value;
	} else {
		payload.phoneNumber = emailOrPhone.value;
	}

	fetch('http://localhost:4000/api/user/login', {
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify(payload)
	}).then(async(res) => {
		const data = await res.json();
		console.log(data)
		if(data?.error.email) {
			actions.setFieldError('email', data.error.email);
			return;
		}
		if(data?.error.password) {
			actions.setFieldError('password', data.error.password);
			return;
		}
	})
}

function validateEmail(value) {
	if (!value) {
		return inputErrors.noEmailOrPhone;
	}
	if (value.includes("@")) {
		loginMode.value = "email"
		if (!isEmail(value)) {
			return inputErrors.validEmail;
		}
	} else {
		loginMode.value = "mobile"
		if (!isMobileNumber(value)) {
			return inputErrors.validPhNumber;
		}
	}
	return '';
}

function validatePassword(value) {
	if (!value) {
		return inputErrors.noPassword;
	}
	if (value.length < 8) {
		return inputErrors.minPassword;
	}
	return '';
}
</script>

<style>
body {
	font-family: "Poppins", sans-serif;
}

label {
	@apply flex flex-col;
}

span[role="alert"] {
	@apply text-danger text-xs lg:text-sm;
}
</style>
