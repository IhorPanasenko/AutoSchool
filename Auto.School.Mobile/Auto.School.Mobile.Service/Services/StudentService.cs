using Auto.School.Mobile.ApiIntegration.Requests.Abstract;
using Auto.School.Mobile.Core.Responses.Student.ConnectWithInstructor;
using Auto.School.Mobile.Service.Interfaces;

namespace Auto.School.Mobile.Service.Services
{
    public class StudentService(IStudentRequest studentRequest) : IStudentService
    {
        private readonly IStudentRequest _studentRequest = studentRequest;

        public Task<ConnectWithInstructorResponse> ConnectWithInstructor(string instructorId)
        {
            var response = _studentRequest.ConnectWithInstructor(instructorId);
            return response;
        }
    }
}
