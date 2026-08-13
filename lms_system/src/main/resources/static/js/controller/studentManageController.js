$(document).ready(function () {

    loadBatches();
    loadAllStudents();



});

let isEditMode;
let selectedSubjects = [];
let studentList=[];
let studentCount=0;
let activeBatchesCount=0;
let inActiveCount=0;
function loadBatches(){
    getAllBatches().done(function (response){
        let batchList=response.body;
        let select = $("#classBatchId");
        select.empty();
        select.append(
           `<option value="">Select a batch</option>`
        )
        batchList.forEach(function (batch) {

                    select.append(`
                        <option value="${batch.classBatchId}">
                           ${batch.classBatchName}
                        </option>
                     `);
            activeBatchesCount +=1;
               });
    })
        .fail(function (error){
            console.log("error")
        });
}

$("#classBatchId").on("change", function () {
    let selectedBatchId = $(this).val();
    if(isEditMode){
        return;
    }
    selectedBatchRelatedSubject(selectedBatchId)
        .done(function (response){
            let subjectList=response.body;
            let container=$("#subjectContainer")
            container.empty();

            subjectList.forEach(function (subject){
                   container.append(`
                   <label class="subject-toggle">
                                            <input type="checkbox" name="subjectId" value=${subject.subjectId} >
                                            <span class="st-swatch st-econ"></span>
                                            <span class="st-name">${subject.subjectName}</span>
                                            <span class="st-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6 9 17l-5-5"/></svg></span>
                                        </label>`)
            })
        }).fail(function (error){
        console.log("error")
    });
});
// when click subject add to the list
$(document).on("change", "input[name='subjectId']", function () {
   let subjectId=parseInt($(this).val());
   if($(this).is(":checked")){
       if (!selectedSubjects.includes(subjectId)){
           selectedSubjects.push(subjectId)
       }

   }else {
       selectedSubjects = selectedSubjects.filter(function (id) {
           return id !== subjectId;
       });
   }
});


function addStudentBtn(){

        let studentName= $("#studentName").val().trim();
        let username = $("#studentUsername").val().trim();
        let email= $("#email").val().trim();
        let contact= $("#contact").val().trim();
        let password= $("#studentPassword").val().trim();
        let classBatchId= parseInt($("#classBatchId").val().trim());
        let address=$("#address").val().trim().trim();

    if (!studentName) {
        alert("Please enter student name");
        $("#studentName").focus();
        return;
    }

    if (!username) {
        alert("Please enter username");
        $("#studentUsername").focus();
        return;
    }

    if (!email) {
        alert("Please enter email");
        $("#email").focus();
        return;
    }

    if (!contact) {
        alert("Please enter contact number");
        $("#contact").focus();
        return;
    }

    if (!password) {
        alert("Please enter password");
        $("#studentPassword").focus();
        return;
    }

    if (!classBatchId) {
        alert("Please select a batch");
        $("#classBatchId").focus();
        return;

    }if (!address) {
        alert("please enter address");
        $("#address").focus();
        return;
    }

    if (selectedSubjects.length === 0) {
        alert("Please select at least one subject");
        return;
    }

    let studentData={
        studentId:0,
        studentName:studentName,
        studentUsername:username,
        studentPassword:password,
        email:email,
        contact:contact,
        address:address,
        subjectId:selectedSubjects,
        classBatchId:classBatchId

    }
    addStudent(studentData).done(function (response){
        console.log("Sucess")
        loadAllStudents();
        clearBtn();
    }).fail(function (error){
       console.log("not savesd")
    });



}
function openAddStudentModal() {
    $("#addStudentModal").addClass("active");
    $("body").addClass("modal-open");
    isEditMode = false;

    $("#submitAddStudentBtn")
        .html(`
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 5v14M5 12h14"/>
            </svg>
            Add Student
        `)
        .attr("onclick", "addStudentBtn()");
}

function closeAddStudentModal() {
    $("#addStudentModal").removeClass("active");
    $("body").removeClass("modal-open");
    selectedSubjects.length = 0;
    isEditMode=false;
    clearBtn();
}

function loadAllStudents(){


    getAllStudents().done(function(response){
        $("#studentTBody").empty();
        for (const responseElement of response.body) {
            const studentId = responseElement.studentId;
            const studentName = responseElement.studentName;
            const studentUsername = responseElement.studentUsername;
            const email = responseElement.email;
            const contact = responseElement.contact;
            const address = responseElement.address;
            const subjectStudentList = responseElement.subjectStudent;
            const batchName = responseElement.batchName;

            let data =  `<tr> <td class="id-tag">${studentId}</td>
                            <td class="cell-person">
                                <span class="person-avatar" style="background:#3B82F6">${studentName.charAt(0)}</span>
                                <span>${studentName}<span class="cell-sub">${email}</span></span>
                            </td>
                            <td class="num">${contact}</td>
                            <td class="address">${address}</td>
                          
                            <td><span class="chip chip-econ"><span class="dot"></span>${subjectStudentList.join(", ")}</span></td>
                            <td>${batchName}</td>
                            <td><span class="pill pill-a">Active</span></td>
                            <td>
                                <div class="row-actions">
                                    <button aria-label="Edit" id="editBtn" data-id="${studentId}" class="editBtn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg></button>
                                    <button aria-label="Delete" class="danger"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6"/></svg></button>
                                </div>
                            </td>
                                   </tr>`

            $("#studentTBody").append(data);
            studentList.push(responseElement);
            studentCount=studentCount+1;

    }
        loadLastRecentStudent();
        loadStudentCount();
        loadActiveStudents();
        loadActiveBatchCount();
        loadInActiveStudentCard();

    });


}
let studentId;
let batchId;
$(document).on("click",".editBtn",function (){
   studentId = $(this).data("id");
   isEditMode=true;
    $("#submitAddStudentBtn")
        .html(`
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 5v14M5 12h14"/>
            </svg>
            Update Student
        `)
        .attr("onclick", "updateStudentBtn()");
    getStudentById(studentId).done(function (response){
        let student = response.body;
        $("#addStudentModal").addClass("active");
        $("body").addClass("modal-open");
        $("#studentName").val(student.studentName);
        $("#studentUsername").val(student.studentUsername);
        $("#email").val(student.email);
        $("#contact").val(student.contact);
        $("#address").val(student.address);
        batchId=student.batchDTO.classBatchId;

            $("#classBatchId").val(batchId);
        let container=$("#subjectContainer")
        container.empty();

        student.subjectStudent.forEach(function (subject){
            container.append(`
                   <label class="subject-toggle" >
                                            <input type="checkbox" name="subjectId" value=${subject.subjectId} checked disabled>
                                            <span class="st-swatch st-econ"></span>
                                            <span class="st-name">${subject.subjectName}</span>
                                            <span class="st-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6 9 17l-5-5"/></svg></span>
                                        </label>`)
            selectedSubjects.push(subject.subjectId)
        })
        console.log(selectedSubjects);

    });

})

function updateStudentBtn(){
    let studentName= $("#studentName").val().trim();
    let username = $("#studentUsername").val().trim();
    let email= $("#email").val().trim();
    let contact= $("#contact").val().trim();
    let password= $("#studentPassword").val().trim();
    let classBatchId= parseInt($("#classBatchId").val().trim());
    let address=$("#address").val().trim().trim();

    if (!studentName) {
        alert("Please enter student name");
        $("#studentName").focus();
        return;
    }

    if (!username) {
        alert("Please enter username");
        $("#studentUsername").focus();
        return;
    }

    if (!email) {
        alert("Please enter email");
        $("#email").focus();
        return;
    }

    if (!contact) {
        alert("Please enter contact number");
        $("#contact").focus();
        return;
    }


    if (!classBatchId) {
        alert("Please select a batch");
        $("#classBatchId").focus();
        return;

    }if (!address) {
        alert("please enter address");
        $("#address").focus();
        return;
    }

    if (selectedSubjects.length === 0) {
        alert("Please select at least one subject");
        return;
    }

    let studentData={
        studentId:studentId,
        studentName:studentName,
        studentUsername:username,
        studentPassword:password,
        email:email,
        contact:contact,
        address:address,
        subjectId:selectedSubjects,
        classBatchId:classBatchId

    }
    updateStudent(studentData).done(function (response){
        console.log("Sucess")
        closeAddStudentModal();
        loadAllStudents();
        clearBtn();
    }).fail(function (error){
        console.log("not savesd")
    });
}

function clearBtn(){
    $("#studentName").val("");
    $("#studentUsername").val("");
    $("#email").val("");
    $("#contact").val("");
    $("#address").val("");
    $("#studentPassword").val("");
    $("#subjectContainer").val("");
}

function loadLastRecentStudent(){
    let recentStudents = studentList.slice(-4);
    let container = $("#recentlyAddedContainer");
    container.empty();
    recentStudents.forEach(function (student){
        let initial = student.studentName.charAt(0).toUpperCase();

        container.append(`
                    <div class="list-row">

                        <div class="list-icon">
                            ${initial}
                        </div>

                        <div class="list-body">
                            <p class="list-title">
                                ${student.studentName}
                            </p>

                            <p class="list-meta">
                                ${student.batchName} · ${student.subjectStudent.join(", ")}
                            </p>
                        </div>

                        <div class="list-time">
                            Today
                        </div>

                    </div>
                `);
    });

}

function loadStudentCount(){
    let totalStudentCard=$("#totalStudentCard");
    totalStudentCard.empty();
    totalStudentCard.append(`
    <div class="stat-top"><span class="stat-label">Total Students</span><span class="stat-icon" style="--tint:#E3EDFE;--tone:#3B82F6"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg></span></div>
                    <div class="stat-value">0${studentCount}</div>
                    <span class="stat-delta up"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 15l-6-6-6 6"/></svg>+18 this month</span>
    `)
}
function loadActiveStudents(){
    let activeStudentCard=$("#activeStudentCard");
    activeStudentCard.empty();

    activeStudentCard.append(`
    <div class="stat-top"><span class="stat-label">Active Students</span><span class="stat-icon" style="--tint:#DCF3EE;--tone:#16A38A"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="m8.5 12.5 2.5 2.5 5-5"/></svg></span></div>
                    <div class="stat-value">0${studentCount}</div>
                    <span class="stat-sub">80% of total students</span>`)
}

function loadActiveBatchCount(){
    let activeBatchCountCard=$("#activeBatchCount");
    activeBatchCountCard.empty();
    activeBatchCountCard.append(`<div class="stat-top"><span class="stat-label">Active Batches</span><span class="stat-icon" style="--tint:#EFE7FE;--tone:#8B5CF6"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18"/><path d="M8 2v4M16 2v4"/></svg></span></div>
                    <div class="stat-value">${activeBatchesCount}</div>
                    <span class="stat-sub">ex: 2026 A/L</span>`)

}

function loadInActiveStudentCard(){
    loadInActiveStudentCount().done(function (response){
        let inActiveStudentCount=$("#inactiveStudentCard");
        inActiveCount=response.body;
        let percentage=(response.body/studentCount)*100;
        inActiveStudentCount.empty();
        inActiveStudentCount.append(`<div class="stat-top"><span class="stat-label">Inactive Students</span><span class="stat-icon" style="--tint:#FBE4E6;--tone:#D94F5C"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="m17 8 5 5m0-5-5 5"/></svg></span></div>
                    <div class="stat-value">${response.body}</div>
                    <span class="stat-delta down"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg>${percentage} % of total students</span>
               `)
    }).fail(function (error){
        console.log("error")
    })

}