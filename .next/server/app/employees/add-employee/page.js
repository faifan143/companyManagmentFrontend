(()=>{var e={};e.id=622,e.ids=[622],e.modules={2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},9491:e=>{"use strict";e.exports=require("assert")},4300:e=>{"use strict";e.exports=require("buffer")},2081:e=>{"use strict";e.exports=require("child_process")},6113:e=>{"use strict";e.exports=require("crypto")},2361:e=>{"use strict";e.exports=require("events")},7147:e=>{"use strict";e.exports=require("fs")},3685:e=>{"use strict";e.exports=require("http")},5687:e=>{"use strict";e.exports=require("https")},1808:e=>{"use strict";e.exports=require("net")},2037:e=>{"use strict";e.exports=require("os")},1017:e=>{"use strict";e.exports=require("path")},2781:e=>{"use strict";e.exports=require("stream")},4404:e=>{"use strict";e.exports=require("tls")},6224:e=>{"use strict";e.exports=require("tty")},7310:e=>{"use strict";e.exports=require("url")},3837:e=>{"use strict";e.exports=require("util")},9796:e=>{"use strict";e.exports=require("zlib")},4871:(e,t,s)=>{"use strict";s.r(t),s.d(t,{GlobalError:()=>l.a,__next_app__:()=>m,originalPathname:()=>u,pages:()=>c,routeModule:()=>p,tree:()=>d}),s(6126),s(1036),s(6580),s(2029),s(1930),s(5866);var r=s(3191),a=s(8716),i=s(7922),l=s.n(i),o=s(5231),n={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(n[e]=()=>o[e]);s.d(t,n);let d=["",{children:["employees",{children:["add-employee",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(s.bind(s,6126)),"E:\\Projects Repository\\task_manager\\src\\app\\employees\\add-employee\\page.tsx"]}]},{loading:[()=>Promise.resolve().then(s.bind(s,1036)),"E:\\Projects Repository\\task_manager\\src\\app\\employees\\add-employee\\loading.tsx"]}]},{loading:[()=>Promise.resolve().then(s.bind(s,6580)),"E:\\Projects Repository\\task_manager\\src\\app\\employees\\loading.tsx"]}]},{layout:[()=>Promise.resolve().then(s.bind(s,2029)),"E:\\Projects Repository\\task_manager\\src\\app\\layout.tsx"],loading:[()=>Promise.resolve().then(s.bind(s,1930)),"E:\\Projects Repository\\task_manager\\src\\app\\loading.tsx"],"not-found":[()=>Promise.resolve().then(s.t.bind(s,5866,23)),"next/dist/client/components/not-found-error"]}],c=["E:\\Projects Repository\\task_manager\\src\\app\\employees\\add-employee\\page.tsx"],u="/employees/add-employee/page",m={require:s,loadChunk:()=>Promise.resolve()},p=new r.AppPageRouteModule({definition:{kind:a.x.APP_PAGE,page:"/employees/add-employee/page",pathname:"/employees/add-employee",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},8305:(e,t,s)=>{Promise.resolve().then(s.bind(s,6134))},6134:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>p});var r=s(326),a=s(1191),i=s(4660),l=s(5715),o=s(5342),n=s(2957),d=s(1774),c=s(7577),u=s(4723);let m="ec2-35-173-139-149.compute-1.amazonaws.com",p=()=>{let[e,t]=(0,c.useState)(null),{register:s,handleSubmit:p,control:x,formState:{errors:h},reset:b,setValue:y,getValues:g}=(0,u.cI)({resolver:(0,d.X)(n.d),defaultValues:e||{}});(0,c.useEffect)(()=>{console.log("validation error : ",h)},[h]),(0,c.useEffect)(()=>{let e=sessionStorage.getItem("employeeData");if(e){let s=JSON.parse(e);t(s),b(s)}},[b]);let[f,j]=(0,c.useState)({open:!1,message:"",severity:"success"}),{data:v}=(0,o.Z)({queryKey:["departments"],url:`http://${m}/department/get-departments`,setSnackbarConfig:j}),{data:_}=(0,o.Z)({queryKey:["jobTitles"],url:`http://${m}/job-titles/get-job-titles`,setSnackbarConfig:j}),N=e?`/emp/update/${e.id}`:"/emp/create",{mutate:q,isPending:w}=(0,l.s)({endpoint:N,onSuccessMessage:"Employee added successfully!",invalidateQueryKeys:["employees"]}),k=async t=>{console.log(" data  : ",t),q(t,{onSuccess:()=>{sessionStorage.clear(),j({open:!0,message:e?"Employee updated successfully!":"Employee created successfully!",severity:"success"}),b()},onError:()=>{j({open:!0,message:"An error occurred. Please try again.",severity:"error"})}})},{fields:E,append:Z,remove:$}=(0,u.Dq)({control:x,name:"legal_documents"}),{fields:C,append:P,remove:A}=(0,u.Dq)({control:x,name:"certifications"}),{fields:D,append:R,remove:M}=(0,u.Dq)({control:x,name:"allowances"}),{fields:S,append:I,remove:O}=(0,u.Dq)({control:x,name:"incentives"}),{fields:X,append:Y,remove:B}=(0,u.Dq)({control:x,name:"bank_accounts"}),{fields:G,append:T,remove:K}=(0,u.Dq)({control:x,name:"evaluations"}),L=(e,t,s)=>{let r=e.target.files?.[0]||null;r&&("legal_documents"===s?y(`legal_documents.${t}.file`,r.name||"",{shouldValidate:!0}):"certifications"===s&&y(`certifications.${t}.file`,r.name||"",{shouldValidate:!0}))};return(0,r.jsxs)(i.Z,{children:[(0,r.jsxs)("div",{className:"bg-white p-8 rounded-xl shadow-lg col-span-12 w-full relative",children:[r.jsx("h1",{className:"text-center text-2xl font-bold mb-6",children:e?"Update Employee":"Create Employee"}),(0,r.jsxs)("form",{className:"space-y-4",onSubmit:p(k),encType:"multipart/form-data",children:[(0,r.jsxs)("div",{children:[r.jsx("label",{className:"block text-gray-600 text-sm font-medium",children:"Name"}),r.jsx("input",{type:"text",...s("name"),className:`w-full px-4 py-2 mt-1 rounded-lg border ${h.name?"border-red-500":"border-gray-300"}`,placeholder:"Enter employee name"}),h.name&&r.jsx("p",{className:"text-red-500 mt-1 text-sm",children:h.name.message})]}),(0,r.jsxs)("div",{children:[r.jsx("label",{className:"block text-gray-600 text-sm font-medium",children:"Email"}),r.jsx("input",{type:"text",...s("email"),className:`w-full px-4 py-2 mt-1 rounded-lg border ${h.email?"border-red-500":"border-gray-300"}`,placeholder:"Enter Employee Email"}),h.email&&r.jsx("p",{className:"text-red-500 mt-1 text-sm",children:h.email.message})]}),(0,r.jsxs)("div",{children:[r.jsx("label",{className:"block text-gray-600 text-sm font-medium",children:"Phone"}),r.jsx("input",{type:"text",...s("phone"),className:`w-full px-4 py-2 mt-1 rounded-lg border ${h.phone?"border-red-500":"border-gray-300"}`,placeholder:"Enter Employee phone"}),h.phone&&r.jsx("p",{className:"text-red-500 mt-1 text-sm",children:h.phone.message})]}),(0,r.jsxs)("div",{children:[r.jsx("label",{className:"block text-gray-600 text-sm font-medium",children:"Password"}),r.jsx("input",{type:"text",...s("password"),className:`w-full px-4 py-2 mt-1 rounded-lg border ${h.password?"border-red-500":"border-gray-300"}`,placeholder:"Enter Employee Password"}),h.password&&r.jsx("p",{className:"text-red-500 mt-1 text-sm",children:h.password.message})]}),(0,r.jsxs)("div",{children:[r.jsx("label",{className:"block text-gray-600 text-sm font-medium",children:"National ID"}),r.jsx("input",{type:"text",...s("national_id"),className:`w-full px-4 py-2 mt-1 rounded-lg border ${h.national_id?"border-red-500":"border-gray-300"}`,placeholder:"Enter national ID"}),h.national_id&&r.jsx("p",{className:"text-red-500 mt-1 text-sm",children:h.national_id.message})]}),(0,r.jsxs)("div",{children:[r.jsx("label",{className:"block text-gray-600 text-sm font-medium",children:"Address"}),r.jsx("input",{type:"text",...s("address"),className:`w-full px-4 py-2 mt-1 rounded-lg border ${h.address?"border-red-500":"border-gray-300"}`,placeholder:"Enter Address"}),h.address&&r.jsx("p",{className:"text-red-500 mt-1 text-sm",children:h.address.message})]}),(0,r.jsxs)("div",{children:[r.jsx("label",{className:"block text-gray-600 text-sm font-medium",children:"Contact Emergency"}),r.jsx("input",{type:"text",...s("emergency_contact"),className:`w-full px-4 py-2 mt-1 rounded-lg border ${h.address?"border-red-500":"border-gray-300"}`,placeholder:"Enter Address"}),h.address&&r.jsx("p",{className:"text-red-500 mt-1 text-sm",children:h.address.message})]}),(0,r.jsxs)("div",{children:[r.jsx("label",{className:"block text-gray-600 text-sm font-medium",children:"Date Of Birth"}),r.jsx("input",{type:"date",...s("dob"),className:`w-full px-4 py-2 mt-1 rounded-lg border ${h.dob?"border-red-500":"border-gray-300"}`,placeholder:"Enter employment date"}),h.dob&&r.jsx("p",{className:"text-red-500 mt-1 text-sm",children:h.dob.message})]}),(0,r.jsxs)("div",{children:[r.jsx("label",{className:"block text-gray-600 text-sm font-medium",children:"Gender"}),(0,r.jsxs)("select",{...s("gender"),className:`w-full px-4 py-2 mt-1 rounded-lg   placeholder-textSecondary focus:outline-none focus:ring-2 focus:ring-accent border ${h.gender?"border-high":"border-border"}`,children:[r.jsx("option",{value:"",children:"Select a gender"}),["male","female","undefined"].map((e,t)=>r.jsx("option",{value:e,children:e},t))]}),h.gender&&r.jsx("p",{className:"text-red-500 mt-1 text-sm",children:h.gender.message})]}),(0,r.jsxs)("div",{children:[r.jsx("label",{className:"block text-gray-600 text-sm font-medium",children:"Marital Status"}),(0,r.jsxs)("select",{...s("marital_status"),className:`w-full px-4 py-2 mt-1 rounded-lg   placeholder-textSecondary focus:outline-none focus:ring-2 focus:ring-accent border ${h.marital_status?"border-high":"border-border"}`,children:[r.jsx("option",{value:"",children:"Select a marital status"}),["single","married"].map((e,t)=>r.jsx("option",{value:e,children:e},t))]}),h.marital_status&&r.jsx("p",{className:"text-red-500 mt-1 text-sm",children:h.marital_status.message})]}),(0,r.jsxs)("div",{children:[r.jsx("label",{className:"block text-gray-600 text-sm font-medium",children:"Employment Date"}),r.jsx("input",{type:"date",...s("employment_date"),className:`w-full px-4 py-2 mt-1 rounded-lg border ${h.employment_date?"border-red-500":"border-gray-300"}`,placeholder:"Enter employment date"}),h.employment_date&&r.jsx("p",{className:"text-red-500 mt-1 text-sm",children:h.employment_date.message})]}),(0,r.jsxs)("div",{children:[r.jsx("label",{className:"block text-gray-600 text-sm font-medium",children:"Base Salary"}),r.jsx("input",{type:"number",...s("base_salary"),className:`w-full px-4 py-2 mt-1 rounded-lg border ${h.base_salary?"border-red-500":"border-gray-300"}`,placeholder:"Enter base salary"}),h.base_salary&&r.jsx("p",{className:"text-red-500 mt-1 text-sm",children:h.base_salary.message})]}),(0,r.jsxs)("div",{children:[r.jsx("label",{className:"block text-gray-600 text-sm font-medium",children:"Department"}),(0,r.jsxs)("select",{...s("department_id"),className:`w-full px-4 py-2 mt-1 rounded-lg border ${h.department_id?"border-red-500":"border-gray-300"}`,onChange:e=>y("department_id",e.target.value),children:[r.jsx("option",{value:"",children:"Select a department"}),v&&v.map(e=>r.jsx("option",{value:e.id,children:e.name},e.id))]}),h.department_id&&r.jsx("p",{className:"text-red-500 mt-1 text-sm",children:h.department_id.message})]}),(0,r.jsxs)("div",{children:[r.jsx("label",{className:"block text-gray-600 text-sm font-medium",children:"Job Title"}),(0,r.jsxs)("select",{...s("job_id"),className:`w-full px-4 py-2 mt-1 rounded-lg border ${h.job_id?"border-red-500":"border-gray-300"}`,onChange:e=>y("job_id",e.target.value),children:[r.jsx("option",{value:"",children:"Select a job title"}),_&&_.map(e=>r.jsx("option",{value:e.id,children:e.title},e.id))]}),h.job_id&&r.jsx("p",{className:"text-red-500 mt-1 text-sm",children:h.job_id.message})]}),(0,r.jsxs)("div",{children:[r.jsx("label",{className:"block text-gray-600 text-sm font-medium",children:"Job Tasks"}),r.jsx("input",{type:"text",...s("job_tasks"),className:`w-full px-4 py-2 mt-1 rounded-lg border ${h.job_tasks?"border-red-500":"border-gray-300"}`,placeholder:"Enter job tasks"}),h.job_tasks&&r.jsx("p",{className:"text-red-500 mt-1 text-sm",children:h.job_tasks.message})]}),E.map((e,t)=>(0,r.jsxs)("div",{className:"flex items-center space-x-2",children:[(0,r.jsxs)("div",{className:"flex-1",children:[(0,r.jsxs)("label",{className:"block text-gray-600 text-sm font-medium",children:["Legal Document ",t+1]}),r.jsx("input",{type:"text",...s(`legal_documents.${t}.name`),placeholder:"Document Name",className:"w-full px-4 py-2 mt-1 rounded-lg border"}),r.jsx("input",{type:"date",...s(`legal_documents.${t}.validity`),className:"w-full px-4 py-2 mt-1 rounded-lg border"}),r.jsx("input",{type:"file",onChange:e=>L(e,t,"legal_documents"),className:"w-full px-4 py-2 mt-1 rounded-lg border"})]}),r.jsx("button",{type:"button",onClick:()=>{console.log("Removing document at index",t),$(t),b(g())},className:"text-white bg-red-500 font-bold  px-4 py-2 shadow-md rounded-md",children:"X"})]},e.id)),r.jsx("button",{type:"button",onClick:()=>Z({name:"",validity:"",file:null}),className:"text-blue-500 block text-sm",children:"Add Legal Document"}),C.map((e,t)=>(0,r.jsxs)("div",{className:"flex items-center space-x-2",children:[(0,r.jsxs)("div",{className:"flex-1",children:[(0,r.jsxs)("label",{className:"block text-gray-600 text-sm font-medium",children:["Certification ",t+1]}),r.jsx("input",{type:"text",...s(`certifications.${t}.certificate_name`),placeholder:"Certification Name",className:"w-full px-4 py-2 mt-1 rounded-lg border"}),r.jsx("input",{type:"date",...s(`certifications.${t}.date`),className:"w-full px-4 py-2 mt-1 rounded-lg border"}),r.jsx("input",{type:"text",...s(`certifications.${t}.grade`),placeholder:"Certification Grade",className:"w-full px-4 py-2 mt-1 rounded-lg border"}),r.jsx("input",{type:"file",onChange:e=>L(e,t,"certifications"),className:"w-full px-4 py-2 mt-1 rounded-lg border"})]}),r.jsx("button",{type:"button",onClick:()=>{console.log("Removing document at index",t),A(t),b(g())},className:"text-white bg-red-500 font-bold  px-4 py-2 shadow-md rounded-md",children:"X"})]},e.id)),r.jsx("button",{type:"button",onClick:()=>P({certificate_name:"",date:"",grade:"",file:null}),className:"text-blue-500 block text-sm",children:"Add Certification"}),D.map((e,t)=>(0,r.jsxs)("div",{className:"flex items-center space-x-2",children:[(0,r.jsxs)("div",{className:"flex-1",children:[(0,r.jsxs)("label",{className:"block text-gray-600 text-sm font-medium",children:["Allowance ",t+1]}),r.jsx("input",{type:"text",...s(`allowances.${t}.allowance_type`),placeholder:"Allowance Type",className:"w-full px-4 py-2 mt-1 rounded-lg border"}),r.jsx("input",{type:"number",...s(`allowances.${t}.amount`),placeholder:"Amount",className:"w-full px-4 py-2 mt-1 rounded-lg border"})]}),r.jsx("button",{type:"button",onClick:()=>{M(t),b(g())},className:"text-white bg-red-500 font-bold  px-4 py-2 shadow-md rounded-md",children:"X"})]},e.id)),r.jsx("button",{type:"button",onClick:()=>R({allowance_type:"",amount:0}),className:"text-blue-500 block text-sm",children:"Add Allowance"}),S.map((e,t)=>(0,r.jsxs)("div",{className:"flex items-center space-x-2",children:[(0,r.jsxs)("div",{className:"flex-1",children:[(0,r.jsxs)("label",{className:"block text-gray-600 text-sm font-medium",children:["Incentive ",t+1]}),r.jsx("input",{type:"text",...s(`incentives.${t}.description`),placeholder:"Description",className:"w-full px-4 py-2 mt-1 rounded-lg border"}),r.jsx("input",{type:"number",...s(`incentives.${t}.amount`),placeholder:"Amount",className:"w-full px-4 py-2 mt-1 rounded-lg border"})]}),r.jsx("button",{type:"button",onClick:()=>{O(t),b(g())},className:"text-white bg-red-500 font-bold  px-4 py-2 shadow-md rounded-md",children:"X"})]},e.id)),r.jsx("button",{type:"button",onClick:()=>I({description:"",amount:0}),className:"text-blue-500 block text-sm",children:"Add Incentive"}),X.map((e,t)=>(0,r.jsxs)("div",{className:"flex items-center space-x-2",children:[(0,r.jsxs)("div",{className:"flex-1",children:[(0,r.jsxs)("label",{className:"block text-gray-600 text-sm font-medium",children:["Bank Account ",t+1]}),r.jsx("input",{type:"text",...s(`bank_accounts.${t}.bank_name`),placeholder:"Bank Name",className:"w-full px-4 py-2 mt-1 rounded-lg border"}),r.jsx("input",{type:"text",...s(`bank_accounts.${t}.account_number`),placeholder:"Account Number",className:"w-full px-4 py-2 mt-1 rounded-lg border"})]}),r.jsx("button",{type:"button",onClick:()=>{B(t),b(g())},className:"text-white bg-red-500 font-bold  px-4 py-2 shadow-md rounded-md",children:"X"})]},e.id)),r.jsx("button",{type:"button",onClick:()=>Y({bank_name:"",account_number:""}),className:"text-blue-500 block text-sm",children:"Add Bank Account"}),G.map((e,t)=>(0,r.jsxs)("div",{className:"flex items-center space-x-2",children:[(0,r.jsxs)("div",{className:"flex-1",children:[(0,r.jsxs)("label",{className:"block text-gray-600 text-sm font-medium",children:["Evaluation ",t+1]}),r.jsx("input",{type:"text",...s(`evaluations.${t}.evaluation_type`),placeholder:"Evaluation Type",className:"w-full px-4 py-2 mt-1 rounded-lg border"}),r.jsx("textarea",{...s(`evaluations.${t}.description`),placeholder:"Description",className:"w-full px-4 py-2 mt-1 rounded-lg border"}),r.jsx("textarea",{...s(`evaluations.${t}.plan`),placeholder:"Plan",className:"w-full px-4 py-2 mt-1 rounded-lg border"})]}),r.jsx("button",{type:"button",onClick:()=>{K(t),b(g())},className:"text-white bg-red-500 font-bold  px-4 py-2 shadow-md rounded-md",children:"X"})]},e.id)),r.jsx("button",{type:"button",onClick:()=>T({evaluation_type:"",description:"",plan:""}),className:"text-blue-500 block text-sm",children:"Add Evaluation"}),r.jsx("button",{type:"submit",className:`w-full py-2 mt-4 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition duration-200 ${w?"opacity-50 cursor-not-allowed":""}`,disabled:w,children:w?e?"Updating...":"Creating...":e?"Update Employee":"Create Employee"})]})]}),r.jsx(a.Z,{open:f.open,message:f.message,severity:f.severity,onClose:()=>j(e=>({...e,open:!1}))})]})}},1191:(e,t,s)=>{"use strict";s.d(t,{Z:()=>l});var r=s(326);s(7577);var a=s(2375),i=s(708);let l=({open:e,message:t,severity:s,onClose:l})=>{let o=(e,t)=>{"clickaway"!==t&&l()};return r.jsx(a.Z,{open:e,autoHideDuration:2e3,onClose:o,children:r.jsx(i.Z,{onClose:o,severity:s,variant:"filled",sx:{width:"100%"},children:t})})}},5715:(e,t,s)=>{"use strict";s.d(t,{s:()=>o});var r=s(4976),a=s(119),i=s(4099),l=s(6562);let o=({endpoint:e,onSuccessMessage:t,invalidateQueryKeys:s=[],options:o})=>{let n=(0,r.NL)(),d=async t=>(await i.Z.post(`http://ec2-35-173-139-149.compute-1.amazonaws.com${e}`,t,{headers:{Authorization:`Bearer ${l.Z.get("access_token")}`}})).data;return(0,a.D)({mutationFn:d,onSuccess:e=>{t&&console.log(t,e),s.forEach(e=>{n.invalidateQueries(e)})},onError:e=>{console.error("Error during the create/add request:",e)},...o})}},5342:(e,t,s)=>{"use strict";s.d(t,{Z:()=>l});var r=s(4412),a=s(4099),i=s(6562);let l=({queryKey:e,url:t,setSnackbarConfig:s,nestedData:l=!1,...o})=>(0,r.a)({queryKey:e,queryFn:async()=>{try{let e=await a.Z.get(t,{headers:{Authorization:`Bearer ${i.Z.get("access_token")}`}});return l?e.data.data:e.data}catch(e){throw a.Z.isAxiosError(e)&&e.response?s({open:!0,message:`Error: ${e.response.data.message||"An error occurred"}`,severity:"error"}):s({open:!0,message:"Network error. Please try again later.",severity:"error"}),e}},retry:2,...o})},2957:(e,t,s)=>{"use strict";s.d(t,{Z:()=>i,d:()=>a});var r=s(123);let a=r.Ry().shape({id:r.Z_().optional(),name:r.Z_().required("Employee name is required"),national_id:r.Z_().required("National Id is required"),gender:r.Z_().required("Gender is required"),marital_status:r.Z_().required("Marital status is required"),address:r.Z_().required("Address is required"),employment_date:r.Z_().required("Employment date is required").matches(/^\d{4}-\d{2}-\d{2}$/,"Employment date must be in YYYY-MM-DD format"),base_salary:r.Rx().required("Base salary is required"),dob:r.Z_().required("Date of birth is required").matches(/^\d{4}-\d{2}-\d{2}$/,"Date of birth must be in YYYY-MM-DD format"),phone:r.Z_().required("Phone number is required"),email:r.Z_().required("Email is required").email("Invalid email format"),password:r.Z_().required("password is required"),department_id:r.Z_().required("Department ID is required"),job_id:r.Z_().required("Job ID is required"),job_tasks:r.Z_().required("Job tasks is required"),emergency_contact:r.Z_().required("emergency contact is required"),legal_documents:r.IX().of(r.Ry().shape({name:r.Z_().required("Document name is required"),validity:r.Z_().nullable(),file:r.Z_().nullable()})).optional(),certifications:r.IX().of(r.Ry().shape({certificate_name:r.Z_().required("Certificate name is required"),date:r.Z_().nullable(),grade:r.Z_().required("Grade is required"),file:r.Z_().nullable()})).optional(),allowances:r.IX().of(r.Ry().shape({allowance_type:r.Z_().required("Allowance type is required"),amount:r.Rx().required("Allowance amount is required").positive("Amount must be a positive number")})).optional(),incentives:r.IX().of(r.Ry().shape({description:r.Z_().required("Incentive description is required"),amount:r.Rx().required("Incentive amount is required").positive("Amount must be a positive number")})).optional(),bank_accounts:r.IX().of(r.Ry().shape({bank_name:r.Z_().required("Bank name is required"),account_number:r.Z_().required("Account number is required").matches(/^\d+$/,"Account number must contain only digits")})).optional(),evaluations:r.IX().of(r.Ry().shape({evaluation_type:r.Z_().required("Evaluation type is required"),description:r.Z_().required("Evaluation description is required"),plan:r.Z_().required("Plan is required")})).optional()}),i=r.Ry().shape({name:r.Z_().required("Employee name is required"),dob:r.hT().required("Date of birth is required").typeError("Invalid date format"),phone:r.Z_().required("Phone number is required"),password:r.Z_(),email:r.Z_().required("Email is required").email("Invalid email format"),address:r.Z_().required("Address is required"),department_id:r.Z_().required("Department ID is required"),job_id:r.Z_().required("Job ID is required")})},1036:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>i});var r=s(9510),a=s(7366);s(1159);let i=()=>r.jsx("div",{children:r.jsx(a.Z,{})})},6126:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>r});let r=(0,s(8570).createProxy)(String.raw`E:\Projects Repository\task_manager\src\app\employees\add-employee\page.tsx#default`)},6580:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>i});var r=s(9510),a=s(7366);s(1159);let i=()=>r.jsx("div",{children:r.jsx(a.Z,{})})},119:(e,t,s)=>{"use strict";s.d(t,{D:()=>u});var r=s(7577),a=s(1180),i=s(2113),l=s(4351),o=s(3341),n=class extends l.l{#e;#t=void 0;#s;#r;constructor(e,t){super(),this.#e=e,this.setOptions(t),this.bindMethods(),this.#a()}bindMethods(){this.mutate=this.mutate.bind(this),this.reset=this.reset.bind(this)}setOptions(e){let t=this.options;this.options=this.#e.defaultMutationOptions(e),(0,o.VS)(this.options,t)||this.#e.getMutationCache().notify({type:"observerOptionsUpdated",mutation:this.#s,observer:this}),t?.mutationKey&&this.options.mutationKey&&(0,o.Ym)(t.mutationKey)!==(0,o.Ym)(this.options.mutationKey)?this.reset():this.#s?.state.status==="pending"&&this.#s.setOptions(this.options)}onUnsubscribe(){this.hasListeners()||this.#s?.removeObserver(this)}onMutationUpdate(e){this.#a(),this.#i(e)}getCurrentResult(){return this.#t}reset(){this.#s?.removeObserver(this),this.#s=void 0,this.#a(),this.#i()}mutate(e,t){return this.#r=t,this.#s?.removeObserver(this),this.#s=this.#e.getMutationCache().build(this.#e,this.options),this.#s.addObserver(this),this.#s.execute(e)}#a(){let e=this.#s?.state??(0,a.R)();this.#t={...e,isPending:"pending"===e.status,isSuccess:"success"===e.status,isError:"error"===e.status,isIdle:"idle"===e.status,mutate:this.mutate,reset:this.reset}}#i(e){i.V.batch(()=>{if(this.#r&&this.hasListeners()){let t=this.#t.variables,s=this.#t.context;e?.type==="success"?(this.#r.onSuccess?.(e.data,t,s),this.#r.onSettled?.(e.data,null,t,s)):e?.type==="error"&&(this.#r.onError?.(e.error,t,s),this.#r.onSettled?.(void 0,e.error,t,s))}this.listeners.forEach(e=>{e(this.#t)})})}},d=s(4976),c=s(8613);function u(e,t){let s=(0,d.NL)(t),[a]=r.useState(()=>new n(s,e));r.useEffect(()=>{a.setOptions(e)},[a,e]);let l=r.useSyncExternalStore(r.useCallback(e=>a.subscribe(i.V.batchCalls(e)),[a]),()=>a.getCurrentResult(),()=>a.getCurrentResult()),o=r.useCallback((e,t)=>{a.mutate(e,t).catch(c.Z)},[a]);if(l.error&&(0,c.L)(a.options.throwOnError,[l.error]))throw l.error;return{...l,mutate:o,mutateAsync:l.mutate}}}};var t=require("../../../webpack-runtime.js");t.C(e);var s=e=>t(t.s=e),r=t.X(0,[309,644,899,412,260],()=>s(4871));module.exports=r})();