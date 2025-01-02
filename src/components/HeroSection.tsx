import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export const HeroSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });

    const codeStructure = new THREE.Group();

    const jsGeometry = new THREE.BoxGeometry(7, 7, 7);
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
      const symbolMaterial = new THREE.MeshPhongMaterial({
        color: "#6366f1",
        emissive: "#4338ca",
        emissiveIntensity: 0.5,
      });

      const symbol = new THREE.Mesh(
        new THREE.TorusGeometry(1, 0.5, 20, 36),
        symbolMaterial
      );

      symbol.position.x = Math.cos(angle) * orbitRadius;
      symbol.position.z = Math.sin(angle) * orbitRadius;
      symbol.rotation.x = Math.random() * Math.PI;

      codeStructure.add(symbol);
    });

    codeStructure.add(jsCube);
    scene.add(codeStructure);

    const mainLight = new THREE.DirectionalLight("#ffffff", 1.5);
    mainLight.position.set(0, 0, 5);

    const ambientLight = new THREE.AmbientLight("#818cf8", 0.7);

    const pointLight1 = new THREE.PointLight("#4c1d95", 1);
    pointLight1.position.set(5, 5, 5);

    const pointLight2 = new THREE.PointLight("#6366f1", 0.8);
    pointLight2.position.set(-5, -5, 3);

    scene.add(mainLight, ambientLight, pointLight1, pointLight2);

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      if (width < 640) {
        camera.position.z = 25;
        codeStructure.scale.set(0.7, 0.7, 0.7);
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

    window.addEventListener("resize", handleResize);
    handleResize();

    const animate = () => {
      requestAnimationFrame(animate);

      codeStructure.rotation.y += 0.003;

      codeStructure.children.forEach((symbol, index) => {
        if (symbol !== jsCube) {
          const time = Date.now() * 0.001;
          const offset = index * (Math.PI * 2 / codeSymbols.length);

          symbol.position.y = Math.sin(time + offset) * 1.5;
          symbol.rotation.x += 0.02;
          symbol.rotation.z += 0.05;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      scene.remove(codeStructure);
      jsGeometry.dispose();
      jsMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section className="min-h-screen w-full bg-gradient-to-b from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center relative overflow-hidden">
      <div className="max-w-[2000px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-48 flex flex-col lg:flex-row items-center justify-between gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/2 text-center lg:text-left z-10 pt-20 lg:pt-0"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 font-space">
            Code Lines JS
          </h1>
          <p className="text-gray-300 text-lg sm:text-xl mb-8 font-inter max-w-2xl mx-auto lg:mx-0">
            Rozpocznij interaktywną przygodę z programowaniem. 
            Rozwiązuj wyzwania kodowania i rozwijaj swoje umiejętności JavaScript w formie wciągającej gry.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-300 shadow-lg hover:shadow-indigo-500/50"
          >
            Rozpocznij Naukę
          </motion.button>
        </motion.div>

        <div className="hidden md:flex w-full lg:w-1/2 h-[300px] sm:h-[400px] lg:h-[500px] items-center justify-center">
          <div className="w-full h-full relative">
            <canvas ref={canvasRef} className="w-full h-full" />
          </div>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-full h-full opacity-30">
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-600 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-600 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>
    </section>
  );
};
