/**
 * @author Vijendra Yadav <Vijendra.Yadav@nrcan-rncan.gc.ca >
 */
// commented out aug 9 for test
//import { RJSFSchema, UiSchema, FieldProps, RegistryFieldsType } from '@rjsf/utils';

//sept6 commentd out below, oct 6,v4 mui
import Form from "@rjsf/material-ui";

//import { withTheme } from '@rjsf/core';
//import { Theme } from '@rjsf/mui';

  //const Form = withTheme(Theme);
//added oct10 below
//import { withTheme } from 'react-jsonschema-form';
//import { Theme as MuiTheme } from 'rjsf-material-ui';
 // import {  makeStyles } from '@material-ui/core';

//const Form = withTheme(MuiTheme);

//added oct 10
 //import { useMuiComponent } from '@rjsf/material-ui/v4';

// tried below and works materual ui v5
//import Form from "@rjsf/mui";
//import Form from "@rjsf/core";

// added to test aug 9 for test v4 or v5 mateial ui
//import Form from "@rjsf/material-ui/v5";
//import Form from "@rjsf/core";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import React from "react";
import { Box, Button,ButtonGroup,FormControl,FormControlLabel,FormLabel,Radio,RadioGroup } from "@material-ui/core";
//import { Box, Button,ButtonGroup,FormControl,FormControlLabel,FormLabel,Radio,RadioGroup } from "@rjsf/core";

//changed aug 16
//import validator from "@rjsf/validator-ajv6";

import validator from "@rjsf/validator-ajv8";

//import Stack from '@mui/material/Stack';
//import NewWindow from 'react-new-window';
//import { render } from "react-dom";
import { saveAs } from 'file-saver';
import { useState,useCallback,useEffect } from 'react';
import Tooltip from "@material-ui/core/Tooltip";
import  ReactDOM from 'react-dom';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
// import applyNavs from "react-jsonschema-form-pagination";
import { createRef } from "react";
const submitFormRef = createRef();
//import {StyleSheet,Text,SafeAreaView,ScrollView,StatusBar} from 'react-native';

//commented below out aug 8

// import applyNav from "rjsf-tabs/lib/applyNav";
//import { GENERIC_NAV } from "rjsf-tabs/lib/utils";
//import CustomNavs from "./CustomNavs";


//commente out jan 26
 //let navSelected = "";


//function EditorNavs({ navs: { links }, onNavChange }) {
 // let relLinks = links.filter(({ nav }) => nav !== GENERIC_NAV);
 // return (
    //<nav className="navbar navbar-default navbar-margin-reduce">
     // <div className="container-fluid">
       // <div className="collapse navbar-collapse">
         // <ul className="nav navbar-nav navbar-ul-margin-reduce">
           // {relLinks.map(({ nav, name, icon, isActive }, i) => (
     //         <li
      //          key={i}
       //         onClick={() => { navSelected = nav; console.log("-----nav =", nav); onNavChange(nav) }}
       //         className={isActive ? "active bottom-border" : null}
        //      >
         //       <a className={isActive ? "nav-active" : null}>
        //          {icon && <span className={icon} aria-hidden="true" />}
         //         &nbsp;{name || nav}
    //            </a>
   //           </li>
    //        ))}
    //      </ul>
    //    </div>
   //   </div>
 //   </nav>
 // );
//}

let plugins = { "plugins": [] };
let plugin = "";

let draw = { "draw": "" };
let swiper= { "swiper": "" };
let map = "";
let fileLoaded = false;
let notfirstLoad = true;
let formnotUpdated = true;
let oldSchema = ""
//let mapLayersName = ["transport", "hill shade"];
let mapLayersName = [];

 // var f = new FileReader();
const file = document.getElementById('file-selector');
file.setAttribute("display", "none");
let formData = new FormData(); // added nov 21
let formSubmitted = false ;
let mapFormChanged = false;
let blob = "";
let result = "";

const Geoviewmapdiv = document.createElement("div");
  

function Help() {
  ReactDOM.render(
  <Popup
    trigger={<button className="button" id="pop"> Open Modal </button>}
    modal
    nested
  >
    {close => (
      <div className="modal">
        <button className="close" onClick={close}>
          &times;
        </button>
        <div className="header"> Help </div>
          <Box  style={{background:"white",float : 'left',overflowY:'scroll',display: "flex",
        flexGrow: 1,
        flexDirection:"column",
        maxHeight:"200px"}} >
            
              General Information
              
The Federal Geospatial Platform Authoring (FGPA) tool is used to create, update, validate and preview configuration files used by the Federal Geospatial Platform Viewer (FGPV).
<br></br>
The FGPA tool is based on React. This library generates forms from JSON schemas.
<br></br>
The FGPA tool uses the same schema as the FGPV and lets user modify values to easily create new configuration files. The schema is composed of 5 sections:
Map
            
      <br></br>      
<br></br>

 # Map is divided in 5 sections (Extents and Levels of Details, Basemaps, Layers, Legend and Components)
            <br></br>
UI
            <br></br>
            <br></br>
UI is divided in 4 sections (General, Application Bar, Navigation and Side Menu)
            <br></br>       
<br></br>            
Services
             <br></br>
Services is divided in 3 sections (Export Map, Geo Search and Service End Points)
            <br></br>
            <br></br>
Version
            <br></br>
            <br></br>
Language
            <br></br>
            <br></br>
For more information about schema structure, go to the FGPV schema section in our wiki page. This section will also give you information on schema values and their effect in the viewer.

<br></br>
Useful information
            <br></br>
             <br></br>
To switch the interface language, use the language dropdown menu located in the upper right corner .

At any time, when available, you can use the expand or collapse buttons  to expand or collapse all the items inside a section.

Some configuration items are for more advanced user. You can show/hide these items with the Show advanced configuration options checkbox located under each section name.

Some items like basemaps, layers and layer fields can be reordered. You can easily identify reorderable items with the drag handle . To reorder an item, click the handle then drag the item to the desired position. A yellow box will appear under the item where it will be placed when you release the handle. Note: it is easier to drag an item when all items inside the section are collapsed.

To upload user configuration file or template directly from url you can use the following syntax:

your instance url?filename=your file name (e.g. https: //xxx/fgpv-author.html?filename=https: //myfolder/myfilename.json)
your instance url?template=your template name (e.g. https: //xxx/fgpv-author.html?template=mytemplate.json)
Note: if the application can't read the configuration file or if the template doesn't exist, it will open the default configuration or the first template inside the list on templates.

Unanticipated behavior may occur if any interactions occur before data is fully loaded. Please allow the webpage to load completely before triggering any functions. If you still encounter bugs, please submit an issue in our GitHub repository. Someone from our development team will take care of it as soon as possible.
            <br></br>
            <br></br>
Header
 <br></br>
 <br></br>
The header toolbar allows you to:
 <br></br>
Open the FGPA help window from the question mark button.
Create a new configuration file from scratch  - only available when no templates are provided -.
Create a new configuration file from templates  - only available when templates are provided -.
Templates are managed by the organization in charge of this FGPA instance. Contact the organization if you need more information or would like an update to the list of templates.
Upload an existing configuration file .
Save the configuration file once finished .
All files are saved in your Downloads folder. The application automatically increments the file name at each backup.
The file name you are working on is shown to the left of the save icon. However, if you save a file using an existing file name, it will be renamed by your operating system and may no longer match the file name you used (e.g. Test is shown as the used file name but renamed file name is Test(1)).

When you create or upload a configuration file, loading time may vary based on the number of layers and basemaps being loaded.
            <br></br>
             <br></br>
Map - Extents and Levels of Detail
This section is used to define the tile schemas for your viewer application. For each tile schema, a spatial reference system must be defined in the Spatial Extents Sets section. Again, for each tile schema, levels of detail (LODs) must be defined in the Levels of Detail Sets section. For this, an ESRI tile cache layer must be used to retrieve the list of LODs from. Each LOD corresponds to a map at a given scale or resolution. Therefore each basemap linked to a tile schema must share the same spatial extent and LODs.

For more information about how to setup the Extents and Levels of Detail section, see the help dropdown menu located below the section header.
<br></br>
<br></br>
Map - Basemaps
<br></br> <br></br>
This section is used to add basemaps to your viewer application. To add a basemap, a tile schema appropriate for this basemap must already have been created. Once a basemap is added, the following information must be provided:
 <br></br>
Name - it will be used to generate the basemap id -
Description
Alternate Text
Tile Schema ID (selected from existing tile schema)
At least one layer with ID, Layer Type and URL.
You must set the initial basemap that will appear when the viewer launches. To do so, select the basemap id (name-unique key from Initial Basemap ID) from the dropdown menu.

For more information about how to setup the Basemaps section, see the help dropdown menu located below the section header.
<br></br>
<br></br>
Map - Layers
<br></br>
<br></br>
This section is used to add layers to your viewer application. Once a layer is added, the following information must be provided:
<br></br>
<br></br>
Layer Type
esriDynamic
esriFeature
esriImage
esriTile (an appropriate tile schema must exist)
ogcWms
Name - it will be used to generate the layer id -
URL
At least one layer entry must be added if the selected layer type is esriDynamic or ocgWms. The following properties must be set:
 <br></br>
Index for esriDynamic
ID for ogcWMS
You can make a esriDynamic layer look like a esriFeature layer inside the legend with the Single entry collapse option. This option will render a single layered dynamic layer with a single layer without its root group.

Optionally you can set URL values for the Metadata URL and Catalog URL options to display the relative information inside the viewer's metadata panel available in the Layer Controls section.

For each layer and layer entries, the following Layer Controls options can be selected:

Opacity (opacity)
Visibility (visibility)
Bounding box (boundingBox)
Query (query)
Snapshot (snapshot)
Metadata (metadata)
Boundary zoom (boundaryZoom)
Refresh (refresh)
Reload (reload)
Remove (remove)
Settings (settings)
Table (data)
Styles (styles)
             <br></br>
For each layer and layer entries, the following State options can be selected:

Opacity - Initial opacity value.
Visibility - Initial visibility setting.
Bounding box - Set initial display of the layer's bounding box.
Query - Enable querying of map feature and display information inside the viewer's details panel. Will only work with esriFeature and esriDynamic layer type.
Snapshot - Retrieve all feature data immediately on load. Will only work with esriFeature layer type.
Hovertips - Enable hover tips. Will only work with esriFeature layer type.
For every esriFeature layer and every esriDynamic layer entries a table is created automatically when the URL or entry Index option is set. The table section is optional and is populated from the service information by default. You can customize the following table properties:

Title - Custom table title to apply. Default title is the layer name.
Description - Specifies additional information to be displayed in the table settings panel.
Maximize - Specifies if the table window is maximized on open. Default window size is split view.
Apply map - Specifies if table filters (from columns filters) are applied to the map (definition query).
Fields Customization - Specifies the array of table columns to display. Columns can be reinitialize with the Set Fields button at any time. The following properties can be customized:
Title - Custom column title. Default column title is set with column's alias name from the service.
Description - Specifies additional information to be displayed in the table settings panel.
Visible - Specifies if the field is visible by default.
Width - Column's width. If no width is set, best width will be calculated.
Sort - Sort ascending (asc) or descending (dsc).
Searchable - Specifies if column can be filtered or not.
Filters - For each column, the following filter properties can be customized:
Type - Specifies the filter type to use. If Type is not specified, data field type will be used. String filter can be string or selector. Other filters must be of the same type.
Value - Specifies the filter value.
Static - Specifies if filter value can be modified or not.
Important - Modifying the layer type of an existing layer is not a good practice. It is better to create a new layer and then delete the old one.

For more information about how to setup Layers section, see the help dropdown menu located below the section header.
 <br></br>
Map - Legend
This section is used to define legend for your viewer application. There are 2 types of legends to choose from: Autopopulate and Structured. The Autopopulate legend will read the layers as they appear in the Layers section in order to create a simple default legend.

The Structured legend allows you to customize the display order of the layers, the layer grouping, descriptions and many other settings.

For more information about legend customization options, see the dropdown help menu located below the section header.
 <br></br>
Map - Components
This section is used to define map component:

Mouse Coordinates
WKID must be set to display mouse coordinates on the map
Coordinates can be in degrees minutes seconds (DMS) and decimal degrees or meters depending on the projection (WKID)
North Arrow
Scale Bar
Overview Map
To change the overview map basemap, use Static Overview Map in the appropriate tile schema of Extents and Levels of Detail section
User Interface
General
The General section is for customizing the following information:

Full screen - Used to set viewer application’s initial size to Full Screen (a.k.a. entire viewport).
On Viewer Failure
Failure Message - Custom message to use instead of the default failure message.
Failure Image Url - Custom image to use instead of the default failure image.
Legend
Is Reorderable Set to allow interactive reordering of layers inside the viewer application's legend. Structured legends ignore this option.
Allow Layers Import Set to allow interactive importing of additional layers inside the viewer application.
Legend Opening Options - Set to display the legend's initial view in small, medium and/or large display.
Table Opening Options - Set to display the table's initial view in small, medium and/or large display.
For table to open by default, a layer id must be selected.
Application Bar

 <br></br>
The Application Bar section allows you to add or remove the following tools:

Side Menu
Geosearch
Basemap Selector
Layers Selector (legend)
Navigation Bar
The Navigation Bar allows you to add or remove the following navigation components:

Your location (geolocator) - Display user position on the map
Initial extent (home) - Zoom to initial extent
Basemaps selector (basemap) - Open Basemap Selector - also available in the Application Bar -
Help (help) - Open help window - also available in the Side Menu -
Full screen (fullscreen) - Open viewer in fullscreen - also available in the Side Menu -
Geo search (geoSearch) - Open Geosearch tool - also available in the Application Bar -
Side menu (sidemenu) - Open the Side Menu - also available in the Application Bar -
Layers selector (layers) - Open the Layers Selector (legend) - also available in the Application Bar -
You can restrict navigation within the maximum extent by checking the Restrict Navigation checkbox.
 <br></br>
Side Menu
The Side Menu allows you to configure how the side menu will appear. First you can set a title and a logo. If no title or logo are provided, the default title ("FGP R2 Viewer") and logo will be used. Then you can add as many group of tools as you want from the following options:

Layers selector (layers) - Layers Selector (legend) - also available in the Application Bar -
Basemaps selector (basemap) - Basemap Selector - also available in the Application Bar -
Geo search (geoSearch) - Geosearch tool - also available in the Application Bar -
Map description (about) - Display additional information about the map
About can be of type string or file. When type file is selected, you must provide a folder name for your custom About markdown formatted files located inside the FGPV instance.
Important About of type file will not show up inside preview mode.
Full screen (fullscreen) - Open viewer in fullscreen - also available in the Navigation Bar -
Map export (export) - Export the map view as png image
Share the map (share) - Create a URL link to share the map
Touch mode (touch) - Enable touch mode for touch screen (to enhance layout spacing and button size)
Help (help) - Open Help window - also available in the Navigation Bar -
If you do not want to use the default Help, you must provide a folder name for your custom Help markdown formatted files located inside the FGPV instance.
Important Custom Help will not show up inside preview mode.
Languages selector (language) - Set interface language
Plugins section (plugins) - Container to receive custom plugins
Important plugins section will not show up inside preview mode. A piece of code must be added to the viewer application HTML page to activate the plugin(s).
Note: tools inside groups are not ordered as they appear inside the group list. They are ordered by selection order e.g. if you click on basemap then layers, inside the side menu basemap will appear first because it was the first item selected from the group.
 <br></br>
Services
             <br></br>
Export Map
Export Map allows you to configure what components will be displayed by default and/or be customizable on the map when exported as a png image. The Is present checkbox under each component allows you to add the components by default to the exported map. The User can remove it checkbox allows you to choose if you want the user to be able to remove the component from the exported map.

The following components can be displayed or customized:
 <br></br>
Title - a default value can be set -
Map
Legend
Map Elements (north arrow and scalebar)
Footnote - a default value can be set -.
Timestamp
<br></br>    
Geosearch
The Geosearch section allows you to configure the geosearch tool capabilities. Geosearch allows you to find Canadian locations by different categories like cities, provinces, topographic entities and so on leveraging the Geonames API. In addition of this, Geosearch allows you to find locations by National Topographic System (NTS) name, forward sortation area (FSA) code and Latitude/Longitude values. The last 3 search types options can be enabled by checking the corresponding checkbox on.

All URLs required by Geosearch are read-only values. If you encounter a problem whit these services, contact the person in charge of the FGPA application instance you are using and/or submit an issue to the FGPA developers team.
 <br></br>
Service endpoints
The Service endpoints section lists all the services URLs the viewer application requires. These URLs are read-only values and therefor cannot be modified. If you encounter a problems with these services, contact contact the person in charge of the FGPV application instance you are using.
 <br></br>
Version
The version section allows you to select the version number of the FGP viewer you would like to use.  
          
              </Box>
              < button
            className="button"
            onClick={() => {
              console.log('modal closed ');
              close();
            }}
          ></button>
       
      </div>
    )}
  </Popup>, document.getElementById('popup-root')
  )
  
}

function App3() {
 ReactDOM.render(
  <Popup
    trigger={<button className="button" id="pop"> Open Modal </button>}
    modal
    nested
  >
    {close => (
      <div className="modal">
        <button className="close" onClick={close}>
          &times;
        </button>
        <div className="header"> map </div>
          <div className="content">
            
         <div id="map" ></div>
              < button
            className="button"
            onClick={() => {
              console.log('modal closed ');
              close();
            }}
          ></button>
        </div>
      </div>
    )}
  </Popup>, document.getElementById('popup-root')
  )
  
}

const onSubmit = ({ formData }) => {

  formSubmitted = true;

 
  //modified for navSelected may 2
  //commented out sept 26 reemoved navselected to do a deploy

 // if ((plugin === "map")||(navSelected = "map")) {
  if ((plugin === "map")) {

    const map1 = document.getElementById("mapTwo")
    let temp1 = document.getElementById("mapTwo").innerHTML;
    if (temp1 !== "")
    {
      console.log(' inside delete div matp2');
      temp1 = document.getElementById("mapTwo");
      temp1.parentNode.removeChild(temp1);
    }
    
    console.log('map div=', Geoviewmapdiv);
    map1.replaceWith(Geoviewmapdiv); // rect error 31
    console.log('before calling map init');
   
    window.cgpv.init();   //commented feb 3
    console.log('submit formdata=', formData);
    console.log("formdata2 to write=", formData);

  } // end map
    
  console.log("in save plugin enable=", plugin, formData.enable);
  
   //commented out sept 26 reemoved navselected to do a deploy
 //if (((plugin === "thematicSlider")||(navSelected = "thematicSlider")) && (formData.enable === true)) 

  if ((plugin === "thematicSlider") && (formData.enable === true)) 
  {
    map["thematicSlider"] = { "thematicSlider": formData };
    console.log("pluegin=thematicslider submit,mfordata=", formData);
  }
  else if ((plugin === "rangeSlider") && (formData.enable === true)) {
    map["rangeSlider"] = { "rangeSlider": formData };
    console.log("pluegin=rangeslider submit,mfordata=", formData);
  }
  else if ((plugin === "chart") && (formData.enable === true))
  {
    map["chart"] = { "chart": formData };
    console.log("pluegin=drawin submit,mfordata=", formData);
  }
    else if ((plugin === "Draw Toolbar") && (formData.enable === true)) //jan 23 just commented out to test
   {
    map["draw"] = { "draw": formData };
    console.log("pluegin=drawin submit,mfordata=", formData);
  } //draw = formData.draw;
    //draw = { "draw": formData };
  else if ((plugin === "Swiper") && (formData.enable === true)) {
   // swiper = { "swiper": formData };
    map["swiper"] = { "swiper": formData };
    console.log("pluegin=swiper  formdata=", swiper);
  }
  else if (plugin === "map") {
    map = formData;
    console.log("------ map  formdata=", map);
  
    let mapLayersNameString = "";
    if (typeof formData.map.listOfGeoviewLayerConfig !== "undefined" ) {
      console.log(" ------- geoview layer name,type of", typeof formData.map.listOfGeoviewLayerConfig[0],formData.map.listOfGeoviewLayerConfig[0].layerName);
    
      for (let i = 0; i < formData.map.listOfGeoviewLayerConfig[0].listOfLayerEntryConfig.length; i++) {
        console.log("in layer loop");
        console.log("in layer loop layername=", formData.map.listOfGeoviewLayerConfig[0].listOfLayerEntryConfig[i]);
        //  console.log("in layer loop layername=",formData.map.listOfGeoviewLayerConfig[0].listOfLayerEntryConfig[i].layerName.en);
 
        console.log("in layer loop layername=", formData.map.listOfGeoviewLayerConfig[0].listOfLayerEntryConfig[i].layerId);
         console.log("in layer loop maplayeranameString=", mapLayersNameString);
 
        //works
        mapLayersName.push(formData.map.listOfGeoviewLayerConfig[0].listOfLayerEntryConfig[i].layerId);
       
        console.log("in layer loop maplayeraname=", mapLayersName);
     
        console.log("inloop json strinify =", JSON.stringify(formData.map.listOfGeoviewLayerConfig[0].listOfLayerEntryConfig[i].layerName.en));
    
      } //for
    }//if
    console.log("after layer loop maplayersname=", mapLayersName);
    //feb21 commneted out below
   // mapLayersName = ({ "enum": mapLayersName });
    console.log("after loop 2maplayeraname=", mapLayersName);
  
 
   }   //if    

  //console.log("in save formdata,draw=",formData.draw);
  
  console.log("in save formdata,map=", map, "draw=", draw);
  let mapData = JSON.stringify(map); 
  //commented out oct  18 -----
  //let plugins2 = mapData;
  console.log("in save formdata,mapData=", mapData);
  //commented out oct  18 -----
  //let plugins = JSON.parse(plugins2);
  //mar 17 new
  map = map["map"];
  console.log("map[map]=", map["map"]);
  
  blob = new Blob([JSON.stringify({ map})], { type: "text/plain;charset=utf-8" }); // mar 15
 
  //mar 17 commented out
 // blob = new Blob([JSON.stringify({plugins})], { type: "text/plain;charset=utf-8" });
 
  console.log("blob=",blob);

}; //end submit

        

function SchemaForm() {
 
  // doesnt  display title 
  const CustomTitleField = ({ title, required }) => {
    console.log(" 00000000000000000000  in custom field", title);
    const legend = required ? title + '*' : title;
    console.log(" 0000000000000000000000000000000000000000000000  in custom field",legend);
    return (<div id="custom"> HIIIII {title}</div>);
  //returns markrdown below
  //return <div  id="custom" class="MultiTopography-h5"><em>  {title}</em></div>;

  //return <div id="custom"><em> hi hhhhhhhhhhhhhhhhhhhhhhh {title}</em></div>;
  };
  
  const CustomDescriptionField = ({ id, description }) => {
    console.log(" 0000000000000000000000000000000000000000000000  in custom field", description);
    return <div id={id}> Hiiii {description}</div>;
  };
  

  //works changes every title field for every section, oct 16, active now
  function TitleFieldTemplate(props) {
    const { id, required, title } = props;
    return (
      <header id={id}  class="MuiTypography-root MuiTypography-h5">
      {title}
      {required && <mark></mark>}
     </header>
    );
  }
  //following works but dsplays field title in duplicate
  function CustomFieldTemplate(props) {
    //   console.log("---------------label is =", label);
    const { id, classNames, label, help, required, description, errors, children } = props;
       console.log("---------------label adn description is =", label, description);
    return (
    <div className={classNames}>
      <label htmlFor={id}> Hiii  {label}{required ? "*" : null}</label>
      {description}
      {children}
      {errors}
      {help}
    </div>
    );
  }

  const fields = {
    TitleField: CustomTitleField,
    DescriptionField: CustomDescriptionField
   //,  SchemaField: CustomSchemaField
  };

  
  //const Templates = {
  //  TitleField: CustomTitleField,
   // DescriptionField: CustomDescriptionField,
   // TitleFieldTemplate,TitleFieldTemplate
    //,  SchemaField: TitleFieldTemplate
  //};

//  const  RegistryFieldsType=  {
// TitleField1: CustomTitleField,
////  DescriptionField: CustomDescriptionField
//};
  
 
  let uiSchema = {
  //  'ui:globalOptions': { copyable: true },
    //'ui:classNames': 'custom-css-class',
     "ui:classNames": "bold-title",

    //   "ui:widget": (props) => {
    //   return (
    //     <input type="text"
    //      className="custom"
    //      value={props.value}
    //      required={props.required}
    //     onChange={(event) => props.onChange(event.target.value)} />
    // );
    // },
 
    //
    
    rangeSlider: {
      // "ui:enableMarkdownInDescription": true,
      "ui:FieldTemplate": CustomFieldTemplate,

      enable: {
        "ui:FieldTemplate": CustomFieldTemplate,
        "ui:enableMarkdownInDescription": true,
        'ui:style': { color: 'blue' },
        "ui:description": "Make text **bold** or *italic*. Take a look at other options [here](https://probablyup.com/markdown-to-jsx/).",
        //       "ui:CustomTitleField": "**RangeSlider**",
        "ui:title": "##RangeSlidersssss##"
      },
      controls: {
        "ui:FieldTemplate": CustomFieldTemplate,
        "ui:enableMarkdownInDescription": true,
        'ui:style': { color: 'blue' },
        "ui:description": "Make text **bold** or *italic*. Take a look at other options [here](https://probablyup.com/markdown-to-jsx/).",   
      },
      params: {
        type: {
          //"ui:FieldTemplate": CustomFieldTemplate,
          "ui:enableMarkdownInDescription": true,
          "ui:description": "##ooooo basemapOptions oooo",
          "ui:title": "Rangy  basemapOptions oooo",
        }
      },
      "rangeType": {
        //  "ui:FieldTemplate": CustomFieldTemplate,
        "ui:title": "##RangeSlider bbbb##"
      }
    },
    map:
    {
      //following works supposed to work
     
      // "ui:field": "TitleField",
      //   "ui: CustomTitleField":"mapit",
      // below doesn't work unless adn objet field
      // "ui:enableMarkdownInDescription": true,
      //doesnt wpdate range slider or chart with uischem only map
   
      basemapOptions:  //Custom titles does not work for titles/labels on string fields. Moreover, it seems to only work on titles/labels for object fields.
      {
  
        basemapId: {
          // "ui:field": "TitleFieldTemplate",//works
          // "ui:FieldTemplate": CustomFieldTemplate,
        
          //"ui:classNames": "MuiTypography-subtitle2",
          //below works
          // "ui:description": "**_basemapOptions_**"
          //"ui:style": { color: "blue", backgroundColor: "blue" }
        },
        shaded: {
          //  "ui:field": "TitleField",
          //  "ui:FieldTemplate": CustomFieldTemplate,
          //    "ui:classNames": "bold-title",
          "ui:classNames": "MuiTypography-subtitle2",
          //"ui:style": { color: "blue" , backgroundColor: "blue" },
          //   "ui:widget": "select" ,//works
          //     "ui:widget":"input[type=color]",
          //     "ui:widget":"input[type=color]",
      
        },
        
        labeled: {  //   "ui:field": "TitleField",
          "ui:field": "CustomDescriptionField",
          "ui:classNames": "bold-title",
          //"ui:widget": "select" //works
        }
      }, //basemapoaptions
      interaction: {

        // below works  and display interactoion
        //   "ui:FieldTemplate": CustomFieldTemplate
        // "ui:classNames": "bold"
        "ui:widget": "select" //works
      },
     
      listOfGeoviewLayerConfig:
      {
        items: {// works with items here
        
          geoviewLayerName: {
            en: {
              "ui:classNames": "bold-title"
            }
          },
          geoviewLayerId: {
            "ui:classNames": "bold-title",
            en: {
              "ui:classNames": "bold-title",
              //classNames: "style={fontWeight:\"bold\"}"
            }
          },
          metadataAccessPath: {
            en: {
              "ui:autocomplete": "on",
              "ui:placeholder": "http://",// doesnt work even if don't use defintion
              // doesnt work cecause uses definition ? works if store definition in schema and use uri format
              "ui:format": "uri"
            },
            fr: {
              "ui:autocomplete": "on",
              "ui:placeholder": "http://",
              "ui:format": "uri"
            }
          },

          listOfLayerEntryConfig:
          {
            items: {
              style: {
                LineString:
                {
                  settings: {
                    stroke: {
                      color: { "ui:widget": "color", maxLength: 1 }
                    }
                  }
                },
                Point:
                {
                  settings: {
                    stroke: {
                      color: { "ui:widget": "color", maxLength: 1 }
                    }
                  }
                },
                Polygon:
                {
                  settings: {
                    stroke: {
                      color: { "ui:widget": "color", maxLength: 1 }
                    }
                  }
                }
                  
              },
              settings: {
                color: {
                  "ui:widget": "color",
                  maxLength: 1
                }
              },
              source: {
                style: {
                  LineString:
                  {
                    settings: {
                      stroke: {
                        color: { "ui:widget": "color" }
                      }
                    },
                  },
                    Point:
                    {
                      settings: {
                        stroke: {
                          color: { "ui:widget": "color" }
                        }
                      }
                    },
                    Polygon:
                    {
                      settings: {
                        stroke: {
                          color: { "ui:widget": "color" }
                        }
                      }
                    }
                }, //style
                  cluster: {
                    settings: {
                      color: {
                        "ui:widget": "color"
                      },
                      stroke: {
                        color: { "ui:widget": "color" }
                      }
                    }
                
                 }  //cluster
               }//source
              }//irems
            }
          }
        }  //listOfGeoviewLayerConf
      }   //map
      ,

      externalPackages:
      {
        items: {  // works with items here
          name: {
            "ui:enableMarkdownInDescription": true,
            "ui:description": "Make text **bold** or *italic*. Take a look at other options [here](https://probablyup.com/markdown-to-jsx/).",
          },
          configUrl: {         
            "ui:format": "uri", //format uri only works when in schema
            "ui:placeholder": "http://",  //doesnt work
            "ui:autocomplete": "on",          
          }
        }
      },
      serviceUrls: {
        geolocator: {
          "ui:format": "uri", // must be in schema for work
          "ui:autocomplete": "on",
          "ui:placeholder": "http://",
        },
        proxyUrl: {
          "ui:format": "uri",
          "ui:autocomplete": "on",
          "ui:placeholder": "http://"
        },
      },

      chart: { 
        "ui:FieldTemplate": CustomFieldTemplate,
        "ui:enableMarkdownInDescription": true,
        "ui:description": "##*ooooo* ##*basemapOptions* ##oooo",
        enable: {
          "ui:enableMarkdownInDescription": true  
        }
      }    
  }; //uischema

  // below works 
  const [newformData, updateForm] = useState(formData);

  const [value, setValue] = React.useState('first Nation');

  // load predefinied templates from file
  const handleTemplateChange = (event) => {

    let filename = "";
    setValue(event.target.value);
    console.log("MMMmap template event=", event.target.value);
    if (event.target.value === "First Nation") {
      filename = "firstnation.json";
    }
    else if(event.target.value === "Energy") {
      filename = "energy.json";
    }
    else if(event.target.value === "Weather Geomet") { 
    filename = "weatherGeomet.json";
  }
    
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET",filename,true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function () {
    if (xmlhttp.status == 200 && xmlhttp.readyState == 4) {
      
        plugins["plugins"] = (JSON.parse(xmlhttp.responseText));

        formData = (JSON.parse(xmlhttp.responseText));
 
        updateForm(formData);  // works form is updated --------------------------------------
        forceUpdate;
        console.log("just updated form data using hook in file read ---------------",formData);
     
        }
    }
  };
 
  // following updates state of the form
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
 
  console.log("this schema ----------form Data=", formData);
  let navigate = useNavigate();
  const location = useLocation();


  function isJsonString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  //save json file in download directory

  let filesave = () => {
      
    console.log('in filesave');

    console.log("blob=", blob);

    saveAs(blob, "data.json");
    console.log("  -----  saved blob=");
    //let formData = JSON.parse(JSON.stringify({ blob }));
    console.log("after set blob=", blob)
  }


  // let fileLoad = e=> {

  function fileLoad(filename) {
 
    console.log('in fileload');
    //const fileReader = new FileReader();
    console.log('in afterfilerader');
    const file = document.getElementById("file-selector");
    file.setAttribute("display", "inline");
    //  console.log("  filesave formdata=",formData);
 
    // formData: {}
    //   var blob = new Blob([JSON.stringify({ formData }  )], {type: "text/plain;charset=utf-8"});
    // console.log("blob=",blob);
    //saveAs(blob, "data.json");
    file.setAttribute("display", "none");
    // var fileList = window[fileList].files;
    // const input = document.querySelector('input');

    //const file1 = file.files[0]; /changed june 27
    let   file1 = file.files[0];
    console.log(' file to open=', file1);
  
    //console.log("e filename", e.target.files[0].name);
   
    // console.log(' file to name=', file1.name);
    if (typeof (filename) !== "undefined")
    {  
        console.log(' setting file name,filename=',filename);
     //  file1[0].name= filename;
    }
    // console.log(' file to name=', file1.name);

        console.log(' 2 file to open=', file1);
      var f = new FileReader();
    // f.readAsText(file1, 'utf8');

    if (typeof (filename) !== "undefined") { 
        console.log(' opening filereder=', "firstnation.json");
      f.fileName = filename;
    }
    
    f.readAsText(file1, 'blob');// new jan 5  becasue of error but wprked before
   
    f.onloadend = function () {
      console.log("success");
      console.log("file =", f.result);
   
      console.log("file =", f);
      blob = f.result;

      fileLoaded = true;
      //formData = JSON.parse(f.result);
      // let newformData = JSON.parse(f.result) ;
      //console.log ("updateed form data ???=",newformData);
   
      // {"formData":{"map":{"basemapOptions":{"id":"transport","shaded":true,"labeled":true},"interaction":"dynamic","viewSettings":{"center":[-106,60],"enableRotation":true,"extent":[1,23,2,4],"projection":3978,"rotation":0,"zoom":12},"extraOptions":{}},"theme":"dark","appBar":{"about":{}},"navBar":["zoom","fullscreen","fullextent"],"components":["app-bar","nav-bar","overview-map","north-arrow"],"corePackages":["basemap-panel","layers-panel","details-panel","geolocator-panel"],"externalPackages":{"keys":"https://geocore.api.geo.ca"},"serviceUrls":{"keys":"https://geocore.api.geo.ca"},"suportedLanguages":["en-CA","fr-CA"]}}
      console.log(" setting state");
      // setState({ formData: JSON.parse(blob) });
 
      // newformData = JSON.parse(blob);
      if (isJsonString(blob)) {
     
        // just to test addition of plugin to map json  mar 14 to test
        //  plugins = JSON.parse(blob); 
        plugins = JSON.stringify(plugins);
        plugins = JSON.parse(plugins);

        console.log("after push plugins=", typeof plugins, plugins);
        plugins["plugins"] = (JSON.parse(blob));
        console.log("after push plugins=", plugins);

        // plugins = JSON.parse(blob); 
    
        formData = plugins;

        console.log("justbefore setting to swiper----formData", formData);
        let newData = formData;
        if (plugin !== "map") {
       
          if (plugin === "draw")
            newData = formData.draw;
       
          else if (plugin === "Swiper")
            newData = formData.plugins.swiper;// works
     
          console.log("just set state1 newData=", plugin, newData);
          formData = newData;

          console.log("just set state formData", formData);
        }
        else {
          //newData = formData.plugins.map; doesn't work
          newData = formData.plugins; // works
          let map = newData;
          // formData = map;//commneted marcg 16

          formData = map;
       
          console.log("just set state map map ----formData", formData);
       
        }
        console.log("just set state1 formdata=", formData);
  
        //change back jan 24 undelte this
        updateForm(formData);  // works form is updated --------------------------------------
        forceUpdate;
        console.log("just updated form data using hook in file read ---------------");
        console.log("just updated form data -- newformdata=", newformData);
      }
      else {  
        try {
          JSON.parse(blob);
        } catch (error) {
          console.log("error on reading input file is ", error.message);
          alert("invalid json file, filename =" + file1.name + "  error =" + error.message);
        }
    
      }
      // console.log("just set state newformdata", newformData);
      forceUpdate();
    }  
  }

  let transformErrors = (errors) => {
    console.log("------------------------ in transform errors",errors);
    var e = [];
    errors.map(error => {
      if (error.message !== "should be equal to one of the allowed values") {
        e.push(error)
      }
      if (error.message === "should be number") {
        error.message = "devrait etre numero";
        e.push(error)
      }
    });
    // console.log(e);
    return e;
  };

  useEffect(() => {  // just uncommented following 2 line monday jan 23
    /// updateForm(formData);
    forceUpdate;
    //  console.log("here is the effect----------------------------------", newformData);
  }, []);
  

  let dataObject = location.state.data;
  console.log('data object-', dataObject);
  
  let jsonObject = JSON.stringify(dataObject);
  let schemaData = JSON.parse(jsonObject);
 
  console.log('form dagta-'); // all data inisde plugin ?

  //just commnetd ou jan 23 for test
  const desiredSchema = location.state.desiredPlugin;
 
  console.log('desired schema', desiredSchema); // all data inisde plugin ?
 
  if (oldSchema !== desiredSchema) {
    formnotUpdated = true;
  }
  if (desiredSchema === "Range Slider") {
    schemaData = schemaData[0].rangeSlider;
    if ((fileLoaded) && (formnotUpdated)) {
      formnotUpdated = false;
      //    formData = JSON.parse(blob);
      formData = plugins;
   
      formData = formData.plugins.rangeSlider;// works yes jan 31,react limits number of render s need timeout
      console.log("just tried to change to rangle slider form 1111111 data=", formData, (typeof formData));
      setTimeout(() => { updateForm(formData); console.log("in range slider set timeout",); }, 50);//was 1000}
    } else if (formnotUpdated) {
      console.log("just tried to change to rangle slider form 2222 data=", formData, (typeof formData));
    
      console.log(" setting range slider 22222 enumm dataObject=", dataObject);
     
      console.log(" setting range sliderenumm dataObject array type=", typeof dataObject);
      console.log(" setting  ragne slider dataObject array=", dataObject["0"].rangeSlider.properties.layers.items.properties.id);
      //below wrks
      dataObject["0"].rangeSlider.properties.layers.items.properties.id = ({ "enum": mapLayersName, "default": mapLayersName[0] });
      console.log(" setting -----22 chart slider dataObject array=", dataObject["0"].rangeSlider.properties.layers.items.properties.id);
      //  formData.layers.push({ "enum": mapLayersName });.layers.push({ "enum": mapLayersName });
      setTimeout(() => { updateForm(formData); console.log("in range slider set timeout",); }, 50);//was 1000}
    }
  } else if (desiredSchema === "chart") {
    schemaData = schemaData[0].chart;
    if ((fileLoaded) && (formnotUpdated)) {
      formnotUpdated = false;
      //   formData = JSON.parse(blob);
      formData = plugins;
      formData = formData.plugins.chart;// works yes jan 31,react limits number of render s need timeout
      console.log("just tried to change to chart form data=", formData, (typeof formData));
      setTimeout(() => { updateForm(formData); console.log("in swiper set timeout",); }, 50);//was 1000}
    } else if (formnotUpdated) {
      console.log(" setting chart enumm dataObject=", dataObject);
     
      console.log(" setting chart sliderenumm dataObject array type=", typeof dataObject);
      console.log(" setting  chart slider dataObject array=", dataObject["0"].chart.properties.layers.items.properties.id);
      //below wrks
      dataObject["0"].chart.properties.layers.items.properties.id = ({ "enum": mapLayersName, "default": mapLayersName[0] });
      console.log(" setting  chart slider dataObject array=", dataObject["0"].chart.properties.layers.items.properties.id);
      //  formData.layers.push({ "enum": mapLayersName });.layers.push({ "enum": mapLayersName });
      setTimeout(() => { updateForm(formData); console.log("in swiper set timeout",); }, 50);//was 1000}
    }
    
  } else if (desiredSchema === "languages") {
    schemaData = schemaData[0].languages;
  } else if (desiredSchema === "version") {
    schemaData = schemaData[0].version;
  } else if (desiredSchema === "Ui") {
    schemaData = schemaData[0].Ui;
  } else if (desiredSchema === "map") {
    console.log('schma map-', schemaData[0].map);
    if ((fileLoaded) && (notfirstLoad) && (formnotUpdated)) {
      
      formData = plugins;
      //   formData = JSON.parse(blob); // mar 16
      formnotUpdated = false;
      //  schemaData = schemaData[0].map;
      formData = formData.plugins;// works yes jan 31,react limits number of render s need timeout
      console.log("just tried to change  map to form form data=", formData);
      setTimeout(() => { updateForm(formData); console.log("in map set timeout",); }, 50);//was 1000
    }
    schemaData = schemaData[0].map;
  } else if (desiredSchema === "Services") {
    schemaData = schemaData[0].Services;
  } else if (desiredSchema === "Swiper") {
    schemaData = schemaData[0].swiper;
    if ((fileLoaded) && (formnotUpdated)) {
      formnotUpdated = false;
      //  formData = JSON.parse(blob);// mar 16
      formData = plugins;
      formData = formData.plugins.swiper;// works yes jan 31,react limits number of render s need timeout
      console.log("just tried to change to swiper form data=", formData, (typeof formData));
      setTimeout(() => { updateForm(formData); console.log("in swiper set timeout",); }, 50);//was 1000}

    } else if (formnotUpdated) {
      console.log(" setting swiper enumm dataObject=", dataObject);
     
      console.log(" setting swiper enumm dataObject array type=", typeof dataObject);
      console.log(" setting  enumm dataObject array=", dataObject["0"].swiper.properties.layers);
      
      //below wrks
      dataObject["0"].swiper.properties.layers = ({ "enum": mapLayersName, "default": mapLayersName[0] });
       //  formData.layers.push({ "enum": mapLayersName });.layers.push({ "enum": mapLayersName });
      // setTimeout(() => { updateForm(formData); console.log("in swiper set timeout",); }, 50);//was 1000}
    }
  } else if (desiredSchema === "Draw Toolbar") {
    setTimeout(() => { updateForm(formData); console.log("in swiper set timeout",); }, 50);//was 1000
    console.log("1draw map schema=", schemaData[0].draw);
    schemaData = schemaData[0].draw;  // below causes error jan 23
    if ((fileLoaded) && (formnotUpdated)) {
      formnotUpdated = false;
      // formData = JSON.parse(blob);  // commented out mar 16
      formData = plugins;
      console.log("2 about to change to draw form data=", formData);
  
      formData = formData.plugins.draw;// works yes jan 31,react limits number of render s need timeout
      console.log("just tried to change to draw form data=", formData);
      setTimeout(() => { updateForm(formData); console.log("in draw set timeout",); }, 50);//was 1000
      //   updateForm(formData);
    }
   
  } else {
    schemaData = schemaData[0].thematicSlider;
    console.log("just tried to change to thematic slider form data=", formData, (typeof formData));
  
    if ((fileLoaded) && (formnotUpdated)) {
      formnotUpdated = false;
      formData = plugins;
      //  formData = JSON.parse(blob);
      formData = formData.plugins.swiper;// works yes jan 31,react limits number of render s need timeout
      console.log("just tried to change to thematic slider form data=", formData, (typeof formData));
      setTimeout(() => { updateForm(formData); console.log("in thmatic slider set timeout",); }, 50);//was 1000}
    } else if (formnotUpdated) {
      console.log(" setting thematic enumm dataObject=", dataObject);
     
      console.log(" setting thematic enumm dataObject array type=", typeof dataObject);
      console.log(" setting thmatic enumm dataObject array=", dataObject["0"].thematicSlider.properties.layers);
      //below wrks
      console.log(" setting thmatic slider enumm dataObject array=", dataObject["0"].thematicSlider.properties.layers.items.properties.id);
    
      dataObject["0"].thematicSlider.properties.layers.items.properties.id = ({ "enum": mapLayersName, "default": mapLayersName[0] });
     
    }
  }
  oldSchema = desiredSchema;
  if (fileLoaded)
    notfirstLoad = true;
  
  
  console.log('just updated schema form in main');
  
  // commented out aug 8 becasue of material ui form problem
 // let FormWithPagination = applyNav(Form, EditorNavs);

  //  let FormWithPagination = applyNav(Form);
  
  if (desiredSchema === "map") {
    console.log("id 1 of formdata=", formData);
 
  }
   // let e = 1; 
  return (
  
    //below works withhorizzontal tabs
     // <FormWithPagination schema={schemaData} uiSchema={uiSchema} onSubmit={onSubmit} showErrorList={false} validator={validator}
   
    <div row className="Schema-Form" style={{ flexDirection: "row" }}>
 
    
      <Form schema={schemaData} uiSchema={uiSchema} onSubmit={onSubmit} FieldTemplate={CustomFieldTemplate} fields={fields} templates={{TitleFieldTemplate,CustomFieldTemplate}} showErrorList={false} validator={validator}
      
       //below works context in formData only here otherwise no acccess to attributes
        
        onChange={({ formData }, id) => {
          console.log("onChange, desired schema=", desiredSchema);
          console.log("onChange, formdata=",formData);

          if ((desiredSchema === "map")&&(typeof id !== "undefined")) {
            mapFormChanged = true;
  
            if (formData.map.listOfGeoviewLayerConfig !== undefined) {
               console.log("before in for loop2");
        
              let arrayLength = formData.map.listOfGeoviewLayerConfig.length;
              console.log("before in for loop2", arrayLength);
            
              for (var i1 = 0; i1 < arrayLength; i1++) {
                console.log("in for loop2");
                if (formData.map.listOfGeoviewLayerConfig[i1] !== undefined) {
                  console.log("in for 2 1 loop=");
                  //    
                  console.log("----- geoview layer name=", formData.map.listOfGeoviewLayerConfig[i1].geoviewLayerName);
                }
                console.log("in for 2 2 loop=");
                //      testConfig.map.listOfGeoviewLayerConfig[i].geoviewLayerName.en.replace(/ /g, '&nbsp;');
                //      testConfig.map.listOfGeoviewLayerConfig[i].geoviewLayerName.en.replace(/\\s/g, "_");
                if (formData.map.listOfGeoviewLayerConfig[i1] !== undefined) {
                  console.log("in for 2 3 loop=",typeof formData.map.listOfGeoviewLayerConfig[i1]);
                   console.log("in for 2 33 loop=",typeof formData.map.listOfGeoviewLayerConfig[i1].geoviewLayerName);
              
                  if ( formData.map.listOfGeoviewLayerConfig[i1].geoviewLayerName !== undefined) {
                    
                      if ( formData.map.listOfGeoviewLayerConfig[i1].geoviewLayerName.en !== undefined) {
                        console.log("in for 2 4 loop=");
          
                        console.log("in for 2 5 loop=", typeof formData.map.listOfGeoviewLayerConfig[i1].geoviewLayerName.en);
                  
                         //commented out aug 9 for test, code works
                        //let result = formData.map.listOfGeoviewLayerConfig[i].geoviewLayerName.en.replace(/ /g, "_");
      
                        //commented out aug 9 for test, code works
                        //               formData.map.listOfGeoviewLayerConfig[i].geoviewLayerName.en = result;
                      }
                    }
                  // works must do this to work
               
                  console.log("result 2=", result);
                }
                //   testConfig.map.lig("----result=", resulstOfGeoviewLayerConfig[i].geoviewLayerName.en.replace(" ", '&nbsp;');
                if (formData.map.listOfGeoviewLayerConfig[i1] !== undefined) {
             //     console.log("-----after  2 geoview layer name=", formData.map.listOfGeoviewLayerConfig[i].geoviewLayerName);
                }
                //Do something
              }
            }
           const m = JSON.stringify(formData);

           //below orig, set Geoviewmapid to map  form data
            Geoviewmapdiv.innerHTML = "<div id=\"mapTwo\"class=\"llwp-map\" data-lang=\"en\" style=\" height: 90vh;\" data-config=" + m +
              "> </div>";
            console.log("after stringify Geoviewmapdiv=", Geoviewmapdiv.innerHTML);
          }
        }} transformErrors={transformErrors} formData={newformData} formContext={formData} liveValidate >
      
        <ButtonGroup>
    
            <Box height={14} />
            <Tooltip
              title="Draw map,displays in Geoview" placement="top">
            <Button type="button" variant="contained" color="primary" onClick={() => {
              console.log("draw map, desired schema", desiredSchema);
              console.log("draw map, desired schema", fileLoaded, "map form  changed", mapFormChanged);
              console.log("draw map, Geoviewmapdiv==", Geoviewmapdiv.innerHTML);
          //    if ( && (notfirstLoad) && (formnotUpdated) && (desiredSchema === "map")) {
               if ( ( (desiredSchema === "map")&&((fileLoaded)|| (mapFormChanged )) ) ) {
                console.log("calling (fileLoaded)draw map"); //PopUps();
            
                console.log("calling draw map"); //PopUps();
                App3();
                console.log("calling popip");

                window.openpopup();
                setTimeout(() => {
                  const map1 = document.getElementById("map");
                  console.log("id of map:=", map1);
                  //          console.log("id of basemapid:=", formData2.map.basemapOptions.basemapId);
                  // const temp = document.createElement("div");  //changed height from 70 mar 2
                  console.log('map div=', Geoviewmapdiv);
                  //changed jul 4 for test
                  map1.replaceWith(Geoviewmapdiv); // rect error 31
                  
                  console.log('before calling map init');
                  window.cgpv.init();
                }, 500);  //commented feb 3
              } else {
                alert("cant draw map unless map selected, fields changed on map form or file loaded");
              }
            
      
              }} size="small" >
              
                Draw map
              </Button>
            </Tooltip>
            
          <button ref={submitFormRef} type="submit" style={{ display: "none" }} />
          
           <Box height={14} />
            <Tooltip
              title="Submit and validate configuratiion,displays in Geoview" placement="top">
            <Button type="button" variant="contained" color="primary"
              onClick={() => {
                  if ( ( (desiredSchema === "map")&&((fileLoaded)|| (mapFormChanged )) ) ) {
                    console.log("calling (fileLoaded)draw map"); //PopUps()
                    submitFormRef.current.click()
                  }
                  else {
                     alert("cant Submit map unless map selected and fields changed on map form or file loaded");
                  }
              }}
                      
               size="small" >
              
                Submit
              </Button>
          </Tooltip>

          <Box height={14} />
            <Tooltip
              title="displays Geoview configuration help" placement="top">
            <Button type="button" variant="contained" color="primary" onClick={() => {
                Help();
                console.log("calling popip");
                window.openpopup();
              }}
               size="small" >
              
                Help
              </Button>
            </Tooltip>
        
            <Box height={14} />
            <Tooltip
              title="Save to a json file, must submit first" placement="top">
              <Button type="button" variant="contained" color="primary" onClick={() => { if (formSubmitted) { console.log('blob=', { blob }); filesave(); } else alert("cant save unless submitted"); }} size="small">
                Save
              </Button>
            </Tooltip>
  
            <Box height={14} />
            <Tooltip
              title="Load a Geoview json configuration file" placement="top">
              <Button type="button" variant="contained" color="primary" onClick={() => {
                console.log("before nav1"); window.open_file(); setTimeout(() => {
                  fileLoad(); console.log("after read=");
                  // updateForm(JSOJSON.parse(blob)N.parse(blob)); 
                  //  updateForm(formData);  //jan 6 comments out
                  // forceUpdate; added jan 16
                  console.log("in button just updated form new json=",); 
                   }, 18000);// schemaData = schemaData[0].map;
                   
            }}
                size="small" >
                Load File
              </Button>
          </Tooltip>

        
           <Box height={14} />
            <Tooltip
            title="Load a Predefined Map template  " placement="top">
            <div>

            <label className="dropdown" color="primary">
                Load a Predefined Map template&nbsp;&nbsp;&nbsp;   <select color="primary" value={value} onChange={handleTemplateChange}>
                  <option value="None">None</option>          
                     <option value="First Nation">First Nation</option>                              
                <option value="Energy">Energy</option>
               <option value="Weather Geomet">Weather Geomet</option>
               </select>

           </label>

         </div>
    
          </Tooltip>
      
          </ButtonGroup>
        
          <FormControl component="fieldset">
            <FormLabel top component="legend">Available Plugins</FormLabel>
            <RadioGroup
              row
              aria-label="plugin"
              name="row-radio-buttons-group"
   
            onChange={(event) => {       const jsonString = require("./db.json");
   
              plugin = event.currentTarget.value; console.log("on change", plugin);
               navigate("/plugin", {
                  state: { data: jsonString.plugins, desiredPlugin: plugin },
               });
               
              }
            }
            >
              <Box height={16} />
              <FormControlLabel
                value="Range Slider"
                control={<Radio color="info" />}
                label="Range Slider"
              />
              <FormControlLabel
                value="chart"
                control={<Radio color="info" />}
                label="Chart"
              />
              <FormControlLabel
                value="Swiper"
                control={<Radio color="info" />}
                label="Swiper"
              />
              <FormControlLabel
                value="thematicslider"
                control={<Radio color="info" />}
                label="Thematic Slider"
              />
              <FormControlLabel
                value="map"
                control={<Radio color="info" />}
                label="Geoview map"
              />
              <FormControlLabel
                value="Draw Toolbar"
                control={<Radio color="info" />}
                label="Draw Toolbar"
              />
                          
            </RadioGroup>
        </FormControl>
          </Form >
    
    </div>
   //     </FormWithPagination >
    
  );
}
 

    export default SchemaForm; 
