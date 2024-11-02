(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7981],{3032:function(e,t,s){Promise.resolve().then(s.bind(s,8639))},8639:function(e,t,s){"use strict";s.r(t);var r=s(7437),i=s(9671),n=s(2299),a=s(9376),o=s(7300),u=s(8577),c=s(7753),d=s(2265),l=s(9343);t.default=()=>{let[e,t]=(0,d.useState)([]),[s,h]=(0,d.useState)([]),[p,m]=(0,d.useState)(!1),[x,b]=(0,d.useState)(""),[g,f]=(0,d.useState)(!1),[y,v]=(0,d.useState)(""),[q,C]=(0,d.useState)({open:!1,message:"",severity:"success"}),{data:w}=(0,o.Z)({queryKey:["education_experience"],url:"http://".concat("ec2-35-173-139-149.compute-1.amazonaws.com","/job-categories/unique/education-experience"),setSnackbarConfig:C}),{register:_,handleSubmit:j,formState:{errors:N},reset:E,setValue:k}=(0,l.cI)({resolver:(0,c.X)(u.Y),defaultValues:{id:"",name:"",description:"",required_education:"",required_experience:"",required_skills:[]}});(0,d.useEffect)(()=>{w&&(t(w.requiredEducation||[]),h(w.requiredExperience||[]))},[w]),(0,d.useEffect)(()=>{E()},[E]);let{mutate:R,isPending:S,isSuccess:Z,isError:M,error:O}=(0,a.s)({endpoint:"/job-categories",onSuccessMessage:"Job Category added successfully!",invalidateQueryKeys:["jobCategories"]}),P=async e=>{console.log("Form data before submission:",e),R(e)};return(0,d.useEffect)(()=>{Z?(E({name:"",description:"",required_education:"",required_experience:"",required_skills:[]}),C({open:!0,message:"Job Category created successfully!",severity:"success"})):M&&console.error("Failed to create/update the job category",O)},[O,M,Z,E]),(0,r.jsxs)(n.Z,{children:[(0,r.jsxs)("div",{className:"bg-white p-8 rounded-xl shadow-lg col-span-12 w-full relative",children:[(0,r.jsx)("h1",{className:"text-center text-2xl font-bold mb-6",children:"Create Job Category"}),(0,r.jsxs)("form",{className:"space-y-4",onSubmit:j(P),children:[(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{className:"block text-sm font-medium",children:"Category Name"}),(0,r.jsx)("input",{type:"text",..._("name"),className:"w-full px-4 py-2 mt-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent border ".concat(N.name?"border-high":"border-border"),placeholder:"Enter category name"}),N.name&&(0,r.jsx)("p",{className:"text-high mt-1 text-sm",children:N.name.message})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{className:"block text-sm font-medium",children:"Description"}),(0,r.jsx)("textarea",{..._("description"),className:"w-full px-4 py-2 mt-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent border ".concat(N.description?"border-high":"border-border"),placeholder:"Enter category description",rows:4}),N.description&&(0,r.jsx)("p",{className:"text-high mt-1 text-sm",children:N.description.message})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{className:"block text-sm font-medium",children:"Required Education"}),(0,r.jsxs)("div",{className:"flex gap-2 items-center",children:[(0,r.jsxs)("select",{..._("required_education"),className:"w-full px-4 py-2 mt-1 rounded-lg border ".concat(N.required_education?"border-high":"border-border"),children:[(0,r.jsx)("option",{value:"",children:"Select Required Education"}),e.map((e,t)=>(0,r.jsx)("option",{value:e,children:e},t))]}),(0,r.jsx)("div",{onClick:()=>m(!0),className:"mt-1 border-gray-500 border-dashed border-2 text-center rounded-md w-[45px] h-[40px] content-center text-lg font-bold cursor-pointer",children:"+"})]}),p&&(0,r.jsxs)("div",{className:"mt-2 flex gap-2",children:[(0,r.jsx)("input",{type:"text",className:"w-full px-4 py-2 rounded-lg border",placeholder:"Enter new education",value:x,onChange:e=>b(e.target.value)}),(0,r.jsx)("button",{type:"button",onClick:()=>{""!==x.trim()&&(t(e=>[...e,x]),k("required_education",x),m(!1),b(""))},className:"bg-blue-500 text-white rounded-md px-4 py-2",children:"Add"})]}),N.required_education&&(0,r.jsx)("p",{className:"text-high mt-1 text-sm",children:N.required_education.message})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{className:"block text-sm font-medium",children:"Required Experience"}),(0,r.jsxs)("div",{className:"flex gap-2 items-center",children:[(0,r.jsxs)("select",{..._("required_experience"),className:"w-full px-4 py-2 mt-1 rounded-lg border ".concat(N.required_experience?"border-high":"border-border"),children:[(0,r.jsx)("option",{value:"",children:"Select Required Experience"}),s.map((e,t)=>(0,r.jsx)("option",{value:e,children:e},t))]}),(0,r.jsx)("div",{onClick:()=>f(!0),className:"mt-1 border-gray-500 border-dashed border-2 text-center rounded-md w-[45px] h-[40px] content-center text-lg font-bold cursor-pointer",children:"+"})]}),g&&(0,r.jsxs)("div",{className:"mt-2 flex gap-2",children:[(0,r.jsx)("input",{type:"text",className:"w-full px-4 py-2 rounded-lg border",placeholder:"Enter new experience",value:y,onChange:e=>v(e.target.value)}),(0,r.jsx)("button",{type:"button",onClick:()=>{""!==y.trim()&&(h(e=>[...e,y]),k("required_experience",y),f(!1),v(""))},className:"bg-blue-500 text-white rounded-md px-4 py-2",children:"Add"})]}),N.required_experience&&(0,r.jsx)("p",{className:"text-high mt-1 text-sm",children:N.required_experience.message})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{className:"block text-sm font-medium",children:"Required Skills"}),(0,r.jsx)("textarea",{className:"w-full px-4 py-2 mt-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent border ".concat(N.required_skills?"border-high":"border-border"),placeholder:"Enter required skills (comma-separated)",rows:3,onChange:e=>{k("required_skills",e.target.value.split(",").map(e=>e.trim()))}}),N.required_skills&&(0,r.jsx)("p",{className:"text-high mt-1 text-sm",children:N.required_skills.message})]}),(0,r.jsx)("button",{type:"submit",className:"w-full py-2 mt-4 bg-[#413d99] text-white rounded-lg font-bold hover:bg-opacity-90 transition duration-200 ".concat(S?"opacity-50 cursor-not-allowed":""),disabled:S,children:S?"Creating...":"Create Job Category"}),M&&(0,r.jsx)("p",{className:"text-high mt-2 text-center",children:O+""})]})]}),(0,r.jsx)(i.Z,{open:q.open,message:q.message,severity:q.severity,onClose:()=>C(e=>({...e,open:!1}))})]})}},9671:function(e,t,s){"use strict";var r=s(7437);s(2265);var i=s(9175),n=s(5740);t.Z=e=>{let{open:t,message:s,severity:a,onClose:o}=e,u=(e,t)=>{"clickaway"!==t&&o()};return(0,r.jsx)(i.Z,{open:t,autoHideDuration:2e3,onClose:u,children:(0,r.jsx)(n.Z,{onClose:u,severity:a,variant:"filled",sx:{width:"100%"},children:s})})}},2299:function(e,t,s){"use strict";var r=s(7437);s(2265),t.Z=e=>{let{children:t,extraStyle:s}=e;return(0,r.jsx)("div",{className:"sm:w-full mobile-grid sm:desktop-grid  "+s,children:t})}},9376:function(e,t,s){"use strict";s.d(t,{s:function(){return o}});var r=s(3191),i=s(5524),n=s(8472),a=s(2649);let o=e=>{let{endpoint:t,onSuccessMessage:s,invalidateQueryKeys:o=[],options:u}=e,c=(0,r.NL)(),d=async e=>(await n.Z.post("http://".concat("ec2-35-173-139-149.compute-1.amazonaws.com").concat(t),e,{headers:{Authorization:"Bearer ".concat(a.Z.get("access_token"))}})).data;return(0,i.D)({mutationFn:d,onSuccess:e=>{s&&console.log(s,e),o.forEach(e=>{c.invalidateQueries(e)})},onError:e=>{console.error("Error during the create/add request:",e)},...u})}},7300:function(e,t,s){"use strict";var r=s(932),i=s(8472),n=s(2649);t.Z=e=>{let{queryKey:t,url:s,setSnackbarConfig:a,nestedData:o=!1,...u}=e;return(0,r.a)({queryKey:t,queryFn:async()=>{try{let e=await i.Z.get(s,{headers:{Authorization:"Bearer ".concat(n.Z.get("access_token"))}});return o?e.data.data:e.data}catch(e){throw i.Z.isAxiosError(e)&&e.response?a({open:!0,message:"Error: ".concat(e.response.data.message||"An error occurred"),severity:"error"}):a({open:!0,message:"Network error. Please try again later.",severity:"error"}),e}},retry:2,...u})}},8577:function(e,t,s){"use strict";s.d(t,{Y:function(){return i},h:function(){return n}});var r=s(4245);let i=r.Ry().shape({name:r.Z_().required("Category name is required"),description:r.Z_().required("Description is required"),required_education:r.Z_().required("Required education is required"),required_experience:r.Z_().required("Required experience is required"),required_skills:r.IX(r.Z_().required("Skill is required")).min(1,"At least one skill is required")}),n=r.Ry().shape({name:r.Z_().required("Job title name is required"),title:r.Z_().required("Title is required"),grade_level:r.Z_().required("Grade level is required"),description:r.Z_().required("Description is required"),responsibilities:r.IX(r.Z_().required("Responsibilities are required")).required(),permissions:r.IX(r.Z_().required("Each permission must be a string")).required("Permissions are required"),department_id:r.Z_().required("Department ID is required"),category:r.Z_().required("Job Category is required"),is_manager:r.O7().notRequired(),accessibleDepartments:r.IX(r.Z_()).nullable(),accessibleEmps:r.IX(r.Z_()).nullable(),accessibleJobTitles:r.IX(r.Z_()).nullable()})},2812:function(e,t,s){"use strict";s.d(t,{R:function(){return o},m:function(){return a}});var r=s(9948),i=s(3494),n=s(924),a=class extends i.F{#e;#t;#s;constructor(e){super(),this.mutationId=e.mutationId,this.#t=e.mutationCache,this.#e=[],this.state=e.state||o(),this.setOptions(e.options),this.scheduleGc()}setOptions(e){this.options=e,this.updateGcTime(this.options.gcTime)}get meta(){return this.options.meta}addObserver(e){this.#e.includes(e)||(this.#e.push(e),this.clearGcTimeout(),this.#t.notify({type:"observerAdded",mutation:this,observer:e}))}removeObserver(e){this.#e=this.#e.filter(t=>t!==e),this.scheduleGc(),this.#t.notify({type:"observerRemoved",mutation:this,observer:e})}optionalRemove(){this.#e.length||("pending"===this.state.status?this.scheduleGc():this.#t.remove(this))}continue(){return this.#s?.continue()??this.execute(this.state.variables)}async execute(e){this.#s=(0,n.Mz)({fn:()=>this.options.mutationFn?this.options.mutationFn(e):Promise.reject(Error("No mutationFn found")),onFail:(e,t)=>{this.#r({type:"failed",failureCount:e,error:t})},onPause:()=>{this.#r({type:"pause"})},onContinue:()=>{this.#r({type:"continue"})},retry:this.options.retry??0,retryDelay:this.options.retryDelay,networkMode:this.options.networkMode,canRun:()=>this.#t.canRun(this)});let t="pending"===this.state.status,s=!this.#s.canStart();try{if(!t){this.#r({type:"pending",variables:e,isPaused:s}),await this.#t.config.onMutate?.(e,this);let t=await this.options.onMutate?.(e);t!==this.state.context&&this.#r({type:"pending",context:t,variables:e,isPaused:s})}let r=await this.#s.start();return await this.#t.config.onSuccess?.(r,e,this.state.context,this),await this.options.onSuccess?.(r,e,this.state.context),await this.#t.config.onSettled?.(r,null,this.state.variables,this.state.context,this),await this.options.onSettled?.(r,null,e,this.state.context),this.#r({type:"success",data:r}),r}catch(t){try{throw await this.#t.config.onError?.(t,e,this.state.context,this),await this.options.onError?.(t,e,this.state.context),await this.#t.config.onSettled?.(void 0,t,this.state.variables,this.state.context,this),await this.options.onSettled?.(void 0,t,e,this.state.context),t}finally{this.#r({type:"error",error:t})}}finally{this.#t.runNext(this)}}#r(e){this.state=(t=>{switch(e.type){case"failed":return{...t,failureCount:e.failureCount,failureReason:e.error};case"pause":return{...t,isPaused:!0};case"continue":return{...t,isPaused:!1};case"pending":return{...t,context:e.context,data:void 0,failureCount:0,failureReason:null,error:null,isPaused:e.isPaused,status:"pending",variables:e.variables,submittedAt:Date.now()};case"success":return{...t,data:e.data,failureCount:0,failureReason:null,error:null,status:"success",isPaused:!1};case"error":return{...t,data:void 0,error:e.error,failureCount:t.failureCount+1,failureReason:e.error,isPaused:!1,status:"error"}}})(this.state),r.V.batch(()=>{this.#e.forEach(t=>{t.onMutationUpdate(e)}),this.#t.notify({mutation:this,type:"updated",action:e})})}};function o(){return{context:void 0,data:void 0,error:null,failureCount:0,failureReason:null,isPaused:!1,status:"idle",variables:void 0,submittedAt:0}}},5524:function(e,t,s){"use strict";s.d(t,{D:function(){return l}});var r=s(2265),i=s(2812),n=s(9948),a=s(9010),o=s(6298),u=class extends a.l{#i;#n=void 0;#a;#o;constructor(e,t){super(),this.#i=e,this.setOptions(t),this.bindMethods(),this.#u()}bindMethods(){this.mutate=this.mutate.bind(this),this.reset=this.reset.bind(this)}setOptions(e){let t=this.options;this.options=this.#i.defaultMutationOptions(e),(0,o.VS)(this.options,t)||this.#i.getMutationCache().notify({type:"observerOptionsUpdated",mutation:this.#a,observer:this}),t?.mutationKey&&this.options.mutationKey&&(0,o.Ym)(t.mutationKey)!==(0,o.Ym)(this.options.mutationKey)?this.reset():this.#a?.state.status==="pending"&&this.#a.setOptions(this.options)}onUnsubscribe(){this.hasListeners()||this.#a?.removeObserver(this)}onMutationUpdate(e){this.#u(),this.#c(e)}getCurrentResult(){return this.#n}reset(){this.#a?.removeObserver(this),this.#a=void 0,this.#u(),this.#c()}mutate(e,t){return this.#o=t,this.#a?.removeObserver(this),this.#a=this.#i.getMutationCache().build(this.#i,this.options),this.#a.addObserver(this),this.#a.execute(e)}#u(){let e=this.#a?.state??(0,i.R)();this.#n={...e,isPending:"pending"===e.status,isSuccess:"success"===e.status,isError:"error"===e.status,isIdle:"idle"===e.status,mutate:this.mutate,reset:this.reset}}#c(e){n.V.batch(()=>{if(this.#o&&this.hasListeners()){let t=this.#n.variables,s=this.#n.context;e?.type==="success"?(this.#o.onSuccess?.(e.data,t,s),this.#o.onSettled?.(e.data,null,t,s)):e?.type==="error"&&(this.#o.onError?.(e.error,t,s),this.#o.onSettled?.(void 0,e.error,t,s))}this.listeners.forEach(e=>{e(this.#n)})})}},c=s(3191),d=s(7832);function l(e,t){let s=(0,c.NL)(t),[i]=r.useState(()=>new u(s,e));r.useEffect(()=>{i.setOptions(e)},[i,e]);let a=r.useSyncExternalStore(r.useCallback(e=>i.subscribe(n.V.batchCalls(e)),[i]),()=>i.getCurrentResult(),()=>i.getCurrentResult()),o=r.useCallback((e,t)=>{i.mutate(e,t).catch(d.Z)},[i]);if(a.error&&(0,d.L)(i.options.throwOnError,[a.error]))throw a.error;return{...a,mutate:o,mutateAsync:a.mutate}}}},function(e){e.O(0,[7034,5907,4186,1336,2280,932,2971,7023,1744],function(){return e(e.s=3032)}),_N_E=e.O()}]);