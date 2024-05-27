---
layout: "@/layouts/BlogPostLayout.astro"
author: "João Gouveia"
title: "GSoC 2024: Introducing My Project For The KDE Community"
description: |
  Over the course of this summer I'll be contributing to KDE,
  implementing an opponent for the Mancala variant Bohnenspiel.
date: 2024-05-13
tags: [KDE, GSoC, Artificial Intelligence]
---

## The Motivation

Why implement a computerized opponent for a Mancala variant?

Games within the Mancala family are played all over the world. However,
as of now, KDE doesn't offer any Mancala games to people looking for a
challenging opponent.

## Considerations

There are two core aspects to have in mind.

Firstly, the implementation must be designed in a way that suits the
needs of KDE frontend developers. This ensures that programming a GUI
for a Mancala game that utilizes this opponent is straightforward.

Secondly, this opponent must be easily extensible. The Mancala family of
games comprises numerous variants, so designing this opponent with that
in mind is of great value. By providing an engine that\'s easy to
understand and extend, we encourage developers to use it in future
implementations of Mancala variants. This accelerates the process of
implementing a new Mancala variant and it's opponent, as all the core
algorithms are readily available for their use.

## The Game

Bohnenspiel is played on a board with 2 rows, each with 6 holes, and 2
end-holes, called stores. Each player owns the store to their right hand
and controls the holes on their side of the board.

![Bohnenspiel Board](@/images/bohnenspielBoard.svg)

At the beginning, all holes are filled with 6 counters. The starting
player chooses one of the holes under their control and removes all
counters in it. The player goes through the holes next to the chosen one
anticlockwise, placing one counter in each one until they have no more
counters in their hand. Both stores are skipped. This is called sowing.

![Bohnenspiel Sowing](@/images/bohnenspielSowing.svg)

If the last counter falls into a hole, bringing the total number of
counters in the hole to 2, 4, or 6, these counters are captured and put
in the player's store. When a capture is made, the preceding hole is
checked and captured according to the same rule. The captures are
repeated until the previous hole has some number of counters other than
2, 4, or 6.

The game ends when a player cannot move anymore; the remaining seeds on
the board are given to the opposing player, and the winner is the one
with more seeds [\[1\]](#citeproc_bib_item_1).

## The Algorithm

The final engine will use the MTD(f) Minimax Search algorithm with
iterative-deepening. Optimizations like move ordering may be
implemented, depending on the performance of the base algorithm.

MTD(f) was previously used to solve Kalah [\[2\]](#citeproc_bib_item_2),
another Mancala game, and consistently outperformed other algorithms in
a variety of board games [\[3\]](#citeproc_bib_item_3).

## Closing Remarks

This project not only aims to introduce a new game into KDE\'s
repertoire, but also to lay the groundwork for future additions to the
Mancala family within the community.

The development of this opponent will be done in the open, documented
through blog posts and status reports, ensuring transparency and
fostering community feedback. I invite the KDE community and all
interested developers to engage with this project, suggest improvements,
and contribute to the development of an opponent for one of the most
popular and oldest board games in the world.

## References

<a name="citeproc_bib_item_1" class="reference">1.</a> "Bohnenspiel : igGameCenter."
<https://www.iggamecenter.com/en/rules/bohnenspiel>.

<a name="citeproc_bib_item_2" class="reference">2.</a> G. Irving, J. Donkers, and J. Uiterwijk,
"Solving Kalah", *Icga journal*, vol. 23, no. 3, pp. 139`--`147.

<a name="citeproc_bib_item_3" class="reference">3.</a> A. Plaat, J. Schaeffer, W. Pijls, and A.
de Bruin, "A New Paradigm for Minimax Search".
