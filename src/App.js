import WebComponent from '~/lib/WebComponent'
import '~/Route'
import '~/page/index.js'
import '~/page/editor.js'

class App extends WebComponent  {
	template() {
		return `
			<div class="h-screen w-screen">
				<custom-route pathname="/">
					<page-index></page-index>
				</custom-route>
				<custom-route pathname="/editor">
					<page-editor></page-editor>
				</custom-route>
			</div>
		`
	}
}

window.customElements.define('custom-app', App)

export default App