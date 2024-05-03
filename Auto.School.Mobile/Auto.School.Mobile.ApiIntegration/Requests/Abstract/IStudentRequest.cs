﻿using Auto.School.Mobile.Core.Responses.Student.ConnectWithInstructor;

namespace Auto.School.Mobile.ApiIntegration.Requests.Abstract
{
    public interface IStudentRequest
    {
        public Task<ConnectWithInstructorResponse> ConnectWithInstructor(string instructorId);
    }
}