<script>
export default {
};
</script>

<template>
	<Header />
	<main class="flex h-screen">
		<section class="hidden lg:flex flex-col bg-[#404555] w-[40%]"></section>
		<slot name="children">Fallback</slot>
	</main>
</template>
