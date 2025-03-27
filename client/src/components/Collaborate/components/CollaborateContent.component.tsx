import { motion } from "framer-motion";
import { FaGithub, FaCodeBranch, FaCode, FaBug, FaLightbulb } from "react-icons/fa";

type CollaborateItemProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
};

const CollaborateItem = ({ icon, title, description, delay }: CollaborateItemProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    viewport={{ once: true }}
    className="flex flex-col items-center text-center p-6 rounded-xl bg-[#1a1a1a]/50 border border-[#f7df1e]/20 backdrop-blur-sm"
  >
    <div className="w-14 h-14 flex items-center justify-center text-2xl bg-[#f7df1e]/10 text-[#f7df1e] rounded-full mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </motion.div>
);

export const CollaborateContent = () => {
  const items = [
    {
      icon: <FaCodeBranch />,
      title: "Fork i Pull Request",
      description: "Stwórz własną kopię repozytorium, wprowadź zmiany i zaproponuj je poprzez Pull Request.",
      delay: 0.1,
    },
    {
      icon: <FaCode />,
      title: "Rozwój Funkcjonalności",
      description: "Pomóż nam rozwijać nowe funkcje i ulepszać istniejące komponenty aplikacji.",
      delay: 0.2,
    },
    {
      icon: <FaBug />,
      title: "Zgłaszanie Błędów",
      description: "Znalazłeś błąd? Zgłoś go przez system Issues na GitHubie i pomóż nam go naprawić.",
      delay: 0.3,
    },
    {
      icon: <FaLightbulb />,
      title: "Propozycje Ulepszeń",
      description: "Masz pomysł jak ulepszyć platformę? Podziel się nim z nami poprzez GitHub Discussions.",
      delay: 0.4,
    },
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item, index) => (
          <CollaborateItem key={index} {...item} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        viewport={{ once: true }}
        className="mt-12 flex flex-col items-center"
      >
        <a
          href="https://github.com/oliwiermarkiewicz/CodeLinesJS"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-8 py-3 bg-[#f7df1e] text-black font-bold rounded-lg hover:bg-[#f7df1e]/90 transition-all shadow-lg shadow-[#f7df1e]/25"
        >
          <FaGithub className="text-xl" />
          <span>Zobacz Projekt na GitHub</span>
        </a>
        <p className="mt-4 text-gray-400 text-sm max-w-2xl text-center">
          Nasz kod jest otwarty dla społeczności. Zachęcamy do współpracy, zgłaszania błędów i proponowania ulepszeń.
          Razem możemy stworzyć lepszą platformę do nauki JavaScript!
        </p>
      </motion.div>
    </div>
  );
}; 