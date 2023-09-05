import WebComponent from '~/lib/WebComponent'
import useQueryParams from "~/lib/useQueryParams";
import dc from "~/lib/DocChannel";

class UserList extends WebComponent  {
	state = {
		list: []
	}
	mounted() {
		const { id, name }  = useQueryParams(window.location.search)

		dc.receive((data) => {
			if (data.type === 'enter') {
				this.setState = {
					list: [
						...new Set([
							...this.state.list,
							data.message]).values()
					]
				}
			}
		})
	}

	template() {
		const { name }  = useQueryParams(window.location.search)

		return `
			<ul class="user-list overflow-auto text-white flex flex-col">
				<li>${name} (나)</li>
				${this.state.list.map((user) => `<li>${user}</li>`).join('')}
			</ul>
		`
	}
}

window.customElements.define('custom-users', UserList)

export default UserList