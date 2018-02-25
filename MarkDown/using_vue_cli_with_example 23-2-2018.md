#Using Vue Cli with Example

Friday, 23. February 2018

Using the Vue-cli allows the developer to work in an environment which is compatible with EC6 and ES2105 which immediately provides access to import statements in the JavaScript.  This combined with vue.js gives the developer access to a flexible modular, component based design framework.  In turn webpack provides a way to turn this framework into a set of files which can be understood by the browser.

At the time of writing there are very few writen or video tutorials online which are currently up to date with the latest developments in the vue-cli.  This article attempts to address the very basic aspects involved in downloading and using the current version the documentation to which can be found [here.](https://github.com/vuejs/vue-cli)  The present README.md provides instructions to download and create a project in the Quickstart section.  These instructions are reproduced below:

~~~
npm install -g @vue/cli
# or
yarn global add @vue/cli

vue create my-project
~~~

For the purpose of this article we will create a project called **vuepro** with the following instructions:

~~~
vue create vuepro
~~~

This will bring up a screen asking you to select a preset.  In this case there is only one marked default as shown below:

![Please pick a preset:](https://rawgit.com/aronnax77/sl_tb/master/assets/images/select_presets.png  "Select a Preset")

This will be followed by the installation of the various packages and concludes with a screen like that below:

![Concluding instructions](https://rawgit.com/aronnax77/sl_tb/master/assets/images/concluding_instructions.png  "Concluding instructions")

This concludes with the instructions:

~~~
cd vuepro
yarn serve
~~~

After changing directory to **vuepro** running *yarn serve* will produce the welcome page at http://localhost:8080/.

![Welcome page](https://rawgit.com/aronnax77/sl_tb/master/assets/images/welcome_page.png  "Welcome page")

An inspection of the file structure will reveal the following arrangement:

![File structure](https://rawgit.com/aronnax77/sl_tb/master/assets/images/file_structure.png  "File structure")

These project files provide an example of the way in which vue.js can be used to generate a modular, component based application.

The folder whch is of immediate interest to us here is the *src* folder and the *index.html* file in the *public* folder.  Looking firstly at the *index.html* file we will see the following:

~~~
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <link rel="shortcut icon" href="<%= webpackConfig.output.publicPath %>favicon.ico">
    <title>vuepro</title>
  </head>
  <body>
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>
~~~

As you will see the built files will be auto injected into the div with the id="app".  This is the top file which displays the welcome page shown above.  Injecting the visual contents of the page into the div element is the function of main.js which is shown below:

~~~
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
~~~

Here you will see that vue.js itself forms the first import.  This is followed by the import of App from "./App.vue" which is root .vue component file.  The new Vue element which is instanciated below this renders the root element to the index.html file.

The environment which is provided through the vue-cli is one which is built on a root element which is itself composed of sub-elements.  In the example provided by creating the default project this is provided by the only sub-element in the file structure "HelloWorld.vue".  Looking firstly at App.vue we find the following:

~~~
<template>
  <div id="app">
    <img src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
~~~

At first sight this may look complicated but once you begin to see the ideas inherent in the file structure the whole concept of using a modular, component based system become much clearer.  This file is typical of a component .vue file and consists broadly of three elements:

1. the template which describes the html part of the element.
2. the script which defines the vue component and exports the element.
3. and finally the style element which in this case is css.

Being the root element in this case we also find an import for the HelloWorld component and can see this component being used within the template above the import.

##A First Simple Example

To provide a first very simple example of how this all works we will modify the root component.  A future article may provide details of how components can be nested and expand on the basic concept of a root elements and nested sub-elements.

Delete the contents of the existing App.vue file and insert the following code:

~~~
<template>
  <div id="welcome">
    <h1>Welcome to the world of the vue-cli</h1>
    <p>{{ msg }}</p>
  </div>
</template>

<script>

export default {
  data() {
    return {
      msg: "There are more things in heaven and earth, Horatio, Than are dreamt of in your philosophy."
    }
  }
}
</script>

<style>

body {
  background-color: #c0ec9c;
}

#welcome {
  text-align: center;
}

h1 {
  font-size: 40px;
  color: #222265;
}
</style>
~~~

This results in the following page being rendered to the browser:

![First simple example](https://rawgit.com/aronnax77/sl_tb/master/assets/images/first_simple_example.png  "First simple example")

There are a number of things to note:
- the template expects to have just one root element.  In this case a div with the id="welcome".
- This is a vue component and as such the data element is provided as a function.
- some styling is provided as an example to make things more interesting.