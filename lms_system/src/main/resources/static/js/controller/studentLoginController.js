document.getElementById('toggle-pw').addEventListener('click', () => {
        const pw = document.getElementById('password');
        pw.type = pw.type === 'password' ? 'text' : 'password';
    });


function handleUserLogin(){
    let username=$('#username').val().trim();
    let password=$('#password').val().trim();

    let obj = JSON.stringify({"studentUsername": username, "studentPassword": password});

    studentLogin(obj)
        .done(function (response){
            localStorage.setItem('JWT',response.body.token);
            localStorage.setItem("studentId",response.body.studentId);
            localStorage.setItem("roles", "Student");
            window.location.href = "student.html";
            $('#username').val("");
            $('#password').val("");
    }).fail(function (error){
        if(response.status == 404){
            toastr.error("Invalid username or password", "Login Failed");
            $('#username').val("");
            $('#password').val("");
        }else{
            toastr.error(" 500 Internal server error", "Login Failed");
        }
    });
}