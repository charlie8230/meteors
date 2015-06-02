Comments = new Mongo.Collection('comments');

if (Meteor.isClient) {

  Meteor.subscribe('allComments');

  Meteor.call('callMe','carlos', function (err, data) {
    console.log(data);
  });

  Template.CommentList.helpers({
    comments: function () {
      return Comments.find();
    },
    formatTimeStamp: function (timestamp) {
      return moment(timestamp).calendar();
    }
  });

  Template.CommentAdd.events({
      'submit form': function (e, tpl) {
        e.preventDefault();

        var formEl = tpl.find('form'),
            commentEl = tpl.find('[name=comment]'),
            comment = commentEl.value;

        Comments.insert({
          login: 'charlie8230',
          timestamp: new Date,
          room: 'main',
          comment: comment
        });

        formEl.reset();
      }
  });
}

if (Meteor.isServer) {

  Meteor.methods({
    callMe: function (name) {
      return 'hi ' + name;
    }
  });

  Comments.allow({
    insert: function(userId, doc) {
      return !!userId;
    },
    update: function(userId, doc) {
      return false;
    },
    remove: function(userId, doc) {
      return false;
    }
  });
  // returns a cursor that describes the data
  Meteor.publish('allComments', function () {
    var cursor = Comments.find();
    // var self = this;
    // var handle = cursor.observeChanges({
    //   added: function (id, fields) {
    //     self.added('comments', id, fields);
    //   },
    //   changed: function (id, fields) {
    //     self.changed('comments', id, fields);
    //   },
    //   removed: function (id) {
    //     self.removed('comments', id);
    //   }
    // });
    //
    // this.ready();
    // this.onStop(function () {
    //   handle.stop();
    // });
    if(this.userId) {
      return cursor;
    } else {
      return this.ready();
    }
  });
}
