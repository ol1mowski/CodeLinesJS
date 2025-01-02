import { useEffect, useRef } from "react";
import * as THREE from "three";

const setupCamera = () => {
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
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

const createCodeStructure = () => {
  const codeStructure = new THREE.Group();

  const jsGeometry = new THREE.BoxGeometry(5, 5, 5);
  const jsMaterial = new THREE.MeshPhongMaterial({
    color: "#f7df1e",
    wireframe: false,
    emissive: "#f7df1e",
    emissiveIntensity: 0.3,
    transparent: true,
    opacity: 0.9,
  });
  const jsCube = new THREE.Mesh(jsGeometry, jsMaterial);
  
  const codeSymbols = ["{", "}", "()", "=>", "[]", ";;"];
  const orbitRadius = 8;

  codeSymbols.forEach((_, index) => {
    const angle = (index / codeSymbols.length) * Math.PI * 2;
    const symbol = new THREE.Mesh(
      new THREE.TorusGeometry(1, 0.5, 20, 36),
      new THREE.MeshPhongMaterial({
        color: "#6366f1",
        emissive: "#4338ca",
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

const setupLights = (scene: THREE.Scene) => {
  const lights = [
    new THREE.DirectionalLight("#ffffff", 1.5),
    new THREE.AmbientLight("#818cf8", 0.7),
    new THREE.PointLight("#4c1d95", 1),
    new THREE.PointLight("#6366f1", 0.8),
  ];
  lights.forEach((light) => scene.add(light));
};

const createResizeHandler =
  (
    camera: THREE.PerspectiveCamera,
    renderer: THREE.WebGLRenderer,
    codeStructure: THREE.Group
  ) =>
  () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    const containerWidth = width > 1024 ? width / 2 : width * 0.8;
    const containerHeight = height * 0.5;

    renderer.setSize(containerWidth, containerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  };

const createAnimationLoop =
  (
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
    renderer: THREE.WebGLRenderer,
    codeStructure: THREE.Group
  ) => {
    function animate() {
      requestAnimationFrame(animate);
      codeStructure.rotation.y += 0.003;
      renderer.render(scene, camera);
    }
    return animate;
  };

const cleanup =
  (scene: THREE.Scene, codeStructure: THREE.Group, handleResize: () => void) =>
  () => {
    window.removeEventListener("resize", handleResize);
    scene.remove(codeStructure);
    codeStructure.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.geometry.dispose();
        object.material.dispose();
      }
    });
  };

export const useThreeAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = setupCamera();
    const renderer = setupRenderer(canvasRef.current);
    const codeStructure = createCodeStructure();

    setupLights(scene);
    scene.add(codeStructure);

    const handleResize = createResizeHandler(camera, renderer, codeStructure);
    const animate = createAnimationLoop(scene, camera, renderer, codeStructure);

    window.addEventListener("resize", handleResize);
    handleResize();
    animate();

    return cleanup(scene, codeStructure, handleResize);
  }, []);

  return canvasRef;
};
