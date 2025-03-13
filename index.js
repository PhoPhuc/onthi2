document.getElementById('closeButton').addEventListener('click', function() {
  var notification = document.getElementById('notification');
  notification.classList.add('closing');

  notification.addEventListener('animationend', function() {
    notification.style.display = 'none';
  }, { once: true });
});
