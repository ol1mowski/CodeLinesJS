import { useEffect, useRef, RefObject } from "react";
import * as THREE from "three";

export const useChallengesAnimation = (containerRef: RefObject<HTMLDivElement>) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const scrollProgress = useRef(0);

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


    const astGroup = new THREE.Group();
    

    const mainNode = new THREE.Mesh(
      new THREE.SphereGeometry(3, 32, 32),
      new THREE.MeshPhongMaterial({
        color: "#6366f1",
        emissive: "#4338ca",
        emissiveIntensity: 0.5,
        shininess: 90,
      })
    );
    astGroup.add(mainNode);

    // Tworzymy połączenia i węzły potomne
    const createBranch = (startPoint: THREE.Vector3, level: number, angle: number) => {
      if (level <= 0) return;

      const endPoint = new THREE.Vector3(
        startPoint.x + Math.cos(angle) * (8 - level),
        startPoint.y + Math.sin(angle) * (8 - level),
        startPoint.z
      );

      // Linia połączenia
      const lineGeometry = new THREE.BufferGeometry().setFromPoints([startPoint, endPoint]);
      const line = new THREE.Line(
        lineGeometry,
        new THREE.LineBasicMaterial({ 
          color: "#818cf8", 
          transparent: true, 
          opacity: 0.7,
          linewidth: 2
        })
      );
      astGroup.add(line);

      // Węzeł potomny
      const node = new THREE.Mesh(
        new THREE.SphereGeometry(1.2, 20, 20),
        new THREE.MeshPhongMaterial({
          color: "#818cf8",
          emissive: "#4338ca",
          emissiveIntensity: 0.4,
          shininess: 90,
        })
      );
      node.position.copy(endPoint);
      astGroup.add(node);

      const branchCount = 2;
      const angleStep = Math.PI / (branchCount + 1);
      for (let i = 0; i < branchCount; i++) {
        const newAngle = angle + angleStep * (i - branchCount/2);
        createBranch(endPoint, level - 1, newAngle);
      }
    };

    const branchCount = 3;
    for (let i = 0; i < branchCount; i++) {
      const angle = (i / branchCount) * Math.PI * 2;
      createBranch(new THREE.Vector3(0, 0, 0), 3, angle);
    }

    scene.add(astGroup);

    // Światła
    const lights = [
      new THREE.PointLight("#4c1d95", 3),
      new THREE.PointLight("#818cf8", 3),
      new THREE.PointLight("#6366f1", 3),
    ];

    lights.forEach((light, i) => {
      light.position.set(
        Math.cos(i * Math.PI * 2 / 3) * 20,
        Math.sin(i * Math.PI * 2 / 3) * 20,
        15
      );
      scene.add(light);
    });

    scene.add(new THREE.AmbientLight("#ffffff", 0.6));

    camera.position.z = 35;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      
      mousePosition.current = {
        x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
        y: -((event.clientY - rect.top) / rect.height) * 2 + 1,
      };
    };

    const handleScroll = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      
      scrollProgress.current = -rect.top / (rect.height - window.innerHeight);
    };

    const animate = () => {
      requestAnimationFrame(animate);

      // Rotacja całej struktury
      astGroup.rotation.y += 0.002;
      astGroup.rotation.x = mousePosition.current.y * 0.3;
      astGroup.rotation.z = mousePosition.current.x * 0.3;

      // Pulsowanie węzłów bazujące na scrollu
      astGroup.children.forEach((child, i) => {
        if (child instanceof THREE.Mesh) {
          const time = Date.now() * 0.001;
          const scale = 1 + Math.sin(time + i) * 0.1;
          child.scale.setScalar(scale);
        }
      });

      // Animacja świateł
      lights.forEach((light, i) => {
        const time = Date.now() * 0.001;
        const radius = 15 + Math.sin(time + i) * 2;
        light.position.x = Math.cos(time + i * Math.PI * 2 / 3) * radius;
        light.position.y = Math.sin(time + i * Math.PI * 2 / 3) * radius;
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
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    
    handleResize();
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  return canvasRef;
}; 