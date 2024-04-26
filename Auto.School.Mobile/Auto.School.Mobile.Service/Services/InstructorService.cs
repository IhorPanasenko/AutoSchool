using Auto.School.Mobile.ApiIntegration.Requests;
using Auto.School.Mobile.Core.Responses.Instructor;
using Auto.School.Mobile.Service.Interfaces;

namespace Auto.School.Mobile.Service.Services
{
    public class InstructorService : IInstructorService
    {
       
        public async Task<GetAllInstructorsResponse> GetAll()
        {
            var response = await InstructorRequests.GetAll();

            if (response.Instructors is null)
            {
                response.Status = "Fail";
                response.Message = "";
            }

            return response;
        }
    }
}
