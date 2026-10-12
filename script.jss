/**
 * GRURU MUSEUM — Interactive Engine (script.js)
 * Features:
 * 1. Web Audio Sci-Fi Synthesizer
 * 2. Hero Node Constellation Physics Canvas
 * 3. Text Decode Scramble Effect (600ms)
 * 4. Data Booming Radial Engine (40ms Stagger & Multi-tier)
 * 5. Interactive Force-Directed Knowledge Graph Canvas (6 Categories)
 * 6. Specimen Drawer & Social Takeaway Tools
 */

// ==========================================
// 1. Audio Engine (Web Audio API Synth)
// ==========================================
class SoundFX {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
  }

  playBeep(freq = 600, duration = 0.1, type = 'sine') {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {}
  }

  playBoom() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.18);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.25);
    } catch (e) {}
  }
}

const sfx = new SoundFX();

// ==========================================
// 2. Decode Scramble Text Animation
// ==========================================
function scrambleText(element, finalText, duration = 600) {
  const chars = '0123456789ABCDEF!@#$%&*<>{}[]=';
  const start = performance.now();
  const len = finalText.length;

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const resolvedChars = Math.floor(progress * len);

    let output = '';
    for (let i = 0; i < len; i++) {
      if (i < resolvedChars || finalText[i] === ' ') {
        output += finalText[i];
      } else {
        output += chars[Math.floor(Math.random() * chars.length)];
      }
    }
    element.innerText = output;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  requestAnimationFrame(update);
}

// ==========================================
// 3. Hero Node Constellation Canvas
// ==========================================
function initHeroConstellation() {
  const canvas = document.getElementById('heroConstellationCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = canvas.offsetWidth);
  let height = (canvas.height = canvas.offsetHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
  });

  const mouse = { x: width / 2, y: height / 2, active: false };
  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.active = true;
  });

  const numNodes = 40;
  const nodes = [];
  for (let i = 0; i < numNodes; i++) {
    nodes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: Math.random() * 2 + 1.5,
      color: i % 4 === 0 ? '#D7FF3A' : i % 3 === 0 ? '#2EE6FF' : '#8A8A9E'
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Draw lines
    for (let i = 0; i < numNodes; i++) {
      for (let j = i + 1; j < numNodes; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(46, 230, 255, ${0.15 * (1 - dist / 120)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Mouse influence
      if (mouse.active) {
        const mdx = nodes[i].x - mouse.x;
        const mdy = nodes[i].y - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < 140) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(215, 255, 58, ${0.25 * (1 - mDist / 140)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Update position
      nodes[i].x += nodes[i].vx;
      nodes[i].y += nodes[i].vy;

      if (nodes[i].x < 0 || nodes[i].x > width) nodes[i].vx *= -1;
      if (nodes[i].y < 0 || nodes[i].y > height) nodes[i].vy *= -1;

      // Draw node point
      ctx.beginPath();
      ctx.arc(nodes[i].x, nodes[i].y, nodes[i].radius, 0, Math.PI * 2);
      ctx.fillStyle = nodes[i].color;
      ctx.fill();
    }

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

// ==========================================
// 4. Data Booming Interactive Engine
// ==========================================
const boomingTopics = {
  herb: {
    code: 'GRM-HERB-01',
    title: 'สมุนไพรไทย & โมเลกุลโภชนาการ',
    takeaway: 'ขมิ้นชัน มีสาร Curcuminoid ดูดซึมดีขึ้น 2000% เมื่อทานร่วมกับพริกไทยดำ (Piperine) — นำหลักผสมเครื่องแกงไทยโบราณมาเพิ่มการเผาผลาญในมื้ออาหารประจำวันทันที',
    nodes: [
      { name: 'Curcuminoid', cat: 'วิทยาศาสตร์', color: '#2EE6FF' },
      { name: 'Piperine (พริกไทยดำ)', cat: 'วิทยาศาสตร์', color: '#2EE6FF' },
      { name: 'คัมภีร์เวชศาสตร์ฉบับหลวง', cat: 'ประวัติศาสตร์', color: '#FF5A1F' },
      { name: 'การต้านอักเสบระดับเซลล์', cat: 'สุขภาพ', color: '#34E89E' },
      { name: 'อาหารเป็นยา (Food as Med)', cat: 'ภูมิปัญญา', color: '#FFC233' },
      { name: 'สิทธิบัตรสารสกัดสมุนไพร', cat: 'เทคโนโลยี', color: '#8C6BFF' },
      { name: 'สำรับแกงส้มโบราณ', cat: 'ศิลปะอาหาร', color: '#FF5FA2' },
      { name: 'ลด Metabolic Syndrome', cat: 'สุขภาพ', color: '#34E89E' }
    ]
  },
  water: {
    code: 'GRM-WATER-02',
    title: 'ระบบชลประทานสรีดภงส์ สุโขทัย',
    takeaway: 'ทำนบพระร่วง (สรีดภงส์) ใช้องศาความลาดเอียง Hydraulic Gradient 0.5% จัดการน้ำหลาก — ต้นแบบ Water Resilience ผังเมืองรับมือวิกฤต Climate Change',
    nodes: [
      { name: 'เขื่อนดินสรีดภงส์', cat: 'ประวัติศาสตร์', color: '#FF5A1F' },
      { name: 'Hydraulic Gradient 0.5%', cat: 'วิทยาศาสตร์', color: '#2EE6FF' },
      { name: 'ตระพังน้ำ 4 ทิศรอบเมือง', cat: 'สถาปัตยกรรม', color: '#FF5FA2' },
      { name: 'ภูมิปัญญาสู้ภัยแล้ง', cat: 'ภูมิปัญญา', color: '#FFC233' },
      { name: 'IoT Flood Sensor สมัยใหม่', cat: 'เทคโนโลยี', color: '#8C6BFF' },
      { name: 'ความมั่นคงทางอาหาร 700 ปี', cat: 'สังคม', color: '#34E89E' },
      { name: 'แนวคิด Sponge City สากล', cat: 'ผังเมือง', color: '#2EE6FF' }
    ]
  },
  astro: {
    code: 'GRM-ASTRO-03',
    title: 'ดาราศาสตร์สยาม & หว้ากอ',
    takeaway: 'การคำนวณสุริยุปราคาล่วงหน้า 2 ปี ของ ร.4 พิสูจน์ว่าข้อมูลเชิงประจักษ์คือเกราะป้องกันอธิปไตย — ต้นแบบ Digital Sovereignty ของไทยในยุคปัญญาประดิษฐ์',
    nodes: [
      { name: 'สุริยุปราคา 18 ส.ค. 2411', cat: 'ประวัติศาสตร์', color: '#FF5A1F' },
      { name: 'สมการคำนวณตำแหน่งดวงจันทร์', cat: 'วิทยาศาสตร์', color: '#2EE6FF' },
      { name: 'กล้องโทรทรรศน์ส่องฟ้า', cat: 'เทคโนโลยี', color: '#8C6BFF' },
      { name: 'การทูตวิทยาศาสตร์สยาม', cat: 'ยุทธศาสตร์', color: '#FFC233' },
      { name: 'หอดูดาวหว้ากอ', cat: 'สถานที่', color: '#FF5FA2' },
      { name: 'ดาวเทียม THEOS & Geo-Data', cat: 'เทคโนโลยี', color: '#8C6BFF' }
    ]
  },
  house: {
    code: 'GRM-ARCH-04',
    title: 'เรือนไทยเดิม & Passive Cooling',
    takeaway: 'หลังคาทรงจั่วสูง ชายคายื่นยาว 45 องศา และใต้ถุนโปร่ง ลดความร้อนสะสมในอาคารได้ 4–6°C โดยไม่ต้องพึ่งเครื่องปรับอากาศ — ทางออก Net-Zero สถาปัตยกรรมเขตร้อน',
    nodes: [
      { name: 'องศาชายคา 45°', cat: 'สถาปัตยกรรม', color: '#FF5FA2' },
      { name: 'Stack Effect ระบายอากาศ', cat: 'วิทยาศาสตร์', color: '#2EE6FF' },
      { name: 'ไม้สักและสลักเดือย', cat: 'เทคโนโลยีช่าง', color: '#8C6BFF' },
      { name: 'การรับมือฤดูมรสุม', cat: 'ธรรมชาติ', color: '#34E89E' },
      { name: 'Net-Zero Passive Cooling', cat: 'สิ่งแวดล้อม', color: '#34E89E' },
      { name: 'วิถีชุมชนริมน้ำ', cat: 'ภูมิปัญญา', color: '#FFC233' }
    ]
  }
};

let currentBoomTopic = 'herb';

function switchBoomTopic(key) {
  currentBoomTopic = key;
  document.querySelectorAll('.subject-tab').forEach(b => b.classList.remove('active'));
  const btn = document.querySelector(`[data-topic="${key}"]`);
  if (btn) btn.classList.add('active');

  const data = boomingTopics[key];
  document.getElementById('boomingCoreTitle').innerText = data.title;
  document.getElementById('boomingCodeLabel').innerText = data.code;
  document.getElementById('boomingTakeawayText').innerText = data.takeaway;
  triggerDataBoom();
}

function triggerDataBoom() {
  sfx.playBoom();
  const stage = document.getElementById('boomingStage');
  const container = document.getElementById('boomingNodesOverlay');
  const counter = document.getElementById('boomingConnectionCount');
  const coreNode = document.getElementById('coreBoomingNode');
  if (!container || !stage || !coreNode) return;

  const data = boomingTopics[currentBoomTopic];
  container.innerHTML = '';
  counter.innerText = '0';

  coreNode.classList.add('glow-lime');
  setTimeout(() => coreNode.classList.remove('glow-lime'), 500);

  const cx = stage.clientWidth / 2;
  const cy = stage.clientHeight / 2;
  const radius = Math.min(cx, cy) * 0.72;
  const total = data.nodes.length;

  let count = 0;

  data.nodes.forEach((node, idx) => {
    setTimeout(() => {
      sfx.playBeep(520 + idx * 45, 0.08);
      const angle = (idx / total) * 2 * Math.PI - Math.PI / 2;
      const x = cx + radius * Math.cos(angle);
      const y = cy + radius * Math.sin(angle);

      // SVG line
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('class', 'absolute inset-0 w-full h-full pointer-events-none');
      svg.innerHTML = `
        <line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="${node.color}" stroke-width="1.5" stroke-dasharray="4,4" opacity="0.6">
          <animate attributeName="stroke-dashoffset" from="12" to="0" dur="0.8s" repeatCount="indefinite" />
        </line>
      `;
      container.appendChild(svg);

      // Node card
      const nodeEl = document.createElement('div');
      nodeEl.className = 'absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-auto cursor-pointer transition-transform hover:scale-125';
      nodeEl.style.left = `${x}px`;
      nodeEl.style.top = `${y}px`;
      nodeEl.innerHTML = `
        <div class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shadow-lg" style="background-color: ${node.color}; color: #0B0B0F;">
          ●
        </div>
        <div class="px-2 py-0.5 mt-1 rounded bg-grVoid border border-grGrid text-[10px] font-mono whitespace-nowrap text-grPaper shadow">
          ${node.name}
        </div>
      `;
      nodeEl.onclick = () => {
        sfx.playBeep(880, 0.12);
        showToast(`สำรวจโหนด: ${node.name} (${node.cat})`);
      };
      container.appendChild(nodeEl);

      count++;
      counter.innerText = count;
    }, idx * 40); // 40ms stagger according to project brief!
  });
}

// ==========================================
// 5. Interactive Knowledge Graph Canvas
// ==========================================
const graphDataset = {
  nodes: [
    { id: '1', title: 'การแพทย์แผนไทย', title_en: 'Traditional Thai Medicine', cat: 'wisdom', color: '#FFC233', shape: 'triangle', val: 24, year: '1688', era: 'อยุธยา' },
    { id: '2', title: 'ขมิ้นชัน Curcumin', title_en: 'Curcuma Longa', cat: 'science', color: '#2EE6FF', shape: 'circle', val: 18, year: '1850', era: 'รัตนโกสินทร์' },
    { id: '3', title: 'คัมภีร์เวชศาสตร์ฉบับหลวง', title_en: 'Royal Medical Treatise', cat: 'history', color: '#FF5A1F', shape: 'hexagon', val: 20, year: '1870', era: 'ร.5' },
    { id: '4', title: 'สิทธิบัตรสารสกัดไทย', title_en: 'Herbal Bio-Patent', cat: 'tech', color: '#8C6BFF', shape: 'square', val: 16, year: '2024', era: 'ปัจจุบัน' },
    { id: '5', title: 'อาหารเป็นยา', title_en: 'Food as Medicine', cat: 'bio', color: '#34E89E', shape: 'diamond', val: 22, year: '1700', era: 'สืบทอดภูมิปัญญา' },
    { id: '6', title: 'ศิลปะเครื่องแกงไทย', title_en: 'Thai Curry Gastronomy', cat: 'art', color: '#FF5FA2', shape: 'ring', val: 15, year: '1767', era: 'ศิลปะวัฒนธรรม' },
    { id: '7', title: 'สุริยุปราคาหว้ากอ', title_en: 'Wakor Solar Eclipse', cat: 'history', color: '#FF5A1F', shape: 'hexagon', val: 28, year: '1868', era: 'ร.4' },
    { id: '8', title: 'ดาราศาสตร์คำนวณ', title_en: 'Empirical Astronomy', cat: 'science', color: '#2EE6FF', shape: 'circle', val: 22, year: '1868', era: 'วิทยาศาสตร์สยาม' },
    { id: '9', title: 'ดาวเทียมสำรวจ THEOS', title_en: 'THEOS Earth Satellite', cat: 'tech', color: '#8C6BFF', shape: 'square', val: 19, year: '2008', era: 'เทคโนโลยีอวกาศ' },
    { id: '10', title: 'เขื่อนดินสรีดภงส์', title_en: 'Sareedphong Dam', cat: 'history', color: '#FF5A1F', shape: 'hexagon', val: 25, year: '1292', era: 'สุโขทัย' },
    { id: '11', title: 'ชลประทานผังเมือง', title_en: 'Hydraulic Urban Planning', cat: 'science', color: '#2EE6FF', shape: 'circle', val: 20, year: '1300', era: 'วิศวกรรมชลประทาน' },
    { id: '12', title: 'ตระพังน้ำโบราณ', title_en: 'Ancient Retention Ponds', cat: 'art', color: '#FF5FA2', shape: 'ring', val: 16, year: '1350', era: 'สถาปัตยกรรมผังเมือง' },
    { id: '13', title: 'การจัดการน้ำ Sponge City', title_en: 'Sponge City Resilience', cat: 'bio', color: '#34E89E', shape: 'diamond', val: 21, year: '2026', era: 'อนาคตสภาพภูมิอากาศ' },
    { id: '14', title: 'เรือนไทยเดิมเขตร้อน', title_en: 'Tropical Thai House', cat: 'art', color: '#FF5FA2', shape: 'ring', val: 23, year: '1782', era: 'สถาปัตยกรรมไทย' },
    { id: '15', title: 'Stack Effect ระบายลม', title_en: 'Passive Cooling Physics', cat: 'science', color: '#2EE6FF', shape: 'circle', val: 17, year: '1800', era: 'ฟิสิกส์อาคาร' },
    { id: '16', title: 'สถาปัตยกรรม Net-Zero', title_en: 'Net-Zero Green Architecture', cat: 'tech', color: '#8C6BFF', shape: 'square', val: 19, year: '2026', era: 'เศรษฐกิจสีเขียว' }
  ],
  links: [
    { source: '1', target: '2', relation: 'derived_from' },
    { source: '1', target: '3', relation: 'influenced' },
    { source: '2', target: '4', relation: 'used_in' },
    { source: '2', target: '5', relation: 'used_in' },
    { source: '5', target: '6', relation: 'derived_from' },
    { source: '7', target: '8', relation: 'influenced' },
    { source: '8', target: '9', relation: 'derived_from' },
    { source: '10', target: '11', relation: 'influenced' },
    { source: '11', target: '12', relation: 'used_in' },
    { source: '11', target: '13', relation: 'derived_from' },
    { source: '14', target: '15', relation: 'influenced' },
    { source: '15', target: '16', relation: 'used_in' },
    { source: '9', target: '13', relation: 'used_in' }
  ]
};

class ForceGraphSimulation {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.nodes = [];
    this.links = [];
    this.activeFilter = 'all';
    this.searchQuery = '';
    this.hoverNode = null;
    this.dragNode = null;
    this.width = (this.canvas.width = this.canvas.offsetWidth);
    this.height = (this.canvas.height = this.canvas.offsetHeight);

    this.initData();
    this.bindEvents();
    this.animate();
  }

  initData() {
    this.nodes = graphDataset.nodes.map(n => ({
      ...n,
      x: this.width / 2 + (Math.random() - 0.5) * 350,
      y: this.height / 2 + (Math.random() - 0.5) * 280,
      vx: 0,
      vy: 0
    }));

    this.links = graphDataset.links.map(l => ({
      ...l,
      sourceNode: this.nodes.find(n => n.id === l.source),
      targetNode: this.nodes.find(n => n.id === l.target)
    }));
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.width = this.canvas.width = this.canvas.offsetWidth;
      this.height = this.canvas.height = this.canvas.offsetHeight;
    });

    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (this.dragNode) {
        this.dragNode.x = x;
        this.dragNode.y = y;
        return;
      }

      this.hoverNode = null;
      for (const node of this.nodes) {
        const dist = Math.hypot(node.x - x, node.y - y);
        if (dist < node.val) {
          this.hoverNode = node;
          break;
        }
      }
    });

    this.canvas.addEventListener('mousedown', (e) => {
      if (this.hoverNode) {
        this.dragNode = this.hoverNode;
      }
    });

    window.addEventListener('mouseup', () => {
      this.dragNode = null;
    });

    this.canvas.addEventListener('click', () => {
      if (this.hoverNode) {
        sfx.playBeep(740, 0.15);
        openSpecimenDrawer(this.hoverNode);
      }
    });
  }

  filterCategory(cat) {
    this.activeFilter = cat;
  }

  search(q) {
    this.searchQuery = q.toLowerCase().trim();
  }

  updatePhysics() {
    const kRepel = 2200;
    const kSpring = 0.04;
    const centerStrength = 0.015;

    // Repulsion
    for (let i = 0; i < this.nodes.length; i++) {
      const n1 = this.nodes[i];
      for (let j = i + 1; j < this.nodes.length; j++) {
        const n2 = this.nodes[j];
        const dx = n2.x - n1.x;
        const dy = n2.y - n1.y;
        const dist = Math.max(Math.hypot(dx, dy), 1);
        const force = kRepel / (dist * dist);
        const fx = (dx / dist) * force;
        const fy = (dy / dist) * force;

        n1.vx -= fx;
        n1.vy -= fy;
        n2.vx += fx;
        n2.vy += fy;
      }
    }

    // Spring links
    for (const link of this.links) {
      if (!link.sourceNode || !link.targetNode) continue;
      const dx = link.targetNode.x - link.sourceNode.x;
      const dy = link.targetNode.y - link.sourceNode.y;
      const dist = Math.hypot(dx, dy);
      const targetDist = 120;
      const force = (dist - targetDist) * kSpring;
      const fx = (dx / dist) * force;
      const fy = (dy / dist) * force;

      link.sourceNode.vx += fx;
      link.sourceNode.vy += fy;
      link.targetNode.vx -= fx;
      link.targetNode.vy -= fy;
    }

    // Center attraction & update
    for (const node of this.nodes) {
      if (node === this.dragNode) continue;
      node.vx += (this.width / 2 - node.x) * centerStrength;
      node.vy += (this.height / 2 - node.y) * centerStrength;

      node.vx *= 0.88; // Damping
      node.vy *= 0.88;

      node.x += node.vx;
      node.y += node.vy;
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Draw links
    for (const link of this.links) {
      if (!link.sourceNode || !link.targetNode) continue;
      const isVisible = (this.activeFilter === 'all' || link.sourceNode.cat === this.activeFilter || link.targetNode.cat === this.activeFilter);
      if (!isVisible) continue;

      this.ctx.beginPath();
      this.ctx.moveTo(link.sourceNode.x, link.sourceNode.y);
      this.ctx.lineTo(link.targetNode.x, link.targetNode.y);

      if (link.relation === 'influenced') {
        this.ctx.setLineDash([]);
        this.ctx.strokeStyle = 'rgba(46, 230, 255, 0.4)';
      } else if (link.relation === 'derived_from') {
        this.ctx.setLineDash([4, 4]);
        this.ctx.strokeStyle = 'rgba(215, 255, 58, 0.4)';
      } else {
        this.ctx.setLineDash([2, 4]);
        this.ctx.strokeStyle = 'rgba(255, 90, 31, 0.4)';
      }
      this.ctx.lineWidth = 1.5;
      this.ctx.stroke();
      this.ctx.setLineDash([]);
    }

    // Draw nodes
    for (const node of this.nodes) {
      const matchCat = (this.activeFilter === 'all' || node.cat === this.activeFilter);
      const matchSearch = (!this.searchQuery || node.title.toLowerCase().includes(this.searchQuery) || node.title_en.toLowerCase().includes(this.searchQuery));
      const opacity = (matchCat && matchSearch) ? 1 : 0.15;

      this.ctx.save();
      this.ctx.globalAlpha = opacity;

      // Glow if hover
      if (node === this.hoverNode) {
        this.ctx.shadowColor = node.color;
        this.ctx.shadowBlur = 18;
      }

      // Draw node shape
      this.ctx.fillStyle = node.color;
      this.ctx.strokeStyle = '#0B0B0F';
      this.ctx.lineWidth = 2;

      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, node.val / 2, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.stroke();

      // Label text
      this.ctx.fillStyle = '#F2EDE3';
      this.ctx.font = '11px "IBM Plex Sans Thai", sans-serif';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(node.title, node.x, node.y + node.val / 2 + 14);

      this.ctx.restore();
    }
  }

  animate() {
    this.updatePhysics();
    this.draw();
    requestAnimationFrame(() => this.animate());
  }
}

let graphInstance = null;

// ==========================================
// 6. Specimen Drawer & Details Modal
// ==========================================
function openSpecimenDrawer(node) {
  const drawer = document.getElementById('specimenDrawer');
  if (!drawer) return;

  document.getElementById('drawerCode').innerText = `GRM-${node.year}-${node.cat.toUpperCase()}-${node.id.padStart(3, '0')}`;
  document.getElementById('drawerTitle').innerText = node.title;
  document.getElementById('drawerTitleEn').innerText = node.title_en;
  document.getElementById('drawerEra').innerText = `${node.era} (พ.ศ. ${node.year})`;
  document.getElementById('drawerCat').innerText = node.cat.toUpperCase();
  document.getElementById('drawerCatBadge').style.backgroundColor = node.color;
  document.getElementById('drawerSummary').innerText = `องค์ความรู้สำคัญว่าด้วย ${node.title} ซึ่งถูกถอดรหัสและบันทึกไว้ในระบบ Knowledge Graph ของ GRURU MUSEUM`;
  document.getElementById('drawerTakeaway').innerText = `นำแก่นความคิดเรื่อง ${node.title} มาประยุกต์ใช้ในการตัดสินใจและสร้างสรรค์นวัตกรรมดิจิทัลในชีวิตจริง`;

  drawer.classList.add('open');
}

function closeSpecimenDrawer() {
  const drawer = document.getElementById('specimenDrawer');
  if (drawer) drawer.classList.remove('open');
}

// ==========================================
// 7. Toast Notification Utility
// ==========================================
function showToast(msg) {
  let toast = document.getElementById('siteToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'siteToast';
    toast.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#17171F;border:1px solid #D7FF3A;color:#D7FF3A;padding:8px 16px;border-radius:4px;font-family:"IBM Plex Mono",monospace;font-size:12px;z-index:999;box-shadow:0 8px 24px rgba(0,0,0,0.6);transition:all 0.3s;';
    document.body.appendChild(toast);
  }
  toast.innerText = msg;
  toast.style.opacity = '1';
  setTimeout(() => {
    toast.style.opacity = '0';
  }, 2400);
}

// ==========================================
// 8. Initialization on Window Load
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
  // Scramble main hero headline
  const heroH1 = document.getElementById('scrambleHeroTitle');
  if (heroH1) {
    scrambleText(heroH1, 'NEW KNOWLEDGE. NEW STORYTELLING.', 700);
  }

  // Init Hero Constellation
  initHeroConstellation();

  // Init Data Booming
  switchBoomTopic('herb');

  // Init Knowledge Graph
  graphInstance = new ForceGraphSimulation('knowledgeGraphCanvas');

  // Search filter listener
  const searchInput = document.getElementById('graphSearch');
  if (searchInput && graphInstance) {
    searchInput.addEventListener('input', (e) => {
      graphInstance.search(e.target.value);
    });
  }

  // Category pills listener
  document.querySelectorAll('.cat-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const cat = pill.getAttribute('data-cat');
      if (graphInstance) graphInstance.filterCategory(cat);
      sfx.playBeep(640, 0.08);
    });
  });

  // Sound toggle button
  const soundBtn = document.getElementById('soundToggleBtn');
  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      sfx.enabled = !sfx.enabled;
      soundBtn.innerText = sfx.enabled ? '🔊 SOUND: ON' : '🔇 SOUND: OFF';
      showToast(sfx.enabled ? 'เปิดระบบเสียงสังเคราะห์' : 'ปิดระบบเสียง');
    });
  }

  // Theme toggle button
  const themeBtn = document.getElementById('themeToggleBtn');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
      const isLight = document.body.classList.contains('light-mode');
      themeBtn.innerText = isLight ? '☀️ ARCHIVE LIGHT' : '🌙 VOID DARK';
      showToast(isLight ? 'เปลี่ยนเป็นโหมดกระดาษเก่า (Archive Light)' : 'เปลี่ยนเป็นโหมดห้องแล็บมืด (Void Dark)');
    });
  }
});
