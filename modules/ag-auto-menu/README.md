ag-auto-menu
============

Agnitio module for automatically creating a horizontal presentation menu.

## Usage

1) Include following tag in Accelerator element in master template (index.html):

```<div data-module="ag-auto-menu"></div>```

## Settings

The following properties can be set on the above element:

- hide BOOLEAN [false] If the menu should be hidden by default
- placement STRING ['top'] If menu should be placed on top or bottom
- slideshows STRING Ids of slideshows that should generate a menu. By default all will generate a menu.
- exclude STRING Ids to exclude from the menu.
- binding INTEGER [77] Integer of keyboard key to toggle menu. Defaults to 'm' key.
- trigger STRING An eventname and query (optional) that will trigger state of menu. Resolved from document (entrire presentation).

### Example

```<div data-module="ag-auto-menu" hide slideshows="zanadryl,safety", binding="78" trigger="twoFingerTap"></div>```

## Changelog

### Version 0.9.0 2015-09-22
- Fixed link for nested array
- Added trigger property

### Version 0.8.5 2015-08-12
- Fixed placement settings
- Small fix to 'slideshows' setting

### Version 0.8.0 2015-08-11
- Added 'slideshows' setting