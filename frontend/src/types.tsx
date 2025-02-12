import { Updater } from "use-immer";

export interface Resume {
    name: string;
    order: Detail[];
    links: Link[];
    skills: Skill[];
    experience: Experience[];
    projects: Project[];
    education: Education[];
    id: string;
}

export interface Link {
    hidden: boolean;
    display: string;
    link: string;
    noMd: boolean;
    id: string;
}

export interface Detail {
    str: string;
    hidden: boolean;
    id: string;
}

export interface Skill {
    title: string;
    list: Detail[];
    id: string;
    hidden: boolean;
}

export interface Experience {
    company: string;
    position: string;
    details: Detail[];
    location: string;
    date: string;
    id: string;
    hidden: boolean;
}

export interface Project {
    hidden: boolean;
    title: string;
    details: Detail[];
    id: string;
}

export interface Education {
    school: string;
    degree: string;
    details: Detail[];
    location: string;
    date: string;
    id: string;
    hidden: boolean;
}

const resume = {
    name: "Alan Turing",
    order: [
        { str: "Header" }, 
        { str: "Skills" }, 
        { str: "Experience" }, 
        { str: "Projects" }, 
        { str: "Education" }
    ],
    links: [
        {
            hidden: false,
            noMd: true,
            display: "Email",
            link: "mailto:alan.turing@cam.ac.uk",
        },
        {
            hidden: false,
            noMd: true,
            display: "Website",
            link: "https://turingarchive.org",
        },
        {
            hidden: false,
            noMd: true,
            display: "Publications",
            link: "https://www.turing.org.uk/publications.html",
        }
    ],
    skills: [
        {
            title: "**Mathematics & Computation**",
            list: [
                { str: "Cryptanalysis" },
                { str: "Computability Theory" },
                { str: "Numerical Analysis" },
                { str: "Mathematical Logic" },
                { str: "Statistics" },
                { str: "Formal Methods" },
            ],
        },
        {
            title: "**Programming & Engineering**",
            list: [
                { str: "Turing Machine" },
                { str: "Automated Computation" },
                { str: "Algorithm Design" },
                { str: "Artificial Intelligence" },
                { str: "Cybersecurity" },
                { str: "Machine Learning Foundations" },
            ],
        },
    ],
    experience: [
        {
            company: "Government Code and Cypher School (Bletchley Park)",
            position: "Cryptanalyst & Mathematician",
            details: [
                {
                    str: "Designed the **Bombe machine**, automating decryption of **Enigma-encrypted** messages and accelerating Allied intelligence operations.",
                },
                {
                    str: "Developed novel cryptographic techniques, including **Banburismus**, significantly reducing decryption time for wartime communications.",
                },
                {
                    str: "Led a team of codebreakers at **Hut 8**, directly influencing strategic wartime efforts by breaking German naval codes.",
                },
            ],
            location: "Bletchley Park, UK",
            date: "1939 - 1945",
        },
        {
            company: "University of Manchester",
            position: "Professor of Mathematics & Computing",
            details: [
                {
                    str: "Developed the **Automatic Computing Engine (ACE)**, one of the world's first stored-program computers.",
                },
                {
                    str: "Pioneered concepts in **artificial intelligence**, proposing the **Turing Test** for machine intelligence.",
                },
                {
                    str: "Researched **morphogenesis**, modeling biological pattern formation using mathematical principles.",
                },
            ],
            location: "Manchester, UK",
            date: "1948 - 1954",
        },
    ],
    projects: [
        {
            title: "Turing Machine | Computability Theory, Algorithm Design",
            details: [
                {
                    str: "Formalized the concept of computation with the **Turing Machine**, establishing the foundation of theoretical computer science.",
                },
                {
                    str: "Proved the **Church-Turing thesis**, demonstrating that any computable function can be executed by a Turing machine.",
                },
            ],
        },
        {
            title: "Artificial Intelligence | Machine Learning, Philosophy of Mind",
            details: [
                {
                    str: "Proposed the **Turing Test**, a criterion for evaluating machine intelligence based on human-like conversation.",
                },
                {
                    str: "Researched early neural networks and machine learning concepts, influencing the development of modern AI.",
                },
            ],
        },
    ],
    education: [
        {
            school: "University of Cambridge",
            degree: "Mathematics, PhD Equivalent",
            details: [
                {
                    str: "Conducted groundbreaking research in **computability theory** and **formal logic**.",
                },
                {
                    str: "Authored seminal work **'On Computable Numbers' (1936)**, proving the limits of mechanical computation.",
                },
            ],
            location: "Cambridge, UK",
            date: "1931 - 1934",
        },
        {
            school: "Princeton University",
            degree: "PhD in Mathematics",
            details: [
                {
                    str: "Studied under **Alonzo Church**, contributing to lambda calculus and formalizing computational theory.",
                },
                {
                    str: "Developed techniques in **cryptographic analysis** and **mathematical logic**.",
                },
            ],
            location: "Princeton, USA",
            date: "1936 - 1938",
        },
    ],
};



// eslint-disable-next-line @typescript-eslint/no-explicit-any
function assignUUID(obj: any): unknown {
    if (Array.isArray(obj)) {
        return obj.map((item) => assignUUID(item));
    } else if (typeof obj === "object" && obj !== null) {
        const newObj = { ...obj };
        if (!Object.prototype.hasOwnProperty.call(newObj, "id")) {
            newObj.id = crypto.randomUUID();
        }
        if (!Object.prototype.hasOwnProperty.call(newObj, "hidden")) {
            newObj.hidden = false;
        }
        Object.keys(newObj).forEach((key) => {
            newObj[key] = assignUUID(newObj[key]);
        });
        return newObj;
    }
    return obj;
}

export type ResumeUpdater = Updater<Resume>;

const resumeWithUUID = assignUUID(resume) as Resume;
console.log(resumeWithUUID)
export default resumeWithUUID as Resume;
