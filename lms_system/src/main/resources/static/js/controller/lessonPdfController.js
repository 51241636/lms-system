let lessonId=0;

$(document).ready(function () {
    const role=localStorage.getItem("roles");


    if (role === "Student") {
        $('.add-lesson-bar').hide();

    }
    urlParams= new URLSearchParams(window.location.search);
    lessonId = Number(urlParams.get("lessonId"));



    if (lessonId > 0) {
        loadLessonMaterials();
    }





});




function openAddLessonPdfModal() {
    isEditMode = false;

    $("#lesson-modal-title").text("Add lesson");
    $("#input-lesson-number").prop("readonly", false);

    $("#save-material-btn")
        .html(`
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M20 6 9 17l-5-5"/>
            </svg>
            Save lessonPdf
        `)
        .attr("onclick", "addMaterialBtn()");

    clearLessonBtn();

    $("#material-modal-overlay").addClass("active");
    $("body").addClass("modal-open");
}
function closeAddMeterialModal() {
    $("#material-modal-overlay").removeClass("active");
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

$(document).on("click", ".modal-overlay", function (e){
    if (e.target === this) {
        closeAddLessonModal();
    }
});

function addMaterialBtn() {

    let fileInput = document.getElementById("input-material-file");
    let file = fileInput.files[0];

    if (!file) {
        alert("Please choose a PDF file or Video");
        return;
    }
    const isPdf = file.type === "application/pdf";
    const isVideo = file.type.startsWith("video/");
    if (!isPdf && !isVideo) {
        alert("Only PDF or video files are allowed");
        return;
    }

    let formData = new FormData();
    formData.append("lessonFileId",0)
    formData.append("lessonId", lessonId);
    formData.append("lessonPdfFile", file);

    let saveBtn = $("#save-material-btn");
    saveBtn.prop("disabled", true);

    uploadLessonPdf(formData).done(function () {

        loadLessonMaterials();
        closeAddMeterialModal();

        toastr.success(
            "Material uploaded successfully",
            "Material Added"
        );

    }).fail(function (xhr) {

        if (xhr.status === 401 || xhr.status === 404) {

            toastr.error(
                "Material was not saved",
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

}
let lessonPdfId=0;
$(document).on("click", "#updateBtn", function (e){
    lessonPdfId = $(this).data("id");
    $("#save-material-btn")
        .html(`
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 5v14M5 12h14"/>
            </svg>
            Update lessonPdf
        `)
        .attr("onclick", "updateLessonPdf()");
    getLessonPdfDetail(lessonPdfId).done(function (response){
        lessonPdfId=response.body.lessonPdfFileId;
        $("#material-modal-overlay").addClass("active");
        $("body").addClass("modal-open");
    })
});

function updateLessonPdf(){
    if(lessonPdfId === 0){
        alert("lessonpdf not found")
    }
    let fileInput = document.getElementById("input-material-file");
    let file = fileInput.files[0];

    if (!file) {
        alert("Please choose a PDF file or Video");
        return;
    }
    const isPdf = file.type === "application/pdf";
    const isVideo = file.type.startsWith("video/");
    if (!isPdf && !isVideo) {
        alert("Only PDF or video files are allowed");
        return;
    }

    let formData = new FormData();
    formData.append("lessonFileId",lessonPdfId)
    formData.append("lessonId", lessonId);
    formData.append("lessonPdfFile", file);

    let saveBtn = $("#save-material-btn");
    saveBtn.prop("disabled", true);

    updatesavedLesson(formData).done(function () {

        loadLessonMaterials();
        closeAddMeterialModal();
        lessonPdfId=0;


        toastr.success(
            "Material updated successfully",
            "Material Added"
        );

    }).fail(function (xhr) {

        if (xhr.status === 401 || xhr.status === 404) {

            toastr.error(
                "Material was not updated",
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

}
$(document).on("click", "#deleteBtn", function (e) {
    lessonPdfId = $(this).data("id");
    deletesavedLesson(lessonPdfId).done(function (response){
        loadLessonMaterials();
        closeAddMeterialModal();
        lessonPdfId=0;
        toastr.success(
            "Material deleted successfully",
            "Material deleted"
        );
    }).fail(function (xhr){
        if (xhr.status === 401 || xhr.status === 404) {

            toastr.error(
                "Material was not updated",
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
function loadLessonMaterials(){
    getLessonPdfList(lessonId).done(function (response) {
        let deleteBtn="";
        let updateBtn="";

        let materialList = response.body;

        $("#materialList").empty();

        if (!materialList || materialList.length === 0) {
            alert("not yet pdf added")
            return;
        }

        materialList.forEach(function (material) {
            if (localStorage.getItem("roles") !== "Student") {
                console.log(localStorage.getItem("roles"))
                updateBtn = `
                          <button class="material-view-btn" id="updateBtn" type="button" data-id="${material.lessonPdfFileId}">
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
                deleteBtn = ` <button class="material-view-btn" id="deleteBtn" type="button" data-id="${material.lessonPdfFileId}">
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
                <div class="material-card">
                    <div class="material-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>
                    </div>
                    <div class="material-info">
                        <p class="material-name">${material.fileName}</p>
                        <div class="material-meta">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
                            PDF material
                        </div>
                    </div>
                    <div class="material-actions">
                    ${updateBtn}
                    ${deleteBtn}
                           
                       
                        <button class="material-view-btn" type="button" id="viewBtn" data-id="${material.lessonPdfFileId}">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z"/><circle cx="12" cy="12" r="3"/></svg>
                            View
                        </button>
                        
                    </div>
                </div>
            `;

            $("#materialList").append(card);

        });

        $("#materialCount").text(materialList.length);
        $("#materialCountBar").text(materialList.length);

    }).fail(function (xhr) {

        $("#materialCount").text(0);
        $("#materialCountBar").text(0);

        if (xhr.status === 404) {

            $("#materialList").html(emptyMaterialState());

        } else if (xhr.status === 401) {

            $("#materialList").empty();
            toastr.error(
                "You are not allowed to view this.",
                "Load Failed"
            );

        } else if (xhr.status === 500) {

            $("#materialList").empty();
            toastr.error(
                "Internal server error. Please try again later.",
                "Server Error"
            );

        } else {

            $("#materialList").empty();
            toastr.error(
                "Something went wrong.",
                "Load Failed"
            );

        }
    });
}

$(document).on("click", "#viewBtn", function (e) {
    let pdfId = $(this).data("id");
    console.log(pdfId)
    downloadPdf(pdfId).done(function (blob) {

        const pdfUrl = URL.createObjectURL(blob);

        window.open(pdfUrl, "_blank");

        setTimeout(function () {
            URL.revokeObjectURL(pdfUrl);
        }, 1000);

    }).fail(function (xhr) {
        console.error("PDF download failed:", xhr);
    });



});

