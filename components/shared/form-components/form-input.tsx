import { FC, InputHTMLAttributes } from "react"
import { RequiredSymbol } from "../required-symbol"
import { Input } from "@/components/ui"
import { useFormState } from "react-dom"
import { ErrorText } from "../error-text"
import { ClearButton } from "../clear-button"
interface IProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string
    label?: string
    required?: boolean
    className?: string
}
export const FormInput: FC<IProps> = ({ className, name, label, required, ...props }) => {
    // const {} = useFormState()
    return (
        <div className={className}>
            {label && <p>
                {label} {required && <RequiredSymbol />}
            </p>}
            <div className="relative">
                <Input className="h-12 text-md" {...props}/>
                <ClearButton />
            </div>

            <ErrorText text="error" className="mt-2 "/>
        </div>
    )
}
