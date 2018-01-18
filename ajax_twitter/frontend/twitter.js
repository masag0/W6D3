const FollowToggle = require('./follow_toggle');
const UsersSearch = require('./users_search');

$(document).ready(() => {
  $('button.follow-toggle').each ((idx, el) => {
    new FollowToggle(el);
  });

  $('nav.users-search').each( (idx, el) => {
    new UsersSearch(el);
  });
});
