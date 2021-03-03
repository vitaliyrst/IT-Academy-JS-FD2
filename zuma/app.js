let img = document.createElement('img');
img.src = 'ball.png';

for (let i = 0 ; i< 3000; i++) {
    let img = document.createElement('img');
    img.classList.add('img'+i);
    img.src = 'ball.png';
    document.body.append(img);
}