---
layout: "@/layouts/BlogPostLayout.astro"
author: "João Gouveia"
title: "GSoC 2024: Wrapping Up"
description: |
    I am now reaching the end of my GSoC period. Contributing to KDE has been a
    great learning experience, one that I intend to continue beyond this
    project.
date: 2024-08-23
tags: [KDE, GSoC]
---

## The End Product

Throughout this summer, I've developed a C++ library called MankalaEngine,
implementing three opponents for the games of Bohnenspiel and Oware.

The current library is highly extensible. After implementing all the base
classes and Bohnenspiel, adding Oware to the library was fairly fast and
straightforward. This focus on extensibility has been a priority since the
beginning of the project. Given that the Mancala family of games comprises
numerous variants, designing the API with this in mind has proven valuable.

The three provided opponents use a random selection algorithm, Minimax, and
MTD-f. The Minimax and MTD-f opponents were implemented with optimizations like
alpha-beta pruning and transposition tables, making them both very capable,
consistently outperforming the random opponent.

For a more detailed overview of what was accomplished, I wrote a
[work report](https://community.kde.org/GSoC/2024/StatusReports/JoaoGouveia)
on KDE's wiki.

## What I've learned

The last few months have been a very enriching experience from a technical
standpoint.

Contributing to a "real-world" project allowed me to learn about technologies I
hadn't used before. For example, I learned how to use CMake and how to set up a
CI pipeline.

I also faced concerns that don't typically arise when developing a school or
personal project, such as adhering to an organization's software standards. To
this end, I learned about open-source licenses and new programming idioms.

## Interacting With The Community

Since MankalaEngine is a completely new library, my interaction with the
community was limited, as there isn't an existing group of contributors for this
particular project.

I mainly interacted with my mentors, who were very helpful. Although less
frequently, I also had the opportunity to communicate with other KDE
contributors through mailing lists, from whom I also learned a great deal.
