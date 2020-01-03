/**
 *  压缩图片文件
 *  @param target 图片文件
 *  @param maxWidth 最大宽度
 *  @param maxHeight 最大高度
 *  @param onSuccess 成功回调
 *  @param quality 压缩的图片质量 (0-1) 1表示最佳质量 
 */
function compress({
  target,
  maxWidth,
  maxHeight,
  onSuccess,
  quality = 1
}) {
  
  let img = new Image(),
    _width,
    _height,
    _canvas,
    _context,
    _name = target.name,
    _mimeType = target.type,
    originalSize = Math.floor(target.size / 1024 /1024),
    srcImgData = URL.createObjectURL(target);
  if (originalSize < 3) { //2M以上 的图片才压缩
    onSuccess({blob: target, name: _name, type: _mimeType})
    return;
  }
  img.src = srcImgData;
  img.onload = () => {
    URL.revokeObjectURL(srcImgData);
    //图片的原始大小
    _width = img.naturalWidth;
    _height = img.naturalHeight;
    if (_width > maxWidth) {
      _height = (maxWidth / _width) * _height;
      _width = maxWidth;
    }
    if (_height > maxHeight) {
      _width = (maxHeight / _height) * _width;
      _height = maxHeight;
    }
    //将得到的图片画到canvas上去
    _canvas = document.createElement("canvas");
    _canvas.width = _width;
    _canvas.height = _height;
    _context = _canvas.getContext("2d");
    _context.drawImage(img, 0, 0, _width, _height);
    // let dataUrl = _canvas.toDataURL(_mimeType, quality);
    // let totalSize =
    //   Math.round(
    //     (dataUrl.replace(`data:${_mimeType};base64,`, "").length * 3 / 4
    //   )) / 1024; //得到压缩后的图片大小(kb)
    _canvas.toBlob(blob => {
      onSuccess({ blob: blob, type: _mimeType, name: _name });
    }, _mimeType, quality)
  };
}
export {
  compress
}