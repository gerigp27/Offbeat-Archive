import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import { orderHandler } from './server/orders.ts'
export default defineConfig(({mode})=>{
 const env={...loadEnv(mode,process.cwd(),''),...process.env} as Record<string,string>;
 return {plugins:[react(),tailwindcss(),{name:'orders-api',configureServer(server){server.middlewares.use('/api/orders',(req,res)=>{void orderHandler(req,res,env)})}}],resolve:{alias:{'@':fileURLToPath(new URL('./src',import.meta.url))}}}
})


