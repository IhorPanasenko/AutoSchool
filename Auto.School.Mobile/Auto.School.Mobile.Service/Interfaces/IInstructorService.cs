using Auto.School.Mobile.Core.Responses.Instructor;
using Auto.School.Mobile.Core.Responses.Instructor.GetOne;

namespace Auto.School.Mobile.Service.Interfaces
{
    public interface IInstructorService
    {
        public Task<GetAllInstructorsResponse> GetAll();

        public Task<GetOneInstructorResponse> GetOne(string id);
    }
}
