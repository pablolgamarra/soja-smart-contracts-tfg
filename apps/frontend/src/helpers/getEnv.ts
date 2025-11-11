export default function getEnv(name:string){    
    const envVar = import.meta.env[`VITE_${name}`];

    if(envVar === undefined || envVar ===null || !envVar){
        throw (`No se ha definido variable de entorno para ${name}`)
    }

    return envVar;
}