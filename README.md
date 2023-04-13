# Weather Plug-in for HomeVisionXL

<b>You must have a HomeVision or HomeVision Pro Controller running HomeVisionXL software for this to work.</b>

**Please report issues or open discussions via the** [**homevision users group**](https://groups.google.com/g/homevision-users).
If you don't have access to that group, use the Issues or Discussions sections here.

# Overview

<b>
NOTE: In Verson 5.3 and later, OpenWeather.org has been substituted for Weatherbug.
Any references to Weatherbug remaining in this help should be ignored.
</b>
<br>
<br>
The Weather plug-in retrieves weather data from either
the U.S. National Weather Service (XML or METAR formats)  
or OpenWeather.org (JSON format).
Current and forecast weather information can be retrieved and displayed.
Depending on the source selected, the plug-in can retrieve weather information
from any one of thousands of weather stations worldwide.
Retrieved weather data can be used in any of the following ways:
<ul>
<li>The Weather plug-in can send weather data to
the Control plug-in to display weather information on custom control screens.
<li>
The Weather plug-in can send a subset of the
 weather data to certain weather variables in the HomeVision controller.
<li>
The Weather plug-in can speak selected weather data using the wintts plug-in.
<li>
The Web Server plug-in can use weather data in custom HomeVisionXL Web pages.
<li>
Other custom plug-ins can access weather data.
</ul>
<p>
Weather data can be retrieved from a local file instead of the web,
as long as that file uses a similar format as the on-line data.
</p><p>
Control plug-in version
4.4 or later and HomeVision 2.1 or later are
required.
Web plug-in version 4.0 or later is required for web access of weather data.
NetIO Server plug-in verion 3.2 is required for NetIO access to weather data.
</p>


# Installing

The HomeVisionXL MQTT Plug-in package consists of the following files: 
* weather.hap - the plug-in itself, 
* weather.hlp - the help file,
* ftp/*.tcl - ftp library for METAR,
* html/wxwebsocket.js - javascript for websockets.
* weather/images/Right-to-Use_Disclaimer.txt  - right to use disclaimer

Click the "Code" button then select "Download ZIP".
Extract the above files/folders into your plugin folder.
You may need to go down a level in the zip file to get to these.
You can delete README.md and LICENSE.

The plug-in should be enabled via the Plug-in manager.

# Change Log

The Change Log can be found in the Wiki [Here](https://github.com/rebel7580/Weather-Plug-in-For-HomeVisionXL/wiki/Change-Log).

# Help

While Help is available through the plug-in, it may be out-of-date. The most up-to-date version of the help file can be found in this Project's [Documentation pages](https://rebel7580.github.io/Wx/Wx_index).
The help file is very detailed. Please read it throughly to properly set up your devices.


