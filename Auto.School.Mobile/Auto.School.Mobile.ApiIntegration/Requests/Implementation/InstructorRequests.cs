﻿using Auto.School.Mobile.ApiIntegration.Base.Abstract;
using Auto.School.Mobile.ApiIntegration.Constants;
using Auto.School.Mobile.ApiIntegration.Helpers;
using Auto.School.Mobile.ApiIntegration.Requests.Abstract;
using Auto.School.Mobile.ApiIntegration.Servicecs.Abstract;
using Auto.School.Mobile.Core.Constants;
using Auto.School.Mobile.Core.Responses.Instructor;
using Auto.School.Mobile.Core.Responses.Instructor.GetOne;
using Auto.School.Mobile.Core.Responses.Instructor.GetSchedule;

namespace Auto.School.Mobile.ApiIntegration.Requests.Implementation
{
    public class InstructorRequests(IGetRequest getRequest, ITokenExpirationService tokenExpirationService) : IInstructorRequest
    {
        private readonly IGetRequest _getRequest = getRequest;
        private readonly ITokenExpirationService _tokenExpirationService = tokenExpirationService;

        public async Task<GetAllInstructorsResponse> GetAll()
        {
            var instructorsResponse = await _getRequest.ExecuteAsync<GetAllInstructorsResponse>(RoutesConstants.GetAllInstructors);

            if (instructorsResponse.Status is null)
            {
                instructorsResponse.Status = ResponseStatuses.Fail;
                instructorsResponse.Instructors = [];
            }

            return instructorsResponse;
        }

        public async Task<GetOneInstructorResponse> GetInfoMe()
        {
            _tokenExpirationService.TryRefreshToken();
            var response = await _getRequest.ExecuteAsync<GetOneInstructorResponse>(RoutesConstants.InstructorGetInfoMe);
            return response;
        }

        public async Task<GetOneInstructorResponse> GetOne(string id)
        {
            var response = await _getRequest.ExecuteAsync<GetOneInstructorResponse>($"{RoutesConstants.GetOneInstructor}{id}");
            return response;
        }

        public async Task<GetScheduleResponse> GetSchedule(string id)
        {
            _tokenExpirationService.TryRefreshToken();
            var url = FormUrlHelper.InsertIdIntoUrl(RoutesConstants.GetSchedule, id);
            var response = await _getRequest.ExecuteAsync<GetScheduleResponse>(url);
            return response;
        }
    }
}
