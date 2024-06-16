using OpenQA.Selenium.Appium.Android;
using OpenQA.Selenium.Appium.Enums;
using OpenQA.Selenium.Appium;

namespace UITests
{
    public class LoginTest
    {
        private AndroidDriver<AndroidElement> _driver;

        [SetUp]
        public void Setup()
        {
            var driverOptions = new AppiumOptions();
            driverOptions.AddAdditionalCapability(MobileCapabilityType.PlatformName, "Android");
            driverOptions.AddAdditionalCapability("appium:automationName", "UiAutomator2");
            driverOptions.AddAdditionalCapability(MobileCapabilityType.App, "com.Auto.School.Mobile");
            driverOptions.AddAdditionalCapability(MobileCapabilityType.DeviceName, "Pixel 7 Pro – API 34");

            _driver = new AndroidDriver<AndroidElement>(new Uri("http://192.168.0.102:4723/"), driverOptions);
            _driver.ActivateApp("com.Auto.School.Mobile");
        }

        [TearDown]
        public void TearDown()
        {
            _driver.Quit();
            _driver.Dispose();
        }

        [Test]
        public void InputCorrectLoginAndPasswordAndClickLoginButton()
        {
            var usernameEntry = _driver.FindElementByAccessibilityId("LoginPage_UsernameEntry");
            usernameEntry.Clear();
            usernameEntry.SendKeys("dgekichan2024@gmail.com");

            var passwordEntry = _driver.FindElementByAccessibilityId("LoginPage_PasswordEntry");
            passwordEntry.Clear();
            passwordEntry.SendKeys("Password01;");

            var loginButton = _driver.FindElementByAccessibilityId("LoginPage_LoginButton");
            loginButton.Click();

           
            var errorLabel = _driver.FindElementByAccessibilityId("LoginPage_ErrorAlert");
            Assert.IsFalse(errorLabel.Displayed);
        }

        [Test]
        public void InputWrongLoginAndPasswordAndClickLoginButton()
        {
            var usernameEntry = _driver.FindElementByAccessibilityId("LoginPage_UsernameEntry");
            usernameEntry.Clear();
            usernameEntry.SendKeys("dgekichan@gmail.com");

            var passwordEntry = _driver.FindElementByAccessibilityId("LoginPage_PasswordEntry");
            passwordEntry.Clear();
            passwordEntry.SendKeys("Password");

            var loginButton = _driver.FindElementByAccessibilityId("LoginPage_LoginButton");
            loginButton.Click();

            var errorAlert = _driver.FindElementByAccessibilityId("LoginPage_ErrorAlert");
            Assert.IsTrue(errorAlert.Displayed);
        }
    }
}
