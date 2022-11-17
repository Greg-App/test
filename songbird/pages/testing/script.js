const img = new Image();
  img.src = '';
  const loadIcon = document.createElement('div');
  loadIcon.classList.add('loading');
  document.body.append(loadIcon);
  img.onload = function () {
    
    console.log("loaded");
    birdCardImg.src = birdObj.image;
    birdCardImgCover.lastChild.remove();
 }