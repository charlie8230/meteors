Comments = new Mongo.Collection('comments');

if (Meteor.isClient) {

  // Meteor.subscribe('comments');

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
  Meteor.publish('comments', function () {
    return Comments.find();
  })
}
