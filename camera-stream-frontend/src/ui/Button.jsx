export default function Button({children,className="",...props}){

return(

<button
className={`px-4 py-2 rounded-md bg-green-500 hover:bg-green-600 text-black font-medium transition ${className}`}
{...props}
>

{children}

</button>

)

}