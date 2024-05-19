namespace Auto.School.Mobile.Abstract
{
    public interface ISharedService
    {
        public void Add<T>(string key, T value) where T : class;
        public T? GetValue<T>(string key) where T : class;
    }
}
