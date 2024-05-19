using Auto.School.Mobile.Core.Responses.Instructor;
using Auto.School.Mobile.Core.Responses.Instructor.GetOne;

namespace Auto.School.Mobile.ApiIntegration.Requests.Abstract
{
    public interface IInstructorRequest
    {
        public Task<GetAllInstructorsResponse> GetAll();
        public Task<GetOneInstructorResponse> GetOne(string id);
    }
}
