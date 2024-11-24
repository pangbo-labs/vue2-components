<!--
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.

Repository location: https://github.com/pangbo-labs/vue2-components
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