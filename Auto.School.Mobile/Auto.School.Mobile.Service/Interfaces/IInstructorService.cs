using Auto.School.Mobile.Core.Responses.Instructor;

namespace Auto.School.Mobile.Service.Interfaces
{
    public interface IInstructorService
    {
        public Task<GetAllInstructorsResponse> GetAll();

        public Task<bool> SignUpToInstructor();
    }
}
