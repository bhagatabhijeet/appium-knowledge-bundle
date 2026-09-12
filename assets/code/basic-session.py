from appium import webdriver
from appium.options.android import UiAutomator2Options

options = UiAutomator2Options()
options.platform_name = "Android"
options.automation_name = "UiAutomator2"
options.app = "/path/to/app.apk"

driver = webdriver.Remote("http://127.0.0.1:4723", options=options)

try:
    print(driver.current_package)
finally:
    driver.quit()
