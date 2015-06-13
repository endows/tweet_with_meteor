if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function() {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function() {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function() {
    var Twitter = Meteor.npmRequire('twitter');
    var client = new Twitter({
      consumer_key: 'rp02I9NlanW0Rt1vC6GA',
      consumer_secret: '0II62Hr66QiOKjmASsexCrzPJChkxon1icm2avyQrvM',
      access_token_key: '541346116-xaGlkJZN1xjCOsPWgJepxk7bFFkTwkqrn5G33fLn',
      access_token_secret: 'rzp5nBsqy2FvRAvgENKybQRpE5tUW8XLVi83Ozh3xUz3K'
    });

    Meteor.methods({
      'tweet':function(text){
        client.post('statuses/update', {
          status: text
        }, function(error, tweet, response) {
          console.log(error)
          if (error) throw error;
        });
      }
    })

  });
}
