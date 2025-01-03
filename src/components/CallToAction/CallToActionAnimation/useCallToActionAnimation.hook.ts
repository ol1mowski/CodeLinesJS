import { useEffect, useRef, RefObject } from "react";
import * as THREE from "three";

export const useCallToActionAnimation = (containerRef: RefObject<HTMLDivElement>) => {
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

    const dnaGroup = new THREE.Group();
    scene.add(dnaGroup);

    const createDNAHelix = () => {
      const points = [];
      const numPoints = 100;
      const radius = 4;
      const height = 20;
      
      for (let i = 0; i < numPoints; i++) {
        const t = i / numPoints;
        const angle = t * Math.PI * 4;
        
        points.push(
          new THREE.Vector3(
            radius * Math.cos(angle),
            height * (t - 0.5),
            radius * Math.sin(angle)
          )
        );
        
        points.push(
          new THREE.Vector3(
            radius * Math.cos(angle + Math.PI),
            height * (t - 0.5),
            radius * Math.sin(angle + Math.PI)
          )
        );
      }

      return points;
    };

    const points = createDNAHelix();
    
    points.forEach((point) => {
      const geometry = new THREE.SphereGeometry(0.2, 8, 8);
      const material = new THREE.MeshPhongMaterial({
        color: new THREE.Color().setHSL(Math.random() * 0.2 + 0.5, 0.7, 0.6),
        emissive: new THREE.Color().setHSL(Math.random() * 0.2 + 0.5, 0.7, 0.3),
        emissiveIntensity: 0.5,
        shininess: 90,
      });
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.copy(point);
      dnaGroup.add(sphere);
    });

    for (let i = 0; i < points.length - 2; i += 2) {
      const geometry = new THREE.BufferGeometry().setFromPoints([
        points[i],
        points[i + 2],
      ]);
      const material = new THREE.LineBasicMaterial({
        color: 0x6366f1,
        transparent: true,
        opacity: 0.3,
      });
      const line = new THREE.Line(geometry, material);
      dnaGroup.add(line);
    }

    const lights = [
      new THREE.PointLight("#4f46e5", 2),
      new THREE.PointLight("#6366f1", 2),
      new THREE.PointLight("#818cf8", 2),
    ];

    lights.forEach((light, i) => {
      light.position.set(
        Math.cos(i * Math.PI * 2 / 3) * 15,
        Math.sin(i * Math.PI * 2 / 3) * 15,
        10
      );
      scene.add(light);
    });

    scene.add(new THREE.AmbientLight("#ffffff", 0.5));

    camera.position.z = 20;

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

      dnaGroup.rotation.y += 0.005;
      dnaGroup.rotation.x = mousePosition.current.y * 0.2;
      dnaGroup.rotation.z = mousePosition.current.x * 0.2;

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