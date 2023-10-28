import { ENV } from "../util/constants";

async function register(email, username, password) {
    try {
        const url = `${ENV.API_URL}${ENV.ENDPOINTS.RESGISTER}`;
        const params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, username, password })
        }
        const response = await fetch(url, params);
         if (response.status !== 200) throw response
         return response.json();
    } catch (error) {
        throw error;1
    }
}

async function login(identifier, password) {
    try {
        const url = `${ENV.API_URL}${ENV.ENDPOINTS.LOGIN}`;
        const params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ identifier, password })
        }
        const response = await fetch(url, params);

        // Verifica si la respuesta no es exitosa y lanza un error
        if (response.status !== 200) throw response;

        // Aqui se obtiene los datos de respuesta en formato JSON
        const responseData = await response.json();

        // Aqui ya se obtienen los  detalles del usuario autenticado
        const meResponse = await userController.getMe(responseData.token);
        console.log('Detalles de usuario:', meResponse);

        return responseData;
    } catch (error) {
        throw error;
    }
}

export const authApi = {
    register,
    login
};