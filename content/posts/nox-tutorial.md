---
title: "Nox Tutorial"
tags: ["python", "nox", "testing", "automation", "development-tools", "tutorial", "workflow-automation"]
date: 2025-08-22T01:00:00-05:00
description: "Learn how to automate your Python development workflow with Nox. Stop typing complex testing commands and create reproducible environments for formatting, linting, and testing with simple noxfile.py configurations."
draft: false
---

In my pursuit to improve as a software engineer, I discovered tools like [Black](https://black.readthedocs.io/en/stable/) and [Ruff](https://docs.astral.sh/ruff/) that helped me write pythonic code following [PEP 8](https://peps.python.org/pep-0008/) best practices. While linter and formatter commands are easy to remember, testing commands can become painfully cumbersome.

For example, in one of my current projects, testing requires this command:
```bash
coverage run -m unittest discover -s "tests" -p "*_test.py"
```
Followed by:
```bash
coverage report --fail-under=100 #generates coverage report
coverage html #creates HTML for coverage report
```
Just typing those commands makes my fingers hurt! And that's before dealing with virtual environment setup and dependencies. This is where Nox comes in.

Nox lets you automate your formatting, linting, and testing workflows by defining them in a `noxfile.py`. This file specifies different sessions to run, along with their dependencies and commands. With Nox, you get a consistent and reproducible environment that makes dependency management and test execution simpler.

Here's what a `noxfile.py` looks like for automating formatting:

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

You import the `nox` module and use the `@nox.session` decorator to define a function. Notice that you install the black package within the session. This is because each Nox session runs in an isolated environment where packages and commands are contained within that session.


Run it in the terminal like this:

```bash
nox -s format
```

Simple, right? Now you can run your formatting without remembering complex commands or arguments.

## Common Nox Commands

Here are some essential commands you'll use frequently with Nox:

```bash
nox --list          # List all available sessions
nox                 # Run all sessions
nox -s format       # Run a specific session
nox -s format lint  # Run multiple sessions
nox -s tests --     # Pass arguments to the session (after --)
```

{{< callouts "tip" "Project Structure" >}}
Place your `noxfile.py` in the root directory of your project, alongside your `requirements.txt` or `pyproject.toml` file. This ensures Nox can easily find your project files and dependencies.
{{< /callouts >}}

Before creating your `noxfile.py`, install Nox in your development environment:

```bash
pip install nox black ruff
```

{{< callouts "note" "Virtual Environment Recommendation" >}}
I prefer to put all of my dependencies in a `requirements.txt` file and install them in a virtual environment. This keeps my global Python environment clean and avoids version conflicts between projects.
{{< /callouts >}}

If you're using a requirements.txt file for your project dependencies, here's a complete `noxfile.py` example:

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

> If you want to read more about nox, check out the [official documentation](https://nox.thea.codes/en/stable/).

And that's it! You now have a fully automated testing and development workflow using Nox. You can easily run your formatting, linting, and testing commands with simple terminal commands. This saves time and ensures your development environment stays consistent and reproducible across different machines.

Next week I plan on explaining how you can use nox in your ci/cd pipeline to automate your testing and deployment processes. Stay tuned!

If you have any questions or topics you'd like me to cover, feel free to reach out!

Contact me at [calebaguirreleon@gmail.com](mailto:calebaguirreleon+blog.questions@gmail.com?subject=Question%20about%20Concept&body=Hi%20Caleb%2C%0A%0AI%20read%20your%20Nox%20tutorial%20and%20had%20a%20question%3A%0A%0A%5BYour%20question%20here%5D%0A%0AThanks%21)