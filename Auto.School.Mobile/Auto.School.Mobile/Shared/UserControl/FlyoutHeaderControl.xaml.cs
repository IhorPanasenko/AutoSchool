namespace Auto.School.Mobile.UserControl;

public partial class FlyoutHeaderControl : ContentView
{
	public FlyoutHeaderControl()
	{
		InitializeComponent();
		if(App.UserInfo is not null)
		{
			lblUserName.Text = App.UserInfo.UserName;
			lblUserEmail.Text = App.UserInfo.UserName;
		}
	}
}