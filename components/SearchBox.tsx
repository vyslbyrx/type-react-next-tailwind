'use client';

import React, { useState } from "react";
import Image from "next/image";
import SearchManufacturer from "./SearchManufacturer";
import { useRouter } from "next/navigation";

const SearchButton = ( { otherClasses }: {otherClasses: string} ) => (
    <button 
        type="submit" 
        className={`-ml-3 z-10 ${otherClasses}`}
    >
        <Image
            src="/magnifying-glass.svg"
            alt="magnifying glass"
            width={20}
            height={20}
        />
    </button>
)

const SearchBox = () => {

    const [manufacturer, setManufacturer] = useState('');
    const [model, setModel] = useState('');
    const router = useRouter();

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(manufacturer === "" && model === "") {
            return alert("Lütfen arama alanını doldurun...")
        }

        updateSearchParams(
            model.toLowerCase(),
            manufacturer.toLowerCase()
        )
    }

    const updateSearchParams = (model: string, manufacturer: string) => {

        const searchParams = new URLSearchParams(window.location.search)

        if(model) {
            searchParams.set('model', model)
        } else {
            searchParams.delete("model")
        }

        if(manufacturer) {
            searchParams.set('manufacturer', manufacturer)
        } else {
            searchParams.delete('manufacturer')
        }


        const newPathName = `${window.location.pathname}?${searchParams.toString()}`

        router.push(newPathName);

        console.log(window.location.pathname);
    }

    return (
        <form 
            className='searchbar' 
            onSubmit={handleSearch}>
                <div className="searchbar__item">

                    <SearchManufacturer
                       manufacturer= {manufacturer}
                       setManufacturer={setManufacturer} 
                    />
                    
                    <SearchButton otherClasses="sm:hidden" />
                </div>
                <div className="searchbar__item">
                    <Image
                        src="/model-icon.png"
                        width={20}
                        height={20}
                        className="absolute w-[20px] h-[20px] ml-4"
                        alt="car model"
                    />
                    <input 
                        type="text"
                        name="model"
                        value={model}
                        onChange={ (e) => setModel(e.target.value)}
                        placeholder="Tiguan"
                        className="searchbar__input"
                    />
                    <SearchButton otherClasses="sm:hidden" />
                </div>
                <SearchButton otherClasses="max-sm:hidden" />
        </form>
  )
}

export default SearchBox