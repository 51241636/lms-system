function uploadLessonPdf(formData){
    return $.ajax({
        url: "http://localhost:8080/v1/fileSave",
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('JWT')
        }
    });
}

function getLessonPdfList(lessonId){
    return $.ajax({
        url: "http://localhost:8080/v1/fileSave/" + lessonId,
        type: "GET",
        contentType: 'application/json',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('JWT')
        }
    });
}
function getLessonPdfDetail(lessonPdfId){
    return $.ajax({
        url: "http://localhost:8080/v1/fileSave/lessonPdfDetailById/" + lessonPdfId,
        type: "GET",
        contentType: 'application/json',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('JWT')
        }
    });
}

function updatesavedLesson(formData){
    return $.ajax({
        url: "http://localhost:8080/v1/fileSave",
        type: "PUT",
        data: formData,
        processData: false,
        contentType: false,
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('JWT')
        }
    });
}
function deletesavedLesson(lessonPdfId){
    return $.ajax({
        url: "http://localhost:8080/v1/fileSave/" + lessonPdfId,
        type: "DELETE",
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('JWT')
        }
    });
}

function downloadPdf(lessonPdfId){
    return $.ajax({
        url: "http://localhost:8080/v1/fileSave/downloadPdf/" + lessonPdfId,
        type: "GET",
        xhrFields: {
            responseType: "blob"
        },
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('JWT')
        }
    });
}