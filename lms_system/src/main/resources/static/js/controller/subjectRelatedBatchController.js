function  initSubjectRelatedBatch(){
    loadSubjectRelatedBatches();
    loadTeacherBatchDetail();
}







function openBatchLessons(subjectClassId, batchName, batchStartDate) {

    const params = new URLSearchParams({
        subjectClassId: subjectClassId,
        batchName: batchName,
        batchStartDate: batchStartDate
    });
    window.open("lessonShow.html?" + params.toString(),"_blank")

}
function loadSubjectRelatedBatches(){
    getBatchList(localStorage.getItem("subjectId")).done(function (response){
        let batchList=response.body;

        $("#batchGrid").empty();

        batchList.forEach(function (batch){
            let card =`  <div class="batch-card" style="--batch-accent:#F2A93B" tabindex="0" role="button"
                     onclick="openBatchLessons('${batch.subjectClassId}', '${batch.batchName}', '${batch.batchStartDate}')" onkeydown="if(event.key==='Enter')openBatchLessons('${batch.subjectClassId}', '${batch.batchName}', '${batch.batchStartDate}')">
                    <div class="batch-card-top">
                        <div>
                            <p class="batch-name">${batch.batchName}</p>
                            <p class="batch-sub">Since ${batch.batchStartDate}</p>
                        </div>
                        <span class="batch-arrow" aria-hidden="true">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>
                        </span>
                    </div>

                    <div class="batch-stats-row">
                        <div class="batch-stat"><b>32</b><span>Students</span></div>
                        <div class="batch-stat"><b>24</b><span> ${batch.lessonCount}</span></div>
                        <div class="batch-stat"><b>6</b><span>Assignments</span></div>               
                    </div>

                    <div class="batch-card-foot">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                        <div class="foot-text">
                            <span class="foot-label">Next up</span>
                            <span class="foot-value">Trial Balance Test · Aug 16, 11:00</span>
                        </div>
                    </div>
                </div>`;
            $("#batchGrid").append(card);

        });


    }).fail(function (xhr){
        if (xhr.status === 401 || xhr.status === 404) {

            toastr.error(
                "student not allowed",
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

function loadTeacherBatchDetail(){
    getBatchRelatedSubjectDetail(localStorage.getItem("subjectId")).done(function (response){
       let subject=response.body;
        $("#subjectOverview").empty();
        let data=` <div class="subject-overview-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                </div>
                <div class="subject-overview-body">
                    <h2>${subject.subjectName}</h2>
                    <p>You're the only subject teacher assigned — all  A/L batches sit under this one subject.</p>
                </div>
                <div class="subject-overview-stats">
                    <div class="batch-stat"><b>${subject.batchCount}</b><span>Batches</span></div>
                    <div class="batch-stat"><b>${subject.studentCount}</b><span>Students</span></div>
                    <div class="batch-stat"><b>${subject.lessonCount}</b><span>Lessons taught</span></div>
                </div>`;

        $("#subjectOverview").append(data);

        $(".subjectName").text(subject.subjectName )
    }).fail(function (xhr){
        if (xhr.status === 401 || xhr.status === 404) {

            toastr.error(
                "student not allowed",
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