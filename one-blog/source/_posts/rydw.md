---
title: 工业园区人员定位与安全监管：前端核心链路开发记录
date: 2026-08-10 19:10:00
categories:
  - 项目记录
tags:
  - Vue3
  - Three.js
  - GSAP
  - 三维可视化
description: 用 Vue 3、Three.js 和 GSAP 完成的一次工业园区安全监管功能模拟。
---

## 先说明一下

作为前端开发，我在企业实际业务中会涉及多种项目形态：从中后台管理系统、数据可视化驾驶舱，到三维数字孪生场景。

工业园区的人员定位与安全监管，是我参与过的较具代表性的 3D 业务模块。由于真实的企业级大屏和管理系统涉及商业机密及复杂的内部接口，无法直接对外展示。因此，我利用业余时间，将这类项目中最核心的 Three.js 场景渲染与交互链路单独抽离出来，做了一个纯前端的脱敏模拟版本。

本页面的模型、坐标均为 Mock 数据，旨在单纯探讨 Vue 3 与 Three.js 的架构解耦，以及在大数据量渲染下的性能控制。

[在线演示](https://industrial-park-safety-3d.2038266753.workers.dev/)

## 为什么做这个项目

工业园区这个题材同时包含后台页面和三维空间关系，比较适合集中展示前端能力。因此我做了这个模拟场景，把建筑、楼层、人员点位和报警提示放到同一个页面中。

## 做了哪些功能

目前页面包含这些模拟功能：

- 查看三维园区整体布局；
- 切换不同子园区的观察视角；
- 展开建筑楼层，查看内部空间；
- 在场景中显示模拟人员位置；
- 悬停查看人员的基础信息和状态；
- 高亮显示危险区域；
- 模拟报警事件和对应的视觉反馈。

这些功能都由前端预设数据驱动，主要用于展示交互效果，不具备真实安全监管能力。

## 技术选择

页面部分使用 Vue 3，三维场景使用 Three.js，镜头移动和楼层展开动画使用 GSAP。

我没有把所有代码都放在一个组件里。Vue 主要负责页面按钮、当前园区、人员信息和报警状态；Three.js 负责相机、灯光、模型及场景中的点击检测。页面状态发生变化后，再通知三维场景执行对应操作。

这样处理后，普通页面逻辑和三维对象逻辑不会混在一起，后面增加新的园区或人员数据也更容易整理。

人员点位没有直接写死在 Three.js 对象中，而是先定义业务数据，再根据园区、楼层和坐标生成标记。

## 场景交互

园区切换是我最先处理的部分。如果点击后直接修改相机坐标，画面会突然跳过去，使用时很生硬。现在的处理是先隐藏其他园区，再用 GSAP 同时移动相机位置和控制器的观察目标：

```ts
function focusPark(parkId: string) {
  selectedParkId.value = parkId;
  isInsidePark.value = true;

  parkGroups.forEach((parkGroup, id) => {
    parkGroup.visible = id === parkId;
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
```

当前版本的楼层剖切采用显隐方式。只有进入园区内部视角后才能选择楼层，选中后保留目标楼层，隐藏其余楼层：

```ts
function showFloor(floorId: string) {
  if (!isInsidePark.value) return;

  selectedFloorId.value = floorId;
  const stack = floorGroups.get(selectedParkId.value);

  stack?.forEach((floorGroup) => {
    floorGroup.visible = floorGroup.userData.id === floorId;
  });
}
```

## 人员和危险区域

人员点位使用的是预先准备的模拟数据，每条数据包含人员名称、所在区域、楼层、状态和三维坐标。

不同状态使用不同颜色区分。鼠标移动到人员标记上时，页面显示对应的信息；移开后提示消失。这里主要练习了 Three.js 的射线检测，以及三维对象和业务数据之间的关联。

鼠标坐标需要先转换为 Three.js 使用的标准设备坐标，再从可交互对象中找到人员标记，并通过 `userData.id` 取回人员数据：

```ts
function handleHover(event: PointerEvent) {
  const rect = renderer.domElement.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);

  const hit = raycaster
    .intersectObjects(clickableObjects, true)
    .find((item) => item.object.userData.type === 'person');

  if (!hit) {
    hideHoverInfo();
    return;
  }

  const person = persons.find(
    (item) => item.id === hit.object.userData.id,
  );
  if (!person) return;

  hoverInfo.value = {
    visible: true,
    x: event.clientX - rect.left + 16,
    y: event.clientY - rect.top + 16,
    name: person.name,
    statusText: person.statusText,
    parkName:
      parks.value.find((item) => item.id === person.parkId)?.name ?? '',
    floorName:
      floors.find((item) => item.id === person.floorId)?.name ?? '',
    activityRange: person.activityRange,
  };
}
```

危险区域使用半透明颜色和动态效果进行提示。触发模拟报警后，区域会出现更明显的状态变化，同时展示报警信息。动画没有做得太快，避免一直闪烁影响场景查看。

## 开发时遇到的问题

第一个问题是如何区分用户点到的是园区、楼层还是人员。我把这些对象统一放进 `clickableObjects`，并通过对象的 `userData.type` 和 `userData.id` 保存交互类型及业务标识。Raycaster 命中对象后，就能决定进入园区、切换楼层还是显示人员信息。

第二个问题是总览状态和园区内部状态的操作范围不同。项目使用 `isInsidePark` 保存当前是否已经进入园区，楼层按钮和场景点击都会检查这个状态，避免在总览页面误操作楼层。

第三个问题是窗口尺寸变化和组件退出后的清理。浏览器变化时需要同步相机比例和渲染器尺寸；离开页面时则取消动画帧、移除事件并释放渲染器：

```ts
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

function handleResize() {
  if (!sceneRoot.value) return;

  camera.aspect =
    sceneRoot.value.clientWidth / sceneRoot.value.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(
    sceneRoot.value.clientWidth,
    sceneRoot.value.clientHeight,
  );
}

onBeforeUnmount(() => {
  cancelAnimationFrame(animationFrame);
  window.removeEventListener('resize', handleResize);
  renderer?.domElement.removeEventListener('pointerdown', handlePick);
  renderer?.domElement.removeEventListener('pointermove', handleHover);
  renderer?.dispose();
});
```

## 部署

项目构建后部署在 Cloudflare Workers，线上只提供运行页面，源码保存在私有仓库中。

部署版本方便直接查看功能，但它仍然只是个人作品和前端功能演示，不包含真实接口、账号权限、定位硬件接入以及生产环境所需的安全机制。

## 写在最后

这个项目让我把 Vue 页面和 Three.js 场景完整地串了一遍。过程中花时间最多的并不是模型本身，而是镜头、点击、动画和页面状态之间的配合。

目前实现的还是基础模拟功能。后面如果继续完善，我会考虑加入人员移动轨迹、区域筛选和报警记录，让各个功能之间的联系更完整。
