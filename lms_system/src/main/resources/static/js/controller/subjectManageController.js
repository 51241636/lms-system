
const subjectManageState={
    subjectId:0,
}
function initsubjectManageRelatedBatch(){
    subjectManageState.subjectId=0;



    loadAllSubject();



    }


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
        subjectManageState.subjectCount=0;
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
            subjectManageState.subjectCount +=1;

        }

        loadCards(response.body.length);

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

function loadCards(length) {

    console.log("loadCards called");
    console.log(length);

    $("#totalSubjectCard").empty();
    $("#totalActiveSubjectCard").empty();
    $("#totalStudentCount").empty();

    $("#totalSubjectCard").append(`
        <div class="stat-top">
            <span class="stat-label">Total Subjects</span>
            <span class="stat-icon">
                ...
            </span>
        </div>

        <div class="stat-value">
            ${length}
        </div>

        <span class="stat-sub">
            Across the commerce stream
        </span>
    `);

    $("#totalActiveSubjectCard").append(`
        <div class="stat-top">
            <span class="stat-label">Active Subjects</span>
        </div>

        <div class="stat-value">
            ${length}
        </div>

        <span class="stat-sub">
            archived
        </span>
    `);

    loadCountOfStudent()
        .done(function(response) {

            console.log("Student count loaded:", response);

            $("#totalStudentCount").append(`
                <div class="stat-top">
                    <span class="stat-label">Students Enrolled</span>
                </div>

                <div class="stat-value">
                    ${response.body}
                </div>

                <span class="stat-sub">
                    Across all subjects
                </span>
            `);

        })
        .fail(function(xhr) {

            console.log("loadCountOfStudent failed:", xhr);

            $("#totalStudentCount").append(`
                <div class="stat-top">
                    <span class="stat-label">Students Enrolled</span>
                </div>

                <div class="stat-value">
                    0
                </div>

                <span class="stat-sub">
                    Unable to load count
                </span>
            `);
        });
}


 function clearBtn(){
    $("#input-subject-id").val("");
    $("#input-subject-name").val("");

}

$(document).on("click", "#open-add-subject", function () {
    $("#subject-modal-overlay").addClass("active");
    $("body").addClass("modal-open");
});

$(document).on("click", "#close-subject-modal, #cancel-subject-modal", function () {
    closeSubjectModal();
});

$(document).on("click", "#subject-modal-overlay", function (e) {
    if (e.target.id === "subject-modal-overlay") {
        closeSubjectModal();
    }
});

function closeSubjectModal() {
    $("#subject-modal-overlay").removeClass("active");
    $("body").removeClass("modal-open");
    $("#save-subject-btn")
        .html(`
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6 9 17l-5-5"/></svg>
            save subject
        `)
        .attr("onclick", "addSubjectBtn()");   // see Bug 3 below
    clearBtn();
}

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


$(document).on("click",".editSubjectBtn",function (){
    subjectManageState.subjectId=0;
    console.log("click")
    subjectManageState.subjectId = $(this).data("id");
    console.log(subjectManageState.subjectId)
    $("#save-subject-btn")
        .html(`
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6 9 17l-5-5"/></svg>
            Update subject
        `)
        .attr("onclick", "updateSubjectBtn()");
    getSubjectById(subjectManageState.subjectId).done(function (response){
        $("#subject-modal-overlay").addClass("active");
        $("body").addClass("modal-open");
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
        closeSubjectModal();
        toastr.success(
            "subject  updated successfully",
            "update successfully"
        );

    }).fail(function (xhr){
        closeSubjectModal();
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

