using Auto.School.Mobile.ApiIntegration.Requests.Abstract;
using Auto.School.Mobile.Core.Responses.Instructor;
using Auto.School.Mobile.Core.Responses.Instructor.GetOne;
using Auto.School.Mobile.Core.Responses.Instructor.GetSchedule;
using Auto.School.Mobile.Service.Interfaces;

namespace Auto.School.Mobile.Service.Services
{
    public class InstructorService(IInstructorRequest instructorRequest) : IInstructorService
    {
        private readonly IInstructorRequest _instructorRequest = instructorRequest;

        public async Task<GetAllInstructorsResponse> GetAll()
        {
            var response = await _instructorRequest.GetAll();

            if (response.Instructors is null)
            {
                response.Status = "Fail";
                response.Message = "";
            }

            return response;
        }

        public async Task<GetOneInstructorResponse> GetOne(string id)
        {
            var response = await _instructorRequest.GetOne(id);
            return response;
        }

        public async Task<GetScheduleResponse> GetSchedule(string id)
        {
            var response = await _instructorRequest.GetSchedule(id);
            return response;
        }
    }
}
