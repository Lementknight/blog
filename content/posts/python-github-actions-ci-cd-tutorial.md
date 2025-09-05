---
title: "Setting Up Python CI/CD with GitHub Actions and Nox"
tags: ["python", "github-actions", "ci-cd", "nox", "automation", "testing", "workflow"]
date: 2025-08-30T18:18:14-04:00
description: "Learn how to automate your Python project testing and deployment using GitHub Actions with Nox. Stop manually running tests and create a robust CI/CD pipeline that runs your formatting, linting, and testing automatically on every commit."
draft: false
---

In my ongoing journey to improve my Python development workflow, I've discovered the power of combining [Nox](/posts/nox-tutorial/) with GitHub Actions. After setting up Nox to automate my local development tasks, I realized I was still manually running these commands every time I wanted to push code. That's when I thought: "Why not automate this entire process in the cloud?"

This week, I'll show you exactly how to build upon the Nox setup we covered previously and create a complete CI/CD pipeline using GitHub Actions. By the end of this tutorial, your Python projects will automatically run formatting, linting, and testing on every commit - no more manual work!

To make this easier to follow along, I've created a starter repository template that includes all the files we'll be working with. You can find it here: [Python CI/CD Tutorial Starter Repo](https://github.com/Lementknight/Python-Github-Actions-Ci-Cd-Tutorial-Starter-Repo). Feel free to use it as your starting point!

## Setting Up Your Project Foundation

Before we dive into GitHub Actions, let's make sure your project has the essential files. If you followed my previous Nox tutorial, you might already have some of these!

First, you'll need a `requirements.txt` file in your project root with these development dependencies:
```txt
nox
ruff
black
coverage
```

Next, here's the `noxfile.py` that should be familiar from my previous tutorial:

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

{{< callouts "tip" "Customize Your Linting" >}}
I always like to include an `ruff.toml` file to specify exactly which linting rules I want my projects to follow. This keeps my code consistent across all my projects:
{{< /callouts >}}

```toml
[lint]
select = [
    # pycodestyle
    "E",
    # Pyflakes
    "F",
    # pyupgrade
    "UP",
    # flake8-bugbear
    "B",
    # flake8-simplify
    "SIM",
    # isort
    "I",
]
```

One thing I learned the hard way early in my Python journey was the importance of a comprehensive `.gitignore` file. Trust me, you don't want to accidentally commit your virtual environment or sensitive data! Here's the template I use for all my Python projects:
```sh
# Byte-compiled / optimized / DLL files
__pycache__/
*.py[codz]
*$py.class

# C extensions
*.so

# Distribution / packaging
.Python
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
wheels/
share/python-wheels/
*.egg-info/
.installed.cfg
*.egg
MANIFEST

# PyInstaller
#  Usually these files are written by a python script from a template
#  before PyInstaller builds the exe, so as to inject date/other infos into it.
*.manifest
*.spec

# Installer logs
pip-log.txt
pip-delete-this-directory.txt

# Unit test / coverage reports
htmlcov/
.tox/
.nox/
.coverage
.coverage.*
.cache
nosetests.xml
coverage.xml
*.cover
*.py.cover
.hypothesis/
.pytest_cache/
cover/

# Translations
*.mo
*.pot

# Django stuff:
*.log
local_settings.py
db.sqlite3
db.sqlite3-journal

# Flask stuff:
instance/
.webassets-cache

# Scrapy stuff:
.scrapy

# Sphinx documentation
docs/_build/

# PyBuilder
.pybuilder/
target/

# Jupyter Notebook
.ipynb_checkpoints

# IPython
profile_default/
ipython_config.py

# pyenv
#   For a library or package, you might want to ignore these files since the code is
#   intended to run in multiple environments; otherwise, check them in:
# .python-version

# pipenv
#   According to pypa/pipenv#598, it is recommended to include Pipfile.lock in version control.
#   However, in case of collaboration, if having platform-specific dependencies or dependencies
#   having no cross-platform support, pipenv may install dependencies that don't work, or not
#   install all needed dependencies.
#Pipfile.lock

# UV
#   Similar to Pipfile.lock, it is generally recommended to include uv.lock in version control.
#   This is especially recommended for binary packages to ensure reproducibility, and is more
#   commonly ignored for libraries.
#uv.lock

# poetry
#   Similar to Pipfile.lock, it is generally recommended to include poetry.lock in version control.
#   This is especially recommended for binary packages to ensure reproducibility, and is more
#   commonly ignored for libraries.
#   https://python-poetry.org/docs/basic-usage/#commit-your-poetrylock-file-to-version-control
#poetry.lock
#poetry.toml

# pdm
#   Similar to Pipfile.lock, it is generally recommended to include pdm.lock in version control.
#   pdm recommends including project-wide configuration in pdm.toml, but excluding .pdm-python.
#   https://pdm-project.org/en/latest/usage/project/#working-with-version-control
#pdm.lock
#pdm.toml
.pdm-python
.pdm-build/

# pixi
#   Similar to Pipfile.lock, it is generally recommended to include pixi.lock in version control.
#pixi.lock
#   Pixi creates a virtual environment in the .pixi directory, just like venv module creates one
#   in the .venv directory. It is recommended not to include this directory in version control.
.pixi

# PEP 582; used by e.g. github.com/David-OConnor/pyflow and github.com/pdm-project/pdm
__pypackages__/

# Celery stuff
celerybeat-schedule
celerybeat.pid

# SageMath parsed files
*.sage.py

# Environments
.env
.envrc
.venv
env/
venv/
ENV/
env.bak/
venv.bak/

# Spyder project settings
.spyderproject
.spyproject

# Rope project settings
.ropeproject

# mkdocs documentation
/site

# mypy
.mypy_cache/
.dmypy.json
dmypy.json

# Pyre type checker
.pyre/

# pytype static type analyzer
.pytype/

# Cython debug symbols
cython_debug/

# PyCharm
#  JetBrains specific template is maintained in a separate JetBrains.gitignore that can
#  be found at https://github.com/github/gitignore/blob/main/Global/JetBrains.gitignore
#  and can be added to the global gitignore or merged into this file.  For a more nuclear
#  option (not recommended) you can uncomment the following to ignore the entire idea folder.
#.idea/

# Abstra
# Abstra is an AI-powered process automation framework.
# Ignore directories containing user credentials, local state, and settings.
# Learn more at https://abstra.io/docs
.abstra/

# Visual Studio Code
#  Visual Studio Code specific template is maintained in a separate VisualStudioCode.gitignore 
#  that can be found at https://github.com/github/gitignore/blob/main/Global/VisualStudioCode.gitignore
#  and can be added to the global gitignore or merged into this file. However, if you prefer, 
#  you could uncomment the following to ignore the entire vscode folder
# .vscode/

# Ruff stuff:
.ruff_cache/

# PyPI configuration file
.pypirc

# Cursor
#  Cursor is an AI-powered code editor. `.cursorignore` specifies files/directories to
#  exclude from AI features like autocomplete and code analysis. Recommended for sensitive data
#  refer to https://docs.cursor.com/context/ignore-files
.cursorignore
.cursorindexingignore

# Marimo
marimo/_static/
marimo/_lsp/
__marimo__/

# Mac OS Metadata
.DS_Store
``` 

{{< callouts "tip" "Optional: Local Development Setup" >}}
If you're working with teammates or frequently clone repositories, consider adding a `setup.sh` script to automate virtual environment creation. This isn't required for GitHub Actions (since it creates its own environments), but it's incredibly handy for local development:

```shell
#!/usr/bin/env bash

python3 -m venv .virtualenv

if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    source .virtualenv/Scripts/activate
else
    source .virtualenv/bin/activate
fi

pip install --upgrade pip
pip install -r requirements.txt
```
{{< /callouts >}}

## Creating Your First GitHub Actions Workflow

Now comes the exciting part! With all our project files in place, it's time to set up the CI/CD pipeline that will run automatically whenever you push code.

First, let's create the directory structure that GitHub Actions expects:
```shell
mkdir -p .github/workflows
```

The `.github` directory is like the control center for your repository - it's where GitHub looks for all configuration files. The `workflows` subdirectory is specifically where we'll define our automated processes.

Now for the main event! Let's create our workflow file. I like to name mine `python-package.yml` to keep things clear and descriptive:
```yml
# This workflow will install Python dependencies, run tests and lint with a variety of Python versions
# For more information on workflows see: https://docs.github.com/en/actions/automating-builds-and-tests/building-and-testing-python
# For information on branch naming conventions: https://medium.com/@abhay.pixolo/naming-conventions-for-git-branches-a-cheatsheet-8549feca2534

name: Python package
on:
  workflow_dispatch:
  push:
    branches: ["main", "feature/*", "hotfix/*", "bugfix/*", "release/*", "stable/*"]
    paths:
      - '**/*.py'
      - '**/*.pyi'
      - 'requirements.txt'
      - 'noxfile.py'
  pull_request:
    branches: ["main", "feature/*", "hotfix/*", "bugfix/*", "release/*", "stable/*"]
    paths:
      - '**/*.py'
      - '**/*.pyi'
      - 'requirements.txt'
      - 'noxfile.py'
jobs:
  build:
    runs-on: ${{ matrix.os }}
    strategy:
      fail-fast: false
      matrix:
        python-version: ["3.12"]
        os: [ubuntu-latest, windows-latest, macOS-latest]
    steps:
      - uses: actions/checkout@v4
      - name: Set up Python ${{ matrix.python-version }}
        uses: actions/setup-python@v3
        with:
          python-version: ${{ matrix.python-version }}
      - name: Install nox
        run: |
          python -m pip install --upgrade pip
          python -m pip install nox
      - name: Run format with nox
        run: nox -s format
        env:
          PYTHONPATH: ${{ github.workspace }}
      - name: Run lint with nox
        run: nox -s lint
        env:
          PYTHONPATH: ${{ github.workspace }}
      - name: Run tests with nox
        run: nox -s tests
        env:
          PYTHONPATH: ${{ github.workspace }}
```

## Committing Your Workflow

Now that we've created our workflow file, we need to commit and push it to GitHub so it can start working its magic:

```shell
git add .
git commit -m "Add GitHub Actions CI/CD workflow"
git push origin main
```

Once you push this, head over to your GitHub repository and click on the "Actions" tab. You should see your new workflow listed there! If there are any syntax errors in your YAML, GitHub will let you know right away.

{{< callouts "note" "Workflow Validation" >}}
If your workflow doesn't appear in the Actions tab, double-check that your YAML indentation is correct. YAML is very sensitive to spaces and tabs. You can also use online YAML validators to check your syntax before committing.
{{< /callouts >}}

## Setting Up Branch Protection (Important!)

Before we test our workflow, let's set up branch protection rules. This ensures that our CI/CD jobs must pass before any code can be merged into the main branch - trust me, your future self will thank you for this!

Here's a basic ruleset I've created that works well for most projects:

```json
{
  "id": 7904611,
  "name": "Basic Ruleset",
  "target": "branch",
  "source_type": "Repository",
  "source": "Lementknight/Python-Github-Actions-Ci-Cd-Tutorial-Starter-Repo",
  "enforcement": "active",
  "conditions": {
    "ref_name": {
      "exclude": [],
      "include": [
        "refs/heads/main"
      ]
    }
  },
  "rules": [
    {
      "type": "deletion"
    },
    {
      "type": "non_fast_forward"
    },
    {
      "type": "pull_request",
      "parameters": {
        "required_approving_review_count": 0,
        "dismiss_stale_reviews_on_push": false,
        "require_code_owner_review": false,
        "require_last_push_approval": false,
        "required_review_thread_resolution": false,
        "automatic_copilot_code_review_enabled": false,
        "allowed_merge_methods": [
          "merge",
          "squash",
          "rebase"
        ]
      }
    }
  ],
  "bypass_actors": []
}

``` 

You can save this JSON content to a file and import it to your repository following GitHub's [ruleset import guide](https://docs.github.com/en/organizations/managing-organization-settings/managing-rulesets-for-repositories-in-your-organization#importing-a-ruleset). 

{{< callouts "warning" "Set This Up First" >}}
I recommend setting up these protection rules before creating your first pull request. This way, you'll immediately see the CI/CD checks in action and ensure your workflow is properly configured.
{{< /callouts >}}

Feel free to adjust these rules based on your project's needs. For more advanced protection options, check out GitHub's guide on [creating rulesets for repositories](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/creating-rulesets-for-a-repository).

## Testing Your New CI/CD Pipeline

Now for the fun part - let's see it in action! Create a [pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request) to trigger your workflow. You'll see GitHub Actions automatically run your formatting, linting, and testing jobs. It's honestly satisfying to watch!

And that's it! You now have a robust CI/CD pipeline that automatically ensures your Python code meets your quality standards before it gets merged. No more "oops, I forgot to run the tests" moments!

## What's Next?

I'm planning to write about advanced GitHub Actions topics like deploying to PyPI, setting up matrix builds for multiple Python versions, and integrating with other tools like pre-commit hooks. If there's a specific topic you'd like me to cover, let me know!

If you run into any issues setting up your CI/CD pipeline or have questions about any part of this process, feel free to reach out. I'm always happy to help fellow developers streamline their workflows.

Contact me at [calebaguirreleon@gmail.com](mailto:calebaguirreleon+blog.questions@gmail.com?subject=Question%20about%20Python%20CI/CD&body=Hi%20Caleb%2C%0A%0AI%20read%20your%20GitHub%20Actions%20CI/CD%20tutorial%20and%20had%20a%20question%3A%0A%0A%5BYour%20question%20here%5D%0A%0AThanks%21)
