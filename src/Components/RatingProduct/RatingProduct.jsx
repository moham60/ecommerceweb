import { useState } from "react";
import { FaStar } from "react-icons/fa6";

export default function RatingProduct() {
    const [rating, setrating] = useState(null);
    const [color, setcolor] = useState(null)
  return (
      <>
          {[...Array(5).map((star, index) => {
              const currentRate = index + 1;
              return (
                  <>
                     
                         
                         
                          <FaStar color="yellow"  />
                   
                      
                </>
              )
          })
          ]} 
      </>
  )
}
