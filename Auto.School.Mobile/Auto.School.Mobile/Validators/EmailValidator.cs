using System.Text.RegularExpressions;

namespace Auto.School.Mobile.Validators
{
    public static class EmailValidator
    {
        public static bool Validate(string email)
        {
            string pattern = @"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$";
            return Regex.IsMatch(email, pattern);
        }
    }
}
