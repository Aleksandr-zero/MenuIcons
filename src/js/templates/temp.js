const commonTemp = `
<div class="demo-code {{ code-type }}">
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

const TEMP_CSS_DEMO = `
<pre>
	<code class="language-css">
{{ demo-code }}
	</code>
</pre>
`;

export const TEMP_JS_DEMO = `
<pre>
	<code class="language-javascript">
{{ demo-code }}
	</code>
</pre>
`;

export const TEMP_BTNS_DEMO = `

`;


export const TEMP_HTML = `
	${commonTemp.replace(/{{ demo-code-type }}/, TEMP_HTML_DEMO)}
`;

export const TEMP_CSS = `
	${commonTemp.replace(/{{ demo-code-type }}/, TEMP_CSS_DEMO)}
`;

export const TEMP_JS = `
	${commonTemp.replace(/{{ demo-code-type }}/, TEMP_JS_DEMO)}
`;

export const TEMP_DEMO = `
	${commonTemp.replace(/{{ demo-code-type }}/, TEMP_BTNS_DEMO)}
`;
