Meteor.methods({
  removeUser (userId){

    check(userId, String);

    let isAdmin = Meteor.users.find({_id: Meteor.userId(), roles: ["admin"]}).count();

    if (isAdmin > 0){
      try {
        Meteor.users.remove(userId);
      } catch(exception) {
        return exception;
      }
    }
  }
});
