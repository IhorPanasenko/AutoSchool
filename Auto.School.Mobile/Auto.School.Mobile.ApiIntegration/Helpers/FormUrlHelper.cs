﻿namespace Auto.School.Mobile.ApiIntegration.Helpers
{
    public static class FormUrlHelper
    {
        public static string InsertIdIntoUrl(string url, string id)
        {
            const string placeholder = "//";
            if (url.Contains(placeholder))
            {
                int index = url.IndexOf(placeholder) + 1;
                return url.Substring(0, index) + id + "/"+url.Substring(index + 1);
            }
            return url;
        }
    }
}
