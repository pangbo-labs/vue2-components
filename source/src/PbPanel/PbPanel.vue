<!--
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.

Repository location: https://github.com/pangbo-labs/vue2-components
-->

<template>
	<div class="component">
		<div class="caption-bar">
			<pb-stack :item-spacing="40">
				<pb-stack-item>
					<div class="caption-text">
						{{ captionId ? $t( captionId ) : caption }}
					</div>
				</pb-stack-item>
			</pb-stack>
		</div>
		<div v-if="showDescription && (description || descriptionId)" class="description">
			{{ descriptionId ? $t( descriptionId ) : description }}
		</div>
		<div style="flex: 1; height: 0;" class="content">
			<slot name="content"></slot>
		</div>
		<div v-if="$slots.footer" class="footer">
			<slot name="footer"></slot>
		</div>
	</div>
</template>

<script>
export default {
	name: "PbPanel",
	props:
	{
		caption:			{ type: String, default: "" },
		captionId:			{ type: String, default: "" },
		description:		{ type: String, default: "" },
		descriptionId:		{ type: String, default: "" },
		showDescription:	{ type: Boolean, default: true },
	},
	data: function()
	{
		return {}
	}
}
</script>

<style scoped>
.component {
	border:			1px solid #ccc;
	border-radius:	5px;
	width:			100%;
	height:			100%;
	display:		flex;
	flex-direction:	column;
}

.caption-bar {
	flex:			0;
	border-bottom:	1px solid #ccc;
	background:		rgba( 0, 0, 0, 0.03 );
	width:			100%;
}

.caption-text {
	padding:		var(--pb-panel-caption-padding);
	font-size:		var(--pb-panel-caption-text-size);
	font-weight:	var(--pb-panel-caption-text-weight);
	line-height:	var(--pb-panel-caption-line-height);
	user-select:	none
}

.description {
	flex:			0;
	border-bottom:	1px solid #ccc;
	padding:		var(--pb-panel-discription-padding);
	font-size:		var(--pb-panel-discription-text-size);
	font-weight:	var(--pb-panel-discription-text-weight);
	line-height:	var(--pb-panel-discription-line-height);
	width:			100%;
	box-sizing:		border-box;
}

.content {
	width:		100%;
	height:		100%;
	box-sizing:	border-box;
	padding:	var(--pb-panel-content-padding);
}

.footer {
	flex:			0;
	border-top:		1px solid #ccc;
	padding:		var(--pb-panel-footer-padding);
	font-size:		var(--pb-panel-footer-text-size);
	font-weight:	var(--pb-panel-footer-text-weight);
	line-height:	var(--pb-panel-footer-line-height);
	width:			100%;
	box-sizing:		border-box;
}
</style>