const useQueryParams = (query) => {
	return Object.fromEntries(
		query
			.replace('?', '')
			.split('&')
			.map((item) => item.split('='))
	)
}

export default useQueryParams