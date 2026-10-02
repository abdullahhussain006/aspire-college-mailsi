const fs = require('fs');
const path = require('path');

const imgs = [
  'images/events9.jpg',
  'images/event1.jpg',
  'images/event2.jpg',
  'images/event3.jpg',
  'images/event4.jpg',
  'images/event5.jpg',
  'images/event6.jpg',
  'images/event7.jpg',
  'images/event8.jpg',
  'images/sports1.jpg',
  'images/sports2.jpg',
  'images/sports3.jpg',
  'images/sports4.jpg',
  'images/sports5.jpg',
  'images/award-ditribution.jpg',
  'images/award-ditribution2.jpg',
  'images/bs-orientation1.jpg',
  'images/bs-orientation2.jpg',
  'images/bs-orientation3.jpg',
  'images/bs-orientation4.jpg',
  'images/ptm1.jpg',
  'images/ptm2.jpg',
  'images/ptm3.jpg',
  'images/ptm4.jpg',
  'images/ptm5.jpg',
  'images/seminar1.jpg',
  'images/seminar2.jpg',
  'images/seminar3.jpg',
  'images/seminar4.jpg',
  'images/classroom-learning1.jpg',
  'images/campus-building.jpg'
];

let allOk = true;
imgs.forEach(img => {
  const full = path.join('D:/aspire-college-mailsi', img);
  if (!fs.existsSync(full)) {
    console.error('MISSING:', img);
    allOk = false;
  }
});

if (allOk) {
  console.log(`SUCCESS: All ${imgs.length} image files exist on disk!`);
}
