export class UseFetchHook {
	get = async (api_url: string) => {
		const response = await fetch(api_url, {
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			method: 'GET',
		});

        return await response.json();
	};

	post = async (api_url: string, body?: Object) => {
        const response = await fetch(api_url, {
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			method: 'POST',
            body: JSON.stringify(body!)
		});

        return await response.json();
    };

	patch = async (api_url: string, body: Object) => {
        const response = await fetch(api_url, {
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			method: 'PATCH',
            body: JSON.stringify(body)
		});

        return await response.json();
    };

	delete = async (api_url: string) => {
        const response = await fetch(api_url, {
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			method: 'DELETE'
		});

        return await response.json();
    };
}