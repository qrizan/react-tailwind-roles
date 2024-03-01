import Cookies from "js-cookie";

const checkPermission = (permissions) => {
    let allPermissions = JSON.parse(Cookies.get('permissions'));
    let hasPermission = false;

    permissions.forEach(item => { 
        if(allPermissions[item]) hasPermission = true 
    });

    return hasPermission;
}

export default checkPermission