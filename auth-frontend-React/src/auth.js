import API from "./api";


export async function refreshAccessToken() {
    try{
        const res = await API.post('authentication/token/refresh/')
        const access  = res.data.access;
        localStorage.setItem('access',access)
        return access
    }
    catch(error){
        localStorage.removeItem('access')
        throw error
    }
}

export async function logout(){
    try{
        await API.post('authentication/logout/',{})
    }catch(error){

    }finally{
        localStorage.removeItem('access');
        window.location.href = '/login';
    }
}