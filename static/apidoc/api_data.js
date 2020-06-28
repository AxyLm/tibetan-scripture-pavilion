define({ "api": [
  {
    "type": "post",
    "url": "/file/upload",
    "title": "文件上传",
    "group": "File",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "file",
            "description": "<p>file.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "router/fileRouter.js",
    "groupTitle": "File",
    "name": "PostFileUpload"
  }
] });
