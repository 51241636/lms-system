function getAllRelatedLesson(subjectClassId){
    return $.ajax({
        url: "http://localhost:8080/v1/lesson/getLessonBySubjectClassId/" + subjectClassId,
        type: "GET",
        contentType: 'application/json',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('JWT')
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