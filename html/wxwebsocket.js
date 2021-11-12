// WX Websocket JavaScript functions
// Version 5.3 - 10 Feb 2014
// $Revision: 1.4 $
// $Date: 2021/11/12 01:34:09 $
// $Requires: HomeVisionXL 2.1 $

if (wxurl === undefined) {
    // Derive the websocket URL from the document URL
    var wxhost = window.location.hostname;
//    alert(wxhost)   
    if (/:+/.test(wxhost)) {
        if (/MSIE /.test(navigator.userAgent)) {
            wxhost = wxhost.replace(/[\[\]]/g, "");
            wxhost = wxhost.replace(/%/g, "s");
            wxhost = wxhost.replace(/:/g, "-") + ".ipv6-literal.net";
        } else {
            if (/^[^\[]/.test(wxhost)) {
                wxhost = "[" + wxhost + "]";
            }
        }
    }
//    alert("final wxhost: " + wxhost)
    var wxurl = "ws" + window.location.protocol.substr(4) + "//";
    wxurl = wxurl + wxhost + ":" + window.location.port + "/weather";
//    alert("final wxurl: " + wxurl)

//    var wxurl = "ws" + document.URL.match("s?://[-+_a-zA-Z0-9.:\\\[\\\]]+/") + "weather"
    var hvobjs = hvobjs || {};

    if (typeof output === 'undefined') {var output = document.getElementById("debug"); }

    function initwx() {
        try {
            wxconnect(wxurl);
        } catch (err) {
            alert("Error: " + err);
        }
    }

    function debug(str) {
        if (output) {
            output.innerHTML += str + "<BR>";
        }
    }

    function addLEvent(func) {
        var oldonload = window.onload;
        if (typeof window.onload != 'function') {
            window.onload = func;
        } else {
            window.onload = function () {
                if (oldonload) {
                    oldonload();
                }
                func();
            }
        }
    }

    // Arrange for the websocket to connect as soon as the page is loaded.
    // Preserves previous "onload" settings
    addLEvent(initwx);

    function wxconnect(str) {
        debug("Connecting to " + str + " ...");
        if ("WebSocket" in window) {
            debug("Using WebSocket");
            wxwebsocket = new WebSocket(str);
        } else if ("MozWebSocket" in window) {
            debug("Using MozWebSocket");
            wxwebsocket = new MozWebSocket(str);
        } else {
            // WebSocket not supported by browser
            debug("No WebSocket support");
            return;
        }
        debug("wxwebsocket = " + wxwebsocket);
        wxwebsocket.onmessage = function (evt) {wxonMessage(evt); }

        wxwebsocket.onopen = function (evt) {wxonOpen(evt); }
        wxwebsocket.onclose = function (evt) {wxonClose(evt); }
        wxwebsocket.onerror = function (evt) {wxonError(evt); }
    }

    function wxonOpen(evt) {
        debug("Wx WebSocket opened successfully")
        var types=[];
        for (var obj in hvobjs) {
            types.push(obj);
        }
        if (types.length > 0) {
            wxwebsocket.send("events " + types.join());
        }
    }

    function wxonClose(evt) {
        debug("Wx WebSocket closed: " + evt.reason);
    }

    function wxonError(evt) {
        debug("Wx WebSocket error: " + evt.data);
    }

    function wxonMessage(evt) {
        var message = JSON.parse(evt.data);
        for (var type in message) {
            if (hvobjs[type] == undefined) {continue;}
            state = message[type].state;
            // Google Chrome doesn't like "for each ..."
            for (var i = 0; obj = hvobjs[type][i++];) {
                var val = state[obj.index];
                if (val != obj.value && val !== "") {
                    obj.value = val;
                    // eval(obj.function + "(obj, val)")
                    obj.function(obj, val);
//		    var redrawFix = obj.element.offsetHeight;
                }
            }
        }
    }

    function value(obj, val) {
    if (obj.element == null) return;
        switch (obj.element.nodeName) {
          case "PROGRESS":
          case "INPUT":
            obj.element.value = val;
            break
          case "BUTTON":
            var str = obj.element.innerHTML.match(/.*= /);
            obj.element.innerHTML = str + val;
            break
          default:
            obj.element.innerHTML = val;
        }
    }

    function wxf(obj, val) {
        if(typeof obj.type !== 'undefined' && obj.type !== "" ) {
	    var matchImg = obj.type.match(/^img$/);
	    if(typeof val[obj.type] !== 'undefined' && val[obj.type] !== "") {
		setval(obj, val[obj.type], matchImg);
	    } else {
    //  	setval(obj, "", matchImg);
	    }
	}
    }

    function fcf(obj, val) {
        if(typeof obj.type !== 'undefined' && obj.type !== "" ) {
	    var matchBest = obj.type.match(/^(best)(.*)$/);
	    if(matchBest) {
		var name = matchBest[2];
	    } else {
		var name = obj.type;
	    }
	    var matchImg = name.match(/^img/);
	    if(name.charAt(name.length-1) == "n") {
		var namen = name.substring(0, name.length-1);
	    } else {
		var namen = name + "n";
	    }

	    if(typeof val[name] !== 'undefined' && val[name] !== "") {
		setval(obj, val[name], matchImg);
	    } else {
		if(matchBest && typeof val[namen] !== 'undefined' && val[namen] !== "") {
		    setval(obj, val[namen], matchImg);
		} else {
    //  	    setval(obj, "", matchImg);
		}
	    }
	}
    }

    function setval(obj, val, match) {
	if(match) {
	    obj.element.src = val;
	    var redrawFix = obj.element.offsetHeight;
    //      obj.element.offsetHeight =  redrawFix;
	} else {
	    value(obj, val);
	}
    }

    // Send a weather command to the server
    function wxinvoke(command) {
        wxwebsocket.send("WeatherSet " + command);
        return false;
    }

}
