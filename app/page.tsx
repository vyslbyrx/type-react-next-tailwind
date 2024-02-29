import { Hero, SearchBox } from "../components";
import CarCard from "../components/CarCard";
import CustomFilter from "../components/CustomFilter";
import { fuels, yearsOfProduction } from "../constants";
import { HomeProps } from "../types";
import { fetchCars } from "../utils";


export default async function Home( { searchParams }: HomeProps) {

  const allCars = await fetchCars({
    manufacturer: searchParams.manufacturer || '',
    year: searchParams.year || 2022,
    limit: searchParams.limit || 10,
    model: searchParams.model || '',
    fuel: searchParams.fuel || ''
  });

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     <Hero />


     <div className="mt-12 w-full" id="discover">

        <div className="home__text-container">

        <h1 className="text-4xl font-extrabold">Car Catalog</h1>
        <p>Explore the cars you might linke</p>
        </div>


      <div className="home__filters w-full max-width-[1440px]">
      <SearchBox />

    <div
    className="home__filter-container"
    >
      <CustomFilter title="fuel" options={fuels}  />
      <CustomFilter title="year" options={yearsOfProduction} />

    </div>

      </div>


    {!isDataEmpty ? (
      <section>
       <div className="home__cars-wrapper">
        {
          allCars?.map( car => 
          (
            <CarCard car={car} />
          )  
          )
        }
       </div>
      </section>
    ) : (
      <div className="text-black text-xl font-bold">
        <h2>Ooops, no results</h2>
        <p>{allCars?.message}</p>
      </div>
    )}


     </div>
     
    </main>
  );
}
