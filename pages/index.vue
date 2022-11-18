<template>
	<Layout>
		<template #children>
			<main class="flex">
				<section class="hidden lg:block bg-[#404555]">hello world</section>
				<form action="">
					<input />
					<input type="password" />
					<NuxtLink>Forgot Password</NuxtLink>
				</form>
			</main>
		</template>
	</Layout>
</template>

<script>
export default {};
</script>

<style>
body {
	font-family: "Work Sans", sans-serif;
}
</style>
