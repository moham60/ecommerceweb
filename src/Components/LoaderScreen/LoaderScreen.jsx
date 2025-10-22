import { LogoSpinLoader } from "react-loadly";


export default function LoaderScreen() {
  return (
    <div className="flex justify-center  h-screen  items-center">
     <LogoSpinLoader
      color="#0f572b"
      size={50}
      speed={1}
      loadingText="Loading..."
      src="https://upload.wikimedia.org/wikipedia/commons/7/75/Flag_of_Palestine.png"
      alt="Logo"
      animationType="spin"
      glowIntensity={0.5}
    />
    </div>
  );
}
