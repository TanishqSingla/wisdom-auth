<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import { isEmail, isMobileNumber } from "../util/utils";

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
	methods: {
		onSubmit(values) {
			console.log("SUBMITTED", values);
		},
		validateEmail(input) {
			let value = input.trim();
			if (!value) {
				return "Please enter email";
			}
			if (value.includes("@")) {
				if (!isEmail(value)) return "Please enter a valid email";
			} else {
				if (!isMobileNumber(value)) return "Please enter a valid mobile number";
			}

			return true;
		},
		validatePassword(value) {
			if (!value) {
				return "Please enter password";
			}
			return true;
		},
	},
};
</script>

<script setup>
const emailOrPhone = ref("");
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
					v-model.trime="emailOrPhone"
				/>
				<ErrorMessage name="email" />
				<Field name="password" type="password" placeholder="Password" />
				<NuxtLink to="">Forgot Password</NuxtLink>
				<button type="submit">Sign In</button>
			</Form>
			<button @click="visible = true">Show modal</button>
			<Modal v-show="visible" v-on:closeModal="() => (visible = false)">
				<template #children>
					<div class="h-32 w-32 bg-white">
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
	font-family: "Work Sans", sans-serif;
}
input {
	@apply p-2	
}
</style>
