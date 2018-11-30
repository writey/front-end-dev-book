/*
1) 获取所有的缩略图
2) 监控每个缩略图的点击事件
3) 如果发生了点击，根据缩略图的信息更新大图
  1) 从缩略图的数据属性中后区图像的URL
  2） 从缩略图的数据属性中获取标题文本
  3) 将图像和标题设置到大图上
*/
const DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
const DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
const THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
const DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
const HIDDEN_DETAIL_CLASS = 'hidden-detail';
const TINY_FRAME_CLASS = 'is-tiny';
const ESC_KEY = 27;

function setDetails(imageUrl, titleText) {
  const detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
  const detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
  detailImage.src = imageUrl;
  detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
  return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail) {
  return thumbnail.getAttribute('data-image-title');
}

function setDetailFromThumb(thumbnail) {
  return setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}


function showDetails() {
  document.body.classList.remove(HIDDEN_DETAIL_CLASS);
}

function addThumbClickHandler(thumbnail) {
  thumbnail.addEventListener('click', (event) => {
    event.preventDefault();
    const frame = document.querySelector(DETAIL_FRAME_SELECTOR);
    frame.classList.add(TINY_FRAME_CLASS);
    setTimeout(() => {
      showDetails();
      setDetailFromThumb(thumbnail);
      frame.classList.remove(TINY_FRAME_CLASS);
    }, 50);
  });
}

function getThumbnailsArray() {
  return document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
}

function hiddenDetails() {
  document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function addKeyPressHandler() {
  document.body.addEventListener('keyup', (event) => {
    event.preventDefault();
    if (event.keyCode === ESC_KEY) {
      hiddenDetails();
    }
  });
}

function initializeEvent() {
  const thumbnailsArray = getThumbnailsArray();
  thumbnailsArray.forEach(addThumbClickHandler);
  addKeyPressHandler(thumbnailsArray);
}

function updateThumbnailUrl(thumbnail) {
  thumbnail.setAttribute('data-image-url', 'https://cdn-images-1.medium.com/max/2000/1*ir3MBJgZwPKAVghEbSdFIg.jpeg');
}

function randomUpdateThumbUrl() {
  const thumbnailsArray = getThumbnailsArray();
  const radn = Math.floor(Math.random() * 6);
  updateThumbnailUrl(thumbnailsArray[radn]);
}

function remakeThumbnailsUrl() {
  const thumbnailsArray = getThumbnailsArray();
  thumbnailsArray.forEach((element) => {
    const thumbnailImage = element.querySelector('img');
    const thumbnailImgSrc = thumbnailImage.getAttribute('src');
    element.setAttribute('data-image-url', thumbnailImgSrc);
  });
}

function reRandomUpdateThumbnailUrl() {
  remakeThumbnailsUrl();
  randomUpdateThumbUrl();
}


initializeEvent();
