function getAllSubject(){
    return $.ajax({
        url: "http://localhost:8080/v1/subject",
        type: "GET",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("JWT")
        }
    });
}
function getUserById(currentUserId){
    return $.ajax({
        url: "http://localhost:8080/v1/user/getUserDetail/" + currentUserId,
        type: "GET",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("JWT")
        }
    });
}
function getAllUser(){
    return $.ajax({
        url: "http://localhost:8080/v1/user",
        type: "GET",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("JWT")
        }
    });
}
function searchSavedUser(searchName){
    return  $.ajax({
        url: "http://localhost:8080/v1/user/filterUser",
        type: "GET",

        headers: {
            "Authorization": "Bearer " + localStorage.getItem("JWT")
        },

        data: {
            studentName: searchName,
            studentAddress:searchName,
            batchName:searchName,
            contact:searchName,
        }
    });
}


function   addUser(userData){
    return $.ajax({
        url: "http://localhost:8080/v1/user/registerUser",
        type: "POST",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("JWT")
        },
        data:JSON.stringify(userData),
        contentType:'application/json'
    });
}

function updateUser(userData){
    return $.ajax({
        url: "http://localhost:8080/v1/user",
        type: "PUT",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("JWT")
        },
        data:JSON.stringify(userData),
        contentType:'application/json'
    });
}

function userDelete(deleteUserId){
    return $.ajax({
        url: "http://localhost:8080/v1/user/" + deleteUserId,
        type: "DELETE",
        contentType: 'application/json',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('JWT')
        }
    });
}