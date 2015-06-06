Comments = new Mongo.Collection('comments');

if (Meteor.isServer) {

  Meteor.methods({
    callMe: function (name) {
      return 'hi ' + name;
    }
  });
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
