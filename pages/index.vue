<script>
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
	components: {
    Form,
		Field,
    ErrorMessage
	},
  methods: {
    onSubmit(values) {
      console.log("SUBMITTED")
    },
    validateEmail(value) {
      if(!value) {
        return 'This field is empty'
      }
      
      const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      const regexNumber = /^(\+\d{1,3}[- ]?)?\d{10}$/
      
      if(!regexEmail.test(value)) {
        return "Please enter a valid email address"
      }
      if(!regexNumber.test(value)) {
        return "Please enter a valid mobile number"
      }
    }
  }
};
</script>

<template>
	<Layout>
		<template #children>
			<main class="flex">
				<section class="hidden lg:block bg-[#404555]">hello world</section>
				<Form @submit="onSubmit">
					<Field name="email" type="email" :rules="validateEmail" placeholder="Email Id or Mobile Number" />
          <ErrorMessage name="email"/>
					<input type="password" />
					<NuxtLink to="forgot">Forgot Password</NuxtLink>
					<button type="submit">Sign In</button>
				</Form>
			</main>
		</template>
	</Layout>
</template>

<style>
body {
	font-family: "Work Sans", sans-serif;
}
</style>
