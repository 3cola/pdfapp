Template.users.onCreated( () => {
  Template.instance().subscribe( 'users' );
});

Template.users.helpers({
  users: function() {
    var users = Meteor.users.find({}, {sort: {"roles.0": 1, "emails.0.address": 1}});

    if ( users ) {
      return users;
    }
  },
  hasInvitations: function() {
    var invitations = Invitations.find().count();
    return invitations < 1 ? false : true;
  },
  invitations: function() {
    var invitations = Invitations.find();

    if ( invitations ) {
      return invitations;
    }
  }
});

Template.users.events({
  'click [name="deleteUser"]': function( event, template ) {
    Meteor.call( "removeUser",
      this._id
    , ( error, response ) => {
      if (error) {
        Bert.alert( error.reason, "warning");
      } else {
        Bert.alert( "User deleted !", "success")
      }
    });
  },
  'change [name="userRole"]': function( event, template ) {
    let role = $( event.target ).find( 'option:selected' ).val();

    Meteor.call( "setRoleOnUser", {
      user: this._id,
      role: role
    }, ( error, response ) => {
      if ( error ) {
        Bert.alert( error.reason, "warning" );
      }
    });
  },
  'click .revoke-invite': function( event, template ) {
    var self = this;
    sweetAlert({
      title: "Are you sure?",
      text: "Are you sure? This is permanent.",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, revoke it!",
      cancelButtonText: "No, cancel!",
      closeOnConfirm: true,
      closeOnCancel: true
    },
    function(isConfirm){
      if (isConfirm) {
        Meteor.call( "revokeInvitation", self._id, function( error, response ) {
          if ( error ) {
            Bert.alert( error.reason, "warning" );
          } else {
            Bert.alert( "Invitation revoked!", "success" );
          }
        });
      } else {
        Bert.alert("Your request has been cancelled.", "warning");
      }
    });
  }
});
