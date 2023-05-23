# Massif Visualizer

## Authors

* [**Pavle Cvejović**](https://github.com/pavle99)
* [**Viktor Novaković**](https://github.com/vita-ride)

## Problem description

The goal of this project is to help visualize the output of the [Massif](https://valgrind.org/docs/manual/ms-manual.html) tool by creating a graph of the memory usage over time, a list of the memory usage at each snapshot and the ability to select a snapshot and see the memory usage at that point in time in the source code.

## Solution description

The solution is a desktop app built using the [Electron](https://www.electronjs.org/) framework and [React](https://reactjs.org/) library. It compiles the C (or C++) source code in debug mode, then runs the executable with the Massif tool and parses the output. The parsed data is then used to create a graph of the memory usage over time, a list of the memory usage at each snapshot and the ability to select a snapshot and see the memory usage at that point in time in the source code.