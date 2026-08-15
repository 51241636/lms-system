function addSubject(subjectData){
    return $.ajax({
        url: "http://localhost:8080/v1/subject",
        type: "POST",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("JWT")
        },
        data:JSON.stringify(subjectData),
        contentType:'application/json'
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

function subjectDelete(deleteSubjectId){
    return $.ajax({
        url: "http://localhost:8080/v1/subject/" + deleteSubjectId,
        type: "DELETE",
        contentType: 'application/json',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('JWT')
        }
    });
}

function  getSubjectById(subjectId){
    return $.ajax({
        url: "http://localhost:8080/v1/subject/subjectById/" + subjectId,
        type: "GET",
        contentType: 'application/json',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('JWT')
        }
    });
}

function updateSubject(subjectData){
    return $.ajax({
        url: "http://localhost:8080/v1/subject",
        type: "PUT",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("JWT")
        },
        data:JSON.stringify(subjectData),
        contentType:'application/json'
    });
}

function loadCountOfStudent(){
    return $.ajax({
        url: "http://localhost:8080/v1/subjectBatch/studentCount",
        type: "GET",
        contentType: "application/json",
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('JWT')
        }
    });
}


