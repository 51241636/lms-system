function getAllBatches(){
    return $.ajax({
        url: "http://localhost:8080/v1/classBatch",
        type: "GET",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("JWT")
        }
    });
}

function selectedBatchRelatedSubject(selectedBatchId){
    return $.ajax({
        url: "http://localhost:8080/v1/subjectBatch/subjects/"+selectedBatchId,
        type: "GET",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("JWT")
        }
    });

}

function addStudent(studentData){
    return $.ajax({
        url: "http://localhost:8080/v1/student/registerStudent",
        type: "POST",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("JWT")
        },
        data:JSON.stringify(studentData),
        contentType:'application/json'
    });
}
function updateStudent(studentData){
    return $.ajax({
        url: "http://localhost:8080/v1/student",
        type: "PUT",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("JWT")
        },
        data:JSON.stringify(studentData),
        contentType:'application/json'
    });
}

function getAllStudents(){
   return $.ajax({
        url: "http://localhost:8080/v1/student",
        type: "GET",
        contentType: "application/json",
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('JWT')
        }
    });
}

function  getStudentById(studentId){
    return $.ajax({
        url: "http://localhost:8080/v1/student/getStudentById/" + studentId,
        type: "GET",
        contentType: 'application/json',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('JWT')
        }
    });
}

function loadInActiveStudentCount(){
    return $.ajax({
        url: "http://localhost:8080/v1/student/getInActiveStudentCount",
        type: "GET",
        contentType: 'application/json',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('JWT')
        }
    });
}

function studentDelete(deleteStudentId){
    return $.ajax({
        url: "http://localhost:8080/v1/student/" + deleteStudentId,
        type: "DELETE",
        contentType: 'application/json',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('JWT')
        }
    });
}

function searchUser(searchName){
  return  $.ajax({
        url: "http://localhost:8080/v1/student/filterStudent",
        type: "GET",

        headers: {
            "Authorization": "Bearer " + localStorage.getItem("JWT")
        },

        data: {
            userName: searchName,
            subjectName:searchName,
            contact:searchName,
        }
    });
}