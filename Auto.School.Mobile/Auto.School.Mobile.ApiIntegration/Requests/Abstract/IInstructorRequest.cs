using Auto.School.Mobile.Core.Responses.Instructor;

namespace Auto.School.Mobile.ApiIntegration.Requests.Abstract
{
    public interface IInstructorRequest
    {
        public Task<GetAllInstructorsResponse> GetAll();
    }
}
