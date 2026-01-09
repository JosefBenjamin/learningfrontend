const API_BASE_URL = "https://api.learn.datamatiker.dev/api/learn_v1";

const REGISTER_PATH = API_BASE_URL + "/auth/register";
const LOGIN_PATH = API_BASE_URL + "/auth/login";
const RESOURCES_PATH = API_BASE_URL + "/resources";
const RESOURCES_NEW_PATH = API_BASE_URL + "/resources/newest";
const RESOURCES_UPDATED_PATH = API_BASE_URL + "/resources/updated";


// <---- UTILITY FUNCTIONS ---->
const setToken = (token) => {
    localStorage.setItem("jwtToken", token);
}

const getToken= () => {
    return localStorage.getItem("jwtToken");
}

const logout = () => {
    localStorage.removeItem("jwtToken");
}

const isLoggedIn = () => {
    return getToken() !== null;
}

// HTTP VERB (GET, POST, DELETE, PUT), boolean addToken, body is to send 
const makeOptions = (httpVerb, addToken, body) => {
    const options = {
        method: httpVerb,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        }
    };

    if(addToken && isLoggedIn()){
        options.headers["Authorization"] = 'Bearer ' + getToken();
    }
    if(body){
        //Serialize body to JSON string
        options.body = JSON.stringify(body);
    }
    return options;
}

const handleHttpErrors = async (response) => {
    if(!response.ok){
        const fullErrorData = await response.json();
        throw {status: response.status, fullErrorData};
    }
    return response.json();
}


// <---- API CALLS NO AUTH/LOGIN REQUIRED ---->
const register = async (username, screenName, githubProfile, password) => {
    const payload = {
        username, 
        screenName,
        githubProfile,
        password
    };
    const options = makeOptions("POST", false, payload);
    const response = await fetch(REGISTER_PATH, options);
    const data = await handleHttpErrors(response);
    setToken(data.token);
    return data;

}

const login = async (username, password) => {
    const payload = {
        username, 
        password
    };
    const options = makeOptions("POST", false, payload);
    const response = await fetch(LOGIN_PATH, options);
    const data = await handleHttpErrors(response);
    setToken(data.token);
    return data;
}

const feed = async (page = 0, size) => {
    const options = makeOptions("GET", false, null);
    // pagination
    const response = await fetch(API_BASE_URL +
         "/resources?page=" + page + "&size=" + size,
         options);
    return handleHttpErrors(response);
}

const createResource = async (resourceData) => {
    const options = makeOptions("POST", true, resourceData);
    const response = await fetch(RESOURCES_PATH, options);
    return handleHttpErrors(response);
}

const newestFeed = async (page = 0, size) => {
    const options = makeOptions("GET", false, null);
    const response = await fetch(RESOURCES_NEW_PATH +
         "?page=" + page + "&size=" + size, options);
    return handleHttpErrors(response);
}

const updatedFeed = async (page = 0, size) => {
    const options = makeOptions("GET", false, null);
    const response = await fetch(RESOURCES_UPDATED_PATH +
         "?page=" + page + "&size=" + size, options);
    return handleHttpErrors(response);
}

const apiFacade = {
    login,
    register,
    logout,
    isLoggedIn,
    getToken,
    feed,
    createResource,
    newestFeed,
    updatedFeed
};

export default apiFacade;