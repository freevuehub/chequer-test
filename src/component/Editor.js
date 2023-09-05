import WebComponent from '~/lib/WebComponent'

class Editor extends WebComponent  {
	template() {
		return `
			<div id="editor" class="w-full h-full overflow-auto font-mono" contentEditable="true">
				<div>
					<br />
				</div>
			</div>
		`
	}
}

window.customElements.define('custom-editor', Editor)

export default Editor