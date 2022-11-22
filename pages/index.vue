<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import { isEmail, isMobileNumber, inputErrors } from "../util/utils";

export default {
	components: {
		Form,
		Field,
		ErrorMessage,
	},
	data() {
		return {
			visible: false,
		};
	},
};
</script>

<template>
	<Layout>
		<template #children>
			<section class="form-section">
				<div>
					<div class="form-caption">
						<h1 class="caption-title">Sign In to WisdomCircle</h1>
						<p>
							Don't have an account?
							<NuxtLink to="/signup" class="text-accent font-bold">Sign Up</NuxtLink>
						</p>
					</div>
					<Form @submit="onSubmit" class="flex flex-col gap-4">
						<label>
							<Field name="email" type="text" placeholder="Email Id or Mobile Number" v-model.trim="emailOrPhone"
								:class="errorPassword ? 'border-danger' : ''" />
							<ErrorMessage name="email" />
						</label>
						<label>
							<Field name="password" type="password" placeholder="Password" v-model.trim="password"
								:class="errorPassword ? 'border-danger' : ''" />
							<ErrorMessage name="password" />
						</label>
						<NuxtLink to="/forgotPassword" class="text-sm text-[royalblue] font-bold text-right">Forgot Password
						</NuxtLink>
						<button class="btn-primary">
							Sign In
						</button>
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
const errorPassword = useState("errorEmail", () => "");


defineExpose({
	emailOrPhone,
	password,
	errorEmail,
	errorPassword
});

function onSubmit(values, actions) {
	errorEmail.value = validateEmail(emailOrPhone.value);
	errorPassword.value = validatePassword(password.value);
	if (errorEmail || errorPassword) {
		errorEmail.value && actions.setFieldError('email', errorEmail.value);
		errorPassword.value && actions.setFieldError('password', errorPassword.value);
		return;
	}
}

function validateEmail(value) {
	if (!value) {
		return inputErrors.noEmailOrPhone;
	}
	if (value.includes("@")) {
		if (!isEmail(value)) {
			return inputErrors.validEmail;
		}
	} else {
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
	return true;
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
	@apply text-danger;
}
</style>
