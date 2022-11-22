
<script>
export default {
  data() {
    return {
      showPassword: false
    }
  },
}
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
          <form class="form" @submit.prevent="">
            <input placeholder="First Name" />
            <input placeholder="Last Name" />
            <input placeholder="Email Address" />
            <div class="flex gap-2">
              <label class="border p-2 rounded-md w-24">
                <select>
                  <option value="+91">+91</option>
                </select>
              </label>
              <input placeholder="Mobile Number" />
            </div>
            <label>
              <div class="relative">
                <input placeholder="Password" :type="showPassword ? 'text' : 'password'" />
                <img :src="showPassword ? '_nuxt/assets/svgs/eye-closed.svg' : '_nuxt/assets/svgs/eye.svg'"
                  v-on:click="() => showPassword = !showPassword" class="absolute right-4 bottom-4" />
              </div>
              <span class="text-xs mt-2">Password must be at least 8 characters</span>
            </label>
            <p class="text-xs">
              By clicking Sign Up you are indicating that you have read and
              acknowledged the <span class="text-accent">Terms of Service</span> and <span class="text-accent">Privacy
                Notice</span>
            </p>
            <button class="btn-primary">Sign Up</button>
          </form>
        </div>
      </div>
    </template>
  </Layout>
</template>
