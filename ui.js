const articleElement = document.getElementById('article-container');



articleElement.addEventListener('click', () => {
  if (articleElement.classList.contains('expanded')) {
    articleElement.classList.remove('expanded');

    setTimeout(() => {
      articleElement.classList.add('collapsed');
    }, 300);
  } else {
    articleElement.classList.remove('collapsed');
    articleElement.classList.add('expanded');
  }
});

const IMG_SRC = './img/mascot.png';
const IMG_SRC_ALT = './img/mascot-alt.png';

const mascotImg = document.getElementById('mascot-img');

function updateMascotVisibility() {
  if (window.innerWidth <= 700) {
    mascotImg.style.display = 'none';
    return;
  }

  mascotImg.style.display = '';
}

mascotImg.addEventListener('click', function () {
  window.location.href = '/';
});

updateMascotVisibility();
window.addEventListener('resize', updateMascotVisibility);

(function () {
  const img = mascotImg;
  function checkProximity(x, y) {
    const rect = img.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = x - cx;
    const dy = y - cy;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const threshold = Math.max(rect.width, rect.height) * 2; // two times the size of the image, using max so it could also work for non squared images
    return distance < threshold;
  }

  document.addEventListener('mousemove', function (event) {
    if (checkProximity(event.clientX, event.clientY)) {
      img.src = IMG_SRC_ALT;
    } else {
      img.src = IMG_SRC;
    }
  });
})();

export function displayArticle(title, content, url, license) {
  const container = document.getElementById('article-container');
  const attributionContainer = document.getElementById('attribution');
  const titleElement = document.querySelector('#article-container h2');
  const contentElement = document.querySelector('#article-content');

  container.hidden = false;
  attributionContainer.hidden = false;

  titleElement.textContent = title;
  contentElement.innerHTML = content;
  attributionContainer.innerHTML = `Article excerpt from ${license.source}: <a href="${url}" target="_blank" rel="noopener noreferrer">${title}</a><br>
    Source: ${license.source}<br>
    License: <a href="${license.licenseUrl}" target="_blank" rel="noopener noreferrer">${license.license}</a><br>
    <a href="${url}" target="_blank" rel="noopener noreferrer">Read full article here</a><br>
    Excerpt may not be representative of the full article. Click "Read full article here" to read the entire article on Wikipedia.`;


  updateExpandableState();
}

function updateExpandableState() {
  const isOverflowing = articleElement.scrollHeight > 400;

  articleElement.classList.remove('collapsed');
  articleElement.classList.remove('can-expand');

  if (isOverflowing) {
    articleElement.classList.add('collapsed');
    articleElement.classList.add('can-expand');
  }
}
