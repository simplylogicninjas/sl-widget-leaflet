# SL - Leaflet Map

## 1\. Description
Leaflet map is a collection of pluggable widgets that displays a map for a user. The widget itself allows the developer to use different maps from different tile providers such as streetview. The widget package contains various widget components that interact with the map and extend functionality of the leaflet map widget.

### 1.1 Contents
<table>
    <tbody>
        <tr>
            <td><b>Widget component</b></td><td>Description</td>
        </tr>
        <tr>
            <td><a href="#14-Usage">Leaflet Map</a></td><td>The container widget where every other widget should be placed within which is mandatory</td>
        </tr>
        <tr>
            <td><a href="#2-Leaflet-Geofence">Leaflet Geofence</a></td><td>This widget allows the widget to use geofencing based on current device location</td>
        </tr>  
        <tr>
            <td><a href="#3-leaflet-geofence-geojson">Leaflet GeoJSON</a></td><td>This widget allows the widget to display geoJSON on the map.</td>
        </tr>
        <tr>
            <td><a href="#4-leaflet-marker">Leaflet Markers</a></td><td>This widget allows the widget the display markers on your map</td>
        </tr>   
    </tbody>
</table>

### 1.2 Browser example
<img src="https://raw.githubusercontent.com/simplylogicninjas/sl-widget-leaflet/main/docs/images/map/map_browser_example.png" width="600">

### 1.3 Features
- Display various map format
- Display various configurable markers
- Overlay geoJSON over the map
- Implementation of geofence actions.
- Configure events independently on widgets

### 1.4 Usage
- Place the Leaflet Map widget in a context object that can hold the parameters needed on the widget. 
- Place any other widgets you want in the Leaflet Map container widget

### 1.5 Configuration
<img src="https://raw.githubusercontent.com/simplylogicninjas/sl-widget-leaflet/main/docs/images/map/modeler_example_map.png" width="600">

- Url: The tile provider to use as base map layer, this url can include parameters
- Attribution: Credits in the right bottom screen (optional)
- Minimum zoom: minimum base zoom of the map
- Maximum zoom: maximum base zoom of the map
- Zoom offset: the zoom number used in the URL will be offset with this value
- Tile size: the tile size of the map by default this is 256, this can be different depending on tile provider.

- Additional maps: A datasource with list that returns objects that have a string with a map source stored.  (optional)

<img src="https://raw.githubusercontent.com/simplylogicninjas/sl-widget-leaflet/main/docs/images/map/modeler_example_position.png" width="600">

- Position mode: The position mode to use for map centering
    - Device position uses the current device position
    - Manual position allows you to use manually set the center of the map
    - Marker position will use the center returned from the marker list from the marker widget to center on
    - GeoJSON will use the center of the geo-objects returned in the geoJSON widget as map center.

- Zoom: The initial zoomlevel the map is rendering when first loading in.
- Lattitude: The attributed that stores the current lattitude when using manual positioning
- Longitude: The attributed that stores the current longitude when using manual positioning

- Default position:
    - Lattitude: fallback lattitude when lattitude could not be read.
    - Longitude: fallback longitude when longitude could not be read.
    - Zoom: fallback zoom when zoom could not be read.

<img src="https://raw.githubusercontent.com/simplylogicninjas/sl-widget-leaflet/main/docs/images/map/modeler_example_events.png" width="600">

- On map click: The event to trigger when a user clicks on a map
- Lattitude: The lattitude string to store the clicked latttitude in by the user 
- Longitude: The longitude string to store the clicked longitude in by the user

## 2\. Leaflet Geofence
### 2.1 Description
Allows the map widget to configure geofences and geofence events based on the current device position

## 2.2 Usage
- Place inside the map widget container

## 2.3 Configuration
<img src="https://raw.githubusercontent.com/simplylogicninjas/sl-widget-leaflet/main/docs/images/geofence/geofence_example_general.png" width="600">

- Geofence
    - Enable position update: Configuration of geofence events, if true the events will be triggered on each position update, if false no events will be triggered.
    - Default radius: If no radius is configured on a geofence this value will be used (in meters)
    - Update map location: Dynamically set if the map will update based on position change. This allows you disable panning to the current device location if you want to give the user control.

- Datasource
    - Geofence datasource: list of objects that stores the geofences, this object must include lattitude (string), longitude (string), radius (int)
    - ID: The unique identifier attribute that is returned when a geofence event is triggered (string)
    - Lattitude: The attribute that stores the geofence lattitude (string)
    - Longitude: The attribute that stores the geofence longitude (string)
    - Radius: The atttribute that stores the radius of the geofence (integer)
    - Default color: The color that is being applied to geofences that are not active/triggered (expression)
    - Active color: The color that is being applied to geofences that are active/triggered (expression)
    - Stroke opacity: The opacity of the stroke of a geofence (0 - 1.0)
    - Stroke weight: The weight of the stroke of a geofence (in pixels)
    - Fill opacity: the opacity of the fill color (0-1.0)

<img src="https://raw.githubusercontent.com/simplylogicninjas/sl-widget-leaflet/main/docs/images/geofence/geofence_example_events.png" width="600">

- Geofence In
    - Action: What action to trigger when the current position of the device enters a geofence radius (note: this is triggered everytime you move in or inside a geofence)
    - Geofence ID: The unique ID that identifies the goefence (string)
    - Goefence distance: the attribute that stores the distance between current position and the geofence center position in meters (decimal)

- Geofence Out
    - Action: What action to trigger when the current position of the device leaves a geofence radius 
    - Geofence ID: The unique ID that identifies the goefence (string)

- Geofence Current Position:
    - Action: What action to trigger when the current position changes (note: this will be triggered everytime a device moves)
    - Lattitude: Attribute to store the lattitude when the device location changes
    - Longitude: Attribute to store the longitude the device location changes

## 3\. Leaflet Geofence GeoJSON
### 3.1 Description
Allows the map widget to display GeoJSON as overlays on the map

### 3.2 Usage
- Place inside the map widget container

### 3.3 Configuration
<img src="https://raw.githubusercontent.com/simplylogicninjas/sl-widget-leaflet/main/docs/images/geoJSON/geoJSON_example_general.png" width="600">

- GeoJSON Datasource: Objects in a list that store an attribute that can hold geoJSON 
- GeoJSON data: A string that holds geoJSON data as described here: https://geojson.org/

<img src="https://raw.githubusercontent.com/simplylogicninjas/sl-widget-leaflet/main/docs/images/geoJSON/geoJSON_example_events.png" width="600">

- On feature click: the event that is triggered when clicking on a feature on the map.
- Feature ID: the unique ID that is returned by the click event, this ID is stored in the geoJSON structure and should correspond with an ID on a mendix object (string)


## 4\. Leaflet Marker
### 4.1 Description
Allows the map widget to display markers / pins on your leaflet maps and customize markers

### 4.2 Usage
- Place inside the map widget container

### 4.3 Configuration
<img src="https://raw.githubusercontent.com/simplylogicninjas/sl-widget-leaflet/main/docs/images/markers/markers_example_general.png" width="600">

- Datasource:
    - Markers datasource: Specify the list with mendix objects that
    - ID: the ID that stores the unique identifier of the markers
    - Lattitude: The latttidue of the marker
    - Longitutde: The longitude oft he marker
    - Moveable: An expression that stores the movability of the marker

<img src="https://raw.githubusercontent.com/simplylogicninjas/sl-widget-leaflet/main/docs/images/markers/markers_example_events.png" width="600">

- On marker click:
    - On marker click: the action to perform when a marker is clicked
    - Marker ID: This attribute stores the ID of the clicked marker.

- On marker move:
    - On marker move: the action to perform when a marker is dragged (note: the marker click event will also be triggered when configured)
    - Marker ID: This attribute stores the ID of the moved marker.
    - ID: the ID that stores the unique identifier of the markers
    - Lattitude: The latttidue of the marker
    - Longitutde: The longitude oft he marker

## Limitations
- Does not support google maps.

## Acknowledgements
- Dependent on the leaflet library

