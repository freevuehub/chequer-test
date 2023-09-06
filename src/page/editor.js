import {
	useComponent,
	useElement,
	useTemplate,
	useState,
	useMethods,
	useMounted,
	useUnMounted,
} from '~/lib/WebComponent'
import pipe from '~/lib/pipe'
import useDom from '~/lib/useDom'
import useQueryParams from '~/lib/useQueryParams'
import DocChannel from '~/lib/DocChannel'

import '~/component/UserForm'
import '~/component/Editor'

const PageEditor = pipe(
	useComponent,
	useState({ name: '', dc: null, users: [] }),
	useMounted(function () {
		const { id } = useQueryParams(window.location.search)
		const dc = new DocChannel(id)

		this.setState = { dc }
	}),
	useUnMounted(function () {
		this.state.dc.send({
			type: 'exit',
			message: this.state.name
		})

		this.state.dc.close()
	}),
	useMethods(function () {
		if (!this.state.name) {
			useDom('#form').addEventListener('submit', (event) => {
				event.preventDefault()

				const { value } = event.currentTarget.elements.namedItem('name')

				if (!value) return alert('이름을 입력해주세요.')

				this.setState = { name: value }

				this.state.dc.send({ type: 'enter', message: value })
			})
		} else {
			const editor = useDom('#editor')

			editor.addEventListener('keyup', (event) => {
				this.state.dc.send({
					type: 'edit',
					message: event.currentTarget.innerHTML
				})
			})

			this.state.dc.receive((data) => {
				if (data.type === 'enter') {
					this.setState = { users: [...this.state.users, data.message] }

					this.state.dc.send({
						type: 'sync',
						users: this.state.users,
						doc: editor.innerHTML
					})

					useDom('#toast').innerHTML = `"${data.message}" 입장`
					useDom('#toast').classList.remove('hidden')

					setTimeout(() => {
						useDom('#toast').classList.add('hidden')
					}, 3000)
				}
				if (data.type === 'exit') {
					const hashUsers = new Set(this.state.users)

					hashUsers.delete(data.message)

					console.log(data.message)

					this.setState = { users: [...hashUsers.values()] }
				}
				if (data.type === 'sync') {
					this.setState = { users: data.users }

					editor.innerHTML = data.doc
				}
				if (data.type === 'edit') {
					editor.innerHTML = data.message
				}
			})
		}
	}),
	useTemplate(function () {
		return this.state.name ? `
			<div class="h-screen w-screen flex items-center justify-center">
				<div class="wrap flex shadow rounded overflow-hidden">
					<freevue-editor class="flex-1"></freevue-editor>
					<div class="side h-full flex flex-col relative">
						<h2 class="text-xl text-center text-white">참여자 목록</h2>
						<ul class="user-list overflow-auto text-white flex flex-col">
							<li>${this.state.name} (나)</li>
							${this.state.users.map((user) => `<li>${user}</li>`).join('')}
						</ul>
						<div class="absolute left-0 bottom-0 w-full hidden text-white" id="toast"></div>
					</div>
				</div>
			</div>
		` : `<freevue-user></freevue-user>`
	}),
	useElement('freevue-page-editor'),
)

export default PageEditor
