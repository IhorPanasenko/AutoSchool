using CommunityToolkit.Mvvm.Input;

namespace Auto.School.Mobile.Shared.Alerts;

public partial class ErrorAlertView : ContentView
{
	public ErrorAlertView()
	{
		InitializeComponent();
	}

    public static readonly BindableProperty IsErrorProperty =
        BindableProperty.Create(
            nameof(IsError),
            typeof(bool),
            typeof(ErrorAlertView),
            false);

    public bool IsError 
	{
		get => (bool)GetValue(IsErrorProperty);
		set => SetValue(IsErrorProperty, value); 
	}

	public static readonly BindableProperty ErrorMessageProperty =
		BindableProperty.Create(
			nameof(ErrorMessage),
			typeof(string),
			typeof(ErrorAlertView),
			string.Empty);
		
	public string ErrorMessage
	{
		get => (string)GetValue(ErrorMessageProperty);
		set => SetValue(ErrorMessageProperty, value);
	}

    public static readonly BindableProperty CloseActionProperty =
            BindableProperty.Create(
                nameof(CloseAction),
                typeof(Action),
                typeof(ErrorAlertView),
                null);

    public Action CloseAction
    {
        get => (Action)GetValue(CloseActionProperty);
        set => SetValue(CloseActionProperty, value);
    }

    private void CloseButton_Clicked(object sender, EventArgs e)
    {
        CloseAction?.Invoke();
    }
}