import { useEffect, useRef, RefObject } from "react";
import * as THREE from "three";

export const useProgressAnimation = (containerRef: RefObject<HTMLDivElement>) => {
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

    const particlesCount = 200;
    const helixGroup = new THREE.Group();
    
    for (let i = 0; i < particlesCount; i++) {
      const t = i / particlesCount;
      const radius = 8;
      const heightStep = 40;
      

      const particle1 = new THREE.Mesh(
        new THREE.SphereGeometry(0.2, 16, 16),
        new THREE.MeshPhongMaterial({
          color: new THREE.Color().setHSL(t, 0.8, 0.5),
          emissive: new THREE.Color().setHSL(t, 0.8, 0.3),
          emissiveIntensity: 0.5,
        })
      );
      
      particle1.position.set(
        radius * Math.cos(t * Math.PI * 4),
        t * heightStep - heightStep/2,
        radius * Math.sin(t * Math.PI * 4)
      );
      

      const particle2 = new THREE.Mesh(
        new THREE.SphereGeometry(0.2, 16, 16),
        new THREE.MeshPhongMaterial({
          color: new THREE.Color().setHSL((t + 0.5) % 1, 0.8, 0.5),
          emissive: new THREE.Color().setHSL((t + 0.5) % 1, 0.8, 0.3),
          emissiveIntensity: 0.5,
        })
      );
      
      particle2.position.set(
        radius * Math.cos(t * Math.PI * 4 + Math.PI),
        t * heightStep - heightStep/2,
        radius * Math.sin(t * Math.PI * 4 + Math.PI)
      );
      
      helixGroup.add(particle1);
      helixGroup.add(particle2);
      

      if (i % 4 === 0) {
        const connection = new THREE.Mesh(
          new THREE.CylinderGeometry(0.05, 0.05, radius * 2, 8),
          new THREE.MeshPhongMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.3,
          })
        );
        
        connection.position.set(0, t * heightStep - heightStep/2, 0);
        connection.rotation.z = t * Math.PI * 4;
        helixGroup.add(connection);
      }
    }

    scene.add(helixGroup);

    const lights = [
      new THREE.PointLight("#9333ea", 2),
      new THREE.PointLight("#818cf8", 2),
      new THREE.PointLight("#6366f1", 2),
    ];

    lights.forEach((light, i) => {
      light.position.set(
        Math.cos(i * Math.PI * 2 / 3) * 20,
        0,
        Math.sin(i * Math.PI * 2 / 3) * 20
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

      helixGroup.rotation.y += 0.002;
      helixGroup.rotation.x = mousePosition.current.y * 0.2;
      helixGroup.rotation.z = mousePosition.current.x * 0.2;

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