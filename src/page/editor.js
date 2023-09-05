import WebComponent from '~/lib/WebComponent'
import dc from '~/lib/DocChannel'
import useQueryParams from '~/lib/useQueryParams'
import '~/component/UserList'
import '~/component/Editor'
import '~/component/CreateForm'

class PageEditor extends WebComponent  {
	state = {
		name: ''
	}

	event() {
		document.querySelector('#form')?.addEventListener('submit', (event) => {
			event.preventDefault()

			const { id }  = useQueryParams(window.location.search)

			const name = event.currentTarget.elements.namedItem('name').value
			const roomId = id || Math.ceil(Math.random() * 1000)

			window.location.href = `${window.location.pathname}?name=${name}&id=${roomId}`
		})
	}
	mounted() {
		const { id, name }  = useQueryParams(window.location.search)

		if (!!id && !!name) {
			dc.setChannel = id

			dc.send({
				type: 'enter',
				message: name,
			})
			dc.receive((data) => {
				console.log(data)
				if (data.type === 'edit') {
					document.querySelector('#editor').innerHTML = data.message
				}
			})

			document.querySelector('#editor')?.addEventListener('keydown', (event) => {
				if (!event.currentTarget.innerText.trim() && event.code === 'Backspace')
					event.preventDefault()
			})
			document.querySelector('#editor')?.addEventListener('keyup', (event) => {
				dc.send({
					type: 'edit',
					message: event.currentTarget.innerHTML
				})
			})
		}
	}

	template() {
		const { id, name }  = useQueryParams(window.location.search)

		return (!!id && !!name)
			? `
				<div class="h-screen w-screen flex items-center justify-center">
					<div class="wrap flex shadow rounded overflow-hidden" slot="foo">
						<custom-editor class="flex-1"></custom-editor>
						<div class="side h-full flex flex-col relative">
							<h2 class="text-xl text-center text-white">참여자 목록</h2>
							<custom-users></custom-users>
							<p id="toast" class="absolute w-full bg-stone-800/[0.7] text-white hidden">
								<span></span>님이 <br>
								입장하였습니다.
							</p>
						</div>
					</div>
				</div>
			` : `
				<div class="h-screen w-screen flex items-center justify-center">
					<custom-form></custom-form>
				</div>
			`
	}
}

window.customElements.define('page-editor', PageEditor)

export default PageEditor