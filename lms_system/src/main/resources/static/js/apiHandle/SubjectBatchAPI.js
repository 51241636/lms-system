function getAllBatch() {
    return $.ajax({
        url: "http://localhost:8080/v1/classBatch",
        type: "GET",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("JWT")
        }
    });
}

function getAllSubject(){
    return $.ajax({
        url: "http://localhost:8080/v1/subject",
        type: "GET",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("JWT")
        }
    });
}


function addSubjectBatch(subjectBatchData){
    return $.ajax({
        url: "http://localhost:8080/v1/subjectBatch",
        type: "POST",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("JWT")
        },
        data:JSON.stringify(subjectBatchData),
        contentType:'application/json'
    });
}

function getSubjectsByBatch(batchId){
    return $.ajax({
        url: "http://localhost:8080/v1/subjectBatch/subjects/"+batchId,
        type: "GET",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("JWT")
        }
    });
}
