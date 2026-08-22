function getLessonAssignemntList(lessonId){
    return $.ajax({
        url: "http://localhost:8080/v1/assignment/" + lessonId,
        type: "GET",
        contentType: 'application/json',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('JWT')
        }
    });
}

function addAssignment(assignmentData){
    return $.ajax({
        url: "http://localhost:8080/v1/assignment",
        type: "POST",
        data: assignmentData,
        processData: false,
        contentType: false,
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('JWT')
        }
    })
}

function updateAssignment(assignmentData){
    return $.ajax({
        url: "http://localhost:8080/v1/assignment",
        type: "PUT",
        data: assignmentData,
        processData: false,
        contentType: false,
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('JWT')
        }
    })
}

function deleteAssignment(deleteAssignmentId){
    return $.ajax({
        url: "http://localhost:8080/v1/assignment/"+deleteAssignmentId,
        type: "DELETE",
        contentType: 'application/json',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('JWT')
        }
    })
}

function getAssignmentDetail(assignmentId){
    return $.ajax({
        url: "http://localhost:8080/v1/assignment/getAssignmentById/" + assignmentId,
        type: "GET",
        contentType: 'application/json',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('JWT')
        }
    });
}

function viewAssignment(assignmentId){
    return $.ajax({
        url: "http://localhost:8080/v1/assignment/downloadAssignment/" + assignmentId,
        type: "GET",
        xhrFields: {
            responseType: "blob"
        },
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('JWT')
        }
    });
}