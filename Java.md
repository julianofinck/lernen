# Try & Catch
```java
try {
    // Block of code
} catch (Exception e) {
    System.err.println("Error: " + e.getMessage());
}
```

# Input in Java
```java
Scanner myObj = new Scanner(System.in);  // Create a Scanner object
                            System.out.println("Enter username");

                            String userName = myObj.nextLine();  // Read user input
                            System.out.println("Username is: " + userName);  // Output user input
```


# javac java jar
https://www.codejava.net/java-core/tools/understanding-the-triad-tools-javac-java-and-jar-in-jdk

Java Development Kit (JDK) has 3 key tools.
javac -> translates .java into bytecode .class

jar   -> compacts .class for easier deployment

java  -> calls the JVM

Imagine a Painter application that consists of 3 classes: Painter.java, Shape.java, Canvas.java

jar cf Painter.jar Painter.class Shape.class Canvas.class
java -jar Painter.jar 


# SET JAVA_HOME AND PATH ENV
The JAVA_HOME and PATH environment variables need to be set correctly in order for the javac and java commands to work properly. Here are the steps you can follow to set these variables on a Windows machine:

Open the Control Panel on your Windows machine and search for "Environment Variables".

Click on "Edit the system environment variables"

Click on the "Environment Variables" button

In the "System variables" section, scroll down and look for the variable named "JAVA_HOME". If it doesn't exist, click on the "New" button to create it.

In the "Variable name" field, enter "JAVA_HOME" and in the "Variable value" field, enter the path to the root directory of your JDK installation. For example, if you have installed the JDK in the "C:\Program Files\Java\jdk1.8.0_221" directory, you would enter "C:\Program Files\Java\jdk1.8.0_221" as the value for JAVA_HOME.

Scroll down and look for the variable named "PATH" in the "System variables" section.

Click the "Edit" button.

Click on the "New" button and add the path to the "bin" directory of your JDK installation. For example, if your JDK is installed in "C:\Program Files\Java\jdk1.8.0_221", you would add "C:\Program Files\Java\jdk1.8.0_221\bin" to the PATH variable.

Click OK and apply the changes

Close the Control Panel


# COMPILING GET .TXT OF ALL .java IN DIRECTORY
dir src /b /s *.java | findstr /r /c:".java$" > source.txt
https://github.com/geonetwork/core-geonetwork/archive/refs/tags/3.10.2.zip



wget -c https://github.com/geonetwork/core-geonetwork/archive/refs/tags/3.10.8.tar.gz -O - | tar -xz
cd core-geonetwork-3.10.8
mvn install