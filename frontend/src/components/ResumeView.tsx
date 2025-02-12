import getHTML from "../generate-resume";
import { Resume } from "../types";

export default function ResumeView({ resume }: { resume: Resume }) {
    return <>
        <iframe style={{ border: "none" }} src={"data:text/html,"+encodeURIComponent(getHTML(resume, false))}></iframe>
    </>
}
