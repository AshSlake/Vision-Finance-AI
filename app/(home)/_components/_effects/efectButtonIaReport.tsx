import Image from "next/image";
import { useState, useEffect, useRef, ReactNode } from "react";

interface GeminiButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  numParticles?: number;
}

const GeminiButton: React.FC<GeminiButtonProps> = ({
  children,
  numParticles = 20,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const button = buttonRef.current;

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    if (button) {
      button.addEventListener("mouseenter", handleMouseEnter);
      button.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (button) {
        button.removeEventListener("mouseenter", handleMouseEnter);
        button.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <div className="relative">
      {isHovered && (
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-blue-500 opacity-20 blur-lg"></div>
          <div className="absolute inset-0 animate-particles">
            {[...Array(numParticles)].map((_, i) => (
              <div
                key={i}
                className={`absolute h-1 w-1 rounded-full bg-white animate-float${i}`}
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 0.5}s`,
                }}
              />
            ))}
          </div>
        </div>
      )}

      <span
        ref={buttonRef}
        aria-label="Botão Gemini"
        className="gemini-button"
        onClick={props.onClick}
        role="button"
        tabIndex={0}
        {...props}
      >
        {children}

        <Image // Imagem dentro do botão
          src="/google-gemini-icon.svg"
          alt="geminiIcon"
          width={16}
          height={16}
          className="gemini-icon" // Adicione a classe para estilizar
        />
      </span>

      {isHovered && (
        <div className="particles-container">
          {" "}
          {/* Container para as partículas */}
          {[...Array(numParticles)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.5}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default GeminiButton;
