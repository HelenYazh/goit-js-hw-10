import"./assets/modulepreload-polyfill-3cfb730f.js";import{i as s}from"./assets/vendor-77e16229.js";const o=document.querySelector("form"),m=document.querySelector('input[name="delay"]');o.addEventListener("submit",a);function a(t){t.preventDefault();const i=t.currentTarget.elements.state.value,e=parseInt(m.value);new Promise((n,r)=>{setTimeout(()=>{i==="rejected"?r(e):n(e)},e)}).then(()=>s.success({title:"",message:`✅ Fulfilled promise in ${e}ms`,position:"topRight"})).catch(()=>s.error({title:"",message:`❌ Rejected promise in ${e}ms`,position:"topRight"})),o.reset()}
//# sourceMappingURL=commonHelpers2.js.map