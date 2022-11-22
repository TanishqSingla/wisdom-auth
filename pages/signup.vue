<template>
  <Layout>
    <template #children>
      <div class="form-section">
        <div class="form-container">
          <div class="form-caption">
            <h1 class="caption-title">Create an account</h1>
            <p>Already have an account? <span class="text-accent font-bold">Sign In</span></p>
          </div>
          <form class="form" @submit.prevent="">
            <input placeholder="First Name" />
            <input placeholder="Last Name" />
            <input placeholder="Email Address" />
            <div>
              <select>
                <option value="+91">
                </option>
              </select>
            </div>
          </form>
        </div>
      </div>
    </template>
  </Layout>
</template>

<script>
export default {
}
</script>