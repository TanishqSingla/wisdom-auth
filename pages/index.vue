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
			emailOrPhone: "",
			password: "",
		};
	},
	methods: {
		onSubmit(values) {
			console.log("SUBMITTED", values);
		},
		validateEmail(value) {
			if (!value) return inputErrors.noEmailOrPhone;
			if (value.includes("@")) {
				if (!isEmail(value)) return inputErrors.validEmail;
			} else {
				if (!isMobileNumber(value)) return inputErrors.validPhNumber;
			}
			return true;
		},
		validatePassword(value) {
			if (!this.password) {
				return inputErrors.noPassword;
			}
			if (this.password.length < 8) {
				return inputErrors.minPassword;
			}
			return true;
		},
	},
};
</script>

<template>
	<Layout>
		<template #children>
			<Form @submit="onSubmit" class="flex flex-col">
				<Field
					name="email"
					type="text"
					:rules="validateEmail"
					placeholder="Email Id or Mobile Number"
					v-model.trim="emailOrPhone"
				/>
				<ErrorMessage name="email" />
				<label>
					<Field
						name="password"
						type="password"
						:rules="validatePassword"
						placeholder="Password"
						v-model.trim="password"
					/>
					<ErrorMessage name="password" />
					<NuxtLink to="/" class="text-sm text-[royalblue]"
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
			<button @click="visible = true">Show modal</button>
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
	@apply p-2 h-12 w-96;
}
</style>
