package lk.ijse.lms_system.exception;

import lk.ijse.lms_system.constant.CommonResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
@Slf4j
public class AppExceptionHandler extends ResponseEntityExceptionHandler {
    @ExceptionHandler(value = {Exception.class})
    public ResponseEntity<CommonResponse> handleServerException(Exception ex, WebRequest request) {
        log.error(ex.getMessage(), ex);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new CommonResponse(500,"Internal Server Error"));
    }
    @ExceptionHandler(value = {LmsSystemException.class})
    public ResponseEntity<CommonResponse> handleRuntimeException(LmsSystemException ex, WebRequest request) {
        log.error(ex.getMessage(), ex);
        return ResponseEntity.status(ex.getStatus()).body(new CommonResponse(ex.getStatus(),ex.getMessage()));
    }
}
