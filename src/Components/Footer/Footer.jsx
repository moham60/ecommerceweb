import payImg1 from "../../assets/images/visa.svg";
import payImg2 from "../../assets/images/discover.svg";
import payImg3 from "../../assets/images/elo.svg";
import payImg4 from "../../assets/images/reshot-icon-ecommerce-QHG2XWM49S.svg";
export default function Footer() {
  return (
    <div className="bg-zinc-100 bg dark:bg-emerald-950 dark:text-white shadow-lg p-4 text-center ">
      <h2 className="text-2xl">Get the FreshCart app</h2>
      <p className="text-gray-400">
        We will send you a link, open it on your phone to download the app
      </p>
      <div className="flex justify-center flex-col md:flex-row gap-2 my-4 items-center">
        <input
          type="email"
          className="w-[70%] focus:outline-none   rounded-md border-none"
          name=""
          id=""
          placeholder="Email.."
        />
        <button className="p-2 w-[70%] md:w-auto rounded-md bg-emerald-700 text-white">
          Share App Link
        </button>
      </div>
      <div className="flex my-4  py-6 justify-between">
        <div className="payement flex justify-center w-full items-center gap-2">
          <span className="text-xl">Payment Parteners:</span>
          <div className="images flex items-center gap-2">
            <img className="w-[40px]" src={payImg1} alt="" />
            <img className="w-[40px]" src={payImg2} alt="" />
            <img className="w-[40px]" src={payImg3} alt="" />
            <img className="w-[40px]" src={payImg4} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
