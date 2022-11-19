<script>
import { isEmail, isMobileNumber, inputErrors } from "../util/utils";

export default {
	components: {
		Form,
		Field,
		ErrorMessage,
	},
	data() {
		return {
			visible: false
		}
	}
};
</script>

<script setup>
import { Form, Field, ErrorMessage, useForm } from "vee-validate";

const errorEmail = useState("errorEmail", () => false);
const errorPassword = useState("errorPassword", () => false);
const emailOrPhone = useState("emailOrPhone", () => "");
const password = useState("password", () => "");

const { setFieldError, setErrors } = useForm();

defineExpose({ errorEmail, errorPassword, emailOrPhone, password });

function onSubmit(values, actions) {}

function validateEmail() {
	if (!emailOrPhone.value) {
		setFieldError('email', inputErrors.noEmailOrPhone)
		return;
	}
	if (emailOrPhone.value.includes("@")) {
		if (!isEmail(value)) {
			setFieldError('email', inputErrors.validEmail);
			return;
		}
	} else {
		if (!isMobileNumber(emailOrPhone)) {
			errorEmail.value = true;
			setErrors({email: inputErrors.validPhNumber});
			return;
		}
	}
	errorEmail.value = false
}

function validatePassword(value) {
	if (!value) {
		errorPassword.value = true;
		return inputErrors.noPassword;
	}
	if (value.length < 8) {
		return inputErrors.minPassword;
	}
	errorPassword.value = false;
	return true;
}
</script>

<template>
	<Layout>
		<template #children>
			<div class="lg:grid lg:place-items-center grow">
				<Form @submit="onSubmit" class="flex flex-col gap-4">
					<label for="email">
						<Field
							name="email"
							type="text"
							v-on:blur="validateEmail"
							placeholder="Email Id or Mobile Number"
							v-model.trim="emailOrPhone"
						/>
						<ErrorMessage name="email" />
					</label>
					<label for="password" class="">
						<Field
							name="password"
							type="password"
							:class="errorPassword ? 'border-danger' : ''"
							placeholder="Password"
							v-model.trim="password"
						/>
						<ErrorMessage name="password" />
						<NuxtLink
							to="/"
							class="text-sm text-[royalblue] font-bold text-right"
							>Forgot Password</NuxtLink
						>
					</label>
					<button
						type="submit"
						class="bg-[#F1C12B] h-12 rounded-md font-bold text-lg"
					>
						Sign In
					</button>
				</Form>
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
