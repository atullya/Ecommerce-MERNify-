

export const storeTokens = (tokens: any) => {
    localStorage.setItem("accessToken", tokens);
    
}

export const getTokenFromLocalStorage = () => {
    return localStorage.getItem("accessToken");
}