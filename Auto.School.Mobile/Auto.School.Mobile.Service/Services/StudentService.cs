using Auto.School.Mobile.ApiIntegration.Requests.Abstract;
using Auto.School.Mobile.Core.Models;
using Auto.School.Mobile.Core.Responses.Base;
using Auto.School.Mobile.Core.Responses.Student.ConnectWithInstructor;
using Auto.School.Mobile.Core.Responses.Student.GetInfoMe;
using Auto.School.Mobile.Core.Responses.Student.UpdateMe;
using Auto.School.Mobile.Service.Interfaces;

namespace Auto.School.Mobile.Service.Services
{
    public class StudentService(IStudentRequest studentRequest) : IStudentService
    {
        private readonly IStudentRequest _studentRequest = studentRequest;

        public async Task<ConnectWithInstructorResponse> ConnectWithInstructor(string instructorId)
        {
            var response = await _studentRequest.ConnectWithInstructor(instructorId);
            return response;
        }

        public async Task<GetInfoMeResponse> GetInfoMe()
        {
            var response = await _studentRequest.GetInfoMe();
            return response;
        }

        public async Task<UpdateMeResponse> UpdateMe(UpdateUserMeModel updateMeModel)
        {
            var response = await _studentRequest.UpdateMe(updateMeModel);
            return response;
        }

        public async  Task<BaseResponse> UpdateProfileImage(Stream imageStream)
        {
            var response = await _studentRequest.UpdateProfileImage(imageStream);
            return response;
        }
    }
}
