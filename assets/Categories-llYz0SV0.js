import{r as i,j as a,L as n,b as d,a as l}from"./index-omah4i2p.js";import{u as c}from"./useQuery-BrAh-WUD.js";import{a as m}from"./aos.esm-D5P0_fUM.js";function h(){i.useEffect(()=>{m.init()},[]);async function s(){return l.get("https://ecommerce.routemisr.com/api/v1/categories")}const{isLoading:t,data:r}=c({queryKey:["Categories"],queryFn:s}),o=r==null?void 0:r.data.data;return t?a.jsx(n,{}):a.jsx("div",{className:"dark:bg-black bg",children:a.jsx("div",{className:"container mx-auto py-10",children:a.jsx("div",{className:"grid p-4  gap-8 items-center text-center  md:grid-cols-3 lg:grid-cols-4",children:o.map(e=>a.jsxs(d,{"data-aos":"fade-up","data-aos-easing":"ease-in-out","data-aos-delay":"100","data-aos-duration":"1000",to:`/productwithCategory/${e._id}`,className:` transition-all duration-[1s]\r
              bg-white dark:bg-gray-800\r
              text-black dark:text-white\r
               \r
              rounded-lg\r
              \r
              my-4\r
            hover:shadow-[green] dark:hover:shadow-[red] hover:cursor-pointer hover:scale-110 shadow-sm p-5`,children:[a.jsx("img",{className:"w-full",src:e.image,alt:e.name}),a.jsx("h2",{className:"font-bold text-xl p-2",children:e.name})]},e._id))})})})}export{h as default};
