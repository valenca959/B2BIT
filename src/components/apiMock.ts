interface LoginResponse {
    access_token: string;
    refresh_token: string;
}

const SUCCESS_RESPONSE: LoginResponse = {
    access_token: 'FAKE_JWT_TOKEN_1234567890_B2BIT',
    refresh_token: 'FAKE_REFRESH_TOKEN_987654321',
};

const PROFILE_RESPONSE = {
    id: 1,
    name: 'Cliente YouDrive',
    email: 'cliente@youdrive.com',
    profile_picture_url: 'https://i.pravatar.cc/150?img=1', 
    role: 'user',
};

const MOCK_DELAY = 1000; 


export async function mockLogin(email: string, password: string): Promise<LoginResponse> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (email === "cliente@youdrive.com" && password === "password") {
                resolve(SUCCESS_RESPONSE);
            } else {
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

export async function mockGetProfile(): Promise<typeof PROFILE_RESPONSE> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(PROFILE_RESPONSE);
        }, MOCK_DELAY);
    });
}