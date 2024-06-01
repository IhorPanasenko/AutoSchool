using Auto.School.Mobile.Core.Models;
using Auto.School.Mobile.Core.Responses.Base;
using Auto.School.Mobile.Core.Responses.Student.ConnectWithInstructor;
using Auto.School.Mobile.Core.Responses.Student.GetInfoMe;
using Auto.School.Mobile.Core.Responses.Student.UpdateDrivingSkills;
using Auto.School.Mobile.Core.Responses.Student.UpdateMe;

namespace Auto.School.Mobile.ApiIntegration.Requests.Abstract
{
    public interface IStudentRequest
    {
        public Task<ConnectWithInstructorResponse> ConnectWithInstructor(string instructorId);
        public Task<GetInfoMeResponse> GetInfoMe();
        public Task<BaseResponse> UpdateProfileImage(Stream stream);
        public Task<UpdateMeResponse> UpdateMe(UpdateUserMeModel updateMeModel);
        public Task<UpdateDrivingSkillsResponse> UpdateDrivingSkills(UpdateDrivingSkillsModel updateDrivingSkillsModel);
        public Task<GetInfoMeResponse> GetOne(string studentId);
    }
}
