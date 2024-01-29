const dev = {
  API_ENDPOINT_URL: 'https://itticket.crustycodes.com/backend/api'
};

const prod = {
  API_ENDPOINT_URL: 'https://itticket.crustycodes.com/backend/api'
};

const test = {
  API_ENDPOINT_URL: 'https://itticket.crustycodes.com/backend/api'
};

const getEnv = () => {
	switch (process.env.NODE_ENV) {
		case 'development':
			return dev
		case 'production':
			return prod
		case 'test':
			return test
		default:
			break;
	}
}

export const env = getEnv()
