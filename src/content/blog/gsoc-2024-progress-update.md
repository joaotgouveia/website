---
layout: "@/layouts/BlogPostLayout.astro"
author: "João Gouveia"
title: "GSoC 2024: Progress Update"
description: |
    Since the midterm update on MankalaEngine, I've improved the library,
    particularly its building and testing processes. I've also prepared a
    repository for a graphical Mancala game and started learning Qt.
date: 2024-08-18
tags: [KDE, GSoC]
---

## Building

### ECM

I've added [ECM](https://api.kde.org/ecm/manual/ecm.7.html) as a dependency and
am now using some of its modules. While this introduces the downside of adding
an extra dependency, ECM is fairly common across KDE apps, so it's reasonable to
assume that most users will already have it installed on their systems.

The project now uses the
[KDEInstallDirs6](https://api.kde.org/ecm/kde-module/KDEInstallDirs6.html),
[KDECMakeSettings](https://api.kde.org/ecm/kde-module/KDECMakeSettings.html), and
[KDECompilerSettings](https://api.kde.org/ecm/kde-module/KDECompilerSettings.html)
ECM modules, making the default build settings consistent with the rest of KDE
software.

I've also integrated
[ECMAddTests](https://api.kde.org/ecm/module/ECMAddTests.html), which has
greatly simplified the CMakeLists file related to testing.

### PImpl

The classes in the library have been refactored to use the PImpl idiom, as
[suggested by Albert](https://mail.kde.org/pipermail/kde-games-devel/2024-July/015485.html).
This improves ABI compatibility and aligns with
[KDE's policies regarding binary compatibility issues with C++](https://community.kde.org/Policies/Binary_Compatibility_Issues_With_C%2B%2B).

## Testing

The testing framework used by the library has been switched from Google Test to
Qt Test. Google Test adheres strictly to some Google policies that could
potentially be troublesome in the future, such as quickly dropping support for
older compilers. Additionally, Qt Test seems to integrate better with KDE's CI.
For instance, Google Test failed to compile on the Android pipeline, but
migrating to Qt Test completely resolved this issue without requiring any
workarounds.

## Mankala

To put MankalaEngine to use, I am developing a GUI,
[Mankala](https://invent.kde.org/joaotgouveia/mankala), which will offer a
selection of games from the Mancala family. I've already started learning Qt,
and developing this will be my primary focus during the remaining weeks of GSoC.

I plan to continue working on this project after GSoC concludes and eventually
integrate both Mankala and MankalaEngine into KDE.
