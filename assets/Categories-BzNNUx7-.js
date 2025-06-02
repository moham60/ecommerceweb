import{c as i,j as a,L as n,e as d,b as c}from"./index-BNM5ibRF.js";import{u as l}from"./useQuery-CpZM0hCu.js";import{a as m}from"./aos.esm-D9vD6D-6.js";function x(){i.useEffect(()=>{m.init()},[]);async function s(){return c.get("https://ecommerce.routemisr.com/api/v1/categories")}const{isLoading:t,data:r}=l({queryKey:["Categories"],queryFn:s}),o=r==null?void 0:r.data.data;return t?a.jsx(n,{}):a.jsx("div",{className:"dark:bg-black bg",children:a.jsx("div",{className:"container mx-auto py-10",children:a.jsx("div",{className:"grid  gap-8 items-center text-center  md:grid-cols-3 lg:grid-cols-4",children:o.map(e=>a.jsxs(d,{"data-aos":"fade-up","data-aos-easing":"ease-in-out","data-aos-delay":"100","data-aos-duration":"1000",to:`/productwithCategory/${e._id}`,className:` transition-all duration-[1s]\r
              bg-white dark:bg-gray-800\r
              text-black dark:text-white\r
               \r
              rounded-lg\r
              h-96\r
              my-4\r
            hover:shadow-[green] dark:hover:shadow-[red] hover:cursor-pointer hover:scale-110 shadow-sm p-5`,children:[a.jsx("img",{className:"w-56",src:e.image,alt:e.name}),a.jsx("h2",{className:"font-bold text-xl p-2",children:e.name})]},e._id))})})})}export{x as default};
