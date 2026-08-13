$(document).ready(function () {

    loadBatches();
    loadAllStudents();



});
let isEditMode;
let selectedSubjects = [];
let studentList=[];
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
    }
        loadLastRecentStudent();

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

