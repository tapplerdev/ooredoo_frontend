import ooredooimg from "@/assets/ooredoo.png";  
import ooredoouserimg from "@/assets/ooredoousericon.png"
export const Toprow = () => {
    return (
        <aside id="top-bar" className="fixed top-0 left-0 z-40 w-full h-16 bg-white flex flex-row justify-between">
            <div className="w-full h-full px-3 py-4 flex flex-row justify-between items-center">
            <img src={ooredooimg} className="object-contain h-20 cursor-pointer"/>
            <img src={ooredoouserimg} className="object-contain h-20 cursor-pointer w-10"/>
            </div>
        </aside>
    )
};