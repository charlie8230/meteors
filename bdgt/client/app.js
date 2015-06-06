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

var dep = new Tracker.Dependency;
var computation = Tracker.autorun(function () {
  dep.depend();
  console.log('hello');
});


Tracker.autorun(function () {
  dep.depend();
  console.log('2');
});

rerun = function () {
  dep.changed();
  Tracker.flush();
  console.log('done');
}
