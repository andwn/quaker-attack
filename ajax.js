function objectToString(o){
    
    var parse = function(_o){
    
        var a = [], t;
        
        for(var p in _o){
        
            if(_o.hasOwnProperty(p)){
            
                t = _o[p];
                
                if(t && typeof t == "object"){
                
                    a[a.length]= p + ":{ " + arguments.callee(t).join(", ") + "}";
                    
                }
                else {
                    
                    if(typeof t == "string"){
                    
                        a[a.length] = [ p+ ": \"" + t.toString() + "\"" ];
                    }
                    else{
                        a[a.length] = [ p+ ": " + t.toString()];
                    }
                    
                }
            }
        }
        
        return a;
        
    }
    
    return "{" + parse(o).join(", ") + "}";
    
}

function ajax_submitScore(name, score, gameTime, version, amount, page) {
	if (!amount) { amount = 10 }
	if (!page) { page = 1 }
	var url = "ajax.php";
	$.getJSON(url, { name: name, score: score, gametime: gameTime, version: version, amount: amount, page: page }, function(json) {
		var scoreArray;
		if (json.success) {
			scoreArray = json.winners;
		} else {
			scoreArray = [["#FAILED", "Failed to retrieve scores"]];
		}
		//bb_globals_ScoreSuccess(scoreArray);
		alert(objectToString(json))
    });
}

ajax_submitScore("Testplayer", 10000, 12345, 0)