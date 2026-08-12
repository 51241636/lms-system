function loginUser(obj){
    return $.ajax({
        url: "http://localhost:8080/v1/user/loginUser",
        type: 'POST',
        contentType: 'application/json',
        data: obj
    });
}