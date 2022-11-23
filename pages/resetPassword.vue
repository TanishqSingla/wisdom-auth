<script>
export default {
  data() {
    return {
      showPassword: false,
      showConfirmPassword: false,
      password: "",
      confirmPassword: "",
      errorPassword: false,
      errorConfirmPassword: false,
    };
  },
  methods: {
    validateForm() {
      this.errorPassword = false;
      this.errorConfirmPassword = false;
      if (!this.password || this.password.length < 8) {
        this.errorPassword = true;
        return false;
      }
      if (this.confirmPassword !== this.password) {
        this.errorConfirmPassword = true;
        return false;
      }
      return true;
    },
    submitForm() {
      this.validateForm();
    }
  }
};
</script>

<template>
  <Layout>
    <template #children>
      <div class="form-section">
        <div class="form-container">
          <div class="form-caption">
            <h1 class="caption-title">Reset Password</h1>
            <p>Enter new password you haven't used before</p>
          </div>
          <form class="form" @submit.prevent="submitForm">
            <div class="form-body">
              <label class="relative">
                <input :type="showPassword ? 'text' : 'password'" placeholder="New Password"
                  :class="errorPassword ? 'border-danger' : ''" v-model="password" />
                <img :src="showPassword?eyeClosed:eye" v-on:click="() => (showPassword = !showPassword)" class="absolute right-4 top-4" />
                <span :class="errorPassword ? 'text-danger' : 'text-slate-500'">Password must be at least 8
                  characters</span>
              </label>
              <label class="relative">
                <input :type="showConfirmPassword ? 'text' : 'password'"
                  :class="errorConfirmPassword ? 'border-danger' : ''" placeholder="Confirm New Password"
                  v-model="confirmPassword" />
                <img :src="showConfirmPassword?eyeClosed:eye" v-on:click="() => (showConfirmPassword = !showConfirmPassword)" class="absolute right-4 top-4" />
                <span :class="errorConfirmPassword ? 'text-danger' : 'text-slate-500'">Both passwords must match!</span>
              </label>
            </div>
            <div class="form-footer">
              <button class="btn-primary" type="submit">Reset Password</button>
            </div>
          </form>
        </div>
      </div>
    </template>
  </Layout>
</template>

<script setup>
import eye from '~/assets/svgs/eye.svg';
import eyeClosed from '~/assets/svgs/eye-closed.svg'
</script>

<style scoped>
form span {
  @apply text-xs
}
</style>