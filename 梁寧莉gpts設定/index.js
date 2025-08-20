import worker from './worker.js';
export default { fetch: (request, env, ctx) => worker.fetch(request, env, ctx) };
