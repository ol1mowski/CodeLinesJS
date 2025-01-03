import { useEffect, useRef, RefObject } from "react";
import * as THREE from "three";

export const useCommunityAnimation = (containerRef: RefObject<HTMLDivElement>) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });

    renderer.setClearColor(0x000000, 0);

    // Tworzymy sieć połączeń między użytkownikami
    const networkGroup = new THREE.Group();
    const nodes: THREE.Mesh[] = [];
    const nodeCount = 20;

    // Funkcja tworząca węzeł użytkownika
    const createUserNode = () => {
      const geometry = new THREE.SphereGeometry(0.5, 16, 16);
      const material = new THREE.MeshPhongMaterial({
        color: new THREE.Color().setHSL(Math.random(), 0.7, 0.6),
        emissive: new THREE.Color().setHSL(Math.random(), 0.7, 0.3),
        emissiveIntensity: 0.5,
        shininess: 90,
      });
      return new THREE.Mesh(geometry, material);
    };

    // Tworzymy węzły i rozmieszczamy je w przestrzeni
    for (let i = 0; i < nodeCount; i++) {
      const node = createUserNode();
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 10 + Math.random() * 5;

      node.position.x = radius * Math.sin(phi) * Math.cos(theta);
      node.position.y = radius * Math.sin(phi) * Math.sin(theta);
      node.position.z = radius * Math.cos(phi);

      nodes.push(node);
      networkGroup.add(node);
    }

    // Tworzymy połączenia między najbliższymi węzłami
    nodes.forEach((node, i) => {
      nodes.slice(i + 1).forEach((otherNode) => {
        const distance = node.position.distanceTo(otherNode.position);
        if (distance < 8) {
          const geometry = new THREE.BufferGeometry().setFromPoints([
            node.position,
            otherNode.position,
          ]);
          const material = new THREE.LineBasicMaterial({
            color: 0xff6b6b,
            transparent: true,
            opacity: 0.2,
          });
          const line = new THREE.Line(geometry, material);
          networkGroup.add(line);
        }
      });
    });

    scene.add(networkGroup);

    // Światła
    const lights = [
      new THREE.PointLight("#ff6b6b", 2),
      new THREE.PointLight("#ffa8a8", 2),
      new THREE.PointLight("#ffc9c9", 2),
    ];

    lights.forEach((light, i) => {
      light.position.set(
        Math.cos(i * Math.PI * 2 / 3) * 20,
        Math.sin(i * Math.PI * 2 / 3) * 20,
        15
      );
      scene.add(light);
    });

    scene.add(new THREE.AmbientLight("#ffffff", 0.5));

    camera.position.z = 30;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      
      mousePosition.current = {
        x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
        y: -((event.clientY - rect.top) / rect.height) * 2 + 1,
      };
    };

    const animate = () => {
      requestAnimationFrame(animate);

      // Rotacja sieci
      networkGroup.rotation.y += 0.001;
      networkGroup.rotation.x = mousePosition.current.y * 0.2;
      networkGroup.rotation.z = mousePosition.current.x * 0.2;

      // Animacja węzłów
      nodes.forEach((node, i) => {
        const time = Date.now() * 0.001 + i;
        node.position.y += Math.sin(time) * 0.01;
        node.scale.setScalar(1 + Math.sin(time * 2) * 0.1);
      });

      renderer.render(scene, camera);
    };

    const handleResize = () => {
      if (!containerRef.current) return;
      
      const { width, height } = containerRef.current.getBoundingClientRect();
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);
    
    handleResize();
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  return canvasRef;
}; 