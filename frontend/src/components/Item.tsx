import { Reorder, useDragControls } from "framer-motion"
import { PropsWithChildren } from "react"

export default function Item({ children, key, value }: PropsWithChildren & { key: string, value: string }) {
    const controls = useDragControls()

    return <Reorder.Item dragListener={false} dragControls={controls} key={key} value={value}>
        {children}
    </Reorder.Item>
}