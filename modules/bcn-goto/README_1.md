ag-video
========

Agnitio module for displaying HTML5 video. Makes use of custom controls (to prevent layering issues) and includes monitoring of viewing.

This module will ensure that video plays in all supported browser during a remote call.

## Usage

1) Include following tag in slide template:

```<div data-module="ag-video"></div>```

## Settings

The following properties can be set on the above element:

- src STRING The source of the video file. Usually in the slides assets folder. REQUIRED!
- poster STRING The source of an image file to be used as "poster".
- type STRING ["video/mp4"] The type property to set on the video element.
- monitor BOOLEAN [false] Whether viewing of video should be monitored or not.

### Example

```<div data-module="ag-video" monitor src="assets/moa.mp4", poster="assets/moa_video.jpg"></div>```

## Changelog

### Version 0.9.5 2015-09-22
- Added monitoring
