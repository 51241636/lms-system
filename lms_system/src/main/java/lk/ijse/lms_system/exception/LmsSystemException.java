package lk.ijse.lms_system.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LmsSystemException extends RuntimeException {
    private int status;
    private String message;
}
