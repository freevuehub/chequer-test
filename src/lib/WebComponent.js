class Component {
	constructor() {
		this.template = ''
		this.state = {}
	}

	set setTemplate(html) {
		this.template = html
	}
	set setState(state) {
		this.state = state
	}

	get getTemplate() {
		return this.template
	}
	get getState() {
		return this.state
	}

	mounted() {}
	unMounted() {}

	methods() {}
}

export const useComponent = () => new Component()

export const useTemplate = (html) => (component) => {
	component.setTemplate = html

	return component
}

export const useMethods = (methods) => (component) => {
	component.methods = methods

	return component
}

export const useState = (state) => (component) => {
	component.setState = state

	return component
}

export const useMounted = (mounted) => (component) => {
	component.mounted = mounted

	return component
}

export const useUnMounted = (unMounted) => (component) => {
	component.unMounted = unMounted

	return component
}

export const useElement = (tagName) => (component) => {
	class Elements extends HTMLElement {
		template = component.getTemplate
		state = component.getState

		constructor() {
			super()

			this.changeState = this.changeState.bind(this)
		}

		set setState(state) {
			this.state = { ...this.state, ...state }

			this.render()
		}

		changeState(newState) {
			this.setState = newState
		}

		render() {
			this.innerHTML = typeof this.template === 'string'
				? this.template
				: this.template(this.state)

			component.methods(this.state, this.changeState)
		}

		connectedCallback() {
			this.render()

			component.mounted(this.state, this.changeState)
		}
		disconnectedCallback() {
			component.unMounted(this.state, this.changeState)
		}
	}

	window.customElements.define(tagName, Elements)
}

export const useRouter = (route) => route[window.location.pathname]
