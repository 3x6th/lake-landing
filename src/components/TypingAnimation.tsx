import React, { useState, useEffect, useMemo } from 'react';

const TypingAnimation: React.FC = () => {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  
  const texts = useMemo(() => ['ozero.dev', 'lake of developers'], []);
  
  useEffect(() => {
    const currentText = texts[textIndex];
    
    if (!isDeleting) {
      if (displayText.length < currentText.length) {
        const timeout = setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        }, 150);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      if (displayText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 100);
        return () => clearTimeout(timeout);
      } else {
        setIsDeleting(false);
        setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
      }
    }
  }, [displayText, isDeleting, textIndex, texts]);

  return (
    <div className="typing-animation">
      <h1 className="main-title">
        {displayText}
        <span className="cursor">|</span>
      </h1>
      <p className="subtitle">We build digital solutions that flow like water</p>
    </div>
  );
};

export default TypingAnimation;
