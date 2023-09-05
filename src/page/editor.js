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

const PageEditor = pipe(
	useComponent,
	useState({ name: '', dc: null, users: [] }),
	useMounted((state, setState) => {
		const { id } = useQueryParams(window.location.search)
		const dc = new DocChannel(id)

		setState({ dc })
	}),
	useMethods((state, setState) => {
		if (!state.name) {
			useDom('#form').addEventListener('submit', (event) => {
				event.preventDefault()

				const { value } = event.currentTarget.elements.namedItem('name')

				if (!value) return alert('이름을 입력해주세요.')

				setState({ name: value })

				state.dc.send({ type: 'enter', message: value })
			})
		} else {
			const editor = useDom('#editor')

			editor.addEventListener('keydown', (event) => {
				if (!event.currentTarget.innerText.trim() && event.code === 'Backspace')
					event.preventDefault()
			})
			editor.addEventListener('keyup', (event) => {
				state.dc.send({
					type: 'edit',
					message: event.currentTarget.innerHTML
				})
			})

			state.dc.receive((data) => {
				if (data.type === 'enter') {
					setState({ users: [...state.users, data.message] })

					// state.dc.send({
					// 	type: 'sync',
					// 	message: {
					// 		users: [state.name, ...state.users],
					// 		doc: editor.innerHTML
					// 	}
					// })
				}
				if (data.type === 'exit') {
					const hashUsers = new Set(state.users)

					hashUsers.delete(data.message)

					setState({ users: [...hashUsers.values()] })
				}
				if (data.type === 'sync') {
					setState({ users: data.message.users })

					editor.innerHTML = data.message.doc
				}
				if (data.type === 'edit') {
					editor.innerHTML = data.message
				}
			})
		}
	}),
	useTemplate((state) => state.name ? `
		<div class="h-screen w-screen flex items-center justify-center">
			<div class="wrap flex shadow rounded overflow-hidden">
				<div id="editor" class="w-full h-full overflow-auto font-mono flex-1" contentEditable="true">
					<div>
						<br />
					</div>
				</div>
				<div class="side h-full flex flex-col relative">
					<h2 class="text-xl text-center text-white">참여자 목록</h2>
					<ul class="user-list overflow-auto text-white flex flex-col">
						<li>${state.name} (나)</li>
						${state.users.map((user) => `<li>${user}</li>`)}
					</ul>
				</div>
			</div>
		</div>
	` : `
		<div class="h-screen w-screen flex items-center justify-center">
			<form id="form" class="shadow rounded overflow-hidden">
				<h1 class="text-xl text-center text-white">닉네임 설정</h1>
				<div class="inner flex flex-col">
					<label class="block w-full">
						<input type="text" class="block w-full" name="name">
					</label>
					<button type="submit" class="w-full text-white rounded pointer">
						입장
					</button>
				</div>
			</form>
		</div>
	`),
	useElement('freevue-editor'),
	useUnMounted((state) => {
		state.dc.send({
			type: 'exit',
			message: state.name
		})

		state.dc.close()
	}),
)

export default PageEditor
