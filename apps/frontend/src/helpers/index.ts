import dotenv from 'dotenv';

export function getEnv(name:string){
    dotenv.config();
    const envVar = process.env[name];

    if(envVar === undefined || envVar ===null || !envVar){
        throw (`No se ha definido variable de entorno para ${name}`)
    }

    return envVar;
}