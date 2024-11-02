(()=>{var e={};e.id=931,e.ids=[931],e.modules={2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},9491:e=>{"use strict";e.exports=require("assert")},4300:e=>{"use strict";e.exports=require("buffer")},2081:e=>{"use strict";e.exports=require("child_process")},6113:e=>{"use strict";e.exports=require("crypto")},2361:e=>{"use strict";e.exports=require("events")},7147:e=>{"use strict";e.exports=require("fs")},3685:e=>{"use strict";e.exports=require("http")},5687:e=>{"use strict";e.exports=require("https")},1808:e=>{"use strict";e.exports=require("net")},2037:e=>{"use strict";e.exports=require("os")},1017:e=>{"use strict";e.exports=require("path")},2781:e=>{"use strict";e.exports=require("stream")},4404:e=>{"use strict";e.exports=require("tls")},6224:e=>{"use strict";e.exports=require("tty")},7310:e=>{"use strict";e.exports=require("url")},3837:e=>{"use strict";e.exports=require("util")},9796:e=>{"use strict";e.exports=require("zlib")},2433:(e,s,r)=>{"use strict";r.r(s),r.d(s,{GlobalError:()=>i.a,__next_app__:()=>p,originalPathname:()=>u,pages:()=>c,routeModule:()=>m,tree:()=>d}),r(5480),r(2029),r(1930),r(5866);var t=r(3191),a=r(8716),o=r(7922),i=r.n(o),n=r(5231),l={};for(let e in n)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>n[e]);r.d(s,l);let d=["",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,5480)),"E:\\Projects Repository\\task_manager\\src\\app\\page.tsx"]}]},{layout:[()=>Promise.resolve().then(r.bind(r,2029)),"E:\\Projects Repository\\task_manager\\src\\app\\layout.tsx"],loading:[()=>Promise.resolve().then(r.bind(r,1930)),"E:\\Projects Repository\\task_manager\\src\\app\\loading.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,5866,23)),"next/dist/client/components/not-found-error"]}],c=["E:\\Projects Repository\\task_manager\\src\\app\\page.tsx"],u="/page",p={require:r,loadChunk:()=>Promise.resolve()},m=new t.AppPageRouteModule({definition:{kind:a.x.APP_PAGE,page:"/page",pathname:"/",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},8976:(e,s,r)=>{Promise.resolve().then(r.bind(r,5007))},5007:(e,s,r)=>{"use strict";r.r(s),r.d(s,{default:()=>b});var t=r(326),a=r(123);let o=a.Ry().shape({email:a.Z_().email("Invalid email address").required("Email is required"),password:a.Z_().min(3,"Password must be at least 6 characters").required("Password is required")}),i=a.Ry().shape({newPassword:a.Z_().min(6,"Password must be at least 6 characters").required("New password is required"),confirmPassword:a.Z_().oneOf([a.iH("newPassword"),void 0],"Passwords must match").required("Confirm password is required")});var n=r(1774),l=r(4099),d=r(7577),c=r(4723),u=r(4173),p=r.n(u);let m=({isModalOpen:e,setIsModalOpen:s,empId:r})=>{let{register:a,handleSubmit:o,formState:{errors:d}}=(0,c.cI)({resolver:(0,n.X)(i)}),u=async e=>{try{let t=await l.Z.post(`http://ec2-35-173-139-149.compute-1.amazonaws.com/auth/change-password/${r}`,{newPassword:e.newPassword});console.log(t.data),s(!1)}catch(e){console.error("Error changing password",e)}};return t.jsx(p(),{isOpen:e,onRequestClose:()=>s(!1),ariaHideApp:!1,contentLabel:"Change Password",className:"fixed inset-0 flex items-center justify-center",overlayClassName:"fixed inset-0 bg-black bg-opacity-50 z-50",children:(0,t.jsxs)("div",{className:"bg-white p-8 rounded-xl shadow-lg max-w-md w-full relative",children:[t.jsx("h2",{className:"text-2xl font-bold mb-4",children:"Change Password"}),(0,t.jsxs)("form",{onSubmit:o(u),children:[(0,t.jsxs)("div",{children:[t.jsx("label",{className:"block  text-sm font-medium",children:"New Password"}),t.jsx("input",{type:"password",...a("newPassword"),className:`w-full px-4 py-2 mt-1 rounded-lg    focus:outline-none focus:ring-2 focus:ring-accent border ${d.newPassword?"border-red-600":"border-[#1b1a40]"}`,placeholder:"Enter new password"}),d.newPassword&&t.jsx("p",{className:"text-red-600 mt-1 text-sm",children:d.newPassword.message})]}),(0,t.jsxs)("div",{className:"mt-4",children:[t.jsx("label",{className:"block  text-sm font-medium",children:"Confirm Password"}),t.jsx("input",{type:"password",...a("confirmPassword"),className:`w-full px-4 py-2 mt-1 rounded-lg    focus:outline-none focus:ring-2 focus:ring-accent border ${d.confirmPassword?"border-red-600":"border-[#1b1a40]"}`,placeholder:"Confirm new password"}),d.confirmPassword&&t.jsx("p",{className:"text-red-600 mt-1 text-sm",children:d.confirmPassword.message})]}),t.jsx("button",{type:"submit",className:"w-full py-2 mt-4 bg-[#413d99] text-white rounded-lg font-bold hover:bg-opacity-90 transition duration-200",children:"Change Password"})]}),t.jsx("button",{onClick:()=>s(!1),className:"absolute top-2 right-2 text-gray-700 hover:text-red-500",children:"\xd7"})]})})};var x=r(4006),g=r(5047),h=r(2027),w=r(1191);let b=()=>{let{dispatchAction:e,selector:s}=(0,h.Sc)(e=>e.user),{loading:r,error:a,isAuthenticated:i}=s,l=(0,g.useRouter)(),[u,p]=(0,d.useState)(!1),[b,f]=(0,d.useState)(""),[y,P]=(0,d.useState)({open:!1,message:"",severity:"success"}),{register:j,handleSubmit:v,formState:{errors:q}}=(0,c.cI)({resolver:(0,n.X)(o)}),N=async s=>{try{let r=await e(x.pH,s).unwrap();console.log("Login successful",r),P({open:!0,message:"Login successful!",severity:"success"})}catch(e){f(e.split(",")[1]),e.startsWith("You must change your password on the first login")?p(!0):(console.error("Login failed",e),P({open:!0,message:"Login failed. Please check your credentials.",severity:"error"}))}};return(0,d.useEffect)(()=>{i&&l.replace("/home")},[i,l]),(0,t.jsxs)("div",{className:"flex items-center justify-center min-h-screen bg-white",children:[(0,t.jsxs)("div",{className:"backdrop-blur-md bg-gray-200 p-10 rounded-xl shadow-xl max-w-sm w-full",children:[t.jsx("h1",{className:"text-center text-2xl text-[#1b1a40] font-bold mb-6",children:"Company Managment System"}),(0,t.jsxs)("form",{className:"space-y-4",onSubmit:v(N),children:[(0,t.jsxs)("div",{children:[t.jsx("label",{className:"block text-sm font-medium",children:"Email"}),t.jsx("input",{type:"email",...j("email"),className:`w-full px-4 py-2 mt-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent border ${q.email?"border-red-600":"border-[#1b1a40]"}`,placeholder:"Enter your email"}),q.email&&t.jsx("p",{className:"text-red-600 mt-1 text-sm",children:q.email.message})]}),(0,t.jsxs)("div",{children:[t.jsx("label",{className:"block text-sm font-medium",children:"Password"}),t.jsx("input",{type:"password",...j("password"),className:`w-full px-4 py-2 mt-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent border ${q.password?"border-red-600":"border-[#1b1a40]"}`,placeholder:"Enter your password"}),q.password&&t.jsx("p",{className:"mt-1 text-sm text-red-600",children:q.password.message})]}),t.jsx("button",{type:"submit",className:`w-full py-2 mt-4 bg-[#1b1a40] text-white rounded-lg font-bold hover:bg-opacity-90 transition duration-200 ${r?"opacity-50 cursor-not-allowed":""}`,disabled:r,children:r?"Logging in...":"Login"}),a&&t.jsx("p",{className:"text-red-600 mt-2 text-center",children:a})]})]}),t.jsx(m,{empId:b,isModalOpen:u,setIsModalOpen:p}),t.jsx(w.Z,{open:y.open,message:y.message,severity:y.severity,onClose:()=>P(e=>({...e,open:!1}))})]})}},1191:(e,s,r)=>{"use strict";r.d(s,{Z:()=>i});var t=r(326);r(7577);var a=r(2375),o=r(708);let i=({open:e,message:s,severity:r,onClose:i})=>{let n=(e,s)=>{"clickaway"!==s&&i()};return t.jsx(a.Z,{open:e,autoHideDuration:2e3,onClose:n,children:t.jsx(o.Z,{onClose:n,severity:r,variant:"filled",sx:{width:"100%"},children:s})})}},5480:(e,s,r)=>{"use strict";r.r(s),r.d(s,{default:()=>t});let t=(0,r(8570).createProxy)(String.raw`E:\Projects Repository\task_manager\src\app\page.tsx#default`)}};var s=require("../webpack-runtime.js");s.C(e);var r=e=>s(s.s=e),t=s.X(0,[309,644,899,260],()=>r(2433));module.exports=t})();