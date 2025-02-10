import notfoundImg from "../../assets/images/error.svg";
export default function NotFound() {
  return (
    <div className="h-[100vh] flex dark:bg-black items-center  justify-center p-16">
      <img className="w-25" src={notfoundImg} alt="" />
    </div>
  );
}
