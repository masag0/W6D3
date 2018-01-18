const APIUtil = require('./api_util');

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
