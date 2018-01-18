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
  }
};

module.exports = APIUtil;
