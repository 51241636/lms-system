$(document).ready(function () {


    loadAllSubject();
    loadAllUser();



});
let activeSubjectCount;
function loadAllSubject(){
    getAllSubject().done(function (response){
        let subjectList=response.body;
        activeSubjectCount=0;
        let select = $("#input-user-subject");
        select.empty();
        select.append(
            `<option value="">Select a subject</option>`
        )
        subjectList.forEach(function (subject) {

            select.append(`
                     
                        <option value="${subject.subjectId}">${subject.subjectName}</option>
                     `);
            activeSubjectCount +=1;
        });
    })
        .fail(function (xhr){

            if (xhr.status === 401 || xhr.status === 404) {

                toastr.error(
                    "cant load subject",
                    "Login Failed"
                );

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


function addUserBtn(){

    let userName = $("#input-user-name").val().trim();
    let email = $("#input-user-email").val().trim();
    let contact = $("#input-user-contact").val().trim();
    let password = $("#input-user-password").val().trim();
    let role = $("#input-user-role").val();
    let subjectId = parseInt($("#input-user-subject").val());
    console.log(subjectId);



    if (!userName) {
        alert("Please enter user name");
        $("#input-user-name").focus();
        return;
    }

    if (!email) {
        alert("Please enter email");
        $("#input-user-email").focus();
        return;
    }

    if (!contact) {
        alert("Please enter contact number");
        $("#input-user-contact").focus();
        return;
    }

    if (!password) {
        alert("Please enter password");
        $("#input-user-password").focus();
        return;
    }

    if (!role) {
        alert("Please select a role");
        $("#input-user-role").focus();
        return;
    }

    if (role === "TEACHER" && !subjectId) {
        alert("Please select a subject for the teacher");
        $("#input-user-subject").focus();
        return;
    }

    let userData = {
        userId:0,
        username: userName,
        email: email,
        contact: contact,
        password: password,
        userRole: role,
        subjetId: subjectId
    }

    addUser(userData).done(function (response){
        console.log("Success");
        // loadAllSubject();
        clearUserBtn();
        loadAllUser();
        toastr.success(
            "user saved successfully",
            "user registered"
        );
    }).fail(function (xhr){
        if (xhr.status === 401 || xhr.status === 404) {
            toastr.error(
                "user not saved",
                "Login Failed"
            );
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



let isEditMode = false;
let currentUserId;

$(document).on("click", ".editBtn", function () {
    currentUserId = $(this).data("id");
    isEditMode = true;

    $("#save-user-btn")
        .html(`
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M20 6 9 17l-5-5"/>
            </svg>
            Update user
        `)
        .attr("onclick", "updateUserBtn()");

    getUserById(currentUserId).done(function (response) {
        let user = response.body;

        $("#user-modal-overlay").addClass("active");
        $("body").addClass("modal-open");

        $("#input-user-id").val(user.userId);
        $("#input-user-name").val(user.username);
        $("#input-user-email").val(user.email);
        $("#input-user-contact").val(user.contact);
        $("#input-user-role").val(user.userRole);
        $("#input-user-subject").val(user.subjetId);


        $("#input-user-id").prop("readonly", true);

    }).fail(function (xhr) {
        if (xhr.status === 401 || xhr.status === 404) {
            toastr.error(
                "user not found",
                "Load Failed"
            );
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
});


function updateUserBtn(){

    let userName = $("#input-user-name").val().trim();
    let email = $("#input-user-email").val().trim();
    let contact = $("#input-user-contact").val().trim();
    let password = $("#input-user-password").val().trim();
    let role = $("#input-user-role").val();
    let subjectId = $("#input-user-subject").val()

    if (!userName) {
        alert("Please enter user name");
        $("#input-user-name").focus();
        return;
    }

    if (!email) {
        alert("Please enter email");
        $("#input-user-email").focus();
        return;
    }

    if (!contact) {
        alert("Please enter contact number");
        $("#input-user-contact").focus();
        return;
    }

    if (!role) {
        alert("Please select a role");
        $("#input-user-role").focus();
        return;
    }

    if (role === "TEACHER" && !subjectId) {
        alert("Please select a subject for the teacher");
        $("#input-user-subject").focus();
        return;
    }

    let userData = {
        userId: currentUserId,
        username: userName,
        email: email,
        contact: contact,
        password: password,
        userRole: role,
        subjetId: subjectId
    }

    updateUser(userData).done(function (response){
        console.log("Success");
        loadAllUser();
        clearUserBtn();
        toastr.success(
            "user updated successfully",
            "update successful"
        );
    }).fail(function (xhr){
        if (xhr.status === 401 || xhr.status === 404) {
            toastr.error(
                "user not updated",
                "update Failed"
            );
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

$(document).on("click", ".danger", function () {
    let deleteUserId = $(this).data("id");
    userDelete(deleteUserId).done(function (response){

        // loadAllBatch();
        loadAllUser();
        toastr.success(
            "user deleted successfully",
            "delete success"
        );

    }).fail(function (xhr){
        if (xhr.status === 401 || xhr.status === 404) {

            toastr.error(
                "user not deleted",
                "delete failed"
            );

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

});
let userCount=0;
function loadAllUser() {
    getAllUser().done(function (response) {
        $("#userTBody").empty();


        for (const responseElement of response.body) {
            let userId=responseElement.userId
            let userName=responseElement.username
            let email=responseElement.email
            let contact=responseElement.contact
            let userRole=responseElement.userRole
            let subjectId=responseElement.subjectId
            let subjectName=responseElement.subjectName
            let  userStatus=responseElement.userStatus


            let data = `  <tr>
                            <td class="cell-person">
                                <span class="person-avatar" style="background:linear-gradient(155deg,#8B5CF6,#5B3FBF)">${userName.substring(0, 2)}</span>
                                <div>
                                    ${userName}
                                    <span class="cell-sub">${email}</span>
                                </div>
                            </td>
                            <td><span class="user-id-chip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="4" y="4" width="16" height="16" rx="3"/></svg>${userId}</span></td>
                            <td><span class="contact-cell"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>${contact}</span></td>
                            <td><span class="role-pill admin"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2l3 6 6 1-4.5 4.5L18 20l-6-3-6 3 1.5-6.5L3 9l6-1z"/></svg>${userRole}</span></td>
                            <td><span class="chip chip-more">${subjectName}</span></td>
                            <td>
                                <div class="row-actions" style="justify-content:flex-end;">
                                   <button type="button" title="Edit batch" aria-label="Edit ${userName}" class="editBtn" data-id="${userId}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg></button>
                                    <button type="button" class="danger" title="Delete batch" aria-label="Delete ${userName}" data-id="${userId}" data-name="${userName}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg></button>
                                </div>
                            </td>
                        </tr>`;

            $("#userTBody").append(data);
            userCount += 1;

        }
        loadCard();
    })
}

$("#searchUser").on("keydown", function (event) {
    if(event.key === "Enter"){
        let searchName = $(this).val().trim();


        if(searchName === ""){
            loadAllUser();
            return;
        }
        searchSavedUser(searchName).done(function (response){
            $("#userTBody").empty();


            for (const responseElement of response.body) {
                console.log("success");
                const userId=responseElement.userId
                const userName=responseElement.username
                const email=responseElement.email
                const contact=responseElement.contact
                const userRole=responseElement.userRole
                const subjectId=responseElement.subjectId
                const subjectName=responseElement.subjectName
                const userStatus=responseElement.userStatus


                let data = `<tr>
                            <td class="cell-person">
                                <span class="person-avatar" style="background:linear-gradient(155deg,#8B5CF6,#5B3FBF)">${userName.substring(0, 2)}</span>
                                <div>
                                    ${userName}
                                    <span class="cell-sub">${email}</span>
                                </div>
                            </td>
                            <td><span class="user-id-chip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="4" y="4" width="16" height="16" rx="3"/></svg>${userId}</span></td>
                            <td><span class="contact-cell"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>${contact}</span></td>
                            <td><span class="role-pill admin"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2l3 6 6 1-4.5 4.5L18 20l-6-3-6 3 1.5-6.5L3 9l6-1z"/></svg>${userRole}</span></td>
                            <td><span class="chip chip-more">${subjectName}</span></td>
                            <td>
                                <div class="row-actions" style="justify-content:flex-end;">
                                    <button type="button" title="Edit user" aria-label="Edit Aarav Kapoor"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg></button>
                                    <button type="button" class="danger" title="Delete user" aria-label="Delete Aarav Kapoor"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg></button>
                                </div>
                            </td>
                        </tr>`;

                $("#userTBody").append(data);
            }

        }).fail(function(xhr){
            loadAllStudents();
            if (xhr.status === 401 || xhr.status === 404) {

                toastr.error(
                    "search user not allowed",
                    "search failed"
                );

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
        })
    }
})

function loadCard(){
    $("#totalUserCardCount").text(userCount);
    $("#teacherCardCount").text(userCount);
    $(".userCountTag").text(userCount);
    $("#subjectCountCard").text(activeSubjectCount);
}
function clearUserBtn(){
    $("#input-user-id").val("");
    $("#input-user-name").val("");
    $("#input-user-email").val("");
    $("#input-user-contact").val("");
    $("#input-user-password").val("");
    $("#input-user-role").val("");
    $("#input-user-subject").val("");
}

(function(){
    "use strict";

    /* ---------------------------------------------------------
       Add User — click opens the popup
       --------------------------------------------------------- */
    var overlay  = document.getElementById("user-modal-overlay");
    var openBtn  = document.getElementById("open-add-user");
    var closeBtn = document.getElementById("close-user-modal");
    var cancelBtn = document.getElementById("cancel-user-modal");

    function openModal(){
        overlay.classList.add("active");
        document.body.classList.add("modal-open");
    }
    function closeModal(){
        overlay.classList.remove("active");
        document.body.classList.remove("modal-open");
        $("#save-user-btn")
            .html(`
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M20 6 9 17l-5-5"/>
            </svg>
            save user
        `)
        clearUserBtn();
    }

    openBtn.addEventListener("click", openModal);
    closeBtn.addEventListener("click", closeModal);
    cancelBtn.addEventListener("click", closeModal);
    overlay.addEventListener("click", function(e){
        if(e.target === overlay) closeModal();
    });

})();
// function closeUserModal(){
//     $("#user-modal-overlay").removeClass("active");
//     $("body").removeClass("modal-open");
//     clearUserBtn();
// }
