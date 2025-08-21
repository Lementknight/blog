+++
title = 'Nox Tutorial'
tags = []
date = '2025-08-20T01:26:40-04:00'
description = ''
draft = false
+++

In my pursuit to improve as a software engineer I happened upon tools like [Black](https://black.readthedocs.io/en/stable/) and [Ruff](https://docs.astral.sh/ruff/) that helped me learn a lot about how to write pythonic code that adheres to Python coding best practices outlined in [PEP 8](https://peps.python.org/pep-0008/). For a linter and formatter it is pretty easy to remember the commands the arguments you need to run the command, but when you start testing your code the command can become quite cumbersome.

For example, for one of the projects that I am working on testing is an important part of our development workflow and the command that I would have to run is:
```bash
coverage run -m unittest discover -s "tests" -p "*_test.py"
```
And then this command to run
```bash
coverage report --fail-under=100 #generates coverage report
coverage html #creates HTML for coverage report
```
Just typing out those commands made my fingers hurt. And this isn't even going into ensuring that your local virtual environment is set up correctly with all the dependencies installed. This is where Nox comes in.

Let's say you want to take the formatting, linting, and testing command you have and you want to simplify how you call them. Nox gives you the ability to automate your testing and development workflows by defining them in a `noxfile.py`. This file allows you to specify the different sessions you want to run, along with their dependencies and commands. With Nox, you can easily create a consistent and reproducible environment for your tests, making it easier to manage dependencies and run your test suite.

Here is what a `noxfile.py` file would look like if you wanted to automate your formatting:

```python
import nox
...
@nox.session
def format(session: nox.Session) -> None:
    """Format code with black."""
    session.install("black")
    session.run("black", ".")
...
```

Here you can see that you need to import the nox module and use a decorator to define a function. Notice how you need to install the black package within the session. This is because each session of nox is a an isolated environment, meaning that any packages you install or commands you run are contained within that session.


Here is how you would use the command in the terminal:

```bash
nox -s format
```

Simple right? Exactly! You can now run your formatting command without having to remember the exact command or the arguments you need to pass.

Assuming that you are using a requirements.txt file for your Python's projects dependencies, you can create a `noxfile.py` like this:

```python
import nox

@nox.session
def format(session: nox.Session) -> None:
    """Format code with black."""
    session.install("black")
    session.run("black", ".")


@nox.session
def lint(session: nox.Session) -> None:
    """Run linting checks."""
    session.install("ruff")
    session.run("ruff", "check", "--fix", ".")

@nox.session
def tests(session: nox.Session) -> None:
    """Run the test suite with coverage."""
    session.install("-r", "requirements.txt")
    session.install("coverage[toml]")

    # Run tests with coverage
    session.run(
        "coverage",
        "run",
        "-m",
        "unittest",
        "discover",
        "-s",
        "tests",
        "-p",
        # We use *_test.py pattern for our tests
        "*_test.py",
    )

    # Generate coverage report
    session.run("coverage", "report", "--fail-under=90")

    # Generate HTML report for local viewing
    session.run("coverage", "html")
```