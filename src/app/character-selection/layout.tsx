"use client"
import "./char-select.css";


export default function CharacterSelectLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  <div className="character-selection w-full h-full flex flex-col items-center justify-center p-4">
    <h1 className="text-4xl">Select Your Character</h1>
    <div className="character-selection__container">
      {children}
    </div>
  </div>
  );
}
