/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const FollowToggle = __webpack_require__(1);
const UsersSearch = __webpack_require__(3);

$(document).ready(() => {
  $('button.follow-toggle').each ((idx, el) => {
    new FollowToggle(el);
  });

  $('nav.users-search').each( (idx, el) => {
    new UsersSearch(el);
  });
});


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(2);

class FollowToggle {
  constructor(el) {
    this.$el = $(el); //follow button
    this.userId = this.$el.data('user-id');
    this.followState = this.$el.data('initial-follow-state');
    this.render();
    this.$el.on("click", (e) => this.handleClick(e));
  }

  render() {
    if (this.followState === "following" || this.followState === "unfollowing") {
      this.$el.prop('disabled', true);
    } else {
      this.$el.prop('disabled', false);
    }
    if (this.followState === "unfollowed") {
      this.$el.text("Follow!");
    } else {
      this.$el.text("Unfollow!");
    }
  }

  handleClick(e) {
    e.preventDefault();

    const id = this.userId;
    // let method = "";

    if (this.followState === "followed") {
      this.followState = "unfollowing";
      this.render();
      APIUtil.unfollowUser(id).then( () => {
          this.toggleFollowState();

          this.render();
        });

    } else {
      this.followState = "following";
      this.render();
      APIUtil.followUser(id).then( () => {
          this.toggleFollowState();
          this.render();
        });

    }
  }

  toggleFollowState() {
    if (this.followState === 'following') {
      this.followState = 'followed';
    } else {
      this.followState = 'unfollowed';
    }
  }
}

module.exports = FollowToggle;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

const APIUtil = {
  followUser: id => {
    return $.ajax ({
      type: `POST`,
      dataType: 'json',
      url: `/users/${id}/follow`,
    });
  },

  unfollowUser: id => {
    return $.ajax ({
      type: `DELETE`,
      dataType: 'json',
      url: `/users/${id}/follow`,
    });
  },

  searchUsers: (query) => {
    return $.ajax ({
      url: '/users/search',
      type: 'GET',
      dataType: 'json',
      data: {query: query}
    });
  }

};

module.exports = APIUtil;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(2);
const FollowToggle = __webpack_require__(1);

class UsersSearch {
  constructor(el) {
    this.$el = $(el);
    this.$input = $(this.$el.find('input'));
    this.$ul = $(this.$el.find('ul'));
    this.$input.on("input", (event) => this.handleInput(event));
  }

  handleInput(event) {
    console.log('input handling');
    event.preventDefault();
    console.log(this.$input.val());
    APIUtil.searchUsers(this.$input.val()).then(users => this.renderResults(users));
  }

  renderResults(users) {
    console.log(users);
    this.$ul.empty();

    users.forEach((user) => {
      let followState;
      if (user.followed) {
        followState = "followed";
      } else {
        followState = "unfollowed";
      }
      console.log(user);
      let id = user.id;
      let $li = $(`<li><a href="/users/${id}">${user.username}</a></li>`);
      let $button = $(`<button data-user-id="${id}"
                      data-initial-follow-state="${followState}"
                      class="follow-toggle" type="button"
                      name="button"></button>`);
      new FollowToggle($button);
      console.log($button);
      $li.append($button);
      this.$ul.append($li);

    });
  }

}

module.exports = UsersSearch;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map