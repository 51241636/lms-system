function handleUserLogin(){
    let username=$('#username').val().trim();
    let password=$('#password').val().trim();

    let obj = JSON.stringify({"userName": username, "password": password});
    loginUser(obj)

        .done(function (response) {

            const roles = response.body.userRoleList;

            localStorage.setItem("JWT", response.body.token);
            localStorage.setItem("userId", response.body.userId);
            localStorage.setItem("roles", JSON.stringify(roles));

            // Clear inputs
            $("#username").val("");
            $("#password").val("");

            // Show success message BEFORE redirect
            toastr.success(
                "Login successful",
                "Login Success"
            );

            // Redirect based on role
            if (roles.includes("Admin")) {

                window.location.href = "AdminDashboard.html";

            } else if (roles.includes("Teacher")) {

                window.location.href = "teacher.html";

            } else {
                toastr.warning(
                    "You don't have access to a dashboard",
                    "Access Denied"
                );
            }
        })

        .fail(function (xhr) {

            if (xhr.status === 401 || xhr.status === 404) {

                toastr.error(
                    "Invalid username or password",
                    "Login Failed"
                );

                $("#username").val("");
                $("#password").val("");

            } else if (xhr.status === 500) {

                toastr.error(
                    "Internal server error. Please try again later.",
                    "Server Error"
                );

            } else {

                toastr.error(
                    "Something went wrong.",
                    "Login Failed"
                );
            }
        });
}