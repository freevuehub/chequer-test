import WebComponent from '~/lib/WebComponent'

class PageIndex extends WebComponent  {
	template() {
		return `
			<div class="h-screen w-screen flex items-center justify-center">
				<a id="create-button" class="text-center text-white text-xl rounded" href="/editor">
					방 만들기
				</a>
			</div>
		`
	}
}

window.customElements.define('page-index', PageIndex)

export default PageIndex