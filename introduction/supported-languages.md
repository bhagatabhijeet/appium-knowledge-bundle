---
type: Topic
title: Supported languages
description: Which programming languages Appium client libraries support, and why.
tags: [appium, languages, clients]
---

Appium is built on Selenium, and Selenium already supports many programming languages. Appium inherits that same flexibility: every Appium client library sends the same underlying W3C WebDriver commands, so a team can pick the language that fits its existing stack without changing how Appium behaves on the server or driver side.

![Appium supported client languages](/assets/images/appium-supported-languages.svg)

| Language | Client library |
| --- | --- |
| Java | [java-client](https://github.com/appium/java-client) |
| JavaScript | [webdriverio](https://webdriver.io/) (maintained outside the Appium GitHub org) |
| Python | [python-client](https://github.com/appium/python-client) |
| C# | [dotnet-client](https://github.com/appium/dotnet-client) |
| PHP | [php-client](https://github.com/appium-boneyard/php-client) (community-maintained, in the appium-boneyard org) |
| Ruby | [ruby_lib](https://github.com/appium/ruby_lib) (`appium_lib` gem) |

See the [client drivers ecosystem page](https://github.com/appium/appium/blob/master/packages/appium/docs/en/ecosystem/clients.md) in the appium/appium repo for the full, current list.
