function studentLogin(obj){
   return $.ajax({
       url: "http://localhost:8080/v1/student/loginStudent",
       type: 'POST',
       contentType: 'application/json',
       data: obj,
   });
}