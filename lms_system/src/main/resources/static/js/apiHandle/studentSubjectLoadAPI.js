function getAllStudentRelateSubject(studentId,batchId) {
    return  $.ajax({
        url: "http://localhost:8080/v1/student/getStudentRelatedSubjectDetails",
        type: "GET",

        headers: {
            "Authorization": "Bearer " + localStorage.getItem("JWT")
        },

        data: {
            studentId: studentId,
            batchId:batchId,
        }
    });
}

function  loadStudentDetail(studentId){
    return $.ajax({
        url: "http://localhost:8080/v1/student/getStudentById/" + studentId,
        type: "GET",
        contentType: 'application/json',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('JWT')
        }
    });
}
