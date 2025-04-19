import "./layout.css"; // Import a new CSS file for layout-specific styles
import SignUp from "./signup-page/page";

export default function Home() {
  return (
    <div className={` justify-center px-2 py-1 border rounded-2xl flex  items-center  max-w-4xl mx-auto  bg-[#2C2638] bg-opacity-20 background`} >
      <SignUp />
    </div>
  );
}
