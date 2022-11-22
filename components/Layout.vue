<template>
	<Header />
	<main class="flex lg:h-screen grow">
		<section class="hidden lg:flex flex-col bg-[#404555] w-[40%] text-white">
			<div class="h-[60%] grid place-items-center">
				<img src="~/assets/svgs/landing-logo.svg" />
			</div>
			<div class="h-[40%] flex">
				<img src="../assets/images/POSE_02.png" class="self-end" />
				<div class="w-full h-full flex flex-col self-center gap-4 justify-center">
					<p class="text-white text-2xl font-extrabold">Welcome back!</p>
					<p class="text-white mb-8 font-normal mr-6 max-w-xs">
						Sign In to find opportunities that match your interests. We have
						both part-time and full-time roles that can be done online and
						in-person.
					</p>
					<svg class="mb-8" width="27" height="3" viewBox="0 0 27 3" fill="none" xmlns="http://www.w3.org/2000/svg">
						<rect width="15.0615" height="3" rx="1.5" fill="white" />
						<rect opacity="0.5" x="17.8857" width="2.82402" height="3" rx="1.41201" fill="white" />
						<rect opacity="0.5" x="23.5332" width="2.82402" height="3" rx="1.41201" fill="white" />
					</svg>
					<p class="text-xs max-w-xs">Please contact us at <strong>+91-9380644532</strong> if you need any assistance.
					</p>
				</div>
			</div>
		</section>
		<slot name="children"></slot>
	</main>
</template>

<style>
main section {
	font-family: "Poppins", sans-serif;
}
body {
	@apply flex flex-col h-screen
}
body > div {
	@apply h-full flex flex-col
}
</style>
