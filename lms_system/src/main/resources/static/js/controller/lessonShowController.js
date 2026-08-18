let subjectClassId=0;
let batchName="";
let batchCreateDate=""
$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    subjectClassId=urlParams.get("subjectClassId");
    batchName=urlParams.get("batchName");
    batchCreateDate=urlParams.get("batchCreateDate");


    if(subjectClassId !== 0){
        loadAllSubjectAndBatchRelatedLesson();
    }





});



function loadAllSubjectAndBatchRelatedLesson(){
    getAllRelatedLesson(subjectClassId).done(function (response) {

        $("#lessonList").empty();
        for (const lesson of response.body) {

            const lessonId = lesson.lessonId;
            const lessonNumber = lesson.lessonNumber;
            const lessonTitle = lesson.lessonTitle;
            const description = lesson.lessonDescription;
            const subjectBatchName = lesson.subjectName;

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
                                <button class="lesson-resource-btn" type="button" data-id="${lessonId}">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>
                                    Materials
                                </button>
                                <button class="lesson-resource-btn" type="button" data-id="${lessonId}">
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