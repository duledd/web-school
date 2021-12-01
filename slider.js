const baseUrl = 'https://60642520f091970017785074.mockapi.io';
function getSliders() {
  let req = new Request(baseUrl + '/slider', ({ method: 'GET' }));

  fetch(req)
  .then(res => {
    console.log('res', res)
    if (res.ok) {
      return res.json();
    } else {
      throw 'Doslo je do greske';
    }
  })
  .then(arr => {
    console.log('resolved second promise', arr);
    init(arr)
  })
  .catch(err => {
    console.log(err);
  })
}
getSliders();

function init(arr) {
    render(arr[1]);
    arr.push(arr.shift());
    setInterval(() => {
      render(arr[0]);
      arr.push(arr.shift());
    }, 4000);
}

function render(element) {
    document.getElementById("slider").style.backgroundImage = "url('" + element.image + "')";

    let sliderTitle = document.querySelector('.slider-header');
    sliderTitle.textContent = element.title;

    let sliderDescription = document.querySelector('.slider-descr');
    sliderDescription.textContent = element.description;

    let sliderBtn = document.querySelector('.slider-btn');
    sliderBtn.textContent = element.link_text;
}
