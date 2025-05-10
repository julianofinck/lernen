# Python
General-purpose OOP interpreted language, released in 1989. Emphasizes in readibility
## Terminology
| Term      | Meaning                                                      |
|-----------|--------------------------------------------------------------|
| Module    | Bunch of related code saved in a file with the extension .py |
| Package   | A directory of a collection of modules with __init__.py      |
| Library   | Umbrella term referring to a reusable chunk of code          |
| Framework | Contain the basic flow and architecture of an application    |
>"It's often assumed a library is a collection of packages, which are a collection of modules"

## TODO
A. Knowledge Review: identify areas for improvement:

1. **Structured Review:**  
Go through your projects, scripts, or code snippets to recall what you've worked on. Identify areas where you feel confident and areas that seem less familiar.

1. **Documentation and Tutorials:**  
Review official Python documentation and tutorials on websites like Python.org or other reputable sources. This can help reinforce your understanding of key concepts.

1. **Books and Courses:**  
Consider reading advanced Python books or taking online courses that cover more in-depth topics. This can provide a structured learning path.

1. **Coding Challenges:**  
Engage in coding challenges on platforms like LeetCode, HackerRank, or CodeSignal. This will not only reinforce your knowledge but also expose you to new concepts.

1. **Community Participation:**  
Join Python communities, forums, or discussion platforms. Engaging with others can expose you to different perspectives and challenges that you may not have encountered on your own.

1. **Version Updates:**  
Stay updated on the latest Python versions and changes. Review new features and improvements to ensure your knowledge aligns with current best practices.

1. **GitHub Repositories:**  
Explore open-source Python projects on GitHub. Analyze the codebase, understand the design patterns, and learn from the community's coding style.

1. **Code Reviews:**  
Seek feedback on your own code. Code reviews, whether from colleagues or online communities, can provide valuable insights and highlight areas for improvement.

1. **Documentation Skills:**  
Enhance your ability to write clear and concise documentation. Documenting your code not only helps others understand it but also reinforces your own understanding.

1. **Project Refactoring:**  
Take one of your older projects and refactor it. This exercise can help you apply new knowledge, improve code structure, and identify areas where your understanding may be lacking.


B. Key Aspects Roadmap:

1. **Basics:**  
Variables and Data Types (int, float, str)
Lists, Tuples, and Sets
Dictionaries and Dictionary Methods
Conditional Statements (if, elif, else)
Loops (for, while)
Functions and Scope
1. **Advanced Data Types:**  
List Comprehensions
Lambda Functions
Map, Filter, and Reduce
Generators and Iterators
1. **File Handling:**  
Reading and Writing to Files
Working with Different File Formats (e.g., CSV, JSON)
1. **Modules and Packages:**  
Importing Modules
Creating and Using Packages
Exploring Standard Library Modules (e.g., os, sys)
1. **Error Handling:**  
Exception Handling (try, except, finally)
Custom Exceptions
1. **Object-Oriented Programming (OOP):**  
Classes and Objects
Inheritance and Polymorphism
Encapsulation and Abstraction
1. **Functional Programming:**  
First-class Functions
Decorators
Closures
1. **Regular Expressions:**  
Basic Patterns
Using re Module
1. **Testing:**  
Unit Testing with unittest or pytest
Test-driven Development (TDD)
1. **Web Development:**  
Basics of Web Frameworks (e.g., Flask, Django)
1. **Data Science/Analysis:**  
Importing and Using Libraries (e.g., Pandas, NumPy)
Data Cleaning and Manipulation
1. **Version Control:**  
Basic Usage of Git
Collaborative Workflows (Branching, Merging)
1. **Concurrency and Parallelism:**  
Threading and Multiprocessing
1. **APIs and Web Services:**  
Making API Requests (e.g., using requests library)
Understanding RESTful APIs
1. **Database Connectivity:**  
Basics of Database Interaction (e.g., using SQLite or SQLAlchemy)
1. **Deployment:**  
Packaging and Distributing Python Applications
Basic Deployment Strategies



## Libraries
| Lib                                                      | Use                                                         |
|--------------------------------------------------------- |-------------------------------------------------------------|
| [python-dotenv](https://pypi.org/project/python-dotenv/) | load from a `.env` (`from dotenv import load_dotenv`)|
| numpy                                                    | arrays                                                      |
| pandas                                                   | tabular                                                     |
| xarray                                                   | multidimensional arrays                                     |
| dask                                                     | parallelisation for xarray                                  |
| pangeo-stack                                             | packages and project, very cloud-oriented                   |
| zarr                                                     | cloud-friendly format, well integrated with xarray and dask |
| CliMetLab                                                | domain specific, make use of all these packages             |
| PyTorch and Tensorflow                                   | most popular python packages for ML                         |

---

## 1. python-dotenv: `pip install python-dotenv`
dotenv is good for security, ease of use and to simplify configurations. When applicable, check if the software you are about to use do not have conventional env var names instead of comming up with names. (The "." means in UNIX-systems "a file that should remain hidden from regular directory viewers)

Declare environmet variables in a ".env" file in root: 
```bash
# Create a .env file with
DB_HOST=localhost
DB_PORT=5432
DB_USER=myuser
DB_PASSWORD=mypassword
```
In Python, load the variables with `load_dotenv()` and get them as with os:
```python
from dotenv import load_dotenv  # pip install python-dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Access the env vars
db_host = os.getenv("DB_HOST")
db_port = os.getenv("DB_PORT")
db_user = os.getenv("DB_USER")
db_password = os.getenv("DB_PASSWORD")
```

## 2. Dependencies - Libraries
Often we want to isolate our project environment and dependencies
### 2.1) Built-in approach: `venv` isolates, `pip` manages
```bash
# Create a virtual environment (some OSs use "python3")
python -m venv .venv

# Activate it
.venv/Scripts/activate     # Windows
source .venv/bin/activate  # Linux

####    Package manager (pip)    ####
# [Un-]install libraries
pip [un]install package_name
pip [un]install -r requirements.txt

# Print libraries & pipe them to "requirements.txt"
pip freeze > requirements.txt
```
### 2.2) The Data Science approach: Anaconda ([download](https://www.anaconda.com/download/))
Open the Anaconda Prompt as administrator:
```conda
# Update conda
conda update conda

# Install & update Jupyter
conda install jupyter
conda update jupyter

# Install packages
conda install numpy pandas statsmodels matplotlib seaborn
```
to open Jupyter Notebook from Anaconda Prompt:
```conda
jupyter notebook
pip install -U scikit-learn
```
Jupyter notebooks support **Inspection** and **Code Completion**.  
The docstring of any object can be accessed in any cell with `object?`  
Code completion appear when `tab` gets pressed.

---

Start Jupyter opening the anaconda prompt, activating the env, navigating to the project folder and `jupyter notebook`

After finishing a ipynb, it can be converted  
- via GUI with the `File > Download as > Python` or 
- via CLI `jupyter nbconvert --to=python myFirstNotebook.ipynb`.

Getting requirements from all scripts in a folder with pipreqs
```bash
# If env does not have pipreqs yet
pip install pipreqs

# Export all external imports to folder/requirements.txt
pipreqs folder/
```

### 2.3) Package & Dependency Manager (requires Python 3.8+)  
Since 2018/19 with PEP 517 and PEP 518 (Definitions for build backend and for package dependencies, 
respectively), **Poetry** gains popularity as a modern package manager for Python and is encouraged to use 
in production code 
([source](https://community.sap.com/t5/application-development-blog-posts/why-you-should-use-poetry-instead-of-pip-or-conda-for-python-projects/ba-p/13545646)). 
Poetry aims at simplifying workflows when dealing with private repositories 
and switching between development and production environments.

Also, `pip` is not particularly good at solving transitive dependencies 
(if package A has a listed dependency B, but B depends on a C package not listed in A, then C is called a transitive dependency) 
Some people prefer to use `pipenv` instead of `poetry`. They are said to be a direct competitors.

According to [Poetry Doc](https://python-poetry.org/docs/), **Poetry** should be installed via `pipx install poetry` 
because of it's global CLI nature. `pipx` can manage upgrades and uninstalls of **Poetry** and 
keeps it globally while isolated from other packages. 
`poetry install` creates a **"pyproject.toml"**, which aims to solve the the build-tool dependency _chicken-and-egg 
problem_, i.e. pyproject.toml ensures what version of setuptools, wheel and other dependencies are needed. 

Add auto-completion in **bash** for **Poetry** with `poetry completions bash >> ~/.bash_completion`

```bash
# Initialise a pre-existing project
cd <project_dir>
poetry init

# To keep the virtual env inside the project
poetry config virtualenvs.in-project true

# Add dependencies
### production
poetry add numpy[@1.3.1]
poetry add git+https://github.com/karantan/ansible.git@v2.6.0.1
### development only
poetry add pytest --dev

# Install packages 
### for production only
poetry install --only main
### both development and production dependencies
poetry install

# Activate environment (type "deactivate" to deactivate it)
poetry shell
# Exit the shell with "exit"

# Add private repo in .toml
[[tool.poetry.source]]
name = "name-of-private-repo"
url = "url-of-private-repo"
secondary = true
```

## 3. Formatters & Linters
### 3.1) Pre-Commit
Formatters and Linters (prune small mistakes) are often run by **[Pre-Commit](https://pre-commit.com/) Hooks**. It is a language-agnostic tool to automate tasks before commiting. In Python, you get it via `pip install pre-commit`.

It works after the `.pre-commit-config.yaml` at the project root. Below an example from [black doc](https://black.readthedocs.io/en/stable/integrations/source_version_control.html) and [isort doc](https://pycqa.github.io/isort/docs/configuration/pre-commit.html):

```bash
# .pre-commit-config.yaml
repos:
  # Using this mirror lets us use mypyc-compiled black, which is about 2x faster
  - repo: https://github.com/psf/black-pre-commit-mirror
    rev: 24.2.0
    hooks:
      - id: black
        # It is recommended to specify the latest version of Python
        # supported by your project here, or alternatively use
        # pre-commit's default_language_version, see
        # https://pre-commit.com/#top_level-default_language_version
        language_version: python3.11
  - repo: https://github.com/pycqa/isort
    rev: 5.11.2
    hooks:
      - id: isort
        name: isort (python)
```
The actual **rev** will change with time and indicate the version being used. Check in the documentation. The `language_version` must match the one you are using. If your venv is different, you can change it in the config file, but there might be a risk of incompatibility.

**Pre-Commit** must be installed (`pre-commit install`) into `.git` every time new hooks are added. The good practice says to run `pre-commit run --all-files` after adding new hooks, otherwise the hooks will only affect modified files.

You can update the hooks with `pre-commit autoupdate`. To run a specific hook, `pre-commit run <hook_id>`.


### 3.1) Formatters: [isort](https://pycqa.github.io/isort/) (format imports) and [Black](https://pypi.org/project/black/) (The Uncompromising Code Formatter)
Black and isort are not linters but formatters for sorting imports and spacing, respectively. Black default line wrapping is 88, meanwhile pep8 suggests 79.  
`pip install isort` requires Python 3.7+.  
`pip install black` requires Python 3.8+.

|Command | Description|
|---|---|
|black -h| call help|
|black --diff . | check all the changes it would make|
|black . | auto-format all code|
|black <filename> | auto-format only the specific code|
|black -v . | auto-format all and print each file it formatted|

### 3.3) Popular combo-linters: [Flake8](https://flake8.pycqa.org/en/latest/) & [Pylama](https://pypi.org/project/pylama/)

Flake8 has Pyflakes, pycodestyle (pep8) and Mccabe.

Pylama is a superset of Flake8 with pydocstyle (pep257), Pylint, Radon and gjslint.

Bandit checks for common security issues

MyPy checks for optionally enforced static types

Pycodestyle follows some conventions of pep8, and categorizes it with error-codes: https://pycodestyle.readthedocs.io/en/latest/intro.html#error-codes

PEP8
PEP257

### 3.4) Ruff
Install **ruff** system-wide
`pipx install ruff`
or `pip install ruff` project-specific. 

By Default, **Ruff** does not check for **stylistic rules** that overlap with the use of a formatter.  
Nevertheless, you can add still these rules. The **formatting rules** are fixed with specific command

| Command | Description |
| --- | --- |
|`ruff check [path] [--fix]` | check for errors in all files, alerting when easy fixable|
|`ruff rule [RULE_CODE]` | returns the rule description|
|`ruff check --watch`| can be run in another terminal that let you know if errors pop up during development |
|`ruff check --select E` | include all E rules in check |
|`ruff format [--diff]` | format all files |


## 4. Tests
`unitest` and `pytest` are popular python libraries for testing.

Tests are used to make sure a code is stable and robust. A popular development best practice is called TDD - Test Driven Development - in which tests are written before coding.

arjanCodes [1](https://youtu.be/ULxMQ57engo)

pytest & pytest-coverage

`pytest` runs the tests. `pytest -cov` shows the coverage of the tests. `coverage html` creates a coverage html in the root that helps for some interaction.

**Where to start?**  
Start at the parts of your code that are going to be responsible for the breaks, which are the most dangerous piece of code.  
Core primary classes are essential to be tested too.

### Getting started
Create a "test" dir in the package dir. Test functions start with `test_`:
```
my_package/
├── __init__.py
├── class1.py
└── tests/
    ├── __init__.py
    └── test_class1.py
```
```python
# test_class1.py
from my_package.class1 import Class1


def test_class1_default() -> None:
    class1 = Class1()
    assert class1.name == 'class1'

# If one desires to test for Errors, pytest is necessary
import pytest

def test_class1_attribute() -> None:
    class1 = Class1()
    with pytest.raises(AttributeError):
        class1.name_of_the_class

# MonkeyPatch is used for mocking -------
from pytest import MonkeyPatch

# classes related to the method being tested
from pay.order import LineItem, Order
from pay.payment import pay_order
from pay.processor import PaymentProcessor

# this example mocks three calls that are made in a builtin (input)
def test_pay_order(monkeypatch: MonkeyPatch) -> None:
    def charge_mock(card: str, month: int, year: int, amount: int) -> None:
        pass # Because we do not truly want to charge anything

    inputs = ["1249190007575", "12", "2026"]
    monkeypath.setattr("builtins.input", lambda _: inputs.pop(0))
    # This is necessary because "pay_order" calls an instance of PaymentProcessor and checks the api key on the fly. This mock is essential.
    monkeypath.setattr("PaymentProcessor", "_check_api_key", lambda _: True)
    monkeypath.setattr("PaymentProcessor", "charge", charge_mock)
    order = Order()
    order.line_items.append(LineItem("Test", 100))
    pay_order(order)

def test_pay_order_invalid(monkeypatch: MonkeyPatch) -> None:
    with pytest.raises(ValueError):
        inputs = ["1249190007575", "12", "2026"]
        monkeypath.setattr("builtins.input", lambda _: inputs.pop(0))
        monkeypath.setattr("PaymentProcessor", "charge", charge_mock)
        order = Order()
        pay_order(order)  # Since order is empty, pay_order should fail

```

## 5. Generators
Ever worked with a dataset so large that it overwhelmed your machine’s memory? Or maybe you have a complex function that needs to maintain an internal state every time it’s called, but the function is too small to justify creating its own class. In these cases and more, generators and the Python yield statement are here to help.


## 6. Decorators
```python
"""
Decorators are functions extend the behaviour of another function/methods/classes.
Fundamentally:
    function = decorator(function)

*args, **kwargs permit an arbitrary number of positional and keyword arguments

Decorators can be nested and are non-comutative

time.time           -> good for getting datetime
time.perf_counter   -> measuring time performance
timeit module       -> more precise measurements (garbage collection temporarily disabled)

https://realpython.com/primer-on-python-decorators/
"""
import functools        # Keep introspection by "fixing" __name__ and __doc__
import time


def decorator(func):
    """Boilerplate template for building more complex decorators"""
    @functools.wraps(func)      # @functools.wraps preserve information about the original function
    def wrapper_decorator(*args, **kwargs):
        # Do something before
        value = func(*args, **kwargs)
        # Do something after
        return value
    return wrapper_decorator


def timer(func):
    """Print the runtime of the decorated function"""
    @functools.wraps(func)
    def wrapper_timer(*args, **kwargs):
        start_time = time.perf_counter()
        value = func(*args, **kwargs)
        end_time = time.perf_counter()
        run_time = end_time - start_time
        print(f"Finished {func.__name__!r} in {run_time:.4f} secs")
        return value
    return wrapper_timer


def debug(func):
    """Print the function signature and return value"""
    @functools.wraps(func)
    def wrapper_debug(*args, **kwargs):
        args_repr = [repr(a) for a in args]                      # positional arguments
        kwargs_repr = [f"{k}={v!r}" for k, v in kwargs.items()]  # keyword arguments
        signature = ", ".join(args_repr + kwargs_repr)
        print(f"[DEBUG] Calling {func.__name__}({signature})")
        value = func(*args, **kwargs)
        print(f"[DEBUG] {func.__name__!r} returned {value!r}")
        return value
    return wrapper_debug


PLUGINS = dict()
def register(func): # noqa
    """Register a function as a plug-in, requires PLUGINS = dict() called in outer scope"""
    PLUGINS[func.__name__] = func
    return func


def do_twice(func):
    """Repeat once"""
    @functools.wraps(func)
    def wrapper_do_twice(*args, **kwargs):
        func(*args, **kwargs)
        value = func(*args, **kwargs)
        return value
    return wrapper_do_twice


def slow_down(func):
    """Sleep 1 second before calling the function"""
    @functools.wraps(func)
    def wrapper_slow_down(*args, **kwargs):
        time.sleep(1)
        return func(*args, **kwargs)
    return wrapper_slow_down


# =============================================================== #
# Facultative arguments consist in adding an extra outer function
def repeat(_func=None, *, num_times=2):  # * means the remaining args cant be called as positional args
    """Repeat with facultative arguments"""
    def decorator_repeat(func):
        @functools.wraps(func)
        def wrapper_repeat(*args, **kwargs):
            for _ in range(num_times):
                value = func(*args, **kwargs)
            return value    # noqa
        return wrapper_repeat

    if _func is None:   # when called with arguments, _func won't b one of them, only num_times.
        return decorator_repeat
    else:               # when called without args, _func will receive the original function object to be decorated
        return decorator_repeat(_func)


def slow_down(_func=None, *, rate=1):   # noqa
    """Sleep given amount of seconds before calling the function for instance for webscraping"""
    def decorator_slow_down(func):
        @functools.wraps(func)
        def wrapper_slow_down(*args, **kwargs):
            time.sleep(rate)
            return func(*args, **kwargs)
        return wrapper_slow_down

    if _func is None:
        return decorator_slow_down
    else:
        return decorator_slow_down(_func)


# =============================================================== #
# Decorators keeping state - How many times was a function called?
# in Decorator
def count_calls(func):
    @functools.wraps(func)
    def wrapper_count_calls(*args, **kwargs):
        wrapper_count_calls.num_calls += 1
        print(f"Call {wrapper_count_calls.num_calls} of {func.__name__!r}")
        return func(*args, **kwargs)
    wrapper_count_calls.num_calls = 0       # property added to the wrapper function
    return wrapper_count_calls


# in Class decorator, typically by implementing __init__() and, to make it callable, __call__()
class CountCalls:
    def __init__(self, func):
        functools.update_wrapper(self, func)
        self.func = func
        self.num_calls = 0

    def __call__(self, *args, **kwargs):  # Define what happens when the instance of the class is called as if it were a function
        self.num_calls += 1
        print(f"Call {self.num_calls} of {self.func.__name__!r}")
        return self.func(*args, **kwargs)


# =============================================================== #
# Real world examples
def singleton(cls):
    """Make a class a Singleton class (only one instance)"""
    @functools.wraps(cls)
    def wrapper_singleton(*args, **kwargs):
        if not wrapper_singleton.instance:
            wrapper_singleton.instance = cls(*args, **kwargs)
        return wrapper_singleton.instance
    wrapper_singleton.instance = None
    return wrapper_singleton


# caching and memoization example - If function is called with "args + kwargs", its output is saved in decorator cache
def cache(func):
    """Keep a cache of previous function calls"""
    @functools.wraps(func)
    def wrapper_cache(*args, **kwargs):
        cache_key = args + tuple(kwargs.items())
        if cache_key not in wrapper_cache.cache:
            wrapper_cache.cache[cache_key] = func(*args, **kwargs)
        return wrapper_cache.cache[cache_key]
    wrapper_cache.cache = dict()
    return wrapper_cache


# Still on caching and memoization:
#   The @functools.lru_cache has more features than the one you saw above.
@functools.lru_cache(maxsize=4)    # maxsize -> specifies how many recent calls are cached
def fibonacci(num):
    print(f"Calculating fibonacci({num})")
    if num < 2:
        return num
    return fibonacci(num - 1) + fibonacci(num - 2)


fibonacci.cache_info()
# CacheInfo(hits=17, misses=20, maxsize=4, currsize=4)

""" ---------------------------------------------------------------------------
Adds unit as a function attribute. Seems useful when coding larger applications.
  can be later accessed func.unit
  
  this becomes more powerful when connected to a library that can convert between units.
  one such library is pint. With pint installed (pip install Pint), you can for instance
  convert the volume to cubic inches or gallons.
"""
def set_unit(unit):  # noqa
    """Register a unit on a function"""
    def decorator_set_unit(func):
        func.unit = unit
        return func
    return decorator_set_unit

import math  # noqa


@set_unit("cm^3")
def volume(radius, height):
    return math.pi * radius**2 * height


"""
One last example would be making a decorator to validate_json
  for a "update_grade()" function in Flask route handler.
  
  the usage of such a decorator would explain itself because
  there might other routes in the project that also need a 
  validate_json
"""


"""
Object Oriented Programming

In Python 3.7, @dataclass provides a simple way to add a typical boilerplate
used by the community to set up classes only responsible for storing data

• Creation of an __init__ that receives the parameters and puts them in attributes in self.
• Creation of a much more useful __repr__ for the class, which returns the class name and attributes instead of the memory address
• Creation of comparison functions __eq__ and __ne__ that compare the attributes by equality in the order, 
allowing the comparison of instances of the class with the operators = and !=;
• Optionally create the functions __lt__, __le__, __gt__ and __ge__, which compare the attributes in order, 
allowing the class to be used with comparison operators > >= <= < and with sorting functions .sort() and sorted()
• Optionally "freezes" the class, that is, does not allow the fields to be changed after initialization, to simulate an immutable object.

Source: https://pt.stackoverflow.com/questions/376306/o-que-s%C3%A3o-dataclasses-e-quando-utiliz%C3%A1-las
"""
from dataclasses import dataclass   # noqa


@dataclass
class PlayingCard:
    rank: str
    suit: str


if __name__ == '__main__':
    pass


```

## 7. Applied Data Science with Python and Jupyter (2018) Alex Galea
GitHub: https://github.com/TrainingByPackt/Applied-Deep-Learning-with-Python  
Other:  https://github.com/PacktPublishing

There are two primary types of Jupyter Notebooks:
- Lab-style: analog to research journals, they keep all the work you've done to load, process, analyse, and model data, including approaches that didn't work.
- Deliverable: presentable and contains aonly selected parts of the lab-style notebooks (eg. an interesting discovery to share with colleagues; in-depth report for a manager, or a summary of the key-findings)

## 9. Django
Django is a Python framework for backend (server-side) development. Other Server-side frameworks are Express (for JavaScript devs), ASP.NET Core (for C# devs). Client-side frameworks are React, Angular and Vue.

The current webdev standard pushes the responsibility of generating html to the client, while enabling the server to handle more user connections. The server effectivelly becomes a gateway to the data.

The server provides APIs to the clients. Django can be used to build APIs.
