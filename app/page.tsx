import Image from "next/image";
import { trending_data } from "@/data/trending"
import SearchForm from "./components/SearchForm";

export default function Home() {
  return (
    <main className="bg-[#013b94]">
      <section className="max-w-7xl mx-auto p-6">
       <h2 className="font-bold text-5xl text-white">
         Looking For a Stay?
       </h2>
       <h3 className="py-5 text-xl text-white">Search low prices on hotels</h3>
      </section>
      <section className="m-4 mt-0 -mb-14 px-2 lg:px-4">
        <SearchForm />
      </section>
      <section className="mx-auto max-w-7xl mt-10 p-6 bg-white rounded-t-lg overflow-x-hidden">
        <div className="pt-5">
          <h3 className="text-xl font-bold">Trending Now</h3>
          <p className="font-light">Most popular choice</p>
        </div>
        <div className="flex space-x-4 py-5 overflow-x-scroll">
          {trending_data.map((trends) => (
           <div className="space-y-1 shrink-0 cursor-pointer">
             <img key={trends.id} src={trends.src} className='w-60 h-60 object-cover rounded-lg pb-2'/>
             <p>{trends.title}</p>
             <p>{trends.location}</p>
             <p>{trends.description}</p>
           </div>
          ))}
        </div>
      </section>
    </main>
  );
}
