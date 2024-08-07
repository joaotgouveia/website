---
layout: "@/layouts/BlogPostLayout.astro"
author: "João Gouveia"
title: "GSoC 2024: Midterm Updates For MankalaEngine"
description: |
    Over the past few weeks, I've made significant progress in developing
    MankalaEngine. While there's still room for improvement, I've now created
    a library that enables the creation of opponents in Mancala games.
date: 2024-07-18
tags: [KDE, GSoC, Artificial Intelligence]
---

## Design Considerations

One of the main focuses while designing this engine was flexibility, to ensure
the library is usable for a wide variety of Mancala variants. While certain
abstractions are necessary to achieve this goal, it's also important not to overly
abstract the library.

## Provided Functionality

MankalaEngine provides classes to assist in creating computerized opponents for
many Mancala variants. As mentioned earlier, these classes are designed with a
degree of abstraction to allow for greater flexibility on the developer's end. In
addition to these base classes, a concrete implementation tailored for the
Bohnenspiel variant [\[1\]](#citeproc_bib_item_1) is also provided.

## The `Board` struct

The `board` struct is the base struct for a Mancala game board. It is used to
specify the structure of the board used by a variant. As of now, this struct
allows for a board with an arbitrary number of holes and two stores, one per
player, as this seems to be the case for most Mancala games.

## The `Rules` class

The `rules` class is the base class for the rules of a Mancala variant. It is
used to specify the behaviour when making a move, what constitutes a valid move,
when the game is over, etc. The only rule assumed to be shared by all variants is
that the winning player is the one with more pebbles in their store, as this
seems to be relatively common in Mancala variants.

## The `moveselection` functions

The functions provided in the `moveselection` file are general adversarial search
functions that can be used to select moves for Mancala games. In addition to
Minimax [\[2\]](#citeproc_bib_item_2) and MTDF-f [\[3\]](#citeproc_bib_item_3),
random selection and user selection functions are also provided.

## The Minimax move selection function

Minimax works by recursively exploring the game tree, considering each player's
moves and assuming that each player chooses the optimal move to maximize their
chances of winning. If we're scoring a Mancala position using an evaluation
function that subtracts the pebbles in Player 2's store from the pebbles in
Player 1's store, this means that Player 1 will want to maximize the score, while
Player 2 will want to minimize it. The diagram below shows how a position is
evaluated using the Minimax algorithm.

![Minimax Diagram](@/images/minimax.svg)

Each node represents a specific board configuration, and each level of the tree
represents a turn of play. The tree nodes are squares on Player 1's turn and
circles on Player 2's turn. Leaf nodes (nodes without children) are scored
using the evaluation function. The rest of the nodes are scored by selecting
the best score out of their children nodes - highest score if it's Player 1's
turn and lowest score if it's Player 2's turn.

The Minimax implementation in the library also uses alpha-beta pruning, a
technique used to reduce the number of nodes evaluated in the tree by eliminating
branches that are guaranteed to be worse than previously examined branches.

A great explanation of Minimax and Alpha-beta prunning can be found in Sebastian
Lague's [Youtube video](https://youtu.be/l-hh51ncgDI?si=pL81nM6I8W_A2oW-) about
this algorithm.

## The MTD-f move selection function

MTD-f works by repeatedly calling Minimax until it converges to a value. The
Minimax used by MTD-f is implemented using alpha-beta pruning.

Since MTD-f calls Minimax several times, it's also important to use a
transposition table, which is a data structure that stores previously evaluated
positions and their scores.

Below is Aske Plaat's pseudo-code for the algorithm.

```pascal
function MTDF(root : node_type; f : integer; d : integer) : integer;

   g := f;
   upperbound := +INFINITY;
   lowerbound := -INFINITY;
   repeat
       if g == lowerbound then beta := g + 1 else beta := g;
       g := Minimax(root, beta - 1, beta, d);
       if g < beta then upperbound := g else lowerbound := g;
   until lowerbound >= upperbound;
   return g;
```

## Evaluating Mancala positions

The static evaluation function used in this library consists of subtracting the
pebbles in Player 2's store from the pebbles in Player 1's store. This is the
same function that was used when solving the Mancala variant _Kalah_
[\[4\]](#citeproc_bib_item_4).

This way of scoring Mancala positions is particulary suitable for MTD-f, since,
according to Plaat, the static evaluation function used should be coarse-grained,
meaning that we should avoid using heuristics with little weight. As he says in
his post about MTD(f), _"The coarser the grain of eval, the less passes MTD(f)
has to make to converge to the minimax value. Some programs have a fine grained
evaluation function, where positional knowledge can be worth as little as one
hundredst of a pawn."_ [\[3\]](#citeproc_bib_item_3).

## The `MankalaEngine` class

The `MankalaEngine` class ties everything together. When instatiating it, you'll
need to choose a move selection function. It then provides a function, `play`,
that, given the player whose turn it is to play, the rules to use, and the board
in which the move will be played, executes the move selected by its move
selection function. This allows reusing the common structure of a play across all
Mancala variants while deferring variant-specific behaviour to the rules object.

```cpp
bool MankalaEngine::play(Player player, const Rules& rules,
                         Board& state) const {
    if (rules.gameOver(player, state)) {
        const Player winner = player == player_1 ? player_2 : player_1;
        rules.finishGame(winner, state);
        return false;
    }
    const int move = _selectMove(player, rules, state);
    rules.move(move, player, state);
    return true;
}
```

## Next steps

The idea is to continue adding concrete variant implementations to the library so
that developers wanting to create a Mancala game don't have to implement them
themselves. Additionally, adding the option to choose the difficulty of an
opponent is also relevant. This may be implemented, for example, by allowing
changes to the cutoff depth for the Minimax and MTD-f opponents, which is not
currently supported.

As of now, the implemented Minimax only uses alpha-beta prunning and
transposition tables. Adding more optimizations, such as move ordering, per
example, might also be of interest.

Another possible route is developing a Qt application for playing Mancala that
uses this engine. This would likely help generate interest in the project within
the broader community.

If you're interested in this project, you can check it out on
[Invent](https://invent.kde.org/joaotgouveia/mankalaengine) and come talk to us
on [Matrix](https://matrix.to/#/#mancala:kde.org).

## References

<a name="citeproc_bib_item_1" class="reference">1.</a> "Das Bohnenspiel", <i>Wikipedia</i>, 2023.
<https://en.wikipedia.org/wiki/Das_Bohnenspiel>.

<a name="citeproc_bib_item_2" class="reference">2.</a> "Algorithms - Minimax"
<https://cs.stanford.edu/people/eroberts/courses/soco/projects/2003-04/intelligent-search/minimax.html>.

<a name="citeproc_bib_item_3" class="reference">3.</a> "Aske Plaat: MTD(f), a new chess algorithm."
<https://people.csail.mit.edu/plaat/mtdf.html>.

<a name="citeproc_bib_item_4" class="reference">4.</a> G. Irving, J. Donkers, and J. Uiterwijk,
"Solving Kalah", <i>Icga journal</i>, vol. 23, no. 3, pp. 139–147, Sep. 2000,
doi: <a href="https://doi.org/10.3233/ICG-2000-23303">10.3233/ICG-2000-23303</a>.
