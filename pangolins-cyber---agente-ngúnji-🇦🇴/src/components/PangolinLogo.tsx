import React from 'react';
import ngunjiLogoFull from '../assets/images/ngunji_logo_1786661584258.jpg';
import ngunjiEmblem from '../assets/images/ngunji_emblem_1786661594405.jpg';

interface PangolinLogoProps {
  variant?: 'icon' | 'full' | 'hero';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export const PangolinLogo: React.FC<PangolinLogoProps> = ({
  variant = 'icon',
  className = '',
  size = 'md',
}) => {
  const sizeMap = {
    sm: { w: 'w-8 h-8', px: 32 },
    md: { w: 'w-12 h-12', px: 48 },
    lg: { w: 'w-24 h-24', px: 96 },
    xl: { w: 'w-44 h-44', px: 176 },
    '2xl': { w: 'w-64 h-64 sm:w-72 sm:h-72', px: 288 },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  if (variant === 'hero' || variant === 'full') {
    return (
      <div className={`inline-flex flex-col items-center justify-center ${className}`}>
        <div className={`relative ${variant === 'hero' ? sizeMap['2xl'].w : currentSize.w} rounded-3xl overflow-hidden border border-[#3D3323] shadow-[0_10px_35px_rgba(212,175,55,0.25)] bg-[#0A0908]`}>
          <img
            src={ngunjiLogoFull}
            alt="Ngúnji - Pangolins Cyber Logo"
            className="w-full h-full object-cover rounded-3xl transition-transform duration-500 hover:scale-105"
            referrerPolicy="no-referrer"
          />
        </div>
        {variant === 'hero' && (
          <div className="mt-2 text-center">
            <div className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-[#A89F8D]">
              Pangolins Cyber • Angola 🇦🇴
            </div>
          </div>
        )}
      </div>
    );
  }

  // Icon variant (circular emblem)
  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <div className={`relative ${currentSize.w} rounded-full overflow-hidden border border-[#D4AF37]/50 shadow-[0_0_15px_rgba(212,175,55,0.3)] bg-[#0A0908] flex-shrink-0`}>
        <img
          src={ngunjiEmblem}
          alt="Ngúnji Emblem"
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  );
};

