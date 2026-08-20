let batchId=0;
let batchName="";
function initStudentSubjectRelatedBatch(){
    getStudentBatchId()
}









function getStudentBatchId(){
    loadStudentDetail(localStorage.getItem("studentId")).done(function (response){
        let student = response.body;
        batchId=student.batchDTO.classBatchId;
        if(batchId > 0){
            loadAllStudentRelatedSubject();
        }
        console.log(batchId)
    }).fail(function (xhr){
        if (xhr.status === 401 || xhr.status === 404) {
            toastr.error("batch not allowed", "Load Failed");
        } else if (xhr.status === 500) {
            toastr.error("Internal server error. Please try again later.", "Server Error");
        } else {
            toastr.error("Something went wrong.", "Load Failed");
        }
    });
}

function loadAllStudentRelatedSubject(){
    console.log(localStorage.getItem("studentId"),batchId)
    getAllStudentRelateSubject(localStorage.getItem("studentId"),batchId).done(function (response) {
        $("#subjectList").empty();


        for (const responseElement of response.body) {
            const studentId=responseElement.studentId
            const subjectName=responseElement.subjectName
            batchName=responseElement.batchName
            const subjectClassId=responseElement.subjectClassId
            const lessonCount=responseElement.lessonCount



            let data = ` <article class="my-subject-card" style="--subj-accent:#16A38A; --subj-tint:#DCF3EE;">
                    <div class="msc-top">
                        <div class="msc-id">
                            <div class="msc-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
                            </div>
                            <div class="msc-id-text">
                                <h3>${subjectName}</h3>
                                <div class="msc-teacher">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                    batchName : ${batchName}  AND student_id : ${studentId}
                                </div>
                               
                            </div>
                        </div>
                        <span class="msc-registered-chip">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6 9 17l-5-5"/></svg>
                            Registered
                        </span>
                    </div>

                    <div class="msc-progress">
                        <div class="msc-ring" style="--pct:81">
                            <div class="msc-ring-inner"><strong>81%</strong></div>
                        </div>
                        <div class="msc-progress-text">
                            <p class="msc-pt-label">Subject Mastery</p>
                            <p class="msc-pt-value">Steady, trending up 3% this term</p>
                        </div>
                    </div>

                    <div class="msc-stats-row">
                        <div class="msc-stat"><b>${lessonCount}</b><span>Lessons</span></div>
                        <div class="msc-stat"><b>10/12</b><span>Assignments</span></div>
                        <div class="msc-stat"><b>84</b><span>Last Exam</span></div>
                    </div>

                    <div class="msc-foot">
                        <div class="msc-next">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                            <div class="msc-next-text">
                                <span>Next up</span>
                                <strong>Mid-term · Mon, 9:00 AM</strong>
                            </div>
                        </div>
                        <a href="#" class="btn-view-lessons" data-subject-class-id="${subjectClassId}">
                            View Lessons
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                        </a>
                    </div>
                </article>`;

            $("#subjectList").append(data);

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

$(document).on("click", ".btn-view-lessons", function () {
    const subjectClassId = $(this).data('subject-class-id');
    const params = new URLSearchParams({
        subjectClassId: subjectClassId,
        batchName: batchName,
    });
    window.location.href = "lessonShow.html?" + params.toString();
});