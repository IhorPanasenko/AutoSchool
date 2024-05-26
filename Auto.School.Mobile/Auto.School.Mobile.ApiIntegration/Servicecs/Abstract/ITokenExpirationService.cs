namespace Auto.School.Mobile.ApiIntegration.Servicecs.Abstract
{
    public interface ITokenExpirationService
    {
        public void TryRefreshToken();
    }
}
