document.getElementById('toggle-pw').addEventListener('click', () => {
        const pw = document.getElementById('password');
        pw.type = pw.type === 'password' ? 'text' : 'password';
    });


function handleUserLogin(){
    let username=$('#username').val().trim();
    let password=$('#password').val().trim();

    let obj = JSON.stringify({"studentUsername": username, "studentPassword": password});

    $.ajax({
        url:"http://localhost:8080/v1/student/loginStudent",
        type:'POST',
        contentType:'application/json',
        data:obj,
        success:function (response){
            localStorage.setItem('JWT',response.body.token);
            localStorage.setItem("userId",response.body.studentId);
            localStorage.setItem("roles", "Student");
            window.location.href = "student.html";
            $('#username').val("");
            $('#password').val("");
        },
        error:function (response){
            if(response.status == 404){
                toastr.error("Invalid username or password", "Login Failed");
                $('#username').val("");
                $('#password').val("");
            }else{
                toastr.error(" 500 Internal server error", "Login Failed");
            }
        }
    })
}