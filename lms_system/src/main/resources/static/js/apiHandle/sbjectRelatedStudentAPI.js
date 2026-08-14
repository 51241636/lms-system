function getAllSubjectRelatedStudents(subjectId){
    return $.ajax({
        url: "http://localhost:8080/v1/student/getSubjectRelatedStudents/" + subjectId,
        type: "GET",
        contentType: "application/json",
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('JWT')
        }
    });
}

function  getUpdateStudentById(studentId){
    return $.ajax({
        url: "http://localhost:8080/v1/student/getStudentById/" + studentId,
        type: "GET",
        contentType: 'application/json',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('JWT')
        }
    });
}
function updateStudentData(studentData){
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