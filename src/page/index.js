import { useComponent, useElement, useTemplate, useMethods } from '~/lib/WebComponent'
import pipe from '~/lib/pipe'

const PageIndex = pipe(
	useComponent,
	useMethods(() => {
		document.querySelector('#create-button').addEventListener('click', (event) => {
			event.preventDefault()

			window.location.href = `/editor?id=${Math.ceil(Math.random() * 1000)}`
		})
	}),
	useTemplate(`
		<div class="h-screen w-screen flex items-center justify-center">
			<button id="create-button" class="text-center text-white text-xl rounded">
				방 만들기
			</button>
		</div>
	`),
	useElement('freevue-page-index')
)

export default PageIndex
