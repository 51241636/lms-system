function getAllSubjectBatches() {
    return $.ajax({
        url: "http://localhost:8080/v1/subjectBatch/getAllSubjectBatch",
        type: "GET",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("JWT")
        }
    });
}
function getAllLessons() {
    return $.ajax({
        url: "http://localhost:8080/v1/lesson",
        type: "GET",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("JWT")
        }
    });
}


function addLesson(lessonData){
    return $.ajax({
        url: "http://localhost:8080/v1/lesson",
        type: "POST",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("JWT")
        },
        data: JSON.stringify(lessonData),
        contentType: 'application/json'
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

function getFilterLesson(subjectName){
    return  $.ajax({
        url: "http://localhost:8080/v1/lesson/filterLesson",
        type: "GET",

        headers: {
            "Authorization": "Bearer " + localStorage.getItem("JWT")
        },

        data: {
            subjectName:subjectName
        }
    });
}
function lessonDelete(deleteLessonId){
    return $.ajax({
        url: "http://localhost:8080/v1/lesson/" + deleteLessonId,
        type: "DELETE",
        contentType: 'application/json',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('JWT')
        }
    });
}


