import { onAuthStateChanged, signOut }
from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";
import { doc, getDoc, setDoc, serverTimestamp }
from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";
import { auth, db } from "./firebase-config.js";
import { getLearningPath } from "../data/learning-paths.js";
import { getCourse } from "../data/courses.js";

const q=new URLSearchParams(location.search);
const pathId=q.get("path")||"junior-penetration-tester";
const $=id=>document.getElementById(id);

const loading=$("certificateLoading"), locked=$("certificateLocked"),
lockedText=$("certificateLockedText"), content=$("certificateContent"),
studentName=$("studentName"), logoutBtn=$("logoutBtn"),
certificateStudent=$("certificateStudent"), certificatePath=$("certificatePath"),
certificateDescription=$("certificateDescription"), certificateScore=$("certificateScore"),
certificateDate=$("certificateDate"), certificateCredential=$("certificateCredential"),
certificatePathBadge=$("certificatePathBadge"), printBtn=$("printCertificateBtn"),
copyBtn=$("copyCredentialBtn");

let currentUser=null,currentPath=null,currentCredential=null;

function userName(u){
    if(u?.displayName?.trim()) return u.displayName.trim();
    if(u?.email?.includes("@")) return u.email.split("@")[0].replace(/[._-]+/g," ").replace(/\b\w/g,c=>c.toUpperCase());
    return "Student";
}

function formatDate(v){
    return new Date(v).toLocaleDateString(undefined,{year:"numeric",month:"long",day:"numeric"});
}

function credentialId(path){
    const prefix=path.id.split("-").map(x=>x[0]?.toUpperCase()||"").join("").slice(0,5);
    const d=new Date();
    const date=`${d.getFullYear()}${String(d.getMonth()+1).padStart(2,"0")}${String(d.getDate()).padStart(2,"0")}`;
    const rand=Math.random().toString(36).slice(2,8).toUpperCase();
    return `CWS-${prefix}-${date}-${rand}`;
}

async function courseComplete(id){
    const s=await getDoc(doc(db,"users",currentUser.uid,"courseProgress",id));
    if(!s.exists()) return false;
    const x=s.data()||{};
    return x.completed===true||x.certificateEligible===true||Number(x.progressPercent||0)>=100;
}

async function verify(){
    const courses=currentPath.stages.filter(s=>s.type==="course"&&s.required!==false);
    const checks=await Promise.all(courses.map(async s=>({id:s.courseId,done:await courseComplete(s.courseId)})));
    const missing=checks.filter(x=>!x.done).map(x=>getCourse(x.id)?.title||x.id);

    const cap=currentPath.stages.find(s=>s.type==="capstone");
    let capData=null;
    if(cap?.capstoneId){
        const s=await getDoc(doc(db,"users",currentUser.uid,"capstones",cap.capstoneId));
        if(s.exists()) capData=s.data()||null;
    }

    return {
        allowed:missing.length===0 && (!cap || capData?.passed===true),
        missing,
        capstonePassed:!cap||capData?.passed===true,
        capstone:capData
    };
}

async function getOrCreate(result){
    const ref=doc(db,"users",currentUser.uid,"careerPathCertificates",currentPath.id);
    const s=await getDoc(ref);
    if(s.exists()) return s.data();

    const now=new Date().toISOString();
    const c={
        pathId:currentPath.id,
        pathTitle:currentPath.title,
        credentialTitle:currentPath.credentialTitle||`CWS ${currentPath.title} Path Certificate`,
        credentialId:credentialId(currentPath),
        issuedAt:now,
        capstoneScore:Number(result.capstone?.score||0),
        status:"verified"
    };

    await setDoc(ref,{...c,createdAt:serverTimestamp(),updatedAt:serverTimestamp()},{merge:true});
    return c;
}

function render(c){
    const n=userName(currentUser);
    if(studentName) studentName.textContent=n;
    certificateStudent.textContent=n;
    certificatePath.textContent=`${currentPath.title} Path`;
    certificateDescription.textContent=currentPath.description;
    certificateScore.textContent=c.capstoneScore?`${c.capstoneScore}%`:"Completed";
    certificateDate.textContent=formatDate(c.issuedAt);
    certificateCredential.textContent=c.credentialId;
    certificatePathBadge.textContent=(currentPath.shortTitle||currentPath.title).toUpperCase();
    currentCredential=c;
    loading.hidden=true;
    content.hidden=false;
}

printBtn?.addEventListener("click",()=>window.print());

copyBtn?.addEventListener("click",async()=>{
    if(!currentCredential?.credentialId) return;
    try{
        await navigator.clipboard.writeText(currentCredential.credentialId);
        copyBtn.innerHTML='<i class="fa-solid fa-circle-check"></i> Copied';
        setTimeout(()=>copyBtn.innerHTML='<i class="fa-solid fa-copy"></i> Copy Credential ID',1800);
    }catch{
        window.prompt("Copy credential ID:",currentCredential.credentialId);
    }
});

logoutBtn?.addEventListener("click",async()=>{
    await signOut(auth);
    location.replace("../pages/login.html");
});

if(!auth){
    location.replace("../pages/login.html");
}else{
    onAuthStateChanged(auth,async user=>{
        if(!user){ location.replace("../pages/login.html"); return; }
        currentUser=user;
        currentPath=getLearningPath(pathId);

        if(!currentPath){
            loading.hidden=true; locked.hidden=false;
            lockedText.textContent="This CWS learning path could not be found.";
            return;
        }

        try{
            const result=await verify();

            if(!result.allowed){
                loading.hidden=true; locked.hidden=false;
                lockedText.textContent=result.missing.length
                    ? `Complete these required courses first: ${result.missing.join(", ")}.`
                    : "Pass the required career-path capstone before this certificate can be issued.";
                return;
            }

            render(await getOrCreate(result));
        }catch(e){
            console.error(e);
            loading.hidden=true; locked.hidden=false;
            lockedText.textContent="The career-path credential could not be verified at this time.";
        }
    });
}
