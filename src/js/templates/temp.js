const commonTemp = `
<div class="demo-code code-html">
	<div class="demo-code__container">
		<div class="demo-code__content">
			{{ demo-code-type }}
		</div>
	</div>
</div>
`;


const TEMP_HTML_DEMO = `
<pre>
	<code class="language-html">
{{ demo-code }}
	</code>
</pre>
`;

export const TEMP_HTML = `
	${commonTemp.replace(/{{ demo-code-type }}/, TEMP_HTML_DEMO)}
`;
