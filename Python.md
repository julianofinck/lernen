### Dependencies - Libraries
```bash
# uninstall all libraries:
pip freeze > requirements.txt
pip uninstall -r requirements.txt -y
```

### Decorators
teste 2
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


### Generators

Have you ever had to work with a dataset so large that it overwhelmed your machine’s memory? Or maybe you have a complex function that needs to maintain an internal state every time it’s called, but the function is too small to justify creating its own class. In these cases and more, generators and the Python yield statement are here to help.
