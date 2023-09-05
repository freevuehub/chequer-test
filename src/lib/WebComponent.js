class WebComponent extends HTMLElement  {
	constructor() {
		super()

		this.props = []
		this.state = {}
	}
	connectedCallback() {
		this.created()
		this.render()
		this.mounted()
	}
	disconnectedCallback() {}
	attributeChangedCallback() {
		this.render()

		this.updated()
	}
	static get observedAttributes() {
		return this.props
	}

	set setState(value) {
		this.state = { ...this.state, ...value }

		this.render()
	}
	render() {
		this.innerHTML = this.template()
		this.event()
	}

	event() {}

	created() {}
	mounted() {}
	updated() {}
	template() {
		return ``
	}
}

export default WebComponent