import WebComponent from '~/lib/WebComponent'

class CreateForm extends WebComponent  {
	template() {
		return `
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
		`
	}
}

window.customElements.define('custom-form', CreateForm)

export default CreateForm