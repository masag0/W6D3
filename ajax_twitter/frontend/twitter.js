const FollowToggle = require('./follow_toggle');

$(document).ready(() => {
  $('button.follow-toggle').each ((idx, el) => {
    new FollowToggle(el);
  });
});
