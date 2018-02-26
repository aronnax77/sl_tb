/* Author: Richard Myatt
   Date: 18 February 2018
   Version: 1.0.1
   Revised: 23 February 2018
*/

// db will hold the database details for the blog
var db = [];

// post-summary holds the template for the post categories All onward
Vue.component("post-summary", {
      template: "#summary-panel",
      props: ['title', 'date', 'content'],
      methods: {
        activatepost: function() {
          this.$emit("activate");
        }
      }
    });

// controller for menu icon
var iconApp = new Vue({
  el: "#icon-app",
  methods: {
    open: function() {
      menuApp.menuWidth = "80%";
    }
  }
});

// the Vue application which controls the menu and interacts with the contentApp
var menuApp = new Vue({
  el: "#nav-app",
  data: {
    menuWidth: 0,
    isActive: 0,
    categories: ""
  },
  methods: {
    selected: function(c, i) {
      this.isActive = i;
      contentApp.posts = getSelectedPosts(c);
      if(c === "Latest") {
        contentApp.isArticle = true;
      } else {
        contentApp.isArticle = false;
      }
    },
    close: function() {
        this.menuWidth = 0;
      }
  }

});

// contentApp controls the main page and interacts with menuApp
var contentApp = new Vue({
  el: "#content-app",
  data: {
    isArticle: true,
    articleText: "",
    posts: ""
  },
  methods: {
    getArticle: function(arg) {
      getPost(this.posts[arg].articleUrl);
      this.isArticle = true;
      menuApp.isActive = false;
    },
    selectedPosts: function(i) {
      if(i === 1) {
        alert("help");
      }
    }
  }

});

// helper function serving init() sets menuApp.categories
function setMenu() {
  var menuCategories = ["Latest", "All"];
  var categoriesArr = getCategoriesArr();
  var sorted = categoriesArr.sort();
  for(var i = 0; i < sorted.length; i++) {
    menuCategories.push(sorted[i]);
  }
  menuApp.categories = menuCategories;
}

// helper function to obtain articleUrl requested by the user
function getPost(url) {
  fetch(url)
  .then(response => response.text())
  .then(function(data) {
    contentApp.articleText = data;
    window.scrollTo(0, 0);
  })
  .catch(error => console.log("There was an error: ", error));
}

// function to get array of selected posts on cantentApp.posts
// called by menuApp.selected
function getSelectedPosts(cat) {
  if(cat === "Latest") {
    getPost(db[0].articleUrl);    // sets the articleUrl for Latest
    window.scrollTo(0, 0);
  } else if(cat === "All") {
    window.scrollTo(0, 0);
    return db;
  } else {
    var res = [];
    for(var i = 0; i < db.length; i++) {
    	if(db[i].categories.includes(cat)) {
      	res.push(db[i]);
    	}
    }
    window.scrollTo(0, 0);
    return res;
  }
}

// helper function for setMenu()
function getCategoriesArr() {
  var res = [];
  for(var i = 0; i < db.length; i++) {
    for(var j = 0; j < db[i].categories.length; j++) {
      if(res.indexOf(db[i].categories[j]) === -1) {
        res.push(db[i].categories[j]);
      }
    }
  }
  return res;
}

// initialize the application variable
function init() {
  fetch("json/posts.json")
  .then(response => response.json())
  .then(function(data) {
    db = data;                     // place the database in the global variable db
    contentApp.posts = data;      // place a copy of the database in posts to start with
    getPost(data[0].articleUrl);  // initialize the articleUrl for the Latest post
    setMenu();
  })
  .catch(error => console.log("There was an error: ", error));
}

init();
