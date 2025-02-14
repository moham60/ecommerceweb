import{j as e,L as o,d as n,a as d}from"./index-F-ZMroND.js";import{u as c}from"./useQuery-BDSxYnkL.js";function g(){async function a(){return d.get("https://ecommerce.routemisr.com/api/v1/categories")}const{isLoading:t,data:s}=c({queryKey:["Categories"],queryFn:a}),i=s==null?void 0:s.data.data;return t?e.jsx(o,{}):e.jsx("div",{className:"dark:bg-black bg",children:e.jsx("div",{className:"container mx-auto py-10",children:e.jsx("div",{className:"grid  gap-8 items-center text-center  md:grid-cols-3 lg:grid-cols-4",children:i.map(r=>e.jsxs(n,{to:`/productwithCategory/${r._id}`,className:` transition-all duration-[1s]\r
              bg-gray-700\r
              h-96\r
              my-4\r
            hover:shadow-[green] dark:hover:shadow-[red] hover:cursor-pointer hover:scale-110 shadow-sm p-5`,children:[e.jsx("img",{className:"w-56",src:r.image,alt:r.name}),e.jsx("h2",{className:"font-bold text-white text-xl p-2",children:r.name})]},r._id))})})})}export{g as default};
