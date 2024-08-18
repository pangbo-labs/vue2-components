<!--
Written by Bo Pang.
Copyright (C) PBLabs 2021. All rights reserved.
-->

<template>
	<tr>
		<td class="label">{{ label }}</td>
		<td style="min-width: 30px;"></td>
		<td><slot></slot></td>
	</tr>
</template>

<script>
export default {
	name: "PbPropertyTableEntry",
	props:
	{
		label: { type: String, default: "" },
	},
	data: function()
	{
		return {}
	}
}
</script>

<style scoped>
.label {
	font-weight: 600;
}
</style>