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

			this.mounted = component.mounted
			this.unMounted = component.unMounted
			this.methods = component.methods
		}

		set setState(state) {
			this.state = { ...this.state, ...state }

			this.render()
		}

		render() {
			this.innerHTML = typeof this.template === 'string'
				? this.template
				: this.template()

			this.methods()
		}

		connectedCallback() {
			this.render()

			this.mounted()
		}
		disconnectedCallback() {
			this.unMounted()
		}
	}

	window.customElements.define(tagName, Elements)
}

export const useRouter = (route) => route[window.location.pathname]
