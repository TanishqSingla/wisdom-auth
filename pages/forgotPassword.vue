<script>
import { inputErrors, isEmail } from '~~/util/utils';

export default {
  data() {
    return {
      emailError: "",
      email: "",
    }
  },
  methods: {
    validateEmail(e) {
      const value = e.target.value;
      if (!value || !isEmail(value)) {
        this.emailError = inputErrors.validEmail;
        return;
      }
      this.emailError = ""
    },
    async submitForm() {
      const {data} = await useFetch('/api/user/forgotPassword');
    }
  }
}
</script>

<template>
  <Layout>
    <template #children>
      <div class="form-section">
        <div class="form-container">
          <div class="form-caption">
            <h1 class="caption-title">Forgot Password</h1>
            <p>We'll send you a reset password link to your registered email address</p>
          </div>
          <form class="form" @submit.prevent="submitForm">
            <input name="emailOrPhone" placeholder="Registered Email" v-model="email" v-on:blur="validateEmail"
              :class="emailError?'border-danger':''" />
            <span class="text-danger">{{ emailError }}</span>
            <button class="btn-primary" type="submit" :disabled="emailError.length!==0">Submit</button>
            <NuxtLink to="/"><button class="btn-secondary w-full">Return to Sign In</button></NuxtLink>
          </form>
        </div>
      </div>
    </template>
  </Layout>
</template>