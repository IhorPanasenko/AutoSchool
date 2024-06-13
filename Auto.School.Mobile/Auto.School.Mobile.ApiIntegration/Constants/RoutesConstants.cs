namespace Auto.School.Mobile.ApiIntegration.Constants
{
    public static class RoutesConstants
    {
        //public const string BaseUrl = "http://10.0.2.2:3000/api/";
        public static string BaseUrl => Environment.GetEnvironmentVariable("BASE_URL") ?? "http://10.0.2.2:3000/api";
        public const string TestBaseUrl = "http://localhost:3000/api";
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
        public const string GetOneStudent = "students/";
        #endregion

        #region City
        public const string GetAllCities = "cities";
        #endregion

        #region Instructor
        public const string GetAllInstructors = "instructors";
        public const string GetOneInstructor = "instructors/";
        public const string GetSchedule = "instructors//lessons";
        public const string InstructorGetInfoMe = "instructors/me";
        #endregion

        #region Lesson
        public const string SignUpToLesson = "lessons//signup";
        public const string GetMyLessons = "lessons/my";
        public const string CancelMyLesson = "lessons//cancel-my-lesson";
        public const string AddLessonToGoogleCalendar = "lessons//to-calendar";
        public const string InstructorCancelLesson = "lessons//cancel";
        #endregion

        #region Reviews
        public const string GetInstructorsReview = "instructors//reviews";
        public const string AddReview = "instructors//reviews";
        public const string DeleteReview = "instructors//reviews/";
        #endregion

        #region Car
        public const string AddCarRating = "cars//ratings";
        #endregion

        #region Chat
        public const string GetChatMessages = "chats/messages/";
        public const string GetChatsPreview = "chats";
        #endregion

        #region Payment
        public const string PaymentLink = "http://10.0.2.2:5173/login?redirectUrl=timetable/payment/";
        #endregion
    }
}
