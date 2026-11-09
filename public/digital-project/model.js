const scene = document.querySelector('#scene');
const drawing = document.querySelector('#geometry');
const modeButtons = [...document.querySelectorAll('[data-mode]')];
const modes = {
  model: ['AX / 01', 'Объёмная модель', 'Обойдите дом вокруг, чтобы оценить форму крыши, вход и остекление.'],
  front: ['EL / 02', 'Главный фасад', 'На фасаде видно, как вход и остекление расположены под двускатной крышей.'],
  plan: ['PL / 03', 'План этажа', 'Гостиная выходит к остеклённому фасаду. За ней расположены спальня, кабинет и холл.'],
};
let mode = 'model';
let angle = -0.56;
let drag = null;

const front = (x, y) => [x, y, 0];
const back = (x, y) => [x, y, 8];
const faces = [
  {points:[front(0,0),front(12,0),front(12,3.2),front(6,5.7),front(0,3.2)],fill:'#0c3349'},
  {points:[back(0,0),back(12,0),back(12,3.2),back(6,5.7),back(0,3.2)],fill:'#0c3349'},
  {points:[front(0,0),back(0,0),back(0,3.2),front(0,3.2)],fill:'#10253d'},
  {points:[front(12,0),back(12,0),back(12,3.2),front(12,3.2)],fill:'#10253d'},
  {points:[front(0,3.2),front(6,5.7),back(6,5.7),back(0,3.2)],fill:'#0b2e43'},
  {points:[front(6,5.7),front(12,3.2),back(12,3.2),back(6,5.7)],fill:'#0b2e43'},
];
const details = [];
for (const x of [1.0, 4.1, 7.2, 9.7]) {
  details.push([front(x,.45),front(x+1.65,.45),front(x+1.65,2.6),front(x,2.6),front(x,.45)]);
  details.push([front(x+.825,.45),front(x+.825,2.6)]);
}
details.push([front(5.65,0),front(5.65,2.45),front(6.95,2.45),front(6.95,0)]);
for (const z of [1.7, 4.5]) {
  for (const x of [0,12]) details.push([[x,.9,z],[x,2.5,z],[x,2.5,z+1.7],[x,.9,z+1.7],[x,.9,z]]);
}
for (let z=1; z<8; z++) details.push([[0,3.2,z],[6,5.7,z],[12,3.2,z]]);
details.push([back(1.1,1),back(4.7,1),back(4.7,2.55),back(1.1,2.55),back(1.1,1)]);
details.push([back(7.3,1),back(10.9,1),back(10.9,2.55),back(7.3,2.55),back(7.3,1)]);

function project([x,y,z]) {
  x -= 6;
  z -= 4;
  if (mode === 'front') return [380+x*42, 365-y*42];
  if (mode === 'plan') return [380+x*40, 235+z*40];
  const across = x*Math.cos(angle)-z*Math.sin(angle);
  const depth = x*Math.sin(angle)+z*Math.cos(angle);
  return [380+across*33, 290+(depth*.52-y*.94)*33];
}

function points(vertices) {
  return vertices.map(vertex => project(vertex).map(value => value.toFixed(1)).join(',')).join(' ');
}

function line(vertices, color = '#65e6ff', width = 1.35) {
  return `<polyline points="${points(vertices)}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linejoin="round"/>`;
}

function model() {
  const base = [];
  for (let x=-2; x<=14; x+=1) base.push(line([[x,-.06,-2],[x,-.06,10]],'#2e647677',.8));
  for (let z=-2; z<=10; z+=1) base.push(line([[-2,-.06,z],[14,-.06,z]],'#2e647677',.8));
  const panes = faces.map(face => `<polygon points="${points(face.points)}" fill="${face.fill}" fill-opacity=".37" stroke="#69e7ff" stroke-width="1.55" stroke-linejoin="round"/>`).join('');
  const edges = details.map(vertices => line(vertices,'#58cde5b5')).join('');
  return base.join('')+`<g filter="url(#glow)" opacity=".72">${panes}${edges}</g>${panes}${edges}`;
}

function elevation() {
  const outline = faces[0].points;
  return `<polygon points="${points(outline)}" fill="#0d3147" stroke="#6de7ff" stroke-width="2"/>` +
    details.filter(vertices => vertices.every(vertex => vertex[2] === 0)).map(vertices => line(vertices)).join('') +
    `<path d="M128 378v17m0-8h504m0-9v17" fill="none" stroke="#7da8bd"/><text class="dim" x="356" y="411">12 000</text>`;
}

function plan() {
  const walls = [ [[0,0,0],[12,0,0],[12,0,8],[0,0,8],[0,0,0]], [[0,0,4.6],[4.4,0,4.6]], [[5.5,0,4.6],[7.4,0,4.6]], [[8.5,0,4.6],[12,0,4.6]], [[4.4,0,4.6],[4.4,0,8]], [[7.4,0,4.6],[7.4,0,8]] ];
  const rooms = [['Гостиная',6,2.2],['Спальня',2.2,6.4],['Холл',5.9,6.4],['Кабинет',9.65,6.4]];
  return `<polygon points="${points(walls[0])}" fill="#0d3147"/>` + walls.map(vertices => line(vertices,'#63e5ff',2.5)).join('') + rooms.map(([label,x,z]) => {
    const [sx,sy] = project([x,0,z]);
    return `<text class="room" x="${sx}" y="${sy}">${label}</text>`;
  }).join('') + `<path d="M140 404v17m0-8h480m0-9v17 M644 75h16m-8 0v320m-8 0h16" fill="none" stroke="#7da8bd"/><text class="dim" x="352" y="439">12 000</text><text class="dim" x="675" y="219" transform="rotate(90 675 219)">8 000</text>`;
}

function render() {
  drawing.innerHTML = mode === 'model' ? model() : mode === 'front' ? elevation() : plan();
  document.querySelector('#angle').textContent = mode === 'model' ? `Азимут ${Math.round((angle*180/Math.PI%360+360)%360)}°` : 'Размеры в мм';
}

function setMode(next) {
  mode = next;
  scene.dataset.mode = mode;
  scene.tabIndex = mode === 'model' ? 0 : -1;
  const [id,status,description] = modes[mode];
  document.querySelector('#mode-id').textContent = id;
  document.querySelector('#scene-status').textContent = status;
  document.querySelector('#mode-description').textContent = description;
  document.querySelector('#turn-controls').hidden = mode !== 'model';
  document.querySelector('#help').hidden = mode !== 'model';
  modeButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.mode === mode)));
  render();
}

function turn(delta) { angle += delta; render(); }
modeButtons.forEach(button => button.addEventListener('click', () => setMode(button.dataset.mode)));
document.querySelector('#left').addEventListener('click', () => turn(-.28));
document.querySelector('#right').addEventListener('click', () => turn(.28));
document.querySelector('#reset').addEventListener('click', () => { angle = -.56; render(); });
scene.addEventListener('keydown', event => {
  if (mode !== 'model' || !['ArrowLeft','ArrowRight'].includes(event.key)) return;
  event.preventDefault();
  turn(event.key === 'ArrowLeft' ? -.18 : .18);
});
scene.addEventListener('pointerdown', event => {
  if (mode !== 'model' || event.button !== 0 || drag) return;
  drag = {id:event.pointerId, x:event.clientX};
  scene.setPointerCapture(event.pointerId);
  scene.classList.add('dragging');
});
scene.addEventListener('pointermove', event => {
  if (drag?.id !== event.pointerId) return;
  turn((event.clientX-drag.x)*.009);
  drag.x = event.clientX;
});
scene.addEventListener('lostpointercapture', event => {
  if (drag?.id !== event.pointerId) return;
  drag = null;
  scene.classList.remove('dragging');
});
setMode('model');
