if (!HTMLCanvasElement.prototype.toBlob) {
  Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
    value: function value(callback, type, quality) {
      const binStr = atob( this.toDataURL(type, quality).split(',')[1] );
      const len = binStr.length;
      const arr = new Uint8Array(len);

      for (let i = 0; i < len; i++ ) {
        arr[i] = binStr.charCodeAt(i);
      }

      callback( new Blob( [arr], {type: type || 'image/png'} ) );
    },
  });
}

class ImageUtil {
  convertToImg(file) {
    const image = new Image();
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    const promise = new Promise((resolve, reject) => {
      reader.onload = (event) => {
        const blob = new Blob([event.target.result]);
        window.URL = window.URL || window.webkitURL;
        const blobURL = window.URL.createObjectURL(blob);
        image.src = blobURL;
        image.onload = () => {
          resolve(image);
        };
        image.onerror = (e) => {
          reject(e);
        };
      };
    });
    return promise;
  }

  compress(imgFile, rate) {
    const promise = new Promise((resolve, reject) => {
      this.convertToImg(imgFile).then((img) => {
        const { width, height } = img;
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', rate);
        canvas.toBlob((blob) => {
          resolve({ dataUrl, blob });
        }, 'image/jpeg', rate);
      }, (err) => {
        reject(err);
      });
    });
    return promise;
  }
}

const instance = new ImageUtil();
export default instance;
