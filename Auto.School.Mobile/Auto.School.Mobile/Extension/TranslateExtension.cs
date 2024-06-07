
namespace Auto.School.Mobile.Extension
{
    public class TranslateExtension : IMarkupExtension
    {
        public string Key { get; set; }

        public object ProvideValue(IServiceProvider serviceProvider)
        {
            var binding = new Binding
            {
                Mode = BindingMode.OneWay,
                Path = $"[{Key}]",
                Source = Translator.Instance
            };

            return binding;
        }
    }
}
