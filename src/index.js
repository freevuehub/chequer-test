import '~/style/index.css'
import '~/App'

// 		const $editor = document.querySelector('#editor')
// 		const $toast = document.querySelector('#toast')
// 		const $list = document.querySelector('#list')
// 		const foo = new DocChannel('test')
//
// 		window.onload = () => {
// 			foo.send({
// 				type: 'enter',
// 				message: 'Hello World'
// 			})
// 		}
//
// 		$editor.addEventListener('keydown', (event) => {
// 			if (!event.currentTarget.innerText.trim() && event.code === 'Backspace')
// 				event.preventDefault()
//
// 			foo.send({
// 				type: 'edit',
// 				message: event.currentTarget.innerHTML
// 			})
// 		})
//
// 		foo.receive((value) => {
// 			if (value.type === 'edit') {
// 				$editor.innerHTML = value.message
// 			}
//
// 			if (value.type === 'enter') {
// 				$toast.querySelector('span').innerText = value.message
// 				$toast.classList.remove('hidden')
// 				$list.innerHTML = `${$list.innerHTML}<li>${value.message}</li>`
//
// 				setTimeout(() => {
// 					$toast.classList.add('hidden')
// 				}, 2000)
//
// 				foo.send({
// 					type: 'edit',
// 					message: $editor.innerHTML
// 				})
// 			}
// 		})
// 	}
// }