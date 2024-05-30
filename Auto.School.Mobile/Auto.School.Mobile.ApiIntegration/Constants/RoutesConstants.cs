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
        public const string Logout = "auth/logout";
        public const string TokenRefresh = "auth/token";
        #endregion

        #region Student
        public const string GetInfoMe = "students/me";
        public const string StudentSignUpToInstructor = "students/request-instructor";
        public const string UpdatePhoto = "students/updateMyPhoto";
        public const string UpdateMe = "students/updateMe";
        public const string UpdateMyDrivingSkills = "students/my-driving-skills";
        #endregion

        #region City
        public const string GetAllCities = "cities";
        #endregion

        #region Instructor
        public const string GetAllInstructors = "instructors";
        public const string GetOneInstructor = "instructors/";
        public const string GetSchedule = "instructors//lessons";
        #endregion

        #region Lesson
        public const string SignUpToLesson = "lessons//signup";
        public const string GetMyLessons = "lessons/my";
        public const string CancelMyLesson = "lessons//cancel-my-lesson";
        public const string AddLessonToGoogleCalendar = "lessons//to-calendar";
        #endregion

        #region
        public const string GetInstructorsReview = "instructors//reviews";
        public const string AddReview = "instructors//reviews";
        #endregion
    }
}
