import { FC, InputHTMLAttributes } from "react"
import { RequiredSymbol } from "../required-symbol"
import { Input } from "@/components/ui"
import { ErrorText } from "../error-text"
import { ClearButton } from "../clear-button"
import { useFormContext } from "react-hook-form"
interface IProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string
    label?: string
    required?: boolean
    className?: string
}
export const FormInput: FC<IProps> = ({ className, name, label, required, ...props }) => {

    const { register, formState: { errors }, watch, setValue, } = useFormContext()

    const value = watch(name)
    const errorText = errors[name]?.message as string

    const onClickClear = () => {
        setValue(name, '')
    }

    return (
        <div className={className}>
            {label && <p>
                {label} {required && <RequiredSymbol />}
            </p>}
            <div className="relative">
                <Input className="h-12 text-md" {...register(name)} {...props} />
                {value && <ClearButton onClick={onClickClear} />}
            </div>

            {errorText && <ErrorText text={errorText} className="mt-2 " />}
        </div>
    )
}
