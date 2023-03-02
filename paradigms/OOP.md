# Object-Oriented Programming (OOP)
OOP is a paradigm. A `Class` is a blueprint/template from which **objects**, the realization of the class, can get instantiated/created.

## Motivation
My old codes would use dictionaries to store data; its keys being names and values list/tuple of in a certain order.
OOP is a paradigm that can make code easier to read and maintain. Instead of
```python
elements = {
    '_name1': (_xpath1, _duplicate1),
    '_name2': (_xpath2, _duplicate2)
    #...
}
```
The way below is more expressive when interacting with the code; `modifications[0].name` returns the name and one must not remember the order of data in the previous tuple

```python
class Element:
    def __init__(self, _name, _xpath, _duplicate):
        self.name = _name
        self.xpath = _xpath
        self.duplicate = _duplicate
        
modifications = [
    Element(_name1, _xpath1, _duplicate1),
    Element(_name2, _xpath2, _duplicate2)
]
```

## Didactic example
````python
class Geometry:            # PARENT
    # Constructs - creation (returns the instance that __init__() will use)
    def __new__(cls, *args, **kwargs):
        print("Creating geometry...", end=' ')
        # super() calls the parent's class;
        #  here the uttermost parent of any class in Python: the built-in 'object'.
        #  the base class of all Python classes.
        instance = super().__new__(cls)
        return instance

    # Initialize an object's attributes
    def __init__(self, dimensions=2):
        self.dimensions = dimensions


class Circle(Geometry):    # CHILD
    def __new__(cls, *args, **kwargs):
        if cls.__instance is None:     # Limits to 1 instance only
            print("Creating singleton...")
            cls.__instance = object.__new__(cls)
        return cls.__instance

    def __init__(self, radius):
        super().__init__()  # super().method_of_the_parent
        self._radius = radius

    # User-friendly string description of an object
    def __str__(self):
        return f'Circle with radius of {self.radius!s}'

    # Developer-friendly string representation of an object
    def __repr__(self):
        return f'Circle(radius={self.radius})'

    # Instance method
    def explain(self):
        return f"A circle is a geometric figure.\nThe ratio of its perimeter for its area result in 2/R\nin which R stands for its radius."

    @property           # Make _radius accessible by typing without parentheses
    def radius(self):
        """Get value of radius"""
        return self._radius

    @radius.setter      # Make the attribute _radiu make the radius property muttable via setter
    def radius(self, value):
        """Set radius, raise error if negative"""
        if value >= 0:
            self._radius = value
        else:
            raise ValueError("Radius must be positive")

    @property
    def area(self):
        """Calculate area inside circle"""
        return self.pi() * self.radius**2

    def cylinder_volume(self, height):
        """Calculate volume of cylinder with circle as base"""
        return self.area * height

    @classmethod        # not bound to one specific instance; often used as factory methods that create specific instance of the class
    def unit_circle(cls):
        """Factory method creating a circle with radius 1"""
        return cls(1)

    @staticmethod       # not really dependent of the class. They are simply convenient there
    def pi():
        """Value of π, could use math.pi instead though"""
        return 3.1415926535


if __name__ == '__main__':
    pass

````
