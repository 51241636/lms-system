function getBatchList(subjectId){
    return $.ajax({
        url: "http://localhost:8080/v1/subjectBatch/batchList/"+ subjectId,
        type: "GET",
        contentType: "application/json",
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('JWT')
        }
    });
}

function getBatchRelatedSubjectDetail(subjectId){
    return $.ajax({
        url: "http://localhost:8080/v1/subjectBatch/teacherSubjectName/"+ subjectId,
        type: "GET",
        contentType: "application/json",
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('JWT')
        }
    });
}

