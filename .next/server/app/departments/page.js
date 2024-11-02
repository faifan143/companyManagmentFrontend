(()=>{var e={};e.id=519,e.ids=[519],e.modules={2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},9491:e=>{"use strict";e.exports=require("assert")},4300:e=>{"use strict";e.exports=require("buffer")},2081:e=>{"use strict";e.exports=require("child_process")},6113:e=>{"use strict";e.exports=require("crypto")},2361:e=>{"use strict";e.exports=require("events")},7147:e=>{"use strict";e.exports=require("fs")},3685:e=>{"use strict";e.exports=require("http")},5687:e=>{"use strict";e.exports=require("https")},1808:e=>{"use strict";e.exports=require("net")},2037:e=>{"use strict";e.exports=require("os")},1017:e=>{"use strict";e.exports=require("path")},2781:e=>{"use strict";e.exports=require("stream")},4404:e=>{"use strict";e.exports=require("tls")},6224:e=>{"use strict";e.exports=require("tty")},7310:e=>{"use strict";e.exports=require("url")},3837:e=>{"use strict";e.exports=require("util")},9796:e=>{"use strict";e.exports=require("zlib")},8081:(e,t,s)=>{"use strict";s.r(t),s.d(t,{GlobalError:()=>i.a,__next_app__:()=>p,originalPathname:()=>u,pages:()=>d,routeModule:()=>m,tree:()=>c}),s(6698),s(7988),s(2029),s(1930),s(5866);var r=s(3191),a=s(8716),n=s(7922),i=s.n(n),o=s(5231),l={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>o[e]);s.d(t,l);let c=["",{children:["departments",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(s.bind(s,6698)),"E:\\Projects Repository\\task_manager\\src\\app\\departments\\page.tsx"]}]},{loading:[()=>Promise.resolve().then(s.bind(s,7988)),"E:\\Projects Repository\\task_manager\\src\\app\\departments\\loading.tsx"]}]},{layout:[()=>Promise.resolve().then(s.bind(s,2029)),"E:\\Projects Repository\\task_manager\\src\\app\\layout.tsx"],loading:[()=>Promise.resolve().then(s.bind(s,1930)),"E:\\Projects Repository\\task_manager\\src\\app\\loading.tsx"],"not-found":[()=>Promise.resolve().then(s.t.bind(s,5866,23)),"next/dist/client/components/not-found-error"]}],d=["E:\\Projects Repository\\task_manager\\src\\app\\departments\\page.tsx"],u="/departments/page",p={require:s,loadChunk:()=>Promise.resolve()},m=new r.AppPageRouteModule({definition:{kind:a.x.APP_PAGE,page:"/departments/page",pathname:"/departments",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},4577:(e,t,s)=>{Promise.resolve().then(s.bind(s,9379))},9379:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>j});var r=s(326),a=s(5342),n=s(4449),i=s(8139),o=s(5047),l=s(7577),c=s.n(l),d=s(1191);let u=e=>e?e.parentDepartmentId?`${e.name}`:e.name:"None",p=({selectedOption:e})=>{let[t,s]=(0,l.useState)({open:!1,message:"",severity:"success"}),{data:c,isLoading:p}=(0,a.Z)({queryKey:["departments",e],url:"view"===e?"http://ec2-35-173-139-149.compute-1.amazonaws.com/department/view":"http://ec2-35-173-139-149.compute-1.amazonaws.com/department/get-departments",setSnackbarConfig:s}),m=(0,n.D)("admin"),h=(0,o.useRouter)(),x=e=>{sessionStorage.setItem("departmentData",JSON.stringify(e)),h.push("/departments/add-department")};return p?r.jsx("div",{className:"absolute top-1/2 left-1/2 -translate-1/2 flex flex-col items-center justify-center gap-5",children:r.jsx(i.default,{size:100})}):c&&0!==c.length?(0,r.jsxs)("div",{className:"bg-[#f0f4f9] rounded-xl shadow-md p-4 flex flex-col space-y-4 col-span-12",children:[r.jsx("div",{className:"overflow-x-auto rounded-lg shadow-md",children:(0,r.jsxs)("table",{className:"min-w-full bg-white rounded-lg shadow-md",children:[r.jsx("thead",{className:"bg-gray-200",children:(0,r.jsxs)("tr",{children:[r.jsx("th",{className:"text-[#1b1a40] text-center py-3 px-4 uppercase font-semibold text-sm",children:"Name"}),r.jsx("th",{className:"text-[#1b1a40] text-center py-3 px-4 uppercase font-semibold text-sm",children:"Goal"}),r.jsx("th",{className:"text-[#1b1a40] text-center py-3 px-4 uppercase font-semibold text-sm",children:"Main Tasks"}),r.jsx("th",{className:"text-[#1b1a40] text-center py-3 px-4 uppercase font-semibold text-sm",children:"Parent Department"}),m&&r.jsx("th",{className:"text-[#1b1a40] text-center py-3 px-4 uppercase font-semibold text-sm",children:"Actions"})]})}),r.jsx("tbody",{children:c.map(e=>(0,r.jsxs)("tr",{className:"hover:bg-gray-100 transition-colors",children:[r.jsx("td",{className:"py-3 px-4 text-center",children:e.name}),r.jsx("td",{className:"py-3 px-4 text-center",children:e.goal}),r.jsx("td",{className:"py-3 px-4 text-center",children:e.mainTasks}),r.jsx("td",{className:"py-3 px-4 text-center",children:u(e)}),m&&(0,r.jsxs)("td",{className:"py-3 px-4 flex space-x-2 justify-center",children:[r.jsx("div",{onClick:()=>x(e),className:"cursor-pointer p-2 w-16 text-xs text-center font-bold rounded-full bg-green-100 hover:bg-green-500 hover:text-green-100 text-green-500",children:"Edit"}),r.jsx("div",{className:"cursor-pointer p-2 w-16 text-xs text-center font-bold rounded-full bg-red-100 text-red-500 hover:text-red-100 hover:bg-red-500",children:"Delete"})]})]},e.id))})]})}),r.jsx(d.Z,{open:t.open,message:t.message,severity:t.severity,onClose:()=>s(e=>({...e,open:!1}))})]}):r.jsx("div",{className:"absolute top-1/2 left-1/2 -translate-1/2 flex flex-col items-center justify-center gap-5",children:"No Departments"})};var m=s(4660),h=s(5715),x=s(7567),g=s(1774),f=s(4723),b=s(4173),y=s.n(b);let v=({isOpen:e,onClose:t,departmentData:s})=>{let{register:n,handleSubmit:i,formState:{errors:o},reset:u}=(0,f.cI)({resolver:(0,g.X)(x.$),defaultValues:s||{}});c().useEffect(()=>{s?u(s):u()},[s,u]);let[p,m]=(0,l.useState)({open:!1,message:"",severity:"success"}),b=s?`/department/updateDepartment/${s.id}`:"/department/create-department",{mutate:v,isPending:j,isSuccess:N,isError:w,error:_}=(0,h.s)({endpoint:b,onSuccessMessage:"Departments added successfully!",invalidateQueryKeys:["departments"]}),q=async e=>{v({name:e.name,description:e.description,...e.parentDepartmentId&&{parent_department_id:e.parentDepartmentId}}),setInterval(t,3e3)};(0,l.useEffect)(()=>{N?(m({open:!0,message:s?"Department updated successfully!":"Department created successfully!",severity:"success"}),u({id:"",parentDepartmentId:"",description:"",name:""})):w&&console.error("Failed to create/update the department",_)},[s,_,w,N,u]);let{data:D}=(0,a.Z)({queryKey:["departments"],url:"http://ec2-35-173-139-149.compute-1.amazonaws.com/department/get-departments",setSnackbarConfig:m});return(0,r.jsxs)(y(),{isOpen:e,onRequestClose:t,ariaHideApp:!1,contentLabel:"Create/Update Department",className:"fixed inset-0 flex items-center justify-center",overlayClassName:"fixed inset-0 bg-black bg-opacity-50 z-50",children:[(0,r.jsxs)("div",{className:"bg-white p-8 rounded-xl shadow-lg max-w-md w-full relative",children:[r.jsx("button",{onClick:t,className:"absolute top-2 right-2  hover:text-accent",children:"\xd7"}),r.jsx("h1",{className:"text-center text-2xl  font-bold mb-6",children:s?"Update Department":"Create Department"}),(0,r.jsxs)("form",{className:"space-y-4",onSubmit:i(q),children:[(0,r.jsxs)("div",{children:[r.jsx("label",{className:"block  text-sm font-medium",children:"Department Name"}),r.jsx("input",{type:"text",...n("name"),className:`w-full px-4 py-2 mt-1 rounded-lg   placeholder-textSecondary focus:outline-none focus:ring-2 focus:ring-accent border ${o.name?"border-high":"border-border"}`,placeholder:"Enter department name"}),o.name&&r.jsx("p",{className:"text-high mt-1 text-sm",children:o.name.message})]}),(0,r.jsxs)("div",{children:[r.jsx("label",{className:"block  text-sm font-medium",children:"Description"}),r.jsx("textarea",{...n("description"),className:`w-full px-4 py-2 mt-1 rounded-lg   placeholder-textSecondary focus:outline-none focus:ring-2 focus:ring-accent border ${o.description?"border-high":"border-border"}`,placeholder:"Enter department description",rows:4}),o.description&&r.jsx("p",{className:"text-high mt-1 text-sm",children:o.description.message})]}),(0,r.jsxs)("div",{children:[r.jsx("label",{className:"block  text-sm font-medium",children:"Parent Department (Optional)"}),(0,r.jsxs)("select",{...n("parentDepartmentId"),className:`w-full px-4 py-2 mt-1 rounded-lg   placeholder-textSecondary focus:outline-none focus:ring-2 focus:ring-accent border ${o.parentDepartmentId?"border-high":"border-border"}`,children:[r.jsx("option",{value:"",children:"Select a parent department"}),D&&D.map(e=>r.jsx("option",{value:e.id,children:e.name},e.id))]}),o.parentDepartmentId&&r.jsx("p",{className:"text-high mt-1 text-sm",children:o.parentDepartmentId.message})]}),r.jsx("button",{type:"submit",className:`w-full py-2 mt-4 bg-[#413d99] text-white rounded-lg font-bold hover:bg-opacity-90 transition duration-200 ${j?"opacity-50 cursor-not-allowed":""}`,disabled:j,children:j?s?"Updating...":"Creating...":s?"Update Department":"Create Department"}),w&&r.jsx("p",{className:"text-high mt-2 text-center",children:_+""}),N&&r.jsx("p",{className:"text-low mt-2 text-center",children:"Successful"})]})]}),r.jsx(d.Z,{open:p.open,message:p.message,severity:p.severity,onClose:()=>m(e=>({...e,open:!1}))})]})},j=()=>{let[e,t]=(0,l.useState)(!1),[s,a]=(0,l.useState)(null),[i,c]=(0,l.useState)("get-departments"),d=(0,o.useRouter)(),u=(0,n.D)("admin");return(0,r.jsxs)(m.Z,{children:[(0,r.jsxs)("div",{className:"col-span-full flex justify-between items-center",children:[r.jsx("h1",{className:"text-3xl font-bold text-center",children:"Departments"}),(0,r.jsxs)("div",{className:"flex items-center gap-5",children:[(0,r.jsxs)("select",{className:"bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none transition duration-200",value:i,onChange:e=>c(e.target.value),children:[u&&r.jsx("option",{value:"get-departments",children:"All Departments"}),(0,n.T)(["department_view_specific"])&&r.jsx("option",{value:"view",children:"Accessible Departments"})]}),u&&r.jsx("button",{className:"bg-[#1b1a40] text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition duration-200",onClick:()=>{a(null),d.push("/departments/add-department")},children:"Add Department"})]})]}),r.jsx(p,{selectedOption:i}),r.jsx(v,{isOpen:e,onClose:()=>t(!1),departmentData:s})]})}},1191:(e,t,s)=>{"use strict";s.d(t,{Z:()=>i});var r=s(326);s(7577);var a=s(2375),n=s(708);let i=({open:e,message:t,severity:s,onClose:i})=>{let o=(e,t)=>{"clickaway"!==t&&i()};return r.jsx(a.Z,{open:e,autoHideDuration:2e3,onClose:o,children:r.jsx(n.Z,{onClose:o,severity:s,variant:"filled",sx:{width:"100%"},children:t})})}},5715:(e,t,s)=>{"use strict";s.d(t,{s:()=>o});var r=s(4976),a=s(119),n=s(4099),i=s(6562);let o=({endpoint:e,onSuccessMessage:t,invalidateQueryKeys:s=[],options:o})=>{let l=(0,r.NL)(),c=async t=>(await n.Z.post(`http://ec2-35-173-139-149.compute-1.amazonaws.com${e}`,t,{headers:{Authorization:`Bearer ${i.Z.get("access_token")}`}})).data;return(0,a.D)({mutationFn:c,onSuccess:e=>{t&&console.log(t,e),s.forEach(e=>{l.invalidateQueries(e)})},onError:e=>{console.error("Error during the create/add request:",e)},...o})}},5342:(e,t,s)=>{"use strict";s.d(t,{Z:()=>i});var r=s(4412),a=s(4099),n=s(6562);let i=({queryKey:e,url:t,setSnackbarConfig:s,nestedData:i=!1,...o})=>(0,r.a)({queryKey:e,queryFn:async()=>{try{let e=await a.Z.get(t,{headers:{Authorization:`Bearer ${n.Z.get("access_token")}`}});return i?e.data.data:e.data}catch(e){throw a.Z.isAxiosError(e)&&e.response?s({open:!0,message:`Error: ${e.response.data.message||"An error occurred"}`,severity:"error"}):s({open:!0,message:"Network error. Please try again later.",severity:"error"}),e}},retry:2,...o})},7567:(e,t,s)=>{"use strict";s.d(t,{$:()=>n,a:()=>a});var r=s(123);let a=r.Ry().shape({name:r.Z_().required("Department name is required"),description:r.Z_().optional(),goal:r.Z_().required("Goal is required"),category:r.Z_().required("Category is required"),mainTasks:r.Z_().required("Main tasks are required"),parentDepartmentId:r.Z_().nullable().default(void 0),numericOwners:r.IX().of(r.Ry().shape({category:r.Z_(),count:r.Rx()})),supportingFiles:r.IX().of(r.nK()).notRequired(),requiredReports:r.IX().of(r.Ry().shape({name:r.Z_(),templateFile:r.Z_()})),developmentPrograms:r.IX().of(r.Ry().shape({programName:r.Z_(),objective:r.Z_(),notes:r.Z_(),programFile:r.Z_()}))}),n=r.Ry().shape({name:r.Z_().required("Department name is required"),description:r.Z_().required("Description is required"),parentDepartmentId:r.Z_().transform(e=>""===e?void 0:e).nullable().default(void 0)})},4449:(e,t,s)=>{"use strict";s.d(t,{D:()=>n,T:()=>a});var r=s(5842);function a(e){let t=(0,r.v9)(e=>e.user.userInfo?.job.permissions||[]);return e.some(e=>t.includes(e))}function n(e){return e==(0,r.v9)(e=>e.user.role)}},7988:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>n});var r=s(9510),a=s(7366);s(1159);let n=()=>r.jsx("div",{children:r.jsx(a.Z,{})})},6698:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>r});let r=(0,s(8570).createProxy)(String.raw`E:\Projects Repository\task_manager\src\app\departments\page.tsx#default`)},119:(e,t,s)=>{"use strict";s.d(t,{D:()=>u});var r=s(7577),a=s(1180),n=s(2113),i=s(4351),o=s(3341),l=class extends i.l{#e;#t=void 0;#s;#r;constructor(e,t){super(),this.#e=e,this.setOptions(t),this.bindMethods(),this.#a()}bindMethods(){this.mutate=this.mutate.bind(this),this.reset=this.reset.bind(this)}setOptions(e){let t=this.options;this.options=this.#e.defaultMutationOptions(e),(0,o.VS)(this.options,t)||this.#e.getMutationCache().notify({type:"observerOptionsUpdated",mutation:this.#s,observer:this}),t?.mutationKey&&this.options.mutationKey&&(0,o.Ym)(t.mutationKey)!==(0,o.Ym)(this.options.mutationKey)?this.reset():this.#s?.state.status==="pending"&&this.#s.setOptions(this.options)}onUnsubscribe(){this.hasListeners()||this.#s?.removeObserver(this)}onMutationUpdate(e){this.#a(),this.#n(e)}getCurrentResult(){return this.#t}reset(){this.#s?.removeObserver(this),this.#s=void 0,this.#a(),this.#n()}mutate(e,t){return this.#r=t,this.#s?.removeObserver(this),this.#s=this.#e.getMutationCache().build(this.#e,this.options),this.#s.addObserver(this),this.#s.execute(e)}#a(){let e=this.#s?.state??(0,a.R)();this.#t={...e,isPending:"pending"===e.status,isSuccess:"success"===e.status,isError:"error"===e.status,isIdle:"idle"===e.status,mutate:this.mutate,reset:this.reset}}#n(e){n.V.batch(()=>{if(this.#r&&this.hasListeners()){let t=this.#t.variables,s=this.#t.context;e?.type==="success"?(this.#r.onSuccess?.(e.data,t,s),this.#r.onSettled?.(e.data,null,t,s)):e?.type==="error"&&(this.#r.onError?.(e.error,t,s),this.#r.onSettled?.(void 0,e.error,t,s))}this.listeners.forEach(e=>{e(this.#t)})})}},c=s(4976),d=s(8613);function u(e,t){let s=(0,c.NL)(t),[a]=r.useState(()=>new l(s,e));r.useEffect(()=>{a.setOptions(e)},[a,e]);let i=r.useSyncExternalStore(r.useCallback(e=>a.subscribe(n.V.batchCalls(e)),[a]),()=>a.getCurrentResult(),()=>a.getCurrentResult()),o=r.useCallback((e,t)=>{a.mutate(e,t).catch(d.Z)},[a]);if(i.error&&(0,d.L)(a.options.throwOnError,[i.error]))throw i.error;return{...i,mutate:o,mutateAsync:i.mutate}}}};var t=require("../../webpack-runtime.js");t.C(e);var s=e=>t(t.s=e),r=t.X(0,[309,644,899,412,260],()=>s(8081));module.exports=r})();