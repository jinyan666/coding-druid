import React, { useState, useEffect } from 'react';
import './Fourier.css';

export default function Fourier() {
    // Declare a new state variable
    const [degree, setDegree] = useState(0);
    const [n, setN] = useState(1); //n = 1, 3, 5, 7

    useEffect(() => {
        const id = setInterval(() => {
            //If the new state is computed using the previous state, you can pass a function to setState. 
            //https://reactjs.org/docs/hooks-reference.html#functional-updates
            setDegree(c => {
                if (c < 360) {
                    return c + 1;
                } else {
                    return 0;
                }
            });
        }, 30);
        return () => clearInterval(id);
    }, []);

    return (<div id='container'>
        <SinusDraw className="draw1" degree={degree} n={1}/>
        <SinusDraw className="draw2" degree={degree} n={3}/>
        <SinusDraw className="draw3" degree={degree} n={5}/>
        <SinusDraw className="draw4" degree={degree} n={7}/>
        <SinusDraw className="draw2" degree={degree} n={n}/>
    </div>);
}

const SinusDraw = ({className, degree, n }) => (
    <div className={'fourierDiv' + ' ' + className}>
        <svg width='940' height='350' xmlns='http://www.w3.org/2000/svg' >
            <g transform='translate(20 20)'>
                <text>
                    n = {n}
                </text>

                {/* connected line */}
                <line className='grey' x1={Math.cos(dToR(degree)) * 100 + 100 + 110} y1={-Math.sin(dToR(degree)) * 100 + 100}
                    x2={460} y2={-Math.sin(dToR(degree)) * 100 + 100} />

                {/* circle */}
                <g transform='translate(110 0)'>
                    <line className='grey' x1="100" y1="100" x2="200" y2="100" />
                    <circle className='grey' cx="100" cy="100" r="100" />
                    <path d={'M 130 100 A 30 30 0 ' + (degree <= 180 ? '0' : '1') + ' 0' + (Math.cos(dToR(degree)) * 30 + 100) + ' ' + (-Math.sin(dToR(degree)) * 30 + 100)} />
                    <line className='grey' x1="100" y1="100" x2={Math.cos(dToR(degree)) * 100 + 100} y2={-Math.sin(dToR(degree)) * 100 + 100} />
                    <text x={Math.cos(dToR(degree)) * 100 + 100 + 10} y={-Math.sin(dToR(degree)) * 100 + 100}>
                        {degree}°
              </text>
                </g>

                {/* sine */}
                <g transform='translate(460 0)'>
                    <line className='grey' x1="0" y1="100" x2="360" y2="100" />

                    <polyline
                        points={Array.from({ length: 360 }, (value, key) => {
                            // return key + " " + (Math.sin(n *key / 180 * Math.PI - degree/180 * Math.PI) * 100 *4/(n*Math.PI)+ 100)
                            return key + " " + sum(n, key, degree);
                        })} />
         
                </g>
            </g>
        </svg>
    </div>
)

const sum = (n, key, degree) => {
    let sum = 0;
    for (let i = n; i > 0; i-=2) {
        sum += (Math.sin(i *dToR(key) - i *dToR(degree)) * 100 + 100)*4/(i*Math.PI)
    }
    return sum;
    // (Math.sin(n *key / 180 * Math.PI - degree/180 * Math.PI) * 100 *4/(n*Math.PI)+ 100)
}

//degreeToRad
const dToR = (degree) => {
    return degree/180 * Math.PI;
}