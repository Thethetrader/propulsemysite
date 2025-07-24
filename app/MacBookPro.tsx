interface MacBookProProps {
  siteUrl: string;
  siteName: string;
}

export default function MacBookPro({ siteUrl, siteName }: MacBookProProps) {
  return (
    <div className="flex-shrink-0 relative scale-125 md:scale-150 scale-125 p-8">
      <img src="/macframe.avif" alt="Mac frame" className="w-80 md:w-96 h-auto mix-blend-multiply filter brightness-110" />
              <div className="absolute top-8 left-0 right-0 bottom-16 flex items-center justify-center">
          <div className="w-[60%] md:w-[63%] h-1/2 bg-black rounded-lg overflow-hidden">
            <iframe 
              src={siteUrl} 
              title={siteName}
              className="w-full h-full border-0"
              loading="lazy"
              style={{ 
                width: '333%', 
                height: '333%', 
                transform: 'scale(0.3) translateX(8px)', 
                transformOrigin: 'top left' 
              }}
            />
          </div>
      </div>
    </div>
  );
} 