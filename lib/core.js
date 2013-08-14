(function(){
  module.exports = function(api_key){
    var api_url,get;
    get = function(parameters, module, callback){
        if(!api_key){
            callback({msg: "You must provide an API key."});
        }else if(parameters && parameters.text && parameters.text.length < 361){
            module = module === "train" ? module : "";
            var options = {
                hostname:   "app.viralheat.com",
                port:       443,
                path:       "/social/api/sentiment?text="+encodeURIComponent(parameters.text)
                    +"&api_key="+api_key+(module === "train" ? "&mood="+parameters.mood : ""),
                method:     "GET"
            };

            api_url = ["http",(options.port === 443 ? "s" : ""),"://",options.hostname,options.path].join("");

            var req = require('https').request(options, function(res) {
                res.on('data', function(d) {callback(null, JSON.parse(d), JSON.parse(d).status);});
            });
            req.end();

            req.on('error', function(e) {callback(e, null);});
        }else{
            callback({msg: "The text parameter must be specified and cannot exceed 360 characters in length."});
        }

    };
    
    return{
      api_key: api_key,
      api_url: api_url,
      get:     get
    };
  };
}).call(this);
