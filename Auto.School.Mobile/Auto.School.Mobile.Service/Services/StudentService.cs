using Auto.School.Mobile.ApiIntegration.Requests.Abstract;
using Auto.School.Mobile.Core.Constants;
using Auto.School.Mobile.Core.Models;
using Auto.School.Mobile.Core.Responses.Base;
using Auto.School.Mobile.Core.Responses.Student.ConnectWithInstructor;
using Auto.School.Mobile.Core.Responses.Student.GetInfoMe;
using Auto.School.Mobile.Core.Responses.Student.UpdateDrivingSkills;
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

            if (string.Compare(response.Status, ResponseStatuses.Sucess, true) == 0)
            {
                response.Data.Student.Email = response.Data.Email;
            }

            return response;
        }

        public async Task<GetInfoMeResponse> GetOne(string studentId)
        {
            var response = await _studentRequest.GetOne(studentId);

            if (string.Compare(response.Status, ResponseStatuses.Sucess, true) == 0)
            {
                response.Data.Student.Email = response.Data.Email;
            }

            return response;
        }

        public async Task<UpdateDrivingSkillsResponse> UpdateDrivingSkills(List<DrivingSkillModel> drivingSkillsModel)
        {
            var updateDrivingSkillsModel = new UpdateDrivingSkillsModel { DrivingSkills = drivingSkillsModel};
            var response = await _studentRequest.UpdateDrivingSkills(updateDrivingSkillsModel);
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
