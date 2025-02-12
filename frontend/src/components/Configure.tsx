import { Resume, ResumeUpdater } from "../types";
import { Reorder } from "framer-motion";
import SingleLineEditor from "./SingleLineEditor";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { TypographyH1 } from "./ui/h1";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-markdown";
import "prismjs/themes/prism.css";
import { Button } from "./ui/button";

const CustomInput = ({
    text,
    setText,
    className,
    hint,
}: {
    text: string;
    setText: (v: string) => void;
    className?: string;
    hint?: string;
}) => {
    return (
        <>
            {hint ? (
                <div className={"basis-full text-xs font-thin select-none"}>
                    {hint}
                </div>
            ) : null}

            <Editor
                value={text ? text : ""}
                onValueChange={(code) => setText(code)}
                highlight={(code) =>
                    highlight(code, languages.markdown, "markdown")
                }
                padding={10}
                style={{
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                    fontSize: 12,
                }}
                className={
                    "w-full select-none rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm" +
                    className
                }
            />
        </>
    );
};

export default function Configure({
    resume,
    setResume,
    print,
    tailor,
}: {
    resume: Resume;
    setResume: ResumeUpdater;
    print: () => void;
    tailor: () => void;
}) {
    return (
        <>

            <TypographyH1 className="text-center">ResumeForge.me 🛠️🔥</TypographyH1>

            <TypographyH1>Actions</TypographyH1>
            <div className="flex">
            <Button className="mr-2" onClick={() => print()}>📄 Save Resume as PDF</Button>
            <Button className="mr-2" onClick={() => tailor()}>🚀 Auto Tailor</Button>
            <Button className="mr-2" onClick={() => {
                localStorage.setItem("resume", JSON.stringify(resume));
            }}>💾 Save Resume to Local Storage</Button>
            </div>

            <TypographyH1 className="mt-6">Configure</TypographyH1>

            {/* Order */}
            <Card className="mb-4 mt-6">
                <CardHeader>
                    <CardTitle className="font-thin">Section Order</CardTitle>
                </CardHeader>
                <CardContent>
                    <Reorder.Group
                        axis="y"
                        values={resume.order}
                        onReorder={(order) =>
                            setResume((old) => {
                                old.order = order;
                            })
                        }
                    >
                        {resume.order.map((l, i) => (
                            <SingleLineEditor
                                className="max-w-sm"
                                id={l.id}
                                key={l.id}
                                value={l}
                                visible={!l.hidden}
                                toggleVisible={() =>
                                    setResume((old) => {
                                        old.order[i].hidden =
                                            !old.order[i].hidden;
                                    })
                                }
                            >
                                <CustomInput
                                    text={l.str}
                                    setText={() => 0}
                                ></CustomInput>
                            </SingleLineEditor>
                        ))}
                    </Reorder.Group>
                </CardContent>
            </Card>

            {/* Links */}
            <Card className="mb-4">
                <CardHeader>
                    <CardTitle className="font-thin">Links</CardTitle>
                </CardHeader>
                <CardContent>
                    <Reorder.Group
                        axis="y"
                        values={resume.links}
                        onReorder={(order) =>
                            setResume((old) => {
                                old.links = order;
                            })
                        }
                    >
                        {resume.links.map((l, i) => (
                            <SingleLineEditor
                                id={l.id}
                                key={l.id}
                                value={l}
                                visible={!l.hidden}
                                toggleVisible={() =>
                                    setResume((old) => {
                                        old.links[i].hidden =
                                            !old.links[i].hidden;
                                    })
                                }
                                deleteItem={() =>
                                    setResume((old) => {
                                        old.links = old.links.filter(
                                            (v) => v.id !== l.id
                                        );
                                    })
                                }
                            >
                                <div className="w-full flex flex-wrap">
                                    <CustomInput
                                        className={"basis-1/2"}
                                        hint={"Link Name"}
                                        text={l.display}
                                        setText={(v: string) =>
                                            setResume((old) => {
                                                old.links[i].display = v;
                                            })
                                        }
                                    ></CustomInput>
                                    <CustomInput
                                        className={"basis-1/2"}
                                        hint={"Link"}
                                        text={l.link}
                                        setText={(v: string) =>
                                            setResume((old) => {
                                                old.links[i].link = v;
                                            })
                                        }
                                    ></CustomInput>
                                </div>
                            </SingleLineEditor>
                        ))}
                    </Reorder.Group>
                    <Button
                        onClick={() =>
                            setResume((old) => {
                                old.links.push({
                                    id: crypto.randomUUID(),
                                    link: "",
                                    display: "",
                                    hidden: false,
                                    noMd: true,
                                });
                            })
                        }
                    >
                        Add Link
                    </Button>
                </CardContent>
            </Card>

            {/* Skills */}
            <Card className="mb-4">
                <CardHeader>
                    <CardTitle className="font-thin">Skills</CardTitle>
                </CardHeader>
                <CardContent>
                    <Reorder.Group
                        axis="y"
                        values={resume.skills}
                        onReorder={(order) =>
                            setResume((old) => {
                                old.skills = order;
                            })
                        }
                    >
                        {resume.skills.map((l, i) => (
                            <SingleLineEditor
                                id={l.id}
                                key={l.id}
                                value={l}
                                visible={!l.hidden}
                                toggleVisible={() =>
                                    setResume((old) => {
                                        old.skills[i].hidden =
                                            !old.skills[i].hidden;
                                    })
                                }
                                deleteItem={() =>
                                    setResume((old) => {
                                        old.skills = old.skills.filter(
                                            (v) => v.id !== l.id
                                        );
                                    })
                                }
                            >
                                <div className={"flex flex-wrap"}>
                                    <CustomInput
                                        text={l.title}
                                        className="basis-full"
                                        hint={"Skill Category"}
                                        setText={(v: string) =>
                                            setResume((old) => {
                                                old.skills[i].title = v;
                                            })
                                        }
                                    ></CustomInput>
                                    <Reorder.Group
                                        axis="y"
                                        values={l.list}
                                        onReorder={(order) =>
                                            setResume((old) => {
                                                old.skills[i].list = order;
                                            })
                                        }
                                        className="flex flex-wrap"
                                    >
                                        {l.list.map((s, j) => (
                                            <SingleLineEditor
                                                id={s.id}
                                                key={s.id}
                                                value={s}
                                                visible={!s.hidden}
                                                toggleVisible={() =>
                                                    setResume((old) => {
                                                        old.skills[i].list[
                                                            j
                                                        ].hidden =
                                                            !old.skills[i].list[
                                                                j
                                                            ].hidden;
                                                    })
                                                }
                                                deleteItem={() =>
                                                    setResume((old) => {
                                                        old.skills[i].list =
                                                            old.skills[
                                                                i
                                                            ].list.filter(
                                                                (v) =>
                                                                    v.id !==
                                                                    s.id
                                                            );
                                                    })
                                                }
                                                className="basis-full"
                                            >
                                                <CustomInput
                                                    text={s.str}
                                                    setText={(v: string) =>
                                                        setResume((old) => {
                                                            old.skills[i].list[
                                                                j
                                                            ].str = v;
                                                        })
                                                    }
                                                ></CustomInput>
                                            </SingleLineEditor>
                                        ))}
                                    </Reorder.Group>

                                    <Button
                                        onClick={() =>
                                            setResume((old) => {
                                                old.skills[i].list.push({
                                                    id: crypto.randomUUID(),
                                                    str: "",
                                                    hidden: false,
                                                });
                                            })
                                        }
                                    >
                                        Add Skill
                                    </Button>
                                </div>
                            </SingleLineEditor>
                        ))}

                        <Button
                            onClick={() =>
                                setResume((old) => {
                                    old.skills.push({
                                        id: crypto.randomUUID(),
                                        title: "",
                                        list: [
                                            {
                                                id: crypto.randomUUID(),
                                                str: "",
                                                hidden: false,
                                            },
                                        ],
                                        hidden: false,
                                    });
                                })
                            }
                        >
                            Add Skill Category
                        </Button>
                    </Reorder.Group>
                </CardContent>
            </Card>

            {/* Experience */}
            <Card className="mb-4">
                <CardHeader>
                    <CardTitle className="font-thin">Experience</CardTitle>
                </CardHeader>
                <CardContent>
                    <Reorder.Group
                        axis="y"
                        values={resume.experience}
                        onReorder={(order) =>
                            setResume((old) => {
                                old.experience = order;
                            })
                        }
                    >
                        {resume.experience.map((l, i) => (
                            <SingleLineEditor
                                id={l.id}
                                key={l.id}
                                value={l}
                                visible={!l.hidden}
                                toggleVisible={() =>
                                    setResume((old) => {
                                        old.experience[i].hidden =
                                            !old.experience[i].hidden;
                                    })
                                }
                                deleteItem={() =>
                                    setResume((old) => {
                                        old.experience = old.experience.filter(
                                            (v) => v.id !== l.id
                                        );
                                    })
                                }
                            >
                                <div className={"flex flex-wrap"}>
                                    <CustomInput
                                        text={l.position}
                                        className="basis-full"
                                        hint={"Position"}
                                        setText={(v: string) =>
                                            setResume((old) => {
                                                old.experience[i].position = v;
                                            })
                                        }
                                    ></CustomInput>
                                    <CustomInput
                                        text={l.company}
                                        className="basis-full"
                                        hint={"Company"}
                                        setText={(v: string) =>
                                            setResume((old) => {
                                                old.experience[i].company = v;
                                            })
                                        }
                                    ></CustomInput>
                                    <CustomInput
                                        text={l.location}
                                        className="basis-full"
                                        hint={"Location"}
                                        setText={(v: string) =>
                                            setResume((old) => {
                                                old.experience[i].location = v;
                                            })
                                        }
                                    ></CustomInput>
                                    <CustomInput
                                        text={l.date}
                                        className="basis-full"
                                        hint={"Date"}
                                        setText={(v: string) =>
                                            setResume((old) => {
                                                old.experience[i].date = v;
                                            })
                                        }
                                    ></CustomInput>
                                    <div className="flex flex-wrap">
                                        <div className={"basis-full text-xs font-thin select-none"}>
                                            {"Details"}
                                        </div>
                                        <Reorder.Group
                                            axis="y"
                                            values={l.details}
                                            onReorder={(order) =>
                                                setResume((old) => {
                                                    old.experience[i].details =
                                                        order;
                                                })
                                            }
                                            className="flex flex-wrap"
                                        >
                                            {l.details.map((s, j) => (
                                                <SingleLineEditor
                                                    id={s.id}
                                                    key={s.id}
                                                    value={s}
                                                    visible={!s.hidden}
                                                    toggleVisible={() =>
                                                        setResume((old) => {
                                                            old.experience[
                                                                i
                                                            ].details[j].hidden =
                                                                !old.experience[i]
                                                                    .details[j]
                                                                    .hidden;
                                                        })
                                                    }
                                                    deleteItem={() =>
                                                        setResume((old) => {
                                                            old.experience[
                                                                i
                                                            ].details =
                                                                old.experience[
                                                                    i
                                                                ].details.filter(
                                                                    (v) =>
                                                                        v.id !==
                                                                        s.id
                                                                );
                                                        })
                                                    }
                                                    className="basis-full"
                                                >
                                                    <CustomInput
                                                        text={s.str}
                                                        setText={(v: string) =>
                                                            setResume((old) => {
                                                                old.experience[
                                                                    i
                                                                ].details[j].str =
                                                                    v;
                                                            })
                                                        }
                                                    ></CustomInput>
                                                </SingleLineEditor>
                                            ))}

                                            <Button
                                                onClick={() =>
                                                    setResume((old) => {
                                                        old.experience[
                                                            i
                                                        ].details.push({
                                                            id: crypto.randomUUID(),
                                                            str: "",
                                                            hidden: false,
                                                        });
                                                    })
                                                }
                                            >
                                                Add Detail
                                            </Button>
                                        </Reorder.Group>
                                    </div>
                                </div>
                            </SingleLineEditor>
                        ))}

                        <Button
                            onClick={() =>
                                setResume((old) => {
                                    old.experience.push({
                                        id: crypto.randomUUID(),
                                        position: "",
                                        company: "",
                                        location: "",
                                        date: "",
                                        details: [
                                            {
                                                id: crypto.randomUUID(),
                                                str: "",
                                                hidden: false,
                                            },
                                        ],
                                        hidden: false,
                                    });
                                })
                            }
                        >
                            Add Experience
                        </Button>
                    </Reorder.Group>
                </CardContent>
            </Card>

            {/* Projects */}
            <Card className="mb-4">
                <CardHeader>
                    <CardTitle className="font-thin">Projects</CardTitle>
                </CardHeader>
                <CardContent>
                    <Reorder.Group
                        axis="y"
                        values={resume.projects}
                        onReorder={(order) =>
                            setResume((old) => {
                                old.projects = order;
                            })
                        }
                    >
                        {resume.projects.map((p, i) => (
                            <SingleLineEditor
                                id={p.id}
                                key={p.id}
                                value={p}
                                visible={!p.hidden}
                                toggleVisible={() =>
                                    setResume((old) => {
                                        old.projects[i].hidden =
                                            !old.projects[i].hidden;
                                    })
                                }
                                deleteItem={() =>
                                    setResume((old) => {
                                        old.experience = old.experience.filter(
                                            (v) => v.id !== p.id
                                        );
                                    })
                                }
                            >
                                <div className={"flex flex-wrap"}>
                                    <CustomInput
                                        text={p.title}
                                        className="basis-full"
                                        hint={"Title"}
                                        setText={(v: string) =>
                                            setResume((old) => {
                                                old.projects[i].title = v;
                                            })
                                        }
                                    ></CustomInput>
                                    <div className="flex flex-wrap">
                                        <div className={"basis-full text-xs font-thin select-none"}>
                                            {"Details"}
                                        </div>
                                        <Reorder.Group
                                            axis="y"
                                            values={p.details}
                                            onReorder={(order) =>
                                                setResume((old) => {
                                                    old.projects[i].details =
                                                        order;
                                                })
                                            }
                                            className="flex flex-wrap"
                                        >
                                            {p.details.map((s, j) => (
                                                <SingleLineEditor
                                                    id={s.id}
                                                    key={s.id}
                                                    value={s}
                                                    visible={!s.hidden}
                                                    toggleVisible={() =>
                                                        setResume((old) => {
                                                            old.projects[
                                                                i
                                                            ].details[j].hidden =
                                                                !old.projects[i]
                                                                    .details[j]
                                                                    .hidden;
                                                        })
                                                    }
                                                    deleteItem={() =>
                                                        setResume((old) => {
                                                            old.projects[
                                                                i
                                                            ].details =
                                                                old.projects[
                                                                    i
                                                                ].details.filter(
                                                                    (v) =>
                                                                        v.id !==
                                                                        s.id
                                                                );
                                                        })
                                                    }
                                                    className="basis-full"
                                                >
                                                    <CustomInput
                                                        text={s.str}
                                                        setText={(v: string) =>
                                                            setResume((old) => {
                                                                old.projects[
                                                                    i
                                                                ].details[j].str =
                                                                    v;
                                                            })
                                                        }
                                                    ></CustomInput>
                                                </SingleLineEditor>
                                            ))}

                                            <Button
                                                onClick={() =>
                                                    setResume((old) => {
                                                        old.projects[
                                                            i
                                                        ].details.push({
                                                            id: crypto.randomUUID(),
                                                            str: "",
                                                            hidden: false,
                                                        });
                                                    })
                                                }
                                            >
                                                Add Project
                                            </Button>
                                        </Reorder.Group>
                                    </div>
                                </div>
                            </SingleLineEditor>
                        ))}

                        <Button
                            onClick={() =>
                                setResume((old) => {
                                    old.experience.push({
                                        id: crypto.randomUUID(),
                                        position: "",
                                        company: "",
                                        location: "",
                                        date: "",
                                        details: [
                                            {
                                                id: crypto.randomUUID(),
                                                str: "",
                                                hidden: false,
                                            },
                                        ],
                                        hidden: false,
                                    });
                                })
                            }
                        >
                            Add Experience
                        </Button>
                    </Reorder.Group>
                </CardContent>
            </Card>

            {/* Education */}
            <Card className="mb-4">
                <CardHeader>
                    <CardTitle className="font-thin">Education</CardTitle>
                </CardHeader>
                <CardContent>
                    <Reorder.Group
                        axis="y"
                        values={resume.education}
                        onReorder={(order) =>
                            setResume((old) => {
                                old.education = order;
                            })
                        }
                    >
                        {resume.education.map((l, i) => (
                            <SingleLineEditor
                                id={l.id}
                                key={l.id}
                                value={l}
                                visible={!l.hidden}
                                toggleVisible={() =>
                                    setResume((old) => {
                                        old.education[i].hidden =
                                            !old.education[i].hidden;
                                    })
                                }
                                deleteItem={() =>
                                    setResume((old) => {
                                        old.education = old.education.filter(
                                            (v) => v.id !== l.id
                                        );
                                    })
                                }
                            >
                                <div className={"flex flex-wrap"}>
                                    <CustomInput
                                        text={l.school}
                                        className="basis-full"
                                        hint={"School"}
                                        setText={(v: string) =>
                                            setResume((old) => {
                                                old.education[i].school = v;
                                            })
                                        }
                                    ></CustomInput>
                                    <CustomInput
                                        text={l.location}
                                        className="basis-full"
                                        hint={"Location"}
                                        setText={(v: string) =>
                                            setResume((old) => {
                                                old.education[i].location = v;
                                            })
                                        }
                                    ></CustomInput>
                                    <CustomInput
                                        text={l.degree}
                                        className="basis-full"
                                        hint={"Degree"}
                                        setText={(v: string) =>
                                            setResume((old) => {
                                                old.education[i].degree = v;
                                            })
                                        }
                                    ></CustomInput>
                                    <CustomInput
                                        text={l.date}
                                        className="basis-full"
                                        hint={"Date"}
                                        setText={(v: string) =>
                                            setResume((old) => {
                                                old.education[i].date = v;
                                            })
                                        }
                                    ></CustomInput>
                                    <div className="flex flex-wrap">
                                        <div className={"basis-full text-xs font-thin select-none"}>
                                            {"Details"}
                                        </div>
                                        <Reorder.Group
                                            axis="y"
                                            values={l.details}
                                            onReorder={(order) =>
                                                setResume((old) => {
                                                    old.education[i].details = order;
                                                })
                                            }
                                            className="flex flex-wrap"
                                            >
                                            {l.details.map((s, j) => (
                                                <SingleLineEditor
                                                    id={s.id}
                                                    key={s.id}
                                                    value={s}
                                                    visible={!s.hidden}
                                                    toggleVisible={() =>
                                                        setResume((old) => {
                                                            old.education[i].details[j].hidden =
                                                                !old.education[i].details[j].hidden;
                                                        })
                                                    }
                                                    deleteItem={() =>
                                                        setResume((old) => {
                                                            old.education[i].details = old.education[i].details.filter(
                                                                (v) => v.id !== s.id
                                                            );
                                                        })
                                                    }
                                                    className="basis-full"
                                                >
                                                    <CustomInput
                                                        text={s.str}
                                                        setText={(v: string) =>
                                                            setResume((old) => {
                                                                old.education[i].details[j].str = v;
                                                            })
                                                        }
                                                    ></CustomInput>
                                                </SingleLineEditor>
                                            ))}

                                            <Button
                                                onClick={() =>
                                                    setResume((old) => {
                                                        old.education[i].details.push({
                                                            id: crypto.randomUUID(),
                                                            str: "",
                                                            hidden: false,
                                                        });
                                                    })
                                                }
                                            >
                                                Add Detail
                                            </Button>
                                            
                                        </Reorder.Group>
                                    </div>
                                </div>
                            </SingleLineEditor>
                        ))}

                        <Button
                            onClick={() =>
                                setResume((old) => {
                                    old.education.push({
                                        id: crypto.randomUUID(),
                                        school: "",
                                        location: "",
                                        degree: "",
                                        date: "",
                                        details: [
                                            {
                                                id: crypto.randomUUID(),
                                                str: "",
                                                hidden: false,
                                            },
                                        ],
                                        hidden: false,
                                    });
                                })
                            }
                        >
                            Add Education
                        </Button>
                    </Reorder.Group>
                </CardContent>
            </Card>

            <TypographyH1>Advanced Features</TypographyH1>
            <Button onClick={() => {
                navigator.clipboard.writeText(JSON.stringify(resume, (k, v) => {
                    if (k === "id") return undefined;
                    return v;
                }, 2));
            }}>Copy Resume to Clipboard as JSON without IDs</Button>
        </>
    );
}
