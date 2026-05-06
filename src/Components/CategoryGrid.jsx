import { useNavigate } from 'react-router-dom';

// Static category data — matches the store's fixed categories and routes
const CATEGORIES = [
  { handle: 'sets', title: 'The Sets Collection', image: '/Sets.jpg' },
  { handle: 'necklaces', title: 'Necklaces', image: '/Necklace.jpeg' },
  { handle: 'earrings', title: 'Earrings', image: '/stock3.jpeg' },
  { handle: 'bangles', title: 'Bangles', image: '/Bangles.png' },
  { handle: 'bracelets', title: 'Bracelets', image: '/Bracelets.jpeg' },
  { handle: 'pendants', title: 'Pendants', image: '/Pendant.jpeg' },
  { handle: 'rings', title: 'Rings', image: '/Rings.jpeg' },
];

export default function CategoryGrid(){
    const navigate = useNavigate();

    return(
        <>
        <div className="mb-16">
        <div className="text-white flex flex-col gap-6 text-center w-[80vw] m-auto mt-10">
        <h1 className="text-xl md:text-4xl tracking-wide">Find your <span className="text-primary px-2 text-5xl md:text-8xl font-Great_Vibes tracking-wider">Perfect</span> one</h1>
        <span className="md:text-xl md:mt-5">Shop by Category</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 w-[95vw] md:w-[80vw] mx-auto my-10 auto-rows-[200px] md:auto-rows-[300px]">
            {CATEGORIES.map((cat, index) => {
                let spanClass = "";
                if (index === 0) {
                    spanClass = "col-span-2 md:col-span-4 row-span-1 md:row-span-2 lg:row-span-1"; // Hero
                } else if (index === 1 || index === 2) {
                    spanClass = "col-span-1 md:col-span-2"; // Half width
                } else {
                    spanClass = "col-span-1 md:col-span-1"; // Quarter width
                }

                return (
                    <div 
                        key={cat.handle} 
                        className={`cursor-pointer group overflow-hidden rounded-2xl relative shadow-lg ${spanClass}`} 
                        onClick={() => navigate(`/${cat.handle}`)}
                    >
                        <img src={cat.image} alt="" aria-hidden="true" className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" loading="lazy" />
                        
                        {/* Overlay Gradient & Text */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6 md:p-8">
                            <span className="text-primary text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold mb-1 md:mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">Explore</span>
                            <h1 className={`${index === 0 ? 'font-Great_Vibes text-4xl md:text-6xl text-primary' : 'font-Poppins text-lg md:text-2xl uppercase tracking-widest font-medium text-white'} transition-colors`}>
                                {cat.title}
                            </h1>
                        </div>
                    </div>
                )
            })}
        </div>
        </div>
        </>
    )
}
