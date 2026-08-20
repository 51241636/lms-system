function initsubjectRelateStudentManageRelatedBatch(){
    loadAllStudents();
}







let studentCount=0;
let studentList=[];
function loadAllStudents(){


    getAllSubjectRelatedStudents(localStorage.getItem("subjectId")).done(function(response){
        $("#studentTBody").empty();
        studentList.length=0;
        for (const responseElement of response.body) {
            const studentId = responseElement.studentId;
            const studentName = responseElement.studentName;
            const studentUsername = responseElement.studentUsername;
            const email = responseElement.email;
            const contact = responseElement.contact;
            const address = responseElement.address;
            const batchName = responseElement.batchName;

            let data =  `<tr> <td class="id-tag">${studentId}</td>
                            <td class="cell-person">
                                <span class="person-avatar" style="background:#3B82F6">${studentName.charAt(0)}</span>
                                <span>${studentName}<span class="cell-sub">${email}</span></span>
                            </td>
                            <td class="num">${contact}</td>
                            <td class="address">${address}</td>                       
                            <td>${batchName}</td>
                            <td><span class="pill pill-a">Active</span></td>
                            <td>
                                <div class="row-actions">
                                    <button aria-label="Edit" id="editBtn" data-id="${studentId}" class="editBtn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg></button>
                                    <button aria-label="Delete" class="danger" data-id="${studentId}" ><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6"/></svg></button>
                                </div>
                            </td>
                                   </tr>`

            $("#studentTBody").append(data);
            studentList.push(responseElement);
            studentCount +=1;

        }
        loadRecentStudentList();
        cardsLoad();

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

let studentId;
let batchId;
$(document).on("click",".editBtn",function (){
    studentId = $(this).data("id");
        console.log(studentId);
    getUpdateStudentById(studentId).done(function (response){
        let student = response.body;
        $("#editStudentModal").addClass("active");
        $("body").addClass("modal-open");
        $("#editStudentName").val(student.studentName);
        $("#editStudentUsername").val(student.studentUsername);
        $("#editEmail").val(student.email);
        $("#editContact").val(student.contact);
        $("#editAddress").val(student.address);
        batchId=student.batchDTO.classBatchId;

        $("#editClassBatchId").val(batchId);
        let container=$("#editSubjectContainer")
        container.empty();

        student.subjectStudent.forEach(function (subject){
            container.append(`
                   <label class="subject-toggle" >
                                            <input type="checkbox" name="subjectId" value=${subject.subjectId} checked disabled>
                                            <span class="st-swatch st-econ"></span>
                                            <span class="st-name">${subject.subjectName}</span>
                                            <span class="st-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6 9 17l-5-5"/></svg></span>
                                        </label>`)
            // selectedSubjects.push(subject.subjectId)
        })


    });

})

function openAddStudentModal() {
    $("#editStudentModal").addClass("active");
    $("body").addClass("modal-open");
}

function closeAddStudentModal() {
    $("#editStudentModal").removeClass("active");
    $("body").removeClass("modal-open");
}


function studentUpdate(){
    let studentName= $("#editStudentName").val().trim();
    let username = $("#editStudentUsername").val().trim();
    let email= $("#editEmail").val().trim();
    let contact= $("#editContact").val().trim();
    let classBatchId= batchId;
    let address=$("#editAddress").val().trim().trim();

    if (!studentName) {
        alert("Please enter student name");
        $("#editStudentName").focus();
        return;
    }

    if (!username) {
        alert("Please enter username");
        $("#editStudentUsername").focus();
        return;
    }

    if (!email) {
        alert("Please enter email");
        $("#editEmail").focus();
        return;
    }

    if (!contact) {
        alert("Please enter contact number");
        $("#editContact").focus();
        return;
    }


    if (!address) {
        alert("please enter address");
        $("#editAddress").focus();
        return;
    }


    let studentData={
        studentId:studentId,
        studentName:studentName,
        studentUsername:username,
        studentPassword:null,
        email:email,
        contact:contact,
        address:address,
        classBatchId:classBatchId

    }
    updateStudentData(studentData).done(function (response){
        console.log("Sucess")
        closeAddStudentModal();
        loadAllStudents();
        clearBtn();
        toastr.success(
            "student  updated successfully",
            "update successfully"
        );

    }).fail(function (xhr){
        clearBtn();
        if (xhr.status === 401 || xhr.status === 404) {

            toastr.error(
                "student not updated",
                "update Failed"
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

function clearBtn(){
    $("#editStudentName").val("");
    $("#editStudentUsername").val("");
    $("#editEmail").val("");
    $("#editContact").val("");
    $("#editAddress").val("");
}

function loadRecentStudentList(){
    let recentStudents = studentList.slice(-4);
    let container = $("#recentlyUpdatedContainer");
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
                                ${student.batchName} 
                            </p>
                        </div>

                        <div class="list-time">
                            Today
                        </div>

                    </div>
                `);
    });
}

function cardsLoad(){
    let totalStudentCard=$("#myStudentCard");
    let activeStudentCard=$("#myActiveCard");
    totalStudentCard.empty();
    activeStudentCard.empty();
    totalStudentCard.append(`
    <div class="stat-top"><span class="stat-label">My Students</span><span class="stat-icon" style="--tint:#E3EDFE;--tone:#3B82F6"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg></span></div>
                    <div class="stat-value">0${studentCount}</div>
                    <span class="stat-sub">Across Economics &amp; ICT</span>`)
    activeStudentCard.append(`
    <div class="stat-top"><span class="stat-label">Active Students</span><span class="stat-icon" style="--tint:#DCF3EE;--tone:#16A38A"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="m8.5 12.5 2.5 2.5 5-5"/></svg></span></div>
                    <div class="stat-value">0${studentCount}</div>
                    <span class="stat-sub">96% of your students</span>`)


}
