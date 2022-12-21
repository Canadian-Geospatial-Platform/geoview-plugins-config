/**
 * @author Vijendra Yadav <Vijendra.Yadav@nrcan-rncan.gc.ca >
 */
// commented out aug 9 for test
//import { RJSFSchema, UiSchema, FieldProps, RegistryFieldsType } from '@rjsf/utils';

//sept6 commentd out below, oct 6,v4 mui

//commented out jan 5 for test ------------------
//commneted out  march 19 to add mui collapsible 
//import { CSSProperties } from 'react';
//import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Form from "@rjsf/material-ui";
import {Accordion ,AccordionSummary,AccordionDetails } from "@mui/material";
// or

import {
  getTemplate,
  getUiOptions,
  //ArrayFieldTemplateProps,
 // ArrayFieldTemplateItemType,
 // FormContextType,
  //RJSFSchema,
 // StrictRJSFSchema,
} from '@rjsf/utils';


//added march 19
//import { withTheme } from '@rjsf/core';
//import Theme from '@rjsf/material-ui';
//import { useMuiComponent } from '@rjsf/material-ui';
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


//commented jan 4 for test
//commneted ou for test ajv for verbose nessages
//

//mar 10 uncommented out
//import validator from "@rjsf/validator-ajv8";
import { customizeValidator } from '@rjsf/validator-ajv8';

//import Stack from '@mui/material/Stack';
//import NewWindow from 'react-new-window';
//import { render } from "react-dom";
import { saveAs } from 'file-saver';
import { useState,useCallback,useEffect } from 'react';
import Tooltip from "@material-ui/core/Tooltip";
import  ReactDOM from 'react-dom';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { createRef } from "react";
//import { ContactlessOutlined } from "@material-ui/icons";
// import { CollectionsBookmarkOutlined, TheatersRounded } from "@material-ui/icons";

// import { IconButtonProps, RJSFSchema } from '@rjsf/utils'; // added nov 16
//import {  helpId } from '@rjsf/utils';
// import { Popper } from '@mui/material';

//import {TypeWindow,TypeJsonObject,TypeButtonPanel,TypePanelProps,TypeIconButtonProps,} from 'geoview-core-types'; //aded nov 20

//import applyNav from "rjsf-tabs/lib/applyNav"
//import { GENERIC_NAV } from "rjsf-tabs/lib/utils";
//import { GENERIC_NAV } from "rjsf-tabs/utils";
//import EditorNavs from './EditorNavs'
 //import applyNavs from "react-jsonschema-form-pagination";

import applyNav from "rjsf-tabs/lib/applyNav";
import Collapsible from 'react-collapsible';
 

// import { GENERIC_NAV } from "rjsf-tabs/utils";
//mport CustomNavs from "./CustomNavs";

//import { FormattedMessage } from 'react-intl'; // added nov 16


const submitFormRef = createRef();

// added jan 16  for test

const formRef = createRef();
const onError = (errors) => {
  console.log("OnError , errors=", errors);
 
  //errors = errors[0];
  console.log("OnError  just set errors, errors=", errors);

  //alert(errors[0].message);
}

// added jan 17 for vernose error messages

const ajvOptionsOverrides = {

  //was fakle changed feb 7 late
  strict:false,
  verbose: true,
  useDefaults: true,
  allErrors: true,
    //was false changed feb 7 flase needed descriminator field in one of  ?
  discriminator: true
  

};

const validator = customizeValidator({ ajvOptionsOverrides });

//added march 19
//const Form = withTheme(Theme);


//let FormWithNav = applyNav(Form);
//let FormWithPagination = applyNav(Form);

//import {StyleSheet,Text,SafeAreaView,ScrollView,StatusBar} from 'react-native';

//commented below out aug 8

//import applyNav from "rjsf-tabs/lib/applyNav";
// import { GENERIC_NAV } from "rjsf-tabs/utils";
//mport CustomNavs from "./CustomNavs";


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

//addd oct 25
//let uiSchema = {};

let plugins = { "plugins": [] };
let plugin = "";

let draw = { "draw": "" };
let swiper= { "swiper": "" };
let map = "";
let fileLoaded = false;
let notfirstLoad = true;
let formnotUpdated = true;
let oldSchema = ""
let mapLayersName = ["transport", "hill shade"]; // test of map layers
// let mapLayersName = [];

 // var f = new FileReader();
const file = document.getElementById('file-selector');
file.setAttribute("display", "none");
let formData = new FormData(); // added nov 21
let formSubmitted = false ;
let mapFormChanged = false;
let blob = "";
let result = "";

let uiSchema = "";
let image1 = "";

//a dded nov
let extentSet = false;
let mapExtent = [];
let active_plugin = "";


const Geoviewmapdiv = document.createElement("div");
  
/*
function customValidate(formData, errors) {
 
  console.log("custom validate --- valdiate form",formData);

  if (formData.map.listOfGeoviewLayerConfig[0] !== undefined) {
    if (formData.map.listOfGeoviewLayerConfig[0].listOfLayerEntryConfig[0].style.LineString.settings.stroke.color === null) {
      errors.formData.map.listOfGeoviewLayerConfig[0].listOfLayerEntryConfig[0].style.LineString.settings.stroke.color.addError("Color must not be null");
    }
  }
  else { console.log("listofGeoviewLayercOnfig not define"); }
   console.log("errors type",typeof ( errors)); 
  
  if (errors[0] ) {
    console.log("custom validate -------------------just set error");
    errors = errors[0];
  }
   console.log("custom validate -------------------just set error",errors);
 return errors;
}
*/


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
   
          <Box  style={{background:"white",float : 'left',overflowY:'scroll',display: "flex",
        flexGrow: 1,
        flexDirection:"column",
        maxHeight:"200px"}} >
                 <Collapsible trigger="Geoview Authoring Tool" className="header"> 
           <p>    General Information
              
The Federal Geospatial Platform Authoring (FGPA) tool is used to create, update, validate and preview configuration files used by the Federal Geospatial Platform Viewer (FGPV).
<br></br>
The FGPA tool is based on React. This library generates forms from JSON schemas.
<br></br>
The FGPA tool uses the same schema as the FGPV and lets user modify values to easily create new configuration files. The schema is composed of 5 sections:
Map
            
      <br></br>      
<br></br>

                <br></br> 
              </p>    </Collapsible>
        <Collapsible trigger="Geoview Schema" className="header"> 
           <p>           
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
              </p>
              <p> 
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
        </p> </Collapsible>
                <Collapsible trigger="Tool Bars" className="header">  
                     <p> 
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
        </p> 
                </Collapsible>
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

function App3(onChange,id) {  // added pre maps position nov 21 for extent display test
            //tried to call onchange at first onclick but doesnt work dec 15
 ReactDOM.render(
  <Popup
    trigger={<button className="button" id="pop"> Open Modal </button>}
    modal
    nested
  >
    {close => (
      <div className="modal">
         <button className="close" onClick={() => { close(); onChange({}, id); }}>
          &times;
        </button>Set Extent: zoom and pan to the extent then close the window
        <div className="header"> map </div>
          <div className="content">
            
         <div id="map" ></div><pre class="mapsPosition"></pre>
              < button
            className="button"
            onClick={() => {
              console.log('modal closed ');
               console.log('onChange=',onChange);
        //      this[onChange]({}, id);
         //         onChange({}, id);
        
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

  console.log('in  form submit-------------------------------------------------plugin=', plugin);
  console.log('in  form submit-------------------------------------------------formdata=', formData);
 
  //modified for navSelected may 2
  //commented out sept 26 reemoved navselected to do a deploy

  //added jan 15
 // if (formRef.current.validateForm()) {
 //   alert('in submit Form is valid');
  //} else alert('in Sbumit Form is NOT valid');
 alert('Form is valid');
                      
                     //const submitbutton = document.getElementById("submit").style.background = '#000000'
  document.getElementById("submit").style.backgroundColor = 'green'; 

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
   
    
    //commneted out jan 8
    // window.cgpv.init();   //commented feb 3
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
  } 
  else if ((plugin === "Swiper") && (formData.enable === true)) {
 
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

  //console.log("map[map]=", map["map"]);
  
  blob = new Blob([JSON.stringify({ map})], { type: "text/plain;charset=utf-8" }); // mar 15
 
  //mar 17 commented out
 // blob = new Blob([JSON.stringify({plugins})], { type: "text/plain;charset=utf-8" });
 
  console.log("blob=",blob);

}; //end submit

        

function SchemaForm() {

  function ErrorListTemplate(props) {
  const { errors } = props;
  return (
    <div>
      <h2>Custom error list</h2>
      <ul>
        {errors.map(error => (
            <li key={error.stack}>
              {error.stack}
            </li>
          ))}
      </ul>
    </div>
  );
}
//  if (formRef.current.validateForm()) {
 //   alert('Form is valid');
 // }
 //  else { alert('Form is NOTTTT  valid'); }

  // doesnt  display rest of form only this field until other part of for,

  //const CustomTitleField = (props) => {
  //  const { id, required, name } = props;
  //  return (<div id="custom" class="MuiTypography-root MuiTypography-h5"> {name}</div>); 
  //};

   //  console.log(" 00000000000000000000  in custom field", name);
    //  const legend = required ? title + '*' : title;
    //  console.log(" 0000000000000000000000000000000000000000000000  in custom field",legend);
 
   //returns markrdown below
    //return <div  id="custom" class="MultiTopography-h5"><em>  {title}</em></div>;

    //return <div id="custom"><em> hi hhhhhhhhhhhhhhhhhhhhhhh {title}</em></div>;
  const CustomDescriptionField = ({ id, description }) => {
  //  console.log(" 0000000000000000000000000000000000000000000000  in custom field", description);
    return <div id={id}> Hiiii {description}</div>;
  };
  
  //works changes every descriptpnfield for every section, oct 16, active now
  function DescriptionFieldTemplate(props) { //console.log("------Description ---------------------props")
    const {  description, id } = props;
  //  console.log("------Description ---------------------props,id of element=", id);
   // return (<Tooltip placement="right-start" title={help}
  //   PopperProps={{
   //   popperOptions: {
//modifiers: [
//{
//            
//}
//]
   //   }
  //  }}>
    return ( <header id={id} class="MuiTypography-root MuiTypography-h6">
        <summary></summary>
        {description}
    </header>
 //     </Tooltip >
    );
  }
  //works changes every title field for every section, oct 16, active now
  function TitleFieldTemplate(props) { //console.log("-----Title----------------------props =",props)
    const { id, required, title } = props;
    return (
      <header id={id} class="MuiTypography-root MuiTypography-h5">
        {title}
        {required && <mark></mark>}
      </header>
    );
  }
  //following works but dsplays label in duplicate,maybe becasue is an obeject ?,individual field 
  // dislays the description before the field or widget to enteradn not in duplicate but  
  // <label htmlFor={id}> hi {label}{required ? "*" : null}</label>
    
  function CustomFieldTemplate(props) {
    //        <img src="https://user-images.githubusercontent.com/91547284/153055799-9983e0a0-d090-480c-9aa6-5854d6782c49.png" style={{  float: 'right' }} width="100" height="100" >
    // let image1 = "";
      if(props.label === "Range Slider")
    {
   //  props.description = "The Range/Time Slider offers a dynamic way to visualize time series data as well as non-time series data by “range”. It is also called Time Slider when used for time series visualization. The basic slider is a horizontal bar with anchors that can be moved to establish the range of the values to be used. To visualize data as a dynamic range, any layer that contains a date or numeric fields can be used.";
  //    image1 = "https://github.com/Pewillia/GeoView-Plugins-Config/blob/30-save-formdata-json/images/timeslider.png?raw=true";
    }
    const { id, classNames, label, help,   errors, children } = props;
    console.log("---------------label is =", label);
    
    let desc = "";

  // console.log("---------------custom field template ptops is =", props);
    if (label === "Chart") {
      image1 = "https://github.com/Pewillia/GeoView-Plugins-Config/blob/30-save-formdata-json/images//Chart.png?raw=true";
    }
    else if(label === "Swiper")
    {
      image1 = "https://github.com/Pewillia/GeoView-Plugins-Config/blob/30-save-formdata-json/images/swiper.png?raw=true";
    }
     else if(label === "Range Slider")
    {
       desc = "The Range/Time Slider offers a dynamic way to visualize time series data as well as non-time series data by “range”. It is also called Time Slider when used for time series visualization. The basic slider is a horizontal bar with anchors that can be moved to establish the range of the values to be used. To visualize data as a dynamic range, any layer that contains a date or numeric fields can be used.";
  
  //  description = "The Range/Time Slider offers a dynamic way to visualize time series data as well as non-time series data by “range”. It is also called Time Slider when used for time series visualization. The basic slider is a horizontal bar with anchors that can be moved to establish the range of the values to be used. To visualize data as a dynamic range, any layer that contains a date or numeric fields can be used.";
      image1 = "https://github.com/Pewillia/GeoView-Plugins-Config/blob/30-save-formdata-json/images/timeslider.png?raw=true";
    }
    else if(label === "Thematic Slider")
    {
      image1 = "https://github.com/Pewillia/GeoView-Plugins-Config/blob/30-save-formdata-json/images/thematicslider.png?raw=true";
    }
    else if(label === "Draw")
    {
      console.log("-------------------------------------1111111------------------inside tool bar image");
      image1 = "https://github.com/Pewillia/GeoView-Plugins-Config/blob/30-save-formdata-json/images/drawtoolbar.png?raw=true";
    }

   // let desc = "The Range/Time Slider offers a dynamic way to visualize time series data as well as non-time series data by “range”. It is also called Time Slider when used for time series visualization. The basic slider is a horizontal bar with anchors that can be moved to establish the range of the values to be used. To visualize data as a dynamic range, any layer that contains a date or numeric fields can be used.";
  
   // console.log("just set label=",label,image1);
    return (
      //   <div className={classNames} style={{ color: "red" }}>
      // swiper https://doc.arcgis.com/en/web-appbuilder/latest/create-apps/GUID-6EB589A5-7637-459C-A489-F60FB2AAB181-web.png
    
      //  note if take ou description below and desciption is in uischema the descprition doesnt display twice,otherweise dislays twice
      //          <div className={classNames} style={{ textAlign: 'left' }}>
    
           <div className={classNames} style={{ textAlign: 'left' }}>
      <Tooltip placement="left" title={desc}>
     
        <img src={image1} style={{ float: 'right' }} width="300" height="200" >
        </img> 
   
  
        </Tooltip>
<label htmlFor={id}> </label>
    
        {children}
        {errors}
          {help}
        
      </div>
    );
  }// doesnt displya a limitd line length for colour only a full line or a smal sliver of a line, not a box
   // {props.items.map((element) => element.children)} <Collapsible trigger="Open"></Collapsible>
  function CollapsibleArrayWidget(props) {
  
    console.log("CollapsibleArrayWidget props=",props);
  return (
    <div> 
   
      {props.value}
      {props.canAdd && <button type='button' onClick={props.onAddClick}></button>}
   
    </div>
  );
  }

  const widgets = {CollapsibleArrayWidget};
 


// function CollapsibleArrayTemplate(props) {<h2>Hiiiiiiii</h2>   <Collapsible trigger="Open">   </Collapsible>
  function ArrayFieldTemplate(props) {
    console.log("------ Collapsible field template props=", props);
   const { canAdd, disabled, idSchema, uiSchema, items, onAddClick, readonly, registry, required, schema, title } =
    props;
  const uiOptions = getUiOptions(uiSchema);
  const ArrayFieldDescriptionTemplate = getTemplate(
    'ArrayFieldDescriptionTemplate',
    registry,
    uiOptions
  );
  const ArrayFieldItemTemplate = getTemplate(
    'ArrayFieldItemTemplate',
    registry,
    uiOptions
  );
  const ArrayFieldTitleTemplate = getTemplate(
    'ArrayFieldTitleTemplate',
    registry,
    uiOptions
  );
  // Button templates are not overridden in the uiSchema
  const {
    ButtonTemplates: { AddButton },
  } = registry.templates;
    return (
     <Accordion>
         <AccordionSummary id="panel-header" aria-controls="panel-content">
   {title}
  </AccordionSummary>
  <AccordionDetails>
 
    <Paper elevation={2}>
      <Box p={2}>
        <ArrayFieldTitleTemplate
          idSchema={idSchema}
          title={uiOptions.title || title}
          schema={schema}
          uiSchema={uiSchema}
          required={required}
          registry={registry}
        />
        <ArrayFieldDescriptionTemplate
          idSchema={idSchema}
          description={uiOptions.description || schema.description}
          schema={schema}
          uiSchema={uiSchema}
          registry={registry}
        />
        {items &&
          items.map(({ key, ...itemProps }) => (
            <ArrayFieldItemTemplate key={key} {...itemProps} />
          ))}
        {canAdd && (
          <Grid container justifyContent='flex-end'>
            <Grid item={true}>
              <Box mt={2}>
                <AddButton
                  className='array-item-add'
                  onClick={onAddClick}
                  disabled={disabled || readonly}
                  uiSchema={uiSchema}
                  registry={registry}
                />
              </Box>
            </Grid>
          </Grid>
        )}
      </Box>
          </Paper>
        </AccordionDetails>
        </Accordion>
        
  );
}
 /*  const { className, items, canAdd, onAddClick } = props;
 return (
    <div >
      {props.items &&
        props.items.map((element) => (
          <div key={element.key} className={element.className}>
            <div>{element.children}</div>
            {element.hasMoveDown && (
              <button onClick={element.onReorderClick(element.index, element.index + 1)}>Down</button>
            )}
            {element.hasMoveUp && (
              <button onClick={element.onReorderClick(element.index, element.index - 1)}>Up</button>
            )}
            <button onClick={element.onDropIndexClick(element.index)}>Delete</button>
            <hr />
          </div>
        ))}

      {props.canAdd && (
        <div className='row'>
          <p className='col-xs-3 col-xs-offset-9 array-item-add text-right'>
            <button onClick={props.onAddClick} type='button'>
              Custom +
            </button>
          </p>
        </div>
      )}
    </div>
  );
}  */


  function ColorFieldTemplate(props) {
    //   console.log("---------------label is =", label); ,maxLength:50
  //  <TextField
  //inputProps={{
  //  maxLength: 10,
 // }}
    // /><input aria-invalid="false" id="root_map_listOfGeoviewLayerConfig_0_listOfLayerEntryConfig_0_source_cluster_settings_color"
//    name = "root_map_listOfGeoviewLayerConfig_0_listOfLayerEntryConfig_0_source_cluster_settings_color" placeholder = "" type = "color" class="MuiInputBase-input MuiInput-input" value = "" >
    // <input aria-invalid="false" id="root_map_listOfGeoviewLayerConfig_0_listOfLayerEntryConfig_0_source_cluster_settings_stroke_color" name="root_map_listOfGeoviewLayerConfig_0_listOfLayerEntryConfig_0_source_cluster_settings_stroke_color" 
    //placeholder = "" type = "color" class="MuiInputBase-input MuiInput-input" value = "" >
   // nputProps= {{ maxLength: 1000000 }}
     // <div className={classNames} style={{ maxLength: 50000 }} contentEditable={true} onChange={onChange({}, id) } >
     
    //addded onChange dev 19
    //  const { id, classNames, label, help, required, description, errors, children, onChange } = props; 
    //inputProps = {{ max: 12 }} 
    
     const { id, classNames, help,  description, errors, children } = props;
 // console.log("---------------label adn description is =", label, description);
    return (
      <div className={classNames} style={{ color: "red",maxLength:"10000000" , width: 0}} >
      <label htmlFor={id}></label>
     {description}
      {children}
      {errors}
      {help}
    </div>
    );
  }

  


  //function AddButton(props) {
 //   const { icon, iconType, ...btnProps } = props;
    //   {icon} <FormattedMessage defaultMessage='Add' />
 // return (
 //   <button {...btnProps}>
  //    {icon} Extent
  //  </button> 
 // );
  //}

 // function ExtentButton(props) {
 //   const { icon, iconType, ...btnProps } = props;
    //   {icon} <FormattedMessage defaultMessage='Add' />
 // return (<div>
 //   <button {...btnProps}>
 //     {icon} Extent
 //   </button>Click to add extent using viewer</div>
 // );
 // }

 //function FieldHelpTemplate( props) {
 // const { help, idSchema } = props;
 // const id = helpId(idSchema);
 // return  <aside id={id}>{help}</aside>;
 // }
  
   function ExtentFieldTemplate(props) {
   //    console.log("-------------In extent Field template --------------------",props);
  //  <TextField
  //inputProps={{
  //  maxLength: 10,
 // }}
// />
     // 
   // function  onChange(formData) { Console.log("in onchange local -------------------");
  ////  return (event) => {
  //    this.setState({
   //     [formData]: parseFloat(event.target.value)
   //   }, () => this.props.onChange(this.state));
   // };
   //  };

  //function changeExtent(formDatamm,id) {
  //function changeExtent(props) {
   // const { icon, iconType, ...btnProps } = props;
    //   {icon} <FormattedMessage defaultMessage='Add' />
   // console.log('----------------------in extent  11 changge formdata =',formData);
   //            formData[0] = Math.round(mapExtent[0]);
   //    formData[1] = Math.round(mapExtent[1]);
   //   formData[2] = Math.round(mapExtent[2]); //changed this nov 24
 // formData[3] = Math.round(mapExtent[3]);
    
  //   updateForm(formData);
 // }
     //  <div className={classNames} style={{ color: "red", maxLength: 10 }} >
     
     // commneted out dev 5 for test beacuse etentSet is set turue sometime when it shouldnt
    // extentSet = true;
  
     //    setTimeout(() => { updateForm(formData); console.log("in extent set timeout",); }, 1000); //was 1000}

    const { id, classNames, label, help, description ,errors, children, onChange} = props;
     console.log("---------extent filed template------labeldescription is =", label, description);
          console.log("---------extent filed template------onchange is =", onChange);
   //  let mapExtent = [];
  
   //added dec 4 test of update
   //  setTimeout(() => { updateForm(formData); forceUpdate; console.log("in extentfield templage setring timeout",); }, 10000);//was 1000}
                
// onChange={(event) => props.onChange(event.target.value)}
     return (
       <div className={classNames} style={{ maxLength: 10 }} onChange={(event) => { console.log("on change in extent---------"); props.onChange(event.target.value) }}  >
       <Tooltip
           title="Draw map,extract extents in Geoview" placement="top">
         
      
           <button type="button" variant="contained" onChange={(event) => { console.log("on change in extent---------"); props.onChange(event.target.value) }} color="primary" onClick={() => {
         
             // get reference to window object
             //const w = window;

             // get reference to geoview apis
             //const cgpv = w['cgpv'];

             //const { ui, react, createRoot } = cgpv;
             // get reference to window object
            
             console.log("-------------In extent Field template --------------------", props);
             //props.onChange(({ formData }, id));
             //      props.onChange(formData[0],123);
             //      props.onChange((changeExtent( {formData })));
 
             
             console.log("get extent, desired schema", fileLoaded, "map form  changed", mapFormChanged);
             console.log("get extent, Geoviewmapdiv==", Geoviewmapdiv.innerHTML);
             //    if ( && (notfirstLoad) && (formnotUpdated) && (desiredSchema === "map")) {
             if (((desiredSchema === "map"))) {
               console.log("calling draw map"); //PopUps();

               extentSet = true; // just added here dec 5, was being execute mltple times ?
         
               /**
                * initialize the map after it has been loaded
                */
               //    onChange  => {
               // console.log("onChange");
               // };
               //     onChange = changeExtent(formData);
               /**
                * translations object to inject to the viewer translations
                */
            
               // below comented out dec  4 for test
               //  setTimeout(() => { updateForm(formData); forceUpdate;console.log("in extentfield template seting timeout, formdata=",formData); }, 10000);//was 1000}
      
               console.log("calling cgpv.init"); //PopUps();
               App3(onChange, id);   // commneted nov 21
               //  console.log("calling popip");
               Geoviewmapdiv.innerHTML = "<div  id=\"EVNT1\" class=\"geoview-map\"  data-lang=\"en\"  style=\" height: 100vh;\" data-config=\"{ 'map': {" +

              "'interaction': 'dynamic'," +
              "   'viewSettings': {   " +
              "    'zoom': 4,  " +
              "    'center': [-100,60],  " +
              //            "   'projection': 3978  " +
                              "   'projection': 3857  " +
  //commentd ou below dec 28    to try 3857
    //   "   'projection': 3978  " +
      
              " },    " +
              " 'basemapOptions': {    " +
              "     'basemapId': 'transport'," +
              "      'shaded':  true ," +
              "       'labeled':  true"+
              "  } }, " +
   // " 'components': ['app-bar','nav-bar','overview-map','north-arrow']," +
                " 'components': []," +
    " 'corePackages': []," +
         " 'theme': 'dark'," +
             " 'suportedLanguages': ['en']" +
              " }\" " +
              "> </div>";
            window.openpopup();  // commneted nov 21
            setTimeout(() => {
              const map1 = document.getElementById("map");
              console.log("id of map:=", map1);
              //          console.log("id of basemapid:=", formData2.map.basemapOptions.basemapId);
              // const temp = document.createElement("div");  //changed height from 70 mar 2
              console.log('map div=', Geoviewmapdiv);
              //changed jul 4 for test
             console.log('before calling map init,map1=',map1);
           
              map1.replaceWith(Geoviewmapdiv); // rect error 31
                  
              console.log('before calling map init,map1=',map1);
              window.cgpv.init(() => {
                // commented jan 25    
           // so as not to be undefined otherwise deploy wont work  jan 18
   //     let cgpv = "";
                //               let event = []; // so as not to be undefined otherwise deploy wont work  jan 18
              const mapsPosition = document.getElementsByClassName('mapsPosition');
             
                window.cgpv.api.maps['EVNT1'].addComponent('text', <mapsPosition />);
                window.cgpv.api.maps['EVNT1'].getView().on('change:resolution', (event) => {
                  console.log("zoom changed",event);
                });
          //      console.log('----- map extent is ',cgpv.api.maps['EVNT1'].getView().calculateExtent());
                mapExtent = window.cgpv.api.maps['EVNT1'].getView().calculateExtent();
                window.cgpv.api.event.on(
                 // cgpv.api.eventNames.MAP.EVENT_MAP_MOVE_END,
                 window. cgpv.api.eventNames.MAP.EVENT_MAP_ZOOM_END,
                  (payload) => { 
                    if (window.cgpv.types.cgpv.types.payloadIsALngLat(payload)) {
      
                   console.log('----- map extent 1 is ',window.cgpv.api.maps['EVNT1'].map.getView().calculateExtent());
                  
                   //   map.getView().on('change:resolution', (event) => {
                  //      console.log("zoom changed");
                 //u     });
                        
            //  mapsPosition[0].innerHTML =
                mapsPosition[0].innerHTML = `Map ${payload.handlerName} with latitude ${payload.lnglat[1]} and longitude ${payload.lnglat[0]}`;
            }
          },
          'EVNT1'
                );
                 window.cgpv.api.event.on(
                  window.cgpv.api.eventNames.MAP.EVENT_MAP_MOVE_END,
              
                  (payload) => { 
                    if (window.cgpv.types.cgpv.types.payloadIsALngLat(payload)) {
      
                      //        console.log('----- map extent is 2 ', cgpv.api.maps['EVNT1'].getView().calculateExtent());
                   
                      mapExtent = window.cgpv.api.maps['EVNT1'].getView().calculateExtent();
                      console.log('----- map extent is 2 ', mapExtent);
                      
                 formData[0] = Math.round(mapExtent[0]);
       formData[1] = Math.round(mapExtent[1]);
      formData[2] = Math.round(mapExtent[2]); //changed this nov 24
                      formData[3] = Math.round(mapExtent[3]);
                      
            //            onChange({}, id); 
       //               updateForm(formData);
         //              forceUpdate;
               //       map.getView().on('change:resolution', (event) => {
                //        console.log("zoom changed");    }
            //  mapsPosition[0].innerHTML =
                mapsPosition[0].innerHTML = `Map ${payload.handlerName} with latitude ${payload.lnglat[1]} and longitude ${payload.lnglat[0]}`;
                           }
                     },
                  'EVNT1'
                  );

             });

                 formData[0] = Math.round(mapExtent[0]);
       formData[1] = Math.round(mapExtent[1]);
      formData[2] = Math.round(mapExtent[2]); //changed this nov 24
  formData[3] = Math.round(mapExtent[3]);
              console.log("in ,map extent 1 formdata=", formData);
              //updateForm(formData);
            }, 50);  //commented feb 3
     //       props.onChange(changeExtent);
         //  props.onChange(updateForm(formData));
          } else {
            alert("cant draw map unless map selected, fields changed on map form or file loaded");
          }
            
             // below added dec 5 
         //     formData[0] = Math.round(mapExtent[0]);
      // formData[1] = Math.round(mapExtent[1]);
    //  formData[2] = Math.round(mapExtent[2]); //changed this nov 24
  //formData[3] = Math.round(mapExtent[3]);
 //console.log("in ,map extent formdata=",formData);
           
        
             window.setTimeout(() => {
      //         formData[0] = Math.round(mapExtent[0]);
      // formData[1] = Math.round(mapExtent[1]);
    //  formData[2] = Math.round(mapExtent[2]); //changed this nov 24
         //      formData[3] = Math.round(mapExtent[3]);
              
          //-----------------------------------------------------------------------------------------------     
               // this is hte one that works 00000000000000000000000000000000000000000
            //  onChange({}, id);  // invokes on global change form coodrindate  and array index are stored in fields
       
          //     onChange(({ formData }), id);  // invokes on global change form coodrindate  and array index are stored in fields
                //   onChange(changeExtent({formData},id));


    
           
     //                  formContext[0] = Math.round(mapExtent[0]);
   //    formContext[1] = Math.round(mapExtent[1]);
  ////    formContext[2] = Math.round(mapExtent[2]); //changed this nov 24
//  formContext[3] = Math.round(mapExtent[3]);
               console.log("in ,map extent 2 formdata=",formData);
              //          updateForm(formData); console.log("in extent set timeout",);
         //    updateForm(formData); // caes form fields to be set to 0 or reiitialized
           //  forceUpdate;
      
   //     }, 5000);
          }, 15000);
      
          //   updateForm(formData);
     
           }}>
       Extent
          </button>
            </Tooltip>
      <label htmlFor={id}> Click to create map extent using viewer</label>
     
      {children}
      {errors}
      {help}
    </div>
     );
  }
  
  const fields = {
    //TitleField: CustomTitleField,
    DescriptionField: CustomDescriptionField
   //,  SchemaField: CustomSchemaField
  };

  //
  //const Templates = {
   // TitleField: CustomTitleField,
  //  DescriptionField: CustomDescriptionField,
 //   TitleFieldTemplate1, TitleFieldTemplate,
 //  DescriptionFieldTemplate1:DescriptionFieldTemplate
    //,  SchemaField: TitleFieldTemplate
//  };

//  const  RegistryFieldsType=  {
// TitleField1: CustomTitleField,
////  DescriptionField: CustomDescriptionField
//};
  

  // below works 
  const [newformData, updateForm] = useState(formData);

  //commented out below jan 18 
  //const [newSchema, updateSchema] = useState(uiSchema);


  const [value, setValue] = React.useState('first Nation');

  // load predefinied templates from file
  const handleTemplateChange = (event) => {

        // mar 14 set to loaded to be able to submit
    fileLoaded = false;
    document.getElementById("submit").style.backgroundColor = "rgb(63,81,181)";
    let filename = "";
    setValue(event.target.value);
    console.log("MMMmap template event=", event.target.value);
    if (event.target.value === "Weather current") {
      filename = "weather_current_condition_ogmwms.json";
    }
    else if(event.target.value === "Flood Historical") {
    //   filename = "energy.json";
           filename = "floodhistorical-esridynamic.json";

    }
    else if(event.target.value === "xyzTile") { 
    filename = "esri-xyztiles.json";
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
      mapFormChanged = true;

      // mar 14 set to loaded to be able to submit
      fileLoaded = true;


      
            mapFormChanged = true;

       //     if (formData.map.listOfGeoviewLayerConfig[0].listOfLayerEntryConfig[0].source !== undefined) {
         //     console.log("ooooooonchange ----------  just deleted strategy and transparent key");
        //      delete formData.map.listOfGeoviewLayerConfig[0].listOfLayerEntryConfig[0].source.strategy;
        //      delete formData.map.listOfGeoviewLayerConfig[0].listOfLayerEntryConfig[0].source.transparent;
       //     }

  
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
                        console.log("in for 2 4 loop=",formData.map.listOfGeoviewLayerConfig[i1].geoviewLayerName.en);
          
                        console.log("in for 2 5 loop=", typeof formData.map.listOfGeoviewLayerConfig[i1].geoviewLayerName.en);
                  
                        //re aded feb 21
                        //commented out aug 9 for test, code works
                        let result = formData.map.listOfGeoviewLayerConfig[i1].geoviewLayerName.en.replace(/ /g, "_");
                        console.log("result =", result);
                        //re aded feb 21
                        //commented out aug 9 for test, code works
                                      formData.map.listOfGeoviewLayerConfig[i1].geoviewLayerName.en = result;
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
               console.log("before stringify ------  ---  formdata", formData);
           const m = JSON.stringify(formData);
                 m.replace("&quot;", '"');
             console.log("after stringify ------  ---  m=", m);
           //below orig, set Geoviewmapid to map  form data
            Geoviewmapdiv.innerHTML = "<div id=\"mapTwo\"class=\"geoview-map\" data-lang=\"en\" style=\" height: 90vh;\" data-config=" + m+
              "> </div>";
            //addedd jan 26
          //  console.log("after stringify Geoviewmapdiv=", Geoviewmapdiv.innerHTML);
       
            // commented jan 25 
            let m2 = Geoviewmapdiv.innerHTML.replace(/&quot;/g, '\'');
            //addedd jan 26
            /// 
       //     console.log("after stringify ------  ---  m2=", m2);
          
            // commented jan 25 
            Geoviewmapdiv.innerHTML = m2;
      //      console.log("after stringify Geoviewmapdiv=", Geoviewmapdiv.innerHTML);
      //    }

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

//  if ((desiredSchema === "map") && (typeof id !== "undefined")) {
   //         plugin = "map";//done for submit
            //added jan 19 test to trun o live validate and sue it after first submit
          //  let liveValidate = false;

            mapFormChanged = true;

       //     if (formData.map.listOfGeoviewLayerConfig[0].listOfLayerEntryConfig[0].source !== undefined) {
         //     console.log("ooooooonchange ----------  just deleted strategy and transparent key");
        //      delete formData.map.listOfGeoviewLayerConfig[0].listOfLayerEntryConfig[0].source.strategy;
        //      delete formData.map.listOfGeoviewLayerConfig[0].listOfLayerEntryConfig[0].source.transparent;
       //     }

  
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
                        console.log("in for 2 4 loop=",formData.map.listOfGeoviewLayerConfig[i1].geoviewLayerName.en);
          
                        console.log("in for 2 5 loop=", typeof formData.map.listOfGeoviewLayerConfig[i1].geoviewLayerName.en);
                  
                        //re aded feb 21
                        //commented out aug 9 for test, code works
                        let result = formData.map.listOfGeoviewLayerConfig[i1].geoviewLayerName.en.replace(/ /g, "_");
                        console.log("result =", result);
                        //re aded feb 21
                        //commented out aug 9 for test, code works
                                      formData.map.listOfGeoviewLayerConfig[i1].geoviewLayerName.en = result;
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
               console.log("before stringify ------  ---  formdata", formData);
           const m = JSON.stringify(formData);
                 m.replace("&quot;", '"');
             console.log("after stringify ------  ---  m=", m);
           //below orig, set Geoviewmapid to map  form data
            Geoviewmapdiv.innerHTML = "<div id=\"mapTwo\"class=\"geoview-map\" data-lang=\"en\" style=\" height: 90vh;\" data-config=" + m+
              "> </div>";
            //addedd jan 26
          //  console.log("after stringify Geoviewmapdiv=", Geoviewmapdiv.innerHTML);
       
            // commented jan 25 
            let m2 = Geoviewmapdiv.innerHTML.replace(/&quot;/g, '\'');
            //addedd jan 26
            /// 
       //     console.log("after stringify ------  ---  m2=", m2);
          
            // commented jan 25 
            Geoviewmapdiv.innerHTML = m2;
      //      console.log("after stringify Geoviewmapdiv=", Geoviewmapdiv.innerHTML);
      //    }


























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
  function transformErrors(errors, uiSchema) {
   
   
    //  commented out for deploy feb2
   // let firsterror = true;
   // let firstproperty = "";
    console.log(uiSchema);
  //  console.log(uiSchema);
    
    //errors.sort(errors.property);
    errors.sort((a,b) => (a.property > b.property) ? 1 : ((b.property > a.property) ? -1 : 0))
//objs.sort((a,b) => (a.last_nom > b.last_nom) ? 1 : ((b.last_nom > a.last_nom) ? -1 : 0))

  //   console.log("in transform error sorted errors=",errors);
  
    return errors.map((error) => {
     /* 
        console.log("in transform error firsterror=",firsterror,"   firstproperty=",firstproperty);
      if ((error.message === "must be equal to one of the allowed values") || (error.message === "must be equal to constant")
    //  ||(error.message === "must NOT have fewer than 1 properties")||(error.message === "must match exactly one schema in oneOf")
    ) {
        error.message = "";
      }
      else if ((error.message.includes("must have required property"))  && (firsterror)) 
      {
        console.log("transform error ---- first error");
   
        firsterror = false;
        firstproperty = error.property;
      }
      else if ((error.message.includes("must have required property")) && (error.property === firstproperty) && (!firsterror))
      {
        console.log("transform error ---- 2nd error");
       error.message = "";
      }
      else if ((error.message.includes("must have required property")) && (error.property !== firstproperty )&& (!firsterror))
      {
        firsterror = true;
        firstproperty = "";
        console.log("transform error ---new  error");
        
      }
      console.log("transform error ---last  error=", error);
      */
    return error;
  });
  }
  
  //let transformErrors = (errors) => {
   // console.log("------------------------ -------- in transform errors",errors);
   // var e = [];
   // errors.map(error => {
//    if (error.message === "must be equal to one of the allowed values") {
   //         error.message = "";
    
   //     e.push(error);
   //     console.log("just pushed error", e);
   //   }

    //  else if (error.message === "should be number") {
    //    error.message = "devrait etre numero";
     //   e.push(error)
     // }
   // });
    // console.log(e);
  //  return e;
 // };

  useEffect(() => {  // just uncommented following 2 line monday jan 23
    /// updateForm(formData);
    forceUpdate;
    console.log("here is the use   Effect----------------------------------", newformData);
  }, []);
  

  let dataObject = location.state.data;
  console.log('data object-', dataObject);
  
  let jsonObject = JSON.stringify(dataObject);
  let schemaData = JSON.parse(jsonObject);
 
  console.log('form dagta-'); // all data inisde plugin ?

  //just commnetd ou jan 23 for test
  const desiredSchema = location.state.desiredPlugin;



 
  
  

//let FormWithPagination = applyNav(Form);
  
  if (desiredSchema === "Range Slider") {
 
    uiSchema = { //"ui:rootFieldId": "chart",
      ////  'ui:globalOptions': { copyable: true },
      //    'ui:rootFieldId': 'myform', // ..just a test
      //'ui:classNames': 'custom-css-class',
      //   "ui:classNames": "bold-title",

      //   "ui:widget": (props) => {
      //   return (
      //     <input type="text"
      //      className="custom"
      //      value={props.value}
      //      required={props.required}
      //     onChange={(event) => props.onChange(event.target.value)} />
      // );
      // },
      "navConf": {
        "order": [
          "rangeSlider",
        
    
        ]
      }, "rangeSlider": {
        "nav": [" rangeSlider"],
      },
      //
      "ui:FieldTemplate": CustomFieldTemplate,
      //   "ui:description": "The Range/Time Slider offers a dynamic way to visualize time series data as well as non-time series data by “range”. It is also called Time Slider when used for time series visualization. The basic slider is a horizontal bar with anchors that can be moved to establish the range of the values to be used. To visualize data as a dynamic range, any layer that contains a date or numeric fields can be used.",
    
      // "ui:enableMarkdownInDescription": true,
      //      "ui:enableMarkdownInDescription": true,
      //   "ui:widget": "select", //works,]
      //       'ui:style': { color: 'blue' },
      enable: {
        "ui:enableMarkdownInDescription": true,
        //   "ui:widget": "select", //works,]
        //       'ui:style': { color: 'blue' },
        //  "ui:description": "MThe Range/Time Slider offers a dynamic way to visualize time series data as well as non-time series data by “range”. It is also called Time Slider when used for time series visualization. The basic slider is a horizontal bar with anchors that can be moved to establish the range of the values to be used. To visualize data as a dynamic range, any layer that contains a date or numeric fields can be used. Once the range properties for the dataset are defined, an interactive, on-screen slider is rendered (Figure 14), which can be used to explore the data through a range/time in a customized manner. Using this plugin, the end-user can control the animation of the data with buttons to play and pause, go to the previous range/time, or go to the next range/time.",
        //       "ui:CustomTitleField": "**RangeSlider**",
        //     "ui:title": "##RangeSlidersssss##"
      },
      controls: {
        //  "ui:FieldTemplate": CustomFieldTemplate,
        "ui:enableMarkdownInDescription": true,
        //      'ui:style': { color: 'blue' },
        ///   "ui:description": "Make text **bold** or *italic*. Take a look at other options ![](https://upload.wikimedia.org/wikipedia/commons/5/56/Tiger.50.jpg).",   
      },
      params: {
        type: {
          //        "ui:FieldTemplate": ColorFieldTemplate,
          //    'ui:style': { color: 'blue' },
      
          //"ui:FieldTemplate": CustomFieldTemplate,
          //   "ui:enableMarkdownInDescription": true,
          //    "ui:description": "##ooooo basemapOptions oooo",
          //      "ui:title": "Rangy  basemapOptions oooo",
        }
      },
      rangeType: {
        //  "ui:FieldTemplate": CustomFieldTemplate,
        //     "ui:title": "##RangeSlider bbbb##"
      }
    }
  }
  else if (desiredSchema === "map") {
    //  "map": { // uust reconizes what displayed in for for uischema no more
    uiSchema = {
      "navConf": {
        "order": [
          "map",
          "extra_Options",
          "footer_nav_Bar",
          "external_Packages"
    
        ]
      },
      //   "navConf": {
      //    order: ["main", "map", "extraOptions", "appBar", "externalPackages", "draw"]
      //   },
   
     
      //  below works lits basemaptions

      //comment out feb26
      // "map": {
      //      "nav": ["Geoview","map"]
      //   },
      // below works  , just commented for a test
    
     
     
     
     
      "footerBar": {
        "nav": [" footer_Nav_Bar"],
      },
      "navBar": {
        "nav": [" footer_Nav_Bar"],
     
      },
      "components": {
        "nav": [" footer_Nav_Bar"],
     
      },
      "corePackages": {
        "nav": [" footer_Nav_Bar"],
   
      },
       
      "externalPackages": {
        "nav": [" external_Packages_Urls"],
      
      },
      "serviceUrls": {
        "nav": [" external_Packages_Urls"],
    
      },
      "suportedLanguages": {
        "nav": [" extra_Options"],
     
      },
      "schemaVersionUsed": {
        "nav": [" extra_Options"],
    
      },
      "theme": {
        "nav": [" extra_Options"]
      },
    
      "map":
      {
        "nav": "map",
        
        navConf: {
          navs: [
            {
              nav: "main",
              name: "User",
              icon: "glyphicons glyphicons-users"
            }
          ]
        },
      
        //  "classNames": "col-md-12",

        //following works
        "ui:FieldTemplate": CustomFieldTemplate,
      
        // below doesn't work unless adn objet field
        "ui:enableMarkdownInDescription": true,
        //doesnt wpdate range slider or chart with uischem only map
        viewSettings: {
          "nav": ["map", "viewSetting"],
     
          // below works column
          //  "classNames": "column",
    
          //      ui: options': {
          //   expandable: true,
          extent: {
            "nav": ["map", "viewSetting"],  //"ui:help": "Please select extent by clicking on extent button",
       
     
            "ui:FieldTemplate": ExtentFieldTemplate,
            //       "ui:style": {
            //    "color": "red",
            // },
        
          }
        },
   
        basemapOptions:
        {
          basemapId: {
            "ui:classNames": "bold-title",
            //  "ui:DescriptionField": "*basemap 22 Options*",
            "ui:enableMarkdownInDescription": true,
            //       "ui:TitleField": "**basemapOptions**",
            //      "ui:TitleField": "**basemapOptions**",
            //   "ui:TitleField": "input[type=color]",
            //below works
            "ui:widget": "select",//works
      
            //     "ui:description": "**_basemapOptions_**",
            //    "ui:style": { color: "blue", backgroundColor: "blue" }
          },
          shaded: {
            "ui:classNames": "bold-title",
            //"ui:style": { color: "blue" , backgroundColor: "blue" },
            "ui:widget": "select",//works
            //     "ui:widget":"input[type=color]",
            //     "ui:widget":"input[type=color]",
      
          },
          labeled: {
            "ui:style": { color: "blue" },
            "ui:classNames": "bold-title",
            //  "ui:widget": "select" //works
          }
        },
     
        listOfGeoviewLayerConfig:
        
        {
        //  'ui:widget': 'CollapsibleArrayWidget',
        //  "ui:ArrayFieldTemplate": "ArrayFieldTemplate", //works but for all arrrays
          
          items: {// works with items here
        
            geoviewLayerName: {
              en: { // works color picker appear
                //   "ui:widget": "color"
                "ui:classNames": "bold-title"
              }
            },
            geoviewLayerId: {
              "ui:classNames": "bold-title",
              en: { // works color picker appear
                //   "ui:widget": "color"
                "ui:classNames": "bold-title",
                //   classNames: "style={fontWeight:\"bold\"}"
              }
            },
            metadataAccessPath: {
              en: {
              
                "ui:autocomplete": "on",
                "ui:placeholder": "http://"// doesnt work even if don't use defintion
                // , // doesnt work cecause uses definition ? works if store definition in schema and use uri format
                , "ui:format": "uri"
              },
              fr: {
                "ui:autocomplete": "on",
                "ui:placeholder": "http://",
                "ui:format": "uri"
                // "ui:format": "uri",         
              }
            },

            listOfLayerEntryConfig:
            {
            //  "ui:FieldTemplate": "CollapsibleArrayTemplate",
             
             
              items: { 
                style: {
                  LineString:
                  {
                    settings: {
                      stroke: {
                        color: {
                          //"ui:FieldTemplate": "ColorFieldTemplate",
                          "ui:widget": "color", "ui:style": { "width": 100 }, "ui:help": "Please click to select a color"
                        }
                      }
                    }

                  },
                  Point:
                  {
                    settings: {
                      stroke: {
                        color: { "ui:widget": "color", "ui:style": { "width": 100 }, "ui:help": "Please click to select a color" }
                      }
                    }
 
                  },
                  Polygon:
                  {
                    settings: {
                      stroke: {
                        color: { "ui:widget": "color", "ui:style": { "width": 100 }, "ui:help": "Please click to select a color" }
                      }
                    }

                  }
                  
                }, settings: { color: { "ui:widget": "color", "ui:style": { "width": 100 }, maxLength: 1, "ui:help": "Please click to select a color" } },
                source: {
                  style: {
                    LineString:
                    {
                      settings: {
                        stroke: {
                          color: { "ui:widget": "color", "ui:style": { "width": 100 }, "ui:help": "Please click to select a color" }
                        }
                      }

                    },
                    Point:
                    {
                      settings: {
                        stroke: {
                          color: { "ui:widget": "color", "ui:style": { "width": 100 }, "ui:help": "Please click to select a color" }
                        }
                      }

                    },
                    Polygon:
                    {
                      settings: {
                        stroke: {
                          color: { "ui:widget": "color", "ui:style": { "width": 100 }, "ui:help": "Please click to select a color" }
                        }
                      }

                    }
                  },
                  cluster: {
                    textColor: {
                      "ui:widget": "color", "ui:style": { "width": 100 }, "ui:help": "Please click to select a col"
                    },
                    settings: {
                      //           color: { "ui:FieldTemplate":"ColorFieldTemplate", "ui:widget": "color","ui:help": "Please 222 click to select a color" },
                      color: { "ui:widget": "color", "ui:style": { "width": 100 }, "ui:help": "Please click to select a color" },
                      stroke: { color: { "ui:widget": "color", "ui:style": { "width": 100 }, "ui:help": "Please ick to select a color" } }
                    }
                  }
                }
              }//irems
            }
          }
        }  //listOfGeoviewLayerConf
        // } //map1
        ,
        externalPackages:
        {
          items: {  // works with items here
            name: {
              "ui:enableMarkdownInDescription": true,
              //    "ui:description": "Make text **bold** or *italic*. Take a look at other options [here](https://probablyup.com/markdown-to-jsx/).",
 
            },
            configUrl: {
               
              //   "ui:format": "uri",
              "ui:placeholder": "http://",  //doesnt work
              "ui:autocomplete": "on",
              //    "ui:help": "Hint: enter a good proxy",
              //     "ui:format": "uri"  //doesnt work must be in schema
            }
          }
        },
       
       
        //   },
        serviceUrls: {
          //     keys: { "ui:autocomplete": "on",
          //       "ui:placeholder": "http://",  // format:uri does work in uiSchem must be in schema file
          //   "ui:autocomplete": "on",
          //       },
          geolocator: {
            "ui:format": "uri", // must be in schema for work
            "ui:autocomplete": "on",
            "ui:placeholder": "http://",
            //     "ui:autocomplete": "on"
          },
          proxyUrl: {
            //     "ui:format": "uri",
            "ui:autocomplete": "on",
            "ui:placeholder": "http://",
     
            //   "ui:autocomplete": "on"
            //       'ui:help': 'Hint: enter a good proxy'
          },
        }
      }
    }
  } else if (desiredSchema === "chart") {
  console.log("set tab to chart");
    uiSchema = {
    
      "chart": {
        "nav": ["Chart"],
      },
        
      "ui:FieldTemplate": CustomFieldTemplate,
      enable1: {
        //ma2p
        "ui:enableMarkdownInDescription": true,
        "ui:description": "<img src=\"https://user-images.githubusercontent.com/91547284/153055799-9983e0a0-d090-480c-9aa6-5854d6782c49.png\"  width=\"100\" height=\"100\">",
 
        //  "ui:description": "Make text **bold** or *italic*.  ![](https://upload.wikimedia.org/wikipedia/commons/5/56/Tiger.50.jpg)" ,
        //    "ui:DescriptionField": "<img src=\"https://www.chartjs.org/docs/latest/assets/img/preview.0cc909a8.png\" style=\"width: 200px; height: 200px; \" >",
        //       ![Alt text](https://www.chartjs.org/docs/latest/assets/img/preview.0cc909a8.png)",
   
        //![Alt text](https://assets.digitalocean.com/articles/alligator/boo.svg "a title")
      
      },
      enable: {
        //   "ui:FieldTemplate": CustomFieldTemplate,
        //       "ui:enableMarkdownInDescription": true,
        // "ui:description":"Make text **bold** or *italic*.  ![](https://user-images.githubusercontent.com/91547284/153055799-9983e0a0-d090-480c-9aa6-5854d6782c49.png))" ,
        //  "ui:description":"<img src=\"https://user-images.githubusercontent.com/91547284/153055799-9983e0a0-d090-480c-9aa6-5854d6782c49.png\"  width=\"200\" height=\"200\">" ,
        //"ui:enableMarkdownInDescription": true,
        //    "ui:description":"<img src=\"https://user-images.githubusercontent.com/91547284/153055799-9983e0a0-d090-480c-9aa6-5854d6782c49.png\"  width=\"100\" height=\"100\">" ,
 
        //   "ui:DescriptionField": "![Alt text](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXltVeuGCL8Y9Tnez5JGUr4_GcUhCvVfWjRQ&usqp=CAU)",
   
        //![Alt text](https://assets.digitalocean.com/articles/alligator/boo.svg "a title")
        //   "ui:title": "##RangeSlidersssss##",
        //  "ui:widget": "select",
        //   "ui:style": {  color: "blue", backgroundColor: "blue"}
      
        //   "ui:help": "click to open color picker"
      },
      labelsPie: {
        // "ui:style": { color: "blue", backgroundColor: "blue" }
        
        //  "ui:help": "click to open color picker",
        //  "ui:DescriptionField": "*basemap 22 Options*",
   
      },
      options: {  // commented  out cuz hav to enter multiple color codes
        //          colors: { "ui:widget": "color","ui:style": { "width": 100 }, "ui:help": "Click to select color" }
      }
    }
  } else if (desiredSchema === "Draw Toolbar") {
 
    uiSchema = {
      "draw": {
        "nav": [" Draw Toolbar"]
      },
      "ui:FieldTemplate": CustomFieldTemplate,
     
      "enable": {
        // "ui:enableMarkdownInDescription": true,
        // "ui:DescriptionField": "*basemap 22 Options*",
        // "ui:title": "##RangeSlidersssss##",
        //  "ui:widget": "select",
        //  "ui:style": {
        //   "color": "white",
        //   "backgroundColor": "blue"
        //  },
        //  "ui:help": "click to open color picker"
      },
      open: {
        "ui:enableMarkdownInDescription": true,
        // "ui:DescriptionField": "*basemap 22 Options*",
        // "ui:title": "##RangeSlidersssss##",
        //  "ui:widget": "select",
        //   "ui:style": {
        //     "color": "blue",
        //     "backgroundColor": "blue"
        //   },
        // "ui:help": "click to open color picker"
      },
      tools: {
        //   "ui:DescriptionField": "*basemap 22 Options*",
        "ui:enableMarkdownInDescription": true,
        //  "ui:style": {
        //    "color": "blue",
        //    "backgroundColor": "blue"
        //  },
        //   "ui:help": "click to open color picker"
      }
  
  
    }
  }
  else if (desiredSchema === "Swiper") {
 console.log("set tab to swiper");
    uiSchema = {
      "swiper": {
        "nav": ["Swiper"]
      }
    }
  }
  else if (desiredSchema === "Thematic Slider") {
 console.log("set tab to thematic slider");
    uiSchema = {
      "thematicSlider": {
        "nav": ["Thematic Slider"]
      }
    }
  }

 


console.log( "=============================================map extent===", mapExtent);

 
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
       console.log("in chart ");
   
    schemaData = schemaData[0].chart;
    if ((fileLoaded) && (formnotUpdated)) {
          console.log("in chart2 ");
      formnotUpdated = false;
      //   formData = JSON.parse(blob);
      formData = plugins;
      formData = formData.plugins.chart;// works yes jan 31,react limits number of render s need timeout
      console.log("just tried to change to chart form data=", formData, (typeof formData));
      setTimeout(() => { updateForm(formData); console.log("in swiper set timeout",); }, 50);//was 1000}
    } else if (formnotUpdated) {
      console.log(" setting chart enumm dataObject=", dataObject);
     
      console.log(" setting chart sliderenumm dataObject array type=", typeof dataObject);
     // console.log(" setting  chart slider dataObject array=", dataObject["0"].chart.properties.layers.items.properties.id);
      //below wrks
     // dataObject["0"].chart.properties.layers.items.properties.id = ({ "enum": mapLayersName, "default": mapLayersName[0] });
     // console.log(" setting  chart slider dataObject array=", dataObject["0"].chart.properties.layers.items.properties.id);
      //  formData.layers.push({ "enum": mapLayersName });.layers.push({ "enum": mapLayersName });
      setTimeout(() => { updateForm(formData); console.log("in chart set timeout",); }, 50);//was 1000}
    }
    
  } else if (desiredSchema === "languages") {
    schemaData = schemaData[0].languages;
  } else if (desiredSchema === "version") {
    schemaData = schemaData[0].version;
  } else if (desiredSchema === "Ui") {
    schemaData = schemaData[0].Ui;
  } else if (desiredSchema === "map") {
  //  console.log('schma map-', schemaData[0].map);
   // schemaData = schemaData[0].map;
    if ((fileLoaded) && (notfirstLoad) && (formnotUpdated)) {
      
      formData = plugins;
      //   formData = JSON.parse(blob); // mar 16
      formnotUpdated = false;
      //  schemaData = schemaData[0].map;
      formData = formData.plugins;// works yes jan 31,react limits number of render s need timeout
     // formData = formData.plugins.map;// works yes jan 31,react limits number of render s need timeout
      console.log("just tried to change  map to form form data=", formData);
      setTimeout(() => { updateForm(formData); console.log("in map set timeout",); }, 50);//was 1000
    }
    console.log("=============================================map extent===", mapExtent);
   //   schemaData = schemaData[0].map;
if (extentSet) { 
      console.log('setting extent main====================================================');
  console.log('form extents===================map extent-', Math.round(mapExtent[0]));
  // console.log('form extents=================== form extent=', formData);

   console.log('form extents=================== form extent=', dataObject["0"].map);

  console.log('form extents=================== form extent=', dataObject["0"].map.properties.map);
  //formData.map.pviewSettings.extent[0] = mapExtent[0];
  //    dataObject["0"].map.viewSettings.extent[1] = mapExtent[1];
   //   dataObject["0"].map.viewSettings.extent[2] = mapExtent[2];
   //   dataObject["0"].map.viewSettings.extent[3] = mapExtent[3];
    //  extentSet = false;
    //   setTimeout(() => { updateForm(formData); console.log("in map set timeout",); }, 50);//was 1000
    }
    schemaData = schemaData[0].map;
  } else if (desiredSchema === "Services") {
    schemaData = schemaData[0].Services;
  } else if (desiredSchema === "Swiper") {
        console.log("in swiper");
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
            console.log("in thematic slider");
    schemaData = schemaData[0].thematicSlider;
    console.log("just tried to change to thematic slider form data=", formData, (typeof formData));
  
    if ((fileLoaded) && (formnotUpdated)) {
      formnotUpdated = false;
      formData = plugins;
      //  formData = JSON.parse(blob);
      formData = formData.plugins.thematicSlider;// works yes jan 31,react limits number of render s need timeout
      console.log("just tried to change to thematic slider form data=", formData, (typeof formData));
      setTimeout(() => { updateForm(formData); console.log("in thmatic slider set timeout",); }, 50);//was 1000}
    } else if (formnotUpdated) {
      console.log(" setting thematic enumm dataObject=", dataObject);
     
    //  console.log(" setting thematic enumm dataObject array type=", typeof dataObject);
   //   console.log(" setting thmatic enumm dataObject array=", dataObject["0"].thematicSlider.properties.layers);
      //below wrks
    //  console.log(" setting thmatic slider enumm dataObject array=", dataObject["0"].thematicSlider.properties.layers.items.properties.id);
    
     // dataObject["0"].thematicSlider.properties.layers.items.properties.id = ({ "enum": mapLayersName, "default": mapLayersName[0] });
     
    }
  }
  oldSchema = desiredSchema;
  if (fileLoaded)
    notfirstLoad = true;
  
  
  console.log('just updated schema form in main');
  
  // commented out aug 8 becasue of material ui form problem

  
  //reactjsonschempagination below to see code generate
   //let FormWithNav = applyNavs(Form);
 
  //let FormWithPagination = applyNav(Form, EditorNavs);
 // let FormWithNav = applyNav(Form, CustomNavs);
  //function EditorNavs({ navs: { links }, onNavChange }) { };
  
  //function removeControlLabel() { };
  
   //let FormWithNav = applyNav(Form, EditorNavs,removeControlLabel());
    let FormWithNav = applyNav(Form);
 console.log('after applynav -----------------------------------');
 
  if (desiredSchema === "map") {
    console.log("id 1 of formdata=", formData);
 
  }
   // let e = 1; 
  return (
  
    //below works withhorizzontal tabs
     // <FormWithPagination schema={schemaData} uiSchema={uiSchema} onSubmit={onSubmit} showErrorList={false} validator={validator}
   //jan 24 removed custom validate, caused prpbem with switching list oflayerentryconfig
    <div row className="Schema-Form" style={{ flexDirection: "row" }}>
 
      <FormWithNav  schema={schemaData} uiSchema={uiSchema} onSubmit={onSubmit}
  fields={fields} templates={{TitleFieldTemplate,DescriptionFieldTemplate,CustomFieldTemplate,ColorFieldTemplate,ErrorListTemplate,ArrayFieldTemplate}}  showErrorList={false} validator={validator}

       //below works context in formData only here otherwise no acccess to attributes
        
        onChange={({ formData }, id) => {
          console.log("onChange, desired schema=", desiredSchema);
          console.log("onChange, formdata=", formData);
          //        console.log(" onChange uischema -----", uiSchema);
          if ((desiredSchema === "map")) {
            mapFormChanged = true;
          }
        //    console.log("onChange, props=", props);
      
          if (desiredSchema === "map"){
            console.log("=============================================map extent===", extentSet, Math.round(mapExtent[0]));
            // must call on change twice in order to update the form
          }
if ((desiredSchema === "map")&&(extentSet)) { 
      console.log('setting extent in on change====================================================');
       formData.map.viewSettings.extent[0] = Math.round(mapExtent[0]);
     formData.map.viewSettings.extent[1] = Math.round(mapExtent[1]);
      formData.map.viewSettings.extent[2] = Math.round(mapExtent[2]); //changed this nov 24
  formData.map.viewSettings.extent[3] = Math.round(mapExtent[3]);
  var covert = [];

  formData.map.viewSettings.extent=covert.concat(Math.round(mapExtent[0]),Math.round(mapExtent[1]),Math.round(mapExtent[2]),Math.round(mapExtent[3]));
 // var covert = [];
  //formData.map.viewSettings.extent = covert.concat(mapExtent[3]);
 //  covert = Object.keys(formData.map.viewSettings.extent).map(function(key)
//{
//    return [(formData.map.viewSettings.extent[key])];
    
 // });
//  var covert = [];
 // covert = Object.keys(formData.map.viewSettings.extent).map((key) => { covert.push[formData.map.viewSettings.extent[key]] });
  console.log('form  extents===================values-', covert);
 
  //console.log('form extents===================values-', formData.map.viewSettings.extent.values(1));
    //  formData.map.viewSettings.extent[0] = 1;
   //    formData.map.viewSettings.extent[1] = 2;
   //   formData.map.viewSettings.extent[2] = 3; //changed this nov 24
 /// formData.map.viewSettings.extent[3] = 4;
 // formData.map.viewSettings.extent = [1, 2, 3, 4];
   console.log('form extents===================map extent-', mapExtent[0]);
 
  console.log('form extents=================== frm extent=', formData.map.viewSettings.extent[0]);
  console.log('form extents=================== frm extent=', formData.map.viewSettings.extent);
    console.log("form extents type",typeof formData.map.viewSettings.extent);
  console.log("form extents type", formData.map.viewSettings.extent.length);
 
  extentSet = false;
  updateForm(formData); // updagtes after 2nd form change
     forceUpdate;
   //  window.setTimeout(() => { updateForm(formData); console.log("in on change -------   update extent  1----------------------------",); }, 0);//was 1000
    }

          if ((desiredSchema === "map") && (typeof id !== "undefined")) {
            plugin = "map";//done for submit
            //added jan 19 test to trun o live validate and sue it after first submit
          //  let liveValidate = false;
  mapFormChanged = true;
          

       //     if (formData.map.listOfGeoviewLayerConfig[0].listOfLayerEntryConfig[0].source !== undefined) {
         //     console.log("ooooooonchange ----------  just deleted strategy and transparent key");
        //      delete formData.map.listOfGeoviewLayerConfig[0].listOfLayerEntryConfig[0].source.strategy;
        //      delete formData.map.listOfGeoviewLayerConfig[0].listOfLayerEntryConfig[0].source.transparent;
       //     }

  
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
                        console.log("in for 2 4 loop=",formData.map.listOfGeoviewLayerConfig[i1].geoviewLayerName.en);
          
                        console.log("in for 2 5 loop=", typeof formData.map.listOfGeoviewLayerConfig[i1].geoviewLayerName.en);
                  
                        //re aded feb 21
                        //commented out aug 9 for test, code works
                        let result = formData.map.listOfGeoviewLayerConfig[i1].geoviewLayerName.en.replace(/ /g, "_");
                        console.log("result =", result);
                        //re aded feb 21
                        //commented out aug 9 for test, code works
                                      formData.map.listOfGeoviewLayerConfig[i1].geoviewLayerName.en = result;
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
               console.log("before stringify ------  ---  formdata", formData);
           const m = JSON.stringify(formData);
                 m.replace("&quot;", '"');
             console.log("after stringify ------  ---  m=", m);
           //below orig, set Geoviewmapid to map  form data
            Geoviewmapdiv.innerHTML = "<div id=\"mapTwo\"class=\"geoview-map\" data-lang=\"en\" style=\" height: 90vh;\" data-config=" + m+
              "> </div>";
            //addedd jan 26
          //  console.log("after stringify Geoviewmapdiv=", Geoviewmapdiv.innerHTML);
       
            // commented jan 25 
            let m2 = Geoviewmapdiv.innerHTML.replace(/&quot;/g, '\'');
            //addedd jan 26
            /// 
       //     console.log("after stringify ------  ---  m2=", m2);
          
            // commented jan 25 
            Geoviewmapdiv.innerHTML = m2;
      //      console.log("after stringify Geoviewmapdiv=", Geoviewmapdiv.innerHTML);
          }

           console.log("end on change------  --- "); 
          // jan 8 took out live validate getting error and form not submitting
          //   }} transformErrors={transformErrors} formData={newformData} formContext={formData}  >
 // added OmitEstradata  and liveOmit jfeb 20 to try and remove emply arrays from appearing in jsonexperimental_defaultFormStateBehavior={{emptyObjectFields : "populateRequiredDefaults"}}
    //experimental_defaultFormStateBehavior={{emptyObjectFields : "populateRequiredDefaults"}} this does not display center filed of viewsettings but is a required field
        }} transformErrors={transformErrors} widgets={widgets} formData={newformData} onError={onError} experimental_defaultFormStateBehavior={{ emptyObjectFields: "populateRequiredDefaults"}}formContext={formData} ref={formRef} liveValidate >
         
        <ButtonGroup>
    
            <Box height={14} />
            <Tooltip
              title="Draw map,displays in Geoview" placement="top">
            <Button type="button" variant="contained" color="primary" onClick={() => {

    // changed to mapdic2 dec 28  to test map display with original file from form
              let Geoviewmapdiv2 = [];
              Geoviewmapdiv2.innerHTML = "<div id=\"mapTwo\"class=\"llwp-map\" data-lang=\"en\"  style=\" height: 100vh;\" data-config=\"{ 'map': {" +

              "'interaction': 'dynamic'," +
              "   'viewSettings': {   " +
     //  -"    'zoom': 4,  " +
            "    'zoom': 0,  " +
     //   "    'center': [0,0],  " +
       // extent is shifted with projection 3978 and extent -4844430,-1052772, ect
    // commented out below dec 28 for test, displys ok with extent and 3857,not 3078
              "    'center': [-100,60],  " +
                          "   'projection': 3857  " +
              //            "   'projection': 3978  " +
        // commented out beow dec 28 for test 
     //     "   'projection': 3978  ," +
       
       // commented out beow dec 28 for test
       //        "   'extent':[-5382184,-1370010,4840360,3799899 ]" + // centered on canda but way left
          
     //   "   'extent':[-384385,-173130,1364546,141720 ]" +
                 "   'extent':[-16763712,5165908,-5688293,10649806 ]" +
      //     "   'extent':[-4844430,-1052774,5666163,4170111 ]" +
   
              " },    " +
              " 'basemapOptions': {    " +
              "     'basemapId': 'transport'," +
              "      'shaded':  true," +
              "       'labeled':  true"+
              "   } " +
       //       "    'listOfGeoviewLayerConfig': [ " +
       //       "  {                             " +
      //        "         'geoviewLayerId': 'wmsLYR1', " +
  //   " 'geoviewLayerId': '"+formData.map.listOfGeoviewLayerConfig.geoviewLayerId+"'," +
          
    //          "   'geoviewLayerName': {                       " +
     //         "      'en': 'Première Nation / First Nation',  " +
//    "      'en':'"+formData.map.listOfGeoviewLayerConfig[0].geoviewLayerName.en+"'," +
    //          "     'fr': 'Première Nation / First Nation'  " +
  //    "      'fr':'"+formData.map.listOfGeoviewLayerConfig[0].geoviewLayerName.fr+"'"+
   //           " },                     " +
  //            "  'metadataAccessPath': {   " +
     //         " 'en': 'https://services.aadnc-aandc.gc.ca/geomatics/services/Donnees_Ouvertes-Open_Data/Premiere_Nation_First_Nation/MapServer/WMSServer', " +
     //         "  'fr': 'https://services.aadnc-aandc.gc.ca/geomatics/services/Donnees_Ouvertes-Open_Data/Premiere_Nation_First_Nation/MapServer/WMSServer'" +
   //           "}, " +
  //    " 'geoviewLayerType': 'ogcWms' ," +
      //      " 'geoviewLayerType':'"+formData.map.listOfGeoviewLayerConfig[0].geoviewLayerType+"'," +
        
     //         " 'listOfLayerEntryConfig': [{ 'layerId': '0' }]" +
           
           //                "}  " +
         //     "]" +
              " },  " +
              "'theme':'dark'," +
          //             " 'components': ['" + formData.components .join("','")+"']," +
      " 'components': ['north-arrow', 'overview-map']," +
           
               " 'corePackages': []," +
   //   "'corePackages': [ '"+formData.corePackages[0]+"','"+formData.corePackages[1]+"','"+formData.corePackages[2]+"','"+formData.corePackages[3]+"','"+formData.corePackages[4] +"','"+formData.corePackages[5]+"']," +
   //     "'corePackages': [ '"+formData.corePackages.join("','")+"']," +
   
              
           //   " 'corePackages': [ 'layers-panel', 'details-panel']," +
              " 'suportedLanguages': ['en', 'fr']" +
              " }\" " +
              "> </div>";
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
            
            <Button id ="submit" type="button" variant="contained" color="primary"
              onClick={() => {
                        console.log("map formchanged=",mapFormChanged); //PopUps()
                            console.log("desired schema=",desiredSchema ); //PopUps()
                      alert('Form is NOT  valid');
                       document.getElementById("submit").style.backgroundColor = 'red';
                //added is="submit above to change folor to green when ok"
                  if ( ( (desiredSchema === "map")&&((fileLoaded)|| ( mapFormChanged)) ) ) {
                  //       console.log("calling (fileLoaded)draw map"); //PopUps()
                    console.log('----------------------------------------    about do submit form' );
                     submitFormRef.current.click();
                    //       const formRef = crea  formRef); //PopUps()
                     console.log("---  formref",formRef);
                    console.log("---  formref current =",  formRef.current); //PopUps()
               
                    //  console.log("---  type of validagte=",typeof formRef.current.validateForm()); //PopUps()
                //    if (formRef.current.validateForm()) {
                    
               //     alert('Form is valid');
                      
                     //const submitbutton = document.getElementById("submit").style.background = '#000000'
               //       document.getElementById("submit").style.backgroundColor = 'green'; 
                 //   }
               //     else {
               //          alert('Form is NOTTTT  valid');
              //         document.getElementById("submit").style.backgroundColor = 'red';
                   //   onError();
               //     }
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
                  document.getElementById("submit").style.backgroundColor = "rgb(63,81,181)"; 
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
                     <option value="Weather current">OGC WMS Weather current</option>                              
                <option value="Flood historical">ESRi Dynamic Flood Historical</option>
                 <option value="xyzTile">xyzTile Esri World Map</option>
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
   
              plugin = event.currentTarget.value; console.log("on change plugin value=", plugin);
               navigate("/plugin", {
                  state: { data: jsonString.plugins, desiredPlugin: plugin },
               });
              active_plugin = plugin;
                //= document.querySelector('[value={{plugin}}]');
             console.log("active 1plugn",active_plugin );
             
              if ((event.currentTarget.value) === "map") {
             //     event.currentTarget.disabled= false;
             //   event.currentTarget.checked = true;
            //              active_plugin = document.querySelector('[value="map"]');
               console.log("active plugn",active_plugin );
          
                console.log("--------------------  map seleceted");
              }
              else if((event.currentTarget.value) === "chart") {
                //     event.currentTarget.valueSelected = true;
           
               event.currentTarget.checked = true;
                  updateForm(formData); // updagtes after 2nd form change
                   forceUpdate;
 
           //     active_plugin = document.querySelector('[value="chart"]');
                console.log("active plugn",active_plugin );
             //   active_plugin.control = "{<Radio color=\"info\" checked=\"true\" />}";
                console.log("--------------------  map seleceted");
              }
              }
            }
            >
              <Box height={16} />
            <FormControlLabel
            
                value="Range Slider"
                control={<Radio color="info" checked={ active_plugin =="Range Slider"}/>}
                label="Range Slider"
              />
            <FormControlLabel
              value="chart"
              control={<Radio color="info" checked={active_plugin === "chart" } />}
                label="Chart"
              />
              <FormControlLabel
                value="Swiper"
                control={<Radio color="info" checked={ active_plugin=== "Swiper"}/>}
                label="Swiper"
              />
              <FormControlLabel
                value="thematicslider"
                control={<Radio color="info" checked={ active_plugin === "thematicslider"}/>}
                label="Thematic Slider"
              />
              <FormControlLabel
                value="map"
                control={<Radio color="info" checked={ active_plugin=== "map"}/>}
              label="Geoview map"
             
              />
              <FormControlLabel
                value="Draw Toolbar"
                control={<Radio color="info" checked={ active_plugin === "Draw Toolbar"}/>}
                label="Draw Toolbar"
              />
                          
            </RadioGroup>
        </FormControl>
          </FormWithNav >
    
    </div>
    //</Form >
   //     </FormWithPagination >
    
  );
}
 

    export default SchemaForm; 
