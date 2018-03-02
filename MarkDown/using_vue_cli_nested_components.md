#Using Vue Cli - nested components with example

Friday, 02. March 2018

This article continues and extends the last article **'Using  Vue Cli with Example'** dated Friday, 23 February 2018.  As that previous article explained the environment which is created when we run

~~~
vue create my-project
~~~

uses a root component which is given the file name **App.vue** through the project creation process.  In the last article we modified that root component as an example of the way in which the environment could be used.  That modification was made with the following code:

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

which produced the following simple output:

![First simple example](https://rawgit.com/aronnax77/sl_tb/master/assets/images/first_simple_example.png  "First simple example")

##Nested components explained

Before we extend the previous example it is perhaps worth considering the way in which we can think of the root component in relation to nested components.  The following diagram helps to explain how the various components are interlinked.  At the top of the diagram is the root component.

![Nested Components](https://rawgit.com/aronnax77/sl_tb/master/assets/images/nested_components.png  "Nested Components")

Any html document will take on a classic tree structure and .vue component files make use of this structure to provide modular components.  The root component at the top of the tree, given the file name App.vue in this case, can incorporate within itself nested components, which in this example, are 'HEADER COMPONENT', 'ARTICLE COMPONENT', and 'FOOTER COMPONENT'.  These nested components can in turn include other nested components shown here in the case of the 'HEADER COMPONENT'.

##Example nested component

The project creation process incorporates one nested component called 'HelloWorld.vue' in the components folder.  In the example which follows we will create a simple nested component of our own for illustrative purposes.

Create a file in the components folder names 'Plays.vue' and enter the following code:

~~~
<template>
  <div>
    <ul>
      <li v-for="play in plays">{{ play }}</li>
    </ul>
  </div>
</template>

<script>

export default {
  data() {
    return {
      plays: ["Othello", "Henry VIII", "Macbeth"]
    }
  }
}

</script>

<style scoped>

div {
  width: 150px;
  margin: 0 auto;
}

div > ul {
  text-align: left;
}

</style>
~~~

Please note the addition of the word 'scoped' in the first of the style tags.  This restricts the styling to this particular element.  If this word is not present the styling becomes global in scope.

##Registering the component

There are two ways in which the new component can be registed:

1. Globally.  This allows the component to be used anywhere in the application.
2. Locally.  This restricts the use of the component to its enclosing component.

We will look at both methods.

###Registering the component globally

In order to register the component globally we make use of the file 'main.js'.  Open main.js and import and register the component as shown below:

~~~
import Vue from 'vue'
import App from './App.vue'
import Plays from './components/Plays.vue'

Vue.component('plays', Plays);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount('#app')
~~~

This component can now be added to the root component by altering the code as shown below:

~~~
<template>
  <div id="welcome">
    <h1>Welcome to the world of the vue-cli</h1>
    <p>{{ msg }}</p>
    <plays></plays>
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

Which provides the following output in the browser:

![Output with nested component](https://rawgit.com/aronnax77/sl_tb/master/assets/images/inc_nested_component.png  "Output with nested component")

##Registering the component locally

Firstly undo all changes made in registering the nested component globally.  That is remove the import and registration code from main.js.  Then register the component locally in App.vue as follows:

~~~
<template>
  <div id="welcome">
    <h1>Welcome to the world of the vue-cli</h1>
    <p>{{ msg }}</p>
    <plays></plays>
  </div>
</template>

<script>
import Plays from './components/Plays.vue'

export default {
  components: {
    plays: Plays
  },
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

This should then result in the same output within the browser as that when the component was registered globally.