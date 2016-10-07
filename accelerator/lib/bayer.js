/**
 * bayer.js
 *
 * Bayer CLM Framework for Agnitio/Veeva
 *
 * @author	Andreas Bolz
 * @copyright	Copyright 2014 Bayer Business Services
 * @version	4.0
 * 1.0	New
 * 2.0	Determine email address of contact and replace recipient if empty
 * 3.0	Adjustment of fields for Veeva Dev environment
 * 4.0  Last slide event with new Veeva framework 4.0 and always tracking when in iRep
 */

(function () {

	// Create the global Bayer namespace 'by'
	window.by = window.by || {};

	// create the global Variable for system identification
	// 0 = undefined
	// 1 = non-tracking system
	// 2 = Agnitio iPlanner tracking
	// 3 = Veeva tracking
	// to be continued...
	window.CLMSystem = 0;

	if (window.iPlanner)
		CLMSystem = 2;

	window.CLMIsSaving = false;
	window.CLMEmailAddress = "";
	
	//
	// create bayer framework
	//
	by.framework = (function() {

		//
		// check where we are if not in Agnitio framework
		//
		function check() {
			
			if (window.CLMSystem == 0) {
				com.veeva.clm.getDataForCurrentObject("Account", "PersonEmail", getDataForCurrentObjectCallback);
			} else {
	
				if (window.CLMSystem == 3) {
					by.framework.save();
				}
			}
	
			function getDataForCurrentObjectCallback (result) {
	
				if (result.success) {
					window.CLMSystem = 3;
					window.CLMEmailAddress = result.Account.PersonEmail;
					by.framework.save();
				} else {
// Removed in V4 due to process in Switzerland with selecting account afterwards
//					window.CLMSystem = 1;
//					window.CLMIsSaving = false;
					window.CLMSystem = 3;
					by.framework.save();
				}
			}
		}
	
		//
		// save data to Veeva's Call Clickstream object or
		// create key message on slideEnter
		//
		function save () {
			var data = eventBuffer.shift();
			
			var clickStream = {};
			if (typeof data.type != "undefined")			clickStream.BHC_Type__c = data.type;
			if (typeof data.categoryId != "undefined")		clickStream.BHC_Category_ID__c = data.categoryId;
			if (typeof data.category != "undefined")		clickStream.BHC_Category__c = data.category;
			if (typeof data.labelId != "undefined")			clickStream.BHC_Label_ID__c = data.labelId;
			if (typeof data.label != "undefined")			clickStream.BHC_Label__c = data.label;
			if (typeof data.valueId != "undefined")			clickStream.BHC_Value_ID__c = data.valueId;
			if (typeof data.value != "undefined")			clickStream.Value__c = data.value;
			if (typeof data.valueType != "undefined")		clickStream.BHC_Value_Type__c = data.valueType;
			if (typeof data.time != "undefined")			clickStream.BHC_Time__c = data.time;
			if (typeof data.slideIndex != "undefined")		clickStream.BHC_Slide_Index__c = data.slideIndex;
			if (typeof data.slidePath != "undefined")		clickStream.BHC_Slide_Path__c = data.slidePath;
			if (typeof data.chapterName != "undefined")		clickStream.BHC_Chapter_Name__c = data.chapterName;
			if (typeof data.chapterId != "undefined")		clickStream.BHC_Chapter_ID__c = data.chapterId;
			if (typeof data.subChapterName != "undefined")		clickStream.BHC_Sub_Chapter_Name__c = data.subChapterName;
			if (typeof data.subChapterId != "undefined")		clickStream.BHC_Sub_Chapter_ID__c = data.subChapterId;
			if (typeof data.parentSlideName != "undefined")		clickStream.ParentSlideName__c = data.parentSlideName;
			if (typeof data.parentOfParentSlideName != "undefined")	clickStream.BHC_Parent_Of_Parent_Slide_Name__c = data.parentOfParentSlideName;	

			clickStream.Track_Element_Description_vod__c = clickStream.ParentSlideName__c;
			clickStream.Answer_vod__c = clickStream.Value__c;
	
			clickStream.Usage_Start_Time_vod__c = new Date(data.time * 1000);
	
			if ('slideEnterTime' in data)
				clickStream.Usage_Duration_vod__c = (data.time - data.slideEnterTime);

			com.veeva.clm.createRecord("Call_Clickstream_vod__c", clickStream, createRecordCallback);
		}

		function createRecordCallback (result) {
			if (eventBuffer.length > 0)
				by.framework.save();
	
			window.CLMIsSaving = false;
		}
		
		return {
			check : check,
			save : save
		}	

	}());


	//
	// Overriding Agnitio functions
	//
        var agnitioSendMail = window.ag.sendMail;
        var agnitioOpenPDF = window.ag.openPDF;
	var agnitioSave = window.ag.submit.save;

	var eventBuffer = new Array();
	var slideEnterData = {};

	//
	// Replace Send Mail
	//
	ag.sendMail = function(address, subject, body, files) {

	        return function(address, subject, body, files) {

			if (window.CLMSystem == 2) {
				agnitioSendMail(address, subject, body, files);

			} else {
				if (address.length == 0)
					address = window.CLMEmailAddress;

				window.location.href = "mailto:" + address + "?subject=" + subject + "&body=" + encodeURIComponent(body);
			}
		}
	}();

	window.ag.sendMail = ag.sendMail;
	window.sendMail = window.ag.sendMail;

	//
	// Replace Open PDF
	//
	ag.openPDF = function(path, name) {

	        return function(path, name) {

			if (window.CLMSystem == 2) {
				agnitioOpenPDF(path, name);

			} else {
				window.open(path, path, '');
			}
		}
	}();

	window.ag.openPDF = ag.openPDF;
	window.openPDF = window.ag.openPDF;

	//
	// Replace Save
	//	
	window.ag.submit.save = function(data) {

	        return function(data) {
			if (window.CLMSystem == 2) {
				agnitioSave(data);

			} else {				

				if (data.category == "slideEnter") {
					slideEnterData.type = data.type;
					slideEnterData.categoryId = data.categoryId;
					slideEnterData.category = data.category;
					slideEnterData.labelId = data.labelId;
					slideEnterData.label = data.label;
					slideEnterData.valueId = data.valueId;
					slideEnterData.value = data.value;
					slideEnterData.valueType = data.valueType;
					slideEnterData.time = data.time;
					slideEnterData.slideIndex = data.slideIndex;
					slideEnterData.slidePath = data.slidePath;
					slideEnterData.chapterName = data.chapterName;
					slideEnterData.chapterId = data.chapterId;
					slideEnterData.subChapterName = data.subChapterName;
					slideEnterData.subChapterId = data.subChapterId;
					slideEnterData.parentSlideName = data.parentSlideName;
					slideEnterData.parentOfParentSlideName = data.parentOfParentSlideName;


				}
	
				if (data.category == "slideExit") {
					data.type = slideEnterData.type;
					data.categoryId = slideEnterData.categoryId;
					data.category = "slideExit";
					data.labelId = slideEnterData.labelId;
					data.label = slideEnterData.label;
					data.valueId = slideEnterData.valueId;
					data.value = slideEnterData.value;
					data.valueType = slideEnterData.valueType;
					data.slideEnterTime = slideEnterData.time;
					data.slideIndex = slideEnterData.slideIndex;
					data.slidePath = slideEnterData.slidePath;
					data.chapterName = slideEnterData.chapterName;
					data.chapterId = slideEnterData.chapterId;
					data.subChapterName = slideEnterData.subChapterName;
					data.subChapterId = slideEnterData.subChapterId;
					data.parentSlideName = slideEnterData.parentSlideName;
					data.parentOfParentSlideName = slideEnterData.parentOfParentSlideName;
				}

				var newEvent = {};
				newEvent.type = data.type;
				newEvent.categoryId = data.categoryId;
				newEvent.category = data.category;
				newEvent.labelId = data.labelId;
				newEvent.label = data.label;
				newEvent.valueId = data.valueId;
				newEvent.value = data.value;
				newEvent.valueType = data.valueType;
				newEvent.time = data.time;
				newEvent.slideIndex = data.slideIndex;
				newEvent.slidePath = data.slidePath;
				newEvent.chapterName = data.chapterName;
				newEvent.chapterId = data.chapterId;
				newEvent.subChapterName = data.subChapterName;
				newEvent.subChapterId = data.subChapterId;
				newEvent.parentSlideName = data.parentSlideName;
				newEvent.parentOfParentSlideName = data.parentOfParentSlideName;
				newEvent.slideEnterTime = data.slideEnterTime;

				eventBuffer.push(newEvent);

				if (!window.CLMIsSaving) {
					window.CLMIsSaving = true;
					by.framework.check();
				}

			}
		}
	}();


	//
	// New in v4:
	// Capture Veeva 'Done" button to write last slide exit
	//
	com.veeva.clm.createRecordsOnExit = function() {
		if (confirm) {
			var object = "Call_Clickstream_vod__c";
			var clickStream = {};
	
			var data = slideEnterData;

			data.slideEnterTime = data.time;
			data.time = Math.floor(Date.now() / 1000);
			data.category = "slideExit";

			if (typeof data.type != "undefined")			clickStream.BHC_Type__c = data.type;
			if (typeof data.categoryId != "undefined")		clickStream.BHC_Category_ID__c = data.categoryId;
			if (typeof data.category != "undefined")		clickStream.BHC_Category__c = data.category;
			if (typeof data.labelId != "undefined")			clickStream.BHC_Label_ID__c = data.labelId;
			if (typeof data.label != "undefined")			clickStream.BHC_Label__c = data.label;
			if (typeof data.valueId != "undefined")			clickStream.BHC_Value_ID__c = data.valueId;
			if (typeof data.value != "undefined")			clickStream.Value__c = data.value;
			if (typeof data.valueType != "undefined")		clickStream.BHC_Value_Type__c = data.valueType;
			if (typeof data.time != "undefined")			clickStream.BHC_Time__c = data.time;
			if (typeof data.slideIndex != "undefined")		clickStream.BHC_Slide_Index__c = data.slideIndex;
			if (typeof data.slidePath != "undefined")		clickStream.BHC_Slide_Path__c = data.slidePath;
			if (typeof data.chapterName != "undefined")		clickStream.BHC_Chapter_Name__c = data.chapterName;
			if (typeof data.chapterId != "undefined")		clickStream.BHC_Chapter_ID__c = data.chapterId;
			if (typeof data.subChapterName != "undefined")		clickStream.BHC_Sub_Chapter_Name__c = data.subChapterName;
			if (typeof data.subChapterId != "undefined")		clickStream.BHC_Sub_Chapter_ID__c = data.subChapterId;
			if (typeof data.parentSlideName != "undefined")		clickStream.ParentSlideName__c = data.parentSlideName;
			if (typeof data.parentOfParentSlideName != "undefined")	clickStream.BHC_Parent_Of_Parent_Slide_Name__c = data.parentOfParentSlideName;
	
			clickStream.Track_Element_Description_vod__c = clickStream.ParentSlideName__c;
			clickStream.Answer_vod__c = clickStream.Value__c;

			clickStream.Usage_Start_Time_vod__c = new Date(data.time * 1000);

			if ('slideEnterTime' in data)
				clickStream.Usage_Duration_vod__c = (data.time - data.slideEnterTime);

			var objectArray = [object];
			var valuesArray = [clickStream];

			return com.veeva.clm.formatCreateRecords(objectArray, valuesArray);

		}
	} 

}());






