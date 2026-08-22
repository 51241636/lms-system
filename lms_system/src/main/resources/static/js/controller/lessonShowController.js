let subjectClassId=0;
let batchName="";
let batchCreateDate=""
let deleteBtn="";
let urlParams;
$(document).ready(function () {
    const role=localStorage.getItem("roles");


    if (role === "Student") {
        $('.add-lesson-bar').hide();

    }
    urlParams= new URLSearchParams(window.location.search);
    subjectClassId=urlParams.get("subjectClassId");
    batchName=urlParams.get("batchName");
    console.log(batchName)
    batchCreateDate=urlParams.get("batchCreateDate");


    if(subjectClassId !== 0){
        loadAllSubjectAndBatchRelatedLesson();
    }





});



function loadAllSubjectAndBatchRelatedLesson(){
    getAllRelatedLesson(subjectClassId).done(function (response) {

        $("#lessonList").empty();
        let deleteButton="";
        for (const lesson of response.body) {

            const lessonId = lesson.lessonId;
            const lessonNumber = lesson.lessonNumber;
            const lessonTitle = lesson.lessonTitle;
            const description = lesson.lessonDescription;
            const subjectBatchName = lesson.subjectName;

            if (localStorage.getItem("roles") !== "Student") {
                console.log(localStorage.getItem("roles"))
                deleteButton = `
                <button class="lesson-delete-btn"
                type="button"
                data-id="${lessonId}"
                title="Delete Lesson">

            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6l-1 14H6L5 6"/>
                <path d="M10 11v6"/>
                <path d="M14 11v6"/>
                <path d="M9 6V4h6v2"/>
            </svg>

            Delete
        </button>
    `;
            }

            let data = `
                <div class="lesson-card" style="--lesson-accent:#16A38A; --lesson-tint:#DCF3EE">
                    <div class="lesson-order"><b>${lessonNumber}</b><span>Lesson</span></div>
                    <div class="lesson-card-body">
                        <div class="lesson-card-top">
                            <div>
                                <p class="lesson-card-title">${lessonTitle}</p>
                            </div>
                            <span class="lesson-status done">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6 9 17l-5-5"/></svg>
                                ${subjectBatchName}
                            </span>
                        </div>
                        <p class="lesson-card-desc">${description}.</p>
                        <div class="lesson-meta-row">
                            <span class="lesson-meta-item">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                                Aug 14, 2026
                            </span>
                            
                            <span class="lesson-meta-item">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                                3 materials
                            </span>
                        </div>
                        <div class="lesson-card-foot">
                            <span class="lesson-topic-chip"><span class="dot"></span>see meterials and assignments</span>
                            <div class="lesson-resource-row">
                            
                                ${deleteButton}
                                <button class="lesson-resource-btn" type="button" data-id="${lessonId}" onclick="openLessonPdf('${lessonId}')" >
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>
                                    Materials
                                </button>
                                <button class="lesson-resource-btn" type="button" data-id="${lessonId}" >
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>
                                    lessonVedio
                                </button>
                                <button class="lesson-resource-btn" type="button" data-id="${lessonId}" onclick="openLessonAssignmennts('${lessonId}','${lessonTitle}','${lessonNumber}')">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
                                    Assignments
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            $("#lessonList").append(data);

        }
        $("#lessonCount").text(response.body.length)
        $("#batchName").text(batchName)
        $(".batchBoldText").text(batchName)
        $("#subjectName").text(batchName)
        $(".lessonCount").text(response.body.length)

    }).fail(function (xhr) {

        toastr.error(
            "Cannot load lessons",
            "Load Failed"
        );

    });
}

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
})
;
function openLessonPdf(lessonId){
    const params = new URLSearchParams({
        lessonId: lessonId
    });

    window.open(
        "lessonPdf.html?" + params.toString(),
        "_blank"
    )
}
function openLessonAssignmennts(lessonId,lessonName,lessonNumber){
    const params = new URLSearchParams({
        lessonId: lessonId,
        lessonName:lessonName,
        lessonNumber:lessonNumber,
        subjectClassId:subjectClassId,
        batchName:batchName
    });

    window.open("assignmentShow.html?" + params.toString(), "_self");
}


function addLessonBtn() {

    let lessonNumber =
        parseInt($("#input-lesson-number").val());

    let lessonTitle =
        $("#input-lesson-title").val().trim();

    let description =
        $("#input-lesson-description").val().trim();


    if (!lessonNumber) {

        alert("Please enter lesson number");

        $("#input-lesson-number").focus();

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

        subjectClassId: subjectClassId

    };



    addLesson(lessonData).done(function (response) {

        console.log("Lesson saved successfully");

        loadAllSubjectAndBatchRelatedLesson();

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

$(document).on("click", ".lesson-delete-btn", function () {
    let deleteLessonId = $(this).data("id");
    lessonDelete(deleteLessonId).done(function (response){

        loadAllSubjectAndBatchRelatedLesson();
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
