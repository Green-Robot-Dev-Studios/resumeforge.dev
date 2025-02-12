import { useImmer } from "use-immer";
import "./App.css";
import Configure from "./components/Configure";
import defaultResume, { ResumeUpdater } from "./types";
import { useEffect, useState } from "react";
import { Dialog, DialogHeader } from "./components/ui/dialog";
import {
    DialogContent,
    DialogDescription,
    DialogTitle,
} from "./components/ui/dialog";
import { Textarea } from "./components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import { Button } from "./components/ui/button";
import ResumeView from "./components/ResumeView";
import { TfIdf } from "natural/lib/natural/tfidf";
import commonTerms from "./common-terms";
import getHTML from "./generate-resume";

const tailorResume = (setResume: ResumeUpdater, description: string) => {
    const s = new TfIdf();

    console.log(description.split(/[ ,/]+/));
    const parsed = description
        .split(/[ ,/]+/)
        .flatMap((t) => {
            return t.toLowerCase() in commonTerms
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ? [t, (commonTerms as any)[t.toLowerCase()].TargetTagName]
                : [t];
        })
        .join(" ");
    console.log(parsed);
    s.addDocument(parsed);

    setResume((r) => {
        r.skills.forEach((category) => {
            console.log(category.title);
            category.list.forEach((skill) => {
                // const max_score = Math.max(
                //     s.tfidf(skill.str.toLowerCase(), 0),

                //     !Object.keys(commonTerms).includes(skill.str.toLowerCase())
                //         ? s.tfidf(skill.str, 0)
                //         // eslint-disable-next-line @typescript-eslint/no-explicit-any
                //         : s.tfidf((commonTerms as any)[skill.str.toLowerCase()].TargetTagName, 0),

                // );
                console.log(
                    skill.str,
                    Math.max(
                        s.tfidf(skill.str.toLowerCase().split(/[ ,/()]+/), 0)
                    )
                );
            });
        });
    });
    console.groupEnd();

    // setDone();
};

const initialResume =
    JSON.parse(localStorage.getItem("resume") as string) || defaultResume;

function App() {
    useEffect(() => {
        const unloadCallback = (event: BeforeUnloadEvent) => {
            event.preventDefault();
            return "";
        };

        window.addEventListener("beforeunload", unloadCallback);
        return () => window.removeEventListener("beforeunload", unloadCallback);
    }, []);

    const [resume, setResume] = useImmer(initialResume);

    const [tailorPopup, setTailorPopup] = useState(false);
    const [description, setDescription] = useState("");
    const print = () => {
        const html = getHTML(resume, true, prompt("Enter a specifier") || "");
        const blob = new Blob([html], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        const win = window.open(url, "_blank");
        if (win) {
            win.focus();
            // win.close();
        }
    };
    const tailor = () => setTailorPopup(true);

    return (
        <>
            <Dialog open={tailorPopup} onOpenChange={(v) => setTailorPopup(v)}>
                <DialogContent>
                    <DialogTitle>Keyword Tailor</DialogTitle>
                    <DialogHeader>
                        This will use the Levenshtein distance to determine the
                        best points to include in your resume.
                    </DialogHeader>
                    <Label htmlFor="description">
                        Job Description (paste it here)
                    </Label>
                    <Textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></Textarea>
                    <Button
                        onClick={() => {
                            tailorResume(setResume, description);
                            setTailorPopup(false);
                        }}
                    >
                        Tailor!
                    </Button>
                    <DialogDescription>Beta</DialogDescription>
                </DialogContent>
            </Dialog>
            <div id="toggles">
                <Configure
                    resume={resume}
                    setResume={setResume}
                    print={print}
                    tailor={tailor}
                />
            </div>
            <div id="container">
                <ResumeView resume={resume} />
            </div>
        </>
    );
}

export default App;
