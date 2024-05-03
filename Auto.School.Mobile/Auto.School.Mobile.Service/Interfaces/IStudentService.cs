using Auto.School.Mobile.Core.Responses.Student.ConnectWithInstructor;

namespace Auto.School.Mobile.Service.Interfaces
{
    public interface IStudentService
    {
        public Task<ConnectWithInstructorResponse> ConnectWithInstructor(string instructorId);
    }
}
