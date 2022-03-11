const commonTemp = `
<div class="demo-code {{ code-type }}">
	<div class="demo-code__container">
		<div class="demo-code__content">
			{{ demo-code-type }}
		</div>
		<div class="demo-code__container-back-btn copy">
			<div class="demo-code__container-back-btn-wrapper">
				<h4 class="demo-code__container-back-btn-title">Copy</h4>
				<button type="button" class="demo-code__container-btn-copy">
					<svg fill="#ffffff" height="20" viewBox="0 0 16 16" width="20">
						<path d="M5.75 1a.75.75 0 00-.75.75v3c0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75v-3a.75.75 0 00-.75-.75h-4.5zm.75 3V2.5h3V4h-3zm-2.874-.467a.75.75 0 00-.752-1.298A1.75 1.75 0 002 3.75v9.5c0 .966.784 1.75 1.75 1.75h8.5A1.75 1.75 0 0014 13.25v-9.5a1.75 1.75 0 00-.874-1.515.75.75 0 10-.752 1.298.25.25 0 01.126.217v9.5a.25.25 0 01-.25.25h-8.5a.25.25 0 01-.25-.25v-9.5a.25.25 0 01.126-.217z"></path>
					</svg>
				</button>
			</div>
		</div>
	</div>
</div>
`;


const TEMP_HTML_DEMO = `
<pre>
	<code class="language-html language">
{{ demo-code }}
	</code>
</pre>
`;

const TEMP_CSS_DEMO = `
<pre>
	<code class="language-css language">
{{ demo-code }}
	</code>
</pre>
`;

export const TEMP_JS_DEMO = `
<pre>
	<code class="language-javascript language">
{{ demo-code }}
	</code>
</pre>
`;

export const TEMP_SCSS_DEMO = `
<pre>
	<code class="language-scss language">
{{ demo-code }}
	</code>
</pre>
`;

export const TEMP_BTNS_DEMO = `
<div class="wrapper-demo-code">
	<div class="demo-code code-demo demo-code--classes">
		<div class="demo-code__container">
			<div class="demo-code__container-back-delete">
				<div class="demo-code__container-back-delete-wrapper">
					<button type="button" class="demo-code__container-delete">
						<svg xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" width="18" height="18" viewBox="0 0 24 24">
							<path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"/>
						</svg>
					</button>
					<div class="demo-code__content-item-add-back-title">
						<h4 class="demo-code__content-item-add-title">Clear CSS properties</h4>
					</div>
				</div>
			</div>
			<div class="demo-code__content">

			</div>
		</div>
	</div>
</div>
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

export const TEMP_SCSS = `
	${commonTemp.replace(/{{ demo-code-type }}/, TEMP_SCSS_DEMO)}
`;

export const TEMP_DEMO = `
	${TEMP_BTNS_DEMO}
`;
