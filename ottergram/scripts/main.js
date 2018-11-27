/**
1) 获取所有的缩略图
2) 监控每个缩略图的点击事件
3) 如果发生了点击，根据缩略图的信息更新大图
  1) 从缩略图的数据属性中后区图像的URL
  2） 从缩略图的数据属性中获取标题文本
  3) 将图像和标题设置到大图上
*/
var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';

function setDetails(imageUrl, titleText) {
  'use strict'
  var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
  var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);

  detailImage.src = imageUrl;
  detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
  'use strict'
  return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail) {
  'use strict'
  return thumbnail.getAttribute('data-image-title');
}

function setDetailFromThumb(thumbnail) {
  'use strict'
  return setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickHandler(thumbnail) {
  'use strict'
  thumbnail.addEventListener('click', function (event) {
      event.preventDefault();
      setDetailFromThumb(thumbnail);
  });
}

function getThumbnailsArray() {
  'use strict'
  return document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
}

function initializeEvent() {
  'use strict'
  var thumbnailsArray = getThumbnailsArray();
  thumbnailsArray.forEach(addThumbClickHandler);
}

function updateThumbnailUrl(thumbnail) {
  thumbnail.setAttribute('data-image-url','https://cdn-images-1.medium.com/max/2000/1*ir3MBJgZwPKAVghEbSdFIg.jpeg');
}

function randomUpdateThumbUrl() {
  var thumbnailsArray = getThumbnailsArray();
  var radn = Math.floor(Math.random() * 6);
  updateThumbnailUrl(thumbnailsArray[radn]);
}

function remakeThumbnailsUrl() {
  var thumbnailsArray = getThumbnailsArray();
  thumbnailsArray.forEach(function (element){
      var thumbnailImage = element.querySelector('img');
      var thumbnailImgSrc = thumbnailImage.getAttribute('src');
      element.setAttribute('data-image-url',thumbnailImgSrc);
  });
}

function reRandomUpdateThumbnailUrl() {
  remakeThumbnailsUrl();
  randomUpdateThumbUrl();
}

initializeEvent();
