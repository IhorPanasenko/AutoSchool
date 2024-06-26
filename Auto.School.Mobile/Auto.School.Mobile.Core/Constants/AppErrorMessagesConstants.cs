﻿namespace Auto.School.Mobile.Core.Constants
{
    public static class AppErrorMessagesConstants
    {
        public const string SomethingWentWrongErrorMessage = "Something went wrong.\nTry again later or contact developer team";
        public const string InvalidEmail = "Please, enter a valid email";
        public const string TooYoungError = "You must be elder than 18 to get access to driving license classes";
        public const string InvalidPhoneNumber = "PLease, enter a phone number in format: XXX-XXX-XXXX";
        public const string NotEqualPasswords = "Entered passwords are not equal";
        public const string FailedToLoadInstuctor = "Failed to load instructor info";
        public const string FailedToPickImage = "Error while picking image from files. Try again later";
        public const string UpdatePasswordNotFilled = "Please enter both current and new passwords.";
        public const string FailedLoadSchedule = "Failed to load instructor's schedule";
        public const string FailedUpdateUserPhoto = "Failed to update profile photo";
        public const string FiledSignUpToInstructor = "Failed Sign up to instructor";
        public const string FailedToLoadDrivingSkills = "Failed to load your driving skills progress. Please, try again later";
        public const string FailedToUpdateSkill = "Failed to update driving skill. Try again later";
        public const string FailedGetInstructorId = "Failed to get instructor instance. Try again later";
    }
}
