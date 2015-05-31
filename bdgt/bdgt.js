Comments = new Mongo.Collection('comments');

if (Meteor.isClient) {

  Meteor.subscribe('allComments');

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
  })
}

if (Meteor.isServer) {
  // returns a cursor that describes the data
  Meteor.publish('allComments', function () {
    var cursor = Comments.find();
    var self = this;
    var handle = cursor.observeChanges({
      added: function (id, fields) {
        self.added('comments', id, fields);
      },
      changed: function (id, fields) {
        self.changed('comments', id, fields);
      },
      removed: function (id) {
        self.removed('comments', id);
      }
    });

    this.ready();
    this.onStop(function () {
      handle.stop();
    });
    //return cursor;
  });
}
