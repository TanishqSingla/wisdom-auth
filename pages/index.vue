<script>
import { Form, Field, ErrorMessage } from "vee-validate";

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
  },
	methods: {
		onSubmit(values) {
			console.log("SUBMITTED");
		},
		validateEmail(value) {
			if (!value) {
				return "This field is empty";
			}

			const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
			const regexNumber = /^(\+\d{1,3}[- ]?)?\d{10}$/;

			if (!regexEmail.test(value)) {
				return "Please enter a valid email address";
			}
			if (!regexNumber.test(value)) {
				return "Please enter a valid mobile number";
			}
		},
	},
};
</script>

<template>
	<Layout>
		<template #children>
			<main class="flex">
				<section class="hidden lg:block bg-[#404555]">hello world</section>
				<Form @submit="onSubmit">
					<Field
						name="email"
						type="email"
						:rules="validateEmail"
						placeholder="Email Id or Mobile Number"
					/>
					<ErrorMessage name="email" />
					<input type="password" />
					<NuxtLink to="forgot">Forgot Password</NuxtLink>
					<button type="submit">Sign In</button>
				</Form>
				<button @click="visible=true">Show modal</button>
			</main>
			<Modal v-show="visible" v-on:closeModal="() => visible = false">
				<template #children>
					<div class="h-32 w-32 bg-white">
            <p>Reset Password</p>
            <p>Thank you! We have sent you a link to reset your password. Please check your email</p>
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
</style>
