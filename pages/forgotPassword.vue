<script>
import { inputErrors, isEmail } from "~~/util/utils";

export default {
  data() {
    return {
      emailError: "",
      email: "",
      visible: false,
    };
  },
  methods: {
    validateEmail(e) {
      const value = e.target.value;
      if (!value || !isEmail(value)) {
        this.emailError = inputErrors.validEmail;
        return;
      }
      this.emailError = "";
    },
    submitForm() {
      fetch("http://localhost:4000/api/user/recoverPassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: this.email }),
      }).then(async (res) => {
        const data = await res.json();
        if(data.message) {
          this.visible = true;
          return;
        } else {
          this.emailError = data.error;
        }
      }).catch((e) => console.log(e));
    },
  },
};
</script>

<template>
  <Layout>
    <template #children>
      <div class="form-section">
        <div class="form-container">
          <div class="form-caption">
            <h1 class="caption-title">Forgot Password</h1>
            <p>
              We'll send you a reset password link to your registered email
              address
            </p>
          </div>
          <form class="form" @submit.prevent="submitForm">
            <input name="emailOrPhone" placeholder="Registered Email" v-model="email" v-on:blur="validateEmail" v-on:input="validateEmail"
              :class="emailError ? 'border-danger' : ''" />
            <span class="text-danger">{{ emailError }}</span>
            <button class="btn-primary" type="submit" :disabled="emailError.length !== 0">
              Submit
            </button>
            <NuxtLink to="/"><button class="btn-secondary w-full">
                Return to Sign In
              </button></NuxtLink>
          </form>
        </div>
      </div>
      <Teleport to="body">
        <Modal v-show="visible" v-on:closeModal="() => (visible = false)">
          <template #title>
            <h1 class="modal-title">Reset Password</h1>
          </template>
          <template #content>
            <p>
              Thank you! We have sent you a link to reset your password. Please
              check your email.
            </p>
          </template>
        </Modal>
      </Teleport>
    </template>
  </Layout>
</template>
