using Auto.School.Mobile.Abstract;

namespace Auto.School.Mobile.Services
{
    public class SharedService : ISharedService
    {
        private Dictionary<string, object> DTODict { get; set; } = [];

        public void Add<T>(string key, T value) where T : class
        {
            if (DTODict.ContainsKey(key))
            {
                DTODict[key] = value;
            }
            else
            {
                DTODict.Add(key, value);
            }
        }

        public T? GetValue<T>(string key) where T : class
        {
            return DTODict.ContainsKey(key) ? DTODict[key] as T : null;
        }
    }
}
