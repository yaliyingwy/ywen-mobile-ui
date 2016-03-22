class Ajax {
  objToFormStr(obj) {
    let paramStr = ``;
    Object.keys(obj).forEach((key) => paramStr += `${key}=${encodeURIComponent(obj[key])}&`);
    if (paramStr.endsWith('&')) {
      paramStr = paramStr.slice(0, -1);
    }
    return paramStr;
  }

  request({ method = 'GET', url, paramDic = {}, success, error }) {
    const paramStr = this.objToFormStr(paramDic);
    const req = new XMLHttpRequest();
    req.overrideMimeType('text/xml');
    req.onreadystatechange = () => {
      if (req.readyState === 4) {
        if (req.status >= 200 && req.status <= 300) {
          success(req.responseText);
        } else {
          error(req.responseText);
        }
      }
    };
    req.open(method, method === 'POST' ? url : `${url}?${paramStr}`, true);
    req.send(method === 'POST' ? paramStr : null);
  }

  upload({ url, paramDic = {}, success, error, onLoad }) {
    const formData = new FormData();
    Object.keys(paramDic).forEach((key) => {
      const value = paramDic[key];
      if (typeof value === 'object') {
        if (value.constructor === Array) {
          value.forEach((file) => {
            formData.append(key, file, 'file.jpg');
          });
        } else {
          formData.append(key, value, 'file.jpg');
        } 
      } else {
        formData.append(key, value);
      }  
    });

    const req = new XMLHttpRequest();
    req.overrideMimeType('text/xml');
    req.onreadystatechange = () => {
      if (req.readyState === 4) {
        if (req.status >= 200 && req.status <= 300) {
          success(req.responseText);
        } else {
          error(req.responseText);
        }
      }
    };
    req.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        onLoad(Math.trunc(e.loaded / e.total * 100));
      }
    };
    req.open('POST', url, true);
    req.send(formData);
  }
}

const instance = new Ajax();

export default instance;
