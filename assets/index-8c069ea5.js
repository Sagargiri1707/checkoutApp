import{w as j,r as f,G as b,j as n}from"./index-6c6b96d4.js";function p(){var c,e,l,x,d;const{productDetails:o,checkedState:u,adressDetails:r,currentAddress:m}=f.useContext(b),t=(c=r==null?void 0:r.addressList)==null?void 0:c[m],i=(e=o==null?void 0:o.productData)==null?void 0:e.reduce((a,s,h)=>(u[h]&&(a.totalPrice+=s.itemPrice.originalPrice*s.quantity,a.discount+=(s.itemPrice.originalPrice-s.itemPrice.discountedPrice)*s.quantity,a.finalPrice+=s.itemPrice.discountedPrice*s.quantity),a),{totalPrice:0,discount:0,finalPrice:0});return n.jsxs("div",{className:"mx-auto lg:w-96 w-full h:w-96 mt-8 mb-8 shadow-md",children:[n.jsx("h2",{className:"text-2xl font-bold mb-4 p-4 text-center",children:"Checkout"}),n.jsxs("div",{className:"border-t border-b py-2 p-4",children:[n.jsxs("div",{className:"flex justify-between",children:[n.jsx("span",{children:"Product Price:"}),n.jsxs("span",{children:["₹",(l=i==null?void 0:i.totalPrice)==null?void 0:l.toFixed(2)]})]}),n.jsxs("div",{className:"flex justify-between",children:[n.jsx("span",{children:"Discounts"}),n.jsxs("span",{children:["₹",(x=i==null?void 0:i.discount)==null?void 0:x.toFixed(2)]})]})]}),n.jsx("div",{className:"mt-4 p-4",children:n.jsxs("div",{className:"flex justify-between",children:[n.jsx("span",{className:"text-xl font-bold",children:"Total Amount:"}),n.jsxs("span",{className:"text-xl font-bold",children:["₹",(d=i==null?void 0:i.finalPrice)==null?void 0:d.toFixed(2)]})]})}),n.jsxs("div",{className:"bg-white mt-6 rounded w-full p-4",children:[n.jsx("p",{className:"text-xl font-bold mb-2",children:"Selected address:"}),n.jsxs("p",{className:"text-gray-700",children:[t==null?void 0:t.name,n.jsx("br",{}),t==null?void 0:t.phone,n.jsx("br",{}),t==null?void 0:t.address,n.jsx("br",{}),t==null?void 0:t.city,", ",t==null?void 0:t.city," ",t==null?void 0:t.pincode]})]})]})}const N=j("FinalConfirmation",p);export{N as default};
