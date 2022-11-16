const backBtn = document.querySelector('.back-btn');
backBtn.addEventListener('click',hideGallery);
function hideGallery () {
  const gallery=document.querySelector('.gallery');
  gallery.classList.remove('show-gallery');
}
const galleryBtn = document.querySelector('.gallery-btn');
galleryBtn.addEventListener('click',showGallery);
function showGallery () {
  const gallery=document.querySelector('.gallery');
  gallery.classList.add('show-gallery');
}