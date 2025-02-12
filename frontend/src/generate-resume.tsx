import { Liquid } from "liquidjs"
import { Marked } from "marked";
import { Resume } from "./types";
import clean from "./templates/clean";
// import parse from "html-react-parser";

const marked = new Marked();
const engine = new Liquid();

function deepCopyAndModifyStrings(obj: object | string, modifyFn: (a: string) => string) : object | string {
    if (typeof obj === 'string') {
        return modifyFn(obj);
    } else if (Array.isArray(obj)) {
        return obj.map(item => deepCopyAndModifyStrings(item, modifyFn));
    } else if (obj !== null && typeof obj === 'object' && !Object.keys(obj).includes("noMd")) {
        return Object.fromEntries(
            Object.entries(obj).map(([key, value]) => [key, deepCopyAndModifyStrings(value, modifyFn)])
        );
    }
    return obj;
}

const parseMd = (resume: Resume) : Resume => {
    const p = (s: string) => marked.parseInline(s).toString();
    return deepCopyAndModifyStrings(resume, p) as Resume
}

const getHTML = (resume: Resume, shouldPrint: boolean, specifier?: string) => {
    const result = engine.parseAndRenderSync(clean, {
        data: parseMd(resume),
        specifier,
        border: !shouldPrint
    })

    const parser = new DOMParser();
    const doc = parser.parseFromString(result, "text/html");
    const container = doc.body;
    
    const sections: string[] = [];
    resume.order.forEach(id => {
      const section = container.querySelector(`#${id.str}`);
      if (section && !id.hidden) sections.push(section.outerHTML);
    });

    doc.body.innerHTML = sections.join("\n")

    if (shouldPrint) {
        doc.body.innerHTML += `<script>window.onload = function() { window.print(); }; window.onafterprint = function() { window.close(); }</script>`
        // doc.body.onload = () => console.log("Test")
    }
    
    return doc.querySelector("html")!.outerHTML;
}
export default getHTML;