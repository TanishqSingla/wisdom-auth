<script>
import { inputErrors, isEmail, isMobileNumber } from "~~/util/utils";

export default {
  data() {
    return {
      showPassword: false,
      errorEmail: "",
      errorPhNumber: "",
      errorPassword: "",
      email: "",
      phNumber: "",
      password: "",
      firstName: "",
      lastName: "",
      visible: false,
    };
  },
  methods: {
    resetErrorState() {
      this.errorEmail = this.errorPassword = this.errorPhNumber = "";
    },
    validateForm() {
      this.resetErrorState();
      if (!this.email || !isEmail(this.email)) {
        this.errorEmail = this.email
          ? inputErrors.validEmail
          : inputErrors.noEmail;
        return false;
      }
      if (!this.phNumber || !isMobileNumber(this.phNumber)) {
        this.errorPhNumber = this.phNumber
          ? inputErrors.validPhNumber
          : inputErrors.noPhoneNumber;
        return false;
      }
      if (!this.password || this.password.length < 8) {
        this.errorPassword = inputErrors.minPassword;
        return false;
      }
      return true;
    },
    submitForm() {
      if (this.validateForm()) {
        fetch("http://localhost:4000/api/user/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: this.firstName + " " + this.lastName,
            email: this.email,
            password: this.password,
            phoneNumber: this.phNumber,
          }),
        }).then(async (res) => {
          const data = await res.json();
          if(data.error) {
            if(data.error?.email) {
              this.errorEmail = data.error.email;
            }
            if(data.error?.phoneNumber) {
              this.errorPhNumber = data.error.phoneNumber;
            }
            return;
          }
          this.visible = true;
        });
      }
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
            <h1 class="caption-title">Create an account</h1>
            <p>
              Already have an account?
              <NuxtLink to="/" class="text-accent font-bold">Sign In</NuxtLink>
            </p>
          </div>
          <form class="form" @submit.prevent="submitForm">
            <input placeholder="First Name" required v-model="firstName" />
            <input placeholder="Last Name" v-model="lastName" />
            <input placeholder="Email Address" v-model="email" />
            <span v-if="errorEmail" class="text-danger">{{ errorEmail }}</span>
            <div class="flex gap-2">
              <label class="border p-2 rounded-md w-24">
                <select>
                  <option value="+91">+91</option>
                </select>
              </label>
              <input placeholder="Mobile Number" v-model="phNumber" />
            </div>
            <span v-if="errorPhNumber" class="text-danger errorMessage">{{ errorPhNumber }}</span>
            <label>
              <div class="relative">
                <input placeholder="Password" :type="showPassword ? 'text' : 'password'" v-model="password" />
                <img :src="showPassword ? eyeClosed : eye" v-on:click="() => (showPassword = !showPassword)"
                  class="absolute right-4 bottom-4" />
              </div>
              <span class="errorMessage mt-2" :class="errorPassword ? 'text-danger' : ''">Password must be at least 8
                characters</span>
            </label>
            <p class="text-xs">
              By clicking Sign Up you are indicating that you have read and
              acknowledged the
              <span class="text-accent">Terms of Service</span> and
              <span class="text-accent">Privacy Notice</span>
            </p>
            <button class="btn-primary">
              Sign Up
            </button>
          </form>
        </div>
      </div>
      <Teleport to="body">
        <Modal v-show="visible" v-on:closeModal="() => (visible = false)">
          <template #title>
            <h1 class="modal-title">Verify Email</h1>
          </template>
          <template #content>
            <p>
              Please verify your account. We have sent an email to {{email}}. If you are unable to find the
              verification email please contact us at: +91-9380644532
            </p>
          </template>
        </Modal>
      </Teleport>
    </template>
  </Layout>
</template>

<script setup>
import eye from '~/assets/svgs/eye.svg'
import eyeClosed from '~/assets/svgs/eye-closed.svg'
</script>