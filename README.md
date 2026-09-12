# Appium Knowledge Bundle

<p align="center">
  <a href="https://appium.io/">
    <img alt="Appium" src="https://raw.githubusercontent.com/appium/appium/master/packages/appium/docs/overrides/assets/images/appium-logo-horiz.png" width="300">
  </a>
</p>

![Appium Knowledge Bundle](assets/images/appium-kb-banner.svg)

A documentation-first knowledge bundle for Appium mobile automation. It collects practical, structured notes on designing, configuring, running, and troubleshooting Appium-based tests — organized as a topic map you can read end to end or jump into for a specific question.

## What this bundle offers

- **A clear mental model of Appium**: what it is, how the client-server architecture works under the hood (REST over HTTP, sessions, desired capabilities), and how the W3C WebDriver protocol replaced the JSON Wire Protocol from Appium 2.x onward.
- **Language and platform coverage**: which client libraries are available (Java, JavaScript, Python, C#, PHP, Ruby) and how Appium reaches native automation on Android (UiAutomator2) and iOS (XCUITest, WebDriverAgent).
- **Honest tool comparisons**: how Appium stacks up against platform-specific tools like XCTest, Robotium, UI Automator, and Espresso, including where each one is actually the better choice.
- **Real limitations, not just advantages**: environment requirements, infrastructure trade-offs between local device labs and cloud providers, and where to check for breaking changes between releases.
- **Diagrams over walls of text**: each topic pairs concise explanations with a diagram or table so the concept is quick to scan and easy to verify.

Every topic in this bundle is meant to be concise, verifiable, and linked back to an authoritative source wherever possible.

## Specification

This bundle follows the [Open Knowledge Format (OKF) v0.2](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md): a directory tree of markdown concept files, each with a small YAML frontmatter block, organized into subdirectories by topic. The root [index.md](index.md) declares `okf_version: "0.2"` and lists the bundle's topics; [log.md](log.md) tracks the update history.

## Structure

- `index.md`: bundle-root entry point and topic map (carries the `okf_version` frontmatter)
- `log.md`: chronological history of updates to the bundle
- `introduction/`: the Introduction topic, one concept file per subtopic (what Appium is, supported languages, architecture, app types, advantages, tool comparison, limitations, references), plus its own `index.md`
- `driver-ecosystem/`: the Appium ecosystem and drivers topic (ecosystem categories, how a driver works, the driver catalog), plus its own `index.md`
- `appium-setup/`: the Appium Setup topic (prerequisites now; Windows and Mac setup steps planned), plus its own `index.md`
- `assets/images/`: images used by knowledge topics
- `assets/code/`: reusable reference code examples
- `viz.html`: a self-contained, interactive graph viewer for this bundle — open it directly in a browser
- `tools/generate-viz.js`: regenerates `viz.html` from the current concept files (`node tools/generate-viz.js`)

## Status

The Introduction and Appium ecosystem and drivers topics are complete. Appium Setup has its prerequisites written; Windows- and Mac-specific setup steps are still to come. Other remaining topics — desired capabilities, locators, gestures, test organization, troubleshooting, and reference material — are also in progress; see [index.md](index.md) for the full topic map.

## Reference links

Appium:

- [Appium 2.0 documentation](https://appium.github.io/appium/docs/en/2.0/)
- [Appium GitHub organization](https://github.com/appium)
- [Appium GitHub issues](https://github.com/appium/appium/issues) — report server defects here
- [Appium Inspector](https://github.com/appium/appium-inspector)
- [UiAutomator2 driver documentation](https://github.com/appium/appium-uiautomator2-driver) ([Android capabilities](https://github.com/appium/appium-uiautomator2-driver#capabilities))
- [XCUITest driver documentation](https://github.com/appium/appium-xcuitest-driver) ([iOS capabilities](https://github.com/appium/appium-xcuitest-driver#capabilities))
- [Java client](https://github.com/appium/java-client) — report client defects here
- [Driver ecosystem](https://appium.github.io/appium/docs/en/2.0/ecosystem/)
- [API Demos app](https://github.com/appium/appium/blob/master/packages/appium/sample-code/apps/ApiDemos-debug.apk) (Android sample app)
- [UIKitCatalog app](https://github.com/appium/ios-uicatalog) (iOS sample app)
- [Sauce Labs demo app](https://github.com/saucelabs/sample-app-mobile)
- [iOS real-device setup](https://github.com/appium/appium-xcuitest-driver/blob/master/docs/getting-started/device-setup.md)
- [Driver management commands (Extension CLI)](https://appium.github.io/appium/docs/en/2.0/cli/extensions/)
- [Hybrid app automation (managing contexts)](https://appium.github.io/appium/docs/en/2.0/guides/context/)
- [Appium Pro](https://appiumpro.com) — articles from Jonathan Lipps, Appium project lead

Cucumber:

- [Cucumber JUnit documentation](https://cucumber.io/docs/cucumber/api/?lang=java#junit)
- [Cucumber TestNG samples](https://github.com/cucumber/cucumber-jvm/tree/main/cucumber-testng/src/test/java/io/cucumber/testng)
- [Gherkin syntax and step organization](https://cucumber.io/docs/gherkin/)
- [Cucumber expressions](https://github.com/cucumber/cucumber-expressions#readme)
