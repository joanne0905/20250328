let seaweeds = []; // 儲存水草的陣列
let seaweedColors = [
  '#d9ed92', '#b5e48c', '#99d98c', '#76c893', '#52b69a',
  '#34a0a4', '#168aad', '#1a759f', '#1e6091', '#184e77'
]; // 水草顏色範圍

function setup() {
  // 全螢幕
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.style('position', 'absolute');
  canvas.style('z-index', '1'); // 確保畫布在 iframe 之上
  canvas.style('pointer-events', 'none'); // 確保滑鼠事件不會被畫布攔截

  let iframe = createElement('iframe');
  iframe.attribute('src', 'https://www.et.tku.edu.tw/');
  iframe.style('position', 'absolute');
  iframe.style('top', '10%');
  iframe.style('left', '10%'); // 調整位置
  iframe.style('width', '80%');
  iframe.style('height', '80%'); // 調整大小
  iframe.style('border', 'none'); // 移除邊框
  iframe.style('z-index', '0'); // 將 iframe 放置在畫布後面
  

  // 初始化 40 條水草，均勻分布
  let seaweedCount = 40; // 水草數量
  let spacing = width / seaweedCount; // 每條水草的間距

  for (let i = 0; i < seaweedCount; i++) {
    let baseX = i * spacing + spacing / 2; // 均勻分布的基底位置
    let height = random(100, 250); // 水草高度隨機在 100 到 250 之間
    let amplitude = random(10, 30); // 搖晃幅度隨機
    let strokeWeight = random(15, 23); // 線條粗細隨機
    let color = seaweedColors[int(random(seaweedColors.length))] + '80'; // 加入透明度（80 表示約 50% 透明）
    let frequency = random(0.01, 0.05); // 搖晃頻率隨機
    let segments = int(random(5, 15)); // 分段數量隨機

    seaweeds.push({ baseX, height, amplitude, strokeWeight, color, frequency, segments });
  }
}

function draw() {
  clear();
  blendMode(BLEND); // 設定混合模式為 BLEND，允許顏色重疊時產生透明效果

  // 繪製每條水草
  for (let seaweed of seaweeds) {
    strokeWeight(seaweed.strokeWeight); // 設定線條粗細
    stroke(seaweed.color); // 設定顏色（包含透明度）
    noFill(); // 確保不填充形狀，避免白色區域

    let baseX = seaweed.baseX;
    let baseY = height; // 水草的底部固定在畫布底部
    let amplitude = seaweed.amplitude;
    let segments = seaweed.segments;
    let segmentHeight = seaweed.height / segments; // 每段的高度
    let frequency = seaweed.frequency;

    beginShape();
    for (let i = 0; i <= segments; i++) {
      let y = baseY - i * segmentHeight; // 固定高度
      // 根據高度比例調整搖晃幅度，越靠近底部搖晃越小
      let swayFactor = i / segments; // 從 0 到 1 的比例
      let x = baseX + sin(frameCount * frequency + i * 0.5) * amplitude * swayFactor; // 左右搖晃
      vertex(x, y);
    }
    endShape(OPEN); // 使用 OPEN 明確避免連接第一點與最後一點
  }
}

// 建立 iframe 並顯示淡江大學教育科技系官網




// 當視窗大小改變時，重新設定畫布大小，物件位置
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  let seaweedCount = seaweeds.length;
  let spacing = width / seaweedCount;

  for (let i = 0; i < seaweedCount; i++) {
    seaweeds[i].baseX = i * spacing + spacing / 2;
  }
}

