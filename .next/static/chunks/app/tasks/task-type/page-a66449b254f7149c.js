(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5784],{1642:function(t,e,s){Promise.resolve().then(s.bind(s,9210))},3657:function(t,e,s){"use strict";var r=s(9018),i=s(7437);e.Z=(0,r.Z)((0,i.jsx)("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"}),"Delete")},7266:function(t,e,s){"use strict";var r=s(9018),i=s(7437);e.Z=(0,r.Z)((0,i.jsx)("path",{d:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75z"}),"Edit")},9210:function(t,e,s){"use strict";s.r(e);var r=s(7437),i=s(7300),a=s(3657),n=s(7266),o=s(2265),u=s(818),c=s(9671);e.default=()=>{let[t,e]=(0,o.useState)({open:!1,message:"",severity:"success"}),{data:s,isLoading:l,error:d}=(0,i.Z)({queryKey:["taskTypes"],url:"http://".concat("ec2-35-173-139-149.compute-1.amazonaws.com","/task-type/find-all"),setSnackbarConfig:e,nestedData:!0}),[h,p]=(0,o.useState)(!1),[m,y]=(0,o.useState)(null);if(l)return(0,r.jsx)("div",{className:"flex items-center justify-center min-h-screen",children:(0,r.jsx)("p",{className:"text-xl text-gray-700",children:"Loading..."})});if(d)return(0,r.jsx)("div",{className:"flex items-center justify-center min-h-screen",children:(0,r.jsx)("p",{className:"text-xl text-red-500",children:"Failed to load task types."})});let x=t=>{y(t),p(!0)};return(0,r.jsxs)("div",{className:"container mx-auto p-4 min-h-screen",children:[(0,r.jsx)("h1",{className:"text-3xl font-bold text-center mb-6",children:"Task Types"}),s&&s.length>0?(0,r.jsx)("div",{className:"overflow-x-auto",children:(0,r.jsxs)("table",{className:"min-w-full bg-white rounded-lg shadow-md",children:[(0,r.jsx)("thead",{className:"bg-gray-200",children:(0,r.jsxs)("tr",{children:[(0,r.jsx)("th",{className:"text-left py-3 px-4 uppercase font-semibold text-sm",children:"Name"}),(0,r.jsx)("th",{className:"text-left py-3 px-4 uppercase font-semibold text-sm",children:"Description"}),(0,r.jsx)("th",{className:"text-left py-3 px-4 uppercase font-semibold text-sm",children:"Actions"})]})}),(0,r.jsx)("tbody",{children:s.map(t=>(0,r.jsxs)("tr",{className:"hover:bg-gray-100 transition-colors",children:[(0,r.jsx)("td",{className:"py-3 px-4",children:t.name}),(0,r.jsx)("td",{className:"py-3 px-4",children:t.description}),(0,r.jsxs)("td",{className:"py-3 px-4 flex space-x-2",children:[(0,r.jsx)(n.Z,{className:"cursor-pointer text-[#1b1a40]",onClick:()=>x(t)}),(0,r.jsx)(a.Z,{className:"cursor-pointer text-red-500"})]})]},t.id))})]})}):(0,r.jsx)("p",{className:"text-center text-gray-600 mt-4",children:"No task types found."}),(0,r.jsx)("div",{className:"flex justify-center mt-6",children:(0,r.jsx)("button",{className:"bg-[#413d99] text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition duration-200",onClick:()=>{y(null),p(!0)},children:"Add Task Type"})}),(0,r.jsx)(u.Z,{isOpen:h,onClose:()=>p(!1),taskTypeData:m}),(0,r.jsx)(c.Z,{open:t.open,message:t.message,severity:t.severity,onClose:()=>e(t=>({...t,open:!1}))})]})}},818:function(t,e,s){"use strict";var r=s(7437),i=s(9376),a=s(2626),n=s(7753),o=s(2265),u=s(9343),c=s(7583),l=s.n(c);e.Z=t=>{let{isOpen:e,onClose:s,taskTypeData:c}=t,{register:d,handleSubmit:h,formState:{errors:p},reset:m}=(0,u.cI)({resolver:(0,n.X)(a._v),defaultValues:c||{}});(0,o.useEffect)(()=>{c?m(c):m()},[c,m]);let y=c?"/task-type/update/".concat(c.id):"/task-type/create",{mutate:x,isPending:f,isSuccess:b,isError:v,error:g}=(0,i.s)({endpoint:y,onSuccessMessage:"Task Type added successfully!",invalidateQueryKeys:["taskTypes"]}),j=async t=>{x({name:t.name,description:t.description}),console.log(y)};return(0,o.useEffect)(()=>{b?m({id:"",name:"",description:""}):v&&console.error("Failed to create/update the task type",g)},[g,v,b,m]),(0,r.jsx)(l(),{isOpen:e,onRequestClose:s,ariaHideApp:!1,contentLabel:"Create/Update Task Type",className:"fixed inset-0 flex items-center justify-center",overlayClassName:"fixed inset-0 bg-black bg-opacity-50 z-50",children:(0,r.jsxs)("div",{className:"bg-white p-8 rounded-xl shadow-lg max-w-md w-full relative",children:[(0,r.jsx)("button",{onClick:s,className:"absolute top-2 right-2 text-gray-700 hover:text-red-500",children:"\xd7"}),(0,r.jsx)("h1",{className:"text-center text-2xl font-bold mb-6",children:c?"Update Task Type":"Create Task Type"}),(0,r.jsxs)("form",{className:"space-y-4",onSubmit:h(j),children:[(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{className:"block text-gray-600 text-sm font-medium",children:"Task Type Name"}),(0,r.jsx)("input",{type:"text",...d("name"),className:"w-full px-4 py-2 mt-1 rounded-lg border focus:outline-none ".concat(p.name?"border-red-500":"border-gray-300"),placeholder:"Enter task type name"}),p.name&&(0,r.jsx)("p",{className:"text-red-500 mt-1 text-sm",children:p.name.message})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{className:"block text-gray-600 text-sm font-medium",children:"Description"}),(0,r.jsx)("textarea",{...d("description"),className:"w-full px-4 py-2 mt-1 rounded-lg border focus:outline-none ".concat(p.description?"border-red-500":"border-gray-300"),placeholder:"Enter description",rows:3}),p.description&&(0,r.jsx)("p",{className:"text-red-500 mt-1 text-sm",children:p.description.message})]}),(0,r.jsx)("button",{type:"submit",className:"w-full py-2 mt-4 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition duration-200 ".concat(f?"opacity-50 cursor-not-allowed":""),disabled:f,children:f?c?"Updating...":"Creating...":c?"Update Task Type":"Create Task Type"}),v&&(0,r.jsx)("p",{className:"text-red-500 mt-2 text-center",children:g+""}),b&&(0,r.jsx)("p",{className:"text-green-500 mt-2 text-center",children:"Added Successfully"})]})]})})}},9671:function(t,e,s){"use strict";var r=s(7437);s(2265);var i=s(9175),a=s(5740);e.Z=t=>{let{open:e,message:s,severity:n,onClose:o}=t,u=(t,e)=>{"clickaway"!==e&&o()};return(0,r.jsx)(i.Z,{open:e,autoHideDuration:2e3,onClose:u,children:(0,r.jsx)(a.Z,{onClose:u,severity:n,variant:"filled",sx:{width:"100%"},children:s})})}},9376:function(t,e,s){"use strict";s.d(e,{s:function(){return o}});var r=s(3191),i=s(5524),a=s(8472),n=s(2649);let o=t=>{let{endpoint:e,onSuccessMessage:s,invalidateQueryKeys:o=[],options:u}=t,c=(0,r.NL)(),l=async t=>(await a.Z.post("http://".concat("ec2-35-173-139-149.compute-1.amazonaws.com").concat(e),t,{headers:{Authorization:"Bearer ".concat(n.Z.get("access_token"))}})).data;return(0,i.D)({mutationFn:l,onSuccess:t=>{s&&console.log(s,t),o.forEach(t=>{c.invalidateQueries(t)})},onError:t=>{console.error("Error during the create/add request:",t)},...u})}},7300:function(t,e,s){"use strict";var r=s(932),i=s(8472),a=s(2649);e.Z=t=>{let{queryKey:e,url:s,setSnackbarConfig:n,nestedData:o=!1,...u}=t;return(0,r.a)({queryKey:e,queryFn:async()=>{try{let t=await i.Z.get(s,{headers:{Authorization:"Bearer ".concat(a.Z.get("access_token"))}});return o?t.data.data:t.data}catch(t){throw i.Z.isAxiosError(t)&&t.response?n({open:!0,message:"Error: ".concat(t.response.data.message||"An error occurred"),severity:"error"}):n({open:!0,message:"Network error. Please try again later.",severity:"error"}),t}},retry:2,...u})}},2626:function(t,e,s){"use strict";s.d(e,{KV:function(){return a},T$:function(){return i},_v:function(){return o},lj:function(){return n}});var r=s(4245);let i=r.Ry().shape({name:r.Z_().required("Task name is required"),description:r.Z_().required("Description is required"),task_type:r.Z_().required("Task type is required"),priority:r.Rx().required("Priority is required").typeError("Priority must be a number"),emp:r.Z_().nullable(),department_id:r.Z_().nullable(),status:r.Z_().required("Task status is required"),due_date:r.hT().required("Due date is required").typeError("Invalid date format"),files:r.IX().of(r.Z_()),isRecurring:r.O7(),intervalInDays:r.Rx().when("isRecurring",{is:!0,then:t=>t.required("Interval in days is required").min(1,"Interval must be at least 1 day"),otherwise:t=>t.nullable()}),end_date:r.hT().when("isRecurring",{is:!0,then:t=>t.required("End date is required").typeError("Invalid date format"),otherwise:t=>t.nullable()})}),a=r.Ry().shape({name:r.Z_().required("Task name is required"),description:r.Z_().required("Description is required"),task_type:r.Z_().required("Task type is required"),priority:r.Rx().required("Priority is required").typeError("Priority must be a number"),emp:r.Z_().nullable(),department_id:r.Z_().nullable(),status:r.Z_().required("Task status is required"),due_date:r.hT().required("Due date is required").typeError("Invalid date format"),files:r.IX().of(r.Z_())}),n=r.Ry().shape({name:r.Z_().required("Task status name is required"),description:r.Z_().required("Description is required")}),o=r.Ry().shape({name:r.Z_().required("Task type name is required"),description:r.Z_().required("Description is required")})},2812:function(t,e,s){"use strict";s.d(e,{R:function(){return o},m:function(){return n}});var r=s(9948),i=s(3494),a=s(924),n=class extends i.F{#t;#e;#s;constructor(t){super(),this.mutationId=t.mutationId,this.#e=t.mutationCache,this.#t=[],this.state=t.state||o(),this.setOptions(t.options),this.scheduleGc()}setOptions(t){this.options=t,this.updateGcTime(this.options.gcTime)}get meta(){return this.options.meta}addObserver(t){this.#t.includes(t)||(this.#t.push(t),this.clearGcTimeout(),this.#e.notify({type:"observerAdded",mutation:this,observer:t}))}removeObserver(t){this.#t=this.#t.filter(e=>e!==t),this.scheduleGc(),this.#e.notify({type:"observerRemoved",mutation:this,observer:t})}optionalRemove(){this.#t.length||("pending"===this.state.status?this.scheduleGc():this.#e.remove(this))}continue(){return this.#s?.continue()??this.execute(this.state.variables)}async execute(t){this.#s=(0,a.Mz)({fn:()=>this.options.mutationFn?this.options.mutationFn(t):Promise.reject(Error("No mutationFn found")),onFail:(t,e)=>{this.#r({type:"failed",failureCount:t,error:e})},onPause:()=>{this.#r({type:"pause"})},onContinue:()=>{this.#r({type:"continue"})},retry:this.options.retry??0,retryDelay:this.options.retryDelay,networkMode:this.options.networkMode,canRun:()=>this.#e.canRun(this)});let e="pending"===this.state.status,s=!this.#s.canStart();try{if(!e){this.#r({type:"pending",variables:t,isPaused:s}),await this.#e.config.onMutate?.(t,this);let e=await this.options.onMutate?.(t);e!==this.state.context&&this.#r({type:"pending",context:e,variables:t,isPaused:s})}let r=await this.#s.start();return await this.#e.config.onSuccess?.(r,t,this.state.context,this),await this.options.onSuccess?.(r,t,this.state.context),await this.#e.config.onSettled?.(r,null,this.state.variables,this.state.context,this),await this.options.onSettled?.(r,null,t,this.state.context),this.#r({type:"success",data:r}),r}catch(e){try{throw await this.#e.config.onError?.(e,t,this.state.context,this),await this.options.onError?.(e,t,this.state.context),await this.#e.config.onSettled?.(void 0,e,this.state.variables,this.state.context,this),await this.options.onSettled?.(void 0,e,t,this.state.context),e}finally{this.#r({type:"error",error:e})}}finally{this.#e.runNext(this)}}#r(t){this.state=(e=>{switch(t.type){case"failed":return{...e,failureCount:t.failureCount,failureReason:t.error};case"pause":return{...e,isPaused:!0};case"continue":return{...e,isPaused:!1};case"pending":return{...e,context:t.context,data:void 0,failureCount:0,failureReason:null,error:null,isPaused:t.isPaused,status:"pending",variables:t.variables,submittedAt:Date.now()};case"success":return{...e,data:t.data,failureCount:0,failureReason:null,error:null,status:"success",isPaused:!1};case"error":return{...e,data:void 0,error:t.error,failureCount:e.failureCount+1,failureReason:t.error,isPaused:!1,status:"error"}}})(this.state),r.V.batch(()=>{this.#t.forEach(e=>{e.onMutationUpdate(t)}),this.#e.notify({mutation:this,type:"updated",action:t})})}};function o(){return{context:void 0,data:void 0,error:null,failureCount:0,failureReason:null,isPaused:!1,status:"idle",variables:void 0,submittedAt:0}}},5524:function(t,e,s){"use strict";s.d(e,{D:function(){return d}});var r=s(2265),i=s(2812),a=s(9948),n=s(9010),o=s(6298),u=class extends n.l{#i;#a=void 0;#n;#o;constructor(t,e){super(),this.#i=t,this.setOptions(e),this.bindMethods(),this.#u()}bindMethods(){this.mutate=this.mutate.bind(this),this.reset=this.reset.bind(this)}setOptions(t){let e=this.options;this.options=this.#i.defaultMutationOptions(t),(0,o.VS)(this.options,e)||this.#i.getMutationCache().notify({type:"observerOptionsUpdated",mutation:this.#n,observer:this}),e?.mutationKey&&this.options.mutationKey&&(0,o.Ym)(e.mutationKey)!==(0,o.Ym)(this.options.mutationKey)?this.reset():this.#n?.state.status==="pending"&&this.#n.setOptions(this.options)}onUnsubscribe(){this.hasListeners()||this.#n?.removeObserver(this)}onMutationUpdate(t){this.#u(),this.#c(t)}getCurrentResult(){return this.#a}reset(){this.#n?.removeObserver(this),this.#n=void 0,this.#u(),this.#c()}mutate(t,e){return this.#o=e,this.#n?.removeObserver(this),this.#n=this.#i.getMutationCache().build(this.#i,this.options),this.#n.addObserver(this),this.#n.execute(t)}#u(){let t=this.#n?.state??(0,i.R)();this.#a={...t,isPending:"pending"===t.status,isSuccess:"success"===t.status,isError:"error"===t.status,isIdle:"idle"===t.status,mutate:this.mutate,reset:this.reset}}#c(t){a.V.batch(()=>{if(this.#o&&this.hasListeners()){let e=this.#a.variables,s=this.#a.context;t?.type==="success"?(this.#o.onSuccess?.(t.data,e,s),this.#o.onSettled?.(t.data,null,e,s)):t?.type==="error"&&(this.#o.onError?.(t.error,e,s),this.#o.onSettled?.(void 0,t.error,e,s))}this.listeners.forEach(t=>{t(this.#a)})})}},c=s(3191),l=s(7832);function d(t,e){let s=(0,c.NL)(e),[i]=r.useState(()=>new u(s,t));r.useEffect(()=>{i.setOptions(t)},[i,t]);let n=r.useSyncExternalStore(r.useCallback(t=>i.subscribe(a.V.batchCalls(t)),[i]),()=>i.getCurrentResult(),()=>i.getCurrentResult()),o=r.useCallback((t,e)=>{i.mutate(t,e).catch(l.Z)},[i]);if(n.error&&(0,l.L)(i.options.throwOnError,[n.error]))throw n.error;return{...n,mutate:o,mutateAsync:n.mutate}}}},function(t){t.O(0,[7034,5907,4186,1336,2280,932,7583,2971,7023,1744],function(){return t(t.s=1642)}),_N_E=t.O()}]);