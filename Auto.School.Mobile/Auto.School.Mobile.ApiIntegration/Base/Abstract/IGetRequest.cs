﻿namespace Auto.School.Mobile.ApiIntegration.Base.Abstract
{
    public interface IGetRequest
    {
        public Task<TResponse> ExecuteAsync<TResponse>(string url);
    }
}
