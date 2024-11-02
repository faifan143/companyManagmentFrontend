(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3185],{2834:function(e,t,s){Promise.resolve().then(s.bind(s,5758))},5758:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return D}});var r=s(7437),a=s(2265),l=s(6027),n=s(89);l.ZP.use(n.Db).init({resources:{en:{translation:{Welcome:"Welcome and react-i18next"}},ar:{translation:{Welcome:"هلا "}}},lng:"ar",interpolation:{escapeValue:!1}});var i=l.ZP,o=e=>{let{children:t}=e;return(0,r.jsx)(n.a3,{i18n:i,children:t})},c=s(6094),d=s(3191);function u(e){let{children:t}=e,[s]=a.useState(new c.S);return(0,r.jsx)(d.aH,{client:s,children:t})}var h=s(6804),m=s(1116),p=s(1046),x=s(5574),f=s(6992);let g={key:"root",storage:p.Z,whitelist:["counter","user"]},b=(0,h.UY)({user:f.ZP}),v=(0,x.OJ)(g,b),j=(0,m.xC)({reducer:v,middleware:e=>e({serializableCheck:{ignoredActions:[x._P,x.I2,x.E7,x.ex,x.e,x.Nz]}})}),w=(0,x.p5)(j);var N=s(1444),y=s(4504),k=e=>{let{children:t}=e;return(0,r.jsx)(N.zt,{store:j,children:(0,r.jsx)(y.r,{persistor:w,children:t})})},_=e=>{let{children:t}=e;return(0,r.jsx)(k,{children:(0,r.jsx)(u,{children:(0,r.jsx)(o,{children:t})})})},C=s(2649),S=s(6463),Z=s(9094);let E=[{label:"Home",icon:Z.tv,path:"/home",requiredPermissions:[]},{label:"Tasks Management",icon:Z.Fl,path:"/tasks",requiredPermissions:["task_search_and_view"]},{label:"Employees Management",icon:Z.Kc,path:"/employees",requiredPermissions:["emp_search_and_view"]},{label:"Departments Management",icon:Z.LM,path:"/departments",requiredPermissions:["department_search_and_view"]},{label:"Job Titles Management",icon:Z.hO,path:"/jobs",requiredPermissions:["job_title_search_and_view"]}];var I=s(6648),P=s(7583),W=s.n(P),z=s(1942),A=s(3753),H=s(5730),M=s(8472);let q=e=>{let[t,s]=(0,a.useState)([]),r=async()=>{let s=t.map(e=>({fileName:e.name,contentType:e.type})),r=await M.Z.post(e,{files:s},{headers:{Authorization:"Bearer ".concat(C.Z.get("access_token"))}}),a=r.data.files.map(e=>e.uploadUrl),n=r.data.files.map(e=>e.downloadUrl.split("?")[0]);for(let[e,s]of a.entries()){let r=t[e],a=await l(r);await M.Z.put(s,a,{headers:{"Content-Type":r.type}})}return n},l=e=>new Promise((t,s)=>{let r=new FileReader;r.onloadend=()=>r.result?t(r.result):s("Failed to read file"),r.onerror=()=>s(r.error),r.readAsArrayBuffer(e)});return{selectedFiles:t,handleFileChange:(e,r)=>{let a=[...t];r?a[e]=r:a.splice(e,1),s(a)},uploadFiles:r}};var O=e=>{var t;let{isOpen:s,onClose:l}=e,[n,i]=(0,a.useState)([]),[o,c]=(0,a.useState)(""),d=(0,a.useRef)(null),{selectedFiles:u,handleFileChange:h,uploadFiles:m}=q("http://".concat("ec2-35-173-139-149.compute-1.amazonaws.com","/upload")),{selector:p}=(0,H.Sc)(e=>e.user);(0,a.useEffect)(()=>{let e=e=>{i(t=>[...t,e])};return A.W.on("receiveCommunication",e),s&&x(),()=>{A.W.off("receiveCommunication",e)}},[s]);let x=async()=>{try{let e=await M.Z.get("http://".concat("ec2-35-173-139-149.compute-1.amazonaws.com","/internal-communications/chats"),{headers:{Authorization:"Bearer ".concat(C.Z.get("access_token"))}});console.log(e),i(e.data)}catch(e){console.error("Error fetching initial messages:",e)}},f=async()=>{if(o.trim()||u.length>0){let e=[];u.length>0&&(e=await m());let t={emp:"ME",sender_Id:p.userInfo.id,department:p.userInfo.department.name,message:o,date:new Date,files:e};A.W.emit("send-message",t),c(""),d.current&&(d.current.value="")}else alert("Please write a comment or attach a file before sending.")};return(0,r.jsx)(W(),{isOpen:s,onRequestClose:l,ariaHideApp:!1,className:"fixed right-0 top-0 flex items-center justify-center w-[450px]  p-4 h-full",overlayClassName:"fixed inset-0 bg-black bg-opacity-50",children:p.userInfo&&p.userInfo.department&&(0,r.jsxs)("div",{className:"bg-white p-6 rounded-lg shadow-lg w-full relative h-full",children:[(0,r.jsxs)("h2",{className:"text-xl  text-right font-bold mb-4",children:["محادثة ",null===(t=p.userInfo)||void 0===t?void 0:t.department.name]}),(0,r.jsx)("div",{className:"overflow-y-auto pb-10",style:{maxHeight:"90%",scrollbarWidth:"none",msOverflowStyle:"none"},children:n.map((e,t)=>(0,r.jsxs)("div",{className:"flex mb-4",children:[(0,r.jsx)("div",{className:"flex-shrink-0 w-10 h-10 bg-[#1b1a40] text-white rounded-full flex items-center justify-center mr-4",children:e.emp.charAt(0)}),(0,r.jsxs)("div",{children:[(0,r.jsx)("p",{className:"text-gray-900 font-semibold",children:e.emp}),(0,r.jsx)("p",{className:"text-xs text-gray-500",children:new Date(e.date).toLocaleTimeString()}),(0,r.jsx)("p",{className:"text-sm bg-gray-100 p-2 rounded-md shadow-md",children:e.message}),e.files&&e.files.length>0&&(0,r.jsx)("div",{className:"mt-2",children:e.files.map((e,t)=>(0,r.jsx)("div",{className:"bg-gray-200 text-gray-700 p-1 px-2 rounded-md inline-block mr-2 mb-1",children:e},t))})]})]},t))}),(0,r.jsxs)("div",{className:"bg-white flex items-center my-4 space-x-3 absolute bottom-0 w-[90%] p-2 border rounded-md resize-none focus:outline-none",children:[(0,r.jsx)("input",{type:"text",value:o,onChange:e=>c(e.target.value),placeholder:"Write a comment...",className:"w-[100%] resize-none focus:outline-none"}),(0,r.jsx)("label",{htmlFor:"file-upload",className:"cursor-pointer",children:(0,r.jsx)(z.jLr,{className:"text-gray-500 hover:text-gray-700"})}),(0,r.jsx)("input",{id:"file-upload",ref:d,type:"file",onChange:e=>h(u.length,e.target.files?e.target.files[0]:null),className:"hidden"}),(0,r.jsx)("button",{onClick:f,className:"bg-[#1b1a40] p-2 rounded-md text-white",children:(0,r.jsx)(z.Y2X,{})})]})]})})};let F=e=>{let{icon:t,label:s,isExpanded:l,isSelected:n,onClick:i}=e,o=a.cloneElement((0,r.jsx)(I.default,{src:t,alt:"home icon",width:20,height:20}),{color:"white"});return(0,r.jsxs)("div",{onClick:i,className:"flex cursor-pointer items-center text-white ".concat(l?"justify-start":"justify-center"," relative p-2"),children:[n&&(0,r.jsx)("div",{className:"absolute inset-0 bg-[#413d99] rounded-md",style:{padding:"6px"}}),(0,r.jsxs)("div",{className:"relative z-10 flex items-center",children:[o,l&&(0,r.jsx)("p",{className:"ml-2",children:s})]})]})};var L=e=>{let{isExpanded:t,setIsExpanded:s}=e,l=(0,N.v9)(e=>{var t;return null===(t=e.user.userInfo)||void 0===t?void 0:t.job.permissions}),[n,i]=(0,a.useState)(!1),o=(0,S.useRouter)(),[c,d]=(0,a.useState)(()=>localStorage.getItem("selectedTab")||"/home"),u=e=>{d(e),localStorage.setItem("selectedTab",e),o.push(e)},h=l?E.filter(e=>e.requiredPermissions.every(e=>l.includes(e))):[];return(0,r.jsxs)("div",{className:"shadow-md p-5 mr-5 fixed top-0 bottom-0 transition-width duration-300 bg-[#1b1a40] ".concat(t?"w-[350px]":"w-[92px]"),children:[(0,r.jsxs)("div",{className:"relative w-[34px] h-[34px] p-1 cursor-pointer flex items-center text-xl font-bold gap-4 text-white text-nowrap",onClick:()=>{s(e=>!e)},children:[(0,r.jsx)("div",{className:"font-bold text-white bg-[#413d99] rounded-md shadow-md p-2",children:"CM"}),t&&" Company Manager"]}),(0,r.jsxs)("div",{className:"sidebar flex flex-col space-y-4 py-4",children:[(0,r.jsx)("div",{className:"h-[1px] w-full bg-slate-200"}),h.map(e=>(0,r.jsx)(F,{icon:e.icon,label:e.label,isExpanded:t,isSelected:c===e.path,onClick:()=>u(e.path)},e.label)),(0,r.jsx)("div",{className:"h-[1px] w-full bg-slate-200"}),(0,r.jsx)(F,{icon:Z.qZ,label:"Department Chat",isExpanded:t,isSelected:n,onClick:()=>i(e=>!e)}),(0,r.jsx)(O,{isOpen:n,onClose:()=>i(!1)})]})]})},T=s(2299),R=()=>{let e=(0,N.v9)(e=>e.user.userInfo),{dispatch:t}=(0,H.Sc)(e=>e.user),s=e?e.name.charAt(0).toUpperCase():"G",[l,n]=(0,a.useState)(!1),i=(0,S.useRouter)();return(0,r.jsx)(T.Z,{children:(0,r.jsxs)("header",{className:"flex justify-between items-center flex-col gap-[15px] sm:flex-row col-span-4 sm:col-span-12  bg-white py-[24px] ",children:[(0,r.jsxs)("div",{className:"flex items-center space-x-3",children:[(0,r.jsx)("div",{className:"p-2 bg-blue-100 rounded-full hover:bg-blue-200 cursor-pointer",onClick:()=>i.push("/home"),children:(0,r.jsx)(z.xng,{className:"text-[#1b1a40]"})}),(0,r.jsx)("div",{className:"p-2 bg-blue-100 rounded-full hover:bg-blue-200 cursor-pointer",children:(0,r.jsx)(z.uOL,{className:"text-[#1b1a40]"})}),(0,r.jsx)("div",{className:"bg-slate-100 rounded-md shadow-sm p-2 flex",children:(0,r.jsx)("input",{type:"search",name:"search-text",placeholder:"Search",className:"border-none outline-none bg-transparent px-1"})})]}),(0,r.jsxs)("div",{className:"flex items-center space-x-3",children:[(0,r.jsxs)("div",{className:"relative p-2 bg-blue-100 rounded-full hover:bg-blue-200 cursor-pointer",children:[(0,r.jsx)(z.Z3q,{className:"text-[#1b1a40]"}),(0,r.jsx)("span",{className:"absolute top-0 right-0 h-2 w-2 bg-green-500 rounded-full"})]}),(0,r.jsx)("div",{className:"p-2 bg-blue-100 rounded-full hover:bg-blue-200 cursor-pointer",children:(0,r.jsx)(z.MXt,{className:"text-[#1b1a40]"})}),(0,r.jsx)("div",{className:"p-2 bg-blue-100 rounded-full hover:bg-blue-200 cursor-pointer",children:(0,r.jsx)(z.p4t,{className:"text-[#1b1a40]"})}),(0,r.jsx)("div",{className:"h-10 w-10 flex items-center justify-center rounded-full bg-red-300 cursor-pointer text-white font-bold text-lg",onClick:()=>{n(!l)},children:s}),l&&(0,r.jsx)("div",{className:"absolute top-[20px]  z-10 mt-12 w-32 bg-white shadow-md rounded-lg border border-gray-200",children:(0,r.jsxs)("ul",{className:"flex flex-col text-gray-700",children:[(0,r.jsx)("li",{onClick:()=>{console.log("Profile clicked"),n(!1)},className:"px-4 py-2 hover:bg-gray-100 cursor-pointer",children:"Profile"}),(0,r.jsx)("li",{onClick:()=>{t((0,f.kS)()),i.replace("/")},className:"px-4 py-2 hover:bg-gray-100 cursor-pointer",children:"Logout"})]})})]})]})})};function D(e){let{children:t}=e,s=(0,S.useRouter)(),l=(0,S.usePathname)(),[n,i]=(0,a.useState)(!1),[o,c]=(0,a.useState)(!1);return(0,a.useEffect)(()=>{let e=()=>{i(!!C.Z.get("access_token"))};e();let t=()=>{e()};return window.addEventListener("focus",t),()=>{window.removeEventListener("focus",t)}},[l]),(0,a.useEffect)(()=>{n||"/"===l||(0,S.redirect)("/")},[n,l]),(0,a.useEffect)(()=>{if(n){let e=localStorage.getItem("selectedTab");e&&e!==l&&s.replace(e)}},[n]),(0,r.jsx)("html",{lang:"en",children:(0,r.jsx)("body",{className:"h-[100dvh] w-full",children:(0,r.jsx)("div",{className:"flex h-full w-full",children:(0,r.jsxs)(_,{children:[n&&(0,r.jsx)(L,{isExpanded:o,setIsExpanded:c}),(0,r.jsxs)("div",{className:"transition-all duration-300 py-5 ".concat(o?"ml-[400px]":"ml-[100px]"," w-full"),children:[n&&(0,r.jsx)(R,{}),t]})]})})})})}s(3054)},9094:function(e,t,s){"use strict";s.d(t,{qZ:function(){return o},LM:function(){return n},Kc:function(){return l},tv:function(){return r},hO:function(){return i},Fl:function(){return a},b0:function(){return c}});var r={src:"/_next/static/media/home-icon.6cad6f25.svg",height:32,width:32,blurWidth:0,blurHeight:0},a={src:"/_next/static/media/tasks-icon.1b08515d.svg",height:32,width:32,blurWidth:0,blurHeight:0},l={src:"/_next/static/media/employees-icon.390dbd95.svg",height:32,width:32,blurWidth:0,blurHeight:0},n={src:"/_next/static/media/departments-icon.251fb945.svg",height:32,width:32,blurWidth:0,blurHeight:0},i={src:"/_next/static/media/jobs-icon.c6149ea0.svg",height:32,width:32,blurWidth:0,blurHeight:0},o={src:"/_next/static/media/chats-icon.28793a3d.svg",height:24,width:24,blurWidth:0,blurHeight:0},c={src:"/_next/static/media/x-icon.f6b8391d.svg",height:24,width:24,blurWidth:0,blurHeight:0}},2299:function(e,t,s){"use strict";var r=s(7437);s(2265),t.Z=e=>{let{children:t,extraStyle:s}=e;return(0,r.jsx)("div",{className:"sm:w-full mobile-grid sm:desktop-grid  "+s,children:t})}},5730:function(e,t,s){"use strict";s.d(t,{Sc:function(){return i}});var r=s(1444),a=s(2265);let l=()=>(0,r.I0)(),n=r.v9,i=e=>{let t=l(),s=n(t=>e?e(t):t),r=(0,a.useCallback)(t,[t]),i=(0,a.useMemo)(()=>s,[s]),o=(0,a.useCallback)((e,t)=>r(e(t)),[r]);return{dispatch:r,selector:i,dispatchAction:o}}},3753:function(e,t,s){"use strict";s.d(t,{W:function(){return l}});var r=s(5040),a=s(2649);let l=(0,r.io)(void 0,{extraHeaders:{Authorization:"Bearer "+a.Z.get("access_token")}})},6992:function(e,t,s){"use strict";s.d(t,{kS:function(){return o},pH:function(){return n}});var r=s(1116),a=s(8472),l=s(2649);let n=(0,r.hg)("user/loginUser",async(e,t)=>{let{rejectWithValue:s}=t;try{let t=await a.Z.post("http://".concat("ec2-35-173-139-149.compute-1.amazonaws.com","/auth/login"),e,{withCredentials:!0});return l.Z.set("access_token",t.data.access_token),l.Z.set("refresh_token",t.data.refresh_token),l.Z.set("is_Authenticated","true"),console.log("logged in successfully : ",t.data),t.data}catch(e){var r,n;return s((null===(n=e.response)||void 0===n?void 0:null===(r=n.data)||void 0===r?void 0:r.message)||"Failed to login")}}),i=(0,r.oM)({name:"user",initialState:{userInfo:null,loading:!1,error:null,isAuthenticated:!1,token:null,refresh_token:null,role:null},reducers:{logout:e=>{e.userInfo=null,e.isAuthenticated=!1,e.token=null,e.refresh_token=null,e.error=null,e.role=null,l.Z.remove("access_token"),l.Z.remove("refresh_token")}},extraReducers:e=>{e.addCase(n.pending,e=>{e.loading=!0,e.error=null,e.token=null,e.refresh_token=null,e.role=null}).addCase(n.fulfilled,(e,t)=>{e.loading=!1,e.userInfo={...t.payload.user},e.isAuthenticated=!0,e.token=t.payload.access_token,e.refresh_token=t.payload.refresh_token,e.role=t.payload.role}).addCase(n.rejected,(e,t)=>{e.loading=!1,e.error=t.payload||"Something went wrong"})}}),{logout:o}=i.actions;t.ZP=i.reducer},3054:function(){}},function(e){e.O(0,[9141,7699,5907,1336,7583,2427,1116,5040,1387,5418,2971,7023,1744],function(){return e(e.s=2834)}),_N_E=e.O()}]);