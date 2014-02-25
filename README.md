TodoApp
=========

A simple ToDo app to demonstrate a particular technology stack:

* MongoDB
* Groovy
* Spring Framework
* Spock
* Gradle

Getting Started
---------------

1. No surprise here: this project uses MongoDB. If you haven't already installed MongoDB, [do that first](docs.mongodb.org/manual/installation/).
2. Make sure that MongoDB is running. This project uses a database called `todoapp`.
3. Use Git to clone ths project, or just download and extract the ZIP from GitHub.
4. The project is built with [Gradle](gradle.org). It includes the Gradle Wrapper, so you don't need to install Gradle manually. Just open up a terminal on Linux or OSX and type:
        ./gradlew jettyRun
    That will start up a local Jetty web server on port `8080`.
    This will likely take a few minutes the first time you run it. See below for details.
5. Point your browser to `localhost:8080`. Enjoy playing with the demo application in all of its rudimentary glory.

A Word about ExtJS
------------------

This project uses ExtJS for its UI. To avoid committing all of ExtJS into the Git repo, I've configured the Gradle build
so that it automatically downloads ExtJS as a dependency, extracts it, and hosts it wth the Jetty server. The first time
you build the project, you'll have to wait a couple minutes for the ExtJS archive to download. On future runs, startup
of the Jetty server will remain a little slow because Gradle's `Sync` task takes a few moments to verify that all of the
extracted files are still up to date.
