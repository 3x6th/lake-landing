import React, { useEffect, useMemo, useState } from 'react';

interface TypingAnimationProps {
  texts: string[];
}

const TypingAnimation: React.FC<TypingAnimationProps> = ({ texts }) => {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);

  const rotatingTexts = useMemo(
    () => (texts.length > 0 ? texts : ['ozero.dev']),
    [texts]
  );

  useEffect(() => {
    setDisplayText('');
    setIsDeleting(false);
    setTextIndex(0);
  }, [rotatingTexts]);

  useEffect(() => {
    const currentText = rotatingTexts[textIndex];

    if (!isDeleting) {
      if (displayText.length < currentText.length) {
        const timeout = window.setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        }, 150);
        return () => window.clearTimeout(timeout);
      }

      const timeout = window.setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
      return () => window.clearTimeout(timeout);
    }

    if (displayText.length > 0) {
      const timeout = window.setTimeout(() => {
        setDisplayText(displayText.slice(0, -1));
      }, 100);
      return () => window.clearTimeout(timeout);
    }

    setIsDeleting(false);
    setTextIndex((prevIndex) => (prevIndex + 1) % rotatingTexts.length);
    return undefined;
  }, [displayText, isDeleting, textIndex, rotatingTexts]);

  return (
    <div className="typing-animation">
      <h1 className="main-title">
        {displayText}
        <span className="cursor" aria-hidden="true">
          |
        </span>
      </h1>
    </div>
  );
};

export default TypingAnimation;
