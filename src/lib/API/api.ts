import { GlobalApiCall } from './GlobalApiCall';

const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL;

export async function loginApi(data: { email: string; password: string }) {
	const response = await GlobalApiCall({
		url: `${API_BASE_URL}/auth/login`,
		options: {
			method: 'Post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		}
	});

	return response.json();
}

export const registerApi = async (data: {
	email: string;
	name: string;
	password: string;
	passwordConfirm: string;
}) => {
	const response = await GlobalApiCall({
		url: `${API_BASE_URL}/auth/register`,
		options: {
			method: 'Post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		}
	});

	return response.json();
};

export const dataMeApi = async (data: { cookies: string }) => {
	const response = await GlobalApiCall({
		url: `${API_BASE_URL}/users/me`,
		options: {
			method: 'Get',
			headers: {
				cookie: `token=${data.cookies}`
			}
		}
	});

	return response.json();
};


export const UpdatedUserNameAPI = async ({ cookie, name }: { cookie: string; name: string }) => {
	const response = await GlobalApiCall({
		url: `${API_BASE_URL}/users/name`,
		options: {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				cookie: `token=${cookie}`
			},
			body: JSON.stringify({ name })
		}
	});

	return response.json();
};

export const UpdatedUserPasswordAPI = async ({
	cookie,
	new_password,
	new_password_confirm,
	old_password
}: {
	cookie: string;
	new_password: string;
	new_password_confirm: string;
	old_password: string;
}) => {
	const response = await GlobalApiCall({
		url: `${API_BASE_URL}/users/password`,
		options: {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				cookie: `token=${cookie}`
			},
			body: JSON.stringify({ new_password, new_password_confirm, old_password })
		}
	});

	return response.json();
};

export const DatabaseConfigutationApI = async ({
	cookie,
	host,
	username,
	password,
	database,
	port
}: {
	cookie: string;
	host: string;
	username: string;
	password: string;
	database: string;
	port: number;
}) => {
	const response = await GlobalApiCall({
		url: `${API_BASE_URL}/setting/database`,
		options: {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				cookie: `token=${cookie}`
			},
			body: JSON.stringify({ host, username, password, database, port })
		}
	});

	return response.json();
};

export const encryptionMethodApi = async ({
	cookie,
	encryption_method
}: {
	cookie: String;
	encryption_method: String;
}) => {
	const response = await GlobalApiCall({
		url: `${API_BASE_URL}/setting/encryption_method`,
		options: {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				cookie: `token=${cookie}`
			},
			body: JSON.stringify({ encryption_method })
		}
	});

	return response.json();
};

export const getSecretsApi = async ({
	cookie,
	page,
	limit
}: {
	cookie: string;
	page: number;
	limit: number;
}) => {
	const response = await GlobalApiCall({
		url: `${API_BASE_URL}/secrets/get?page=${page}&limit=${limit}`,
		options: {
			method: 'get',
			headers: {
				'Content-Type': 'application/json',
				cookie: `token=${cookie}`
			}
		}
	});

	return response.json();
};

export const getSecretsVersionApi = async ({
	cookie,
	page,
	limit,
	id
}: {
	cookie: string;
	page: number;
	limit: number;
	id: string;
}) => {
	const response = await GlobalApiCall({
		url: `${API_BASE_URL}/secrets_version/get?id=${id}&page=${page}&limit=${limit}`,
		options: {
			method: 'get',
			headers: {
				'Content-Type': 'application/json',
				cookie: `token=${cookie}`
			}
		}
	});

	return response.json();
};

export const saveSecretsApi = async ({
	cookie,
	data
}: {
	cookie: string;
	data: {
		secret_name: string;
		secret_value: string;
	}[]
}) => {
	const response = await GlobalApiCall({
		url: `${API_BASE_URL}/secrets/save`,
		options: {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				cookie: `token=${cookie}`
			},
			body: JSON.stringify(data)
		}
	});

	return response.json();
};

export const updateSecretsApi = async ({
	cookie,
	secret_name,
	secret_value,
	id
}: {
	cookie: string;
	secret_name: string;
	secret_value: string;
	id: string;
}) => {
	const response = await GlobalApiCall({
		url: `${API_BASE_URL}/secrets/update`,
		options: {
			method: 'put',
			headers: {
				'Content-Type': 'application/json',
				cookie: `token=${cookie}`
			},
			body: JSON.stringify({ secret_name, secret_value, id })
		}
	});

	return response.json();
};
