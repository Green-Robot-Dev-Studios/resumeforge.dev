// import { Resume, ResumeUpdater } from "../types"
import { Reorder, useDragControls } from "framer-motion"
import { Button } from "./ui/button"
import { Eye, EyeOff, GripVertical } from "lucide-react"

export default function SingleLineEditor({ visible, toggleVisible, value, id, children, className, deleteItem } : {
    visible: boolean,
    toggleVisible: () => void,
    deleteItem?: () => void,
    value: unknown,
    id: string,
    children: React.ReactNode,
    className?: string
}) {
    const controls = useDragControls();

    return <Reorder.Item dragListener={false} dragControls={controls} key={id} value={value} className={className}>
            <div className={"mb-1 flex items-center border rounded-lg shadow-sm p-1 w-full" + (visible ? "bg-white" : " bg-gray-200")}>
                {/* Visibility Toggle */}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleVisible()}
                    className="mr-2"
                >
                    {visible ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                </Button>

                {/* Delete button */}
                {deleteItem &&
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteItem()}
                        className="mr-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </Button>
                }
                

                {children}

                {/* Drag Grip Handle */}
                <div className="ml-2 cursor-grab text-gray-500">
                    <GripVertical className="w-5 h-5" onPointerDown={(e) => controls.start(e)}/>
                </div>
            </div>
            {/* <Editor options={options} height="16px" value={l.display} defaultLanguage="markdown"></Editor> */}
            {/* <input type="text" value={l.link} onChange={(e) => setResume((old) => { old.links[i].display = e.target.value })}/> */}
        </Reorder.Item>
    
}