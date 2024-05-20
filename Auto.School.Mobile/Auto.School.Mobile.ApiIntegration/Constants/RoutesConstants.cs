namespace Auto.School.Mobile.ApiIntegration.Constants
{
    public static class RoutesConstants
    {
        public const string BaseUrl = "http://10.0.2.2:3000/api/";
        public const string GetAllUsers = "users";

        #region Auth
        public const string Login = "auth/login";
        public const string Register = "auth/signup";
        public const string ForgotPassword = "auth/forgotPassword";
        public const string UpdatePassword = "auth/updateMyPassword";
        #endregion

        #region Student
        public const string GetInfoMe = "students/me";
        public const string StudentSignUpToInstructor = "students/request-instructor";
        public const string UpdatePhoto = "students/updateMyPhoto";
        #endregion

        #region City
        public const string GetAllCities = "cities";
        #endregion

        #region Instructor
        public const string GetAllInstructors = "instructors";
        public const string GetOneInstructor = "instructors/";
        #endregion
    }
}
