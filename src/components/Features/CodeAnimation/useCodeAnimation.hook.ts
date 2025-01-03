import { useEffect, useRef, RefObject } from "react";
import * as THREE from "three";


const createTextMesh = () => {
  const geometry = new THREE.BoxGeometry(5, 3, 0.5);
  const material = new THREE.MeshPhongMaterial({ 
    color: "#323330",
    shininess: 90,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(-2.5, -1.5, 0.6);
  return mesh;
};

export const useCodeAnimation = (containerRef: RefObject<HTMLDivElement>) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const scrollProgress = useRef(0);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 10, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });

    const jsLogoGroup = new THREE.Group();
    
    const logoGeometry = new THREE.BoxGeometry(20, 20, 1);
    const logoMaterial = new THREE.MeshPhongMaterial({
      color: "#f7df1e",
      emissive: "#f7df1e",
      emissiveIntensity: 0.4,
      shininess: 90,
    });
    const logoBackground = new THREE.Mesh(logoGeometry, logoMaterial);
    jsLogoGroup.add(logoBackground);

    const textMesh = createTextMesh();
    jsLogoGroup.add(textMesh);

    scene.add(jsLogoGroup);

    const codeElements = new THREE.Group();
    const elementsCount = 14;
    const orbitRadius = 25;

    for (let i = 0; i < elementsCount; i++) {
      const geometry = new THREE.BoxGeometry(5, 2, 0.1);
      const material = new THREE.MeshPhongMaterial({
        color: "#6366f1",
        emissive: "#4338ca",
        emissiveIntensity: 0.3,
        transparent: true,
        opacity: 0.8,
      });

      const element = new THREE.Mesh(geometry, material);
      const angle = (i / elementsCount) * Math.PI * 2;
      const y = Math.cos(angle) * orbitRadius;
      const z = Math.sin(angle) * orbitRadius;

      element.position.set(0, y, z);
      element.rotation.x = angle;
      codeElements.add(element);
    }

    scene.add(codeElements);


    const lights = [
      new THREE.SpotLight("#4c1d95", 100, 50, Math.PI / 4, 0.5, 1),
      new THREE.SpotLight("#818cf8", 100, 50, Math.PI / 4, 0.5, 1),
      new THREE.SpotLight("#6366f1", 100, 50, Math.PI / 4, 0.5, 1),
    ];

    lights.forEach((light, i) => {
      light.position.set(
        Math.cos(i * Math.PI * 2 / 3) * 20,
        10,
        Math.sin(i * Math.PI * 2 / 3) * 20
      );
      light.lookAt(0, 0, 0);
      scene.add(light);
    });

    scene.add(new THREE.AmbientLight("#ffffff", 0.5));

    camera.position.z = 30;

    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      };
    };

    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress.current = window.scrollY / maxScroll;
    };

    const animate = () => {
      requestAnimationFrame(animate);

      jsLogoGroup.rotation.y = mousePosition.current.x * 0.5;
      jsLogoGroup.rotation.x = mousePosition.current.y * 0.5;

      const scrollRotation = scrollProgress.current * Math.PI * 4;
      codeElements.rotation.x = scrollRotation;
      codeElements.rotation.y = scrollRotation * 0.5;

      codeElements.children.forEach((element, i) => {
        const time = Date.now() * 0.001;
        const angle = (i / elementsCount) * Math.PI * 2;
        
        element.position.y = Math.cos(angle + time) * orbitRadius;
        element.position.z = Math.sin(angle + time) * orbitRadius;
        element.rotation.z = time + i * 0.1;
        

        element.position.x = Math.sin(time + i + scrollProgress.current * 10) * 2;
      });

      lights.forEach((light, i) => {
        const time = Date.now() * 0.001;
        const radius = 20 + Math.sin(time) * 5;
        light.position.x = Math.cos(time + i * Math.PI * 2 / 3) * radius;
        light.position.z = Math.sin(time + i * Math.PI * 2 / 3) * radius;
        light.lookAt(0, 0, 0);
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