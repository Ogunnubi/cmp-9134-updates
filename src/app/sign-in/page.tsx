import AuthForm from "@/components/AuthForms";
import Image from "next/image";
import mountains from "../../../public/register-img.jpg";
export default function LoginPage() {
  return (
    <>
    <div className="hidden sm:flex rounded-[10px] gap-7 border border-white bg-[#2C2638] bg-opacity-20 items-center justify-center max-w-4xl mx-auto p-6">
      <Image src={mountains} alt="" className="w-sm" />
    </div>
    <div className="w-full sm:w-md h-[400px] gap-2 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-semibold mb-4 text-center text-white">
        Welcome To MediaSearch
      </h1>
      <AuthForm />
    </div>
    </>
  );
}
