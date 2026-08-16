function addBatch(batchData){
    return $.ajax({
        url: "http://localhost:8080/v1/classBatch",
        type: "POST",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("JWT")
        },
        data: JSON.stringify(batchData),
        contentType: 'application/json'
    });
}

function getAllBatch() {
    return $.ajax({
        url: "http://localhost:8080/v1/classBatch",
        type: "GET",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("JWT")
        }
    });
}


function batchDelete(deleteBatchId){
    return $.ajax({
        url: "http://localhost:8080/v1/classBatch/" + deleteBatchId,
        type: "DELETE",
        contentType: 'application/json',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('JWT')
        }
    });
}
//
function getBatchById(batchId){
    return $.ajax({
        url: "http://localhost:8080/v1/classBatch/batchById/" + batchId,
        type: "GET",
        contentType: 'application/json',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('JWT')
        }
    });

}
function updateBatch(batchData){
    return $.ajax({
        url: "http://localhost:8080/v1/classBatch",
        type: "PUT",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("JWT")
        },
        data: JSON.stringify(batchData),
        contentType: 'application/json'
    });
}

function searchBatch(batchName){
    return  $.ajax({
        url: "http://localhost:8080/v1/classBatch/filterBatch",
        type: "GET",

        headers: {
            "Authorization": "Bearer " + localStorage.getItem("JWT")
        },

        data: {
            batchName: batchName,
        }
    });
}