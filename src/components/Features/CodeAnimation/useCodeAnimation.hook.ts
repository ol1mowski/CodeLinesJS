import { useEffect, useRef, RefObject } from "react";
import * as THREE from "three";

export const useCodeAnimation = (containerRef: RefObject<HTMLDivElement>) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });

    // Tworzenie kodu DNA z cząsteczek
    const particles = new THREE.Group();
    const particleCount = 200;
    const particleGeometry = new THREE.SphereGeometry(0.1, 8, 8);
    const particleMaterial = new THREE.MeshPhongMaterial({
      color: "#6366f1",
      emissive: "#4338ca",
      emissiveIntensity: 0.5,
    });

    for (let i = 0; i < particleCount; i++) {
      const particle = new THREE.Mesh(particleGeometry, particleMaterial);
      const angle = (i / particleCount) * Math.PI * 4;
      const radius = 5;
      
      particle.position.x = Math.cos(angle) * radius;
      particle.position.y = (i / particleCount) * 20 - 10;
      particle.position.z = Math.sin(angle) * radius;
      
      particles.add(particle);
    }

    scene.add(particles);

    // Światła
    const lights = [
      new THREE.DirectionalLight("#ffffff", 1),
      new THREE.AmbientLight("#818cf8", 0.5),
      new THREE.PointLight("#4c1d95", 1),
    ];
    lights.forEach(light => scene.add(light));

    camera.position.z = 15;

    const animate = () => {
      requestAnimationFrame(animate);

      particles.rotation.y += 0.005;
      particles.children.forEach((particle, i) => {
        const time = Date.now() * 0.001;
        const angle = (i / particleCount) * Math.PI * 4;
        const radius = 5 + Math.sin(time + i * 0.1) * 0.5;
        
        particle.position.x = Math.cos(angle) * radius;
        particle.position.z = Math.sin(angle) * radius;
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

    handleResize();
    window.addEventListener("resize", handleResize);
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  return canvasRef;
}; 