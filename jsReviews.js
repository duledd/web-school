//const baseUrl = 'https://60642520f091970017785074.mockapi.io';
function getReviwes() {
  let req = new Request(baseUrl + '/reviews', ({ method: 'GET' }));

  fetch(req)
  .then(resp => {
    console.log('resp', resp)
    if (resp.ok) {
      return resp.json();
    } else {
      throw 'Doslo je do greske';
    }
  })
  .then(arrR => {
    console.log('resolved second promise', arrR);
    renderReviwes(arrR);
  })
  .catch(error => {
    console.log(error);
  })
}
getReviwes();

function renderReviwes(arrR) {
    arrR.forEach(function(el, index) {
    document.querySelectorAll('.rev-img')[index].src = el.image;
    document.querySelectorAll('.rev-name')[index].textContent = el.name;
    document.querySelectorAll('.rev-position')[index].textContent = el.position;
    document.querySelectorAll('.rev-text')[index].textContent = el.review_text;
    });
}

const curRevItems = document.getElementById('rev-item');
const leftBtnR = document.getElementById('rLeft');
const rightBtnR = document.getElementById('rRight');

const revItems = document.querySelectorAll('.reviwes-item');

let revIdx = 0

let revInterval = setInterval(run, 5000)

function run() {
  revIdx++
  changeRevImage()
}

function changeRevImage() {
    if(revIdx > revItems.length - 1) {
      revIdx = 0
    } else if (revIdx < 0) {
      revIdx = revItems.length - 1
    }
    curRevItems.style.transform = `translateX(${-revIdx * 300}px)`
}

function resetRevInterval() {
  clearInterval(interval)
  revInterval = setInterval(run, 5000)
}

rightBtnR.addEventListener('click', () => {
  revIdx++
  changeRevImage()
  resetRevInterval()
})

leftBtnR.addEventListener('click', () => {
  revIdx--
  changeRevImage()
  resetRevInterval()
})
