$(document).ready(function () {


loadAllSubject();



});
let subjectCount=0;
function loadCards(){
    $("#totalSubjectCard").empty();
    $("#totalActiveSubjectCard").empty();
    $("#totalStudentCount").empty();
    $("#totalSubjectCard").append(` <div class="stat-top"><span class="stat-label">Total Subjects</span><span class="stat-icon" style="--tint:#EFE7FE;--tone:#8B5CF6"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2 2 7l10 5 10-5-10-5Z"/><path d="M2 17l10 5 10-5"/></svg></span></div>
                    <div class="stat-value" id="stat-total">${subjectCount}</div>
                    <span class="stat-sub">Across the commerce stream</span>`)
    $("#totalActiveSubjectCard").append(`<div class="stat-top"><span class="stat-label">Active Subjects</span><span class="stat-icon" style="--tint:#DCF3EE;--tone:#16A38A"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg></span></div>
                    <div class="stat-value" id="stat-active">${subjectCount}</div>
                    <span class="stat-sub" id="stat-archived-sub"> archived</span>`)
    loadCountOfStudent().done(function (response){
        $("#totalStudentCount").append(`<div class="stat-top"><span class="stat-label">Students Enrolled</span><span class="stat-icon" style="--tint:#E3EDFE;--tone:#3B82F6"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg></span></div>
                    <div class="stat-value" id="stat-students">${response.body}</div>
                    <span class="stat-sub">Across all subjects</span>`)
    }).fail(function (xhr){
        if (xhr.status === 401 || xhr.status === 404) {

            toastr.error(
                "student not yet",
                "get student count Failed"
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
let editMode=false;
function addSubjectBtn(){

    let subjectName= $("#input-subject-name").val().trim();

    if (!subjectName) {
        alert("Please enter subject name");
        $("#input-subject-name").focus();
        return;
    }



    let subjectData={
        subjectId:0,
        subjectName:subjectName
    }
    addSubject(subjectData).done(function (response){
        console.log("Sucess")
        loadAllSubject();
        clearBtn();
        toastr.success(
            "subject saved successfullt",
            "new subject addedd"
        );
    }).fail(function (xhr){
        clearBtn();
        if (xhr.status === 401 || xhr.status === 404) {

            toastr.error(
                "subject not saved",
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

function loadAllSubject(){


    getAllSubject().done(function(response){
        $("#subject-table-body").empty();
        for (const responseElement of response.body) {
            const subjectId = responseElement.subjectId;
            const subjectName = responseElement.subjectName;

            let data =  `<tr data-id="${subjectId}">
                            <td>
                                <div class="subject-cell">
                                    <div class="subject-icon-box" style="background:#DCF3EE;color:#16A38A;">${subjectName.substring(0,2)}</div>
                                    <div class="subject-cell-info">
                                        <strong>${subjectName}</strong>
                                        <span class="subject-id-tag"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="4" y="4" width="16" height="16" rx="3"/></svg>${subjectId}</span>
                                    </div>
                                </div>
                            </td>
                            <td><span class="pill pill-a">Active</span></td>
                            <td>
                                <div class="row-actions" style="justify-content:flex-end;">
                                    <button type="button" title="Edit subject" aria-label="Edit Economics" class="editSubjectBtn" data-id="${subjectId}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg></button>
                                    <button type="button" class="danger" title="Delete subject" aria-label="Delete Economics" data-id="${subjectId}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg></button>
                                </div>
                            </td>
                        </tr>`

            $("#subject-table-body").append(data);
            subjectCount +=1;

        }
        loadCards();

    }).fail(function (xhr){
        if (xhr.status === 401 || xhr.status === 404) {

            toastr.error(
                "subject not allowed",
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


 function clearBtn(){
    $("#input-subject-id").val("");
    $("#input-subject-name").val("");

}

(function(){
    "use strict";

    /* ---------------------------------------------------------
       Add Subject — click opens the popup
       --------------------------------------------------------- */
    var overlay  = document.getElementById("subject-modal-overlay");
    var openBtn  = document.getElementById("open-add-subject");
    var closeBtn = document.getElementById("close-subject-modal");
    var cancelBtn = document.getElementById("cancel-subject-modal");

    function openModal(){
        overlay.classList.add("active");
        document.body.classList.add("modal-open");
    }
    function closeModal(){
        overlay.classList.remove("active");
        document.body.classList.remove("modal-open");
        $("#save-subject-btn")
            .html(`
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6 9 17l-5-5"/></svg>
            save subject
        `)
        clearBtn();
    }

    openBtn.addEventListener("click", openModal);
    closeBtn.addEventListener("click", closeModal);
    cancelBtn.addEventListener("click", closeModal);
    overlay.addEventListener("click", function(e){
        if(e.target === overlay) closeModal();
    });

})();


$(document).on("click",".danger",function (){
    let deleteSubjectId = $(this).data("id");
    subjectDelete(deleteSubjectId).done(function (response){

        loadAllSubject();
        toastr.success(
            "subject deleted successfully",
            "delete success"
        );

    }).fail(function (xhr){
        if (xhr.status === 401 || xhr.status === 404) {

            toastr.error(
                "subject not deleted",
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
let subjectId;
$(document).on("click",".editSubjectBtn",function (){
    console.log("click")
    subjectId = $(this).data("id");
    console.log(subjectId)
    editMode=true;
    $("#save-subject-btn")
        .html(`
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6 9 17l-5-5"/></svg>
            Update Student
        `)
        .attr("onclick", "updateSubjectBtn()");
    getSubjectById(subjectId).done(function (response){
        $("#subject-modal-overlay").addClass("active");
        document.body.classList.add("modal-open");
        $("#input-subject-id").val(response.body.subjectId);
        $("#input-subject-name").val(response.body.subjectName);

    });

})

function updateSubjectBtn(){
    let subjectId= $("#input-subject-id").val().trim();
    let subjectName = $("#input-subject-name").val().trim();


    if (!subjectId) {
        alert("please find subject first");
        return;
    }

    if (!subjectName) {
        alert("Please enter subjectName");
        $("#input-subject-name").focus();
        return;
    }
    let subjectData={
        subjectId:subjectId,
        subjectName:subjectName
    }
    updateSubject(subjectData).done(function (response){
        console.log("Sucess")
        loadAllSubject();
        clearBtn();
        toastr.success(
            "subject  updated successfully",
            "update successfully"
        );

    }).fail(function (xhr){
        clearBtn();
        if (xhr.status === 401 || xhr.status === 404) {

            toastr.error(
                "subject not updated",
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

