var app = require('express').createServer(),
    twitter = require('ntwitter');

app.listen(3000);

var twit = new twitter({
  consumer_key: 'EQEFL6cU8Qzmtugy4Qwzg',
  consumer_secret: '4exexzX58HgDX9jmNkBjUoCLeZC5hftiyR38x8T0w0',
  access_token_key: '995044219-DV0IaiDcGJYK2HVxHUxOUH5EKt3YzjV58f5xxhYo',
  access_token_secret: '6NDrBqn61aurepCvWQLwXqn1514Wrxl0uveZXUGmGI'
});

twit.stream('statuses/filter', { track: ['love', 'hate'] }, function(stream) {
  stream.on('data', function (data) {
    console.log(data);
  });
});