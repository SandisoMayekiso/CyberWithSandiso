/* =========================================================
   CWS ACADEMY
   CAPSTONE + AUTOMATED GRADING ENGINE
========================================================= */

import { onAuthStateChanged, signOut }
from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";

import { doc, getDoc, setDoc, serverTimestamp }
from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

import { auth, db } from "./firebase-config.js";
import { getCapstone } from "../data/capstones.js";
import { getLearningPath } from "../data/learning-paths.js";
import { getCourse } from "../data/courses.js";
import { getUserEntitlement } from "./access-control.js";

const qs = new URLSearchParams(window.location.search);
const capstoneId = qs.get("capstone") || "junior-pentest-capstone";

const $ = id => document.getElementById(id);

const loading = $("capstoneLoading");
const locked = $("capstoneLocked");
const lockedText = $("capstoneLockedText");
const content = $("capstoneContent");
const studentName = $("studentName");
const logoutBtn = $("logoutBtn");
const titleEl = $("capstoneTitle");
const descriptionEl = $("capstoneDescription");
const clientEl = $("capstoneClient");
const typeEl = $("capstoneType");
const durationEl = $("capstoneDuration");
const scenarioEl = $("capstoneScenario");
const rulesEl = $("capstoneRules");
const inScopeEl = $("inScopeList");
const outScopeEl = $("outScopeList");
const objectivesEl = $("capstoneObjectives");
const tasksEl = $("capstoneTasks");
const progressEl = $("capstoneProgress");
const methodologySummary = $("methodologySummary");
const executiveSummary = $("executiveSummary");
const executiveWordCount = $("executiveWordCount");
const attackSurfaceSummary = $("attackSurfaceSummary");
const findingsContainer = $("findingsContainer");
const addFindingBtn = $("addFindingBtn");
const reportRequirements = $("reportRequirements");
const integrityDeclaration = $("integrityDeclaration");
const rubricScore = $("rubricScore");
const rubricBreakdown = $("rubricBreakdown");
const rubricGateMessage = $("rubricGateMessage");
const saveBtn = $("saveCapstoneBtn");
const submitBtn = $("submitCapstoneBtn");
const messageEl = $("capstoneMessage");

let currentUser = null;
let currentCapstone = null;
let currentProgress = {
    completedTasks: [],
    methodologySummary: "",
    executiveSummary: "",
    attackSurfaceSummary: "",
    findings: [],
    integrityDeclaration: false,
    submitted: false,
    passed: false,
    score: 0
};

function normalize(v){ return String(v||"").trim().toLowerCase(); }
function words(v){ return String(v||"").trim().split(/\s+/).filter(Boolean).length; }
function meaningful(v,n=8){ return words(v)>=n; }

function nameFromUser(user){
    if(user?.displayName?.trim()) return user.displayName.trim();
    if(user?.email?.includes("@")){
        return user.email.split("@")[0]
            .replace(/[._-]+/g," ")
            .replace(/\b\w/g,c=>c.toUpperCase());
    }
    return "Student";
}

function ref(){
    return doc(db,"users",currentUser.uid,"capstones",currentCapstone.id);
}

function message(text,type=""){
    if(!messageEl) return;
    messageEl.hidden=false;
    messageEl.textContent=text;
    messageEl.className=`capstone-form-message ${type}`.trim();
}

function li(items=[]){ return items.map(x=>`<li>${x}</li>`).join(""); }

function esc(v){
    return String(v||"")
        .replaceAll("&","&amp;")
        .replaceAll("<","&lt;")
        .replaceAll(">","&gt;")
        .replaceAll('"',"&quot;");
}

function emptyFinding(){
    return {
        id: globalThis.crypto?.randomUUID?.() || `finding-${Date.now()}-${Math.random()}`,
        title:"", asset:"", severity:"Medium",
        evidence:"", impact:"", remediation:"", retest:""
    };
}

async function courseComplete(courseId){
    const snap=await getDoc(doc(db,"users",currentUser.uid,"courseProgress",courseId));
    if(!snap.exists()) return false;
    const d=snap.data()||{};
    return d.completed===true || d.certificateEligible===true || Number(d.progressPercent||0)>=100;
}

async function eligibility(){
    const path=getLearningPath(currentCapstone.pathId);
    if(!path) return {allowed:false,missing:["Required learning path"]};

    const required=path.stages.filter(x=>x.type==="course" && x.required!==false);
    const checked=await Promise.all(required.map(async x=>({
        id:x.courseId,
        done:await courseComplete(x.courseId)
    })));

    const missing=checked.filter(x=>!x.done).map(x=>getCourse(x.id)?.title||x.id);
    return {allowed:missing.length===0,missing};
}

async function loadSaved(){
    const snap=await getDoc(ref());
    if(!snap.exists()) return;
    currentProgress={...currentProgress,...(snap.data()||{})};
    if(!Array.isArray(currentProgress.findings)) currentProgress.findings=[];
}

function collectFindings(){
    return [...document.querySelectorAll(".capstone-finding")].map(card=>({
        id:card.dataset.findingId,
        title:card.querySelector('[data-field="title"]')?.value?.trim()||"",
        asset:card.querySelector('[data-field="asset"]')?.value?.trim()||"",
        severity:card.querySelector('[data-field="severity"]')?.value||"Medium",
        evidence:card.querySelector('[data-field="evidence"]')?.value?.trim()||"",
        impact:card.querySelector('[data-field="impact"]')?.value?.trim()||"",
        remediation:card.querySelector('[data-field="remediation"]')?.value?.trim()||"",
        retest:card.querySelector('[data-field="retest"]')?.value?.trim()||""
    }));
}

function formState(){
    return {
        completedTasks:[...document.querySelectorAll(".capstone-task-checkbox:checked")].map(x=>x.dataset.taskId),
        methodologySummary:methodologySummary?.value?.trim()||"",
        executiveSummary:executiveSummary?.value?.trim()||"",
        attackSurfaceSummary:attackSurfaceSummary?.value?.trim()||"",
        findings:collectFindings(),
        integrityDeclaration:integrityDeclaration?.checked===true
    };
}

function grade(){
    const s=formState();
    const r=currentCapstone.gradingRubric;
    const w=r.weights, g=r.mandatoryGates;

    const requiredTasks=currentCapstone.tasks.filter(x=>x.required!==false);
    const completed=requiredTasks.filter(x=>s.completedTasks.includes(x.id));

    const completeTechnical=s.findings.filter(f=>
        meaningful(f.title,2) &&
        meaningful(f.asset,1) &&
        meaningful(f.evidence,8) &&
        meaningful(f.impact,12)
    );

    const completeRemediation=s.findings.filter(f=>
        meaningful(f.remediation,12) &&
        meaningful(f.retest,8)
    );

    const evidenceCount=s.findings.filter(f=>meaningful(f.evidence,8)).length;
    const executiveWords=words(s.executiveSummary);

    const breakdown={
        taskCompletion:Math.round(w.taskCompletion*(requiredTasks.length?completed.length/requiredTasks.length:1)),
        evidenceQuality:Math.round(w.evidenceQuality*Math.min(1,evidenceCount/Math.max(1,g.minimumFindings))),
        methodology:Math.round(w.methodology*([meaningful(s.methodologySummary,25),meaningful(s.attackSurfaceSummary,20)].filter(Boolean).length/2)),
        executiveSummary:Math.round(w.executiveSummary*Math.min(1,executiveWords/g.minimumExecutiveSummaryWords)),
        technicalFindings:Math.round(w.technicalFindings*Math.min(1,completeTechnical.length/g.minimumFindings)),
        remediationAndRetest:Math.round(w.remediationAndRetest*Math.min(1,completeRemediation.length/g.minimumFindings)),
        professionalCompleteness:Math.round(w.professionalCompleteness*([
            s.integrityDeclaration,
            s.findings.length>=g.minimumFindings,
            meaningful(s.methodologySummary,10),
            meaningful(s.attackSurfaceSummary,10)
        ].filter(Boolean).length/4))
    };

    const score=Object.values(breakdown).reduce((a,b)=>a+b,0);

    const gates={
        allTasks:!g.requireAllTasks || completed.length===requiredTasks.length,
        minimumFindings:completeTechnical.length>=g.minimumFindings,
        executiveSummary:executiveWords>=g.minimumExecutiveSummaryWords,
        evidence:!g.requireEvidenceForFindings || evidenceCount>=g.minimumFindings,
        remediation:!g.requireRemediationForFindings || completeRemediation.length>=g.minimumFindings,
        retest:!g.requireRetestForFindings || completeRemediation.length>=g.minimumFindings,
        integrity:!g.requireAcademicIntegrityDeclaration || s.integrityDeclaration
    };

    const allGatesPassed=Object.values(gates).every(Boolean);

    return {
        score,
        passingScore:r.passingScore,
        passed:allGatesPassed && score>=r.passingScore,
        allGatesPassed,
        gateResults:gates,
        breakdown,
        metrics:{
            completedRequiredTasks:completed.length,
            requiredTasks:requiredTasks.length,
            completeTechnicalFindings:completeTechnical.length,
            requiredFindings:g.minimumFindings,
            executiveWords
        }
    };
}

function renderRubric(){
    if(!currentCapstone) return;
    const x=grade();
    rubricScore.textContent=`${x.score}%`;

    const labels={
        taskCompletion:"Task completion",
        evidenceQuality:"Evidence quality",
        methodology:"Scope & methodology",
        executiveSummary:"Executive summary",
        technicalFindings:"Technical findings",
        remediationAndRetest:"Remediation & retest",
        professionalCompleteness:"Professional completeness"
    };

    rubricBreakdown.innerHTML=Object.entries(x.breakdown).map(([k,v])=>{
        const max=currentCapstone.gradingRubric.weights[k];
        return `<div class="rubric-row ${v>=max?"complete":""}">
            <span>${labels[k]}</span><strong>${v}/${max}</strong>
        </div>`;
    }).join("");

    executiveWordCount.textContent=
        `${x.metrics.executiveWords} words • minimum ${currentCapstone.gradingRubric.mandatoryGates.minimumExecutiveSummaryWords}`;

    if(x.passed){
        rubricGateMessage.textContent=
            `Ready to pass • ${x.score}% meets the ${x.passingScore}% standard and all mandatory gates are satisfied.`;
        rubricGateMessage.className="rubric-gate-message ready";
    } else if(x.score>=x.passingScore && !x.allGatesPassed){
        rubricGateMessage.textContent=
            "The score threshold is met, but one or more mandatory submission requirements are incomplete.";
        rubricGateMessage.className="rubric-gate-message";
    } else {
        rubricGateMessage.textContent=
            `Current readiness: ${x.score}% • ${x.passingScore}% required plus all mandatory gates.`;
        rubricGateMessage.className="rubric-gate-message";
    }
    return x;
}

function renumber(){
    [...document.querySelectorAll(".capstone-finding")].forEach((card,i)=>{
        const h=card.querySelector(".capstone-finding-header strong");
        if(h) h.textContent=`Finding ${String(i+1).padStart(2,"0")}`;
    });
}

function renderFindings(){
    findingsContainer.innerHTML="";
    const findings=currentProgress.findings.length
        ? currentProgress.findings
        : [emptyFinding(),emptyFinding()];

    findings.forEach(f=>{
        const card=document.createElement("article");
        card.className="capstone-finding";
        card.dataset.findingId=f.id;

        card.innerHTML=`
            <div class="capstone-finding-header">
                <strong>Finding</strong>
                <button type="button" class="remove-finding-btn" title="Remove finding">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
            <div class="finding-grid">
                <div class="finding-field">
                    <label>Finding Title</label>
                    <input data-field="title" value="${esc(f.title)}">
                </div>
                <div class="finding-field">
                    <label>Affected Asset / Endpoint</label>
                    <input data-field="asset" value="${esc(f.asset)}">
                </div>
                <div class="finding-field">
                    <label>Severity</label>
                    <select data-field="severity">
                        ${["Informational","Low","Medium","High","Critical"].map(v=>`<option ${f.severity===v?"selected":""}>${v}</option>`).join("")}
                    </select>
                </div>
                <div class="finding-field full">
                    <label>Evidence / Validation</label>
                    <textarea data-field="evidence" rows="4">${esc(f.evidence)}</textarea>
                </div>
                <div class="finding-field full">
                    <label>Security / Business Impact</label>
                    <textarea data-field="impact" rows="4">${esc(f.impact)}</textarea>
                </div>
                <div class="finding-field full">
                    <label>Remediation</label>
                    <textarea data-field="remediation" rows="4">${esc(f.remediation)}</textarea>
                </div>
                <div class="finding-field full">
                    <label>Retest Plan</label>
                    <textarea data-field="retest" rows="3">${esc(f.retest)}</textarea>
                </div>
            </div>`;

        findingsContainer.appendChild(card);

        card.querySelector(".remove-finding-btn").addEventListener("click",()=>{
            card.remove(); renumber(); renderRubric();
        });

        card.querySelectorAll("input,textarea,select").forEach(el=>
            el.addEventListener("input",renderRubric)
        );
    });

    renumber();
}

function addFinding(){
    currentProgress.findings=collectFindings();
    currentProgress.findings.push(emptyFinding());
    renderFindings();
    renderRubric();
}

async function save(extra={}){
    const state=formState();
    const grading=grade();

    currentProgress={
        ...currentProgress,
        ...state,
        ...extra,
        score:grading.score,
        grading
    };

    await setDoc(ref(),{
        ...currentProgress,
        updatedAt:serverTimestamp()
    },{merge:true});

    updateTaskProgress();
    renderRubric();
}

function updateTaskProgress(){
    const total=currentCapstone.tasks.length;
    const done=document.querySelectorAll(".capstone-task-checkbox:checked").length;
    progressEl.textContent=`${total?Math.round(done/total*100):0}%`;

    document.querySelectorAll(".capstone-task").forEach(row=>{
        row.classList.toggle("completed",
            row.querySelector(".capstone-task-checkbox")?.checked===true
        );
    });

    renderRubric();
}

function render(){
    titleEl.textContent=currentCapstone.title;
    descriptionEl.textContent=currentCapstone.description;
    clientEl.textContent=currentCapstone.client;
    typeEl.textContent=currentCapstone.engagementType;
    durationEl.textContent=currentCapstone.duration;
    scenarioEl.textContent=currentCapstone.scenario;
    rulesEl.innerHTML=li(currentCapstone.rulesOfEngagement);
    inScopeEl.innerHTML=li(currentCapstone.scope.inScope);
    outScopeEl.innerHTML=li(currentCapstone.scope.outOfScope);
    reportRequirements.innerHTML=li(currentCapstone.reportRequirements);

    objectivesEl.innerHTML=currentCapstone.objectives.map((o,i)=>`
        <article class="objective-card">
            <span class="objective-number">OBJECTIVE ${String(i+1).padStart(2,"0")}</span>
            <h3>${o.title}</h3><p>${o.description}</p>
        </article>`).join("");

    tasksEl.innerHTML=currentCapstone.tasks.map(t=>`
        <label class="capstone-task">
            <input type="checkbox" class="capstone-task-checkbox"
                data-task-id="${t.id}" ${currentProgress.completedTasks?.includes(t.id)?"checked":""}>
            <div><h3>${t.title}</h3><span>${t.category}</span></div>
            <span class="evidence-badge ${t.evidenceRequired?"required":""}">
                ${t.evidenceRequired?"Evidence Required":"Required"}
            </span>
        </label>`).join("");

    methodologySummary.value=currentProgress.methodologySummary||"";
    executiveSummary.value=currentProgress.executiveSummary||"";
    attackSurfaceSummary.value=currentProgress.attackSurfaceSummary||"";
    integrityDeclaration.checked=currentProgress.integrityDeclaration===true;

    renderFindings();

    document.querySelectorAll(".capstone-task-checkbox").forEach(x=>
        x.addEventListener("change",updateTaskProgress)
    );

    [methodologySummary,executiveSummary,attackSurfaceSummary,integrityDeclaration]
        .filter(Boolean).forEach(x=>x.addEventListener("input",renderRubric));

    updateTaskProgress();
}

async function submit(){
    const x=grade();

    if(!x.allGatesPassed){
        message("Submission blocked: complete all mandatory requirements shown in the grading panel.","error");
        return;
    }

    if(x.score<x.passingScore){
        message(`Current score is ${x.score}%. Improve the report to reach ${x.passingScore}%.`,"error");
        return;
    }

    await save({
        submitted:true,
        submittedAt:new Date().toISOString(),
        passed:true,
        passedAt:new Date().toISOString(),
        score:x.score,
        grading:x,
        reviewStatus:"auto-passed"
    });

    message(`Capstone passed with ${x.score}%. Your career-path credential is now eligible to unlock.`,"success");
    submitBtn.innerHTML='<i class="fa-solid fa-circle-check"></i> Capstone Passed';
    submitBtn.disabled=true;
}

addFindingBtn?.addEventListener("click",addFinding);

saveBtn?.addEventListener("click",async()=>{
    try { await save(); message("Capstone progress saved.","success"); }
    catch(e){ console.error(e); message("Unable to save capstone progress.","error"); }
});

submitBtn?.addEventListener("click",async()=>{
    try { await submit(); }
    catch(e){ console.error(e); message("Unable to submit the capstone.","error"); }
});

logoutBtn?.addEventListener("click",async()=>{
    await signOut(auth);
    window.location.replace("../pages/login.html");
});

if(!auth){
    window.location.replace("../pages/login.html");
}else{
    onAuthStateChanged(auth,async user=>{
        if(!user){
            window.location.replace("../pages/login.html");
            return;
        }

        currentUser=user;
        if(studentName) studentName.textContent=nameFromUser(user);

        currentCapstone=getCapstone(capstoneId);

        if(!currentCapstone){
            loading.textContent="Capstone not found.";
            return;
        }

        const entitlement=await getUserEntitlement(user);
        const pro=normalize(entitlement?.plan)==="pro" &&
            ["active","trialing"].includes(normalize(entitlement?.status));

        if(currentCapstone.access==="pro" && !pro){
            loading.hidden=true;
            locked.hidden=false;
            lockedText.textContent=
                "This capstone is part of CWS Pro. Upgrade your account before starting the professional path capstone.";
            return;
        }

        const access=await eligibility();

        if(!access.allowed){
            loading.hidden=true;
            locked.hidden=false;
            lockedText.textContent=
                `Complete these required courses first: ${access.missing.join(", ")}.`;
            return;
        }

        await loadSaved();
        render();

        if(currentProgress.passed===true){
            submitBtn.innerHTML='<i class="fa-solid fa-circle-check"></i> Capstone Passed';
            submitBtn.disabled=true;
        }

        loading.hidden=true;
        content.hidden=false;
    });
}
