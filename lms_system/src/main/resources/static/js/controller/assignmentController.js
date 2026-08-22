const assignmentState ={
     lessonId:0,
    lessonName:"",
    lessonNumber:0,
    assignmentId:0,
    subjectClassId:0,
    batchName:"",
}

$(document).ready(function () {
    const role=localStorage.getItem("roles");


    if (role === "Student") {
        $('.add-assignment-bar').hide();

    }
    urlParams= new URLSearchParams(window.location.search);
    assignmentState.lessonId = Number(urlParams.get("lessonId"));
    assignmentState.lessonName = urlParams.get("lessonName");
    assignmentState.lessonNumber = urlParams.get("lessonNumber");
    assignmentState.subjectClassId = urlParams.get("subjectClassId");
    assignmentState.batchName = urlParams.get("batchName");



    if (assignmentState.lessonId > 0) {
        loadLessonAssignment();
    }





});

function openAddAssignmentModal() {
    $("#assignment-modal-overlay").addClass("active");
    $("body").addClass("modal-open");

    $("#save-assignment-btn")
        .html(`
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M20 6 9 17l-5-5"/>
            </svg>
            add assignment
        `)
        .attr("onclick", "saveAssignmentBtn()");
}


// Closes the "Add assignment" popup and resets its fields
function closeAddAssignmentModal() {
    $("#assignment-modal-overlay").removeClass("active");
    $("body").removeClass("modal-open");

    $("#input-assignment-title").val("");
    $("#input-assignment-description").val("");
    $("#input-assignment-due-date").val("");
    $("#input-assignment-marks").val("");
    $("#input-assignment-file").val("");

    $("#assignment-dropzone").removeClass("has-file");
    $("#assignment-dropzone strong").text("Click to upload, or drag and drop");
}


// Close when clicking the dark overlay outside the modal
$("#assignment-modal-overlay").on("click", function (e) {
    if (e.target === this) {
        closeAddAssignmentModal();
    }
});



function saveAssignmentBtn(){
    let assignmentTitle =
        $("#input-assignment-title").val().trim();

    let assignmentDescription =
        $("#input-assignment-description").val().trim();

    let dueDate =
        $("#input-assignment-due-date").val();

    let maximumMarks =
        parseInt($("#input-assignment-marks").val());

    let file =
        $("#input-assignment-file")[0].files[0];

    if (!file) {
        alert("Please choose a PDF file or Video");
        return;
    }
    const isPdf = file.type === "application/pdf";
    if (!isPdf ) {
        alert("Only PDF files are allowed");
        return;
    }



    if (!assignmentTitle) {

        alert("Please enter assignment title");

        $("#input-assignment-title").focus();

        return;
    }


    if (!assignmentDescription) {

        alert("Please enter assignment description");

        $("#input-assignment-description").focus();

        return;
    }


    if (!dueDate) {

        alert("Please select a due date");

        $("#input-assignment-due-date").focus();

        return;
    }


    if (!maximumMarks) {

        alert("Please enter maximum marks");

        $("#input-assignment-marks").focus();

        return;
    }

    let assignmentData = new FormData();

    assignmentData.append("assignmentId", 0);
    assignmentData.append("lessonId", assignmentState.lessonId);
    assignmentData.append("assignmentName", assignmentTitle);
    assignmentData.append("assignmentDescription", assignmentDescription);
    assignmentData.append("deadline", dueDate);
    assignmentData.append("maximumMarks", maximumMarks);
    assignmentData.append("assignmentPdfFile",file)


        addAssignment(assignmentData).done(function (response) {

        console.log("Assignment saved successfully");

        loadLessonAssignment();

        closeAddAssignmentModal();

        toastr.success(
            "Assignment saved successfully",
            "Assignment Added"
        );

    }).fail(function (xhr) {

        if (xhr.status === 401 || xhr.status === 404) {

            toastr.error(
                "Assignment was not saved",
                "Save Failed"
            );

        } else if (xhr.status === 500) {

            toastr.error(
                "Internal server error. Please try again later.",
                "Server Error"
            );

        } else {

            toastr.error(
                "Something went wrong.",
                "Error"
            );

        }

    });

}
function loadLessonAssignment() {
    getLessonAssignemntList(assignmentState.lessonId).done(function (response) {
        let deleteBtn = "";
        let updateBtn = "";

        let assignmentList = response.body;

        $("#assignmentList").empty();

        if (!assignmentList || assignmentList.length === 0) {
            alert("not yet assignment added")
            return;
        }

        assignmentList.forEach(function (assignment) {
            if (localStorage.getItem("roles") !== "Student") {
                console.log(localStorage.getItem("roles"))
                updateBtn = `
                          <button class="material-view-btn" id="updateAssignmentBtn" type="button" data-id="${assignment.assignmentId}">
                                               <svg viewBox="0 0 24 24"
                             fill="none"
                             stroke="currentColor"
                             stroke-width="2"
                             width="16"
                             height="16">
                            <path d="M12 20h9"/>
                            <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>
                        </svg>
                            update 
                        </button>
                            `;
                deleteBtn = ` <button class="material-view-btn" id="deleteAssignmentBtn" type="button" data-id="${assignment.assignmentId}">
                             <svg viewBox="0 0 24 24"
                                 fill="none"
                                 stroke="currentColor"
                                 stroke-width="2"
                                 width="16"
                                 height="16">
                                <path d="M3 6h18"/>
                                <path d="M8 6V4h8v2"/>
                                <path d="M19 6l-1 14H6L5 6"/>
                                <path d="M10 11v5"/>
                                <path d="M14 11v5"/>
                            </svg>
                            Delete
                        </button>`;
            }

            let card = `
                 <div class="assignment-card" style="--assignment-accent:#16A38A; --assignment-tint:#DCF3EE">
            <div class="assignment-order">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
            </div>
            <div class="assignment-card-body">
                <div class="assignment-card-top">
                    <div>
                        <p class="assignment-card-title">${assignment.assignmentName}</p>
                    </div>
                    <span class="assignment-status open">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><circle cx="12" cy="12" r="9"/></svg>
                                assignments
                            </span>
                </div>
                <p class="assignment-card-desc">${assignment.assignmentDescription}</p>
                <div class="assignment-meta-row">
                            <span class="assignment-meta-item">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                               due ${assignment.deadline}
                            </span>
                    <span class="assignment-meta-item">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
                                ${assignment.maximumMarks}
                            </span>
                    <span class="assignment-meta-item">
                               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                                posted : ${assignment.assignmentPostedDate}
                            </span>
                </div>
                <div class="assignment-card-foot">
                    <span class="assignment-topic-chip"><span class="dot"></span>Trial balance &amp; adjustments</span>
                    <div class="assignment-resource-row">
                        ${deleteBtn}
                        ${updateBtn}
                        <button class="assignment-resource-btn" type="button" id="viewAssignmentBtn" data-id="${assignment.assignmentId}">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>
                            View Assignment
                        </button>
                        <button class="assignment-resource-btn" type="button">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
                            Submissions
                        </button>
                        <button class="assignment-resource-btn" type="button">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
            `;

            $("#assignmentList").append(card);

        });


        $("#assignmentCount").text(assignmentList.length);
        $("#assignmentCountBar").text(assignmentList.length);
        console.log(assignmentState.lessonName)
        $("#openLessonName").text(assignmentState.lessonName);
        $("#openedLessonNumber").text(assignmentState.lessonNumber);
        $("#openedSubjectBatchName").text(assignmentState.lessonName);


    }).fail(function (xhr) {
        assignmentState.assignmentId = 0;
        $("#assignmentCount").text(0);
        $("#assignmentCountBar").text(0);

        if (xhr.status === 404) {
            $("#assignmentList").empty();
            toastr.error(
                "assignments not yet",
                "Load Failed"
            );

        } else if (xhr.status === 401) {

            $("#assignmentList").empty();
            toastr.error(
                "You are not allowed to view this.",
                "Load Failed"
            );

        } else if (xhr.status === 500) {

            $("#assignmentList").empty();
            toastr.error(
                "Internal server error. Please try again later.",
                "Server Error"
            );

        } else {

            $("#assignmentList").empty();
            toastr.error(
                "Something went wrong.",
                "Load Failed"
            );

        }
    });

}

$(document).on("click", "#updateAssignmentBtn", function (e){
    assignmentState.assignmentId= Number($(this).data("id"));
    console.log(assignmentState.assignmentId);

    $("#save-assignment-btn")
        .html(`
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M20 6 9 17l-5-5"/>
            </svg>
            update assignment
        `)
        .attr("onclick", "updateAssignmentBtn()");

    getAssignmentDetail(assignmentState.assignmentId).done(function (response){
        assignmentState.assignmentId=response.body.assignmentId;
        $("#input-assignment-title").val(response.body.assignmentName);
        $("#input-assignment-description").val(response.body.assignmentDescription);
        $("#input-assignment-due-date").val(response.body.deadline);
        $("#input-assignment-marks").val(response.body.maximumMarks)
        $("#assignment-modal-overlay").addClass("active");
        $("body").addClass("modal-open");
    }).fail(function (xhr){
        if (xhr.status === 401 || xhr.status === 404) {

            toastr.error(
                "Assignment was not saved",
                "Save Failed"
            );

        } else if (xhr.status === 500) {

            toastr.error(
                "Internal server error. Please try again later.",
                "Server Error"
            );

        } else {

            toastr.error(
                "Something went wrong.",
                "Error"
            );

        }
    })
});

function updateAssignmentBtn(){
    let assignmentTitle =
        $("#input-assignment-title").val().trim();

    let assignmentDescription =
        $("#input-assignment-description").val().trim();

    let dueDate =
        $("#input-assignment-due-date").val();

    let maximumMarks =
        parseInt($("#input-assignment-marks").val());


    let file = $("#input-assignment-file")[0].files[0] || null;

    if (file) {
        const isPdf = file.type === "application/pdf";

        if (!isPdf) {
            alert("Only PDF files are allowed");
            return;
        }
    }



    if (!assignmentTitle) {

        alert("Please enter assignment title");

        $("#input-assignment-title").focus();

        return;
    }


    if (!assignmentDescription) {

        alert("Please enter assignment description");

        $("#input-assignment-description").focus();

        return;
    }


    if (!dueDate) {

        alert("Please select a due date");

        $("#input-assignment-due-date").focus();

        return;
    }


    if (!maximumMarks) {

        alert("Please enter maximum marks");

        $("#input-assignment-marks").focus();

        return;
    }

    let assignmentData = new FormData();

    assignmentData.append("assignmentId", assignmentState.assignmentId);
    assignmentData.append("lessonId", assignmentState.lessonId);
    assignmentData.append("assignmentName", assignmentTitle);
    assignmentData.append("assignmentDescription", assignmentDescription);
    assignmentData.append("deadline", dueDate);
    assignmentData.append("maximumMarks", maximumMarks);
    if (file) {
        assignmentData.append("assignmentPdfFile", file);
    }


    updateAssignment(assignmentData).done(function (response) {
        assignmentState.assignmentId=0;
        console.log("Assignment updated successfully");

        loadLessonAssignment();

        closeAddAssignmentModal();

        toastr.success(
            "Assignment updated successfully",
            "Assignment updated"
        );

    }).fail(function (xhr) {

        if (xhr.status === 401 || xhr.status === 404) {

            toastr.error(
                "Assignment was not updated",
                "Save Failed"
            );

        } else if (xhr.status === 500) {

            toastr.error(
                "Internal server error. Please try again later.",
                "Server Error"
            );

        } else {

            toastr.error(
                "Something went wrong.",
                "Error"
            );

        }

    });
}

    $(document).on("click", "#deleteAssignmentBtn", function (e){
        let deleteAssignmentId = $(this).data("id");
        deleteAssignment(deleteAssignmentId).done(function (response){
            loadLessonAssignment();
            closeAddAssignmentModal()
            assignmentState.assignmentId=0;
            toastr.success(
                "assignment deleted successfully",
                "assignment deleted"
            );
        }).fail(function (xhr){
            if (xhr.status === 401 || xhr.status === 404) {

                toastr.error(
                    "assignment was not updated",
                    "Save Failed"
                );

            } else if (xhr.status === 500) {

                toastr.error(
                    "Internal server error. Please try again later.",
                    "Server Error"
                );

            } else {

                toastr.error(
                    "Something went wrong.",
                    "Error"
                );

            }

        }).always(function () {

            saveBtn.prop("disabled", false);

        });
    });

$(document).on("click", "#viewAssignmentBtn", function (e) {
    let assignmentId = Number($(this).data("id"));
    console.log(assignmentId)
    viewAssignment(assignmentId).done(function (blob) {

        const pdfUrl = URL.createObjectURL(blob);

        window.open(pdfUrl, "_self");

        setTimeout(function () {
            URL.revokeObjectURL(pdfUrl);
        }, 1000);

    }).fail(function (xhr) {
        console.error("PDF download failed:", xhr);
    });



});

function goBackToLessons() {
    window.location.href =
        "lessonShow.html?subjectClassId=" + assignmentState.subjectClassId + "&lessonId=" + assignmentState.lessonId+"&batchName=" + assignmentState.batchName;
}
