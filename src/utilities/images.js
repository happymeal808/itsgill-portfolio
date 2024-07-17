document.addEventListener('DOMContentLoaded', () => {
    let currentImageIndex = 0;
    const images = document.querySelectorAll('.work-gallery li');
    const totalImages = images.length;
  
    function showNextImage() {
      images[currentImageIndex].classList.remove('active');
      currentImageIndex = (currentImageIndex + 1) % totalImages;
      images[currentImageIndex].classList.add('active');
    }
  
    images[currentImageIndex].classList.add('active');
  
    setInterval(showNextImage, 10000);
  });