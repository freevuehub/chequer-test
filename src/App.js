import { useComponent, useElement, useTemplate, useRouter } from '~/lib/WebComponent'
import pipe from '~/lib/pipe'

import '~/page/index.js'
import '~/page/editor.js'

const App = pipe(
	useComponent,
	useTemplate(`
		<div class="h-screen w-screen">
			${useRouter({
				'/': `<freevue-page-index></freevue-page-index>`,
				'/editor': `<freevue-page-editor></freevue-page-editor>`,
			})}
		</div>
	`),
	useElement('freevue-app')
)

export default App
