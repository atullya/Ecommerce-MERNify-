

export const storeTokens = (tokens: any) => {
    localStorage.setItem("accessToken", tokens);
    
}

export const getTokenFromLocalStorage = () => {
    return localStorage.getItem("accessToken");
}

export const storeId=(id:any)=>{
    localStorage.setItem("userId",id);
}