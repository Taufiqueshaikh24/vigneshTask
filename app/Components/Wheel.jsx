// import { useEffect, useRef, useState } from "react";
// import { gsap } from "gsap";

// const WheelAuth = ({ onPasswordUpdate }) => {
//   const [password, setPassword] = useState("");
//   const wheelRef = useRef(null);
//   const [rotation, setRotation] = useState(0);

//   // Hexadecimal characters (0-9, a-f)
//   const hexChars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
//   const innerChars = hexChars.slice(0, 8); // Inner Orbit (8 chars)
//   const outerChars = hexChars.slice(8, 16); // Outer Orbit (8 chars)

//   useEffect(() => {
//     if (wheelRef.current) {
//       gsap.set(wheelRef.current, { rotation });
//     }
//   }, [rotation]);

//   const rotateWheel = (direction) => {
//     const newRotation = direction === "clockwise" ? rotation + 45 : rotation - 45;
//     setRotation(newRotation);
//     gsap.to(wheelRef.current, { rotation: newRotation, duration: 0.5, ease: "power2.out" });
//   };

//   const selectCharacter = (orbit) => {
//     const index = ((rotation / 45) % 8 + 8) % 8; // Ensure valid index
//     const char = orbit === "inner" ? innerChars[index] : outerChars[index];
//     setPassword((prev) => {
//       const newPassword = prev + char;
//       onPasswordUpdate(newPassword); // Send updated password to parent component
//       return newPassword;
//     });
//   };

//   return (
//     <div className="flex flex-col items-center gap-4 p-5">
//       <div className="relative w-40 h-40">
//         {/* Rotating Wheel */}
//         <div ref={wheelRef} className="absolute w-full h-full bg-gray-200 rounded-full border-4 border-gray-400 flex items-center justify-center transition-transform">
//           {/* Inner and Outer characters */}
//           {innerChars.map((char, index) => (
//             <div
//               key={`inner-${char}`}
//               className="absolute text-sm font-bold text-black"
//               style={{
//                 transform: `rotate(${index * 45}deg) translate(50px) rotate(-${index * 45}deg)`,
//               }}
//             >
//               {char}
//             </div>
//           ))}
//           {outerChars.map((char, index) => (
//             <div
//               key={`outer-${char}`}
//               className="absolute text-sm font-bold text-blue-600"
//               style={{
//                 transform: `rotate(${index * 45}deg) translate(70px) rotate(-${index * 45}deg)`,
//               }}
//             >
//               {char}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Rotation Controls */}
//       <div className="flex gap-4">
//         <button onClick={() => rotateWheel("counterclockwise")} className="px-4 py-2 bg-gray-700 text-white rounded">⟲ Rotate Left</button>
//         <button onClick={() => rotateWheel("clockwise")} className="px-4 py-2 bg-gray-700 text-white rounded">⟳ Rotate Right</button>
//       </div>

//       {/* Selection Controls */}
//       <div className="flex gap-4">
//         <button onClick={() => selectCharacter("inner")} className="px-4 py-2 bg-green-500 text-white rounded">Inner Orbit</button>
//         <button onClick={() => selectCharacter("outer")} className="px-4 py-2 bg-blue-500 text-white rounded">Outer Orbit</button>
//       </div>

//       {/* Display Typed Password */}
//       <input type="text" value={password} readOnly className="border-2 border-gray-400 px-2 py-1 mt-3" placeholder="Typed Password" />
//     </div>
//   );
// };

// export default WheelAuth;











// import { useState, useRef, useEffect } from "react";
// import { gsap } from "gsap";

// const hexChars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
// const innerChars = hexChars.slice(0, 8);
// const outerChars = hexChars.slice(8, 16);

// const WheelAuth = ({ onPasswordUpdate }) => {
//   const [password, setPassword] = useState("");
//   const [rotation, setRotation] = useState(0);
//   const indicatorRef = useRef(null);

//   useEffect(() => {
//     if (indicatorRef.current) {
//       gsap.to(indicatorRef.current, { rotation, duration: 0.5, ease: "power2.out" });
//     }
//   }, [rotation]);

//   const rotateIndicator = (direction) => {
//     const newRotation = direction === "clockwise" ? rotation + 45 : rotation - 45;
//     setRotation(newRotation);
//   };

//   const selectCharacter = (orbit) => {
//     const index = ((rotation / 45) % 8 + 8) % 8; 
//     const char = orbit === "inner" ? innerChars[index] : outerChars[index];
//     setPassword((prev) => {
//       const newPassword = prev + char;
//       onPasswordUpdate(newPassword);
//       return newPassword;
//     });
//   };

//   return (
//     <div className="flex flex-col items-center gap-4 p-5">
//       <div className="relative w-40 h-40">
//         {/* Indicator */}
//         <div ref={indicatorRef} className="absolute w-full h-full flex items-center justify-center">
//           <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-black" />
//         </div>
        
//         {/* Wheel Container */}
//         <div className="relative w-40 h-40 bg-gray-200 rounded-full border-4 border-gray-400 flex items-center justify-center">
//           {innerChars.map((char, index) => (
//             <div
//               key={`inner-${char}`}
//               className={`absolute text-sm font-bold text-black ${rotation % 360 === index * 45 ? "border-2 border-black" : ""}`}
//               style={{ transform: `rotate(${index * 45}deg) translate(50px) rotate(-${index * 45}deg)` }}
//             >
//               {char}
//             </div>
//           ))}
//           {outerChars.map((char, index) => (
//             <div
//               key={`outer-${char}`}
//               className={`absolute text-sm font-bold text-blue-600 ${rotation % 360 === index * 45 ? "border-2 border-blue-500" : ""}`}
//               style={{ transform: `rotate(${index * 45}deg) translate(70px) rotate(-${index * 45}deg)` }}
//             >
//               {char}
//             </div>
//           ))}
//         </div>
//       </div>
      
//       {/* Rotation Controls */}
//       <div className="flex gap-4">
//         <button onClick={() => rotateIndicator("counterclockwise")} className="px-4 py-2 bg-gray-700 text-white rounded">⟲ Rotate Left</button>
//         <button onClick={() => rotateIndicator("clockwise")} className="px-4 py-2 bg-gray-700 text-white rounded">⟳ Rotate Right</button>
//       </div>
      
//       {/* Selection Controls */}
//       <div className="flex gap-4">
//         <button onClick={() => selectCharacter("inner")} className="px-4 py-2 bg-green-500 text-white rounded">Inner Orbit</button>
//         <button onClick={() => selectCharacter("outer")} className="px-4 py-2 bg-blue-500 text-white rounded">Outer Orbit</button>
//       </div>
      
//       {/* Display Typed Password */}
//       <input type="text" value={password} readOnly className="border-2 border-gray-400 px-2 py-1 mt-3" placeholder="Typed Password" />
//     </div>
//   );
// };

// export default WheelAuth;


// import React, { useState } from "react";

// const characters = [
//   { inner: "a", outer: "1" },
//   { inner: "b", outer: "2" },
//   { inner: "c", outer: "3" },
//   { inner: "d", outer: "4" },
//   { inner: "e", outer: "5" },
//   { inner: "f", outer: "6" },
//   { inner: "g", outer: "7" },
//   { inner: "h", outer: "8" },
// ];

// const ColorWheelLogin = () => {
//   const [innerIndex, setInnerIndex] = useState(0);
//   const [outerIndex, setOuterIndex] = useState(0);
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const rotateInner = (direction) => {
//     setInnerIndex((prev) =>
//       direction === "clockwise"
//         ? (prev + 1) % characters.length
//         : (prev - 1 + characters.length) % characters.length
//     );
//   };

//   const rotateOuter = (direction) => {
//     setOuterIndex((prev) =>
//       direction === "clockwise"
//         ? (prev + 1) % characters.length
//         : (prev - 1 + characters.length) % characters.length
//     );
//   };

//   const selectCharacter = (type) => {
//     setPassword((prev) => prev + characters[type === "inner" ? innerIndex : outerIndex][type]);
//   };

//   return (
//     <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px" }}>
      
//       {/* Email Field */}
//       <div style={{ marginBottom: "10px", textAlign: "center" }}>
//         <label style={{ fontWeight: "bold" }}>Email-Id:*</label>
//         <input type="email" value="your-email@example.com" readOnly style={{ marginLeft: "10px", padding: "5px", border: "1px solid black" }} />
//       </div>

//       {/* Circular Wheel */}
//       <div style={{ position: "relative", width: "180px", height: "180px", borderRadius: "50%", border: "4px solid black", display: "flex", alignItems: "center", justifyContent: "center" }}>
//         {characters.map((char, index) => {
//           const angle = (index * 360) / characters.length;
//           return (
//             <div
//               key={index}
//               style={{
//                 position: "absolute",
//                 transform: `rotate(${angle}deg) translate(70px) rotate(-${angle}deg)`,
//                 fontWeight: index === innerIndex || index === outerIndex ? "bold" : "normal",
//                 color: index === innerIndex || index === outerIndex ? "black" : "gray",
//               }}
//             >
//               {char.inner} / {char.outer}
//             </div>
//           );
//         })}
//       </div>

//       {/* Rotation Buttons */}
//       <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "40px", marginTop: "20px" }}>
//         <div>
//           <p style={{ textAlign: "center", fontSize: "12px" }}>ANTI CLOCKWISE</p>
//           <button onClick={() => rotateInner("counterclockwise")}>Inner Orbit ⬅️</button>
//         </div>
//         <div>
//           <p style={{ textAlign: "center", fontSize: "12px" }}>CLOCKWISE</p>
//           <button onClick={() => rotateOuter("clockwise")}>Outer Orbit ➡️</button>
//         </div>
//       </div>

//       {/* Selection Buttons */}
//       <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
//         <button onClick={() => selectCharacter("inner")} style={{ padding: "5px", border: "1px solid black" }}>Select Inner</button>
//         <button onClick={() => selectCharacter("outer")} style={{ padding: "5px", border: "1px solid black" }}>Select Outer</button>
//       </div>

//       {/* Password Input */}
//       <div style={{ marginTop: "10px" }}>
//         <label>Enter Password:</label>
//         <input type={showPassword ? "text" : "password"} value={password} readOnly style={{ padding: "5px", border: "1px solid black", marginLeft: "10px" }} />
//       </div>

//       {/* Show Password Checkbox */}
//       <div>
//         <input type="checkbox" id="showPassword" onChange={() => setShowPassword(!showPassword)} />
//         <label htmlFor="showPassword" style={{ marginLeft: "5px" }}>Show Password</label>
//       </div>

//       {/* Login & Reset Buttons */}
//       <div style={{ display: "flex", gap: "20px", marginTop: "10px" }}>
//         <button style={{ padding: "5px", border: "1px solid black" }}>Login</button>
//         <button style={{ padding: "5px", border: "1px solid black" }} onClick={() => setPassword("")}>Reset</button>
//       </div>
//     </div>
//   );
// };

// export default ColorWheelLogin;





// import React, { useState, useEffect } from "react";

// const generateRandomCharacters = () => {
//   const chars = [
//     { inner: "a", outer: "1" },
//     { inner: "b", outer: "2" },
//     { inner: "c", outer: "3" },
//     { inner: "d", outer: "4" },
//     { inner: "e", outer: "5" },
//     { inner: "f", outer: "6" },
//     { inner: "g", outer: "7" },
//     { inner: "h", outer: "8" },
//   ];
//   return chars.sort(() => Math.random() - 0.5);
// };

// const ColorWheelLogin = () => {
//   const [characters, setCharacters] = useState(generateRandomCharacters);
//   const [selectedIndex, setSelectedIndex] = useState(0);
//   const [password, setPassword] = useState("");

//   useEffect(() => {
//     setCharacters(generateRandomCharacters());
//   }, []);

//   const rotate = (direction) => {
//     setSelectedIndex((prev) =>
//       direction === "clockwise"
//         ? (prev + 1) % characters.length
//         : (prev - 1 + characters.length) % characters.length
//     );
//   };

//   const selectCharacter = (type) => {
//     setPassword((prev) => prev + characters[selectedIndex][type]);
//   };

//   return (
//     <div className="flex flex-col items-center gap-6 p-6">
//       <div className="relative w-52 h-52 rounded-full border-4 border-black flex items-center justify-center">
//         {characters.map((char, index) => {
//           const angle = (360 / characters.length) * index;
//           const isActive = index === selectedIndex;
//           return (
//             <div
//               key={index}
//               className={`absolute w-1/2 h-1/2 flex items-center justify-center border-l-2 transition-all 
//               ${isActive ? "border-yellow-400 text-yellow-500" : "border-black text-black"}`}
//               style={{
//                 transform: `rotate(${angle}deg) translateY(-50%)`,
//                 clipPath: "polygon(50% 50%, 100% 0, 100% 100%)",
//               }}
//             >
//               <span
//                 className="absolute text-sm font-bold rotate-[${-angle}deg]"
//               >
//                 {char.inner}/{char.outer}
//               </span>
//             </div>
//           );
//         })}
//       </div>
//       <div className="flex gap-4 mt-4">
//         <button onClick={() => rotate("counterclockwise")} className="px-4 py-2 border rounded bg-gray-200">
//           ⟵ Rotate
//         </button>
//         <button onClick={() => rotate("clockwise")} className="px-4 py-2 border rounded bg-gray-200">
//           Rotate ⟶
//         </button>
//       </div>
//       <div className="flex gap-4 mt-4">
//         <button onClick={() => selectCharacter("inner")} className="px-4 py-2 border rounded bg-blue-200">
//           Select Inner
//         </button>
//         <button onClick={() => selectCharacter("outer")} className="px-4 py-2 border rounded bg-green-200">
//           Select Outer
//         </button>
//       </div>
//       <input type="text" value={password} readOnly className="mt-4 p-2 border rounded" />
//     </div>
//   );
// };

// export default ColorWheelLogin;



// this is the proper circle with partition

// const ColorWheel = () => {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <svg width="300" height="300" viewBox="0 0 200 200">
//           {/* Main Circle */}
//           <circle cx="100" cy="100" r="95" stroke="black" strokeWidth="4" fill="white" />
  
//           {/* Section Lines */}
//           {[...Array(8)].map((_, index) => {
//             const angle = (360 / 8) * index;
//             const x = 100 + 95 * Math.cos((angle * Math.PI) / 180);
//             const y = 100 + 95 * Math.sin((angle * Math.PI) / 180);
  
//             return (
//               <line
//                 key={index}
//                 x1="100"
//                 y1="100"
//                 x2={x}
//                 y2={y}
//                 stroke="black"
//                 strokeWidth="2"
//               />
//             );
//           })}
//         </svg>
//       </div>
//     );
//   };
  
//   export default ColorWheel;
  


// this is the code which postioned the chars propely in the circle 
// with 8 partions

// const ColorWheel = () => {
//     // Hexadecimal characters for each section
//     const characters = [
//       { inner: "A", outer: "1" },
//       { inner: "B", outer: "2" },
//       { inner: "C", outer: "3" },
//       { inner: "D", outer: "4" },
//       { inner: "E", outer: "5" },
//       { inner: "F", outer: "6" },
//       { inner: "G", outer: "7" },
//       { inner: "H", outer: "8" },
//     ];
  
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <svg width="300" height="300" viewBox="0 0 200 200">
//           {/* Main Circle */}
//           <circle cx="100" cy="100" r="95" stroke="black" strokeWidth="4" fill="white" />
  
//           {/* Section Lines */}
//           {[...Array(8)].map((_, index) => {
//             const angle = (360 / 8) * index;
//             const x = 100 + 95 * Math.cos((angle * Math.PI) / 180);
//             const y = 100 + 95 * Math.sin((angle * Math.PI) / 180);
  
//             return (
//               <line
//                 key={index}
//                 x1="100"
//                 y1="100"
//                 x2={x}
//                 y2={y}
//                 stroke="black"
//                 strokeWidth="2"
//               />
//             );
//           })}
  
//           {/* Characters Inside Sections */}
//           {characters.map((char, index) => {
//             const angle = (360 / 8) * (index + 0.5); // Offset by 0.5 to position in the center of the section
//             const radian = (angle * Math.PI) / 180;
  
//             // Move characters **to the middle of their sections**
//             const innerX = 100 + 30 * Math.cos(radian); // Inner orbit slightly inward
//             const innerY = 100 + 30 * Math.sin(radian);
//             const outerX = 100 + 60 * Math.cos(radian); // Outer orbit between center and edge
//             const outerY = 100 + 60 * Math.sin(radian);
  
//             return (
//               <g key={index}>
//                 {/* Inner Orbit Character */}
//                 <text 
//                   x={innerX} 
//                   y={innerY} 
//                   fontSize="14" 
//                   fontWeight="bold" 
//                   textAnchor="middle" 
//                   alignmentBaseline="middle" 
//                   fill="black"
//                 >
//                   {char.inner}
//                 </text>
  
//                 {/* Outer Orbit Character */}
//                 <text 
//                   x={outerX} 
//                   y={outerY} 
//                   fontSize="14" 
//                   fontWeight="bold" 
//                   textAnchor="middle" 
//                   alignmentBaseline="middle" 
//                   fill="black"
//                 >
//                   {char.outer}
//                 </text>
//               </g>
//             );
//           })}
//         </svg>
//       </div>
//     );
//   };
  
//   export default ColorWheel;
  


// this is the whole wheel with the color 

// const ColorWheel = () => {
//     // Hexadecimal characters for each section
//     const characters = [
//       { inner: "A", outer: "1" },
//       { inner: "B", outer: "2" },
//       { inner: "C", outer: "3" },
//       { inner: "D", outer: "4" },
//       { inner: "E", outer: "5" },
//       { inner: "F", outer: "6" },
//       { inner: "G", outer: "7" },
//       { inner: "H", outer: "8" },
//     ];
  
//     // Colors for each section border
//     const colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet", "black"];
  
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <svg width="300" height="300" viewBox="0 0 200 200">
//           {/* Main Circle with colored border */}
//           <circle cx="100" cy="100" r="95" stroke="black" strokeWidth="4" fill="white" />
  
//           {/* Section Borders */}
//           {[...Array(8)].map((_, index) => {
//             const angle = (360 / 8) * index;
//             const x1 = 100 + 95 * Math.cos((angle * Math.PI) / 180);
//             const y1 = 100 + 95 * Math.sin((angle * Math.PI) / 180);
//             const x2 = 100 + 95 * Math.cos(((angle + 45) * Math.PI) / 180);
//             const y2 = 100 + 95 * Math.sin(((angle + 45) * Math.PI) / 180);
  
//             return (
//               <path
//                 key={index}
//                 d={`M100,100 L${x1},${y1} A95,95 0 0,1 ${x2},${y2} Z`}
//                 fill="none"
//                 stroke={colors[index]}
//                 strokeWidth="4"
//               />
//             );
//           })}
  
//           {/* Section Lines */}
//           {[...Array(8)].map((_, index) => {
//             const angle = (360 / 8) * index;
//             const x = 100 + 95 * Math.cos((angle * Math.PI) / 180);
//             const y = 100 + 95 * Math.sin((angle * Math.PI) / 180);
  
//             return (
//               <line
//                 key={index}
//                 x1="100"
//                 y1="100"
//                 x2={x}
//                 y2={y}
//                 stroke="black"
//                 strokeWidth="2"
//               />
//             );
//           })}
  
//           {/* Characters Inside Sections */}
//           {characters.map((char, index) => {
//             const angle = (360 / 8) * (index + 0.5); // Offset to place in center of section
//             const radian = (angle * Math.PI) / 180;
  
//             // Adjusted positions for correct placement inside sections
//             const innerX = 100 + 30 * Math.cos(radian);
//             const innerY = 100 + 30 * Math.sin(radian);
//             const outerX = 100 + 60 * Math.cos(radian);
//             const outerY = 100 + 60 * Math.sin(radian);
  
//             return (
//               <g key={index}>
//                 {/* Inner Orbit Character */}
//                 <text 
//                   x={innerX} 
//                   y={innerY} 
//                   fontSize="14" 
//                   fontWeight="bold" 
//                   textAnchor="middle" 
//                   alignmentBaseline="middle" 
//                   fill="black"
//                 >
//                   {char.inner}
//                 </text>
  
//                 {/* Outer Orbit Character */}
//                 <text 
//                   x={outerX} 
//                   y={outerY} 
//                   fontSize="14" 
//                   fontWeight="bold" 
//                   textAnchor="middle" 
//                   alignmentBaseline="middle" 
//                   fill="black"
//                 >
//                   {char.outer}
//                 </text>
//               </g>
//             );
//           })}
//         </svg>
//       </div>
//     );
//   };
  
//   export default ColorWheel;
  
  
// import { useState } from "react";

// const ColorWheel = () => {
//   const sections = [
//     { inner: "A", outer: "1", color: "#FFDDC1" },
//     { inner: "B", outer: "2", color: "#FFABAB" },
//     { inner: "C", outer: "3", color: "#FFC3A0" },
//     { inner: "D", outer: "4", color: "#D5AAFF" },
//     { inner: "E", outer: "5", color: "#85E3FF" },
//     { inner: "F", outer: "6", color: "#B9FBC0" },
//     { inner: "G", outer: "7", color: "#AFCBFF" },
//     { inner: "H", outer: "8", color: "#FFFFB5" },
//   ];

//   const [activeIndex, setActiveIndex] = useState(0);
//   const [password, setPassword] = useState("");

//   const rotateClockwise = () => {
//     setActiveIndex((prev) => (prev + 1) % sections.length);
//   };

//   const rotateCounterClockwise = () => {
//     setActiveIndex((prev) => (prev - 1 + sections.length) % sections.length);
//   };

//   const selectCharacter = (type) => {
//     const selectedChar = type === "inner" ? sections[activeIndex].inner : sections[activeIndex].outer;
//     setPassword((prev) => prev + selectedChar);
//   };

//   return (
//     <div className="flex flex-col justify-center items-center h-screen">
//       <svg width="300" height="300" viewBox="0 0 200 200">
//         {/* Main Circle - Takes active section's color */}
//         <circle cx="100" cy="100" r="95" stroke="black" strokeWidth="2" fill={sections[activeIndex].color} />

//         {/* White Sections */}
//         {sections.map((_, index) => {
//           const startAngle = (360 / 8) * index;
//           const endAngle = (360 / 8) * (index + 1);
//           const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

//           const startX = 100 + 95 * Math.cos((startAngle * Math.PI) / 180);
//           const startY = 100 + 95 * Math.sin((startAngle * Math.PI) / 180);
//           const endX = 100 + 95 * Math.cos((endAngle * Math.PI) / 180);
//           const endY = 100 + 95 * Math.sin((endAngle * Math.PI) / 180);

//           return (
//             <path
//               key={index}
//               d={`
//                 M 100,100 
//                 L ${startX},${startY} 
//                 A 95,95 0 ${largeArcFlag},1 ${endX},${endY} 
//                 Z
//               `}
//               fill="white"
//               stroke={index === activeIndex ? "black" : "white"}
//               strokeWidth={index === activeIndex ? "6" : "2"} // Make active section bold
//             />
//           );
//         })}

//         {/* Section Lines */}
//         {sections.map((_, index) => {
//           const angle = (360 / 8) * index;
//           const x = 100 + 95 * Math.cos((angle * Math.PI) / 180);
//           const y = 100 + 95 * Math.sin((angle * Math.PI) / 180);

//           return <line key={index} x1="100" y1="100" x2={x} y2={y} stroke="black" strokeWidth="2" />;
//         })}

//         {/* Characters Inside Sections */}
//         {sections.map((char, index) => {
//           const angle = (360 / 8) * index + 22.5; // Offset to center characters
//           const radian = (angle * Math.PI) / 180;

//           const innerX = 100 + 55 * Math.cos(radian);
//           const innerY = 100 + 55 * Math.sin(radian);
//           const outerX = 100 + 80 * Math.cos(radian);
//           const outerY = 100 + 80 * Math.sin(radian);

//           return (
//             <g key={index}>
//               <text x={innerX} y={innerY} fontSize="14" fontWeight="bold" textAnchor="middle" alignmentBaseline="middle" fill="black">
//                 {char.inner}
//               </text>
//               <text x={outerX} y={outerY} fontSize="14" fontWeight="bold" textAnchor="middle" alignmentBaseline="middle" fill="black">
//                 {char.outer}
//               </text>
//             </g>
//           );
//         })}
//       </svg>

//       {/* Controls */}
//       <div className="mt-4 flex gap-4">
//         <button onClick={rotateCounterClockwise} className="px-4 py-2 bg-gray-300 rounded">Rotate Left</button>
//         <button onClick={rotateClockwise} className="px-4 py-2 bg-gray-300 rounded">Rotate Right</button>
//         <button onClick={() => selectCharacter("inner")} className="px-4 py-2 bg-blue-500 text-white rounded">Select Inner</button>
//         <button onClick={() => selectCharacter("outer")} className="px-4 py-2 bg-green-500 text-white rounded">Select Outer</button>
//       </div>

//       {/* Password Field */}
//       <input type="text" value={password} readOnly className="mt-4 p-2 border border-gray-400 rounded" placeholder="Password" />
//     </div>
//   );
// };

// export default ColorWheel;




import { useState } from "react";

const ColorWheel = () => {
  const characters = [
    { inner: "A", outer: "1" },
    { inner: "B", outer: "2" },
    { inner: "C", outer: "3" },
    { inner: "D", outer: "4" },
    { inner: "E", outer: "5" },
    { inner: "F", outer: "6" },
    { inner: "G", outer: "7" },
    { inner: "H", outer: "8" },
  ];

  const colors = ["red", "orange", "yellow", "green", "blue", "darkgreen", "violet", "gray"];

  const [activeIndex, setActiveIndex] = useState(0);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const rotateClockwise = () => {
    setActiveIndex((prev) => (prev + 1) % 8);
  };

  const rotateCounterClockwise = () => {
    setActiveIndex((prev) => (prev - 1 + 8) % 8);
  };

  const selectInner = () => {
    setPassword((prev) => prev + characters[activeIndex].inner);
  };

  const selectOuter = () => {
    setPassword((prev) => prev + characters[activeIndex].outer);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      {/* SVG Wheel */}
      <svg width="300" height="300" viewBox="0 0 200 200">
        {/* Main Circle */}
        <circle cx="100" cy="100" r="95" stroke="black" strokeWidth="4" fill="white" />

        {/* Sections */}
        {[...Array(8)].map((_, index) => {
          const angle = (360 / 8) * index;
          const x1 = 100 + 95 * Math.cos((angle * Math.PI) / 180);
          const y1 = 100 + 95 * Math.sin((angle * Math.PI) / 180);
          const x2 = 100 + 95 * Math.cos(((angle + 45) * Math.PI) / 180);
          const y2 = 100 + 95 * Math.sin(((angle + 45) * Math.PI) / 180);

          return (
            <path
              key={index}
              d={`M100,100 L${x1},${y1} A95,95 0 0,1 ${x2},${y2} Z`}
              fill="none"
              stroke={colors[index]}
              strokeWidth="4"
            />
          );
        })}

        {/* Section Lines */}
        {[...Array(8)].map((_, index) => {
          const angle = (360 / 8) * index;
          const x = 100 + 95 * Math.cos((angle * Math.PI) / 180);
          const y = 100 + 95 * Math.sin((angle * Math.PI) / 180);

          return <line key={index} x1="100" y1="100" x2={x} y2={y} stroke="black" strokeWidth="2" />;
        })}

        {/* Characters Inside Sections */}
        {characters.map((char, index) => {
          const angle = (360 / 8) * (index + 0.5);
          const radian = (angle * Math.PI) / 180;
          const innerX = 100 + 30 * Math.cos(radian);
          const innerY = 100 + 30 * Math.sin(radian);
          const outerX = 100 + 60 * Math.cos(radian);
          const outerY = 100 + 60 * Math.sin(radian);

          return (
            <g key={index}>
              <text x={innerX} y={innerY} fontSize="14" fontWeight="bold" textAnchor="middle" alignmentBaseline="middle" fill="black">
                {char.inner}
              </text>
              <text x={outerX} y={outerY} fontSize="14" fontWeight="bold" textAnchor="middle" alignmentBaseline="middle" fill="black">
                {char.outer}
              </text>
            </g>
          );
        })}

        {/* Active Section Border - Draw Last So It's on Top */}
        {(() => {
          const angle = (360 / 8) * activeIndex;
          const x1 = 100 + 95 * Math.cos((angle * Math.PI) / 180);
          const y1 = 100 + 95 * Math.sin((angle * Math.PI) / 180);
          const x2 = 100 + 95 * Math.cos(((angle + 45) * Math.PI) / 180);
          const y2 = 100 + 95 * Math.sin(((angle + 45) * Math.PI) / 180);

          return (
            <path
              d={`M100,100 L${x1},${y1} A95,95 0 0,1 ${x2},${y2} Z`}
              fill="none"
              stroke="black"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          );
        })()}
      </svg>

      {/* Controls */}
      <div className="flex space-x-4">
        <button onClick={rotateCounterClockwise} className="px-4 py-2 bg-gray-700 text-white rounded">
          ⬅ Counterclockwise
        </button>
        <button onClick={rotateClockwise} className="px-4 py-2 bg-gray-700 text-white rounded">
          Clockwise ➡
        </button>
      </div>

      <div className="flex space-x-4">
        <button onClick={selectInner} className="px-4 py-2 bg-blue-500 text-white rounded">
          Select Inner
        </button>
        <button onClick={selectOuter} className="px-4 py-2 bg-green-500 text-white rounded">
          Select Outer
        </button>
      </div>

      {/* Password Display */}
      <div className="flex flex-col items-center">
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          readOnly
          className="px-4 py-2 border border-gray-400 rounded  text-xl"
          placeholder="Password Input"
        />

        {/* Show Password Checkbox */}
        <label className="flex items-center mt-2 space-x-2">
          <input type="checkbox" checked={showPassword} onChange={() => setShowPassword(!showPassword)} />
          <span>Show Password</span>
        </label>
      </div>
    </div>
  );
};

export default ColorWheel;


