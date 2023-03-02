const get = async (api_url: string) => {
	const response = await fetch(api_url, {
		method: 'GET',
		headers: {
			ContentType: 'application/json',
			Accept: 'application/json',
		},
	});
	const responseJSON = await response.json();
	return responseJSON;
};

const protectedGet = async (api_url: string, token: string) => {
	const response = await fetch(api_url, {
		method: 'GET',
		headers: {
			ContentType: 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${token}`,
		},
	});
	const responseJSON = await response.json();
	return responseJSON;
};

const post = async (api_url: string, body: Object) => {
	const response = await fetch(api_url, {
		method: 'POST',
		headers: {
			ContentType: 'application/json',
			Accept: 'application/json',
		},
		body: JSON.stringify(body),
	});
	const responseJSON = await response.json();
	return responseJSON;
};

const protectedPost = async (api_url: string, body: Object, token: string) => {
	const response = await fetch(api_url, {
		method: 'POST',
		headers: {
			ContentType: 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(body),
	});
	const responseJSON = await response.json();
	return responseJSON;
};

const patch = async (api_url: string, body: Object) => {
	const response = await fetch(api_url, {
		method: 'PATCH',
		headers: {
			ContentType: 'application/json',
			Accept: 'application/json',
		},
		body: JSON.stringify(body),
	});
	const responseJSON = await response.json();
	return responseJSON;
};

const protectedPatch = async (api_url: string, body: Object, token: string) => {
	const response = await fetch(api_url, {
		method: 'PATCH',
		headers: {
			ContentType: 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(body),
	});
	const responseJSON = await response.json();
	return responseJSON;
};

const remove = async (api_url: string, token: string) => {
	const response = await fetch(api_url, {
		method: 'DELETE',
		headers: {
			ContentType: 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${token}`,
		},
	});
	const responseJSON = await response.json();
	return responseJSON;
};

const protectedRemove = async (api_url: string, token: string) => {
	const response = await fetch(api_url, {
		method: 'DELETE',
		headers: {
			ContentType: 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${token}`,
		},
	});
	const responseJSON = await response.json();
	return responseJSON;
};

export const useFetch = {
	get,
	protectedGet,
	post,
	protectedPost,
	patch,
	protectedPatch,
	remove,
	protectedRemove,
};