function initbatchManageRelatedBatch(){


    loadAllBatch();



};

let batchCount = 0;
let batchId;


function loadCards() {


    $("#stat-total").text(batchCount);
    $("#batchCount01").text(batchCount);
    $("#batchCount02").text(batchCount);
    $("#batchCount03").text("0"+batchCount);
    $("#stat-started").text(batchCount);
    $("#stat-upcoming").text("01");
        $("#stat-next").text(batchYear[batchYear.length-1] +" "+ "A/L");
        $("#stat-next-sub").text(" upcoming batch");
}




function addBatchBtn() {

    let batchName = $("#input-batch-name").val().trim();


    if (!batchName) {
        alert("Please enter batch name");
        $("#input-batch-name").focus();
        return;
    }

    let batchData = {
        classBatchId: 0,
        classBatchName: batchName,
        classBatchStartDate: null
    };

    addBatch(batchData).done(function (response) {
        console.log("Success");
        loadAllBatch();
        clearBtn();
        toastr.success(
            "batch saved successfully",
            "new batch added"
        );
    }).fail(function (xhr) {
        clearBtn();
        if (xhr.status === 401 || xhr.status === 404) {
            toastr.error("batch not saved", "Save Failed");
        } else if (xhr.status === 500) {
            toastr.error("Internal server error. Please try again later.", "Server Error");
        } else {
            toastr.error("Something went wrong.", "Save Failed");
        }
    });
}

let batchYear=[]
function loadAllBatch() {

    getAllBatch().done(function (response) {
        $("#batch-table-body").empty();

        batchCount = 0;




        for (const responseElement of response.body) {
            const bId = responseElement.classBatchId;
            const bName = responseElement.classBatchName;
            const bStartDate = responseElement.classBatchStartDate;


            let data = `<tr data-id="${bId}">
                            <td><span class="batch-id-chip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="4" y="4" width="16" height="16" rx="3"/></svg>${bId}</span></td>
                            <td>
                                <div class="batch-name-cell">
                                    <div class="subject-icon-box" style="background:#FF6F59;color:#FCEBCB;">${bName.substring(0,2)}</div>
                                    <div class="batch-name-info">
                                        <strong>${bName}</strong>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <span class="batch-date-badge started">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                                    ${bStartDate}<span class="rel">Started</span>
                                </span>
                            </td>
                            <td>
                                <div class="row-actions" style="justify-content:flex-end;">
                                    <button type="button" title="Edit batch" aria-label="Edit ${bName}" class="editBatchBtn" data-id="${bId}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg></button>
                                    <button type="button" class="danger" title="Delete batch" aria-label="Delete ${bName}" data-id="${bId}" data-name="${bName}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg></button>
                                </div>
                            </td>
                        </tr>`;

            $("#batch-table-body").append(data);
            batchCount += 1;
            let year=parseInt(bName.split(" ")[0])
            batchYear.push(year+1)

        }

        loadCards();

    }).fail(function (xhr) {
        if (xhr.status === 401 || xhr.status === 404) {
            toastr.error("batch not allowed", "Load Failed");
        } else if (xhr.status === 500) {
            toastr.error("Internal server error. Please try again later.", "Server Error");
        } else {
            toastr.error("Something went wrong.", "Load Failed");
        }
    });
}


function clearBtn() {
    $("#input-batch-id").val("");
    $("#input-batch-name").val("");
}


(function () {
    "use strict";

    var overlay = document.getElementById("batch-modal-overlay");
    var openBtn = document.getElementById("open-add-batch");
    var closeBtn = document.getElementById("close-batch-modal");
    var cancelBtn = document.getElementById("cancel-batch-modal");

    function openModal() {
        overlay.classList.add("active");
        document.body.classList.add("modal-open");
    }

    function closeModal() {
        overlay.classList.remove("active");
        document.body.classList.remove("modal-open");
        $("#batch-modal-title").text("Add batch");
        $("#save-batch-btn").html(`
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
            Add batch
        `);
        clearBtn();
    }

    openBtn.addEventListener("click", function () {
        $("#batch-modal-title").text("Add batch");
        openModal();
    });
    closeBtn.addEventListener("click", closeModal);
    cancelBtn.addEventListener("click", closeModal);
    overlay.addEventListener("click", function (e) {
        if (e.target === overlay) closeModal();
    });
})();


$(document).on("click", ".editBatchBtn", function () {
    batchId = $(this).data("id");
    editMode = true;

    $("#batch-modal-title").text("Edit batch");
    $("#save-batch-btn").html(`
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6 9 17l-5-5"/></svg>
            Update Student
        `)
        .attr("onclick", "updateBatchBtn()");
    getBatchById(batchId).done(function (response) {
        $("#batch-modal-overlay").addClass("active");
        document.body.classList.add("modal-open");

        $("#input-batch-id").val(response.body.classBatchId);
        $("#input-batch-name").val(response.body.classBatchName);

    }).fail(function (xhr) {
        if (xhr.status === 401 || xhr.status === 404) {
            toastr.error("batch not found", "Load Failed");
        } else if (xhr.status === 500) {
            toastr.error("Internal server error. Please try again later.", "Server Error");
        } else {
            toastr.error("Something went wrong.", "Load Failed");
        }
    });
});

function updateBatchBtn() {
    let updateId = $("#input-batch-id").val().trim();
    let batchName = $("#input-batch-name").val().trim();

    if (!updateId) {
        alert("please find batch first");
        return;
    }

    if (!batchName) {
        alert("Please enter batch name");
        $("#input-batch-name").focus();
        return;
    }

    let batchData = {
        classBatchId: updateId,
        classBatchName: batchName,
        classBatchStartDate: null
    };

    updateBatch(batchData).done(function (response) {
        console.log("Success");
        loadAllBatch();
        clearBtn();
        editMode = false;
        toastr.success(
            "batch updated successfully",
            "update successful"
        );
    }).fail(function (xhr) {
        clearBtn();
        if (xhr.status === 401 || xhr.status === 404) {
            toastr.error("batch not updated", "Update Failed");
        } else if (xhr.status === 500) {
            toastr.error("Internal server error. Please try again later.", "Server Error");
        } else {
            toastr.error("Something went wrong.", "Update Failed");
        }
    });
}



$(document).on("click", ".danger", function () {
    let deleteBatchId = $(this).data("id");
    batchDelete(deleteBatchId).done(function (response){

        loadAllBatch();
        toastr.success(
            "batch deleted successfully",
            "delete success"
        );

    }).fail(function (xhr){
        if (xhr.status === 401 || xhr.status === 404) {

            toastr.error(
                "batch not deleted",
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


$("#batch-search").on("keydown", function (event) {
    if (event.key === "Enter") {
        let batchName=$(this).val().trim();
        if(batchName === ""){
            loadAllBatch();
            return;
        }
        searchBatch(batchName).done(function (response){
            $("#batch-table-body").empty();
            for (const responseElement of response.body) {
                const bId = responseElement.classBatchId;
                const bName = responseElement.classBatchName;
                const bStartDate = responseElement.classBatchStartDate;


                let data = `<tr data-id="${bId}">
                            <td><span class="batch-id-chip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="4" y="4" width="16" height="16" rx="3"/></svg>${bId}</span></td>
                            <td>
                                <div class="batch-name-cell">
                                    <div class="subject-icon-box" style="background:#16A38A ;color:#FCEBCB;">${bName.substring(0, 2)}</div>
                                    <div class="batch-name-info">
                                        <strong>${bName}</strong>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <span class="batch-date-badge started">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                                    ${bStartDate}<span class="rel">Started</span>
                                </span>
                            </td>
                            <td>
                                <div class="row-actions" style="justify-content:flex-end;">
                                    <button type="button" title="Edit batch" aria-label="Edit ${bName}" class="editBatchBtn" data-id="${bId}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg></button>
                                    <button type="button" class="danger" title="Delete batch" aria-label="Delete ${bName}" data-id="${bId}" data-name="${bName}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg></button>
                                </div>
                            </td>
                        </tr>`;

                $("#batch-table-body").append(data);
            }
        });



    }
});

