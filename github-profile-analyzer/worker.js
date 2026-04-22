// export default {
//   async fetch(request, env, ctx) {
//     return handleRequest(request, env);
//   }
// };

// const badgeAssets = {
//   "pull-shark": "https://github.githubassets.com/assets/pull-shark-default-498c279a747d.png",
//   "starstruck": "https://github.githubassets.com/assets/starstruck-default--light-medium-65b31ef2251e.png",
//   "pair-extraordinaire": "https://github.githubassets.com/assets/pair-extraordinaire-default-579438a20e01.png",
//   "galaxy-brain": "https://github.githubassets.com/assets/galaxy-brain-default-847262c21056.png",
//   "yolo": "https://github.githubassets.com/assets/yolo-default-be0bbff04951.png",
//   "quickdraw": "https://github.githubassets.com/assets/quickdraw-default--light-medium-5450fadcbe37.png",
//   "highlight": "https://github.githubassets.com/assets/highlight-default--light-medium-30e41ef7e6e7.png",
//   "community": "https://github.githubassets.com/assets/community-default-4c5bc57b9b55.png",
//   "deep-diver": "https://github.githubassets.com/assets/deep-diver-default--light-medium-a7be3c095c3d.png",
//   "arctic-code-vault-contributor": "https://github.githubassets.com/assets/arctic-code-vault-contributor-default-f5b6474c6028.png",
//   "public-sponsor": "https://github.githubassets.com/assets/public-sponsor-default-4e30fe60271d.png",
//   "heart-on-your-sleeve": "https://github.githubassets.com/assets/heart-on-your-sleeve-default-28aa2b2f7ffb.png",
//   "open-sourcerer": "https://github.githubassets.com/assets/open-sourcerer-default-64b1f529dcdb.png",
// };

// const FRONTEND_ORIGIN = "";

// async function checkAchievementStatus(username, slug) {
//   const url = `https://github.com/${encodeURIComponent(username)}?tab=achievements&achievement=${slug}`;
//   try {
//     const res = await fetch(url, {
//       method: "HEAD",
//       headers: { "User-Agent": "Cloudflare-Worker/1.0", Accept: "*/*" },
//     });
//     return res.status === 200 ? slug : null;
//   } catch {
//     return null;
//   }
// }

// async function handleRequest(request, env) {
//   // Securely load keys from .dev.vars
//   const githubTokens = env.GITHUB_TOKENS ? [env.GITHUB_TOKENS] : [];
//   const cerebrasKeys = env.CEREBRAS_API_KEY ? [env.CEREBRAS_API_KEY] : [];

//   try {
//     const url = new URL(request.url);
//     if (url.pathname === "/") {
//       return new Response(getFrontendHTML(), {
//         headers: { "Content-Type": "text/html" },
//       });
//     }

//     // Rate Limit Endpoint
//     if (url.pathname === "/rate_limit") {
//       let total = 0, used = 0, remaining = 0;
//       const rateLimitUrl = "https://api.github.com/rate_limit";
//       for (const token of githubTokens) {
//         const headers = {
//           Authorization: `token ${token}`,
//           "User-Agent": "Cloudflare-Worker",
//           Accept: "application/vnd.github.v3+json",
//         };
//         const resp = await fetch(rateLimitUrl, { headers, cf: { timeout: 60000 } });
//         if (!resp.ok) continue;
//         const data = await resp.json();
//         const r = data.rate;
//         total += r.limit;
//         used += r.used;
//         remaining += r.remaining;
//       }
      
//       console.log(`💰 [Backend] Rate Limit: ${remaining}/${total} remaining`);
      
//       return new Response(
//         JSON.stringify({ rate: { limit: total, used: used, remaining: remaining } }),
//         { headers: { "Content-Type": "application/json" } }
//       );
//     }

//     if (url.pathname === "/contributions") {
//       const origin = request.headers.get("Origin") || request.headers.get("Referer") || "";
//       if (!origin.startsWith(FRONTEND_ORIGIN)) {
//         return new Response(JSON.stringify({ error: "Cross-origin requests are not allowed" }), { status: 403, headers: { "Content-Type": "application/json" } });
//       }
//       const username = url.searchParams.get("username");
//       if (!username) {
//         return new Response(JSON.stringify({ error: "Username parameter is required" }), { status: 400, headers: { "Content-Type": "application/json" } });
//       }
//       const cacheKey = new Request(request.url, request);
//       const cache = caches.default;
//       const cached = await cache.match(cacheKey);
//       if (cached) return cached;

//       const idx = Math.floor(Math.random() * githubTokens.length);
//       const token = githubTokens[idx];
//       const query = `
//         {
//           user(login: "${username}") {
//             contributionsCollection {
//               contributionCalendar {
//                 weeks {
//                   contributionDays {
//                     date
//                     contributionCount
//                   }
//                 }
//               }
//             }
//           }
//         }
//       `;
//       const graphResp = await fetch("https://api.github.com/graphql", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//           "User-Agent": "Cloudflare-Worker",
//         },
//         body: JSON.stringify({ query }),
//       });
//       if (!graphResp.ok) {
//         const errorText = await graphResp.text();
//         return new Response(JSON.stringify({ error: `GitHub API error: ${graphResp.status} - ${errorText}` }), { status: graphResp.status, headers: { "Content-Type": "application/json" } });
//       }
//       const result = await graphResp.json();
//       const weeks = result.data.user.contributionsCollection.contributionCalendar.weeks || [];
//       const cellSize = 10, cellMargin = 2, daysCount = 7;
//       const width = weeks.length * (cellSize + cellMargin) + cellMargin;
//       const height = daysCount * (cellSize + cellMargin) + cellMargin;
//       let svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">`;
//       svg += '<rect width="100%" height="100%" fill="#1a1a1a"/>';
//       const maxContrib = Math.max(1, ...weeks.flatMap((w) => w.contributionDays.map((d) => d.contributionCount)));
//       weeks.forEach((week, wi) => {
//         week.contributionDays.forEach((day, di) => {
//           const x = wi * (cellSize + cellMargin);
//           const y = di * (cellSize + cellMargin);
//           const intensity = Math.min(day.contributionCount / maxContrib, 1);
//           const fill = day.contributionCount === 0 ? "#2f3727" : `rgba(0,255,0,${0.2 + intensity * 0.8})`;
//           svg += `<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" fill="${fill}"/>`;
//         });
//       });
//       svg += "</svg>";
//       const responseSvg = new Response(svg, {
//         headers: { "Content-Type": "image/svg+xml", "Cache-Control": "public, max-age=3600" },
//       });
//       await cache.put(cacheKey, responseSvg.clone());
//       return responseSvg;
//     }
    
//     // Default API path
//     if (url.pathname !== "/api") {
//       return new Response(JSON.stringify({ error: "Invalid path" }), { status: 404, headers: { "Content-Type": "application/json" } });
//     }

//     const origin = request.headers.get("Origin") || request.headers.get("Referer") || "";
//     if (!origin.startsWith(FRONTEND_ORIGIN)) {
//       return new Response(JSON.stringify({ error: "Cross-origin requests are not allowed" }), { status: 403, headers: { "Content-Type": "application/json" } });
//     }

//     const username = url.searchParams.get("username");
//     if (!username) {
//       return new Response(JSON.stringify({ error: "Username parameter is required" }), { status: 400, headers: { "Content-Type": "application/json" } });
//     }

//     const index = Math.floor(Math.random() * githubTokens.length);
//     const token = githubTokens[index];
//     const cerebrasIndex = Math.floor(Math.random() * cerebrasKeys.length);
//     const cerebrasKey = cerebrasKeys[cerebrasIndex];

//     const headers = {
//       Authorization: `token ${token}`,
//       "User-Agent": "Cloudflare-Worker",
//       Accept: "application/vnd.github.v3+json",
//     };

//     const rateLimitUrl = "https://api.github.com/rate_limit";
//     const rateLimitResp = await fetch(rateLimitUrl, { headers, cf: { timeout: 60000 } });
//     if (!rateLimitResp.ok) {
//       return new Response(JSON.stringify({ error: "Failed to check rate limit" }), { status: 500, headers: { "Content-Type": "application/json" } });
//     }
//     const rateLimitData = await rateLimitResp.json();
//     if (rateLimitData.rate.remaining === 0) {
//       return new Response(JSON.stringify({ error: "GitHub API rate limit exceeded" }), { status: 429, headers: { "Content-Type": "application/json" } });
//     }
    
//     console.log(`🔍 [Analysis] Processing user: ${username} | Tokens: ${rateLimitData.rate.remaining}`);

//     const starCheckUrl = `https://api.github.com/repos/0xarchit/github-profile-analyzer/stargazers?per_page=100`;
//     let hasStarred = false;

//     for (let page = 1; page <= 5; page++) {
//       const starredResp = await fetch(`${starCheckUrl}&page=${page}`, { headers, cf: { timeout: 30000 } });
//       if (!starredResp.ok) break;
//       const stargazers = await starredResp.json();
//       if (stargazers.length === 0) break;
//       hasStarred = stargazers.some((user) => user.login === username);
//       if (hasStarred) break;
//     }

//     async function userHasCommits(repoName) {
//       const commitsUrl = `https://api.github.com/repos/${username}/${repoName}/commits?author=${username}&per_page=1`;
//       const commitsResp = await fetch(commitsUrl, { headers, cf: { timeout: 15000 } });
//       if (!commitsResp.ok) return false;
//       const commitsData = await commitsResp.json();
//       return commitsData.length > 0;
//     }

//     const [userResp, reposResp] = await Promise.all([
//       fetch(`https://api.github.com/users/${username}`, { headers, cf: { timeout: 30000 } }),
//       fetch(`https://api.github.com/users/${username}/repos?per_page=100&page=1&sort=updated`, { headers, cf: { timeout: 30000 } }),
//     ]);

//     if (!userResp.ok) return new Response(JSON.stringify({ error: "Failed to fetch user data" }), { status: userResp.status, headers: { "Content-Type": "application/json" } });
//     if (!reposResp.ok) return new Response(JSON.stringify({ error: "Failed to fetch repositories" }), { status: reposResp.status, headers: { "Content-Type": "application/json" } });

//     const userData = await userResp.json();
//     const reposData = await reposResp.json();

//     const originalRepos = {};
//     const authoredForks = {};
//     const forks = [];
//     for (const repo of reposData) {
//       const repoName = repo.name;
//       const isFork = repo.fork || false;
//       const repoFields = {
//         description: repo.description || null,
//         stars: repo.stargazers_count || 0,
//         forks: repo.forks_count || 0,
//         issues: repo.open_issues || 0,
//         watchers: repo.watchers || 0,
//         primary_lang: repo.language || null,
//         has_issues: repo.has_issues || false,
//         has_projects: repo.has_projects || false,
//         has_wiki: repo.has_wiki || false,
//         has_pages: repo.has_pages || false,
//         has_downloads: repo.has_downloads || false,
//         has_discussions: repo.has_discussions || false,
//         license: repo.license || {},
//         topics: repo.topics || [],
//       };
//       if (!isFork) {
//         originalRepos[repoName] = repoFields;
//       } else {
//         forks.push({ name: repoName, fields: repoFields });
//       }
//     }

//     const BATCH_SIZE = 15;
//     const contributedForks = [];
//     for (let i = 0; i < forks.length; i += BATCH_SIZE) {
//       const batch = forks.slice(i, i + BATCH_SIZE);
//       const batchChecks = batch.map(async (fork) => {
//         const hasContributed = await userHasCommits(fork.name);
//         return hasContributed ? { name: fork.name, fields: fork.fields } : null;
//       });
//       const batchResults = (await Promise.all(batchChecks)).filter((f) => f !== null);
//       contributedForks.push(...batchResults);
//     }
//     contributedForks.forEach((fork) => {
//       authoredForks[fork.name] = fork.fields;
//     });

//     const profileSummary = {
//       avatar: userData.avatar_url || null,
//       username: userData.login || null,
//       name: userData.name || null,
//       company: userData.company || null,
//       location: userData.location || null,
//       blog: userData.blog || null,
//       bio: userData.bio || null,
//       email: userData.email || null,
//       twitter: userData.twitter_username || null,
//       followers: userData.followers || 0,
//       following: userData.following || 0,
//       public_repo_count: userData.public_repos || 0,
//       original_repos: originalRepos,
//       authored_forks: authoredForks,
//     };

//     const slugs = Object.keys(badgeAssets);
//     const unlockedBadges = await Promise.all(slugs.map((slug) => checkAchievementStatus(username, slug)));
//     const badges = {};
//     unlockedBadges.filter(Boolean).forEach((slug) => { badges[slug] = badgeAssets[slug]; });
//     profileSummary.badges = badges;

//     // ----- CEREBRAS API CALL -----
//     console.log("🤖 Sending to Cerebras AI...");
//     const cerebrasResponse = await fetch("https://api.cerebras.ai/v1/chat/completions", {
//       method: "POST",
//       headers: { 
//         Authorization: `Bearer ${cerebrasKey}`, 
//         "Content-Type": "application/json" 
//       },
//       body: JSON.stringify({
//         model: "llama3.1-8b", // ✅ Fixed model name!
//         messages: [
//           {
//             role: "system",
//             content: `You are the DevPool AI Trust Engine, an elite Senior Engineering Manager and Tech Recruiter. Your task is to deeply analyze this developer's GitHub footprint.

// SCORING RUBRIC (Calculate a realistic score from 0 to 100):
// - Activity & Consistency (25%): Look at their repo count and recent updates.
// - Project Complexity (30%): Look at original repos and the diversity of their languages.
// - Community Impact (20%): Look at total stars, watchers, and followers.
// - Collaboration (15%): Look at their forks and contributions to other projects.
// - Profile Quality (10%): Look at bio, unlocked badges, and completeness.
// *Strict Grading:* Average developers score 40-60. Great developers score 65-80. 90+ is reserved for world-class open-source leaders. Do NOT just give everyone an 85.

// ANALYSIS GUIDELINES:
// - detailed_analysis: Write a punchy, highly insightful 3-4 sentence paragraph. Highlight their actual technical traits, guess their seniority (junior/mid/senior), and note their coding habits based on the data. Avoid generic fluff.
// - improvement_areas: Give 3 highly specific, actionable technical tips to improve their portfolio.
// - diagnostics: Give 3 data-driven observations (e.g., "Heavy reliance on Python", "High fork-to-original ratio").
// - developer_type: Give a creative, accurate title (e.g., "Full-Stack Architect", "Frontend Tinkerer", "Data Science Specialist").

// You MUST return ONLY valid JSON matching this exact schema:
// { "score": int, "detailed_analysis": string, "improvement_areas": [string], "diagnostics": [string], "project_ideas": { "idea_1": { "title": str, "description": str, "tech stack": [] }, "idea_2": { "title": str, "description": str, "tech stack": [] }, "idea_3": { "title": str, "description": str, "tech stack": [] } }, "tag": { "tag_name": str, "description": str }, "developer_type": str }`
//           },
//           { role: "user", content: JSON.stringify(profileSummary) },
//         ],
//         response_format: { type: "json_object" },
//       }),
//     });

//     if (!cerebrasResponse.ok) {
//       const errText = await cerebrasResponse.text();
//       console.error("🚨 Cerebras Error:", errText);
//       return new Response(JSON.stringify({ error: `AI Failed: ${errText}` }), { status: cerebrasResponse.status, headers: { "Content-Type": "application/json" } });
//     }

//     const cerebrasData = await cerebrasResponse.json();
//     const aiAnalysis = JSON.parse(cerebrasData.choices[0].message.content);
//     const responseData = Object.assign({}, profileSummary, aiAnalysis);
    
//     return new Response(JSON.stringify(responseData), { headers: { "Content-Type": "application/json" } });
    
//   } catch (error) {
//     console.error("🚨 Server Error:", error);
//     return new Response(JSON.stringify({ error: `Worker error: ${error.message}` }), { status: 500, headers: { "Content-Type": "application/json" } });
//   }
// }

// function getFrontendHTML() {
//   return `<!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <title>GitHub Profile Analyzer</title>
//   <script src="https://cdn.tailwindcss.com"></script>
//   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
//   <style>
//     * { user-drag: none; -webkit-user-drag: none; user-select: none; -webkit-user-select: none; }
//     :root {
//       --progress-bar-width: 180px; --progress-bar-height: 180px; --font-size: 1.5rem;
//       --bg-primary: #f8fafc; --bg-secondary: #ffffff; --bg-tertiary: #f1f5f9;
//       --text-primary: #0f172a; --text-secondary: #475569; --text-tertiary: #64748b;
//       --border-color: #e2e8f0; --accent-primary: #3b82f6; --accent-secondary: #8b5cf6;
//       --glass-bg: rgba(255, 255, 255, 0.7); --glass-border: rgba(226, 232, 240, 0.8);
//       --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.05); --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07);
//       --gradient-start: #3b82f6; --gradient-end: #8b5cf6;
//     }
//     [data-theme="dark"] {
//       --bg-primary: #0f172a; --bg-secondary: #1e293b; --bg-tertiary: #334155;
//       --text-primary: #f8fafc; --text-secondary: #cbd5e1; --text-tertiary: #94a3b8;
//       --border-color: #334155; --accent-primary: #60a5fa; --accent-secondary: #a78bfa;
//       --glass-bg: rgba(30, 41, 59, 0.7); --glass-border: rgba(51, 65, 85, 0.8);
//     }
//     body { background: var(--bg-primary); color: var(--text-primary); transition: background 0.3s ease, color 0.3s ease; font-family: -apple-system, sans-serif; }
//     .glassmorphism { background: var(--glass-bg); backdrop-filter: blur(20px); border-radius: 16px; border: 1px solid var(--glass-border); box-shadow: var(--shadow-md); }
//     .card { background: var(--bg-secondary); border-radius: 16px; border: 1px solid var(--border-color); box-shadow: var(--shadow-sm); transition: all 0.3s ease; }
//     .card:hover { box-shadow: var(--shadow-md); }
//     .btn-primary { background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end)); color: white; padding: 14px 28px; border-radius: 12px; font-weight: 600; transition: all 0.3s ease; cursor: pointer; }
//     .btn-secondary { background: var(--bg-secondary); color: var(--text-primary); padding: 10px 20px; border-radius: 10px; border: 1px solid var(--border-color); font-weight: 600; cursor: pointer; }
//     .section-title { font-size: 20px; font-weight: 700; display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
//     .section-title i { color: var(--accent-primary); }
//     .hidden { display: none !important; }
//     .circular-progress { width: var(--progress-bar-width); height: var(--progress-bar-height); border-radius: 50%; display: flex; justify-content: center; align-items: center; position: relative; }
//     .inner-circle { position: absolute; width: calc(var(--progress-bar-width) - 40px); height: calc(var(--progress-bar-height) - 40px); border-radius: 50%; background: var(--bg-secondary); box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.1); }
//     .percentage { position: relative; font-size: var(--font-size); font-weight: 700; z-index: 1; }
//     input[type="text"] { background: var(--bg-secondary); color: var(--text-primary); border: 2px solid var(--border-color); border-radius: 12px; padding: 14px 20px; width: 100%; }
//     input[type="text"]:focus { outline: none; border-color: var(--accent-primary); }
//     .loader { border: 4px solid var(--border-color); border-top: 4px solid var(--accent-primary); border-radius: 50%; width: 48px; height: 48px; animation: spin 0.8s linear infinite; margin: 0 auto; }
//     @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
//     .gradient-text { background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    
//     .rate-limit-widget {
//       position: fixed; top: 80px; left: 20px;
//       background: var(--glass-bg); backdrop-filter: blur(20px);
//       padding: 12px; border-radius: 12px; border: 1px solid var(--glass-border);
//       box-shadow: var(--shadow-md); z-index: 50; font-size: 0.85rem;
//     }
//     .rate-limit-widget strong { display: block; margin-bottom: 4px; color: var(--accent-primary); }
//   </style>
// </head>
// <body class="min-h-screen flex flex-col items-center p-4 pb-20">

//   <div class="rate-limit-widget" id="rate-limit-widget">
//     <strong><i class="fas fa-chart-line"></i> API Tokens</strong>
//     <div>Used: <span id="rl-used">--</span></div>
//     <div>Remaining: <span id="rl-remaining">--</span></div>
//   </div>

//   <div class="fixed top-5 right-5 z-50 p-2 rounded-full cursor-pointer bg-white/20 backdrop-blur border border-white/30 shadow-lg" id="theme-toggle">
//     <i class="fas fa-sun text-xl" id="theme-icon"></i>
//   </div>

//   <div class="w-full max-w-7xl mt-8">
//     <div class="text-center mb-12">
//       <h1 class="text-5xl font-bold mb-4 gradient-text"><i class="fab fa-github"></i> GitHub Profile Analyzer</h1>
//       <p class="text-lg opacity-80">Analyze your GitHub profile with AI-powered insights</p>
//     </div>
    
//     <div class="mb-8 glassmorphism p-6 max-w-2xl mx-auto">
//       <div class="flex flex-col sm:flex-row gap-4">
//         <input id="username" type="text" placeholder="Enter GitHub username" class="flex-1">
//         <button id="analyze" class="btn-primary whitespace-nowrap"><i class="fas fa-search"></i> Analyze Profile</button>
//       </div>
//     </div>
    
//     <div id="loading" class="hidden glassmorphism p-8 mb-8 max-w-md mx-auto text-center">
//       <div class="loader"></div>
//       <p class="mt-4 font-semibold" id="loading-status">Analyzing your profile...</p>
//     </div>
    
//     <div id="result" class="mt-8 hidden">
//       <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
//         <div id="profile-card" class="lg:col-span-2 card p-6 relative overflow-hidden">
//           <div id="profile-contrib" class="absolute top-0 left-0 w-full h-20 opacity-30 bg-cover bg-center"></div>
//           <div class="relative z-10 flex flex-col sm:flex-row gap-6 mt-4">
//             <img id="profile-avatar" src="" alt="avatar" class="w-24 h-24 rounded-full border-4 border-blue-500 shadow-lg" />
//             <div class="flex-1">
//               <h2 class="text-2xl font-bold" id="profile-username"></h2>
//               <p class="text-lg opacity-80" id="profile-name"></p>
//               <p class="text-sm opacity-60 mb-4" id="profile-bio"></p>
//               <div class="grid grid-cols-2 sm:grid-cols-5 gap-4 text-center">
//                 <div><div class="text-xl font-bold text-blue-500" id="profile-followers">0</div><div class="text-xs uppercase opacity-60">Followers</div></div>
//                 <div><div class="text-xl font-bold text-blue-500" id="profile-following">0</div><div class="text-xs uppercase opacity-60">Following</div></div>
//                 <div><div class="text-xl font-bold text-blue-500" id="profile-repos">0</div><div class="text-xs uppercase opacity-60">Repos</div></div>
//                 <div><div class="text-xl font-bold text-blue-500" id="profile-original-repos">0</div><div class="text-xs uppercase opacity-60">Original</div></div>
//                 <div><div class="text-xl font-bold text-blue-500" id="profile-authored-forks">0</div><div class="text-xs uppercase opacity-60">Contrib</div></div>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         <div class="card p-6 flex flex-col justify-center items-center">
//           <div class="section-title mb-4"><i class="fas fa-trophy"></i><span>Profile Score</span></div>
//           <div class="circular-progress" id="score-progress">
//             <div class="inner-circle"></div>
//             <p class="percentage" id="score-text">0/100</p>
//           </div>
//         </div>
//       </div>

//       <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//         <div class="card p-6">
//           <div class="section-title"><i class="fas fa-brain"></i><span>AI Analysis</span></div>
//           <p id="detailed-analysis" class="opacity-80 leading-relaxed"></p>
//         </div>
//         <div class="card p-6">
//           <div class="section-title"><i class="fas fa-lightbulb"></i><span>Improvement Areas</span></div>
//           <ul id="improvement-areas" class="list-disc list-inside space-y-2 opacity-80"></ul>
//         </div>
//       </div>

//       <div class="card p-6 mb-6">
//         <div class="section-title"><i class="fas fa-laptop-code"></i><span>Top Repositories</span></div>
//         <div id="top-repos-list" class="grid grid-cols-1 md:grid-cols-2 gap-4"></div>
//       </div>

//       <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//         <div class="card p-6">
//           <div class="section-title"><i class="fas fa-code"></i><span>Developer Type</span></div>
//           <p id="developer-type" class="text-lg font-semibold text-blue-500"></p>
//         </div>
//         <div class="card p-6">
//           <div class="section-title"><i class="fas fa-tag"></i><span>Profile Tag</span></div>
//           <div id="tag-section"></div>
//         </div>
//       </div>

//       <div class="card p-6 mb-6">
//         <div class="section-title"><i class="fas fa-rocket"></i><span>AI Suggested Project Ideas</span></div>
//         <div id="project-ideas-list" class="grid gap-4"></div>
//       </div>

//       <div class="card p-6 mb-6">
//         <div class="section-title"><i class="fas fa-medal"></i><span>GitHub Achievements</span></div>
//         <div id="badges" class="flex flex-wrap gap-3"></div>
//       </div>
      
//       <div class="card p-6 mb-6">
//         <div class="section-title"><i class="fas fa-chart-bar"></i><span>Statistics & Graphs</span></div>
//         <div id="graphs" class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 hidden">
//           <img id="stats-graph" class="w-full rounded-lg" alt="stats graph" onerror="this.style.display='none'" />
//           <img id="langs-graph" class="w-full rounded-lg" alt="languages graph" onerror="this.style.display='none'" />
//           <img id="streak-graph-daily" class="w-full rounded-lg" alt="daily streak graph" onerror="this.style.display='none'" />
//           <img id="streak-graph-weekly" class="w-full rounded-lg" alt="weekly streak graph" onerror="this.style.display='none'" />
//           <img id="trophy-graph" class="w-full rounded-lg md:col-span-2" alt="trophy graph" onerror="this.style.display='none'" />
//           <img id="activity-graph" class="w-full rounded-lg md:col-span-2" alt="activity graph" onerror="this.style.display='none'" />
//         </div>
//       </div>
//     </div>
//   </div>

//   <script>
//     function initTheme() {
//       const savedTheme = localStorage.getItem('theme') || 'dark';
//       document.documentElement.setAttribute('data-theme', savedTheme);
//       updateThemeIcon(savedTheme);
//     }
//     function updateThemeIcon(theme) {
//       const icon = document.getElementById('theme-icon');
//       icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
//     }
//     document.getElementById('theme-toggle').addEventListener('click', () => {
//       const current = document.documentElement.getAttribute('data-theme');
//       const next = current === 'dark' ? 'light' : 'dark';
//       document.documentElement.setAttribute('data-theme', next);
//       localStorage.setItem('theme', next);
//       updateThemeIcon(next);
//       const graphs = document.getElementById('graphs');
//       if (!graphs.classList.contains('hidden')) {
//          const username = document.getElementById('username').value.trim();
//          if(username) displayGraphs(username, next);
//       }
//     });
//     initTheme();

//     async function refreshRateLimit() {
//       try {
//         const resp = await fetch('/rate_limit');
//         if (!resp.ok) return;
//         const data = await resp.json();
//         document.getElementById('rl-used').textContent = data.rate.used;
//         document.getElementById('rl-remaining').textContent = data.rate.remaining;
//       } catch (e) {
//         console.error('Rate limit refresh error', e);
//       }
//     }
//     refreshRateLimit();

//     const elements = {
//       username: document.getElementById('username'),
//       analyze: document.getElementById('analyze'),
//       loading: document.getElementById('loading'),
//       result: document.getElementById('result'),
//       profileAvatar: document.getElementById('profile-avatar'),
//       profileUsername: document.getElementById('profile-username'),
//       profileName: document.getElementById('profile-name'),
//       profileBio: document.getElementById('profile-bio'),
//       profileFollowers: document.getElementById('profile-followers'),
//       profileFollowing: document.getElementById('profile-following'),
//       profileRepos: document.getElementById('profile-repos'),
//       profileOriginalRepos: document.getElementById('profile-original-repos'),
//       profileAuthoredForks: document.getElementById('profile-authored-forks'),
//       scoreProgress: document.getElementById('score-progress'),
//       scoreText: document.getElementById('score-text'),
//       detailedAnalysis: document.getElementById('detailed-analysis'),
//       improvementAreas: document.getElementById('improvement-areas'),
//       topReposList: document.getElementById('top-repos-list'),
//       developerType: document.getElementById('developer-type'),
//       tagSection: document.getElementById('tag-section'),
//       projectIdeasList: document.getElementById('project-ideas-list'),
//       badges: document.getElementById('badges'),
//       graphs: document.getElementById('graphs')
//     };

//     elements.analyze.addEventListener('click', async () => {
//       const username = elements.username.value.trim();
//       if(!username) return alert('Please enter a username');
      
//       elements.loading.classList.remove('hidden');
//       elements.result.classList.add('hidden');
//       refreshRateLimit();

//       try {
//         const response = await fetch('/api?username=' + encodeURIComponent(username));
//         const data = await response.json();
        
//         elements.loading.classList.add('hidden');
//         if(response.status !== 200) {
//           alert(data.error || 'Error');
//           return;
//         }
        
//         displayResult(data, username);
//         refreshRateLimit();
//       } catch(e) {
//         elements.loading.classList.add('hidden');
//         alert('Error fetching data');
//       }
//     });

//     function displayGraphs(username, theme) {
//        const userParam = encodeURIComponent(username);
//        const statsBase = 'https://github-readme-stats.vercel.app/api';
//        const streakBase = 'https://streak-stats.demolab.com';
//        const tm = theme === 'dark' ? 'dark' : 'default'; 
       
//        document.getElementById('stats-graph').src = statsBase + '?username=' + userParam + '&theme=' + tm + '&show_icons=true&hide_border=true&include_all_commits=true';
//        document.getElementById('langs-graph').src = statsBase + '/top-langs?username=' + userParam + '&theme=' + tm + '&layout=compact&hide_border=true&langs_count=8';
//        document.getElementById('streak-graph-daily').src = streakBase + '?user=' + userParam + '&theme=' + tm + '&hide_border=true&mode=daily';
//        document.getElementById('streak-graph-weekly').src = streakBase + '?user=' + userParam + '&theme=' + tm + '&hide_border=true&mode=weekly';
//        document.getElementById('trophy-graph').src = 'https://github-profile-trophy.vercel.app/?username=' + userParam + '&theme=' + tm + '&no-frame=true&row=1&column=7&margin-w=15&margin-h=15';
       
//        const activityBg = tm === 'dark' ? '0f172a' : 'ffffff';
//        const activityColor = tm === 'dark' ? 'f8fafc' : '0f172a';
//        const activityLine = '3b82f6';
//        document.getElementById('activity-graph').src = 'https://github-readme-activity-graph.vercel.app/graph?username=' + userParam + '&bg_color=' + activityBg + '&color=' + activityColor + '&line=' + activityLine + '&point=' + activityLine + '&area=true&hide_border=true';
//     }

//     function displayResult(data, username) {
//       elements.result.classList.remove('hidden');
      
//       const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
//       displayGraphs(username, currentTheme);
//       elements.graphs.classList.remove('hidden');
      
//       elements.profileAvatar.src = data.avatar || '';
//       elements.profileUsername.textContent = data.username;
//       elements.profileName.textContent = data.name || '';
//       elements.profileBio.textContent = data.bio || 'No bio';
//       elements.profileFollowers.textContent = data.followers;
//       elements.profileFollowing.textContent = data.following;
//       elements.profileRepos.textContent = data.public_repo_count;
//       elements.profileOriginalRepos.textContent = data.original_repos ? Object.keys(data.original_repos).length : 0;
//       elements.profileAuthoredForks.textContent = data.authored_forks ? Object.keys(data.authored_forks).length : 0;

//       let score = data.score || 0;
//       let start = 0;
//       const interval = setInterval(() => {
//         start++;
//         elements.scoreText.textContent = start + '/100';
//         const color = getComputedStyle(document.documentElement).getPropertyValue('--accent-primary').trim();
//         elements.scoreProgress.style.background = 'conic-gradient(' + color + ' ' + (start * 3.6) + 'deg, transparent 0deg)';
//         if(start >= score) clearInterval(interval);
//       }, 20);

//       if (data.detailed_analysis) elements.detailedAnalysis.textContent = data.detailed_analysis;
//       if (data.improvement_areas) elements.improvementAreas.innerHTML = (data.improvement_areas || []).map(i => '<li>' + i + '</li>').join('');
//       if (data.developer_type) elements.developerType.textContent = data.developer_type;
      
//       elements.topReposList.innerHTML = '';
//       const allRepos = [];
//       if (data.original_repos) Object.entries(data.original_repos).forEach(([name, details]) => allRepos.push({name, ...details, isFork: false}));
//       if (data.authored_forks) Object.entries(data.authored_forks).forEach(([name, details]) => allRepos.push({name, ...details, isFork: true}));
//       allRepos.sort((a, b) => b.stars - a.stars);
      
//       allRepos.slice(0, 6).forEach(repo => {
//         const div = document.createElement('div');
//         div.className = 'p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md transition-shadow cursor-pointer';
//         div.onclick = () => window.open('https://github.com/' + username + '/' + repo.name, '_blank');
//         const tags = (repo.topics || []).slice(0, 3).map(t => '<span class="text-xs px-2 py-1 rounded bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200">' + t + '</span>').join('');
//         div.innerHTML = 
//           '<div class="flex justify-between items-start mb-2">' +
//             '<h4 class="font-bold text-blue-500 truncate">' + (repo.isFork ? '<i class="fas fa-code-branch text-xs mr-1"></i>' : '') + repo.name + '</h4>' +
//             '<div class="flex gap-2 text-sm opacity-60"><span><i class="fas fa-star text-yellow-500"></i> ' + repo.stars + '</span><span><i class="fas fa-code-branch"></i> ' + repo.forks + '</span></div>' +
//           '</div>' +
//           '<p class="text-sm opacity-70 line-clamp-2 mb-3 h-10">' + (repo.description || 'No description') + '</p>' +
//           '<div class="flex flex-wrap gap-2">' + tags + '</div>';
//         elements.topReposList.appendChild(div);
//       });

//       elements.projectIdeasList.innerHTML = '';
//       if(data.project_ideas) {
//         Object.values(data.project_ideas).forEach(idea => {
//           const div = document.createElement('div');
//           div.className = 'p-4 rounded-lg border border-gray-200 dark:border-gray-700';
//           div.innerHTML = '<h4 class="font-bold mb-1 text-blue-500">' + idea.title + '</h4><p class="text-sm opacity-80">' + idea.description + '</p>';
//           elements.projectIdeasList.appendChild(div);
//         });
//       }
      
//       elements.badges.innerHTML = '';
//       const badges = data.badges || {};
//       Object.keys(badges).forEach(slug => {
//         const div = document.createElement('div');
//         div.className = 'text-center';
//         div.innerHTML = '<img src="' + badges[slug] + '" alt="' + slug + '" class="w-16 h-16 rounded-full border-2 hover:scale-110 transition-transform cursor-pointer" style="border-color: var(--border-color);" title="' + slug.replace(/-/g, ' ').toUpperCase() + '" /><p class="text-xs mt-1" style="color: var(--text-tertiary);">' + slug.replace(/-/g, ' ') + '</p>';
//         elements.badges.appendChild(div);
//       });
//     }
//   </script>
// </body>
// </html>`;
// }






const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, HEAD, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export default {
  async fetch(request, env, ctx) {
    // 1. Handle CORS Preflight request from browser
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      // 2. Process the actual request
      const response = await handleRequest(request, env);

      // 3. Clone the response and inject the CORS headers
      const newResponse = new Response(response.body, response);
      for (const [key, value] of Object.entries(corsHeaders)) {
        newResponse.headers.set(key, value);
      }
      return newResponse;

    } catch (e) {
      return new Response(JSON.stringify({ error: e.message }), { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      });
    }
  }
};

const badgeAssets = {
  "pull-shark": "https://github.githubassets.com/assets/pull-shark-default-498c279a747d.png",
  "starstruck": "https://github.githubassets.com/assets/starstruck-default--light-medium-65b31ef2251e.png",
  "pair-extraordinaire": "https://github.githubassets.com/assets/pair-extraordinaire-default-579438a20e01.png",
  "galaxy-brain": "https://github.githubassets.com/assets/galaxy-brain-default-847262c21056.png",
  "yolo": "https://github.githubassets.com/assets/yolo-default-be0bbff04951.png",
  "quickdraw": "https://github.githubassets.com/assets/quickdraw-default--light-medium-5450fadcbe37.png",
  "highlight": "https://github.githubassets.com/assets/highlight-default--light-medium-30e41ef7e6e7.png",
  "community": "https://github.githubassets.com/assets/community-default-4c5bc57b9b55.png",
  "deep-diver": "https://github.githubassets.com/assets/deep-diver-default--light-medium-a7be3c095c3d.png",
  "arctic-code-vault-contributor": "https://github.githubassets.com/assets/arctic-code-vault-contributor-default-f5b6474c6028.png",
  "public-sponsor": "https://github.githubassets.com/assets/public-sponsor-default-4e30fe60271d.png",
  "heart-on-your-sleeve": "https://github.githubassets.com/assets/heart-on-your-sleeve-default-28aa2b2f7ffb.png",
  "open-sourcerer": "https://github.githubassets.com/assets/open-sourcerer-default-64b1f529dcdb.png",
};

// We clear FRONTEND_ORIGIN constraint since we use broad CORS ("*")
const FRONTEND_ORIGIN = "";

async function checkAchievementStatus(username, slug) {
  const url = `https://github.com/${encodeURIComponent(username)}?tab=achievements&achievement=${slug}`;
  try {
    const res = await fetch(url, {
      method: "HEAD",
      headers: { "User-Agent": "Cloudflare-Worker/1.0", Accept: "*/*" },
    });
    return res.status === 200 ? slug : null;
  } catch {
    return null;
  }
}

async function handleRequest(request, env) {
  // Securely load keys from .dev.vars
  const githubTokens = env.GITHUB_TOKENS ? [env.GITHUB_TOKENS] : [];
  const cerebrasKeys = env.CEREBRAS_API_KEY ? [env.CEREBRAS_API_KEY] : [];

  const url = new URL(request.url);
  
  if (url.pathname === "/") {
    return new Response(getFrontendHTML(), {
      headers: { "Content-Type": "text/html" },
    });
  }

  // Rate Limit Endpoint
  if (url.pathname === "/rate_limit") {
    let total = 0, used = 0, remaining = 0;
    const rateLimitUrl = "https://api.github.com/rate_limit";
    for (const token of githubTokens) {
      const headers = {
        Authorization: `token ${token}`,
        "User-Agent": "Cloudflare-Worker",
        Accept: "application/vnd.github.v3+json",
      };
      const resp = await fetch(rateLimitUrl, { headers, cf: { timeout: 60000 } });
      if (!resp.ok) continue;
      const data = await resp.json();
      const r = data.rate;
      total += r.limit;
      used += r.used;
      remaining += r.remaining;
    }
    
    console.log(`💰 [Backend] Rate Limit: ${remaining}/${total} remaining`);
    
    return new Response(
      JSON.stringify({ rate: { limit: total, used: used, remaining: remaining } }),
      { headers: { "Content-Type": "application/json" } }
    );
  }

  if (url.pathname === "/contributions") {
    const username = url.searchParams.get("username");
    if (!username) {
      return new Response(JSON.stringify({ error: "Username parameter is required" }), { status: 400, headers: { "Content-Type": "application/json" } });
    }
    const cacheKey = new Request(request.url, request);
    const cache = caches.default;
    const cached = await cache.match(cacheKey);
    if (cached) return cached;

    const idx = Math.floor(Math.random() * githubTokens.length);
    const token = githubTokens[idx];
    const query = `
      {
        user(login: "${username}") {
          contributionsCollection {
            contributionCalendar {
              weeks {
                contributionDays {
                  date
                  contributionCount
                }
              }
            }
          }
        }
      }
    `;
    const graphResp = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "Cloudflare-Worker",
      },
      body: JSON.stringify({ query }),
    });
    if (!graphResp.ok) {
      const errorText = await graphResp.text();
      return new Response(JSON.stringify({ error: `GitHub API error: ${graphResp.status} - ${errorText}` }), { status: graphResp.status, headers: { "Content-Type": "application/json" } });
    }
    const result = await graphResp.json();
    const weeks = result.data.user.contributionsCollection.contributionCalendar.weeks || [];
    const cellSize = 10, cellMargin = 2, daysCount = 7;
    const width = weeks.length * (cellSize + cellMargin) + cellMargin;
    const height = daysCount * (cellSize + cellMargin) + cellMargin;
    let svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">`;
    svg += '<rect width="100%" height="100%" fill="#1a1a1a"/>';
    const maxContrib = Math.max(1, ...weeks.flatMap((w) => w.contributionDays.map((d) => d.contributionCount)));
    weeks.forEach((week, wi) => {
      week.contributionDays.forEach((day, di) => {
        const x = wi * (cellSize + cellMargin);
        const y = di * (cellSize + cellMargin);
        const intensity = Math.min(day.contributionCount / maxContrib, 1);
        const fill = day.contributionCount === 0 ? "#2f3727" : `rgba(0,255,0,${0.2 + intensity * 0.8})`;
        svg += `<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" fill="${fill}"/>`;
      });
    });
    svg += "</svg>";
    const responseSvg = new Response(svg, {
      headers: { "Content-Type": "image/svg+xml", "Cache-Control": "public, max-age=3600" },
    });
    await cache.put(cacheKey, responseSvg.clone());
    return responseSvg;
  }
  
  // Default API path
  if (url.pathname !== "/api") {
    return new Response(JSON.stringify({ error: "Invalid path" }), { status: 404, headers: { "Content-Type": "application/json" } });
  }

  const username = url.searchParams.get("username");
  if (!username) {
    return new Response(JSON.stringify({ error: "Username parameter is required" }), { status: 400, headers: { "Content-Type": "application/json" } });
  }

  const index = Math.floor(Math.random() * githubTokens.length);
  const token = githubTokens[index];
  const cerebrasIndex = Math.floor(Math.random() * cerebrasKeys.length);
  const cerebrasKey = cerebrasKeys[cerebrasIndex];

  const headers = {
    Authorization: `token ${token}`,
    "User-Agent": "Cloudflare-Worker",
    Accept: "application/vnd.github.v3+json",
  };

  const rateLimitUrl = "https://api.github.com/rate_limit";
  const rateLimitResp = await fetch(rateLimitUrl, { headers, cf: { timeout: 60000 } });
  if (!rateLimitResp.ok) {
    return new Response(JSON.stringify({ error: "Failed to check rate limit" }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
  const rateLimitData = await rateLimitResp.json();
  if (rateLimitData.rate.remaining === 0) {
    return new Response(JSON.stringify({ error: "GitHub API rate limit exceeded" }), { status: 429, headers: { "Content-Type": "application/json" } });
  }
  
  console.log(`🔍 [Analysis] Processing user: ${username} | Tokens: ${rateLimitData.rate.remaining}`);

  const starCheckUrl = `https://api.github.com/repos/0xarchit/github-profile-analyzer/stargazers?per_page=100`;
  let hasStarred = false;

  for (let page = 1; page <= 5; page++) {
    const starredResp = await fetch(`${starCheckUrl}&page=${page}`, { headers, cf: { timeout: 30000 } });
    if (!starredResp.ok) break;
    const stargazers = await starredResp.json();
    if (stargazers.length === 0) break;
    hasStarred = stargazers.some((user) => user.login === username);
    if (hasStarred) break;
  }

  async function userHasCommits(repoName) {
    const commitsUrl = `https://api.github.com/repos/${username}/${repoName}/commits?author=${username}&per_page=1`;
    const commitsResp = await fetch(commitsUrl, { headers, cf: { timeout: 15000 } });
    if (!commitsResp.ok) return false;
    const commitsData = await commitsResp.json();
    return commitsData.length > 0;
  }

  const [userResp, reposResp] = await Promise.all([
    fetch(`https://api.github.com/users/${username}`, { headers, cf: { timeout: 30000 } }),
    fetch(`https://api.github.com/users/${username}/repos?per_page=100&page=1&sort=updated`, { headers, cf: { timeout: 30000 } }),
  ]);

  if (!userResp.ok) return new Response(JSON.stringify({ error: "Failed to fetch user data" }), { status: userResp.status, headers: { "Content-Type": "application/json" } });
  if (!reposResp.ok) return new Response(JSON.stringify({ error: "Failed to fetch repositories" }), { status: reposResp.status, headers: { "Content-Type": "application/json" } });

  const userData = await userResp.json();
  const reposData = await reposResp.json();

  const originalRepos = {};
  const authoredForks = {};
  const forks = [];
  for (const repo of reposData) {
    const repoName = repo.name;
    const isFork = repo.fork || false;
    const repoFields = {
      description: repo.description || null,
      stars: repo.stargazers_count || 0,
      forks: repo.forks_count || 0,
      issues: repo.open_issues || 0,
      watchers: repo.watchers || 0,
      primary_lang: repo.language || null,
      has_issues: repo.has_issues || false,
      has_projects: repo.has_projects || false,
      has_wiki: repo.has_wiki || false,
      has_pages: repo.has_pages || false,
      has_downloads: repo.has_downloads || false,
      has_discussions: repo.has_discussions || false,
      license: repo.license || {},
      topics: repo.topics || [],
    };
    if (!isFork) {
      originalRepos[repoName] = repoFields;
    } else {
      forks.push({ name: repoName, fields: repoFields });
    }
  }

  const BATCH_SIZE = 15;
  const contributedForks = [];
  for (let i = 0; i < forks.length; i += BATCH_SIZE) {
    const batch = forks.slice(i, i + BATCH_SIZE);
    const batchChecks = batch.map(async (fork) => {
      const hasContributed = await userHasCommits(fork.name);
      return hasContributed ? { name: fork.name, fields: fork.fields } : null;
    });
    const batchResults = (await Promise.all(batchChecks)).filter((f) => f !== null);
    contributedForks.push(...batchResults);
  }
  contributedForks.forEach((fork) => {
    authoredForks[fork.name] = fork.fields;
  });

  const profileSummary = {
    avatar: userData.avatar_url || null,
    username: userData.login || null,
    name: userData.name || null,
    company: userData.company || null,
    location: userData.location || null,
    blog: userData.blog || null,
    bio: userData.bio || null,
    email: userData.email || null,
    twitter: userData.twitter_username || null,
    followers: userData.followers || 0,
    following: userData.following || 0,
    public_repo_count: userData.public_repos || 0,
    original_repos: originalRepos,
    authored_forks: authoredForks,
  };

  const slugs = Object.keys(badgeAssets);
  const unlockedBadges = await Promise.all(slugs.map((slug) => checkAchievementStatus(username, slug)));
  const badges = {};
  unlockedBadges.filter(Boolean).forEach((slug) => { badges[slug] = badgeAssets[slug]; });
  profileSummary.badges = badges;

  // ----- CEREBRAS API CALL -----
  console.log("🤖 Sending to Cerebras AI...");
  const cerebrasResponse = await fetch("https://api.cerebras.ai/v1/chat/completions", {
    method: "POST",
    headers: { 
      Authorization: `Bearer ${cerebrasKey}`, 
      "Content-Type": "application/json" 
    },
    body: JSON.stringify({
      model: "llama3.1-8b", 
      messages: [
        {
          role: "system",
          content: `You are the DevPool AI Trust Engine, an elite Senior Engineering Manager and Tech Recruiter. Your task is to deeply analyze this developer's GitHub footprint.

SCORING RUBRIC (Calculate a realistic score from 0 to 100):
- Activity & Consistency (25%): Look at their repo count and recent updates.
- Project Complexity (30%): Look at original repos and the diversity of their languages.
- Community Impact (20%): Look at total stars, watchers, and followers.
- Collaboration (15%): Look at their forks and contributions to other projects.
- Profile Quality (10%): Look at bio, unlocked badges, and completeness.
*Strict Grading:* Average developers score 40-60. Great developers score 65-80. 90+ is reserved for world-class open-source leaders. Do NOT just give everyone an 85.

ANALYSIS GUIDELINES:
- detailed_analysis: Write a punchy, highly insightful 3-4 sentence paragraph. Highlight their actual technical traits, guess their seniority (junior/mid/senior), and note their coding habits based on the data. Avoid generic fluff.
- improvement_areas: Give 3 highly specific, actionable technical tips to improve their portfolio.
- diagnostics: Give 3 data-driven observations (e.g., "Heavy reliance on Python", "High fork-to-original ratio").
- developer_type: Give a creative, accurate title (e.g., "Full-Stack Architect", "Frontend Tinkerer", "Data Science Specialist").

You MUST return ONLY valid JSON matching this exact schema:
{ "score": int, "detailed_analysis": string, "improvement_areas": [string], "diagnostics": [string], "project_ideas": { "idea_1": { "title": str, "description": str, "tech stack": [] }, "idea_2": { "title": str, "description": str, "tech stack": [] }, "idea_3": { "title": str, "description": str, "tech stack": [] } }, "tag": { "tag_name": str, "description": str }, "developer_type": str }`
        },
        { role: "user", content: JSON.stringify(profileSummary) },
      ],
      response_format: { type: "json_object" },
    }),
  });

  if (!cerebrasResponse.ok) {
    const errText = await cerebrasResponse.text();
    console.error("🚨 Cerebras Error:", errText);
    return new Response(JSON.stringify({ error: `AI Failed: ${errText}` }), { status: cerebrasResponse.status, headers: { "Content-Type": "application/json" } });
  }

  const cerebrasData = await cerebrasResponse.json();
  const aiAnalysis = JSON.parse(cerebrasData.choices[0].message.content);
  const responseData = Object.assign({}, profileSummary, aiAnalysis);
  
  return new Response(JSON.stringify(responseData), { headers: { "Content-Type": "application/json" } });
}

function getFrontendHTML() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GitHub Profile Analyzer</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
    * { user-drag: none; -webkit-user-drag: none; user-select: none; -webkit-user-select: none; }
    :root {
      --progress-bar-width: 180px; --progress-bar-height: 180px; --font-size: 1.5rem;
      --bg-primary: #f8fafc; --bg-secondary: #ffffff; --bg-tertiary: #f1f5f9;
      --text-primary: #0f172a; --text-secondary: #475569; --text-tertiary: #64748b;
      --border-color: #e2e8f0; --accent-primary: #3b82f6; --accent-secondary: #8b5cf6;
      --glass-bg: rgba(255, 255, 255, 0.7); --glass-border: rgba(226, 232, 240, 0.8);
      --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.05); --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07);
      --gradient-start: #3b82f6; --gradient-end: #8b5cf6;
    }
    [data-theme="dark"] {
      --bg-primary: #0f172a; --bg-secondary: #1e293b; --bg-tertiary: #334155;
      --text-primary: #f8fafc; --text-secondary: #cbd5e1; --text-tertiary: #94a3b8;
      --border-color: #334155; --accent-primary: #60a5fa; --accent-secondary: #a78bfa;
      --glass-bg: rgba(30, 41, 59, 0.7); --glass-border: rgba(51, 65, 85, 0.8);
    }
    body { background: var(--bg-primary); color: var(--text-primary); transition: background 0.3s ease, color 0.3s ease; font-family: -apple-system, sans-serif; }
    .glassmorphism { background: var(--glass-bg); backdrop-filter: blur(20px); border-radius: 16px; border: 1px solid var(--glass-border); box-shadow: var(--shadow-md); }
    .card { background: var(--bg-secondary); border-radius: 16px; border: 1px solid var(--border-color); box-shadow: var(--shadow-sm); transition: all 0.3s ease; }
    .card:hover { box-shadow: var(--shadow-md); }
    .btn-primary { background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end)); color: white; padding: 14px 28px; border-radius: 12px; font-weight: 600; transition: all 0.3s ease; cursor: pointer; }
    .btn-secondary { background: var(--bg-secondary); color: var(--text-primary); padding: 10px 20px; border-radius: 10px; border: 1px solid var(--border-color); font-weight: 600; cursor: pointer; }
    .section-title { font-size: 20px; font-weight: 700; display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
    .section-title i { color: var(--accent-primary); }
    .hidden { display: none !important; }
    .circular-progress { width: var(--progress-bar-width); height: var(--progress-bar-height); border-radius: 50%; display: flex; justify-content: center; align-items: center; position: relative; }
    .inner-circle { position: absolute; width: calc(var(--progress-bar-width) - 40px); height: calc(var(--progress-bar-height) - 40px); border-radius: 50%; background: var(--bg-secondary); box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.1); }
    .percentage { position: relative; font-size: var(--font-size); font-weight: 700; z-index: 1; }
    input[type="text"] { background: var(--bg-secondary); color: var(--text-primary); border: 2px solid var(--border-color); border-radius: 12px; padding: 14px 20px; width: 100%; }
    input[type="text"]:focus { outline: none; border-color: var(--accent-primary); }
    .loader { border: 4px solid var(--border-color); border-top: 4px solid var(--accent-primary); border-radius: 50%; width: 48px; height: 48px; animation: spin 0.8s linear infinite; margin: 0 auto; }
    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    .gradient-text { background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    
    .rate-limit-widget {
      position: fixed; top: 80px; left: 20px;
      background: var(--glass-bg); backdrop-filter: blur(20px);
      padding: 12px; border-radius: 12px; border: 1px solid var(--glass-border);
      box-shadow: var(--shadow-md); z-index: 50; font-size: 0.85rem;
    }
    .rate-limit-widget strong { display: block; margin-bottom: 4px; color: var(--accent-primary); }
  </style>
</head>
<body class="min-h-screen flex flex-col items-center p-4 pb-20">

  <div class="rate-limit-widget" id="rate-limit-widget">
    <strong><i class="fas fa-chart-line"></i> API Tokens</strong>
    <div>Used: <span id="rl-used">--</span></div>
    <div>Remaining: <span id="rl-remaining">--</span></div>
  </div>

  <div class="fixed top-5 right-5 z-50 p-2 rounded-full cursor-pointer bg-white/20 backdrop-blur border border-white/30 shadow-lg" id="theme-toggle">
    <i class="fas fa-sun text-xl" id="theme-icon"></i>
  </div>

  <div class="w-full max-w-7xl mt-8">
    <div class="text-center mb-12">
      <h1 class="text-5xl font-bold mb-4 gradient-text"><i class="fab fa-github"></i> GitHub Profile Analyzer</h1>
      <p class="text-lg opacity-80">Analyze your GitHub profile with AI-powered insights</p>
    </div>
    
    <div class="mb-8 glassmorphism p-6 max-w-2xl mx-auto">
      <div class="flex flex-col sm:flex-row gap-4">
        <input id="username" type="text" placeholder="Enter GitHub username" class="flex-1">
        <button id="analyze" class="btn-primary whitespace-nowrap"><i class="fas fa-search"></i> Analyze Profile</button>
      </div>
    </div>
    
    <div id="loading" class="hidden glassmorphism p-8 mb-8 max-w-md mx-auto text-center">
      <div class="loader"></div>
      <p class="mt-4 font-semibold" id="loading-status">Analyzing your profile...</p>
    </div>
    
    <div id="result" class="mt-8 hidden">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div id="profile-card" class="lg:col-span-2 card p-6 relative overflow-hidden">
          <div id="profile-contrib" class="absolute top-0 left-0 w-full h-20 opacity-30 bg-cover bg-center"></div>
          <div class="relative z-10 flex flex-col sm:flex-row gap-6 mt-4">
            <img id="profile-avatar" src="" alt="avatar" class="w-24 h-24 rounded-full border-4 border-blue-500 shadow-lg" />
            <div class="flex-1">
              <h2 class="text-2xl font-bold" id="profile-username"></h2>
              <p class="text-lg opacity-80" id="profile-name"></p>
              <p class="text-sm opacity-60 mb-4" id="profile-bio"></p>
              <div class="grid grid-cols-2 sm:grid-cols-5 gap-4 text-center">
                <div><div class="text-xl font-bold text-blue-500" id="profile-followers">0</div><div class="text-xs uppercase opacity-60">Followers</div></div>
                <div><div class="text-xl font-bold text-blue-500" id="profile-following">0</div><div class="text-xs uppercase opacity-60">Following</div></div>
                <div><div class="text-xl font-bold text-blue-500" id="profile-repos">0</div><div class="text-xs uppercase opacity-60">Repos</div></div>
                <div><div class="text-xl font-bold text-blue-500" id="profile-original-repos">0</div><div class="text-xs uppercase opacity-60">Original</div></div>
                <div><div class="text-xl font-bold text-blue-500" id="profile-authored-forks">0</div><div class="text-xs uppercase opacity-60">Contrib</div></div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="card p-6 flex flex-col justify-center items-center">
          <div class="section-title mb-4"><i class="fas fa-trophy"></i><span>Profile Score</span></div>
          <div class="circular-progress" id="score-progress">
            <div class="inner-circle"></div>
            <p class="percentage" id="score-text">0/100</p>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div class="card p-6">
          <div class="section-title"><i class="fas fa-brain"></i><span>AI Analysis</span></div>
          <p id="detailed-analysis" class="opacity-80 leading-relaxed"></p>
        </div>
        <div class="card p-6">
          <div class="section-title"><i class="fas fa-lightbulb"></i><span>Improvement Areas</span></div>
          <ul id="improvement-areas" class="list-disc list-inside space-y-2 opacity-80"></ul>
        </div>
      </div>

      <div class="card p-6 mb-6">
        <div class="section-title"><i class="fas fa-laptop-code"></i><span>Top Repositories</span></div>
        <div id="top-repos-list" class="grid grid-cols-1 md:grid-cols-2 gap-4"></div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div class="card p-6">
          <div class="section-title"><i class="fas fa-code"></i><span>Developer Type</span></div>
          <p id="developer-type" class="text-lg font-semibold text-blue-500"></p>
        </div>
        <div class="card p-6">
          <div class="section-title"><i class="fas fa-tag"></i><span>Profile Tag</span></div>
          <div id="tag-section"></div>
        </div>
      </div>

      <div class="card p-6 mb-6">
        <div class="section-title"><i class="fas fa-rocket"></i><span>AI Suggested Project Ideas</span></div>
        <div id="project-ideas-list" class="grid gap-4"></div>
      </div>

      <div class="card p-6 mb-6">
        <div class="section-title"><i class="fas fa-medal"></i><span>GitHub Achievements</span></div>
        <div id="badges" class="flex flex-wrap gap-3"></div>
      </div>
      
      <div class="card p-6 mb-6">
        <div class="section-title"><i class="fas fa-chart-bar"></i><span>Statistics & Graphs</span></div>
        <div id="graphs" class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 hidden">
          <img id="stats-graph" class="w-full rounded-lg" alt="stats graph" onerror="this.style.display='none'" />
          <img id="langs-graph" class="w-full rounded-lg" alt="languages graph" onerror="this.style.display='none'" />
          <img id="streak-graph-daily" class="w-full rounded-lg" alt="daily streak graph" onerror="this.style.display='none'" />
          <img id="streak-graph-weekly" class="w-full rounded-lg" alt="weekly streak graph" onerror="this.style.display='none'" />
          <img id="trophy-graph" class="w-full rounded-lg md:col-span-2" alt="trophy graph" onerror="this.style.display='none'" />
          <img id="activity-graph" class="w-full rounded-lg md:col-span-2" alt="activity graph" onerror="this.style.display='none'" />
        </div>
      </div>
    </div>
  </div>

  <script>
    function initTheme() {
      const savedTheme = localStorage.getItem('theme') || 'dark';
      document.documentElement.setAttribute('data-theme', savedTheme);
      updateThemeIcon(savedTheme);
    }
    function updateThemeIcon(theme) {
      const icon = document.getElementById('theme-icon');
      icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
    document.getElementById('theme-toggle').addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      updateThemeIcon(next);
      const graphs = document.getElementById('graphs');
      if (!graphs.classList.contains('hidden')) {
         const username = document.getElementById('username').value.trim();
         if(username) displayGraphs(username, next);
      }
    });
    initTheme();

    async function refreshRateLimit() {
      try {
        const resp = await fetch('/rate_limit');
        if (!resp.ok) return;
        const data = await resp.json();
        document.getElementById('rl-used').textContent = data.rate.used;
        document.getElementById('rl-remaining').textContent = data.rate.remaining;
      } catch (e) {
        console.error('Rate limit refresh error', e);
      }
    }
    refreshRateLimit();

    const elements = {
      username: document.getElementById('username'),
      analyze: document.getElementById('analyze'),
      loading: document.getElementById('loading'),
      result: document.getElementById('result'),
      profileAvatar: document.getElementById('profile-avatar'),
      profileUsername: document.getElementById('profile-username'),
      profileName: document.getElementById('profile-name'),
      profileBio: document.getElementById('profile-bio'),
      profileFollowers: document.getElementById('profile-followers'),
      profileFollowing: document.getElementById('profile-following'),
      profileRepos: document.getElementById('profile-repos'),
      profileOriginalRepos: document.getElementById('profile-original-repos'),
      profileAuthoredForks: document.getElementById('profile-authored-forks'),
      scoreProgress: document.getElementById('score-progress'),
      scoreText: document.getElementById('score-text'),
      detailedAnalysis: document.getElementById('detailed-analysis'),
      improvementAreas: document.getElementById('improvement-areas'),
      topReposList: document.getElementById('top-repos-list'),
      developerType: document.getElementById('developer-type'),
      tagSection: document.getElementById('tag-section'),
      projectIdeasList: document.getElementById('project-ideas-list'),
      badges: document.getElementById('badges'),
      graphs: document.getElementById('graphs')
    };

    elements.analyze.addEventListener('click', async () => {
      const username = elements.username.value.trim();
      if(!username) return alert('Please enter a username');
      
      elements.loading.classList.remove('hidden');
      elements.result.classList.add('hidden');
      refreshRateLimit();

      try {
        const response = await fetch('/api?username=' + encodeURIComponent(username));
        const data = await response.json();
        
        elements.loading.classList.add('hidden');
        if(response.status !== 200) {
          alert(data.error || 'Error');
          return;
        }
        
        displayResult(data, username);
        refreshRateLimit();
      } catch(e) {
        elements.loading.classList.add('hidden');
        alert('Error fetching data');
      }
    });

    function displayGraphs(username, theme) {
       const userParam = encodeURIComponent(username);
       const statsBase = 'https://github-readme-stats.vercel.app/api';
       const streakBase = 'https://streak-stats.demolab.com';
       const tm = theme === 'dark' ? 'dark' : 'default'; 
       
       document.getElementById('stats-graph').src = statsBase + '?username=' + userParam + '&theme=' + tm + '&show_icons=true&hide_border=true&include_all_commits=true';
       document.getElementById('langs-graph').src = statsBase + '/top-langs?username=' + userParam + '&theme=' + tm + '&layout=compact&hide_border=true&langs_count=8';
       document.getElementById('streak-graph-daily').src = streakBase + '?user=' + userParam + '&theme=' + tm + '&hide_border=true&mode=daily';
       document.getElementById('streak-graph-weekly').src = streakBase + '?user=' + userParam + '&theme=' + tm + '&hide_border=true&mode=weekly';
       document.getElementById('trophy-graph').src = 'https://github-profile-trophy.vercel.app/?username=' + userParam + '&theme=' + tm + '&no-frame=true&row=1&column=7&margin-w=15&margin-h=15';
       
       const activityBg = tm === 'dark' ? '0f172a' : 'ffffff';
       const activityColor = tm === 'dark' ? 'f8fafc' : '0f172a';
       const activityLine = '3b82f6';
       document.getElementById('activity-graph').src = 'https://github-readme-activity-graph.vercel.app/graph?username=' + userParam + '&bg_color=' + activityBg + '&color=' + activityColor + '&line=' + activityLine + '&point=' + activityLine + '&area=true&hide_border=true';
    }

    function displayResult(data, username) {
      elements.result.classList.remove('hidden');
      
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      displayGraphs(username, currentTheme);
      elements.graphs.classList.remove('hidden');
      
      elements.profileAvatar.src = data.avatar || '';
      elements.profileUsername.textContent = data.username;
      elements.profileName.textContent = data.name || '';
      elements.profileBio.textContent = data.bio || 'No bio';
      elements.profileFollowers.textContent = data.followers;
      elements.profileFollowing.textContent = data.following;
      elements.profileRepos.textContent = data.public_repo_count;
      elements.profileOriginalRepos.textContent = data.original_repos ? Object.keys(data.original_repos).length : 0;
      elements.profileAuthoredForks.textContent = data.authored_forks ? Object.keys(data.authored_forks).length : 0;

      let score = data.score || 0;
      let start = 0;
      const interval = setInterval(() => {
        start++;
        elements.scoreText.textContent = start + '/100';
        const color = getComputedStyle(document.documentElement).getPropertyValue('--accent-primary').trim();
        elements.scoreProgress.style.background = 'conic-gradient(' + color + ' ' + (start * 3.6) + 'deg, transparent 0deg)';
        if(start >= score) clearInterval(interval);
      }, 20);

      if (data.detailed_analysis) elements.detailedAnalysis.textContent = data.detailed_analysis;
      if (data.improvement_areas) elements.improvementAreas.innerHTML = (data.improvement_areas || []).map(i => '<li>' + i + '</li>').join('');
      if (data.developer_type) elements.developerType.textContent = data.developer_type;
      
      elements.topReposList.innerHTML = '';
      const allRepos = [];
      if (data.original_repos) Object.entries(data.original_repos).forEach(([name, details]) => allRepos.push({name, ...details, isFork: false}));
      if (data.authored_forks) Object.entries(data.authored_forks).forEach(([name, details]) => allRepos.push({name, ...details, isFork: true}));
      allRepos.sort((a, b) => b.stars - a.stars);
      
      allRepos.slice(0, 6).forEach(repo => {
        const div = document.createElement('div');
        div.className = 'p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md transition-shadow cursor-pointer';
        div.onclick = () => window.open('https://github.com/' + username + '/' + repo.name, '_blank');
        const tags = (repo.topics || []).slice(0, 3).map(t => '<span class="text-xs px-2 py-1 rounded bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200">' + t + '</span>').join('');
        div.innerHTML = 
          '<div class="flex justify-between items-start mb-2">' +
            '<h4 class="font-bold text-blue-500 truncate">' + (repo.isFork ? '<i class="fas fa-code-branch text-xs mr-1"></i>' : '') + repo.name + '</h4>' +
            '<div class="flex gap-2 text-sm opacity-60"><span><i class="fas fa-star text-yellow-500"></i> ' + repo.stars + '</span><span><i class="fas fa-code-branch"></i> ' + repo.forks + '</span></div>' +
          '</div>' +
          '<p class="text-sm opacity-70 line-clamp-2 mb-3 h-10">' + (repo.description || 'No description') + '</p>' +
          '<div class="flex flex-wrap gap-2">' + tags + '</div>';
        elements.topReposList.appendChild(div);
      });

      elements.projectIdeasList.innerHTML = '';
      if(data.project_ideas) {
        Object.values(data.project_ideas).forEach(idea => {
          const div = document.createElement('div');
          div.className = 'p-4 rounded-lg border border-gray-200 dark:border-gray-700';
          div.innerHTML = '<h4 class="font-bold mb-1 text-blue-500">' + idea.title + '</h4><p class="text-sm opacity-80">' + idea.description + '</p>';
          elements.projectIdeasList.appendChild(div);
        });
      }
      
      elements.badges.innerHTML = '';
      const badges = data.badges || {};
      Object.keys(badges).forEach(slug => {
        const div = document.createElement('div');
        div.className = 'text-center';
        div.innerHTML = '<img src="' + badges[slug] + '" alt="' + slug + '" class="w-16 h-16 rounded-full border-2 hover:scale-110 transition-transform cursor-pointer" style="border-color: var(--border-color);" title="' + slug.replace(/-/g, ' ').toUpperCase() + '" /><p class="text-xs mt-1" style="color: var(--text-tertiary);">' + slug.replace(/-/g, ' ') + '</p>';
        elements.badges.appendChild(div);
      });
    }
  </script>
</body>
</html>`;
}