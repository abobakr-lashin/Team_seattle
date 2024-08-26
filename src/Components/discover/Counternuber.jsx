import { Grid } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import CounterBox from './CounterBox'

export default function Counternuber() {
    const [inView, setInView] = useState(false);
    const sectionRef = useRef(null);
  
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.unobserve(entry.target); // لتجنب تشغيله أكثر من مرة
          }
        },
        {
          threshold: 0.1, // نسبة الظهور المطلوبة لبدء العد
        }
      );
  
      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }
  
      return () => {
        if (sectionRef.current) {
          observer.unobserve(sectionRef.current);
        }
      };
    }, []);
  
    const counters = [
      { value: 25, title: "YEARS OF EXPERIENCE" },
      { value: 4, title: "COMPANIES" },
      { value: 10, title: "ACTIVITIES" },
      { value: 4, title: "COUNTRIES OF OPERATION" },
    ];
  return (
    <div>

            <Grid
          container
          spacing={2}
          sx={{
            flexGrow: 1,
            width: "90%",
            m: "auto",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {counters.map((counter, index) => (
            <Grid key={index} item md={3} xs={6} mt={0}>
              <div ref={sectionRef}>
                {inView && (
                  <CounterBox targetValue={counter.value} title={counter.title} />
                )}
              </div>
            </Grid>
          ))}
        </Grid>
    </div>
  )
}
