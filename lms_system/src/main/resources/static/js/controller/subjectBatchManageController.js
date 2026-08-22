
const subjectBatchManageState={
    selectedSubjectIds:[],
    existingSubject:[],
    selectedBatchId:0

}



function initSubjectBatchManageRelatedBatch(){
    subjectBatchManageState.selectedSubjectIds = [];
    subjectBatchManageState.existingSubject = [];
    subjectBatchManageState.selectedBatchId=0;
    loadAllBatch();
    loadAllSubjects()



}

function updateSelectionCount() {
    const count = subjectBatchManageState.selectedSubjectIds.length;
    const label = count === 0 ? 'No subjects selected'
        : count === 1 ? '1 subject selected'
            : `${count} subjects selected`;

    $('#selection-count-text').text(label);
    $('#actionbar-subject-count').text(label);
}

$(document).on('click','.subject-pick-card', function () {
    const $card = $(this);
    if ($card.hasClass('disabled')) {
        return;
    }
    const subjectId = Number($card.data('subject-id'));
    const index = subjectBatchManageState.selectedSubjectIds.indexOf(subjectId);

    if (index === -1) {
        subjectBatchManageState.selectedSubjectIds.push(subjectId);
        $card.addClass('selected');
    } else {
        subjectBatchManageState.selectedSubjectIds.splice(index, 1);
        $card.removeClass('selected');
    }

    updateSelectionCount();
    console.log('Selected subjects:', subjectBatchManageState.selectedSubjectIds);
});

$(document).on('click','.batch-pick-item', function () {
    subjectBatchManageState.selectedBatchId=0;
    const batchId = Number(
        $(this)
            .find('input[name="batch-pick"]')
            .val()
    );
    const batchName = $(this).find('.batch-pick-info strong').text();
    $('#actionbar-batch-name').text(batchName);

    console.log("Batch ID:", batchId);
    subjectBatchManageState.selectedBatchId=batchId;
    loadAddedSubjects(batchId);
});

function loadAddedSubjects(batchId){
    getSubjectsByBatch(batchId).done(function (response){
        subjectBatchManageState.selectedSubjectIds.length = 0;
        subjectBatchManageState.existingSubject.length=0;

        $('.subject-pick-card').removeClass('selected');

        for (const subject of response.body) {

            const subjectId = Number(subject.subjectId);

            subjectBatchManageState.existingSubject.push(subjectId);

            $(`.subject-pick-card[data-subject-id="${subjectId}"]` )
                .addClass('selected ');
        }


        updateSelectionCount();

        console.log(
            "Already added subjects:",
            subjectBatchManageState.selectedSubjectIds
        );
    }).fail(function (xhr){
        $('.subject-pick-card').removeClass('selected');
        subjectBatchManageState.selectedSubjectIds.length = 0;
        subjectBatchManageState.existingSubject.length=0;

        updateSelectionCount();

        console.log("Failed to load batch subjects");
    })
}




function loadAllBatch() {

    getAllBatch().done(function (response) {
        $("#batch-pick-list").empty();






        for (const responseElement of response.body) {
            const bId = responseElement.classBatchId;
            const bName = responseElement.classBatchName;
            const bStartDate = responseElement.classBatchStartDate;


            let data = `<label class="batch-pick-item" style="--pick-accent:#A66B0F">
                                <input type="radio" name="batch-pick" value="${bId}">
                                <span class="batch-pick-radio"></span>
                                <span class="batch-pick-info">
                                    <strong>${bName}</strong>
                                    <span class="batch-pick-meta">batchId : ${bId}</span>
                                    <span class="batch-pick-chips">
                                        <span class="chip chip-acc"><span class="dot"></span>${bStartDate}</span>
                                    </span>
                                </span>
                            </label>`;

            $("#batch-pick-list").append(data);

        }


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

function loadAllSubjects(){


    getAllSubject().done(function(response){
        $("#subject-pick-grid").empty();
        for (const responseElement of response.body) {
            const subjectId = responseElement.subjectId;
            const subjectName = responseElement.subjectName;

            let data =  `<div class="subject-pick-card" data-subject-id="${subjectId}" style="--pick-tint:#DCF3EE;--pick-tone:#0E7A66">
                                <span class="subject-pick-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6 9 17l-5-5"/></svg></span>
                                <span class="subject-icon-box" style="background:#DCF3EE;color:#0E7A66">
                                    <svg width="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
                                </span>
                                <div class="subject-pick-text">
                                    <strong>${subjectName}</strong>
                                    <span>subject Id : ${subjectId}</span>
                                </div>
                            </div>`

            $("#subject-pick-grid").append(data);

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


function addSubjectBatchBtn(){
    console.log(subjectBatchManageState.selectedBatchId)
    if (subjectBatchManageState.selectedBatchId === 0) {
        alert("please select batch name");
        return;
    }
    if (subjectBatchManageState.selectedSubjectIds.length === 0) {
        alert("please select subject want to add");
        return;
    }
    let subjectBatchData = {
        batchId: subjectBatchManageState.selectedBatchId,
        subjectIdList: subjectBatchManageState.selectedSubjectIds,
    };

    addSubjectBatch(subjectBatchData).done(function (){
        toastr.success(
            "subject batch saved successfully",
            "new batch added"
        );
        subjectBatchManageState.selectedBatchId=0;
        subjectBatchManageState.selectedSubjectIds.length=0;
        subjectBatchManageState.existingSubject.length=0;
    }).fail(function (xhr){
        if (xhr.status === 401 || xhr.status === 404) {
            toastr.error("subjectBatch not saved", "Save Failed");
        } else if (xhr.status === 500) {
            toastr.error("Internal server error. Please try again later.", "Server Error");
        } else {
            toastr.error("Something went wrong.", "Save Failed");
        }
    })
}



