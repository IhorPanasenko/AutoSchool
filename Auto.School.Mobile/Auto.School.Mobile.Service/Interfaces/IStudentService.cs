using Auto.School.Mobile.Core.Responses.Base;
using Auto.School.Mobile.Core.Responses.Student.ConnectWithInstructor;
using Auto.School.Mobile.Core.Responses.Student.GetInfoMe;

namespace Auto.School.Mobile.Service.Interfaces
{
    public interface IStudentService
    {
        public Task<ConnectWithInstructorResponse> ConnectWithInstructor(string instructorId);
        public Task<GetInfoMeResponse> GetInfoMe();
        public Task<BaseResponse> UpdateProfileImage(Stream imageStream);
    }
}
