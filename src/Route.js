import WebComponent from '~/lib/WebComponent'

class Route extends WebComponent  {
	props = ['pathname']

	get pathname() {
		return this.getAttribute('pathname');
	}
	template() {
		return window.location.pathname === this.pathname
			? this.innerHTML
			: ''
	}
}

window.customElements.define('custom-route', Route)

export default Route