<template>
  <main class="screen-shell">
    <header class="topbar">
      <div>
        <p class="eyebrow">Industrial Safety Operation Center</p>
        <h1>工业园区人员定位安全监管平台</h1>
      </div>
      <div class="top-actions">
        <button @click="resetView">园区总览</button>
        <button @click="triggerAlarm">模拟危险品报警</button>
      </div>
    </header>

    <section class="dashboard-grid">
      <!-- 左侧面板：展示平台概览、子园区状态和楼层剖切入口。 -->
      <aside class="panel left-panel">
        <h2>运行概览</h2>
        <div class="metric-grid">
          <article v-for="item in metrics" :key="item.label" class="metric-card">
            <span>{{ item.label }}</span>
            <strong>{{ item.value }}</strong>
          </article>
        </div>

        <h2>子园区状态</h2>
        <!-- 点击子园区时，会联动 Three.js 场景进入该园区内部视角。 -->
        <button
          v-for="park in parks"
          :key="park.id"
          class="park-row"
          :class="{ active: selectedParkId === park.id, alarm: park.status === 'alarm' }"
          @click="focusPark(park.id)"
        >
          <span>{{ park.name }}</span>
          <b>{{ park.status === 'alarm' ? '高危报警' : '运行正常' }}</b>
        </button>

        <h2>楼层剖切</h2>
        <div class="floor-tabs">
          <!-- 只有进入子园区内部视角后，楼层剖切按钮才允许点击。 -->
          <button
            v-for="floor in floors"
            :key="floor.id"
            :class="{ active: selectedFloorId === floor.id }"
            :disabled="!isInsidePark"
            @click="showFloor(floor.id)"
          >
            {{ floor.name }}
          </button>
        </div>
      </aside>

      <!-- 中间区域：Three.js 会把 WebGL canvas 挂载到 sceneRoot 上。 -->
      <section class="scene-card">
        <div ref="sceneRoot" class="scene-root"></div>
        <div
          v-if="hoverInfo.visible"
          class="person-tooltip"
          :style="{ left: `${hoverInfo.x}px`, top: `${hoverInfo.y}px` }"
        >
          <strong>{{ hoverInfo.name }}</strong>
          <span>状态：{{ hoverInfo.statusText }}</span>
          <span>位置：{{ hoverInfo.parkName }} / {{ hoverInfo.floorName }}</span>
          <span>活动范围：{{ hoverInfo.activityRange }}</span>
        </div>
        <div class="scene-hint">
          点击子园区进入内部视角，点击楼层实现楼层显隐，报警园区会出现红色安全围栏
        </div>
      </section>

      <!-- 右侧面板：展示当前报警事件和人员定位列表。 -->
      <aside class="panel right-panel">
        <section class="right-section">
          <h2>报警事件</h2>
          <article class="alarm-card">
            <span class="alarm-level">一级报警</span>
            <h3>{{ currentAlarm.personName }} 触发危险品区域报警</h3>
            <p>位置：{{ currentAlarm.parkName }} / {{ currentAlarm.buildingName }} / {{ currentAlarm.floorName }}</p>
            <p>时间：{{ currentAlarm.time }}</p>
          </article>
        </section>

        <section class="right-section person-section">
          <h2>人员定位</h2>
          <div class="person-list">
            <div v-for="person in persons" :key="person.id" class="person-row">
              <span>{{ person.name }}</span>
              <b :class="person.status">{{ person.statusText }}</b>
            </div>
          </div>
        </section>

      </aside>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import gsap from 'gsap';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

type ParkStatus = 'normal' | 'alarm';

// 子园区基础数据：这里用 Mock 数据模拟真实园区，x/z 用来控制园区在 3D 场景中的位置。
interface ParkItem {
  id: string;
  name: string;
  status: ParkStatus;
  x: number;
  z: number;
}

// 人员定位数据：每个人绑定所属园区、楼层和局部坐标，用于在 Three.js 场景中生成人员点位。
interface PersonItem {
  id: string;
  name: string;
  status: 'danger' | 'normal';
  statusText: string;
  activityRange: string;
  parkId: string;
  floorId: string;
  x: number;
  z: number;
}

// WebGL 容器 DOM。Three.js 的 renderer.domElement 会挂载到这个元素里。
const sceneRoot = ref<HTMLDivElement | null>(null);

// 当前选中的子园区和楼层，用于左侧 UI、右侧报警信息和 Three.js 显隐逻辑联动。
const selectedParkId = ref('park-a');
const selectedFloorId = ref('floor-1');

// 是否已经进入某个子园区内部视角。总览状态下不允许直接做楼层剖切。
const isInsidePark = ref(false);

// 人员点位 hover 信息。鼠标移到人员图标上时，会在 3D 场景上方显示业务信息卡片。
const hoverInfo = ref({
  visible: false,
  x: 0,
  y: 0,
  name: '',
  statusText: '',
  parkName: '',
  floorName: '',
  activityRange: '',
});

// 子园区列表：A 区默认处于报警状态，用来展示“谁报警谁显示红色围栏”的效果。
const parks = ref<ParkItem[]>([
  { id: 'park-a', name: 'A区危化品仓储园区', status: 'alarm', x: -8, z: -2 },
  { id: 'park-b', name: 'B区精密制造园区', status: 'normal', x: 2, z: -2 },
  { id: 'park-c', name: 'C区能源动力园区', status: 'normal', x: -3, z: 7 },
]);

// 楼层配置：当前 Demo 固定为三层，后续可以扩展为每个园区独立楼层数。
const floors = [
  { id: 'floor-1', name: '一层' },
  { id: 'floor-2', name: '二层' },
  { id: 'floor-3', name: '三层' },
];

// 左侧运行概览指标。这里只是前端 Mock，真实项目一般来自接口。
const metrics = [
  { label: '在线人员', value: '326' },
  { label: '危险区域', value: '12' },
  { label: '今日报警', value: '7' },
  { label: '处置率', value: '96%' },
];

// 人员定位 Mock 数据。danger 表示报警人员，normal 表示正常人员。
// x/z 是相对于所在子园区楼体中心的局部坐标，不是全局坐标。
const persons: PersonItem[] = [
  { id: 'p1', name: '人员A', status: 'danger', statusText: '危险区报警', activityRange: 'A区一层危化品仓库北侧', parkId: 'park-a', floorId: 'floor-1', x: -1.15, z: -0.65 },
  { id: 'p2', name: '人员B', status: 'normal', statusText: '在线', activityRange: 'B区二层装配线东侧', parkId: 'park-b', floorId: 'floor-2', x: 0.7, z: 0.25 },
  { id: 'p3', name: '人员C', status: 'normal', statusText: '巡检中', activityRange: 'C区一层动力设备间', parkId: 'park-c', floorId: 'floor-1', x: 0.95, z: 0.55 },
  { id: 'p4', name: '人员D', status: 'normal', statusText: '在线', activityRange: 'C区三层值守通道', parkId: 'park-c', floorId: 'floor-3', x: -0.75, z: 0.75 },
  { id: 'p5', name: '人员E', status: 'normal', statusText: '在线', activityRange: 'A区一层入库通道', parkId: 'park-a', floorId: 'floor-1', x: 0.85, z: 0.55 },
  { id: 'p6', name: '人员F', status: 'normal', statusText: '巡检中', activityRange: 'A区二层巡检走廊', parkId: 'park-a', floorId: 'floor-2', x: -0.4, z: 0.85 },
  { id: 'p7', name: '人员G', status: 'normal', statusText: '在线', activityRange: 'A区三层设备平台', parkId: 'park-a', floorId: 'floor-3', x: 1.15, z: -0.45 },
  { id: 'p8', name: '人员H', status: 'normal', statusText: '在线', activityRange: 'B区一层物料暂存区', parkId: 'park-b', floorId: 'floor-1', x: -1.05, z: 0.7 },
  { id: 'p9', name: '人员I', status: 'normal', statusText: '巡检中', activityRange: 'B区二层质检工位', parkId: 'park-b', floorId: 'floor-2', x: -0.25, z: -0.75 },
  { id: 'p10', name: '人员J', status: 'normal', statusText: '在线', activityRange: 'B区三层维修间', parkId: 'park-b', floorId: 'floor-3', x: 1.2, z: 0.75 },
  { id: 'p11', name: '人员K', status: 'normal', statusText: '巡检中', activityRange: 'C区二层动力管廊', parkId: 'park-c', floorId: 'floor-2', x: 0.1, z: -0.85 },
  { id: 'p12', name: '人员L', status: 'normal', statusText: '在线', activityRange: 'C区三层控制室', parkId: 'park-c', floorId: 'floor-3', x: 1.15, z: -0.2 },
];

// 当前报警卡片信息。这里根据 selectedParkId / selectedFloorId 动态展示位置。
const currentAlarm = computed(() => ({
  personName: '人员A',
  parkName: parks.value.find((item) => item.id === selectedParkId.value)?.name ?? 'A区危化品仓储园区',
  buildingName: '1号危化品仓库',
  floorName: floors.find((item) => item.id === selectedFloorId.value)?.name ?? '一层',
  time: '2026-08-12 14:30:21',
}));

// Three.js 核心对象。这里用 let 是因为它们要在 onMounted 后才能拿到 DOM 尺寸并初始化。
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let controls: OrbitControls;
let raycaster: THREE.Raycaster;
let pointer: THREE.Vector2;
let animationFrame = 0;

// 可被鼠标点击拾取的对象集合。Raycaster 只检测这里面的对象，避免误点标签/特效。
const clickableObjects: THREE.Object3D[] = [];

// 按业务 id 缓存 Three.js 对象，后续做“园区显隐、楼层剖切、报警围栏”时直接查 Map。
const parkGroups = new Map<string, THREE.Group>();
const floorGroups = new Map<string, THREE.Group[]>();
const alarmRings = new Map<string, THREE.Mesh>();

// 人员点位和报警特效对象集合，用于动画循环里统一更新闪烁、脉冲和发光效果。
const personMarkers: THREE.Group[] = [];
const alarmEffects: THREE.Object3D[] = [];

/**
 * 创建文字 Sprite。
 *
 * Three.js 原生没有直接显示中文标签的 DOM 文本，这里先把文字画到 canvas，
 * 再把 canvas 转成 CanvasTexture，最后贴到 Sprite 上显示在 3D 场景里。
 */
function createTextSprite(text: string, options: { background?: string; color?: string; fontSize?: number } = {}) {
  const canvas = document.createElement('canvas');
  canvas.width = 320;
  canvas.height = 96;
  const context = canvas.getContext('2d');
  if (context) {
    context.fillStyle = options.background ?? 'rgba(5, 14, 32, 0.72)';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = options.color ?? '#ffffff';
    context.font = `${options.fontSize ?? 30}px Microsoft YaHei, sans-serif`;
    context.textAlign = 'center';
    context.fillText(text, canvas.width / 2, 58);
  }
  const texture = new THREE.CanvasTexture(canvas);
  const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(4.6, 1.35, 1);
  return sprite;
}

/**
 * 创建一个标准立方体 Mesh。
 *
 * 园区底座、楼层板、危险区域块都走这个方法，保证材质风格统一。
 */
function makeBox(width: number, height: number, depth: number, color: string, opacity = 1) {
  const geometry = new THREE.BoxGeometry(width, height, depth);
  const material = new THREE.MeshStandardMaterial({
    color,
    transparent: opacity < 1,
    opacity,
    roughness: 0.55,
    metalness: 0.08,
  });
  return new THREE.Mesh(geometry, material);
}

// 给人员点位里的可拾取 Mesh 写入统一 userData，hover 时可从命中对象反查人员业务信息。
function bindPersonHitArea(object: THREE.Object3D, person: PersonItem) {
  object.userData = { type: 'person', id: person.id };
  clickableObjects.push(object);
}

/**
 * 创建人员点位。
 *
 * 点位由三部分组成：
 * 1. 球体：人员主体；
 * 2. 竖杆 + 地面圆环：提高远距离识别度；
 * 3. 姓名标签：正常为蓝色，报警为红色。
 *
 * 报警人员会额外添加一个 pulse 圆环，在 animate 中持续做呼吸扩散。
 */
function createPersonMarker(person: PersonItem, floorIndex: number) {
  const marker = new THREE.Group();
  marker.position.set(person.x, 1.1 + floorIndex * 1.05, person.z);
  marker.userData = { type: 'person', id: person.id, parkId: person.parkId, floorId: person.floorId };

  const color = person.status === 'danger' ? '#ff3b5c' : '#50e3a4';
  const body = new THREE.Mesh(
    new THREE.SphereGeometry(0.16, 24, 24),
    new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.35 }),
  );
  bindPersonHitArea(body, person);
  marker.add(body);

  const pole = new THREE.Mesh(
    new THREE.CylinderGeometry(0.035, 0.035, 0.45, 16),
    new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.2 }),
  );
  pole.position.y = -0.29;
  bindPersonHitArea(pole, person);
  marker.add(pole);

  const base = new THREE.Mesh(
    new THREE.RingGeometry(0.22, 0.32, 32),
    new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.9, side: THREE.DoubleSide }),
  );
  base.rotation.x = Math.PI / 2;
  base.position.y = -0.52;
  bindPersonHitArea(base, person);
  marker.add(base);

  if (person.status === 'danger') {
    const pulse = new THREE.Mesh(
      new THREE.RingGeometry(0.38, 0.5, 40),
      new THREE.MeshBasicMaterial({ color: '#ff2d55', transparent: true, opacity: 0.9, side: THREE.DoubleSide }),
    );
    pulse.rotation.x = Math.PI / 2;
    pulse.position.y = -0.5;
    pulse.userData = { type: 'person', id: person.id, pulse: true };
    clickableObjects.push(pulse);
    marker.add(pulse);
  }

  const labelColor = person.status === 'danger' ? '#ff3b5c' : '#66b7ff';
  const labelBackground = person.status === 'danger' ? 'rgba(74, 11, 27, 0.78)' : 'rgba(12, 50, 96, 0.78)';
  const label = createTextSprite(person.name, { background: labelBackground, color: labelColor, fontSize: 34 });
  label.position.set(0, 0.72, 0);
  label.scale.set(1.45, 0.42, 1);
  marker.add(label);
  personMarkers.push(marker);
  return marker;
}

/**
 * 创建危险报警光柱。
 *
 * 光柱由 beam 和 halo 组成：
 * - beam：竖向半透明红色圆柱，模拟报警光束；
 * - halo：地面扩散红环，模拟危险区域辐射范围。
 */
function createAlarmBeacon() {
  const beacon = new THREE.Group();

  const beam = new THREE.Mesh(
    new THREE.CylinderGeometry(0.18, 0.42, 3.2, 32, 1, true),
    new THREE.MeshBasicMaterial({
      color: '#ff2d55',
      transparent: true,
      opacity: 0.38,
      side: THREE.DoubleSide,
      depthWrite: false,
    }),
  );
  beam.position.y = 1.95;
  beam.userData = { alarmEffect: 'beam' };
  beacon.add(beam);

  const halo = new THREE.Mesh(
    new THREE.RingGeometry(0.45, 1.05, 64),
    new THREE.MeshBasicMaterial({
      color: '#ff2d55',
      transparent: true,
      opacity: 0.72,
      side: THREE.DoubleSide,
      depthWrite: false,
    }),
  );
  halo.rotation.x = Math.PI / 2;
  halo.position.y = 0.08;
  halo.userData = { alarmEffect: 'halo' };
  beacon.add(halo);

  alarmEffects.push(beam, halo);
  return beacon;
}

/**
 * 创建一个子园区的完整 3D 结构。
 *
 * 每个子园区包含：
 * - 园区底座；
 * - 三层楼板；
 * - 每层危险区域块；
 * - 绑定到对应楼层的人员点位；
 * - 园区名称标签；
 * - 报警红色围栏。
 */
function createPark(park: ParkItem) {
  const group = new THREE.Group();
  group.position.set(park.x, 0, park.z);
  group.userData = { type: 'park', id: park.id };

  const base = makeBox(7.4, 0.18, 5.4, '#1a4268', 0.92);
  base.position.y = 0.09;
  base.userData = { type: 'park', id: park.id };
  group.add(base);
  clickableObjects.push(base);

  // floorStack 用来保存当前园区的全部楼层，后续楼层剖切时按楼层显示/隐藏。
  const floorStack: THREE.Group[] = [];
  floors.forEach((floor, index) => {
    const floorGroup = new THREE.Group();
    floorGroup.userData = { type: 'floor', id: floor.id, parkId: park.id };
    const slab = makeBox(4.5, 0.38, 3.2, index === 0 ? '#4a8fca' : '#2f6ea5', 0.9);
    slab.position.set(0, 0.7 + index * 1.05, 0);
    slab.userData = { type: 'floor', id: floor.id, parkId: park.id };
    floorGroup.add(slab);
    clickableObjects.push(slab);

    // 危险区域块：报警园区里的危险区域会在动画循环中持续发光。
    const dangerZone = makeBox(1.1, 0.08, 1.1, '#ef4444', 0.68);
    dangerZone.position.set(-1.15, 0.93 + index * 1.05, -0.65);
    dangerZone.userData = { alarmEffect: 'dangerZone' };
    floorGroup.add(dangerZone);
    if (park.status === 'alarm') {
      alarmEffects.push(dangerZone);
    }

    if (park.status === 'alarm' && index === 0) {
      const beacon = createAlarmBeacon();
      beacon.position.set(-1.15, 0.98 + index * 1.05, -0.65);
      floorGroup.add(beacon);
    }

    // 把属于当前园区、当前楼层的人员挂到该楼层 Group 下。
    // 这样隐藏楼层时，人员点位会跟着楼层一起隐藏。
    persons
      .filter((person) => person.parkId === park.id && person.floorId === floor.id)
      .forEach((person) => {
        floorGroup.add(createPersonMarker(person, index));
      });

    group.add(floorGroup);
    floorStack.push(floorGroup);
  });

  // 园区名称标签。它是 Sprite，会始终面向相机。
  const label = createTextSprite(park.name);
  label.position.set(0, 4.5, 0);
  group.add(label);

  // 红色围栏：所有园区都会创建，但只有报警园区会在 animate 中显示并播放动画。
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(4.5, 0.06, 12, 96),
    new THREE.MeshBasicMaterial({ color: '#ff2d55', transparent: true, opacity: park.status === 'alarm' ? 1 : 0 }),
  );
  ring.rotation.x = Math.PI / 2;
  ring.position.y = 0.36;
  group.add(ring);

  parkGroups.set(park.id, group);
  floorGroups.set(park.id, floorStack);
  alarmRings.set(park.id, ring);
  scene.add(group);
}

/**
 * 初始化 Three.js 场景。
 *
 * 这里完成 scene、camera、renderer、controls、灯光、网格、园区模型等初始化，
 * 并注册点击拾取和窗口尺寸变化事件。
 */
function initScene() {
  if (!sceneRoot.value) return;
  scene = new THREE.Scene();
  scene.background = new THREE.Color('#06101f');

  camera = new THREE.PerspectiveCamera(48, sceneRoot.value.clientWidth / sceneRoot.value.clientHeight, 0.1, 1000);
  camera.position.set(10, 12, 17);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(sceneRoot.value.clientWidth, sceneRoot.value.clientHeight);
  sceneRoot.value.appendChild(renderer.domElement);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.target.set(-2, 1.2, 1.5);

  raycaster = new THREE.Raycaster();
  pointer = new THREE.Vector2();

  // 环境光 + 方向光：保证模型整体有亮度，同时保留一点立体阴影感。
  scene.add(new THREE.AmbientLight('#9fc7ff', 1.5));
  const mainLight = new THREE.DirectionalLight('#ffffff', 2.6);
  mainLight.position.set(8, 16, 8);
  scene.add(mainLight);

  const grid = new THREE.GridHelper(34, 34, '#2e5d87', '#12304f');
  scene.add(grid);

  // 根据 Mock 数据生成所有子园区。
  parks.value.forEach(createPark);

  // 初始状态是园区总览，不进入楼层剖切。showFloor 内部会因为 isInsidePark=false 直接 return。
  showFloor(selectedFloorId.value);

  renderer.domElement.addEventListener('pointerdown', handlePick);
  renderer.domElement.addEventListener('pointermove', handleHover);
  renderer.domElement.addEventListener('pointerleave', hideHoverInfo);
  window.addEventListener('resize', handleResize);
  animate();
}

/**
 * Three.js 点击拾取。
 *
 * 鼠标点击后需要把屏幕坐标转换成标准设备坐标，再用 Raycaster 从相机方向发射射线，
 * 判断射线命中的对象是“园区底座”还是“楼层板”，从而触发不同业务交互。
 */
function handlePick(event: PointerEvent) {
  const rect = renderer.domElement.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
  const hit = raycaster.intersectObjects(clickableObjects, true)[0];
  if (!hit) return;

  const data = hit.object.userData;

  // 点击园区：进入该园区内部视角，并隐藏其他园区。
  if (data.type === 'park') {
    focusPark(data.id);
  }

  // 点击楼层：只有进入内部视角后才允许剖切，避免总览态误点楼层。
  if (data.type === 'floor' && isInsidePark.value) {
    selectedParkId.value = data.parkId;
    showFloor(data.id);
  }
}

/**
 * 人员点位 hover 拾取。
 *
 * 与点击拾取共用 Raycaster，但这里只关心 userData.type === 'person' 的对象。
 * 命中人员后，把业务信息写入 hoverInfo，模板里的 person-tooltip 会显示出来。
 */
function handleHover(event: PointerEvent) {
  const rect = renderer.domElement.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);

  const hit = raycaster.intersectObjects(clickableObjects, true).find((item) => item.object.userData.type === 'person');
  if (!hit) {
    hideHoverInfo();
    return;
  }

  const person = persons.find((item) => item.id === hit.object.userData.id);
  if (!person) {
    hideHoverInfo();
    return;
  }

  hoverInfo.value = {
    visible: true,
    x: event.clientX - rect.left + 16,
    y: event.clientY - rect.top + 16,
    name: person.name,
    statusText: person.statusText,
    parkName: parks.value.find((item) => item.id === person.parkId)?.name ?? '',
    floorName: floors.find((item) => item.id === person.floorId)?.name ?? '',
    activityRange: person.activityRange,
  };
}

function hideHoverInfo() {
  hoverInfo.value.visible = false;
}

/**
 * 进入某个子园区内部视角。
 *
 * 交互规则：
 * - 只显示被点击的子园区；
 * - 进入时保留该园区全部楼层；
 * - 使用 GSAP 平滑移动相机和控制器 target。
 */
function focusPark(parkId: string) {
  selectedParkId.value = parkId;
  isInsidePark.value = true;
  parkGroups.forEach((parkGroup, id) => {
    parkGroup.visible = id === parkId;
  });
  const stack = floorGroups.get(parkId);
  stack?.forEach((floorGroup) => {
    floorGroup.visible = true;
  });

  const group = parkGroups.get(parkId);
  if (!group) return;
  const target = new THREE.Vector3();
  group.getWorldPosition(target);

  gsap.to(camera.position, {
    x: target.x + 5.5,
    y: 7.2,
    z: target.z + 7,
    duration: 0.8,
    ease: 'power2.out',
  });
  gsap.to(controls.target, {
    x: target.x,
    y: 1.7,
    z: target.z,
    duration: 0.8,
    ease: 'power2.out',
  });
}

/**
 * 楼层剖切。
 *
 * 只有内部视角才允许执行。执行后只显示当前楼层，其他楼层隐藏。
 */
function showFloor(floorId: string) {
  if (!isInsidePark.value) return;
  selectedFloorId.value = floorId;
  const stack = floorGroups.get(selectedParkId.value);
  stack?.forEach((floorGroup) => {
    const active = floorGroup.userData.id === floorId;
    floorGroup.visible = active;
  });
}

/**
 * 返回园区总览。
 *
 * 恢复全部园区和全部楼层，同时把 isInsidePark 置为 false，
 * 让楼层按钮和楼层点击重新进入禁用状态。
 */
function resetView() {
  selectedParkId.value = 'park-a';
  isInsidePark.value = false;
  parkGroups.forEach((parkGroup) => {
    parkGroup.visible = true;
  });
  floorGroups.forEach((stack) => {
    stack.forEach((floorGroup) => {
      floorGroup.visible = true;
    });
  });
  gsap.to(camera.position, { x: 10, y: 12, z: 17, duration: 0.8, ease: 'power2.out' });
  gsap.to(controls.target, { x: -2, y: 1.2, z: 1.5, duration: 0.8, ease: 'power2.out' });
}

/**
 * 模拟危险品报警。
 *
 * 当前选中园区会被设置为 alarm，之后 animate 会根据 parks 里的报警状态
 * 持续显示该园区的红色围栏和相关报警特效。
 */
function triggerAlarm() {
  const ring = alarmRings.get(selectedParkId.value);
  const park = parks.value.find((item) => item.id === selectedParkId.value);
  if (park) park.status = 'alarm';
  if (ring && ring.material instanceof THREE.MeshBasicMaterial) {
    gsap.to(ring.material, { opacity: 1, duration: 0.2 });
  }
}

/**
 * 渲染循环。
 *
 * requestAnimationFrame 会持续调用 animate，用来做：
 * - OrbitControls 阻尼更新；
 * - 报警围栏呼吸/旋转；
 * - 报警人员脉冲；
 * - 光柱、扩散环和危险区域发光；
 * - 最终 renderer.render(scene, camera) 绘制画面。
 */
function animate() {
  animationFrame = requestAnimationFrame(animate);
  controls.update();

  // 园区红色围栏动画：只对报警园区生效，正常园区保持透明隐藏。
  alarmRings.forEach((ring) => {
    const parkId = ring.parent?.userData.id;
    const isAlarmPark = parks.value.some((park) => park.id === parkId && park.status === 'alarm');
    if (!isAlarmPark) {
      ring.scale.set(1, 1, 1);
      if (ring.material instanceof THREE.MeshBasicMaterial) {
        ring.material.opacity = 0;
      }
      return;
    }

    ring.rotation.z += 0.01;
    const scale = 1 + Math.sin(Date.now() * 0.004) * 0.08;
    ring.scale.set(scale, scale, scale);
    if (ring.material instanceof THREE.MeshBasicMaterial) {
      ring.material.opacity = 0.72 + Math.sin(Date.now() * 0.006) * 0.26;
    }
  });

  // 报警人员脚下的红色脉冲圆环。
  personMarkers.forEach((marker) => {
    const pulse = marker.children.find((child) => child.userData.pulse);
    if (pulse) {
      const scale = 1 + Math.sin(Date.now() * 0.006) * 0.18;
      pulse.scale.set(scale, scale, scale);
      if (pulse instanceof THREE.Mesh && pulse.material instanceof THREE.MeshBasicMaterial) {
        pulse.material.opacity = 0.45 + Math.sin(Date.now() * 0.008) * 0.35;
      }
    }
  });

  // 统一更新报警光柱、扩散光环和危险区域发光。
  alarmEffects.forEach((effect) => {
    if (effect.userData.alarmEffect === 'beam') {
      effect.rotation.y += 0.018;
      if (effect instanceof THREE.Mesh && effect.material instanceof THREE.MeshBasicMaterial) {
        effect.material.opacity = 0.24 + Math.sin(Date.now() * 0.007) * 0.18;
      }
    }
    if (effect.userData.alarmEffect === 'halo') {
      const scale = 1.1 + Math.sin(Date.now() * 0.007) * 0.28;
      effect.scale.set(scale, scale, scale);
      if (effect instanceof THREE.Mesh && effect.material instanceof THREE.MeshBasicMaterial) {
        effect.material.opacity = 0.45 + Math.sin(Date.now() * 0.009) * 0.25;
      }
    }
    if (effect.userData.alarmEffect === 'dangerZone' && effect instanceof THREE.Mesh && effect.material instanceof THREE.MeshStandardMaterial) {
      effect.material.opacity = 0.55 + Math.sin(Date.now() * 0.01) * 0.25;
      effect.material.emissive.set('#ff2d55');
      effect.material.emissiveIntensity = 0.65 + Math.sin(Date.now() * 0.012) * 0.35;
    }
  });
  renderer.render(scene, camera);
}

/**
 * 自适应容器尺寸。
 *
 * 当浏览器窗口变化时，需要同步更新 camera.aspect 和 renderer 尺寸，
 * 否则画面会被拉伸或出现空白。
 */
function handleResize() {
  if (!sceneRoot.value) return;
  camera.aspect = sceneRoot.value.clientWidth / sceneRoot.value.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(sceneRoot.value.clientWidth, sceneRoot.value.clientHeight);
}

// 组件挂载后才能拿到 DOM 尺寸，所以 Three.js 初始化放在 onMounted 里。
onMounted(async () => {
  await nextTick();
  initScene();
});

// 组件卸载时清理事件监听、动画帧和 WebGLRenderer，避免内存泄漏。
onBeforeUnmount(() => {
  cancelAnimationFrame(animationFrame);
  window.removeEventListener('resize', handleResize);
  renderer?.domElement.removeEventListener('pointerdown', handlePick);
  renderer?.domElement.removeEventListener('pointermove', handleHover);
  renderer?.domElement.removeEventListener('pointerleave', hideHoverInfo);
  renderer?.dispose();
});
</script>
