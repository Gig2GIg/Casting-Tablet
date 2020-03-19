import DEFINE from "@/utils/const.js";

class ThumbService {
  // default set
  thumbnailWidth = DEFINE.thumbSize.defaultWidth;
  thumbnailHeight = DEFINE.thumbSize.defaultHeight;
  constructor() {
  }
  /**
   * This method is used for set width and hieght of thumbnail image based of current image ratio
   * @param {*} imgWidth : Original image width
   * @param {*} imgHeight : Original image Height
   * @param {*} targetWidth : target image width
   * @param {*} targetHeight : target image width
   */
  setThumbRatio(imgWidth, imgHeight, targetWidth, targetHeight) {
    if (targetHeight == null) {
      // get width to height ratio
      let ratio = imgWidth / imgHeight;

      // if is portrait
      // use ratio to scale height to fit in square
      if (imgWidth > imgHeight) {
        targetHeight = Math.floor(targetWidth / ratio);
      }
      // if is landscape
      // use ratio to scale width to fit in square
      else {
        targetHeight = targetWidth;
        targetWidth = Math.floor(targetWidth * ratio);
      }
      this.thumbnailWidth = targetWidth;
      this.thumbnailHeight = targetHeight;

    } else {
      this.thumbnailWidth = targetWidth;
      this.thumbnailHeight = targetHeight;
    }
  }
  async imageThumbnail(file, targetWidth, targetHeight = null) {
    return new Promise((resolve, reject) => {
      let returnRes = {};

      let fr = new FileReader();
      fr.readAsDataURL(file); // or readAsText(file) to get raw content

      fr.onload = () => {
        var myCan = document.createElement('canvas');
        var img = new Image();
        img.src = fr.result;
        img.onload = () => {
          // set thumbnail image size            
          this.setThumbRatio(img.width, img.height, targetWidth, targetHeight);
          // create thumbnail image temp canvas
          myCan.id = "myTempCanvas";
          myCan.width = Number(this.thumbnailWidth);
          myCan.height = Number(this.thumbnailHeight);
          if (myCan.getContext) {
            var cntxt = myCan.getContext("2d");
            cntxt.drawImage(img, 0, 0, myCan.width, myCan.height);
            var dataURL = myCan.toDataURL();

            if (dataURL != null && dataURL != undefined) {
              returnRes.preview = dataURL;
              myCan.toBlob((blob) => {
                returnRes.file = blob;
                resolve(returnRes);
              });
            } else {
              reject('unable to get context');
            }
          } else {
            reject('unable to get context');
          }
        }
      }
    });
  }
  videoThumbnail(file, targetWidth, targetHeight = null) {
    let returnRes = {};
    return new Promise((resolve, reject) => {
      var fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = () => {
        var blob = new Blob([fileReader.result], { type: file.type });
        var url = URL.createObjectURL(blob);

        var video = document.createElement('video');
        var timeupdate = () => {
          if (snapImage()) {
            video.removeEventListener('timeupdate', timeupdate);
            video.pause();    
            console.log("ThumbService -> timeupdate -> resolve", resolve)
            resolve(returnRes);
          }
        };
        video.addEventListener('loadeddata', () => {
          if (snapImage()) {
            video.removeEventListener('timeupdate', timeupdate);
          }
        });
        var snapImage = () => {
          var canvas = document.createElement('canvas');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
          var dataURL = canvas.toDataURL();
          var success = dataURL.length > 100000;
          if (success) {
            var img = document.createElement('img');
            img.src = dataURL;
            URL.revokeObjectURL(url);
          }
          if (dataURL != null && dataURL != undefined) {
            canvas.toBlob((blob) => {
              this.imageThumbnail(blob, targetWidth, targetHeight).then(thumb_data => {
                console.log("handleFile -> ThumbService video thumb_data return", thumb_data)
                returnRes.preview = thumb_data.preview;
                returnRes.file = thumb_data.file;  
                resolve(returnRes);              
              });
            });
            URL.revokeObjectURL(url);
          } else {
            reject('unable to get context');
          }
          return success;
        };
        video.addEventListener('timeupdate', timeupdate);
        video.preload = 'metadata';
        video.src = url;
        // Load video in Safari / IE11
        video.muted = true;
        video.playsInline = true;
        video.play();
      };      
    });
  }
}

export default new ThumbService();
