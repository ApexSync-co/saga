import React from 'react';
import { Link } from 'react-router-dom';

export default function Breadcrumbs({ paths = [] }) {
    return (
        <nav aria-label="Breadcrumb" className="w-[95vw] md:w-[80vw] mx-auto my-4 text-xs md:text-sm font-Poppins uppercase tracking-widest text-gray-400">
            <ol className="flex items-center flex-wrap gap-2">
                <li>
                    <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                </li>
                
                {paths.map((item, index) => {
                    const isLast = index === paths.length - 1;
                    
                    return (
                        <React.Fragment key={index}>
                            <span className="text-gray-600 text-[10px] md:text-xs">/</span>
                            <li>
                                {isLast ? (
                                    // The current page is highlighted and not a link
                                    <span className="text-white font-medium">{item.name}</span>
                                ) : (
                                    <Link to={item.url} className="hover:text-primary transition-colors">
                                        {item.name}
                                    </Link>
                                )}
                            </li>
                        </React.Fragment>
                    );
                })}
            </ol>
        </nav>
    );
}
