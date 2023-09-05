class DocChannel {
	constructor(props) {
		this.broadCast = new BroadcastChannel(props)
	}

	send(args) {
		this.broadCast.postMessage(JSON.stringify(args))
	}
	receive(callback) {
		this.broadCast.onmessage = (event) => {
			if (event.origin !== window.location.origin)
				return

			callback(JSON.parse(event.data))
		}
	}
	close() {
		this.broadCast.close()
	}
}

export default DocChannel
