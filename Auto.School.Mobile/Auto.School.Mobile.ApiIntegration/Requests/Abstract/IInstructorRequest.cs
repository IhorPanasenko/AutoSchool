using Auto.School.Mobile.Core.Responses.Instructor;
using Auto.School.Mobile.Core.Responses.Instructor.GetOne;
using Auto.School.Mobile.Core.Responses.Instructor.GetSchedule;

namespace Auto.School.Mobile.ApiIntegration.Requests.Abstract
{
    public interface IInstructorRequest
    {
        public Task<GetAllInstructorsResponse> GetAll();
        public Task<GetOneInstructorResponse> GetOne(string id);

        public Task<GetScheduleResponse> GetSchedule(string id);
    }
}
