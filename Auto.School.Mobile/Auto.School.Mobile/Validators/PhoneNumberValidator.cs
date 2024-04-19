using Microsoft.Maui.ApplicationModel.Communication;
using System.Text.RegularExpressions;

namespace Auto.School.Mobile.Validators
{
    public static class PhoneNumberValidator
    {
        public static bool IsValidPhoneNumber(string phoneNumber)
        {
            if (string.IsNullOrEmpty(phoneNumber))
                return true;

            return Regex.IsMatch(phoneNumber, @"^\d{3}-\d{3}-\d{4}$");
        }
    }
}
