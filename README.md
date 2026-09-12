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
- `assets/images/`: images used by knowledge topics
- `assets/code/`: reusable reference code examples

## Status

The Introduction topic (what Appium is, its architecture, supported languages, advantages, tool comparisons, and limitations) is complete. Remaining topics — drivers and platforms, desired capabilities, locators, gestures, test organization, troubleshooting, and reference material — are in progress; see [index.md](index.md) for the full topic map.
