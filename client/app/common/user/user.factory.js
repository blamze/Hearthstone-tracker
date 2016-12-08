//@ngInject()
let UserFactory = function () {
  const user = {edma:'edma'};

  let getUser = () => {
    return user;
  };

  let isSignedIn = () => {
    return user.isSignedIn;
  };

  return { getUser, isSignedIn };
};

export default UserFactory;
