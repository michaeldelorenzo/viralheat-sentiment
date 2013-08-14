(function() {
  module.exports = function(api_key) {
    var core, get, train;
    core = require('./core')(api_key);
    get = function(text, callback) {
      return core.get({text:text}, null, function(err,data,status){
          if(status === 200){
              var _data = {
                  text: data.text.replace(/^'|'$/g,""),
                  mood: data.mood.replace(/^'|'$/g,""),
                  prob: parseFloat(data.prob),
                  raw: data
              };
              callback(null,_data,200);
          }else{
              callback(err);
          }
      });
    };
    train = function(text,mood,callback){
        if(["positive","negative","neutral"].indexOf(mood) >= 0){
            var mood_value = mood === "positive" ? 1 : (mood === "negative" ? -1 : 0);
            return core.get({text:text,mood:mood_value}, "train", function(err,data,status){
                if(status === 200){
                    callback(null,{status: "ok"},200);
                }else{
                    callback(err);
                }
            });
        }else{
            callback({msg: "Only values of 'positive', 'negative', or 'neutral' are accepted as values."})
        }
    };
    return {
      api_key:  api_key,
      train:    train,
      get:      get
    };
  };
}).call(this);
