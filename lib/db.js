import {Pool} from 'pg';

// Jedan zajednički pool za cijelu aplikaciju (preživljava hot-reload u dev modu).
const globalForDb = globalThis;
if (!globalForDb.__alyPool) globalForDb.__alyPool = new Pool({connectionString: process.env.DATABASE_URL});
export const db = globalForDb.__alyPool;
