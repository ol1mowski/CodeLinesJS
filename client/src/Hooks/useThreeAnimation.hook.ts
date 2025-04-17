import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useMobileDetect } from './useMobileDetect';

const setupCamera = () => {
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 15;
  return camera;
};

const setupRenderer = (canvas: HTMLCanvasElement) => {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
  });
  return renderer;
};

const createCodeStructure = (isMobile: boolean) => {
  const codeStructure = new THREE.Group();

  const jsGeometry = new THREE.BoxGeometry(7, 7, 7);
  const jsMaterial = new THREE.MeshPhongMaterial({
    color: '#f7df1e',
    wireframe: false,
    emissive: '#f7df1e',
    emissiveIntensity: 0.3,
    transparent: true,
    opacity: 0.9,
  });
  const jsCube = new THREE.Mesh(jsGeometry, jsMaterial);

  const codeSymbols = isMobile ? ['{', '}', '=>'] : ['{', '}', '()', '=>', '[]', ';;'];
  const orbitRadius = 8;

  codeSymbols.forEach((_, index) => {
    const angle = (index / codeSymbols.length) * Math.PI * 2;
    const symbol = new THREE.Mesh(
      new THREE.TorusGeometry(1, isMobile ? 0.3 : 0.5, isMobile ? 12 : 20, isMobile ? 24 : 36),
      new THREE.MeshPhongMaterial({
        color: '#6366f1',
        emissive: '#4338ca',
        emissiveIntensity: 0.5,
      })
    );

    symbol.position.x = Math.cos(angle) * orbitRadius;
    symbol.position.z = Math.sin(angle) * orbitRadius;
    symbol.rotation.x = Math.random() * Math.PI;

    codeStructure.add(symbol);
  });

  codeStructure.add(jsCube);
  return codeStructure;
};

const setupLights = (scene: THREE.Scene, isMobile: boolean) => {
  const lights = isMobile
    ? [new THREE.DirectionalLight('#ffffff', 1.5), new THREE.AmbientLight('#818cf8', 0.7)]
    : [
        new THREE.DirectionalLight('#ffffff', 1.5),
        new THREE.AmbientLight('#818cf8', 0.7),
        new THREE.PointLight('#4c1d95', 1),
        new THREE.PointLight('#6366f1', 0.8),
      ];
  lights.forEach(light => scene.add(light));
};

const createResizeHandler =
  (
    camera: THREE.PerspectiveCamera,
    renderer: THREE.WebGLRenderer,
    codeStructure: THREE.Group,
    isMobile: boolean
  ) =>
  () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    if (width < 640) {
      camera.position.z = 25;
      codeStructure.scale.set(0.7, 0.7, 0.7);

      if (isMobile) {
        codeStructure.children.forEach((child, index) => {
          if (index % 2 !== 0 && index < codeStructure.children.length - 1) {
            child.visible = false;
          }
        });
      }
    } else if (width < 1024) {
      camera.position.z = 20;
      codeStructure.scale.set(0.85, 0.85, 0.85);
    } else {
      camera.position.z = 15;
      codeStructure.scale.set(1.2, 1.2, 1.2);
    }

    const containerWidth = width > 1024 ? width / 2 : width * 0.8;
    const containerHeight = height * 0.5;

    renderer.setSize(containerWidth, containerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  };

const createAnimationLoop = (
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer,
  codeStructure: THREE.Group,
  isMobile: boolean
) => {
  function animate() {
    requestAnimationFrame(animate);

    codeStructure.rotation.y += isMobile ? 0.001 : 0.003;

    codeStructure.children.forEach((symbol, index) => {
      if (symbol !== codeStructure.children[codeStructure.children.length - 1]) {
        const time = Date.now() * 0.001;
        const offset = index * ((Math.PI * 2) / (codeStructure.children.length - 1));

        if (!isMobile || index % 2 === 0) {
          symbol.position.y = Math.sin(time + offset) * (isMobile ? 0.8 : 1.5);
          symbol.rotation.x += isMobile ? 0.01 : 0.02;
          symbol.rotation.z += isMobile ? 0.02 : 0.05;
        }
      }
    });

    renderer.render(scene, camera);
  }
  return animate;
};

const cleanup =
  (scene: THREE.Scene, codeStructure: THREE.Group, handleResize: () => void) => () => {
    window.removeEventListener('resize', handleResize);
    scene.remove(codeStructure);
    codeStructure.traverse(object => {
      if (object instanceof THREE.Mesh) {
        object.geometry.dispose();
        object.material.dispose();
      }
    });
  };

export const useThreeAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isMobile = useMobileDetect();

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = setupCamera();
    const renderer = setupRenderer(canvasRef.current);
    const codeStructure = createCodeStructure(isMobile);

    setupLights(scene, isMobile);
    scene.add(codeStructure);

    const handleResize = createResizeHandler(camera, renderer, codeStructure, isMobile);
    const animate = createAnimationLoop(scene, camera, renderer, codeStructure, isMobile);

    window.addEventListener('resize', handleResize);
    handleResize();
    animate();

    return cleanup(scene, codeStructure, handleResize);
  }, [isMobile]);

  return canvasRef;
};
