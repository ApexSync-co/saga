import { useNavigate } from 'react-router-dom';

// Static category data — matches the store's fixed categories and routes
const CATEGORIES = [
  { handle: 'bangles', title: 'Bangles', image: '/Bangles.png' },
  { handle: 'bracelets', title: 'Bracelets', image: '/Bracelets.jpeg' },
  { handle: 'earrings', title: 'Earrings', image: '/stock3.jpeg' },
  { handle: 'necklaces', title: 'Necklaces', image: '/Necklace.jpeg' },
  { handle: 'pendants', title: 'Pendants', image: '/Pendant.jpeg' },
  { handle: 'rings', title: 'Rings', image: '/Rings.jpeg' },
];

export default function CategoryGrid(){
    const navigate = useNavigate();

    return(
        <>
        <div className="mb-16">
        <div className="text-white flex flex-col gap-6 text-center w-[80vw] m-auto mt-10">
        <h1 className="text-xl md:text-4xl tracking-wide">Find your <span className="text-primary py-2 text-3xl md:text-8xl font-Great_Vibes tracking-wider">Perfect</span> one</h1>
        <span className="text-xl md:mt-5">Shop by Category</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 w-[90vw] md:w-[80vw] m-auto my-10">
            {CATEGORIES.map((cat) => (
                <div key={cat.handle} className="cursor-pointer" onClick={() => navigate(`/${cat.handle}`)}>
                    <img src={cat.image} alt={cat.title} className=" h-[50vw]  md:h-[30vw] w-full object-cover rounded-2xl" />
                    <h1 className="font-Poppins text-white text-center md:text-2xl text-xs mt-5">{cat.title}</h1>
                </div>
            ))}
        </div>
        </div>
        </>
    )
}
