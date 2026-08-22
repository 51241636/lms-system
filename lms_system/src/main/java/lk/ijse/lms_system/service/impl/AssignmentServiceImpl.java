package lk.ijse.lms_system.service.impl;

import jakarta.servlet.http.HttpServletResponse;
import lk.ijse.lms_system.dto.AssignmentDTO;
import lk.ijse.lms_system.dto.LessonPdfDTO;
import lk.ijse.lms_system.dto.response.GetLessonAssignmentDetailDTO;
import lk.ijse.lms_system.dto.response.GetLessonPdfDetails;
import lk.ijse.lms_system.entity.Assignment;
import lk.ijse.lms_system.entity.Lesson;
import lk.ijse.lms_system.entity.LessonPDF;
import lk.ijse.lms_system.exception.LmsSystemException;
import lk.ijse.lms_system.repository.AssignmentRepository;
import lk.ijse.lms_system.repository.LessonRepository;
import lk.ijse.lms_system.service.AssignmentService;
import lk.ijse.lms_system.status.AssignmentStatus;
import lk.ijse.lms_system.status.LessonContentStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
@Service
@RequiredArgsConstructor
public class AssignmentServiceImpl implements AssignmentService {
    private final AssignmentRepository assignmentRepository;
    private final LessonRepository lessonRepository;
    private final PdfStorageServiceImpl pdfStorageService;
    @Override
    public void addAssignment(AssignmentDTO assignmentDTO)throws IOException {
        try{
            Optional<Lesson> lessonById = lessonRepository.findById(assignmentDTO.getLessonId());
            if(lessonById.isEmpty()){
                throw new LmsSystemException(404,"Lesson not found");
            }


            if(assignmentDTO.getAssignmentPdfFile().isEmpty()){
                throw new LmsSystemException(404,"lessonPdf is empty");
            }
            if(!"application/pdf".equals(assignmentDTO.getAssignmentPdfFile().getContentType())){
                throw new LmsSystemException(404,"lessonPdf is not a PDF");
            }
            String savedPdf = pdfStorageService.savePdf(assignmentDTO.getAssignmentPdfFile());
            if(savedPdf.isEmpty()){
                throw new LmsSystemException(404,"savedPdf is empty");
            }
            Assignment assignment=new Assignment();
            assignment.setAssignmentName(assignmentDTO.getAssignmentName());
            assignment.setAssignmentDescription(assignmentDTO.getAssignmentDescription());
            assignment.setFileName(assignmentDTO.getAssignmentPdfFile().getOriginalFilename());
            assignment.setFilePath(savedPdf);
            assignment.setFileContentType(assignmentDTO.getAssignmentPdfFile().getContentType());
            assignment.setFileSize(assignmentDTO.getAssignmentPdfFile().getSize());
            assignment.setStartDate(LocalDate.now());
            assignment.setDeadline(assignmentDTO.getDeadline());
            assignment.setMaximumMarks(assignmentDTO.getMaximumMarks());
            assignment.setLesson(lessonById.get());
            assignment.setAssignmentStatus(AssignmentStatus.ACTIVE);
            assignmentRepository.save(assignment);


        }catch (Exception e){
            throw e;
        }
    }

    @Override
    public List<GetLessonAssignmentDetailDTO> getAssignmentByLessonId(Integer lessonId) {
        try{
            List<Assignment> lessonAssignmentById = assignmentRepository.getLessonAssignmentById(lessonId);
            if(lessonAssignmentById.isEmpty()){
                throw new LmsSystemException(404,"Lesson related assignment not found");
            }
            List<GetLessonAssignmentDetailDTO> lessonAssignmentDTOList=new ArrayList<>();
            for(Assignment assignment:lessonAssignmentById){
                if(assignment.getAssignmentStatus().equals(AssignmentStatus.ACTIVE)){
                    lessonAssignmentDTOList.add(new GetLessonAssignmentDetailDTO(assignment.getAssignmentId(),assignment.getAssignmentName(), assignment.getAssignmentDescription(), assignment.getDeadline(),assignment.getStartDate(),assignment.getMaximumMarks()));

                }
            }
            return lessonAssignmentDTOList;



        }catch (Exception e){
            throw e;
        }
    }


    @Override
    public Resource downloadSelectedAssignment(Long assignmentId, HttpServletResponse response) throws MalformedURLException {
        try{
            Optional<Assignment> assignmentById = assignmentRepository.findById(assignmentId);
            if(assignmentById.isEmpty()){
                throw new LmsSystemException(404,"Lesson related assignment not found");
            }
            lk.ijse.lms_system.entity.Assignment assignment = assignmentById.get();
            response.setHeader(
                    HttpHeaders.CONTENT_DISPOSITION,
                    "inline; filename=\"" +/* use pdf download*/
                            assignment.getFileName() +
                            "\""
            );
            Path path = Paths.get(assignment.getFilePath());
            org.springframework.core.io.Resource resource =
                    new UrlResource(path.toUri());
            if (!resource.exists() ||
                    !resource.isReadable()) {

                throw new LmsSystemException(
                        404,
                        "assignment file not found"
                );
            }
            return resource;



        } catch (Exception e) {
            throw e;
        }
    }


    @Override
    public void updateLessonAssignment(AssignmentDTO assignmentDTO) throws IOException {
        try{
            Optional<Lesson> lessonById = lessonRepository.findById(assignmentDTO.getLessonId());
            if(lessonById.isEmpty()){
                throw new LmsSystemException(404,"Lesson not found");
            }
            Optional<Assignment> assignmentById = assignmentRepository.findById(assignmentDTO.getAssignmentId());
            if(assignmentById.isEmpty()){
                throw new LmsSystemException(404,"related lesson assignment not found");
            }


            lk.ijse.lms_system.entity.Assignment assignment = assignmentById.get();
            assignment.setAssignmentName(assignmentDTO.getAssignmentName());
            assignment.setAssignmentDescription(assignmentDTO.getAssignmentDescription());
            assignment.setStartDate(LocalDate.now());
            assignment.setDeadline(assignmentDTO.getDeadline());
            assignment.setMaximumMarks(assignmentDTO.getMaximumMarks());
            assignment.setLesson(lessonById.get());
            assignment.setAssignmentStatus(AssignmentStatus.ACTIVE);
            System.out.println(assignmentDTO.getAssignmentPdfFile());


            if(assignmentDTO.getAssignmentPdfFile() != null){
                if(assignmentDTO.getAssignmentPdfFile().isEmpty()){
                    throw new LmsSystemException(404,"assignment is empty");
                }
                if(!"application/pdf".equals(assignmentDTO.getAssignmentPdfFile().getContentType())){
                    throw new LmsSystemException(404,"assignment is not a PDF");
                }
                String savedPdf = pdfStorageService.savePdf(assignmentDTO.getAssignmentPdfFile());
                if(savedPdf.isEmpty()){
                    throw new LmsSystemException(404,"assignment is empty");
                }




                assignment.setFileName(assignmentDTO.getAssignmentPdfFile().getOriginalFilename());
                assignment.setFilePath(savedPdf);
                assignment.setFileContentType(assignmentDTO.getAssignmentPdfFile().getContentType());
                assignment.setFileSize(assignmentDTO.getAssignmentPdfFile().getSize());

                assignmentRepository.save(assignment);
            }else {
                assignmentRepository.save(assignment);
            }






        }catch (Exception e){
            throw e;
        }
    }

    @Override
    public void deleteLessonAssignment(Long assignmentId) {
        try{
            Optional<Assignment> assignmentById = assignmentRepository.findById(assignmentId);
            if(assignmentById.isEmpty()){
                throw new LmsSystemException(404,"related lesson assignmentById  not found");
            }
            Assignment assignment= assignmentById.get();
            assignment.setAssignmentStatus(AssignmentStatus.INACTIVE);
            assignmentRepository.save(assignment);
        }catch (Exception e){
            throw e;
        }
    }

    @Override
    public GetLessonAssignmentDetailDTO getAssignmentById(Long assignmentId) {
        try{
            Optional<Assignment> assignmentById = assignmentRepository.findById(assignmentId);
            if(assignmentById.isEmpty()){
                throw new LmsSystemException(404,"assignment not found");
            }
            lk.ijse.lms_system.entity.Assignment assignment =assignmentById.get();
            return  new GetLessonAssignmentDetailDTO(assignment.getAssignmentId(),assignment.getAssignmentName(), assignment.getAssignmentDescription(), assignment.getDeadline(),assignment.getStartDate(),assignment.getMaximumMarks());

        }catch (Exception e){
            throw  e;
        }
    }

}
