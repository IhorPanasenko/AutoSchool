namespace Auto.School.Mobile.ApiIntegration.Servicecs.Abstract
{
    public interface ITokenExpirationService
    {
        public void RemoveExpirationTime();
        public void SaveTokenExpiration(DateTime? expireTime);
        public void TryRefreshToken();
    }
}
