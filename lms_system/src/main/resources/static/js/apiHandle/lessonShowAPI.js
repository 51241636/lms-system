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