using Auto.School.Mobile.Models;

namespace Auto.School.Mobile.Services
{
    internal class LoginService : ILoginRepository
    {

        public async Task<UserInfo> Login(string username, string password)
        {
            return new UserInfo
            {
                Password = password,
                UserName = username,
                UserId = 1
            };
        }
    }
}
