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
			<div class="lg:grid lg:place-items-center grow">
				<div>
					<div class="mb-6">
						<h1 class="font-bold text-2xl mb-2">Sign In to WisdomCircle</h1>
						<p>
							Don't have an account?
							<span class="text-accent font-bold">Sign Up</span>
						</p>
					</div>
					<Form
						@submit="onSubmit"
						class="flex flex-col gap-4"
						v-slot="{ setFieldError }"
					>
						<label>
							<Field
								name="email"
								type="text"
								placeholder="Email Id or Mobile Number"
								v-model.trim="emailOrPhone"
								:rules="validateEmail"
								:class="emailError ? 'border-danger' : ''"
							/>
							<ErrorMessage name="email" />
						</label>
						<label>
							<Field
								name="password"
								type="password"
								placeholder="Password"
								v-model.trim="password"
								:rules="validatePassword"
								:class="passwordError ? 'border-danger' : ''"
							/>
							<span class=""></span>
							<ErrorMessage name="password" />
						</label>
						<NuxtLink
							to="/"
							class="text-sm text-[royalblue] font-bold text-right"
							>Forgot Password</NuxtLink
						>
						<button class="bg-[#F1C12B] h-12 rounded-md font-semibold text-lg">
							Sign In
						</button>
					</Form>
				</div>
			</div>
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
const emailTouched = useState("emailTouched", () => false);
const passwordTouched = useState("passwordTouched", () => false);
const emailError = useState("emailError", () => false);
const passwordError = useState("passwordError", () => false);

defineExpose({
	emailOrPhone,
	password,
	emailTouched,
	passwordTouched,
	emailError,
	passwordError,
});

function onSubmit(values, actions) {}

function validateEmail(value, form) {
	if (!emailTouched.value) {
		emailTouched.value = true;
		return;
	}
	if (!value) {
		emailError.value = true;
		return inputErrors.noEmailOrPhone;
	}
	if (value.includes("@")) {
		if (!isEmail(value)) {
			emailError.value = true;
			return inputErrors.validEmail;
		}
	} else {
		if (!isMobileNumber(value)) {
			emailError.value = true;
			return inputErrors.validPhNumber;
		}
	}
	emailError.value = false;
	return true;
}

function validatePassword(value) {
	if (!passwordTouched.value) {
		passwordTouched.value = true;
		return;
	}
	if (!value) {
		passwordError.value = true;
		return inputErrors.noPassword;
	}
	if (value.length < 8) {
		passwordError.value = true;
		return inputErrors.minPassword;
	}
	passwordError.value = false;
	return true;
}
</script>

<style>
body {
	font-family: "Poppins", sans-serif;
}

input {
	@apply p-2 h-12 w-96 border border-slate-200 focus:outline-none focus:border-neutralGray rounded-[4px];
}

label {
	@apply flex flex-col;
}

span[role="alert"] {
	@apply text-danger;
}
</style>
