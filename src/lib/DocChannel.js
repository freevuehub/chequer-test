import useQueryParams from "~/lib/useQueryParams";

class DocChannel {
	channel = ''
	broadCast = null
	users = []

	constructor() {
		this.broadCast = new BroadcastChannel(this.channel)
	}

	set setChannel(channel) {
		this.channel = channel
	}
	set setUsers(user) {
		this.users = [...this.users, user]
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

export default new DocChannel()
