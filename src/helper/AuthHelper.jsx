const setToken = (authorization) => {
    localStorage.setItem("authorization", authorization);
}

const getToken = () => {
    return localStorage.getItem("authorization");
}

const setRole = (role) => {
    localStorage.setItem("role", role);
}

const getRole = () => {
    return localStorage.getItem("role");
}

export { setToken, getToken, setRole, getRole };