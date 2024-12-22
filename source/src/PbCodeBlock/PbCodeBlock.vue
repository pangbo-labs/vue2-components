<template>
	<div class="component pb-doc-block hljs">
		<div ref="slot" v-if="isSlotVisible">
			<slot></slot>
		</div>
		<div>
			<pre style="margin: 0 0 0 0;"><code ref="code" :style="{ 'tab-size': tabSize == 0 ? 'var(--codeBlock-tab-size)' : tabSize }"></code></pre>
		</div>
	</div>
</template>

<script>
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

export default {
	name: "PbCodeBlock",
	props:
	{
		language:	{ type: String, default: "PlainText" },
		tabSize:	{ type: Number, default: 0 },
	},
	data: function()
	{
		return {
			isSlotVisible: true,
		}
	},
	mounted: function()
	{
		// console.log( `PbCode mounted.` );

		// get codes from <pre><textarea>...</textarea></pre>
		//
		// The <pre><textarea>...</textarea></pre> has to be put in the
		// place who referenced this component to prevent Vue from removing
		// the line breaks. :(
		//
		// The <pre> tag is used to keep spaces and line breaks (vue will
		// remove line breaks and collapse continuous spaces).
		//
		// The <textarea> tag is used to prevent HTML tags in the code from
		// being rendered as HTML elements, also it can help to escape the
		// characters so we don't need to do by ourselves.
		//
		// Only the <pre v-pre>...</pre> can also prevent HTML tags in the
		// code from being rendered, but Vue will add someting like data-v-313f071d=""
		// into tags.

		// console.log( this.$refs.slot );

		console.assert(
			(this.$refs.slot.children[0].tagName.toLowerCase() == "pre") &&
			(this.$refs.slot.children[0].children[0].tagName.toLowerCase() == "textarea"),
			"The tag structure should be '<pb-code-block><pre><textarea>...</textarea></pre></pb-code-block>'" );

		// console.log( this.$refs.slot.children[0].innerHTML );
		let content = this.$refs.slot.children[0].innerHTML;

		// remove the <textarea> tags

		content = content.replace( /^\s*<textarea[^>]*>/, "" );
		content = content.replace( /\s*<\/textarea>\s*$/, "" );

		// remove leading spaces of all lines
		// according to the pattern in the first line

		let leadingSpacesPattern = /^(\s*)/;
		let groups = content.match( leadingSpacesPattern );
		let leadingSpaces = groups[0];
		console.log( `leading spaces: '${leadingSpaces}'` );
		content = content.replace( leadingSpaces, "" ); // the first line
		content = content.replaceAll( "\n" + leadingSpaces, "\n" ); // other lines

		// escape characters

		// content = content.replaceAll( "<", "&lt;" );
		// content = content.replaceAll( ">", "&gt;" );
		// content = content.replaceAll( "\n", "<br>" );
		// console.log( `before highlight: '${content}'` );

		content = content.replaceAll( "&lt;", "<" );
		content = content.replaceAll( "&gt;", ">" );

		// this.$refs.code.innerHTML = content;

		let highlightResult;
		try
		{
			highlightResult = hljs.highlight( content, { language: this.language } );
		}
		catch (error)
		{
			highlightResult = hljs.highlightAuto( content );
		}
		// console.log( highlightResult );
		this.$refs.code.innerHTML = highlightResult.value;

		this.isSlotVisible = false;
	}
}
</script>

<style scoped>
.component {
	border: var(--codeBlock-border);
	border-radius: var(--codeBlock-border-radius);
	padding: var(--codeBlock-padding);
	background: var(--codeBlock-background);
	font-size: var(--codeBlock-text-size);
	font-weight: var(--codeBlock-text-weight);
	line-height: var(--codeBlock-line-height);
	overflow: auto;
}

code {
	font-family: var(--codeBlock-font-family);
}
</style>
