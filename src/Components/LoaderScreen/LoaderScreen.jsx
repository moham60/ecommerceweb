import { ThreeCircles } from "react-loader-spinner";

export default function LoaderScreen() {
  return (
    <div className="flex justify-center h-52  items-center">
      <ThreeCircles
        visible={true}
        height="100"
        width="100"
        color="rgb(38 223 255)"
        ariaLabel="three-circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}
