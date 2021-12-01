// const baseUrl1 = 'https://60642520f091970017785074.mockapi.io';
function getCourses() {
  let req = new Request(baseUrl + '/courses', ({ method: 'GET' }));

  fetch(req)
  .then(resp => {
    console.log('resp', resp)
    if (resp.ok) {
      return resp.json();
    } else {
      throw 'Doslo je do greske';
    }
  })
  .then(arrC => {
    console.log('resolved second promise', arrC);
    renderCourses(arrC);
  })
  .catch(error => {
    console.log(error);
  })
}
getCourses();

function renderCourses(arrC) {
    arrC.forEach(function(el, index){
    document.querySelectorAll('.img-course')[index].src = el.image;
    document.querySelectorAll('.course-date')[index].textContent = el.date;
    document.querySelectorAll('.course-duration')[index].textContent = el.duration + ' Hours';
    document.querySelectorAll('.course-title')[index].textContent = el.title;
    document.querySelectorAll('.course-descr')[index].textContent = el.description;
    document.querySelectorAll('.course-teacher')[index].textContent = el.teacher;
    document.querySelectorAll('.course-teacher-img')[index].src = el.teacher_image;
    if(el.price !== 0){
      document.querySelectorAll('.btn-price')[index].textContent = `${el.currency} ${el.price}`;
      document.querySelectorAll('.btn-price')[index].classList.add('pay');
    } else{
        document.querySelectorAll('.btn-price')[index].textContent = 'Free';
        document.querySelectorAll('.btn-price')[index].classList.add('free');
    }
    });
}

const carouselItems = document.getElementById('cour-items');
const leftBtn = document.getElementById('left');
const rightBtn = document.getElementById('right');

const coursesItems = document.querySelectorAll('.courses-item');

let idx = 0
let interval = setInterval(run, 4000)

function run() {
  idx++
  changeImage()
}

function changeImage() {
    if(idx > coursesItems.length - 1) {
      idx = 0
    } else if (idx < 0) {
      idx = coursesItems.length - 1
    }
    carouselItems.style.transform = `translateX(${-idx * 306}px)`
}

function resetInterval() {
  clearInterval(interval)
  interval = setInterval(run, 4000)
}
rightBtn.addEventListener('click', () => {
  idx++
  changeImage()
  resetInterval()
})

leftBtn.addEventListener('click', () => {
  idx--
  changeImage()
  resetInterval()
})