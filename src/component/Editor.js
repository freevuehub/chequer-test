import { useComponent, useElement, useTemplate, useMethods } from '~/lib/WebComponent'
import pipe from '~/lib/pipe'
import useDom from '~/lib/useDom'

const Editor = pipe(
  useComponent,
  useMethods(function () {
    useDom('#editor').addEventListener('keydown', (event) => {
      if (!event.currentTarget.innerText.trim() && event.code === 'Backspace')
        event.preventDefault()
    })
  }),
  useTemplate(`
    <div id="editor" class="w-full h-full overflow-auto font-mono flex-1" contentEditable="true">
      <div>
        <br />
      </div>
    </div>
  `),
  useElement('freevue-editor'),
)

export default Editor
