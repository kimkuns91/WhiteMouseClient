export default function authHeader() {
    const Tokens = JSON.parse(localStorage.getItem('Tokens'));
    if (Tokens) {
        return {     
            "refresh": Tokens.refreshToken,
            'x-access-token': Tokens.accessToken 
        };
    } else {
        return {};
    }
}