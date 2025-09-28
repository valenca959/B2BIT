// src/services/apiMock.ts

// Simula o tipo de resposta de login
interface LoginResponse {
    access_token: string;
    refresh_token: string;
}

// Simula a resposta de sucesso do Login
const SUCCESS_RESPONSE: LoginResponse = {
    access_token: 'FAKE_JWT_TOKEN_1234567890_B2BIT',
    refresh_token: 'FAKE_REFRESH_TOKEN_987654321',
};

// Simula a resposta de sucesso do Perfil
const PROFILE_RESPONSE = {
    id: 1,
    name: 'Cliente YouDrive',
    email: 'cliente@youdrive.com',
    profile_picture_url: 'https://i.pravatar.cc/150?img=1', // Usamos um avatar aleatório
    role: 'user',
};

// Tempo de simulação de delay da rede (para testar loading)
const MOCK_DELAY = 1000; 

/**
 * Simula a chamada POST /auth/login/
 */
export async function mockLogin(email: string, password: string): Promise<LoginResponse> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Verifica se o usuário usou a credencial de teste correta
            if (email === "cliente@youdrive.com" && password === "password") {
                resolve(SUCCESS_RESPONSE);
            } else {
                // Simula erro 400 Bad Request
                reject({
                    response: {
                        status: 400,
                        data: { detail: "Invalid credentials or unsupported version." }
                    }
                });
            }
        }, MOCK_DELAY);
    });
}

/**
 * Simula a chamada GET /auth/profile/
 */
export async function mockGetProfile(): Promise<typeof PROFILE_RESPONSE> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(PROFILE_RESPONSE);
        }, MOCK_DELAY);
    });
}