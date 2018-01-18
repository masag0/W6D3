const APIUtil = require('./api_util');
const FollowToggle = require('./follow_toggle');

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
