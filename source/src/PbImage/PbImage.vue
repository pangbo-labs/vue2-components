<template>
	<div>
		<img v-if="type == 'image'" :src="src">
		<i v-if="type == 'google-symbol'" class="material-symbols material-symbols-rounded">{{ src }}</i>
	</div>
</template>

<script>
export default {
	name: "PbImage",
	props: {
		type:	{ type: String, default: "image" }, // image, google-symbol
		src:	{ type: String, default: null },
	},
}
</script>

<style scoped>
</style>
