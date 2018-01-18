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
