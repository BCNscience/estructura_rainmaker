ag-viewer
=========

Agnitio module for opening URLs or PDF documents on top of presentation.

Can be used as a fallback to proper viewers bundled in Agnitio applications or mobile devices.

## Usage

1) Include following tag in Accelerator element in master template:

```<div id="ag-viewer" data-module="ag-viewer"></div>```

2) Open a URL or PDF document in one of the following ways:

- ```ag.openPDF(path)``` (will open in viewer if not in Rainmaker Engager app)
- ```ag.openURL(url)``` (will open in viewer)
- Add ```data-viewer``` attribute to normal link

3) Open a slide in one of the following ways:

- ```<a href="moa_video" data-viewer="slide">MoA Video</a>```
- ```viewerInstance.openSlide({id: "moa_video"})``` (viewerInstance is here a hypothetical variable)