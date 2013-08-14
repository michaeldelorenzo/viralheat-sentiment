#Viralheat Sentiment API

You must have a [Viralheat](http://www.viralheat.com/) account and API key to access the
[Sentiment API](https://app.viralheat.com/developer/sentiment).

##Usage of the Module

*Require the module*

```javascript
var vh_sentiment = require('viralheat-sentiment')('[Your API Key Here]');
```

###Make a sentiment request

```javascript
vh_sentiment.get('[text you would like analyzed]', function(err, data, status) {
	if(err) {
		// Error
	} else {
		console.log(data);
	}
});
```

*Successful* response will look like:

```javascript
{
    text: 'Hello! I love PowerPost!!',
    mood: 'positive',
    prob: 0.9372610796240683,
    raw: {
        status: 200,
        error: null,
        text: '\'Hello! I love PowerPost!!\'',
        mood: '\'positive\'',
        prob: '0.93726107962406835'
    }
}
```

The object contained in the _raw_ attribute is the response returned directly from the [Viralheat Sentiment API](https://app.viralheat.com/developer/sentiment).

###Train the Sentiment Analyzer

```
vh_sentiment.train('[text you would like analyzed]', ['positive','negative', or 'neutral'], function(err, data, status) {
	if(err) {
		// Error
	} else {
		console.log(data);
	}
});
```

*Standard response from a train request:*

```javascript
{"status":"ok"}
```