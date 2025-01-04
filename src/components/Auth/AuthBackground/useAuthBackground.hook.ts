import { useEffect, useRef, RefObject, useCallback, useMemo } from "react";
import * as THREE from "three";

export const useAuthBackground = (containerRef: RefObject<HTMLDivElement>) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const frameId = useRef<number>();

  const particleCount = useMemo(() => 100, []);
  const lights = useMemo(() => [
    new THREE.PointLight("#4f46e5", 2),
    new THREE.PointLight("#6366f1", 2),
    new THREE.PointLight("#818cf8", 2),
  ], []);

  const createParticle = useCallback(() => {
    const geometry = new THREE.TetrahedronGeometry(0.5, 0);
    const material = new THREE.MeshPhongMaterial({
      color: new THREE.Color().setHSL(Math.random() * 0.2 + 0.5, 0.7, 0.5),
      emissive: new THREE.Color().setHSL(Math.random() * 0.2 + 0.5, 0.7, 0.3),
      emissiveIntensity: 0.5,
      transparent: true,
      opacity: 0.8,
      shininess: 90,
    });
    return new THREE.Mesh(geometry, material);
  }, []);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    mousePosition.current = {
      x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
      y: -((event.clientY - rect.top) / rect.height) * 2 + 1,
    };
  }, []);

  const handleResize = useCallback((
    renderer: THREE.WebGLRenderer,
    camera: THREE.PerspectiveCamera
  ) => {
    if (!containerRef.current) return;
    
    const { width, height } = containerRef.current.getBoundingClientRect();
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }, []);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });

    renderer.setClearColor(0x000000, 0);

    const particlesGroup = new THREE.Group();
    const particles: THREE.Mesh[] = [];

    for (let i = 0; i < particleCount; i++) {
      const particle = createParticle();
      particle.position.set(
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 50
      );
      particle.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      particles.push(particle);
      particlesGroup.add(particle);
    }

    scene.add(particlesGroup);

    lights.forEach((light, i) => {
      light.position.set(
        Math.cos(i * Math.PI * 2 / 3) * 30,
        Math.sin(i * Math.PI * 2 / 3) * 30,
        15
      );
      scene.add(light);
    });

    scene.add(new THREE.AmbientLight("#ffffff", 0.5));

    camera.position.z = 30;

    const animate = () => {
      frameId.current = requestAnimationFrame(animate);

      particles.forEach((particle, i) => {
        const time = Date.now() * 0.001 + i;
        particle.position.y += Math.sin(time * 0.5) * 0.02;
        particle.rotation.x += 0.01;
        particle.rotation.y += 0.01;
        particle.rotation.z += 0.01;
      });

      particlesGroup.rotation.y += 0.001;
      particlesGroup.rotation.x = mousePosition.current.y * 0.2;
      particlesGroup.rotation.z = mousePosition.current.x * 0.2;

      renderer.render(scene, camera);
    };

    const resizeHandler = () => handleResize(renderer, camera);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", resizeHandler);
    
    resizeHandler();
    animate();

    return () => {
      if (frameId.current) {
        cancelAnimationFrame(frameId.current);
      }
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resizeHandler);
      renderer.dispose();
      scene.clear();
    };
  }, [particleCount, lights, createParticle, handleMouseMove, handleResize]);

  return canvasRef;
}; 