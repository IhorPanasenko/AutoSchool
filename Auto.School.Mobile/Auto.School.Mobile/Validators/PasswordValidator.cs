using System.Text.RegularExpressions;

namespace Auto.School.Mobile.Validators
{
    public static class PasswordValidator
    {
        public static string? Validate(string password)
        {
            if (string.IsNullOrWhiteSpace(password))
            {
                return null;
            }

            if (password.Length < 8)
            {
                return "Password must be at least 8 characters long.";
            }

            if (!Regex.IsMatch(password, "[A-Z]"))
            {
                return "Password must contain at least one uppercase letter.";
            }

            if (!Regex.IsMatch(password, "[0-9]"))
            {
                return "Password must contain at least one digit.";
            }

            if (!IsContainSpecialCharacter(password))
            {
                return "Password must contain at least one special character.";
            }

            return null;
        }

        private static bool IsContainSpecialCharacter(string password)
        {
            char[] specialCharacters = { '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '+', '=', '[', ']', '{', '}', '|', '\\', ';', ':', '\'', '"', '<', '>', ',', '.', '/', '?' };

            foreach (char c in password)
            {
                if (specialCharacters.Contains(c))
                {
                    return true;
                }
            }

            return false;
        }
    }
}
