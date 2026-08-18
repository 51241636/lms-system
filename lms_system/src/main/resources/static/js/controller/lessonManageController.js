$(document).ready(function () {
    loadAllSubjectBatch();
    loadAllLessons();
    loadAllSubjectBtn();
});

let isEditMode = false;
let subjectList=[]


function loadAllSubjectBatch(){
    getAllSubjectBatches().done(function (response){
        let subjectBatchList = response.body;
        let select = $("#input-lesson-subjectBatch");

        select.empty();
        select.append(
            `<option value="">Select a batch</option>`
        )
        subjectBatchList.forEach(function (subjectBatch) {
            select.append(`
                <option value="${subjectBatch.subjectClassId}">${subjectBatch.subjectName} -  ${subjectBatch.batchName}</option>
            `);
            // subjectList.push($(subjectBatch.subjectName));


        });
        console.log(subjectList)
    })
        .fail(function (xhr){
            if (xhr.status === 401 || xhr.status === 404) {
                toastr.error(
                    "cant load subject batches",
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

function loadAllSubjectBtn(){

    let loadSubjectBtn = $("#subjectFilter");
    getAllSubject().done(function(response){

        for (const responseElement of response.body) {
            const subjectId = responseElement.subjectId;
            const subjectName = responseElement.subjectName;

            loadSubjectBtn.append(`<button type="button"
                                class="subject-filter-btn active"
                                data-subject-name="${subjectName}">
                            ${subjectName}
                        </button>`)
        }

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
function addLessonBtn() {

    let lessonNumber =
        parseInt($("#input-lesson-number").val());

    let subjectBatchId =
        parseInt($("#input-lesson-subjectBatch").val());

    let lessonTitle =
        $("#input-lesson-title").val().trim();

    let description =
        $("#input-lesson-description").val().trim();


    if (!lessonNumber) {

        alert("Please enter lesson number");

        $("#input-lesson-number").focus();

        return;
    }


    if (!subjectBatchId) {

        alert("Please select subject batch");

        $("#input-lesson-subjectBatch").focus();

        return;
    }


    if (!lessonTitle) {

        alert("Please enter lesson title");

        $("#input-lesson-title").focus();

        return;
    }


    if (!description) {

        alert("Please enter lesson description");

        $("#input-lesson-description").focus();

        return;
    }



    let lessonData = {

        lessonId: 0,

        lessonNumber: lessonNumber,

        lessonTitle: lessonTitle,

        lessonDescription: description,

        subjectClassId: subjectBatchId

    };



    addLesson(lessonData).done(function (response) {

        console.log("Lesson saved successfully");

        loadAllLessons();

        clearLessonBtn();

        closeAddLessonModal();

        toastr.success(
            "Lesson saved successfully",
            "Lesson Added"
        );


    }).fail(function (xhr) {

        if (xhr.status === 401 || xhr.status === 404) {

            toastr.error(
                "Lesson was not saved",
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

$(document).on("click", ".subject-filter-btn", function () {
    let subjectName = $(this).data("subject-name");

    getFilterLesson(subjectName).done(function (response) {

        $("#lessonTBody").empty();

        for (const lesson of response.body) {

            const lessonId = lesson.lessonId;
            const lessonNumber = lesson.lessonNumber;
            const lessonTitle = lesson.lessonTitle;
            const description = lesson.lessonDescription;
            const subjectBatchName = lesson.subjectName;

            let data = `
                <tr>
                    <td class="id-tag">${lessonId}</td>

                    <td>
                        <strong>${lessonTitle}</strong>
                        <span class="cell-sub">
                            Lesson ${lessonNumber}
                        </span>
                    </td>

                    <td class="address">
                        ${description || ""}
                    </td>

                    <td>
                        <span class="chip chip-econ">
                            <span class="dot"></span>
                            ${subjectBatchName}
                        </span>
                    </td>

                    <td style="text-align:right;">
                        <div class="row-actions">

                            

                            <button
                                aria-label="Delete"
                                class="danger deleteLessonBtn"
                                data-id="${lessonId}">

                                <svg viewBox="0 0 24 24"
                                     fill="none"
                                     stroke="currentColor"
                                     stroke-width="2">
                                    <path d="M3 6h18"/>
                                    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                                    <path d="m19 6-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6"/>
                                </svg>

                            </button>

                        </div>
                    </td>
                </tr>
            `;

            $("#lessonTBody").append(data);
        }

    }).fail(function (xhr) {

        toastr.error(
            "Cannot load lessons",
            "Load Failed"
        );
        loadAllLessons();

    });

});

function loadAllLessons() {

    getAllLessons().done(function (response) {

        $("#lessonTBody").empty();

        for (const lesson of response.body) {

            const lessonId = lesson.lessonId;
            const lessonNumber = lesson.lessonNumber;
            const lessonTitle = lesson.lessonTitle;
            const description = lesson.lessonDescription;
            const subjectBatchName = lesson.subjectName;

            let data = `
                <tr>
                    <td class="id-tag">${lessonId}</td>

                    <td>
                        <strong>${lessonTitle}</strong>
                        <span class="cell-sub">
                            Lesson ${lessonNumber}
                        </span>
                    </td>

                    <td class="address">
                        ${description || ""}
                    </td>

                    <td>
                        <span class="chip chip-econ">
                            <span class="dot"></span>
                            ${subjectBatchName}
                        </span>
                    </td>

                    <td style="text-align:right;">
                        <div class="row-actions">

                           

                            <button
                                aria-label="Delete"
                                class="danger"
                                data-id="${lessonId}">

                                <svg viewBox="0 0 24 24"
                                     fill="none"
                                     stroke="currentColor"
                                     stroke-width="2">
                                    <path d="M3 6h18"/>
                                    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                                    <path d="m19 6-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6"/>
                                </svg>

                            </button>

                        </div>
                    </td>
                </tr>
            `;

            $("#lessonTBody").append(data);
        }


        const count = response.body.length;

        $("#lesson-count-badge").text(`${count} lessons`);
        $("#lesson-results-count").html(`<b>${count}</b> lessons`);
        $("#lesson-table-footer-count").text(`Showing ${count} lessons`);

    }).fail(function (xhr) {

        toastr.error(
            "Cannot load lessons",
            "Load Failed"
        );

    });
}

$(document).on("click", ".danger", function () {
    let deleteLessonId = $(this).data("id");
    lessonDelete(deleteLessonId).done(function (response){

        loadAllLessons();
        toastr.success(
            "lesson deleted successfully",
            "delete success"
        );

    }).fail(function (xhr){
        if (xhr.status === 401 || xhr.status === 404) {

            toastr.error(
                "lesson not deleted",
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
function openAddLessonModal() {
    isEditMode = false;

    $("#lesson-modal-title").text("Add lesson");
    $("#input-lesson-number").prop("readonly", false);

    $("#save-lesson-btn")
        .html(`
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M20 6 9 17l-5-5"/>
            </svg>
            Save lesson
        `)
        .attr("onclick", "addLessonBtn()");

    clearLessonBtn();

    $("#lesson-modal-overlay").addClass("active");
    $("body").addClass("modal-open");
}

function closeAddLessonModal() {
    $("#lesson-modal-overlay").removeClass("active");
    $("body").removeClass("modal-open");
    clearLessonBtn();
    isEditMode = false;
}

function clearLessonBtn(){
    $("#input-lesson-number").val("");
    $("#input-lesson-title").val("");
    $("#input-lesson-description").val("");
    $("#input-lesson-subjectBatch").val("");
}


$(document).on("click", "#lesson-modal-overlay", function (e){
    if (e.target === this) {
        closeAddLessonModal();
    }
});