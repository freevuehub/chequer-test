import { useComponent, useElement, useTemplate } from '~/lib/WebComponent'
import pipe from '~/lib/pipe'

const UserForm = pipe(
  useComponent,
  useTemplate(`
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
  useElement('freevue-user'),
)

export default UserForm
