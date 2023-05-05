exports.findRoleUser = (ROLE_YOU_WANT, query_user_role) => {
    let rolesArray = transformStringToArray(query_user_role);
    let response = false;
    rolesArray.forEach((role) => {
        if(role === ROLE_YOU_WANT) {
            response = true;
        }
    })
    return response;
}


function transformStringToArray(query_user_role) {
    let replaceAllQuotes = query_user_role.replaceAll('"','');
    let removeAllArrayString = replaceAllQuotes.slice(1,-1);
    let deleteAllSpace = removeAllArrayString.replaceAll(' ','');
    return deleteAllSpace.split(",");
}